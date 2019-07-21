import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		PipesModule,
		IonicSelectableModule,
		ComponentsModule,
	],
	exports: [
		ReactiveFormsModule,
		FormsModule,
		ComponentsModule,
		PipesModule,
		IonicSelectableModule,
	],
})
export class SharedModule { }
