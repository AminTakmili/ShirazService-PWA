import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }
  public appPages = [
		{ title: 'درخواست ها', url: '/page/home', icon: 'home' },
		{ title: 'جستجو', url: '/page/search', icon: 'search' },
		{ title: 'درخواست های من', url: '/page/myrequest', icon: 'construct' },
		{ title: 'پروفایل', url: '/page/profile', icon: 'person' },
		{ title: 'بیشتر', url: '/page/more', icon: 'more' },
		// { title: 'More ', url: '/more', icon: 'more' },
		// {title: 'Terms',url: '/Terms',icon: 'checkmark-circle-outline'} ,
		// {title: 'Rate',url: '/Rate',icon: 'star'} ,
	];

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
