export type TimeType = {
	milliseconds: number;
	seconds: number;
	minutes: number;
	hours: number;
	id: number;
	intervalId?: ReturnType<typeof setTimeout>;
};

export const initTimer: TimeType = {
	milliseconds: 0,
	seconds: 0,
	minutes: 0,
	hours: 0,
	id: 0,
};
