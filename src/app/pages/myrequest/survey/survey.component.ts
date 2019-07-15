import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { SHSurvey } from '../../../classes/SHSurvey';
import { ModalController, NavParams, IonSlides } from '@ionic/angular';

@Component({
	selector: 'app-survey',
	templateUrl: './survey.component.html',
	styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {
	questions: SHSurvey[] = [];
	slidesOpts = {
		allowTouchMove: false
	};
	@ViewChild('slides') slides: IonSlides;
	currentSlide = 0;
	rates = [];
	comment = '';

	constructor(public global: GlobalService, private modalCtrl: ModalController, private params: NavParams) { }

	ngOnInit() {
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('request/getPointsQuestions', {}, this.global.getPersonInfo().accessToken).subscribe((res) => {
				res.map((question: SHSurvey) => {
					const q = new SHSurvey();
					q.id = question.id;
					q.title = question.title;
					this.questions.push(q);
					this.rates.push({
						qId: q.id,
						qPoint: 0
					});
				});
				loader.dismiss();
			}, (error) => {
				loader.dismiss();
				this.global.showError(error);
			});
		});
	}

	onRate($event, i) {
		if (this.rates[i] !== undefined) {
			this.rates[i].qPoint = $event.newValue;
		} else {
			this.rates.push($event.newValue);
		}
	}

	async next() {
		await this.slides.slideNext();
		this.currentSlide = await this.slides.getActiveIndex();
	}

	async prev() {
		await this.slides.slidePrev();
		this.currentSlide = await this.slides.getActiveIndex();
	}

	finish() {
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('request/finishRequestByPerson', {
				requestId: this.params.get('id'),
				points: this.rates,
				comment: this.comment
			}, this.global.getPersonInfo().accessToken).subscribe((res) => {
				loader.dismiss();
				localStorage.setItem('finishRequest', 'true');
				this.dismiss();
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
