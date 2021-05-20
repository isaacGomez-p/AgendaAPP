import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';

import { HomePageRoutingModule } from './Home-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule
  ],
  declarations: [HomeComponent]
})
export class HomePageModule {}
