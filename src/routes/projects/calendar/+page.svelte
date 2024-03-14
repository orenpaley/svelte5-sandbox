<script>
	import DayView from './dayView.svelte';
	import WeekView from './weekView.svelte';
	import MonthView from './monthView.svelte';
	import '../calendar/style.css';

	// import an event Model class (Add event, edit event...)
	// import mock event data

	import { initialEvent } from './event/initialEvent';
	import { mockEvents } from './event/mockEvents.svelte';

	let view = $state('week');

	function handleChangeView(e) {
		view = e.target.value;
	}

	let events = mockEvents;
</script>

<div class="calendar">
	<div class="calendar-page-container">
		<!-- <div className="sidebar"></div> -->

		{#if view === 'day'}
			<DayView changeView={handleChangeView} {view} {events} />
		{:else if view === 'month'}
			<MonthView changeView={handleChangeView} {view} {events} />
		{:else}
			<WeekView changeView={handleChangeView} {view} {events} />
		{/if}
	</div>
</div>
