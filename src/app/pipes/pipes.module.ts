import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Nl2brPipe } from './nl2br.pipe';

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
	],
	declarations: [Nl2brPipe],
	exports: [Nl2brPipe]
})
export class PipesModule {}
