import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login_forms: any;
  submitAttempt: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    //private clientApi: ClientApiService,
  ) { 
    this.login_forms = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });  
  }

  ngOnInit() {
    //this.router.navigateByUrl('/tabs');
  }

  async login() {
    this.submitAttempt = true;
    if (this.login_forms.valid) {
      let form = this.login_forms;

      const loadingElement = await this.loadingCtrl.create({
        message: 'Please Wait',
        spinner: 'crescent',
        // duration: 2000
      });
      
      await loadingElement.present().then(() => {
        /*
        this.clientApi.login(form.value).then((data: any) => {
          this.loadingCtrl.dismiss();
          if (data) {
            // console.log(data);
            if (data.success == 0)
            {
              this.showAlertNotif(data.message, 'Login Failed');      
            }
            else 
            {
              this.storage.ready().then(() => {
                this.storage.remove(this.clientApi.DATA_USER_KEY);
                this.storage.set(this.clientApi.DATA_USER_KEY, JSON.stringify(data['data']));
              });  

              this.clientApi.authState.next(true);

              this.router.navigateByUrl('/tabs/monitoring');
            }
          }
        }).catch(err => {
          this.loadingCtrl.dismiss();
        });
        */  
        this.login().then((data: any) => {
          this.loadingCtrl.dismiss();
          this.router.navigateByUrl('tabs');
        }).catch(err => {
          this.loadingCtrl.dismiss();
        });
      });
    } 
  }  

  async showAlertNotif(errorMsg, headerText) {
    const alert = await this.alertCtrl.create({
      header: headerText,
      message: errorMsg,
      buttons: ['OK']
    });

    await alert.present();
  } 

}
