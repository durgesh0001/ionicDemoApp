import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { Welcome } from '../pages/welcome/welcome';

import { Geolocatoinnew } from '../pages/geolocatoin/geolocatoin';
import { MapPage } from '../pages/map/map';
import { MapList } from '../pages/map-list/map-list';
import { NearBy } from '../pages/near-by/near-by';
import { Locations } from '../providers/locations';
import { GoogleMaps } from '../providers/google-maps';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserService } from '../services/service';
import { Httpservices } from '../services/httpServices';
import { IonicStorageModule } from '@ionic/storage';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Profile } from '../pages/profile/profile';
import { Model } from '../pages/model/model';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import {Push, PushToken} from '@ionic/cloud-angular';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    Profile,
    Geolocatoinnew,
    MapPage,
    MapList,
    NearBy,
    Model,
    Welcome
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicImageViewerModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    Geolocatoinnew,
    MapPage,
    MapList,
    NearBy,
    Profile,
    Model,
    Welcome
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    Httpservices,
    Storage,
    Geolocation,
    Locations,
    GoogleMaps,
    Camera,
    File,
    Transfer,
    FilePath,
    Push
  ]
})
export class AppModule {}
