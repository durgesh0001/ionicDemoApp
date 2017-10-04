import { Component } from '@angular/core';
import { NavController,LoadingController,ModalController,ViewController,ActionSheetController,NavParams } from 'ionic-angular';
import { Httpservices } from '../../services/httpServices';
import { Model } from '../model/model';




@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  searchTerm:any;
  icons: string[];
  items: Array<{name: string, email: string}>;
  tempitems: Array<{name: string, email: string}>;


  constructor(public loadingCtrl: LoadingController,public modalCtrl: ModalController, public view:ViewController,public actionSheetCtrl:ActionSheetController,public navCtrl: NavController, public navParams: NavParams,private _httpservice:Httpservices) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.searchTerm = "";
    // Let's populate this page with some filler content for funzies

    this. _httpservice.getUser()
      .subscribe(
        data =>this.items=data,
        error => console.log(JSON.stringify(error)),
        () => console.log("finish")
      )

  }
  presentProfileModal(dataOfModel) {
    let profileModal = this.modalCtrl.create(Model, { email: dataOfModel.email,firstname:dataOfModel.firstname,username:dataOfModel.username });
    profileModal.present();
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 5000
    });
    loader.present();
  }

  setFilteredItems(data) {
    var val = this.searchTerm;
    if (val && val.trim() != '') {
      this.items = data.filter((item) => {
        return (item.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else
    {
      this. _httpservice.getUser()
        .subscribe(
          data =>this.items=data,
          error => console.log(JSON.stringify(error)),
          () => console.log("finish")
        )
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }

  dismiss() {
    this.view.dismiss();
  }

  presentActionSheet(dataOfModel) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'View',
          role: 'view',
          handler: () => {
            this.presentProfileModal(dataOfModel);
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
