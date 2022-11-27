import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { HeaderComponent } from './header/header.component';
import { PagesComponent } from './pages/pages.component';


@NgModule({
  declarations: [
    HeaderComponent,
    PagesComponent
  ],
  imports: [  
    CommonModule,
    GeneralRoutingModule
  ]
})
export class GeneralModule { }
