import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MenuController } from '@ionic/angular';
import { ToastController,LoadingController  } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials : any

  constructor( 
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private menuController: MenuController,
    private toastController: ToastController,
    private loadingController: LoadingController
    ) { }
    

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      username: ['', [Validators.required]],
      password :['', [Validators.required]]
     });
  }

  get username (){
    return this.credentials.get('username');
  }

  get password (){
    return this.credentials.get('password')
  }
  async onSubmit() {
    const success = await this.authService.login(this.credentials.value.username, this.credentials.value.password);

    if (success) {
      const loading = await this.loadingController.create({
        message: 'Giriş yapılıyor...',
        spinner: 'crescent',
        showBackdrop: true,
      });

      try {
        await loading.present();
        await this.menuController.enable(true, 'MenuId');
        this.router.navigate(['home'], { replaceUrl: true });
        this.presentToast('Giriş Başarılı');
      } finally {
        await loading.dismiss();
      }
    } else {
      this.showAlert('Giriş Başarısız', 'Yanlış kimlik bilgileri');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['Tamam'],
    });
    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      cssClass: 'custom-toast',
    });
    toast.present();
  }
}
