import { Chart } from 'angular-highcharts';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { GlobalService } from '../../services/global.service';
import { SHRequest } from '../../classes/SHRequest';

@Component({
	selector: 'app-myrequest',
	templateUrl: './myrequest.page.html',
	styleUrls: ['./myrequest.page.scss'],
})
export class MyrequestPage implements OnInit {

	@ViewChild('slides') slides: IonSlides;
	@ViewChild('segment') segment: ElementRef;
	@ViewChild('segment2') segment2: ElementRef;
	segmentStatus = [
		{ id: 0, name: 'آمار کلی', icon: 'pie' },
		{ id: 1, name: 'در انتظار متخصص', icon: 'time' },
		{ id: 2, name: 'منتظر تایید', icon: 'hammer' },
		{ id: 3, name: 'پذیرفته شده', icon: 'checkmark' },
		{ id: 4, name: 'خاتمه یافته', icon: 'done-all' },
		{ id: 5, name: 'لغو شده', icon: 'pin' },
	];
	chart: Chart;
	segmentSelected: any = 0;
	SlideOrders = {
		initialSlide: 0,
		speed: 400,
		// autoHeight: true,
		zoom: false
	};

	pos = 0;
	isMenuChange = false;
	tabLoading = false;
	type1: SHRequest[] = [];
	type2: SHRequest[] = [];
	type3: SHRequest[] = [];
	type4: SHRequest[] = [];
	type5: SHRequest[] = [];

	constructor(public global: GlobalService, private navCtrl: NavController) { }

	async ionViewWillEnter() {
		if (localStorage.getItem('requestAdd') !== null) {
			await this.slides.slideTo(1);
			localStorage.removeItem('requestAdd');
		}
		if (localStorage.getItem('finishRequest') !== null) {
			await this.slides.slideTo(4);
			localStorage.removeItem('finishRequest');
		}
		if (localStorage.getItem('cancelRequest') !== null) {
			await this.slides.slideTo(5);
			localStorage.removeItem('cancelRequest');
		}
		if (localStorage.getItem('acceptRequest') !== null) {
			await this.slides.slideTo(3);
			localStorage.removeItem('acceptRequest');
		}
		this.chart = new Chart({
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie',
				style: {
					fontFamily: 'iransans',
					fontWeight: 'normal',
					backgroundColor: null,
				}
			},
			title: {
				text: '',
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					startAngle: -95,
					endAngle: 95,
					center: ['50%', '90%'],
					size: '110%',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: '{point.color}'
						}
					}
				}
			},
			legend: {
				labelFormat: '{name} | {y} ',
				layout: 'horizontal',
				align: 'center',
				verticalAlign: 'bottom'
			},

			series: [{
				type: 'pie',
				name: 'گرازش وضعیت درخواست ها',
				innerSize: '75%',
				showInLegend: true,
				keys: ['name', 'y', 'color', 'label'],
				data: [
					['منتظر متخصص', 20, '#4286F5', 'منتظر متخصص'],
					['منتظر تایید', 20, '#ff77a9', 'منتظر تایید'],
					['پذیرش شده', 20, '#ffc107', 'پذیرش شده'],
					['خاتمه یافته', 30, '#7cb342', 'خاتمه یافته'],
					['لغو شده', 10, '#EA4235', 'لغو شده'],
				],
				dataLabels: {
					enabled: true,
					format: '{point.label}'
				},
			}]
		});
	}

	async ionSelect(index: number) {
		if (index > await this.slides.getActiveIndex()) {
			this.pos = 0;
			for (let i = 0; i < 80; i++) {
				this.pos++;
				this.segment2['el'].scrollLeft--;
			}
			for (let i = 0; i < 150; i++) {
				this.segment['el'].scrollLeft--;
			}
		} else if (index < await this.slides.getActiveIndex()) {
			this.pos = 0;
			for (let i = 0; i < 80; i++) {
				this.pos++;
				this.segment2['el'].scrollLeft++;
			}
			for (let i = 0; i < 150; i++) {
				this.segment['el'].scrollLeft++;
			}
		}
		this.isMenuChange = true;
		this.slides.slideTo(index);
	}

	async ionSlideWillChange() {
		const currentIndex = await this.slides.getActiveIndex();

		if (!this.isMenuChange) {
			if (parseInt(this.segmentSelected, 0) > currentIndex) {
				this.pos = 0;
				for (let i = 0; i < 80; i++) {
					this.pos++;
					this.segment2['el'].scrollLeft++;
				}
				for (let i = 0; i < 150; i++) {
					this.pos++;
					this.segment['el'].scrollLeft++;
				}
			} else if (parseInt(this.segmentSelected, 0) < currentIndex) {
				this.pos = 0;
				for (let i = 0; i < 80; i++) {
					this.pos++;
					this.segment2['el'].scrollLeft--;
				}
				for (let i = 0; i < 150; i++) {
					this.segment['el'].scrollLeft--;
				}
			}
		}
		this.isMenuChange = false;

		if (currentIndex < this.segmentStatus.length) {
			this.segmentSelected = currentIndex;
		}

		const currentCategory = this.segmentStatus[currentIndex];

		switch (currentCategory.id) {
			case 1:
				this.type1 = [];
				this.tabLoading = true;
				this.getRequest(1);
				break;
			case 2:
				this.type2 = [];
				this.tabLoading = true;
				this.getRequest(2);
				break;
			case 3:
				this.type3 = [];
				this.tabLoading = true;
				this.getRequest(3);
				break;
			case 4:
				this.type4 = [];
				this.tabLoading = true;
				this.getRequest(4);
				break;
			case 5:
				this.type5 = [];
				this.tabLoading = true;
				this.getRequest(5);
				break;
		}
	}

	ngOnInit() {
	}

	getRequest(type: number) {
		this.global.httpPost('request/getPersonRequests', {
			personId: this.global.getPersonInfo().personId,
			type,
		}, this.global.getPersonInfo().accessToken).subscribe((res: SHRequest[]) => {
			switch (type) {
				case 1:
					this.type1 = [];
					break;
				case 2:
					this.type2 = [];
					break;
				case 3:
					this.type3 = [];
					break;
				case 4:
					this.type4 = [];
					break;
				case 5:
					this.type5 = [];
					break;
			}
			res.map((item) => {
				const request: SHRequest = new SHRequest();
				request.reqId = item.reqId;
				request.workmanId = item.workmanId;
				request.workmanName = item.workmanName;
				request.serviceId = item.serviceId;
				request.serviceTitle = item.serviceTitle;
				request.servicePicAddress = item.servicePicAddress;
				request.catId = item.catId;
				request.catTitle = item.catTitle;
				request.subCatId = item.subCatId;
				request.subCatTitle = item.subCatTitle;
				request.areaId = item.areaId;
				request.areaTitle = item.areaTitle;
				request.desc = item.desc;
				request.insrtTime = item.insrtTime;
				request.insrtTimePersian = item.insrtTimePersian;
				request.insrtTimeSimple = item.insrtTimeSimple;
				request.updteTime = item.updteTime;
				request.updteTimePersian = item.updteTimePersian;
				request.trackingCode = item.trackingCode;
				request.state = item.state;
				request.stateTitle = item.stateTitle;
				request.priority = item.priority;
				request.priorityTitle = item.priorityTitle;
				request.calculatedPrice = item.calculatedPrice;
				request.rate = item.rate;
				request.visitCount = item.visitCount;
				request.workmanCount = item.workmanCount;
				request.discardReason = item.discardReason;
				request.personComment = item.personComment;
				request.discountCode = item.discountCode;
				request.discountDesc = item.discountDesc;
				switch (type) {
					case 1:
						this.type1.push(request);
						break;
					case 2:
						this.type2.push(request);
						break;
					case 3:
						this.type3.push(request);
						break;
					case 4:
						this.type4.push(request);
						break;
					case 5:
						this.type5.push(request);
						break;
				}
			});
			this.tabLoading = false;
		}, (error) => {
			this.tabLoading = false;
			if (error.status === 409 && ((Array.isArray(error.error) && error.error[0].code === -1) || error.error.code === -1)) {

			} else {
				this.global.showError(error);
			}
		});
	}

	pendingRequest(item: SHRequest) {
		this.navCtrl.navigateForward('/page/myrequest/pending-request/' + item.reqId);
	}

	selectedRequest(item: SHRequest) {
		this.navCtrl.navigateForward('/page/myrequest/selected-request/' + item.reqId + '/' + item.workmanId);
	}

	acceptedRequest(item: SHRequest) {
		this.navCtrl.navigateForward('/page/myrequest/accepted-request/' + item.reqId + '/' + item.workmanId);
	}

	canceledRequest(item: SHRequest) {
		this.navCtrl.navigateForward('/page/myrequest/canceled-request/' + item.reqId);
	}

	finishedRequest(item: SHRequest) {
		this.navCtrl.navigateForward('/page/myrequest/finished-request/' + item.reqId + '/' + item.workmanId);
	}
}
