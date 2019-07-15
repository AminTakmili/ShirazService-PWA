import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

	constructor(public global: GlobalService, private navCtrl: NavController) { }

	ngOnInit() {
	}

	logout() {
		this.global.showAlert('خروج', 'آیا برای خروج از حساب کاربری اطمینان دارید؟', [
			{
				text: 'بلی',
				handler: () => {
					localStorage.clear();
					this.global.isLoginBehavior().next(false);
					this.global.menuBehavior().next(false);
					this.navCtrl.navigateRoot('/login');
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
