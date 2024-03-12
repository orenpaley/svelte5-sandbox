export const addAllDates = (monthStart) => {
	console.log('MONTH START DOW FAIL TEST', monthStart.dayOfWeek);
	let dates = [];
	let hinge = 0;

	if (monthStart.dayOfWeek === 1) {
		dates[0] = monthStart;
		hinge = 1;
	} else if (monthStart.dayOfWeek === 2) {
		dates[0] = monthStart.add({ days: -1 });
		dates[1] = monthStart;
		hinge = 2;
	} else if (monthStart.dayOfWeek === 3) {
		dates[0] = monthStart.add({ days: -2 });
		dates[1] = monthStart.add({ days: -1 });
		dates[2] = monthStart;
		hinge = 3;
	} else if (monthStart.dayOfWeek === 4) {
		dates[0] = monthStart.add({ days: -3 });
		dates[1] = monthStart.add({ days: -2 });
		dates[2] = monthStart.add({ days: -1 });
		dates[3] = monthStart;
		hinge = 4;
	} else if (monthStart.dayOfWeek === 5) {
		dates[0] = monthStart.add({ days: -4 });
		dates[1] = monthStart.add({ days: -3 });
		dates[2] = monthStart.add({ days: -2 });
		dates[3] = monthStart.add({ days: -1 });
		dates[4] = monthStart;
		hinge = 5;
	} else if (monthStart.dayOfWeek === 6) {
		dates[0] = monthStart.add({ days: -5 });
		dates[1] = monthStart.add({ days: -4 });
		dates[2] = monthStart.add({ days: -3 });
		dates[3] = monthStart.add({ days: -2 });
		dates[4] = monthStart.add({ days: -1 });
		dates[5] = monthStart;
		hinge = 6;
	} else if (monthStart.dayOfWeek === 7) {
		dates[0] = monthStart.add({ days: -6 });
		dates[1] = monthStart.add({ days: -5 });
		dates[2] = monthStart.add({ days: -4 });
		dates[3] = monthStart.add({ days: -3 });
		dates[4] = monthStart.add({ days: -2 });
		dates[5] = monthStart.add({ days: -1 });
		dates[6] = monthStart;
		hinge = 7;
	}

	console.log('adding dates middlel step success check?', dates);
	console.log('hinge', hinge);

	for (let x = 1; x < hinge; x++) {
		dates.push(monthStart.add({ days: x }));
	}
	for (let x = hinge; x < 36 - hinge; x++) {
		dates.push(monthStart.add({ days: x }));
	}

	// const foramttedDateArray = dates.map(
	//   (d) => `${d.year}-${d.month}-${d.day}`
	// );
	// console.table(foramttedDateArray);
	return dates;
};
