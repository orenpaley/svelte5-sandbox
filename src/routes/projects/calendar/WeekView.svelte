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

	let dragging = $state(false);

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

	function startDragging(event, eventData) {
		dragging = true;
		const rect = event.target.getBoundingClientRect();
		let startX = Math.round((event.clientX - rect.left) / 180);
		let startY = Math.round((event.clientY - rect.top) / 50);
		console.log('START X', startX, 'START Y', startY);

		const handleMouseMove = (e) => {
			if (!dragging) return;
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			eventData.x = x;
			eventData.y = y;
			console.log('x', eventData.x, 'y', eventData.y);
		};

		const handleMouseUp = () => {
			if (!dragging) return;
			dragging = false;

			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			console.log('event time br change', eventData.startTime);
			let xResult = eventData.startDate.dayOfWeek + Math.round(eventData.x / 180);
			let yResult = Math.round(eventData.startTime.split(':')[0] - eventData.y / 50);

			// Update event data with new position
			eventData.startTime = `${yResult.toString().padStart(2, '0')}:00`;
			eventData.endTime = `${(yResult + 1).toString().padStart(2, '0')}:00`;
			// eventData.startDate = eventData.startDate.add({ days: Math.floor(xResult) });
			console.log('event time after change', eventData.startTime);

			// You may want to save this data somewhere, like updating it in your data store
			events = [...events];
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	}

	// Function to calculate top position of event overlay based on event time
</script>

<div class="calendar-header absolute overflow-hidden dark:bg-slate-800">
	<div class="m-[2vw] flex content-center items-start">
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
	<!-- Calendar Header -->
	<div class="m-auto flex max-w-[80vw] flex-row">
		{#each dates as day, i}
			<div
				class="border-right-2 border-slate-20 m-0 m-0 h-full w-full border-x-2 p-0 text-center text-slate-200"
				style="grid-row: 1; grid-column: {i + 1};"
			>
				<h3 class="font-bold">{day.weekday}</h3>
				<div class="font-light italic">
					{myProps.months[day.date.month - 1]}
					{day.date.day}
				</div>
			</div>
		{/each}
	</div>
	<!-- Calendar Main -->

	<!-- Grid -->
	<div
		class="grid-rows-25 m-auto grid h-[75vh] max-h-[75vh] min-h-[75vh] max-w-[80vw] grid-cols-7 overflow-auto p-0"
	>
		{#each dates as day, i}
			{#each myProps.hours as hour}
				<div
					class="z-index-1 min-h-[5vh] min-w-[9vh] p-0 text-slate-400"
					style="grid-row: {Number(hour) + 1}; grid-column: {i + 1};"
				>
					{hour}:00
				</div>
				{#each Object.entries(mergedDates()) as [key, { date, events }]}
					{#each events as event}
						<div
							class="z-index-15 min-h-[5vh] min-w-[9vh] overflow-clip border border-black bg-green-400 p-0 opacity-5"
							style="text-overflow: ellipsis; grid-row: {Number(event.startTime.slice(0, 2)) +
								1}; grid-row-end: {Number(event.endTime.slice(0, 2)) + 1}; grid-column: {date.key +
								1};"
						>
							<div>
								<h4 class="text-sm font-bold">{event.title}</h4>
								<p class="text-purple-700">{event.location}</p>
								<p class="text-sm font-light italic">
									{event.description.length > 8
										? event.description.slice(0, 8) + '...'
										: event.description}
								</p>
							</div>
						</div>
					{/each}
				{/each}
			{/each}
		{/each}
	</div>
</div>
