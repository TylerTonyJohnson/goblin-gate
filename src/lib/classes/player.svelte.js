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

	currentExperience = $state(0);

	unlockedWeapons = $state([
		WeaponTypes.Sword,
		WeaponTypes.Cleaver,
		WeaponTypes.Longsword,
		WeaponTypes.Magiblade
	]);
	currentWeapon = $state(this.unlockedWeapons[0]);

	unlockedSpells = $state([SpellTypes.Shrink, SpellTypes.Swap, SpellTypes.Explode]);
	currentSpell = $state();

	currentTool = $derived(this.currentSpell ? this.currentSpell : this.currentWeapon);
	constructor() {}

	reduceHealth(damage) {
		this.currentHealth = Math.max(0, this.currentHealth - damage);
	}

	reduceEndurance(enduranceLost) {
		this.currentEndurance = Math.max(0, this.currentEndurance - enduranceLost);
	}

	addExperience(xp) {
		this.currentExperience += xp;
	}

	changeWeapon(weapon) {
		this.currentWeapon = weapon;
	}

	changeSpell(spell) {
		console.log('changing spell', spell);
		this.currentSpell = spell;
	}
}

const PLAYER_KEY = Symbol('player');

export function setPlayer() {
	return setContext(PLAYER_KEY, new Player());
}

export function getPlayer() {
	return getContext(PLAYER_KEY);
}
