import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  submitAttempt: boolean;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    //this.router.navigateByUrl('/tabs');
  }

  async logout() {
    this.submitAttempt = true;

    const loadingElement = await this.loadingCtrl.create({
      message: 'Please Wait',
      spinner: 'crescent',
      // duration: 2000
    });
    
    await loadingElement.present().then(() => {
      this.router.navigateByUrl('/login');
      this.loadingCtrl.dismiss();
    });
  }  

}
