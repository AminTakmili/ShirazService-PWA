import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { GlobalService } from '../../../../services/global.service';
import { SHService } from '../../../../classes/SHService';
import { SHPerson } from '../../../..//classes/SHPerson';

@Component({
	selector: 'app-step5',
	templateUrl: './step5.component.html',
	styleUrls: ['./step5.component.scss'],
})
export class Step5Component implements OnInit {
	descriptionForm: FormGroup;
	service: SHService;

	constructor(private navCtrl: NavController, private fb: FormBuilder, public global: GlobalService) {
		this.descriptionForm = this.fb.group({
			desc: [''],
		});
	}

	ngOnInit() {
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

	onDescription() {
		const areaId = parseInt(localStorage.getItem('areaId'), 0);
		const firstName = localStorage.getItem('firstName');
		const mobileNo = localStorage.getItem('mobileNo');
		const phone = localStorage.getItem('phone');
		const address = localStorage.getItem('address');
		const longtiude = parseFloat(localStorage.getItem('longtiude'));
		const latitiude = parseFloat(localStorage.getItem('latitiude'));
		const date = localStorage.getItem('date').split('/');
		const time = parseInt(localStorage.getItem('time'), 0);
		const discountCode = localStorage.getItem('discountCode');

		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('request/insrtServiceRequest', {
				personId: this.global.getPersonInfo().personId,
				serviceId: this.service.serviceId,
				areaId,
				firstName,
				lastName: '',
				mobileNo,
				phone,
				address,
				longtiude,
				latitiude,
				desc: this.descriptionForm.get('desc').value,
				dateFrom: 0,
				dateFromYear: parseInt(date[0], 0),
				dateFromMonth: parseInt(date[1], 0),
				dateFromDay: parseInt(date[2], 0),
				time,
				discountCode
			}, this.global.getPersonInfo().accessToken).subscribe((res) => {
				this.global.dismisLoading();
				const person = new SHPerson();
				person.personId = this.global.getPersonInfo().personId;
				person.accessToken = res.accessToken;
				person.areaId = this.global.getPersonInfo().areaId;
				person.area = this.global.getPersonInfo().area;
				person.picAddress = this.global.getPersonInfo().picAddress;
				person.firstName = this.global.getPersonInfo().firstName;
				person.lastName = this.global.getPersonInfo().lastName;
				person.totalPoint = this.global.getPersonInfo().totalPoint;
				person.code = this.global.getPersonInfo().code;
				person.username = this.global.getPersonInfo().username;
				person.email = this.global.getPersonInfo().email;
				person.phone = this.global.getPersonInfo().phone;
				person.address = this.global.getPersonInfo().address;
				localStorage.setItem('personInfo', JSON.stringify(person));

				localStorage.setItem('requestAdd', 'true');
				this.navCtrl.navigateRoot('/page/home');
			}, (error) => {
				this.global.dismisLoading();
				this.global.showError(error);
			});
		});
	}

	goBack() {
		this.navCtrl.navigateBack('/page/home/services/request/step-4');
	}

}
