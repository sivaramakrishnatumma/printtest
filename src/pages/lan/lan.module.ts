import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LanPage } from './lan';

@NgModule({
  declarations: [
    LanPage,
  ],
  imports: [
    IonicPageModule.forChild(LanPage),
  ],
})
export class LanPageModule {}
