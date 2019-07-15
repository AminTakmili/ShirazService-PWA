import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { SHRequest } from '../../../classes/SHRequest';
import { SHWorkman } from '../../../classes/SHWorkman';
import { GlobalService } from '../../../services/global.service';
import { ActivatedRoute } from '@angular/router';
import { CancelReasonsComponent } from '../cancel-reasons/cancel-reasons.component';
import { WorkmanCommentComponent } from '../workman-comment/workman-comment.component';
import { WorkmanMedalComponent } from '../workman-medal/workman-medal.component';

@Component({
	selector: 'app-selected-request',
	templateUrl: './selected-request.component.html',
	styleUrls: ['./selected-request.component.scss'],
})
export class SelectedRequestComponent implements OnInit {
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

	wait() {
		this.global.showAlert('منتظر متخصص جدید', 'متخصص پیشنهادی، ' + this.request.workmanName + ' تایید نشد. آیا منتظر متخصص دیگر می مانید؟', [
			{
				text: 'بله',
				handler: () => {
					this.global.showLoading().then((loader) => {
						loader.present();
						this.global.httpPost('request/confirmOrRejectRequestByPerson', {
							servicemanId: this.route.snapshot.params.wid,
							personId: this.global.getPersonInfo().personId,
							requestId: this.route.snapshot.params.id,
							type: 0
						}, this.global.getPersonInfo().accessToken).subscribe((res) => {
							loader.dismiss();
							localStorage.setItem('requestAdd', 'true');
							this.goBack();
						}, (error) => {
							loader.dismiss();
							this.global.showError(error);
						});
					});
				}
			},
			{
				text: 'خیر',
				role: 'cancel'
			}
		]).then((alert) => {
			alert.present();
		});
	}

	accept() {
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('request/confirmOrRejectRequestByPerson', {
				servicemanId: this.route.snapshot.params.wid,
				personId: this.global.getPersonInfo().personId,
				requestId: this.route.snapshot.params.id,
				type: 1
			}, this.global.getPersonInfo().accessToken).subscribe((res) => {
				this.global.dismisLoading();
				localStorage.setItem('acceptRequest', 'true');
				this.goBack();
			}, (error) => {
				this.global.dismisLoading();
				this.global.showError(error);
			});
		});
	}

	cancel() {
		this.global.showAlert('لغو درخواست', 'آیا نسبت به لغو درخواست اطمینان کامل دارید؟', [
			{
				text: 'بله',
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
				text: 'خیر',
				role: 'cancel'
			}
		]).then((alert) => {
			alert.present();
		});
	}
}
