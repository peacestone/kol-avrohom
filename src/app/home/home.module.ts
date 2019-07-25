import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {PipesModule} from '../pipes/pipes.module';
import { HomePage } from './home.page';
import {DafYomiCalculaterService} from '../services/day-yomi-calculater/daf-yomi-calculater.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    PipesModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
