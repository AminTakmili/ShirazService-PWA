import { Component, OnInit } from '@angular/core';
import { SHArea } from '../../../../classes/SHArea';
import { GlobalService } from '../../../../services/global.service';
import { FormBuilder } from '@angular/forms';
import { Validators, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-service-location',
	templateUrl: './service-location.component.html',
	styleUrls: ['./service-location.component.scss'],
})
export class ServiceLocationComponent implements OnInit {
	areas: SHArea[] = [];
	areaForm: FormGroup;

	constructor(public global: GlobalService, private fb: FormBuilder, private navCtrl: NavController, private route: ActivatedRoute) {
		this.areaForm = this.fb.group({
			areaId: ['', Validators.compose([Validators.required])],
			address: ['', Validators.compose([Validators.required])],
			desc: [''],
		});
	}

	ngOnInit() { }

	ionViewWillEnter() {
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('common/getAreas', {}, this.global.getPersonInfo().accessToken).subscribe((res: SHArea[]) => {
				res.map((ar) => {
					const area = new SHArea();
					area.areaId = ar.areaId;
					area.areaRatio = ar.areaRatio;
					area.areaTitle = ar.areaTitle;
					this.areas.push(area);
				});

				loader.dismiss();
			}, (error) => {
				loader.dismiss();
				this.global.showError(error);
			});
		});
	}

	onArea() {
		if (this.areaForm.valid) {
			this.global.showLoading().then((loader) => {
				loader.present();
				this.global.httpPost('workman/insrtRequestOfServiceManRegister', {
					firstName: localStorage.getItem('exportFirstName'),
					lastName: localStorage.getItem('exportLastName'),
					mobileNo: localStorage.getItem('exportMobileNo'),
					address: this.areaForm.get('address').value,
					serviceCatId: this.route.snapshot.params.id,
					serviceSubCatId: this.route.snapshot.params.subId,
					areaIds: this.areaForm.get('areaId').value,
					desc: this.areaForm.get('desc').value,
					insrtPersonId: this.global.getPersonInfo().personId
				}, this.global.getPersonInfo().accessToken).subscribe((res) => {
					loader.dismiss();
					this.global.showToast('درخواست با موفقیت ثبت شد', 2000, 'bottom');
					this.navCtrl.navigateRoot('/page/profile');
				}, (error) => {
					loader.dismiss();
					this.global.showError(error);
				});
			});
		} else {
			this.global.validateAllFormFields(this.areaForm);
		}
	}

	goBack() {
		this.navCtrl.navigateBack('/page/profile/expert-introduction/experience/' + this.route.snapshot.params.id);
	}
}
