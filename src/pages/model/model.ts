import { Component } from '@angular/core';
import { NavController, ViewController,NavParams } from 'ionic-angular';

/**
 * Generated class for the Model page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-model',
  templateUrl: 'model.html',
})
export class Model {
  email:string;
  firstname:string;
  username:string;

  constructor(public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    console.log('email', navParams.get('email'));
    this.email = navParams.get('email');
    this.firstname = navParams.get('firstname');
    this.username = navParams.get('username');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Model');
  }
  dismiss() {
    console.log("hello");
    this.view.dismiss();
  }

}
