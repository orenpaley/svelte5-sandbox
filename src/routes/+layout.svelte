<script>
	import '../app.pcss';
	import {
		Navbar,
		NavLi,
		NavBrand,
		NavUl,
		uiHelpers,
		Dropdown,
		DropdownItem,
		DropdownDivider,
		Button
	} from 'svelte-5-ui-lib';

	let nav = uiHelpers();
	let dropdown = uiHelpers();

	//NAV UI RELATED VARIABLES
	let navStatus = $state(false);
	let toggleNav = nav.toggle;
	let closeNav = nav.close;

	// DROPDOWN UI RELATED VARIABLES
	let isOpen = $state(false);
	let toggleDropdown = dropdown.toggle;
	let closeDropdown = dropdown.close;

	$effect(() => {
		// this can be done adding nav.navStatus directly to DOM element
		// without using effect
		isOpen = dropdown.isOpen;
	});
</script>

<Navbar {toggleNav} {closeNav} {navStatus} breakPoint="md">
	{#snippet brand()}
		<NavBrand siteName="Svelte 5"></NavBrand>
	{/snippet}

	<NavUl>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/blog">Blog</NavLi>
		<NavLi>
			<NavLi {isOpen} onclick={toggleDropdown}>Projects</NavLi>
			<div class="relative">
				<Dropdown {isOpen} divclass="absolute -left-[27px]">
					<DropdownItem onclick={closeDropdown} href="/projects/calendar">Calendar</DropdownItem>
					<DropdownDivider />
				</Dropdown>
			</div>
		</NavLi>
		<NavLi href="/industries">Industries</NavLi>
		<NavLi href="/settings">Settings</NavLi>
	</NavUl>
</Navbar>

<slot />
