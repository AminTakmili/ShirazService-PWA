import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { HomePage } from './home.page';

const routes: Routes = [
	{
		path: '',
		component: HomePage,
	},
	{
		path: ':id',
		component: HomePage,
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		LeafletModule
	],
	declarations: [
		HomePage,
	]
})
export class HomePageModule { }
