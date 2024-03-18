import myProps from '../calendarProps';

let defaultDate = myProps.currentDateUTC;

export const mockEvents = [
	{
		startDate: defaultDate,
		endDate: defaultDate,
		startTime: `06:30`,
		endTime: `07:30`,
		title: 'Grand Canyon has a much longer title',
		description: 'Event was is super cool',
		location: 'Alien Land',
		timezone: 'UTC',
		type: 'study',
		allDay: false
	},
	{
		startDate: defaultDate,
		endDate: defaultDate,
		startTime: `09:30`,
		endTime: `11:30`,
		title: 'Fantastico',
		description: 'this one is futuristic',
		location: 'Future Land',
		timezone: 'UTC',
		type: 'study',
		allDay: false
	},
	{
		startDate: defaultDate,
		endDate: defaultDate,
		startTime: `11:00`,
		endTime: `14:00`,
		title: 'One Cool Place',
		description: 'Loooooonnnnnnggggggg event',
		location: 'Long Island',
		timezone: 'UTC',
		type: 'fun',
		allDay: false
	},
	{
		startDate: defaultDate.add({ days: 2 }),
		endDate: defaultDate.add({ days: 2 }),
		startTime: `15:00`,
		endTime: `18:00`,
		title: 'Best Place To Be',
		description: 'Loooooonnnnnnggggggg event',
		location: 'Long Island',
		timezone: 'UTC',
		type: 'fun',
		allDay: false
	},
	{
		startDate: defaultDate.subtract({ days: 3 }),
		endDate: defaultDate.subtract({ days: 1 }),
		startTime: `07:00`,
		endTime: `09:00`,
		title: 'All The things',
		description: 'Event was is super cool',
		location: 'Alien Land',
		timezone: 'UTC',
		type: 'study',
		allDay: false
	},
	{
		startDate: defaultDate.subtract({ days: 5 }),
		endDate: defaultDate.subtract({ days: 5 }),
		startTime: `12:57`,
		endTime: `14:52`,
		title: 'Event 6',
		description: 'Event was is super cool',
		location: 'Alien Land',
		timezone: 'UTC',
		type: 'study',
		allDay: false
	},
	{
		startDate: defaultDate.add({ days: 5 }),
		endDate: defaultDate.add({ days: 10 }),
		startTime: `18:00`,
		endTime: `20:00`,
		title: 'Event 7',
		description: 'Event was is super cool',
		location: 'Alien Land',
		timezone: 'UTC',
		type: 'study',
		allDay: false
	}
];
