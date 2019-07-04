import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LanPrintProvider } from '../../providers/lan-print/lan-print';
import { LoaderProvider } from '../../providers/loader/loader';
/**
 * Generated class for the LanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lan',
  templateUrl: 'lan.html',
})
export class LanPage {
  socketId;
  ip;
  port;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private lanPrinter: LanPrintProvider,
    private loader: LoaderProvider,
    private storage: Storage,
    private alertCtrl: AlertController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanPage');
  }

  connect(ip, port) {
    this.loader.show();
    this.lanPrinter.connect(ip, port).then(socketId => {
      this.loader.hide();
      this.storage.set('lanPrinterDetails', { ip, port, socketId });
      let mno = this.alertCtrl.create({
        title: 'Connected to Printer Successfully',
        buttons: ['Dismiss']
      });
      mno.present();
    }, error => {
      this.loader.hide();
      let mno = this.alertCtrl.create({
        title: '' + error,
        buttons: ['Dismiss']
      });
      mno.present();
    });
  }

  print() {
    let content = `^XA
      ^FO220,100^FD1000 Shipping Lane^FS
      ^FO220,135^FDShelbyville TN 38102^FS
      ^FO220,170^FDUnited States (USA)^FS
      ^FO50,250^GB700,1,3^FS
      ^XZ`;
    this.storage.get('lanPrinterDetails').then(details => {
      this.lanPrinter.print(details.ip, details.port, content);
    });
  }
}
