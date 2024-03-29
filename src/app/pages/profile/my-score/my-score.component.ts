import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { SHUserPoint } from '../../../classes/SHUserPoint';
import { NavController, ModalController } from '@ionic/angular';

@Component({
	selector: 'app-my-score',
	templateUrl: './my-score.component.html',
	styleUrls: ['./my-score.component.scss'],
})
export class MyScoreComponent implements OnInit {
	points: SHUserPoint[] = [];

	constructor(public global: GlobalService, private modalController: ModalController, private navCtrl: NavController) { }

	ngOnInit() {
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('person/getPersonPoints', {
				personId: this.global.getPersonInfo().personId
			}, this.global.getPersonInfo().accessToken).subscribe((res) => {
				res.map((item: SHUserPoint) => {
					const point: SHUserPoint = new SHUserPoint();
					point.id = item.id;
					point.insrtTime = item.insrtTime;
					point.insrtTimeFullPersian = item.insrtTimeFullPersian;
					point.insrtTimeSmallPersian = item.insrtTimeSmallPersian;
					point.point = item.point;
					point.reasonTitle = item.reasonTitle;
					point.reasonType = item.reasonType;
					point.sumPoint = item.sumPoint;
					this.points.push(point);
				});
				loader.dismiss();
			}, (error) => {
				loader.dismiss();
				this.global.showError(error);
			});
		});
	}

	sendSms() {
		// this.global.showAlert('', 'شماره تلفن دوست خود را وارد کنید', [
		// 	{
		// 		text: 'دعوت می کنم',
		// 		handler: () => {

		// 		}
		// 	},
		// 	{
		// 		text: 'انصراف',
		// 		role: 'cancel'
		// 	}
		// ], [
		// 	{
		// 		type: 'tel',
		// 		name: 'mobile',
		// 	}
		// ]).then((alert) => {
		// 	alert.present();
		// });
	}

	async share() {
		// const modal = await this.modalController.create({
		// 	component: SharePage
		// });

		// modal.present();
	}

	goBack() {
		this.navCtrl.navigateBack('/page/profile');
	}

}
