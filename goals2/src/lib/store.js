import { writable } from 'svelte/store';

export const goals = writable(window.localStorage.getItem("goals"))
export const modalHidden = writable(true)
