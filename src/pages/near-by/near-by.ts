import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { MapList } from '../map-list/map-list';
/**
 * Generated class for the NearBy page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-near-by',
  templateUrl: 'near-by.html',
})
export class NearBy {
  tab1Root: any = MapPage;
  tab2Root: any = MapList;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NearBy');
  }

}
