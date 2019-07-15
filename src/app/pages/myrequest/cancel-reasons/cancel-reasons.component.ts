import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
	selector: 'app-cancel-reasons',
	templateUrl: './cancel-reasons.component.html',
	styleUrls: ['./cancel-reasons.component.scss'],
})
export class CancelReasonsComponent implements OnInit {
	reasons: Array<{id: number, title: string}> = [];

	constructor(public global: GlobalService, private modalCtrl: ModalController, private params: NavParams) { }

	ngOnInit() {
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('request/getRequestDiscardOptions', {}, this.global.getPersonInfo().accessToken).subscribe((res) => {
				res.map((reason) => {
					this.reasons.push({
						id: reason.id,
						title: reason.title
					});
				});
				this.global.dismisLoading();
			}, (error) => {
				this.global.dismisLoading();
				this.global.showError(error);
			});
		});
	}

	cancel(item) {
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('request/cancelRequestByPerson', {
				requestId: this.params.get('id'),
				newRequestState: 3,
				discardOptionId: item.id
			}, this.global.getPersonInfo().accessToken).subscribe((res) => {
				loader.dismiss();
				localStorage.setItem('cancelRequest', 'true');
				this.dismiss();
			}, (error) => {
				loader.dismiss();
				this.global.showError(error);
			});
		});
	}

	async dismiss() {
		await this.modalCtrl.dismiss();
	}
}
