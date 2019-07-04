import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { StarPRNT, PrintObj, RasterObj } from '@ionic-native/star-prnt';
/*
  Generated class for the StarPrintProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StarPrintProvider {

  constructor(
    private starprnt: StarPRNT,
    private alertCtrl: AlertController
  ) { }

  search() {
    return new Promise((resolve, reject) => {
      try {
        this.starprnt.portDiscovery('All')
        .then((res: any) => {
          console.log('Success::', res);
          resolve(res);
        }, error => {
          console.log('Error::', error);
          reject(error);
        })
        .catch((error: any) => {
          console.log('Catch::', error);
          reject(error);
        });
      } catch(err) {
        alert('Catch Error:' + JSON.stringify(err));
      }
      
    });
  }

  connect(printer: any, emulation: any) {
    return new Promise((resolve, reject) => {
      let hasBarcodeReader = false;
      this.starprnt.connect(printer, emulation, hasBarcodeReader)
        .subscribe(result => {
          resolve(result);
        }, error => {
          reject('Unable to connect to the Printer!');
        });
    });
  }

  printAsText(portName: any, emulation: any, content: any) {
    let printObj: PrintObj = {
      text: content,
      cutReceipt: true,
      openCashDrawer: false
    }

    this.starprnt.printRawText(portName, emulation, printObj).then(result => {
      let mno = this.alertCtrl.create({
        title: 'Printed Successfully!',
        buttons: ['Dismiss']
      });
      mno.present();
      alert('Response:' + JSON.stringify(result));
    }, error => {
      let mno = this.alertCtrl.create({
        title: 'Unable to print the Receipt!',
        buttons: ['Dismiss']
      });
      mno.present();
      alert('Error:' + JSON.stringify(error));
    });
  }

  printAsImage(portName: any, emulation: any, content: any) {
    if (!content) {
      content = "        Star Clothing Boutique\n" +
        "             123 Star Road\n" +
        "           City, State 12345\n" +
        "\n" +
        "Date:MM/DD/YYYY          Time:HH:MM PM\n" +
        "--------------------------------------\n" +
        "SALE\n" +
        "SKU            Description       Total\n" +
        "300678566      PLAIN T-SHIRT     10.99\n" +
        "300692003      BLACK DENIM       29.99\n" +
        "300651148      BLUE DENIM        29.99\n" +
        "300642980      STRIPED DRESS     49.99\n" +
        "30063847       BLACK BOOTS       35.99\n" +
        "\n" +
        "Subtotal                        156.95\n" +
        "Tax                               0.00\n" +
        "--------------------------------------\n" +
        "Total                          $156.95\n" +
        "--------------------------------------\n" +
        "\n" +
        "Charge\n" +
        "156.95\n" +
        "Visa XXXX-XXXX-XXXX-0123\n" +
        "Refunds and Exchanges\n" +
        "Within 30 days with receipt\n" +
        "And tags attached\n";
    }
    let rasterObj: RasterObj = {
      text: content,
      cutReceipt: true,
      openCashDrawer: false,
      fontSize: 25,
      paperWidth: 576
    }

    this.starprnt.printRasterReceipt(portName, emulation, rasterObj).then(result => {
      let mno = this.alertCtrl.create({
        title: 'Printed Successfully!',
        buttons: ['Dismiss']
      });
      mno.present();
      alert('Response:' + JSON.stringify(result));
    }, error => {
      let mno = this.alertCtrl.create({
        title: 'Unable to print the Receipt!',
        buttons: ['Dismiss']
      });
      mno.present();
      alert('Error:' + JSON.stringify(error));
    });
  }
}
