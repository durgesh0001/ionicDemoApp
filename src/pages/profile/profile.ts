import {Component} from '@angular/core';
import {
  NavController,
  NavParams,
  ActionSheetController,
  ToastController,
  Platform,
  LoadingController,
  Loading
} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {Transfer, FileUploadOptions, TransferObject} from '@ionic-native/transfer';
import {Httpservices} from '../../services/httpServices';
import {File} from '@ionic-native/file';

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {
  name: string;
  email: string;
  isupload: boolean = true;
  lastImage: string = "https://media.glassdoor.com/sqll/1038687/systematix-squarelogo-1489037590363.png";
  loading: Loading;
  loader: any;

  constructor(private transfer: Transfer, private file: File, private _httpservice: Httpservices, private camera: Camera, public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    this.storage.ready().then(() => {
      this.storage.get('firstname').then((name) => {
        this.name = name;
      })
      this.storage.get('email').then((email) => {
        this.email = email;
      })
      this.storage.get('profile_pictire').then((image) => {
        if (image != null) {
          this.lastImage = image;
        }
      })
    });
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public uploadImage(imageUrl) {
    this.presentLoading();
    const fileTransfer: TransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'image',
      fileName: 'name.jpg',
      chunkedMode: false,
      httpMethod: 'POST',
      mimeType: "multipart/form-data",
      headers: {}
    }

    fileTransfer.upload(imageUrl, "https://systematixindiademo1.herokuapp.com/users/upload", options)
      .then((data) => {
        var jsonResponse = JSON.parse(data.response);
        this.lastImage = jsonResponse.path;
        this.isupload = true;
        this._httpservice.updatebyemail({email: this.email, profile_picture: this.lastImage})
          .subscribe(
            data => this.getResponse(data),
            error => console.log(JSON.stringify(error)),
            () => console.log("finish")
          )
      }, (err) => {
        this.loader.dismiss();
        this.presentToast('File uploading error.');
      })
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

  getResponse(data) {
    this.storage.ready().then(() => {

      if (this.lastImage) {
        this.storage.set('profile_pictire', this.lastImage);
      }
    });
    this.presentToast('sucessfully uploaded');
    this.loader.dismiss();
  }

  public takePicture(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageurl) => {
      this.lastImage = imageurl;
      this.isupload = false;

    }, (err) => {
      this.presentToast('Image error.');
      // Handle error
    });

  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
