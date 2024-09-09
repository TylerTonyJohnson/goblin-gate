import { getContext, setContext } from 'svelte';

import { WeaponTypes } from '$lib/classes/weapons.svelte.js';
import { SpellTypes } from '$lib/classes/spells.svelte.js';

class Player {
	maxHealth = $state(3);
	currentHealth = $state(2);

	maxEndurance = $state(16);
	currentEndurance = $state(14);

	maxMana = $state(5);
	currentMana = $state(4);

	maxCharge = $state(10);
	currentCharge = $state(0);

	currentExperience = $state(0);

	unlockedWeapons = $state([
		WeaponTypes.Sword,
		WeaponTypes.Cleaver,
		WeaponTypes.Longsword,
		WeaponTypes.Magiblade,
		WeaponTypes.Arrow
	]);
	currentWeapon = $state(this.unlockedWeapons[0]);

	unlockedSpells = $state([SpellTypes.Smite, SpellTypes.Swap, SpellTypes.Explode]);
	currentSpell = $state();

	currentTool = $derived(this.currentSpell ? this.currentSpell : this.currentWeapon);
	constructor() {}

	resetForBattle() {
		this.currentHealth = this.maxHealth;
		this.currentEndurance = this.maxEndurance;
		this.currentMana = this.maxMana;
		this.currentCharge = 0;
	}

	reduceHealth(damage) {
		this.currentHealth = Math.max(0, this.currentHealth - damage);
	}

	reduceEndurance(enduranceLost) {
		this.currentEndurance = Math.max(0, this.currentEndurance - enduranceLost);
	}

	addExperience(xp) {
		console.log('adding xp', xp);
		this.currentExperience += xp;
		this.currentCharge = Math.min(this.maxCharge, this.currentCharge + xp);
	}

	changeWeapon(weapon) {
		console.log('changing weapon', weapon?.name);
		this.currentWeapon = weapon;
	}

	changeSpell(spell) {
		console.log('changing spell', spell?.name);
		this.currentSpell = spell;
	}

	reduceMana(cost) {
		if (cost > this.currentMana) return;

		this.currentMana = Math.max(0, this.currentMana - cost);
	}

	hit(tool) {
		switch (tool) {
			case WeaponTypes.Sword:
				break;
			case WeaponTypes.Cleaver:
				break;
			case WeaponTypes.Longsword:
				break;
			case WeaponTypes.Magiblade:
				this.currentCharge = 0;
				this.currentWeapon = this.unlockedWeapons[0];
				break;
			case WeaponTypes.Arrow:
				break;
			case SpellTypes.Smite:
				this.reduceMana(SpellTypes.Smite.cost);
				this.currentSpell = null;
				break;
			case SpellTypes.Swap:
				break;
			case SpellTypes.Explode:
				break;
		}
	}
}

const PLAYER_KEY = Symbol('player');

export function setPlayer() {
	return setContext(PLAYER_KEY, new Player());
}

export function getPlayer() {
	return getContext(PLAYER_KEY);
}
