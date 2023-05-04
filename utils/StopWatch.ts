import { TimeType } from "./TimeType";

export function DisplayTimer({
	milliseconds,
	seconds,
	minutes,
	hours,
}: TimeType) {
	milliseconds += milliseconds;
	if (milliseconds === 1000) {
		seconds += 1;
		milliseconds = 0;
		if (seconds === 60) {
			minutes += 1;
			seconds = 0;
			if (minutes === 60) {
				hours += 1;
				minutes = 0;
			}
		}
	}
}
