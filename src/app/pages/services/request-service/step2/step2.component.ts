import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Jdf } from '../../../../libraries/jdf';

@Component({
	selector: 'app-step2',
	templateUrl: './step2.component.html',
	styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements OnInit {
	dateText = 'انتخاب کنید';
	dateId = '';
	datePicker: any;
	time = '1';
	pickerOptions = [];

	constructor(private navCtrl: NavController) { }

	ngOnInit() { }

	ionViewWillEnter() {
		const weekday =  ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه', 'شنبه'];
		const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
		const day1 = new Date();
		const day1Date = Jdf.gregorian_to_jalali(day1.getFullYear(), day1.getMonth() + 1, day1.getDate());
		const day2 = new Date();
		day2.setDate(day2.getDate() + 1);
		const day2Date = Jdf.gregorian_to_jalali(day2.getFullYear(), day2.getMonth() + 1, day2.getDate());
		const day3 = new Date();
		day3.setDate(day3.getDate() + 2);
		const day3Date = Jdf.gregorian_to_jalali(day3.getFullYear(), day3.getMonth() + 1, day3.getDate());
		const day4 = new Date();
		day4.setDate(day4.getDate() + 3);
		const day4Date = Jdf.gregorian_to_jalali(day4.getFullYear(), day4.getMonth() + 1, day4.getDate());
		const day5 = new Date();
		day5.setDate(day5.getDate() + 4);
		const day5Date = Jdf.gregorian_to_jalali(day5.getFullYear(), day5.getMonth() + 1, day5.getDate());

		this.pickerOptions = [
			{
				value: day1Date.join('/'),
				text: `امروز - ${weekday[day1.getDay()]} - ${day1Date[2]} ${months[day1Date[1] - 1]}`,
			},
			{
				value: day2Date.join('/'),
				text: `فردا - ${weekday[day2.getDay()]} - ${day2Date[2]} ${months[day2Date[1] - 1]}`,
			},
			{
				value: day3Date.join('/'),
				text: `پس فردا - ${weekday[day3.getDay()]} - ${day3Date[2]} ${months[day3Date[1] - 1]}`,
			},
			{
				value: day4Date.join('/'),
				text: `${weekday[day4.getDay()]} - ${day4Date[2]} ${months[day4Date[1] - 1]}`,
			},
			{
				value: day5Date.join('/'),
				text: `${weekday[day5.getDay()]} - ${day5Date[2]} ${months[day5Date[1] - 1]}`,
			}
		];

		if (this.dateId === '') {
			this.dateId = day1Date.join('/');
		}
		if (this.dateText === 'انتخاب کنید') {
			this.dateText = `امروز - ${weekday[day1.getDay()]} - ${day1Date[2]} ${months[day1Date[1] - 1]}`;
		}
	}

	goToStep3() {
		localStorage.setItem('time', this.time);
		localStorage.setItem('date', this.dateId);

		this.navCtrl.navigateForward('/page/home/services/request/step-3');
	}

	goBack() {
		this.navCtrl.navigateBack('/page/home/services/request/step-1');
	}
}
