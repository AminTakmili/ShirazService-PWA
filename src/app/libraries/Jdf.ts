
export class Jdf {
	public static gregorian_to_jalali(gy: number, gm: number, gd: number) {
		let g_d_m: number[];
		let jy: number = 0;
		let jm: number = 0;
		let jd: number = 0;
		let gy2: number = 0;
		let days: number = 0;
		g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
		if (gy > 1600) {
			jy = 979;
			gy -= 1600;
		} else {
			jy = 0;
			gy -= 621;
		}
		gy2 = (gm > 2) ? (gy + 1) : gy;
		days = (365 * gy) + (parseInt(((parseInt(gy2.toString(), 0) + 3) / 4).toString(), 0)) - (parseInt(((parseInt(gy2.toString(), 0) + 99) / 100).toString(), 0)) + (parseInt(((parseInt(gy2.toString(), 0) + 399) / 400).toString(), 0)) - 80 + gd + g_d_m[gm - 1];
		jy += 33 * (parseInt((parseInt(days.toString(), 0) / 12053).toString(), 0));
		days %= 12053;
		jy += 4 * (parseInt((parseInt(days.toString(), 0) / 1461).toString(), 0));
		days %= 1461;
		if (days > 365) {
			jy += parseInt(((parseInt(days.toString(), 0) - 1) / 365).toString(), 0);
			days = (days - 1) % 365;
		}
		jm = (days < 186) ? 1 + parseInt((parseInt(days.toString(), 0) / 31).toString(), 0) : 7 + parseInt(((parseInt(days.toString(), 0) - 186) / 30).toString(), 0);
		jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
		return [jy, jm, jd];
	}
}
