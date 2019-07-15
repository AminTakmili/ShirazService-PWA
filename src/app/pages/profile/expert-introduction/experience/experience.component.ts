import { Component, OnInit } from '@angular/core';
import { SHServiceCat } from '../../../../classes/SHServiceCat';
import { GlobalService } from '../../../../services/global.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-experience',
	templateUrl: './experience.component.html',
	styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
	serviceCats: SHServiceCat[] = [];
	catId = 0;
	pageTitle = '';

	constructor(public global: GlobalService, private navCtrl: NavController, private route: ActivatedRoute) { }

	ngOnInit() {}

	ionViewWillEnter() {
		this.serviceCats = [];
		this.catId = (this.route.snapshot.params.id) ? this.route.snapshot.params.id : 0;
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('service/getServicesCats', {
				catId: this.catId
			}, this.global.getPersonInfo().accessToken).subscribe((res: SHServiceCat[]) => {
				res.map((cat) => {
					const serviceCat = new SHServiceCat();
					serviceCat.catId = cat.catId;
					serviceCat.catImgAddress = cat.catImgAddress;
					serviceCat.catTitle = cat.catTitle;
					serviceCat.subCatCount = cat.subCatCount;
					serviceCat.subCatId = cat.subCatId;
					serviceCat.subCatImgAddress = cat.subCatImgAddress;
					serviceCat.subCatTitle = cat.subCatTitle;
					this.serviceCats.push(serviceCat);
				});
				if (this.catId === 0) {
					this.pageTitle = 'انتخاب دسته';
				} else {
					this.pageTitle = 'زیر دسته های: ' + this.serviceCats[0].catTitle;
				}
				loader.dismiss();
			}, (error) => {
				loader.dismiss();
				this.global.showError(error);
			});
		});
	}

	goTo(item) {
		if (this.catId === 0) {
			this.navCtrl.navigateForward('/page/profile/expert-introduction/experience/' + item.catId);
		} else {
			this.navCtrl.navigateForward('/page/profile/expert-introduction/service-location/' + item.catId + '/' + item.subCatId);
		}
	}

	goBack() {
		if (this.catId === 0) {
			this.navCtrl.navigateBack('/page/profile/expert-introduction');
		} else {
			this.navCtrl.navigateBack('/page/profile/expert-introduction/experience');
		}
	}
}
