import myProps from '../calendarProps';

let defaultDate = myProps.currentDateUTC;

export const initialEvent = {
	startDate: defaultDate,
	endDate: defaultDate,
	startTime: defaultDate.hour + ':' + defaultDate.minute,
	endTime: `${defaultDate.add({ hours: 1 }).hour}:${defaultDate.add({ hours: 1 }).minute}`,
	title: 'Initial Event',
	description: 'Initial Event Description',
	location: 'Initial Event Location',
	timezone: 'UTC',
	type: 'work',
	allDay: false
};
