import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { Validators, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../../services/global.service';

@Component({
	selector: 'app-step4',
	templateUrl: './step4.component.html',
	styleUrls: ['./step4.component.scss'],
})
export class Step4Component implements OnInit {
	discountForm: FormGroup;

	constructor(private navCtrl: NavController, private fb: FormBuilder, public global: GlobalService) {
		this.discountForm = this.fb.group({
			discountCode: [''],
		});
	}

	ngOnInit() { }

	onDiscount() {
		if (this.discountForm.valid) {
			localStorage.setItem('discountCode', this.discountForm.get('discountCode').value);

			this.navCtrl.navigateForward('/page/home/services/request/step-5');
		}
	}

	goBack() {
		this.navCtrl.navigateBack('/page/home/services/request/step-3');
	}
}
