import { Component } from '@angular/core';

import { Printer, PrintOptions } from '@ionic-native/printer';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(private printer: Printer) {

  }

  print() {
    this.printer.isAvailable().then(success => {
      alert('printers available::' + success);
      let options: PrintOptions = {
        name: 'MyDocument',
        duplex: true,
        landscape: true,
        grayscale: true
      };
      this.printer.print('Sample Test Print', options).then(success => {
        alert('printer error::' + success);
      }, error => {
        alert('printer error::' + error);
      });
    }, error => {
      alert("Error::" + JSON.stringify(error));
    });

    
  }
}
