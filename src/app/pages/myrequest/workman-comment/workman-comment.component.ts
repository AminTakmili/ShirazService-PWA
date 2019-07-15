import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GlobalService } from '../../../services/global.service';
import { SHWorkman } from '../../../classes/SHWorkman';
import { SHWorkmanComment } from '../../../classes/SHWorkmanComment';

@Component({
	selector: 'app-workman-comment',
	templateUrl: './workman-comment.component.html',
	styleUrls: ['./workman-comment.component.scss'],
})
export class WorkmanCommentComponent implements OnInit {
	workman: SHWorkman;
	comments: SHWorkmanComment[] = [];

	constructor(private modalCtrl: ModalController, private params: NavParams, public global: GlobalService) { }

	ngOnInit() {
		this.workman = this.params.get('workman');
	}

	ionViewDidEnter() {
		this.comments = [];
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('workman/getWorkmanComments', {
				servicemanId: this.workman.servicemanId
			}, this.global.getPersonInfo().accessToken).subscribe((res) => {
				res.map((item: SHWorkmanComment) => {
					const comment = new SHWorkmanComment();
					comment.comment = item.comment;
					comment.id = item.id;
					comment.insrtTime = item.insrtTime;
					comment.insrtTimePersian = item.insrtTimePersian;
					comment.personId = item.personId;
					comment.personName = item.personName;
					comment.point = item.point;
					comment.serviceTitle = item.serviceTitle;
					this.comments.push(comment);
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
