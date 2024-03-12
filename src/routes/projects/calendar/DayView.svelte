<script>
	import myProps from './calendarProps';
	import {
		Button,
		Card,
		Dropdown,
		DropdownDivider,
		DropdownItem,
		uiHelpers
	} from 'svelte-5-ui-lib';

	let currentday = myProps.currentDateUTC;
	let activeday = $state(currentday);
	let activemonth = $state(currentday.month);
	let { changeView, view } = $props();

	let dropdown = uiHelpers();
	let isOpen = $state(false);
	let toggle = dropdown.toggle;
	let close = dropdown.close;

	// UI DROPDOWN TRIGGER
	$effect(() => {
		// this can be done adding nav.navStatus directly to DOM element
		// without using effect
		isOpen = dropdown.isOpen;
	});

	const changeday = (direction) => {
		let changedday = activeday.add({ days: direction == 'left' ? -1 : 1 });
		activeday = changedday;
	};

	const changeWeek = (direction) => {
		let changedday = activeday.add({ days: direction == 'left' ? -7 : 7 });
		activeday = changedday;
	};
</script>

<div class=" calendar-header dark:bg-slate-800">
	<div class="flex content-center items-start">
		<Card class="m-auto text-center" size="lg" padding="xl">
			<div class="flex">
				<div class="flex-1">
					<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
						{myProps.months[activeday.month - 1]}
						{activeday.day}
					</h5>
					<p class="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
						{activeday.year}
					</p>
					<div
						class="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0 rtl:space-x-reverse"
					>
						<Button onclick={() => changeWeek('left')}>{'<'}</Button>
						<Button onclick={() => changeday('left')}>{'<<'}</Button>

						<Button onclick={() => changeday('right')}>{'>'}</Button>
						<Button onclick={() => changeWeek('right')}>{'>>'}</Button>
					</div>
				</div>
				<div>
					<Button color="light" onclick={toggle}>{view}</Button>
					<div class="relative m-auto">
						<Dropdown {isOpen} divclass="relative --right-[27px]">
							<DropdownItem
								onfocus={(e) => changeView(e)}
								onclick={close}
								href="#"
								value="day"
								key="day">day</DropdownItem
							>
							<DropdownItem
								onfocus={(e) => changeView(e)}
								onclick={close}
								href="#"
								value="week"
								key="month">Week</DropdownItem
							>
							<DropdownItem
								onfocus={(e) => changeView(e)}
								onclick={close}
								href="#"
								value="month"
								key="month">month</DropdownItem
							>
						</Dropdown>
					</div>
				</div>
			</div>
		</Card>
		<!-- <Dropdown onclick={toggle} onchange={(e) => changeView(e)}>
			<DropdownItem value="day" key="day">day</DropdownItem>
			<DropdownItem selected value="week" key="week">Week</DropdownItem>
			<DropdownItem value="month" key="month">month</DropdownItem>
		</Dropdown> -->
	</div>
	<div class="calendar-container">
		<div class="calendar-body calendar-body-day">
			{#if currentday.year === activeday.year && currentday.month === activeday.month && currentday.day === activeday.day}
				<div class="single-day active-day-area">
					<div class="day-area-horizontal">
						<div class="hours-day-area-horizontal">
							{#each myProps.hours as hour}
								<div class="hour-area-horizontal" key={hour}>
									{hour}
								</div>
							{/each}
						</div>
					</div>
				</div>
			{:else}
				<div class="single-day">
					<div class="day-area-horizontal">
						<div class="hours-day-area-horizontal">
							{#each myProps.hours as hour}
								<div class="hour-area-horizontal" key={hour}>
									{hour}
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
