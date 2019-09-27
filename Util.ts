import { PhotoFromFetch, PhotosByDate } from './App';

type NiceD = {
	year: number;
	month: number;
	day: number;
};

const NiceDate = (date: number): NiceD => {
	const d = new Date(date),
		year = d.getFullYear(),
		month = d.getMonth() + 1,
		day = d.getDate();

	return { year, month, day };
};

const FilterAndSort = (photos: PhotoFromFetch[]): PhotosByDate[] => {
	const dates = photos
		.map(x => x.date)
		.sort()
		.reverse();

	const sortedPhotos = dates.map(
		(d): PhotosByDate => {
			const filtered = photos
				.filter(({ date }) => NiceDate(date).day === NiceDate(d).day)
				.map(x => x.uri);

			const data = Array.from(new Set(filtered));

			return {
				section: {
					date: FormatDate(NiceDate(d))
				},
				data
			};
		}
	);

	return sortedPhotos.filter((p, i) => sortedPhotos.indexOf(p) === i);
};

const StringArrayIsEqual = (a: string[], b: string[]): boolean => {
	if (a === b) return true;
	if (!a || !b) return false;
	if (a.length !== b.length) return false;

	for (const i in a) {
		if (a[i] !== b[i]) return false;
	}
	return true;
};

const OneLevel = (a: {}, b: {}): boolean => {
	if (a === b) return true;
	if (!a || !b) return false;

	const [aKeys, bKeys] = [a, b].map(Object.keys);

	if (aKeys.length !== bKeys.length) return false;

	if (!StringArrayIsEqual(aKeys, bKeys)) return false;

	for (const key of aKeys) {
		if (!b[key]) return false;

		if (Object.keys(a[key]).length) {
			return OneLevel(a[key], b[key]);
		}
		if (a[key] !== b[key]) return false;
	}

	return true;
};

const MonthMap = {
	1: 'January',
	2: 'February',
	3: 'March',
	4: 'April',
	5: 'May',
	6: 'June',
	7: 'July',
	8: 'August',
	9: 'September',
	10: 'October',
	11: 'November',
	12: 'December'
};

const FormatDate = ({ year, month, day }: NiceD) => {
	const niceMonth = MonthMap[month];

	return `${niceMonth} ${day}, ${year}`;
};

export { FilterAndSort, OneLevel, FormatDate };
