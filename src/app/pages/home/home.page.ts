import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { SHServiceCat } from '../../classes/SHServiceCat';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SHSlider } from '../../classes/SHSlider';
import { SHService } from '../../classes/SHService';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	serviceCats: SHServiceCat[] = [];
	catId = 0;
	sliders: SHSlider[] = [];

	constructor(public global: GlobalService, private navCtrl: NavController, private route: ActivatedRoute) { }

	ngOnInit() {
	}

	ionViewWillEnter() {
		if (localStorage.getItem('requestAdd') !== null) {
			this.navCtrl.navigateRoot('/page/myrequest');
		}
		this.catId = (this.route.snapshot.params.id) ? this.route.snapshot.params.id : 0;
		this.serviceCats = [];
		this.sliders = [];
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
				this.global.httpPost('service/getSeasonSliders', {}, this.global.getPersonInfo().accessToken).subscribe((sliders) => {
					sliders.map((item: SHSlider) => {
						const slider = new SHSlider();
						slider.desc = item.desc;
						slider.picAddress = item.picAddress;
						slider.serviceId = item.serviceId;

						this.sliders.push(slider);
					});
					loader.dismiss();
				}, (error) => {
					loader.dismiss();
					this.global.showError(error);
				});
			}, (error) => {
				loader.dismiss();
				this.global.showError(error);
			});
		});
	}

	goToService(item) {
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('service/getServiceInfo', {
				serviceId: item.serviceId
			}, this.global.getPersonInfo().accessToken).subscribe((res) => {
				const service: SHService = new SHService();
				service.basePrice = res.basePrice;
				service.body = res.body;
				service.catId = res.catId;
				service.catTitle = res.catTitle;
				service.extraField1 = res.extraField1;
				service.extraField2 = res.extraField2;
				service.extraTitle1 = res.extraTitle1;
				service.extraTitle2 = res.extraTitle2;
				service.insrtTime = res.insrtTime;
				service.insrtTimePersian = res.insrtTimePersian;
				service.picAddress = res.picAddress;
				service.serviceId = res.serviceId;
				service.serviceTitle = res.serviceTitle;
				service.servicesCount = res.servicesCount;
				service.subCatId = res.subCatId;
				service.subCatTitle = res.subCatTitle;
				service.tagId = res.tagId;
				service.tagTitle = res.tagTitle;
				loader.dismiss();
				localStorage.setItem('service', JSON.stringify(service));
				this.navCtrl.navigateForward('/page/home/services/detail');
			}, (error) => {
				loader.dismiss();
				this.global.showError(error);
			});
		});
	}

	goTo(item) {
		if (this.catId === 0) {
			this.navCtrl.navigateForward('/page/home/' + item.catId);
		} else {
			this.navCtrl.navigateForward('/page/home/services/list/' + item.catId + '/' + item.subCatId);
		}
	}

	goBack() {
		this.navCtrl.navigateBack('/page/home');
	}
}
