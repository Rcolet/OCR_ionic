import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
 
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Camera } from '@ionic-native/camera';
import { NgProgressModule } from '@ngx-progressbar/core';
import { EmailFormPage } from '../pages/email-form/email-form';
import { EmailProvider } from '../providers/email/email';
import { EmailComposer } from '@ionic-native/email-composer';
import { ImageProvider } from '../providers/image/image';

class CameraMock extends Camera {
  getPicture(options) {
    return new Promise((resolve, reject) => {
      resolve("BASE_64_ENCODED_DATA_GOES_HERE");
    })
  }
}
 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EmailFormPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgProgressModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EmailFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: Camera, useClass: CameraMock },
    EmailProvider,
    ImageProvider
  ]
})
export class AppModule {}