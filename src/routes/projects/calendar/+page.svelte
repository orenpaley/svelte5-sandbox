<script>
	import DayView from './dayView.svelte';
	import WeekView from './weekView.svelte';
	import MonthView from './monthView.svelte';
	import '../calendar/style.css';

	let view = $state('week');

	function handleChangeView(e) {
		view = e.target.value;
	}
</script>

<div class="calendar">
	<div class="calendar-page-container">
		<!-- <div className="sidebar"></div> -->

		{#if view === 'day'}
			<DayView changeView={handleChangeView} {view} />
		{:else if view === 'month'}
			<MonthView changeView={handleChangeView} {view} />
		{:else}
			<WeekView changeView={handleChangeView} {view} />
		{/if}
	</div>
</div>
