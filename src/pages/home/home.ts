import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { Camera, PictureSourceType } from '@ionic-native/camera';
import * as Tesseract from 'tesseract.js'
import { NgProgress } from '@ngx-progressbar/core';
import { Platform } from 'ionic-angular';
import { EmailFormPage } from '../email-form/email-form';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  selectedImage: string;
  imageText: string;
  emailFormPage = EmailFormPage;

  constructor(public navCtrl: NavController, 
              private camera: Camera, 
              private actionSheetCtrl: ActionSheetController, 
              public progress: NgProgress,
              public platform:Platform) {
  }
  selectSource() {   
    if (this.platform.is('core')) {
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Use Library',
            handler: () => {
              this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
          }, {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    } else {
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Use Library',
            handler: () => {
              this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
          }, {
            text: 'Capture Image',
            handler: () => {
              this.getPicture(this.camera.PictureSourceType.CAMERA);
            }
          }, {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    }
  }

  getPicture(sourceType: PictureSourceType) {
      this.camera.getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: sourceType,
        allowEdit: true,
        saveToPhotoAlbum: false,
        correctOrientation: true
      }).then((imageData) => {
        this.selectedImage = `data:image/jpeg;base64,${imageData}`;
      });
  }

  recognizeImage() {
    Tesseract.recognize(this.selectedImage)
    .progress(message => {
      if (message.status === 'recognizing text')
      this.progress.set(message.progress);
    })
    .catch(err => console.error(err))
    .then(result => {
      this.imageText = result.text;
    })
    .finally(resultOrError => {
      this.progress.complete();
    });
  }
}