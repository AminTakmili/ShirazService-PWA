import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SHService } from '../../../../classes/SHService';
import { tileLayer, latLng, Map } from 'leaflet';
import { GlobalService } from '../../../../services/global.service';
import { SHArea } from '../../../../classes/SHArea';
import { NavController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
	selector: 'app-step1',
	templateUrl: './step1.component.html',
	styleUrls: ['./step1.component.scss'],
})
export class Step1Component implements OnInit {
	service: SHService;
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

	constructor(public global: GlobalService, private navCtrl: NavController) { }

	ngOnInit() {
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

				this.global.dismisLoading();
			}, (error) => {
				this.global.dismisLoading();
				this.global.showError(error);
			});
		});

		const service = JSON.parse(localStorage.getItem('service'));
		this.service = new SHService();
		this.service.basePrice = service._basePrice;
		this.service.body = service._body;
		this.service.catId = service._catId;
		this.service.catTitle = service._catTitle;
		this.service.extraField1 = service._extraField1;
		this.service.extraField2 = service._extraField2;
		this.service.extraTitle1 = service._extraTitle1;
		this.service.extraTitle2 = service._extraTitle2;
		this.service.insrtTime = service._insrtTime;
		this.service.insrtTimePersian = service._insrtTimePersian;
		this.service.picAddress = service._picAddress;
		this.service.serviceId = service._serviceId;
		this.service.serviceTitle = service._serviceTitle;
		this.service.servicesCount = service._servicesCount;
		this.service.subCatId = service._subCatId;
		this.service.subCatTitle = service._subCatTitle;
		this.service.tagId = service._tagId;
		this.service.tagTitle = service._tagTitle;

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

	ionViewWillEnter() {
	}

	onMapReady(event: Map) {
		setTimeout(() => {
			event.invalidateSize();
			this.map = event;
		}, 1000);
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

	goToStep2() {
		if (this.areaId === 0) {
			this.global.showToast('محدوده آدرس انتخاب نشده است', 2000, 'bottom', 'warning');
			return false;
		}
		if (this.address.trim() === '') {
			this.global.showToast('آدرس دقیق محل خدمت انتخاب نشده است', 2000, 'bottom', 'warning');
			return false;
		}
		localStorage.setItem('longtiude', this.map.getCenter().lng.toString());
		localStorage.setItem('latitiude', this.map.getCenter().lat.toString());
		localStorage.setItem('zoom', this.map.getZoom().toString());
		localStorage.setItem('areaId', this.areaId.toString());
		localStorage.setItem('address', this.address);

		this.navCtrl.navigateForward('/page/home/services/request/step-2');
	}

	goBack() {
		this.navCtrl.navigateBack('/page/home/services/detail');
	}
}
