import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { Httpservices } from '../../services/httpServices';
import { Storage } from '@ionic/storage';
import { ListPage } from '../list/list';
import { HomePage } from '../home/home';

import { FormBuilder, FormGroup,Validators } from '@angular/forms';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  loader:any;
  loginForm : FormGroup;
  password:any;
  email:any;
  constructor(public loadingCtrl: LoadingController,fb: FormBuilder,public navCtrl: NavController, public navParams: NavParams,private toastCtrl:ToastController,private _httpservice:Httpservices,private storage: Storage)

  {
    this.loginForm = fb.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required],
    })

  }
  presentLoading() {
   this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }

    LoginUser(value: any):void {

    if(this.password && this.email)
    {
      let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

      if (!regExp.test(this.email)) {
        let toast = this.toastCtrl.create({
          message: 'Email is not valid',
          duration: 3000,
          position: 'top'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present();
      }
      else
      {
        this.presentLoading();
        this._httpservice.login(value)
          .subscribe(
            data =>this.getResponse(data.data),
            error => console.log(JSON.stringify(error)),
            () => console.log("finish")
          )
      }

    }
    else
    {

      let toast = this.toastCtrl.create({
        message: 'All fields are required',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();

    }

  }
  redirect()
  {
    this.navCtrl.setRoot(HomePage);
  }
  getResponse(data)
  {
   if(data.length > 0)
   {
     this.loader.dismiss();
     this.storage.ready().then(() => {

       // set a key/value
      this.storage.set('firstname', data[0].firstname);
       this.storage.set('email', this.email);
       this.storage.set('password', this.password);
       this.storage.set('profile_pictire', data[0].profile_picture);
       this.storage.get('profile_pictire').then((image) => {

       })
     });

     let toast = this.toastCtrl.create({
       message: 'Login successfully',
       duration: 3000,
       position: 'top'
     });
     toast.onDidDismiss(() => {
       console.log('Dismissed toast');
     });

     toast.present();
     this.navCtrl.setRoot(ListPage);
   }
   else
   {
     this.loader.dismiss();
     let toast = this.toastCtrl.create({
       message: 'Invalid email or password',
       duration: 3000,
       position: 'top'
     });
     toast.onDidDismiss(() => {
       console.log('Dismissed toast');
     });

     toast.present();

   }
  }


  }

