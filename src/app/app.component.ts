import { Component, ViewChild } from '@angular/core';
import { Platform, IonMenu, NavController } from '@ionic/angular';
import { GlobalService } from './services/global.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {
	@ViewChild('menu') menu: IonMenu;

	constructor(
		private platform: Platform,
		public global: GlobalService,
		private navCtrl: NavController
	) {
		this.initializeApp();
	}

	public appPages = [
		{ title: 'درخواست ها', url: '/page/home', icon: 'home' },
		{ title: 'جستجو', url: '/page/search', icon: 'search' },
		{ title: 'درخواست های من', url: '/page/myrequest', icon: 'construct' },
		{ title: 'پروفایل', url: '/page/profile', icon: 'person' },
		{ title: 'بیشتر', url: '/page/more', icon: 'more' },
	];

	initializeApp() {
		this.platform.ready().then(() => {
			if (this.global.isLoginBehavior().value) {
				this.menu.disabled = false;
			} else {
				this.menu.disabled = true;
			}

			this.global.menuBehavior().subscribe((menu) => {
				if (menu != null) {
					if (menu) {
						this.menu.disabled = false;
					} else {
						this.menu.disabled = true;
					}
				}
			});
		});
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
