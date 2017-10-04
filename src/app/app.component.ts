import { Component, ViewChild } from '@angular/core';
import { Nav,Platform,LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { Profile } from '../pages/profile/profile';

import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { Geolocatoinnew } from '../pages/geolocatoin/geolocatoin';
import { NearBy } from '../pages/near-by/near-by';
import { Storage } from '@ionic/storage';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  profile_picture :string;
  email:string;

  pages: Array<{title: string, component: any}>;

  constructor(public loadingCtrl: LoadingController,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private storage:Storage) {
    this.initializeApp();
    this.profile_picture = "https://media.glassdoor.com/sqll/1038687/systematix-squarelogo-1489037590363.png";

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Profile', component: Profile },
      { title: 'Your Location', component: Geolocatoinnew },
      { title: 'Near BY', component: NearBy }

    ];
    this.storage.ready().then(() => {

      this.storage.get('email').then((val) => {
        if(val)
        {
          this.nav.setRoot(ListPage);
        }
      })
      this.storage.get('profile_pictire').then((image) => {
        if(image != null)
        {
          this.profile_picture=image;
        }

      })
      this.storage.get('email').then((email) => {
        if(email != null)
        {
          this.email=email;
        }

      })

    });


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.presentLoading();
    this.nav.setRoot(page.component);
  }
  logout()
  {
    this.storage.ready().then(() => {

      this.storage.get('email').then((val) => {
        if(val)
        {
         this.storage.clear();
          this.nav.setRoot(Login);
        }
      })
    });
  }
}
