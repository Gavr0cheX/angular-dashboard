import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }


  onLogin(username: string, password: string) {
    this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Logging in...'
    }).then(loadingEl => {
      loadingEl.present();
      let authObs: Observable<AuthResponseData>;
      authObs = this.authService.login(username, password);
      authObs.subscribe(
        resData => {
          this.router.navigateByUrl('/tabs/services');
          loadingEl.dismiss();
        },
        errRes => {
          let msg: string;
          if (errRes.status === 400) {
            msg = 'Username and password required'
          } else if (errRes.status === 401) {
            msg = 'Wrong username or password'
          } else {
            msg = 'Unknown error contact developer'
          }
          loadingEl.dismiss();
          this.showAlert(msg)
        }
      )
    });
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.username;
    const password = form.value.password;

    this.onLogin(email, password);
  }

  showAlert(message: string) {
    this.alertCtrl.create({
      header: 'Login Failed',
      message: message,
      buttons: ['Cancel']
    }).then(
      alertEl => alertEl.present()
    )
  }
}
