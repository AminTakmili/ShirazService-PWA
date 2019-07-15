import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { SHService } from '../../classes/SHService';
import { IonSearchbar, NavController } from '@ionic/angular';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
	selector: 'app-search',
	templateUrl: './search.page.html',
	styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
	services: SHService[] = [];
	@ViewChild('query') query: IonSearchbar;
	@ViewChild('query2') query2: IonSearchbar;

	constructor(public global: GlobalService, private navCtrl: NavController) { }

	ngOnInit() {
		this.query.ionClear.subscribe(() => {
			this.services = [];
		});
		this.query2.ionClear.subscribe(() => {
			this.services = [];
		});
		this.query.ionChange
			.pipe(debounceTime(1000))
			.pipe(distinctUntilChanged())
			.subscribe(() => {
				if (this.query.value.trim() === '') {
					this.services = [];
					return false;
				}
				this.searchServices(this.query.value);
			});
		this.query2.ionChange
			.pipe(debounceTime(1000))
			.pipe(distinctUntilChanged())
			.subscribe(() => {
				if (this.query2.value.trim() === '') {
					this.services = [];
					return false;
				}
				this.searchServices(this.query2.value);
			});
	}

	searchServices(query) {
		this.services = [];
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('service/getServicesList', {
				catId: 0,
				subCatId: 0,
				title: query
			}, this.global.getPersonInfo().accessToken).subscribe((res: SHService[]) => {
				res.map((ser) => {
					const service = new SHService();
					service.basePrice = ser.basePrice;
					service.body = ser.body;
					service.catId = ser.catId;
					service.catTitle = ser.catTitle;
					service.extraField1 = ser.extraField1;
					service.extraField2 = ser.extraField2;
					service.extraTitle1 = ser.extraTitle1;
					service.extraTitle2 = ser.extraTitle2;
					service.insrtTime = ser.insrtTime;
					service.insrtTimePersian = ser.insrtTimePersian;
					service.picAddress = ser.picAddress;
					service.serviceId = ser.serviceId;
					service.serviceTitle = ser.serviceTitle;
					service.servicesCount = ser.servicesCount;
					service.subCatId = ser.subCatId;
					service.subCatTitle = ser.subCatTitle;
					service.tagId = ser.tagId;
					service.tagTitle = ser.tagTitle;
					this.services.push(service);
				});
				this.global.dismisLoading();
			}, (error) => {
				this.global.dismisLoading();
				this.global.showError(error);
			});
		});
	}

	goToService(item) {
		localStorage.setItem('service', JSON.stringify(item));
		this.navCtrl.navigateRoot('/page/home/services/detail');
	}
}
