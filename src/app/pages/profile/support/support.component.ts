import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { Validators, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';

@Component({
	selector: 'app-support',
	templateUrl: './support.component.html',
	styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit {
	supportForm: FormGroup;

	constructor(private navCtrl: NavController, private fb: FormBuilder, public global: GlobalService) {
		this.supportForm = this.fb.group({
			type: ['', Validators.compose([Validators.required])],
			comments: ['', Validators.compose([Validators.required])],
		});
	}

	ngOnInit() { }

	onSupport() {
		if (this.supportForm.valid) {
			this.global.showLoading().then((loader) => {
				loader.present();
				this.global.httpPost('common/insrtSuggestion', {
					type: this.supportForm.get('type').value,
					reporterType: 0,
					reporterId: this.global.getPersonInfo().personId,
					comments: this.supportForm.get('comments').value
				}, this.global.getPersonInfo().accessToken).subscribe((res) => {
					loader.dismiss();
					this.global.showToast('نظر شما با موفقیت ثبت شد', 2000, 'bottom');
					this.navCtrl.navigateRoot('/page/profile');
				}, (error) => {
					loader.dismiss();
					this.global.showError(error);
				});
			})
		} else {
			this.global.validateAllFormFields(this.supportForm);
		}
	}

	goBack() {
		this.navCtrl.navigateBack('/page/profile');
	}
}
