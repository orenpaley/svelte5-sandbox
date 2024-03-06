<script>
	import { Temporal } from '@js-temporal/polyfill';
	import { getWeekRange, isSameDay } from '../../../utils/calendarUtils';
	import props from './calendarProps';

	let activeDay = props.currentDateUTC;
	let weekRange = $state(getWeekRange(activeDay));
	let weekStart = $state(weekRange[0]);
	let weekEnd = $state(weekRange[1]);

	let dates = $derived.by(() => {
		return props.weekdays.map((d, index) => {
			let newDate = weekStart.add({ days: index });
			console.log('check equal type', newDate.year, props.currentDateUTC.year);
			if (isSameDay(newDate, props.currentDateUTC)) {
				return { date: weekStart, key: index, activeDay: true };
			}
			return { date: weekStart.add({ days: index }), key: index, weekday: props.weekdays[index] };
		});
	});

	console.log('dates', dates);

	const changeWeek = (direction) => {
		let changedWeek = weekStart.add({ days: direction == 'left' ? -7 : 7 });
		weekStart = changedWeek;
		let changedEnd = changedWeek.add({ days: 6 });
		weekEnd = changedEnd;
	};

	// DATES GET MESSED UP CHANIGNG MONTH THEN GOING BACK WITH WEEKS ---- FEATURE REMOVED
	const changeWeekRangeByMonth = (direction) => {
		let changedMonth = weekStart.add({ days: direction == 'left' ? -28 : 28 });
		weekStart = changedMonth;
		let changedMonthEnd = changedMonth.add({ days: 6 });
		weekEnd = changedMonthEnd;
	};
</script>

<h1>CALENDAR WEEK VIEW</h1>
<div class="calendar-header">
	<div class="calendar-nav">
		<div class="change-week-nav">
			<button onclick={changeWeekRangeByMonth('left')}>{'<<<<'}</button>
			<button onclick={changeWeek('left')}>{'<<'}</button>
			<h4>
				{props.months[weekStart.month]}
				{weekStart.day} - {props.months[weekEnd.month]}
				{weekEnd.day}
			</h4>
			<button onclick={changeWeek('right')}>{'>>'}</button>
			<button onclick={changeWeekRangeByMonth('right')}>{'>>>>'}</button>
		</div>
	</div>
	<div class="calendar-container">
		<div class="calendar-body">
			{#each dates as date}
				{#if activeDay}
					<div class="weekday" key={date.key}>
						<div class="weekday-header">
							<div>
								{date.weekday}
								{props.months[date.month + 1]}
								{date.day}
							</div>
						</div>
						<div class="day-area active-day-area">
							<div class="hours-day-area">
								{#each props.hours as hour}
									<div class="hour-area" key={hour}>
										{hour}
									</div>
								{/each}
							</div>
						</div>
					</div>
				{:else}
					<div class="weekday" key={date.index}>
						<div class="weekday-header">
							<div>
								{date.weekday}
								{props.months[date.month + 1]}
								{date.day}
							</div>
						</div>
						<div class="day-area">
							<div class="hours-day-area">
								{#each props.hours as hour}
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
	</div>
</div>
xx
