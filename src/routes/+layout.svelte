<script lang="ts">
	import { goto } from "$app/navigation";
	import favicon from '$lib/assets/favicon.svg';
	import '../globals.css'
	let { children } = $props();

	let commandMenu: any;
	let commandInput: any;
	let commandValue = $state("");

	const commands = ["home", "new", "sans", "serif", "mono"];
	let filtered = $derived(
		commandValue.trim()
			? commands.filter((c) => c.startsWith(commandValue.trim().toLowerCase()))
			: commands,
	);

	let currentFont = $state("sans-serif");
	const font: Record<string, () => void> = {
		sans: () => { currentFont = "sans-serif"; },
		serif: () => { currentFont = "serif"; },
		mono: () => { currentFont = "monospace"; },
	};

	function runCommand() {
		const cmd = filtered.length === 1 ? filtered[0] : commandValue.trim();
		if (cmd === "home") {
			goto("/");
		} else if (cmd === "new") {
			goto("/new");
		} else if (cmd === "sans" || cmd === "serif" || cmd === "mono") {
			font[cmd]();
		}
		commandValue = "";
		commandMenu.hidePopover();
	}
</script>

<svelte:head>
    <title>Pen | Writing for work</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:window
	onkeydown={(e) => {
		if (e.altKey && e.key === "Alt") {
			e.preventDefault();
			commandMenu.togglePopover();
			commandInput.focus();
		}
	}}
/>

<div style:font-family={currentFont}>
	{@render children()}
</div>

<div bind:this={commandMenu} id="commandMenu" popover="auto" class="commandMenu" ontoggle={(e: ToggleEvent) => { if (e.newState === "closed") { commandValue = ""; } }}>
	<input bind:this={commandInput} bind:value={commandValue} placeholder="Search commands..." onkeydown={(e) => { if (e.key === "Enter") runCommand(); }} />
	{#each filtered as cmd}
		<button onclick={() => { commandValue = cmd; runCommand(); }}>{cmd}</button>
	{/each}
</div>
