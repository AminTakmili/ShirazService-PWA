import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VerifyPage } from './verify.page';
import { SharedModule } from '../../modules/shared.module';

const routes: Routes = [
	{
		path: '',
		component: VerifyPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		SharedModule
	],
	declarations: [VerifyPage]
})
export class VerifyPageModule { }
