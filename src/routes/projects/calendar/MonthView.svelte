<script>
	import { Temporal } from '@js-temporal/polyfill';
	import myProps from './calendarProps';
	import { addAllDates } from './utils.svelte';

	import {
		Button,
		Card,
		Dropdown,
		DropdownDivider,
		DropdownItem,
		uiHelpers
	} from 'svelte-5-ui-lib';

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

	let activeDay = $state(myProps.currentDateUTC);
	let monthStart = $state(
		Temporal.PlainDateTime.from({
			year: activeDay.year,
			month: activeDay.month,
			day: 1
		})
	);
	let allDatesInMonth = () => addAllDates(monthStart);
	let { changeView, view } = $props();

	const changeMonth = (direction) => {
		let changedMonth = monthStart.add({ months: direction == 'left' ? -1 : 1 });
		monthStart = changedMonth;
		allDatesInMonth = addAllDates(monthStart);
	};

	const generateMonthCells = () => {
		let datesOnGenerate = addAllDates(monthStart);
		let cells = [[], [], [], [], [], [], []];
		let index = 0;
		for (let y = 0; y < 5; y++) {
			for (let x = 0; x < 7; x++) {
				if (y == 0 && datesOnGenerate[index].month !== monthStart.month) {
					cells[y].push({
						className: 'day-in-month not-active-month',
						x: x,
						y: y,
						key: x + '-' + y,
						day: myProps.weekdays[x],
						dayOfMonth: datesOnGenerate[index].day,
						date: datesOnGenerate[index]
					});
				} else if (y === 0 && datesOnGenerate[index] == myProps.currentDateUTC) {
					cells[y].push({
						className: 'day-in-month active-day-area',
						x: x,
						y: y,
						key: x + '-' + y,
						day: myProps.weekdays[x],
						dayOfMonth: datesOnGenerate[index].day,
						date: datesOnGenerate[index]
					});
				} else if (
					datesOnGenerate[index].year == myProps.currentDateUTC.year &&
					datesOnGenerate[index].month == myProps.currentDateUTC.month &&
					datesOnGenerate[index].day == myProps.currentDateUTC.day
				) {
					cells[y].push({
						className: 'day-in-month active-day-area',
						x: x,
						y: y,
						key: x + '-' + y,
						day: myProps.weekdays[x],
						dayOfMonth: datesOnGenerate[index].day,
						date: datesOnGenerate[index]
					});
				} else if (datesOnGenerate[index].month !== monthStart.month) {
					cells[y].push({
						className: 'day-in-month not-active-month',
						x: x,
						y: y,
						key: x + '-' + y,
						day: myProps.weekdays[x],
						dayOfMonth: datesOnGenerate[index].day,
						date: datesOnGenerate[index]
					});
				} else {
					cells[y].push({
						className: 'day-in-month',
						x: x,
						y: y,
						key: x + '-' + y,
						day: myProps.weekdays[x],
						dayOfMonth: datesOnGenerate[index].day,
						date: datesOnGenerate[index]
					});
				}
				index++;
			}
		}
		console.log('CELLS MONTH VIEW', cells);
		return cells;
	};
	let calendarCells = $derived.by(() => {
		let generatedCells = generateMonthCells();
		return generatedCells;
	});
</script>

<!-- set selected to month bc we are in month view -->
<div class="calendar-header dark:bg-slate-800">
	<div class="flex content-center items-start">
		<Card class="m-auto text-center" size="lg" padding="xl">
			<div class="flex">
				<div class="flex-1">
					<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
						{myProps.months[monthStart.month - 1]}
					</h5>
					<p class="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
						{monthStart.year}
					</p>
					<div
						class="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0 rtl:space-x-reverse"
					>
						<Button onclick={() => changeMonth('left')}>{'<<<'}</Button>

						<Button onclick={() => changeMonth('right')}>{'>>>'}</Button>
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
								key="week">week</DropdownItem
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
			<DropdownItem value="day" key="day">Day</DropdownItem>
			<DropdownItem selected value="week" key="week">week</DropdownItem>
			<DropdownItem value="month" key="month">month</DropdownItem>
		</Dropdown> -->
	</div>

	<div class="calendar-container">
		<div class="calendar-body-month">
			<div class="week-in-month week-1">
				{#each calendarCells[0] as cell}
					<div
						class={cell.className}
						data-x={cell.x}
						data-y={cell.y}
						key={cell.key}
						data-day={cell.day}
						data-date={cell.date.toString()}
					>
						<div class="day-of-month-header">{cell.day}</div>
						<div class="date-in-month">{cell.dayOfMonth}</div>
					</div>
				{/each}
			</div>
			<div class="week-in-month week-2">
				{#each calendarCells[1] as cell}
					<div
						class={cell.className}
						data-x={cell.x}
						data-y={cell.y}
						key={cell.key}
						data-day={cell.day}
						data-date={cell.date.toString()}
					>
						<div class="date-in-month">{cell.dayOfMonth}</div>
					</div>
				{/each}
			</div>
			<div class="week-in-month week-3">
				{#each calendarCells[2] as cell}
					<div
						class={cell.className}
						data-x={cell.x}
						data-y={cell.y}
						key={cell.key}
						data-day={cell.day}
						data-date={cell.date.toString()}
					>
						<div class="date-in-month">{cell.dayOfMonth}</div>
					</div>
				{/each}
			</div>
			<div class="week-in-month week-4">
				{#each calendarCells[3] as cell}
					<div
						class={cell.className}
						data-x={cell.x}
						data-y={cell.y}
						key={cell.key}
						data-day={cell.day}
						data-date={cell.date.toString()}
					>
						<div class="date-in-month">{cell.dayOfMonth}</div>
					</div>
				{/each}
			</div>
			<div class="week-in-month week-5">
				{#each calendarCells[4] as cell}
					<div
						class={cell.className}
						data-x={cell.x}
						data-y={cell.y}
						key={cell.key}
						data-day={cell.day}
						data-date={cell.date.toString()}
					>
						<div class="date-in-month">{cell.dayOfMonth}</div>
					</div>
				{/each}
			</div>
			<div class="week-in-month week-6">
				{#each calendarCells[5] as cell}
					<div
						class={cell.className}
						data-x={cell.x}
						data-y={cell.y}
						key={cell.key}
						data-day={cell.day}
						data-date={cell.date.toString()}
					>
						<div class="date-in-month">{cell.dayOfMonth}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
