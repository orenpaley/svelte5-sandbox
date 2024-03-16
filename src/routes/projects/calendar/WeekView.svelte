<script>
	import {
		getWeekRange,
		isSameDay,
		createEventDictionary,
		createDateDictionary,
		mergeDatesEvents
	} from '../../../utils/calendarUtils';
	import myProps from './calendarProps';

	import { Button, Card, Dropdown, DropdownItem, uiHelpers } from 'svelte-5-ui-lib';

	let activeDay = myProps.currentDateUTC;
	let weekRange = $state(getWeekRange(activeDay));
	let weekStart = $state(weekRange[0]);
	let weekEnd = $state(weekRange[1]);

	let { changeView, view, events } = $props();

	// UI RELATED VARIABLES
	let dropdown = uiHelpers();
	let isOpen = $state(false);
	let toggle = dropdown.toggle;
	let close = dropdown.close;

	let dates = $derived.by(() => {
		return myProps.weekdays.map((d, index) => {
			let newDate = weekStart.add({ days: index });
			if (isSameDay(newDate, myProps.currentDateUTC)) {
				return { date: newDate, key: index, weekday: d, activeDay: true };
			}
			return { date: weekStart.add({ days: index }), key: index, weekday: myProps.weekdays[index] };
		});
	});

	let eventDictionary = $state(() => createEventDictionary(events));
	let dateDictionary = $state(() => createDateDictionary(dates));
	let mergedDates = $state(() => mergeDatesEvents(dateDictionary, eventDictionary));

	// UI DROPDOWN TRIGGER
	$effect(() => {
		// this can be done adding nav.navStatus directly to DOM element
		// without using effect
		console.log('merged Dates', mergedDates());
		console.log('dates', dates);
		console.log(dates[0].date.toPlainDate().toString());
		console.log('EVENTS ON DATE', mergedDates()[dates[0].date.toPlainDate().toString()].events);
		isOpen = dropdown.isOpen;
	});

	const changeWeek = (direction) => {
		let changedWeek = weekStart.add({ days: direction == 'left' ? -7 : 7 });
		weekStart = getWeekRange(changedWeek)[0];
		let changedEnd = getWeekRange(changedWeek)[1];
		weekEnd = changedEnd;
	};

	// DATES GET MESSED UP CHANIGNG MONTH THEN GOING BACK WITH WEEKS ---- FEATURE REMOVED
	const changeWeekRangeByMonth = (direction) => {
		let changedMonth = weekStart.add({ days: direction == 'left' ? -28 : 28 });
		weekStart = getWeekRange(changedMonth)[0];
		let changedMonthEnd = getWeekRange(changedMonth)[1];
		weekEnd = changedMonthEnd;
	};

	// Function to calculate top position of event overlay based on event time
</script>

<div class="calendar-header dark:bg-slate-800">
	<div class="flex content-center items-start">
		<Card class="m-auto text-center" size="lg" padding="xl">
			<div class="flex">
				<div class="flex-1">
					<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
						{myProps.months[weekStart.month - 1]}
						{weekStart.day} - {myProps.months[weekEnd.month - 1]}
						{weekEnd.day}
					</h5>
					<p class="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
						{weekStart.year}
					</p>
					<div
						class="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0 rtl:space-x-reverse"
					>
						<Button onclick={() => changeWeekRangeByMonth('left')}>{'<<<<'}</Button>
						<Button onclick={() => changeWeek('left')}>{'<<'}</Button>

						<Button onclick={() => changeWeek('right')}>{'>>'}</Button>
						<Button onclick={() => changeWeekRangeByMonth('right')}>{'>>>>'}</Button>
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
								key="day">Day</DropdownItem
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
								key="month">Month</DropdownItem
							>
						</Dropdown>
					</div>
				</div>
			</div>
		</Card>
	</div>

	<div class="week-calendar-container relative w-full">
		<!-- Background grid with days and hours -->
		<div
			class="grid-rows-25 absolute grid h-[75vh] max-h-[75vh] w-full grid-cols-7 overflow-y-scroll"
		>
			{#each dates as day, i}
				<div
					class="grid-item sticky top-0 m-2 grid border border-4 border-green-400 bg-gray-200 p-4"
					style="grid-row: 1; grid-column: {i + 1};"
				>
					{day.weekday}
				</div>
				{#each myProps.hours as hour}
					<div
						class="grid-item z-index-1 border border-gray-400 bg-gray-200 p-3"
						style="grid-row: {Number(hour) + 1}; grid-column: {i + 1};"
					>
						{hour}:00
					</div>
				{/each}
			{/each}
		</div>

		<!-- Events overlay grid -->
		<div
			class="grid-rows-25 z-index-10 absolute grid h-[75vh] max-h-[75vh] w-full grid-cols-7 overflow-y-scroll"
		>
			<!-- Render events -->
			{#each Object.entries(mergedDates()) as [key, { date, events }]}
				{#each events as event}
					<div
						class="grid-item border-3 border border-black bg-green-500 p-0"
						style="text-overflow: ellipsis;
						 grid-row: {event.startTime.slice(0, 2)}; grid-row-end: {event.endTime.slice(
							0,
							2
						)}; grid-column: {date.key + 1};
						"
					>
						{event.title}
					</div>
				{/each}
			{/each}
		</div>
	</div>
</div>
<!-- <div class="calendar-container">
		<div class="calendar-body">
			{#each dates as date, index}
				{console.log('date', date)}
				{#if date.activeDay}
					<div class="weekday" key={index}>
						<div class="weekday-header">
							{date.weekday}
							{myProps.months[date.date.month - 1]}
							{date.date.day}
						</div>
						<div class="day-area active-day-area">
							<div class="hours-day-area">
								{#each myProps.hours as hour, y}
									<div
										class="hour-area"
										date={date.date.toString()}
										data-time={hour}
										data-x={index}
										data-y={y}
										key={hour}
									>
										{hour}
									</div>
								{/each}
							</div>
						</div>
					</div>
				{:else}
					<div class="weekday" key={index}>
						<div class="weekday-header">
							<div>
								{date.weekday}
								{myProps.months[date.date.month - 1]}
								{date.date.day}
							</div>
						</div>
						<div class="day-area">
							<div class="hours-day-area">
								{#each myProps.hours as hour}
									<div class="hour-area" key={hour}>
										{hour}
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div> -->

<!-- 
<div class="grid-container grid-rows-25 grid grid-cols-7 gap-5">

	{#each events as event}
		<div
			class="event grid-item border border-blue-400 bg-blue-200 p-2"
			style="grid-row: {event.startHour + 1}; 
							grid-column: {event.day + 1} / span {event.span};"
		>
			{event.title}
		</div>
	{/each}
</div> -->
