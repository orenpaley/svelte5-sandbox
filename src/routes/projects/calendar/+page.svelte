<script>
	import calendarProps from './calendarProps';
	import DayView from './DayView.svelte';
	import WeekView from './WeekView.svelte';
	import MonthView from './MonthView.svelte';

	import '../calendar/style.css';

	let view = 'week';
	let timezone = 'UTC';

	const handleChangeTimezone = (e) => {
		timezone = e.target.value;
	};

	const handleChangeView = (e) => {
		view = e.target.value;
	};
</script>

<div class="calendar">
	<div class="calendar-page-container">
		<!-- <div className="sidebar"></div> -->
		<select bind:value={view} on:change={handleChangeView}>
			<option value="day">Day</option>
			<option value="week">Week</option>
			<option value="month">Month</option>
		</select>

		{#if view === 'day'}
			<DayView props={calendarProps} {view} {handleChangeView} {timezone} {handleChangeTimezone} />
		{:else if view === 'month'}
			<MonthView
				props={calendarProps}
				{view}
				{handleChangeView}
				{timezone}
				{handleChangeTimezone}
			/>
		{:else}
			<WeekView props={calendarProps} {view} {handleChangeView} {timezone} {handleChangeTimezone} />
		{/if}
	</div>
</div>
