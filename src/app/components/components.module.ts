import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ValidatorComponent } from './validator/validator.component';
import { RatingComponent } from './rating/rating.component';

@NgModule({
	declarations: [
		ValidatorComponent,
		RatingComponent
	],
	imports: [
		IonicModule,
		CommonModule
	],
	exports: [
		ValidatorComponent,
		RatingComponent
	]
})
export class ComponentsModule { }
