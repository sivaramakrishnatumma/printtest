import { Component } from '@angular/core';

import { Printer, PrintOptions } from '@ionic-native/printer';
import { StarPRNT } from '@ionic-native/star-prnt';
import { TextEncoder } from 'text-encoding';
import { Platform } from 'ionic-angular';
declare var chrome;

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  socketId;
  ip;
  port;

  constructor(private printer: Printer, private starprnt: StarPRNT, private platform: Platform) {

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

  connect(ip, port) {
    console.log(ip + " " + port);
    this.platform.ready().then(() => {
      chrome.sockets.tcp.create(function (createInfo) {
        chrome.sockets.tcp.connect(
          createInfo.socketId,
          ip,
          port ? port : 9100,
          function (result) {
            if (!result) {
              alert("connect success!");
              this.socketId = createInfo.socketId;
            } else {
              this.socketId = null;
            }
          }
        );
      });
    });
  };

  printToLAN() {
    let content = 'Sample Test to print';
    if (this.socketId == null) {
      return;
    }
    var uint8array = new TextEncoder().encode(content);
    chrome.sockets.tcp.send(this.socketId, uint8array.buffer, function (result) {
      alert('SUCCESS::' + JSON.stringify(result));
      console.log(result);
    });
  }
}
