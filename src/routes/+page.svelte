<script>
	import { Darkmode } from 'svelte-5-ui-lib';
	import { ThumbsUpSolid, ThumbsDownSolid } from 'flowbite-svelte-icons';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Darkmode btnclass="text-lg">
	{#snippet lightIcon()}
		<ThumbsUpSolid color="red" />
	{/snippet}
	{#snippet darkIcon()}
		<ThumbsDownSolid color="green" />
	{/snippet}
</Darkmode>
