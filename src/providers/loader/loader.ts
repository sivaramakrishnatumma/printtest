import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

/*
  Generated class for the LoaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoaderProvider {
  loader: Loading = null;
  constructor(private loadingCtrl: LoadingController) {
    console.log('Hello LoaderProvider Provider');
  }

  show() {
    if (!this.loader) {
      this.loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      this.loader.present();
    }
  }

  hide() {
    if(this.loader) {
      this.loader.dismiss();
      this.loader = null;
    }
  }

}
