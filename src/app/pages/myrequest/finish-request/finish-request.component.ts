import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { SHRequest } from '../../../classes/SHRequest';
import { SHWorkman } from '../../../classes/SHWorkman';
import { GlobalService } from '../../../services/global.service';
import { ActivatedRoute } from '@angular/router';
import { WorkmanCommentComponent } from '../workman-comment/workman-comment.component';
import { WorkmanMedalComponent } from '../workman-medal/workman-medal.component';
import { SHService } from '../../../classes/SHService';

@Component({
	selector: 'app-finish-request',
	templateUrl: './finish-request.component.html',
	styleUrls: ['./finish-request.component.scss'],
})
export class FinishRequestComponent implements OnInit {
	request: SHRequest;
	workman: SHWorkman;
	loading = true;

	constructor(
		private navCtrl: NavController, public global: GlobalService,
		private route: ActivatedRoute, private modalCtrl: ModalController) { }

	ngOnInit() {
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('request/getRequestDetails', {
				requestId: this.route.snapshot.params.id,
				servicemanId: this.route.snapshot.params.wid
			}, this.global.getPersonInfo().accessToken).subscribe((res) => {
				this.request = new SHRequest();
				this.request.personId = res.personId;
				this.request.personName = res.personName;
				this.request.workmanId = res.workmanId;
				this.request.workmanName = res.workmanName;
				this.request.workmanMobile = res.workmanMobile;
				this.request.serviceId = res.serviceId;
				this.request.serviceTitle = res.serviceTitle;
				this.request.servicePicAddress = res.servicePicAddress;
				this.request.catId = res.catId;
				this.request.catTitle = res.catTitle;
				this.request.subCatId = res.subCatId;
				this.request.subCatTitle = res.subCatTitle;
				this.request.areaId = res.areaId;
				this.request.areaTitle = res.areaTitle;
				this.request.lastName = res.lastName;
				this.request.firstName = res.firstName;
				this.request.mobile = res.mobile;
				this.request.phone = res.phone;
				this.request.address = res.address;
				this.request.longtiude = res.longtiude;
				this.request.latitiude = res.latitiude;
				this.request.desc = res.desc;
				this.request.dateFrom = res.dateFrom;
				this.request.dateFromPersian = res.dateFromPersian;
				this.request.dateFromYear = res.dateFromYear;
				this.request.dateFromMonth = res.dateFromMonth;
				this.request.dateFromDay = res.dateFromDay;
				this.request.dateTo = res.dateTo;
				this.request.dateToPersian = res.dateToPersian;
				this.request.time = res.time;
				this.request.timeDesc = res.timeDesc;
				this.request.insrtTime = res.insrtTime;
				this.request.insrtTimePersian = res.insrtTimePersian;
				this.request.insrtTimeSimple = res.insrtTimeSimple;
				this.request.updteTime = res.updteTime;
				this.request.updteTimePersian = res.updteTimePersian;
				this.request.trackingCode = res.trackingCode;
				this.request.state = res.state;
				this.request.stateTitle = res.stateTitle;
				this.request.priority = res.priority;
				this.request.priorityTitle = res.priorityTitle;
				this.request.calculatedPrice = res.calculatedPrice;
				this.request.finishByWorkman = res.finishByWorkman;
				this.request.finishTime = res.finishTime;
				this.request.visitCount = res.visitCount;
				this.request.workmanCount = res.workmanCount;
				this.request.discountCode = res.discountCode;
				this.request.discountDesc = res.discountDesc;
				this.request.discardOrExpirePersonType = res.discardOrExpirePersonType;
				this.request.discardOrExpirePersonId = res.discardOrExpirePersonId;
				this.request.discardOrExpireDesc = res.discardOrExpireDesc;
				this.request.lastStateBeforeDiscardOrExpire = res.lastStateBeforeDiscardOrExpire;

				this.global.httpPost('workman/getServiceManInfoById', {
					workmanId: this.route.snapshot.params.wid
				}, this.global.getPersonInfo().accessToken).subscribe((workman: SHWorkman) => {
					this.workman = new SHWorkman();
					this.workman.firstName = workman.firstName;
					this.workman.lastName = workman.lastName;
					this.workman.servicemanId = workman.servicemanId;
					this.workman.picAddress = workman.picAddress;
					this.workman.personTypeIdx = workman.personTypeIdx;
					this.workman.personType = workman.personType;
					this.workman.titleId = workman.titleId;
					this.workman.title = workman.title;
					this.workman.provinceId = workman.provinceId;
					this.workman.province = workman.province;
					this.workman.cityId = workman.cityId;
					this.workman.city = workman.city;
					this.workman.areaId = workman.areaId;
					this.workman.area = workman.area;
					this.workman.address = workman.address;
					this.workman.totalPoint = workman.totalPoint;
					this.workman.rating = parseFloat(workman.rating.toFixed(1));
					this.workman.commentsCount = workman.commentsCount;
					this.workman.medalsCount = workman.medalsCount;
					this.workman.credit = workman.credit;
					this.workman.tempCredit = workman.tempCredit;
					this.workman.discountPercent = workman.discountPercent;
					this.workman.records = workman.records;
					this.workman.documents = workman.documents;
					this.workman.lastLoginDate = workman.lastLoginDate;
					this.workman.lastLoginDatePersian = workman.lastLoginDatePersian;
					this.workman.lastLoginIP = workman.lastLoginIP;
					this.workman.membershipTime = workman.membershipTime;
					this.workman.birthdayTimePersian = workman.birthdayTimePersian;
					this.workman.birthdayTime = workman.birthdayTime;
					this.workman.age = workman.age;
					this.workman.finishedServicesCount = workman.finishedServicesCount;
					this.workman.insrtTimePersian = workman.insrtTimePersian;
					this.workman.insrtTime = workman.insrtTime;
					setTimeout(() => {
						this.global.dismisLoading();
						this.loading = false;
					}, 800);
				});
			}, (error) => {
				this.global.dismisLoading();
				this.global.showError(error);
			});
		});
	}

	showComments() {
		this.modalCtrl.create({
			component: WorkmanCommentComponent,
			componentProps: {
				workman: this.workman
			}
		}).then((modal) => {
			modal.present();
		});
	}

	showMedals() {
		this.modalCtrl.create({
			component: WorkmanMedalComponent,
			componentProps: {
				workman: this.workman
			}
		}).then((modal) => {
			modal.present();
		});
	}

	goBack() {
		this.navCtrl.navigateBack('/page/myrequest');
	}

	reOrder() {
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('service/getServiceInfo', {
				serviceId: this.request.serviceId
			}, this.global.getPersonInfo().accessToken).subscribe((res) => {
				const service: SHService = new SHService();
				service.basePrice = res.basePrice;
				service.body = res.body;
				service.catId = res.catId;
				service.catTitle = res.catTitle;
				service.extraField1 = res.extraField1;
				service.extraField2 = res.extraField2;
				service.extraTitle1 = res.extraTitle1;
				service.extraTitle2 = res.extraTitle2;
				service.insrtTime = res.insrtTime;
				service.insrtTimePersian = res.insrtTimePersian;
				service.picAddress = res.picAddress;
				service.serviceId = res.serviceId;
				service.serviceTitle = res.serviceTitle;
				service.servicesCount = res.servicesCount;
				service.subCatId = res.subCatId;
				service.subCatTitle = res.subCatTitle;
				service.tagId = res.tagId;
				service.tagTitle = res.tagTitle;
				loader.dismiss();
				localStorage.setItem('service', JSON.stringify(service));
				this.navCtrl.navigateForward('/page/home/services/detail');
			}, (error) => {
				loader.dismiss();
				this.global.showError(error);
			});
		});
	}

}
