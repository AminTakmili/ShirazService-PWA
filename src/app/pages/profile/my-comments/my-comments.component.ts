import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GlobalService } from '../../../services/global.service';
import { SHPersonComment } from '../../../classes/SHPersonComment';

@Component({
	selector: 'app-my-comments',
	templateUrl: './my-comments.component.html',
	styleUrls: ['./my-comments.component.scss'],
})
export class MyCommentsComponent implements OnInit {
	comments: SHPersonComment[] = [];

	constructor(private navCtrl: NavController, public global: GlobalService) { }

	ngOnInit() {
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('person/getPersonComments', {
				personId: this.global.getPersonInfo().personId
			}, this.global.getPersonInfo().accessToken).subscribe((res) => {
				res.map((item: SHPersonComment) => {
					const comment = new SHPersonComment();
					comment.comment = item.comment;
					comment.id = item.id;
					comment.insrtTime = item.insrtTime;
					comment.insrtTimePersian = item.insrtTimePersian;
					comment.requestId = item.requestId;
					comment.serviceTitle = item.serviceTitle;
					comment.workmanId = item.workmanId;
					comment.workmanName = item.workmanName;
					this.comments.push(comment);
				});
				loader.dismiss();
			}, (error) => {
				loader.dismiss();
				this.global.showError(error);
			});
		});
	}

	goBack() {
		this.navCtrl.navigateBack('/page/profile');
	}
}
