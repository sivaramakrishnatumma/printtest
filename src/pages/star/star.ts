import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StarPrintProvider } from '../../providers/star-print/star-print';
import { StarPrinterModels } from '../../constants/star-printer-models';
import { LoaderProvider } from '../../providers/loader/loader';
/**
 * Generated class for the StarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-star',
  templateUrl: 'star.html',
})
export class StarPage {
  printers: any = [];
  private starPrinterModels: any = [];
  private selectedStarPrinter: any = null;
  private selectedStarPrinterModel: any = null;
  private content: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private starPrinter: StarPrintProvider,
    public starPrinters: StarPrinterModels,
    private loader: LoaderProvider,
    private storage: Storage,
    private alertCtrl: AlertController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StarPage');
    this.content = `^XA
      ^FO220,100^FD1000 Shipping Lane^FS
      ^FO220,135^FDShelbyville TN 38102^FS
      ^FO220,170^FDUnited States (USA)^FS
      ^FO50,250^GB700,1,3^FS
      ^XZ`;
    this.starPrinterModels = this.starPrinters.models;
    this.loadStarPrinters();
  }

  loadStarPrinters() {
    this.loader.show();
    this.starPrinter.search().then((result: any) => {
      this.loader.hide();
      alert('printers::' + JSON.stringify(result));
      this.printers = result;
    }, () => {
      this.loader.hide();
    });
  }

  connectToStarPrinter() {
    this.loader.show();
    this.starPrinter.connect(this.selectedStarPrinter.portName, this.selectedStarPrinterModel.emulation).then(success => {
      this.loader.hide();
      this.storage.set('starPrinterDetails', {
        printer: this.selectedStarPrinter,
        model: this.selectedStarPrinterModel
      })
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

  printAsText() {
    this.storage.get('starPrinterDetails').then(details => {
      let portName: any = details.printer.portName;
      let emulation: any = details.model.emulation;
      this.starPrinter.printAsText(portName, emulation, this.content);
    });
  }

  printAsImageWithCommands() {
    this.storage.get('starPrinterDetails').then(details => {
      let portName: any = details.printer.portName;
      let emulation: any = details.model.emulation;
      this.starPrinter.printAsImage(portName, emulation, this.content);
    });
  }

  printAsImageWithoutCommands() {
    this.storage.get('starPrinterDetails').then(details => {
      let portName: any = details.printer.portName;
      let emulation: any = details.model.emulation;
      this.starPrinter.printAsImage(portName, emulation, null);
    });
  }

}
