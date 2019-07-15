import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { tileLayer, latLng, Map } from 'leaflet';
import { NavController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { SHArea } from '../../../classes/SHArea';
import { GlobalService } from '../../../services/global.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Jdf } from '../../../libraries/jdf';
import { SHRequest } from '../../../classes/SHRequest';

@Component({
	selector: 'app-edit-request',
	templateUrl: './edit-request.component.html',
	styleUrls: ['./edit-request.component.scss'],
})
export class EditRequestComponent implements OnInit {
	lat = 29.1044;
	lng = 52.0459;
	zoom = 12;
	center = latLng([this.lat, this.lng]);
	options = {
		layers: [
			tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
				maxZoom: 20,
				subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
				detectRetina: true,
			})
		],
	};
	areas: SHArea[] = [];
	@ViewChild('area') areaSelect: IonicSelectableComponent;
	map: Map;
	locationFound = true;
	areaId = 0;
	address = '';
	@ViewChild('query') query: ElementRef;
	loadingAddress = false;
	addresses = [];
	dateText = 'انتخاب کنید';
	dateId = '';
	datePicker: any;
	time = '1';
	pickerOptions = [];
	request: SHRequest;
	firstName = '';
	mobile = '';
	phone = '';
	desc = '';

	constructor(private navCtrl: NavController, public global: GlobalService) { }

	ngOnInit() {
		const request = JSON.parse(localStorage.getItem('editRequest'));
		this.request = new SHRequest();
		this.request.personId = request._personId;
		this.request.personName = request._personName;
		this.request.workmanId = request._workmanId;
		this.request.workmanName = request._workmanName;
		this.request.workmanMobile = request._workmanMobile;
		this.request.serviceId = request._serviceId;
		this.request.serviceTitle = request._serviceTitle;
		this.request.servicePicAddress = request._servicePicAddress;
		this.request.catId = request._catId;
		this.request.catTitle = request._catTitle;
		this.request.subCatId = request._subCatId;
		this.request.subCatTitle = request._subCatTitle;
		this.request.areaId = request._areaId;
		this.request.areaTitle = request._areaTitle;
		this.request.lastName = request._lastName;
		this.request.firstName = request._firstName;
		this.request.mobile = request._mobile;
		this.request.phone = request._phone;
		this.request.address = request._address;
		this.request.longtiude = request._longtiude;
		this.request.latitiude = request._latitiude;
		this.request.desc = request._desc;
		this.request.dateFrom = request._dateFrom;
		this.request.dateFromPersian = request._dateFromPersian;
		this.request.dateFromYear = request._dateFromYear;
		this.request.dateFromMonth = request._dateFromMonth;
		this.request.dateFromDay = request._dateFromDay;
		this.request.dateTo = request._dateTo;
		this.request.dateToPersian = request._dateToPersian;
		this.request.time = request._time;
		this.request.timeDesc = request._timeDesc;
		this.request.insrtTime = request._insrtTime;
		this.request.insrtTimePersian = request._insrtTimePersian;
		this.request.insrtTimeSimple = request._insrtTimeSimple;
		this.request.updteTime = request._updteTime;
		this.request.updteTimePersian = request._updteTimePersian;
		this.request.trackingCode = request._trackingCode;
		this.request.state = request._state;
		this.request.stateTitle = request._stateTitle;
		this.request.priority = request._priority;
		this.request.priorityTitle = request._priorityTitle;
		this.request.calculatedPrice = request._calculatedPrice;
		this.request.finishByWorkman = request._finishByWorkman;
		this.request.finishTime = request._finishTime;
		this.request.visitCount = request._visitCount;
		this.request.workmanCount = request._workmanCount;
		this.request.discountCode = request._discountCode;
		this.request.discountDesc = request._discountDesc;
		this.request.discardOrExpirePersonType = request._discardOrExpirePersonType;
		this.request.discardOrExpirePersonId = request._discardOrExpirePersonId;
		this.request.discardOrExpireDesc = request._discardOrExpireDesc;
		this.request.lastStateBeforeDiscardOrExpire = request._lastStateBeforeDiscardOrExpire;

		this.dateId = `${this.request.dateFromYear}/${this.request.dateFromMonth}/${this.request.dateFromDay}`;
		this.time = this.request.time.toString();

		this.firstName = this.request.firstName;
		this.mobile = this.request.mobile;
		this.phone = this.request.phone;
		this.desc = this.request.desc;

		this.areas = [];
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('common/getAreas', {}, this.global.getPersonInfo().accessToken).subscribe((res: SHArea[]) => {
				res.map((ar) => {
					const area = new SHArea();
					area.areaId = ar.areaId;
					area.areaRatio = ar.areaRatio;
					area.areaTitle = ar.areaTitle;
					this.areas.push(area);
				});
				this.areaId = this.request.areaId;
				this.areaSelect.value = this.areas.find((x) => x.areaId === this.areaId);

				loader.dismiss();
			}, (error) => {
				loader.dismiss();
				this.global.showError(error);
			});
		});

		fromEvent(this.query.nativeElement, 'keyup')
			.pipe(debounceTime(1000))
			.pipe(distinctUntilChanged())
			.subscribe(() => {
				if (this.query.nativeElement.value === '') {
					this.addresses = [];
				} else {
					this.loadingAddress = true;
					this.global.httpPost('common/searchAddress', {
						query: this.query.nativeElement.value
					}, this.global.getPersonInfo().accessToken).subscribe((res) => {
						this.loadingAddress = false;
						this.addresses = res;
					}, (error) => {
						this.loadingAddress = false;
						this.global.showError(error);
					});
				}
			});

		this.address = this.request.address;
	}

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

	onMapReady(event: Map) {
		setTimeout(() => {
			event.invalidateSize();
			this.map = event;
			this.map.panTo([parseFloat(this.request.latitiude), parseFloat(this.request.longtiude)]);
		}, 1000);
	}

	selectAddress(item) {
		this.addresses = [];
		this.lat = parseFloat(item.lat);
		this.lng = parseFloat(item.lng);
		this.map.setZoom(18);
		setTimeout(() => {
			this.map.panTo([parseFloat(item.lat), parseFloat(item.lng)]);
		}, 400);
	}

	getLocation() {
		this.locationFound = false;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.lat = position.coords.latitude;
				this.lng = position.coords.longitude;
				this.map.setZoom(18);
				setTimeout(() => {
					this.map.panTo([this.lat, this.lng]);
				}, 400);
				this.locationFound = true;
			});
		}
	}

	areaChange(event) {
		this.areaId = event.value.areaId;
	}

	edit() {
		const date = this.dateId.split('/');
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('request/updateServiceRequest', {
				requestId: parseInt(localStorage.getItem('editRequestId'), 0),
				personId: this.global.getPersonInfo().personId,
				serviceId: this.request.serviceId,
				areaId: this.areaId,
				firstName: this.firstName,
				lastName: '',
				mobileNo: this.mobile,
				phone: this.phone,
				address: this.address,
				longtiude: this.map.getCenter().lat,
				latitiude: this.map.getCenter().lng,
				desc: this.desc,
				dateFrom: 0,
				dateFromYear: parseInt(date[0], 0),
				dateFromMonth: parseInt(date[1], 0),
				dateFromDay: parseInt(date[2], 0),
				time: this.time
			}, this.global.getPersonInfo().accessToken).subscribe((res) => {
				loader.dismiss();
				this.goBack();
			}, (error) => {
				loader.dismiss();
				this.global.showError(error);
			});
		});
	}

	goBack() {
		this.navCtrl.navigateBack('/page/myrequest/pending-request/' + localStorage.getItem('editRequestId'));
	}

	ionViewWillLeave() {
		localStorage.removeItem('editRequest');
		localStorage.removeItem('editRequestId');
	}
}
