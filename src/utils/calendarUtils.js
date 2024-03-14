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

export function renderEvent(event) {
	return {
		startDate: event.startDate,
		endDate: event.endDate,
		startTime: event.startTime,
		endTime: event.endTime,
		title: event.title,
		description: event.description,
		location: event.location,
		timezone: event.timezone,
		type: event.type,
		allDay: event.allDay
	};
}

export function createEventDictionary(events) {
	const eventDictionary = {};

	// Iterate over each event object

	events.forEach((event) => {
		// Extract the date from the startDate
		const startDate = event.startDate.toPlainDate();

		// Convert date to ISO string format (yyyy-mm-dd)
		const dateString = startDate.toString();

		// Check if the date already exists in the dictionary
		if (eventDictionary[dateString]) {
			eventDictionary[dateString] = [...eventDictionary[dateString], event];
		} else {
			// Date does not exist, create a new array with the event
			eventDictionary[dateString] = new Array(event);
		}
	});
	console.log('event dict generated', eventDictionary);
	return eventDictionary;
}

export function createDateDictionary(dates) {
	const dateDictionary = {};

	// Iterate over each date object
	dates.forEach((date) => {
		// Convert date to ISO string format (yyyy-mm-dd)
		let dateString = date.date.toPlainDate().toString();
		dateDictionary[dateString] = { date };
	});
	return dateDictionary;
}

export const mergeDatesEvents = (dateDictionary, eventDictionary) => {
	// Get the date and event dictionaries
	const dates = dateDictionary();
	const events = eventDictionary();

	// Create a merged dictionary
	let merged = {};

	// Iterate over the keys of the event dictionary
	Object.keys(dates).forEach((dateKey) => {
		// Check if the date key exists in the date dictionary
		if (events.hasOwnProperty(dateKey)) {
			// Add the events to the corresponding date in the date dictionary
			merged[dateKey] = { ...dates[dateKey], events: events[dateKey] };
		} else {
			// If the date key does not exist in the date dictionary, add it with the events
			merged[dateKey] = { date: dateKey, events: [] };
		}
	});

	return merged;
};
