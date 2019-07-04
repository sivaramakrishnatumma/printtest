import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StarPage } from './star';

@NgModule({
  declarations: [
    StarPage,
  ],
  imports: [
    IonicPageModule.forChild(StarPage),
  ],
})
export class StarPageModule {}
