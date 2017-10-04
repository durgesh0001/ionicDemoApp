import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Login } from '../login/login';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the Welcome page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class Welcome {
  slides = [
    {
      title: "Who we are?",
      description: "Our <b>IT solutions</b> are weaved around your core business goals. We are committed to enhance user experience for you and your clients, and make the entire journey from technology through to customer loyalty - a rewarding experience",
      image: "https://media.glassdoor.com/sqll/1038687/systematix-squarelogo-1489037590363.png",
    },
    {
      title: "VISION?",
      description: "To become the fastest growing technology solution compan",
      image: "https://www.systematixinfotech.com/wp-content/uploads/our-dna.png",
    },
    {
      title: "MISSION?",
      description: "We are fully committed to exceed client’s expectations in whatever we do & dedicated to create the best place to work with organization by imbibing excellence in every business processes keeping futuristic approach",
      image: "https://www.systematixinfotech.com/wp-content/uploads/we-are-family-big.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Welcome');
  }
  redirect()
  {
    this.storage.ready().then(() => {

      // set a key/value
      this.storage.set('welcome', "welcome");
      this.navCtrl.setRoot(Login);

    });

  }
}
