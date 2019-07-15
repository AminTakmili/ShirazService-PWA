import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SHService } from '../../classes/SHService';

@Component({
	selector: 'app-services',
	templateUrl: './services.page.html',
	styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
	services: SHService[] = [];
	catId = 0;
	subCatId = 0;

	constructor(public global: GlobalService, private navCtrl: NavController, private route: ActivatedRoute) { }

	ngOnInit() {
	}

	ionViewWillEnter() {
		this.catId = (this.route.snapshot.params.id) ? this.route.snapshot.params.id : 0;
		this.subCatId = (this.route.snapshot.params.subId) ? this.route.snapshot.params.subId : 0;
		this.services = [];
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('service/getServicesList', {
				catId: this.catId,
				subCatId: this.subCatId,
				title: ''
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

	goTo(item) {
		localStorage.setItem('service', JSON.stringify(item));
		this.navCtrl.navigateForward('/page/home/services/detail');
	}

	goBack() {
		this.navCtrl.navigateBack('/page/home/' + this.catId);
	}
}
