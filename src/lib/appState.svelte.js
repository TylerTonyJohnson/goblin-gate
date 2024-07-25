import { getContext, setContext } from 'svelte';

export class AppStates {
	constructor(name) {
		this.name = name;
	}
	static Title = new AppStates('title');
	static Map = new AppStates('map');
	static Village = new AppStates('village');
	static Blacksmith = new AppStates('blacksmith');
	static Spellshop = new AppStates('spellshop');
	static Tavern = new AppStates('tavern');
	static GameOver = new AppStates('gameOver');
	static Battle = new AppStates('battle');
	static Boss = new AppStates('boss');
}

export function createAppState() {
	let state = $state(AppStates.Title);

	return {
		get state() {
			return state;
		},
		set state(value) {
			state = value;
		}
	};
}

const APP_STATE_KEY = Symbol('appState');

export function setAppState() {
	return setContext(APP_STATE_KEY, createAppState());
}

export function getAppState() {
	return getContext(APP_STATE_KEY);
}
