import myProps from '../calendarProps';

let defaultDate = myProps.currentDateUTC;

export const mockEvents = [
	{
		startDate: defaultDate,
		endDate: defaultDate,
		startTime: `${defaultDate.hour}:${defaultDate.minute}`,
		endTime: `${defaultDate.add({ hours: 1 }).hour}:${defaultDate.add({ hours: 1 }).minute}`,
		title: 'Event 1',
		description: 'Event was is super cool',
		location: 'Alien Land',
		timezone: 'UTC',
		type: 'study',
		allDay: false
	},
	{
		startDate: defaultDate,
		endDate: defaultDate,
		startTime: `${defaultDate.add({ hours: 2 })}:${defaultDate.add({ hours: 2 }).minute}`,
		endTime: `${defaultDate.add({ hours: 3 }).hour}:${defaultDate.add({ hours: 3 }).minute}`,
		title: 'Event 2',
		description: 'this one is futuristic',
		location: 'Future Land',
		timezone: 'UTC',
		type: 'study',
		allDay: false
	},
	{
		startDate: defaultDate,
		endDate: defaultDate,
		startTime: `${defaultDate.add({ hours: 7 })}:${defaultDate.add({ hours: 7 }).minute}`,
		endTime: `${defaultDate.add({ hours: 9 }).hour}:${defaultDate.add({ hours: 9 }).minute}`,
		title: 'Event 3',
		description: 'Loooooonnnnnnggggggg event',
		location: 'Long Island',
		timezone: 'UTC',
		type: 'fun',
		allDay: false
	},
	{
		startDate: defaultDate.add({ days: 2 }),
		endDate: defaultDate.add({ days: 2 }),
		startTime: `${defaultDate.add({ days: 2, hours: 7 })}:${defaultDate.add({ days: 2, hours: 7 }).minute}`,
		endTime: `${defaultDate.add({ days: 2, hours: 9 }).hour}:${defaultDate.add({ days: 2, hours: 9 }).minute}`,
		title: 'Event 3',
		description: 'Loooooonnnnnnggggggg event',
		location: 'Long Island',
		timezone: 'UTC',
		type: 'fun',
		allDay: false
	},
	{
		startDate: defaultDate.subtract({ days: 3 }),
		endDate: defaultDate,
		startTime: `${defaultDate.subtract({ days: 3, hours: 7 }).hour}:${defaultDate.minute}`,
		endTime: `${defaultDate.hour}:${defaultDate.add({ hours: 1 }).minute}`,
		title: 'Event 6',
		description: 'Event was is super cool',
		location: 'Alien Land',
		timezone: 'UTC',
		type: 'study',
		allDay: false
	}
];
