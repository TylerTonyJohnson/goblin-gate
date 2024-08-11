<script>
	import { fade } from 'svelte/transition';

	import { AppStates, getAppState } from '$lib/appState.svelte';
	import { getPlayer } from '$lib/classes/player.svelte';
	import { createRandomBattle } from '$lib/classes/battle.svelte.js';
	import { getRandomWord } from '$lib/classes/random.svelte';
	import { MonsterTypes } from '$lib/classes/monsters.svelte.js';

	import Bench from '$lib/components/Bench.svelte';
	import EnduranceBar from '$lib/components/EnduranceBar.svelte';
	import ExperienceBar from '$lib/components/ExperienceBar.svelte';
	import Defeat from './Defeat.svelte';
	import Field from './Field.svelte';
	import BattleMenu from './BattleMenu.svelte';
	import RunMenu from './RunMenu.svelte';

	const appState = getAppState();
	const player = getPlayer();

	/* 
		Battle Data
	*/
	const hitBox = {
		coordinates: { x: 0, y: 0 },
		dimensions: { x: 5, y: 7 }
	};

	let battleParameters = $state({
		dimensions: { x: 5, y: 7 },
		monsterCount: 50,
		monsters: [
			{ type: MonsterTypes.Black, weight: 0.4 },
			{ type: MonsterTypes.White, weight: 0.2 },
			{ type: MonsterTypes.Yellow, weight: 0.1 },
			{ type: MonsterTypes.Green, weight: 0.1 },
			{ type: MonsterTypes.Blue, weight: 0.1 },
			{ type: MonsterTypes.Red, weight: 0.1 }
		],
		clustering: 0,
		obstacles: []
	});

	// Seed

	let germ = $state(getRandomWord());

	let seedWater = $derived(
		battleParameters.monsterCount.toFixed(1) +
			flattenSeed(battleParameters.monsters) +
			battleParameters.clustering.toFixed(1)
	);

	let seed = $derived(germ + '-' + seedWater);

	function flattenSeed(weights) {
		return weights.reduce((acc, monsterWeight) => {
			return acc + monsterWeight.weight.toString().replace('0', '');
		}, '');
	}

	/* 
		RUNTIME
	*/

	let attackCount = $state(0);
	let maxHealth = 0;

	let battleData = $state();
	initializeBattle();

	const currentHealth = $derived(
		battleData.reduce((acc, monster) => {
			return acc + monster.currentHealth;
		}, 0)
	);

	let hoveredMonster = $state(null);
	let attachedMonsters = $derived(
		getCluster(hoveredMonster, player.currentSpell ? player.currentSpell : player.currentWeapon)
	);

	let selectedMonsters = $state([]);

	// Wrappers
	function hover(monster) {
		hoverMonster(monster, player.currentWeapon);
	}

	function attack(monster) {
		selectedMonsters.push(monster);

		console.log(selectedMonsters.length, player.currentTool);

		if (selectedMonsters.length < player.currentTool.targets) return;

		// Cast or attack?
		if (player.currentSpell) {
			castMonster(selectedMonsters, player.currentSpell);
		} else if (player.currentWeapon) {
			attackMonster(selectedMonsters, player.currentWeapon);
		}
	}

	/* 
		Functions
	*/
	function createBattle() {
		germ = getRandomWord();
		battleData = createRandomBattle(battleParameters, seed);
		attackCount = 0;
	}

	function initializeBattle() {
		battleData = createRandomBattle(battleParameters, seed);
		maxHealth = battleData.reduce((acc, monster) => {
			return acc + monster.maxHealth;
		}, 0);
		attackCount = 0;
	}

	function hoverMonster(monster, weapon) {
		hoveredMonster = monster;
	}

	function castMonster(monsters, spell) {
		console.log('cast');

		spell.cast(monsters);

		// Reset Values
		player.changeSpell(null);
		selectedMonsters = [];
	}

	function attackMonster(monsters, weapon) {
		console.log('attack Battle');

		// Check if we can attack
		if (!weapon) return;

		monsters.forEach((monster) => {
			if (!isInHitbox(monster, hitBox)) return;

			if (appState.state === AppStates.Battle) {
				if (player.currentEndurance < 1) return;
				// reduceEndurance();
			}

			attackCount = attackCount + 1;

			// Who should be attacked?
			const cluster = getCluster(monster, weapon);

			// Do the damage
			cluster.forEach((clusterMonster) => {
				damageMonster(clusterMonster, weapon.damage);
			});

			// Experience
			if (appState.state === AppStates.Battle) {
				const experience = calculateExperience(cluster);
				player.addExperience(experience);
			}
		});
	}

	function calculateExperience(cluster) {
		// Get unique values
		const killedMonsters = cluster.filter((monster) => monster.currentHealth < 1);
		const monsterType = killedMonsters[0].type;

		// For each unique value, calculate the count
		let experience = 0;

		if (killedMonsters.length >= monsterType.xpMinimum) {
			experience += monsterType.xpCombo + killedMonsters.length * monsterType.xpDrop;
		}

		return experience;
	}

	function damageMonster(monster) {
		console.log('damage');
		monster.currentHealth = Math.max(monster.currentHealth - 1, 0);
		if (monster.currentHealth < 1) {
			killMonster(monster);
		}
	}

	function killMonster(monster) {
		console.log('kill');
		removeMonster(monster);
		shoveDown();
	}

	function removeMonster(monster) {
		battleData.splice(battleData.indexOf(monster), 1);
	}

	function shoveDown() {
		battleData.forEach((monster) => {
			if (monster.coordinates.y === 0) return;
			if (
				battleData.find(
					(otherMonster) =>
						otherMonster.coordinates.x === monster.coordinates.x &&
						otherMonster.coordinates.y === monster.coordinates.y - 1
				)
			)
				return;

			monster.coordinates.y = Math.max(monster.coordinates.y - 1, 0);
		});
	}

	function getCluster(monster, weapon) {
		// Validation
		if (!monster || !weapon) return [];

		//Initialize
		const visited = new Set();
		const cluster = [];

		function traverse(currentMonster) {
			if (!isInHitbox(currentMonster, hitBox)) return;

			visited.add(currentMonster);
			cluster.push(currentMonster);

			// Check all adjacent monsters
			let adjacentMonsters = getAdjacentMonsters(currentMonster);

			adjacentMonsters.forEach((adjacentMonster) => {
				// Filter out invalid monsters
				if (visited.has(adjacentMonster)) return;
				if (adjacentMonster.type !== currentMonster.type) return;
				if (!isInHitbox(adjacentMonster, hitBox)) return;
				if (getDistance(monster, adjacentMonster) > weapon.range) return;

				traverse(adjacentMonster);
			});
		}

		// Start the traversal
		traverse(monster);

		return cluster;
	}

	function getAdjacentMonsters(monster) {
		return battleData.filter((otherMonster) => {
			return (
				(Math.abs(monster.coordinates.x - otherMonster.coordinates.x) === 1 &&
					Math.abs(monster.coordinates.y - otherMonster.coordinates.y) === 0) ||
				(Math.abs(monster.coordinates.x - otherMonster.coordinates.x) === 0 &&
					Math.abs(monster.coordinates.y - otherMonster.coordinates.y) === 1)
			);
		});
	}

	function isInHitbox(monster, hitbox) {
		return (
			monster.coordinates.x >= hitbox.coordinates.x &&
			monster.coordinates.x < hitbox.coordinates.x + hitbox.dimensions.x &&
			monster.coordinates.y >= hitbox.coordinates.y &&
			monster.coordinates.y < hitbox.coordinates.y + hitbox.dimensions.y
		);
	}

	function getDistance(monster, otherMonster) {
		return Math.sqrt(
			Math.pow(Math.abs(monster.coordinates.x - otherMonster.coordinates.x), 2) +
				Math.pow(Math.abs(monster.coordinates.y - otherMonster.coordinates.y), 2)
		);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="frame" transition:fade>
	<Field
		{battleData}
		{battleParameters}
		{attack}
		{hover}
		{hitBox}
		{hoveredMonster}
		{attachedMonsters}
	/>
	<Bench />

	{#if appState.state !== AppStates.Edit}
		<EnduranceBar />
		<ExperienceBar />
	{:else}
		<BattleMenu bind:battleParameters {seed} {initializeBattle} {createBattle} />
		<RunMenu {attackCount} hit={attack} {currentHealth} {maxHealth} />
	{/if}
	{#if player.currentEndurance < 1}
		<Defeat />
	{/if}
</div>

<style>
	.frame {
		position: relative;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		grid-template-rows: auto 1fr auto;
		grid-template-areas:
			'header	header 	header'
			'left 	tablet 	right'
			'bench 	bench   bench';
		padding: 1rem;
		gap: 1rem;
	}
</style>
