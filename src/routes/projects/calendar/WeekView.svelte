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
		console.log('dates', dates);
		console.log('merged dates', mergedDates());
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
	function calculateTopPosition(time) {
		// Parse the time string into hours and minutes
		const [hours, minutes] = time.split(':').map(Number);
		// Calculate the total minutes since midnight
		const totalMinutes = hours * 60 + minutes;
		// Calculate the top position based on the height of each hour division
		return totalMinutes * (100 / 24) + '%';
	}
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
		<div class="grid grid-cols-7 gap-0 bg-slate-700 text-slate-200">
			{#each dates as date}
				<div class="grid-rows-24 grid grid-cols-1">
					<div class="font-bold">{date.weekday}</div>
					{#each Array(24) as _, hour}
						<div
							class={`hour-${hour + 1} week-${date.weekday} relative rounded-md border border-gray-300`}
							data-x={date.index + 1}
							data-y={hour + 1}
						>
							{hour + 1}
							{#if mergedDates()[date.date.toPlainDate().toString()]}
								<div class="inline-grid">
									{#each mergedDates()[date.date.toPlainDate().toString()].events as event}
										{#if event.startTime.slice(0, 2) == hour + 1}
											<div
												class="event z-index-2 absolute col-start-1 col-end-4 row-start-1 row-end-4 bg-green-500"
											>
												Event {event.startTime}
											</div>
										{/if}
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>
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
