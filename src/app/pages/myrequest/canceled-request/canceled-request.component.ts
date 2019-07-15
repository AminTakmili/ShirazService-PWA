import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { SHRequest } from '../../../classes/SHRequest';
import { SHWorkman } from '../../../classes/SHWorkman';
import { GlobalService } from '../../../services/global.service';
import { ActivatedRoute } from '@angular/router';
import { CancelReasonsComponent } from '../cancel-reasons/cancel-reasons.component';
import { SurveyComponent } from '../survey/survey.component';

@Component({
	selector: 'app-canceled-request',
	templateUrl: './canceled-request.component.html',
	styleUrls: ['./canceled-request.component.scss'],
})
export class CanceledRequestComponent implements OnInit {
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

				setTimeout(() => {
					this.global.dismisLoading();
					this.loading = false;
				}, 800);
			}, (error) => {
				this.global.dismisLoading();
				this.global.showError(error);
			});
		});
	}

	goBack() {
		this.navCtrl.navigateBack('/page/myrequest');
	}

	finish() {
		this.modalCtrl.create({
			component: SurveyComponent,
			componentProps: {
				id: this.route.snapshot.params.id
			}
		}).then((modal) => {
			modal.present();
			modal.onWillDismiss().then(() => {
				if (localStorage.getItem('finishRequest') !== null) {
					this.global.showToast('تغییر وضعیت درخواست با موفقیت انجام شد', 2000, 'bottom');
					this.goBack();
				}
			});
		});
	}

	cancel() {
		this.global.showAlert('لغو درخواست', 'در اینجا شما می توانید برای درخواست خود تصمیم گیری کنید، یعنی یا درخواست را لغو کنید و یا این که منتظر انتخاب یک متخصص جدید بمانید. تصمیم با شماست', [
			{
				text: 'منتظر متخصص جدید می مانم',
				handler: () => {
					this.modalCtrl.create({
						component: CancelReasonsComponent,
						componentProps: {
							id: this.route.snapshot.params.id
						}
					}).then((modal) => {
						modal.present();
						modal.onWillDismiss().then(() => {
							if (localStorage.getItem('cancelRequest') !== null) {
								this.global.showToast('تغییر وضعیت درخواست با موفقیت انجام شد', 2000, 'bottom');
								this.goBack();
							}
						});
					});
				}
			},
			{
				text: 'لغو می کنم',
				role: 'cancel'
			}
		]).then((alert) => {
			alert.present();
		});
	}

}
