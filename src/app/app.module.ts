import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { VerifyGuard } from './guards/verify.guard';
import { LoginGuard } from './guards/login.guard';
import { AppGuard } from './guards/app.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
	declarations: [
		AppComponent,
	],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		HttpClientModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
	],
	providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		VerifyGuard,
		LoginGuard,
		AppGuard,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
