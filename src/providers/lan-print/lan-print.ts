import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { TextEncoder } from 'text-encoding';
import { timer } from 'rxjs/observable/timer';
declare var chrome;
/*
  Generated class for the LanPrintProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LanPrintProvider {

  constructor(private alertCtrl: AlertController) { }

  connect(ip, port) {
    return new Promise((resolve, reject) => {
      chrome.sockets.tcp.create(createInfo => {
        const source = timer(10000);
        source.subscribe(data => {
          reject('Timeout!');
        });
        chrome.sockets.tcp.connect(createInfo.socketId, ip, port ? port : 9100,
          result => {
            (!result) ? resolve(createInfo.socketId) : reject();
          });
      });
    });
  }

  print(ip, port, content) {
    this.connect(ip, port).then(socketId => {
      var uint8array = new TextEncoder().encode(content);
      chrome.sockets.tcp.send(socketId, uint8array.buffer, result => {
        if (result) {
          let mno = this.alertCtrl.create({
            title: 'Printed Successfully!',
            buttons: ['Dismiss']
          });
          mno.present();
        } else {
          let mno = this.alertCtrl.create({
            title: 'Unable to print the Receipt!',
            buttons: ['Dismiss']
          });
          mno.present();
        }
      });
    }, () => {
      let mno = this.alertCtrl.create({
        title: 'Unable to connect to the Printer!',
        buttons: ['Dismiss']
      });
      mno.present();
    })
  }

}
