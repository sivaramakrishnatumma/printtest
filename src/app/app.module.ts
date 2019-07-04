import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StarPRNT } from '@ionic-native/star-prnt';
import { LanPrintProvider } from '../providers/lan-print/lan-print';
import { StarPrintProvider } from '../providers/star-print/star-print';
import { LoaderProvider } from '../providers/loader/loader';

import { StarPrinterModels } from '../constants/star-printer-models';
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StarPrinterModels,
    StarPRNT,
    LanPrintProvider,
    StarPrintProvider,
    LoaderProvider
  ]
})
export class AppModule {}
