import { Component, OnInit } from '@angular/core';
import { SHService } from '../../../classes/SHService';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
	service: SHService;

	constructor(private navCtrl: NavController) { }

	ngOnInit() {
	}

	ionViewWillEnter() {
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
	}

	goToSteps() {
		this.navCtrl.navigateForward('/page/home/services/request/step-1');
	}

	goBack() {
		this.navCtrl.navigateBack('/page/home/services/list/' + this.service.catId + '/' + this.service.subCatId);
	}
}
