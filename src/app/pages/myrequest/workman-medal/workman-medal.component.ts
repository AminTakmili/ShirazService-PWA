import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GlobalService } from '../../../services/global.service';
import { SHWorkman } from '../../../classes/SHWorkman';
import { SHWorkmanMedal } from '../../../classes/SHWorkmanMedal';

@Component({
	selector: 'app-workman-medal',
	templateUrl: './workman-medal.component.html',
	styleUrls: ['./workman-medal.component.scss'],
})
export class WorkmanMedalComponent implements OnInit {
	workman: SHWorkman;
	medals: SHWorkmanMedal[] = [];

	constructor(private modalCtrl: ModalController, private params: NavParams, public global: GlobalService) { }

	ngOnInit() {
		this.workman = this.params.get('workman');
	}

	ionViewDidEnter() {
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('workman/getWorkmanMedals', {
				servicemanId: this.workman.servicemanId
			}, this.global.getPersonInfo().accessToken).subscribe((res) => {
				res.map((item: SHWorkmanMedal) => {
					const medal = new SHWorkmanMedal();
					medal.body = item.body;
					medal.id = item.id;
					medal.imgAddress = item.imgAddress;
					medal.insrtTime = item.insrtTime;
					medal.insrtTimePersian = item.insrtTimePersian;
					medal.title = item.title;
					this.medals.push(medal);
				});
				loader.dismiss();
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
