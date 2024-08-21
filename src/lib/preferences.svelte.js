import { getContext, setContext } from 'svelte';

const preferences = $state({
	tileSize: 86,
	tileGap: 4
});

const PREFERENCES_KEY = Symbol('preferences');

export function setPreferences() {
	return setContext(PREFERENCES_KEY, preferences);
}

export function getPreferences() {
	return getContext(PREFERENCES_KEY);
}
