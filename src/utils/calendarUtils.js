import { Temporal } from '@js-temporal/polyfill';

export function milli() {
	const days = (numDays) => {
		return numDays * 24 * 60 * 60 * 1000;
	};
	return {
		days
	};
}

export function getWeekRange(currentDay = Temporal.Now.plainDateISO()) {
	let startWeek, endWeek;

	console.log('current day weekday', currentDay.dayOfWeek);

	if (currentDay.dayOfWeek === 1) {
		startWeek = currentDay;
		endWeek = currentDay.add({ days: 6 });
	} else if (currentDay.dayOfWeek === 2) {
		startWeek = currentDay.subtract({ days: 1 });
		endWeek = currentDay.add({ days: 5 });
	} else if (currentDay.dayOfWeek === 3) {
		startWeek = currentDay.subtract({ days: 2 });
		endWeek = currentDay.add({ days: 4 });
	} else if (currentDay.dayOfWeek === 4) {
		startWeek = currentDay.subtract({ days: 3 });
		endWeek = currentDay.add({ days: 3 });
	} else if (currentDay.dayOfWeek === 5) {
		startWeek = currentDay.subtract({ days: 4 });
		endWeek = currentDay.add({ days: 2 });
	} else if (currentDay.dayOfWeek === 6) {
		startWeek = currentDay.subtract({ days: 5 });
		endWeek = currentDay.add({ days: 1 });
	} else if (currentDay.dayOfWeek === 7) {
		startWeek = currentDay.subtract({ days: 6 });
		endWeek = currentDay;
	}

	console.log('WEEK RANGE CHECKER: ', startWeek.day, endWeek.day);
	return [startWeek, endWeek];
}

export const isSameDay = (dateTime1, dateTime2) => {
	if (
		dateTime1.year === dateTime2.year &&
		dateTime1.month === dateTime2.month &&
		dateTime1.day === dateTime2.day
	) {
		return true;
	}
	return false;
};

export function formatDateToYYYYMMDD(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}${month}${day}`;
}

export function parseYYYYMMDDtoDate(yyyymmdd) {
	const year = parseInt(yyyymmdd.substring(0, 4), 10);
	const month = parseInt(yyyymmdd.substring(4, 6), 10) - 1; // Month is zero-indexed
	const day = parseInt(yyyymmdd.substring(6, 8), 10);

	return new Date(year, month, day);
}
