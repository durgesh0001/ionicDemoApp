import { Component } from '@angular/core';
import { NavController,LoadingController,ToastController } from 'ionic-angular';
import { UserService } from '../../services/service';
import { Httpservices } from '../../services/httpServices';
import { Storage } from '@ionic/storage';
import { ListPage } from '../list/list';
import { Login } from '../login/login';
import { Welcome } from '../welcome/welcome';
import {Push, PushToken} from '@ionic/cloud-angular';


import { FormBuilder, FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[Httpservices]
})
export class HomePage {
  loader:any;
  tab1Root: any = Login;
  private result:Array<any> = [];
  signupForm : FormGroup;
  Username:any;
  password:any;
  firstName:any;
  lastName:any;
  email:any;
// /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  constructor(public loadingCtrl: LoadingController,fb: FormBuilder,public navCtrl: NavController,private toastCtrl: ToastController,private userSer:UserService,private _httpservice:Httpservices,private storage: Storage) {
    this.signupForm = fb.group({
      'password': [null, Validators.required],
      'email'  : [null, Validators.required],
      'lastName': [null, Validators.required],
      'firstName': [null, Validators.required],
      'Username': [null, Validators.required],

    });


      this.storage.ready().then(() => {

      this.storage.get('email').then((val) => {
        if(val)
        {
          this.navCtrl.setRoot(ListPage);

        }

      })
        this.storage.get('welcome').then((val) => {
          if(val)
          {

          }
          else
          {
            this.navCtrl.setRoot(Welcome);
          }
        })
    });
  }
  presentLoading() {
  this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }
  redirectToLogin()
  {
    this.navCtrl.setRoot(Login);
  }

registerUser(value):void {
if(this.Username && this.password && this.firstName && this.lastName && this.email)
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
    this._httpservice.addUser(  {
      username : this.Username,
      firstname : this.firstName,
      email : this.email,
      password : this.password
    })
      .subscribe(
        data =>this.getResponse(data),
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
  getResponse(data)
  {
    if(data.email)
    {

      this.storage.ready().then(() => {

        // set a key/value
        this.storage.set('username', this.Username);
        this.storage.set('firstname', this.firstName);
        this.storage.set('email', this.email);
        this.storage.set('password', this.password);

      });

      let toast = this.toastCtrl.create({
        message: 'sucessfully login',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
      this.loader.dismiss();
      this.navCtrl.setRoot(ListPage);
    }
    else
    {
      let toast = this.toastCtrl.create({
        message: 'email is already exits',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      this.loader.dismiss();
      toast.present();
    }

  }



}
