import { Component } from '@angular/core';

import { Printer, PrintOptions } from '@ionic-native/printer';
import { StarPRNT } from '@ionic-native/star-prnt';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(private printer: Printer, private starprnt: StarPRNT) {

  }

  print() {
    this.printer.isAvailable().then(success => {
      alert('printers available::' + JSON.stringify(success));
      let options: PrintOptions = {
        name: 'MyDocument',
        duplex: true,
        landscape: true,
        grayscale: true
      };
      this.printer.print('Sample Test Print', options).then(success => {
        alert('printer error::' + JSON.stringify(success));
      }, error => {
        alert('printer error::' + JSON.stringify(error));
      });
    }, error => {
      alert("Error::" + JSON.stringify(error));
    });
  }

  pick() {
    this.printer.pick().then(uri => {
      alert("URI" + JSON.stringify(uri));
    }, error => {
      alert('ERROR' + JSON.stringify(error));
    })
  }

  findStarDevices() {
    this.starprnt.portDiscovery('all')
      .then((res: any) => {
        alert('STAR Devices::' + JSON.stringify(res));
        console.log(res)
      })
      .catch((error: any) => {
        alert('STAR ERROR::' + JSON.stringify(error));
        console.error(error)
      });
  }
}
