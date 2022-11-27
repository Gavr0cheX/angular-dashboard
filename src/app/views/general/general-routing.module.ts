import { LoginGuard } from './../../guards/login.guard';
import { AuthGuard } from './../../guards/auth.guard';
import { PagesComponent } from './pages/pages.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'General' 
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'header'
      },
      {
        path: 'header',
        component: HeaderComponent,
        data: {
          title: 'Header Control'
        }
      },
      {
        path: 'pages',
        component: PagesComponent,
        data: {
          title: 'Pages Control'
        }
      }
    ],
    canActivate: [LoginGuard]
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
