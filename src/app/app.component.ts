import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { register } from 'swiper/element/bundle';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { TranslationService } from './services/translation.service';
import { Subscription } from 'rxjs';
import { MenuController , LoadingController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private languageChangeSubscription: Subscription;
  data : any
  title:any
  
  selectedLanguage: string;
  languageOptions: { code: string, name: string, flag: string }[] = [
    { code: 'tr', name: 'Türkçe', flag: 'assets/flags/tr.png' },
    { code: 'en', name: 'English', flag: 'assets/flags/en.png' },
    { code: 'de', name: 'Deutsch', flag: 'assets/flags/de.png' },
  ];
 
  constructor(
    private dataService : DataService,
    private router: Router,
    private translation: TranslationService,
    private translate : TranslateService,
    private menuController: MenuController,
    private authService: AuthService,
    private loadingController: LoadingController
     ) {
      this.selectedLanguage = 'tr'; 
      this.translation.setLanguage(this.selectedLanguage);
      this.languageChangeSubscription = this.translation.getLanguageChangeObservable().subscribe(() => {
        this.updateTranslations();
      });
    }

  ngOnInit() {
    
    this.updateFlag(this.selectedLanguage);
    this.translation.getDefaultLanguage().subscribe((defaultLang : any)=> {
    this.translation.setLanguage(defaultLang);
    this.updateTranslations(); 
    this.checkMenuStatus();
    this.menuController.enable(!this.authService.isAuthenticatedUser(), 'MenuId');
})
   
    this.dataService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }

  private checkMenuStatus() {

    const isLoggedIn = this.authService.isAuthenticatedUser();
    this.menuController.enable(isLoggedIn, 'MenuId');
  }
  ngOnDestroy() {
    this.languageChangeSubscription.unsubscribe(); 
  }
  navigateToSavedItems() {
    this.router.navigate(['/saved-items']);
  }

  changeLanguage(event: any) {
    if (this.translation && event && event.detail && event.detail.value) {
      const selectedLang = event.detail.value;
      this.translation.setLanguage(selectedLang);
      this.updateFlag(selectedLang);
    
    }
  }
  updateFlag(selectedLang: string){
    const selectedLanguage = this.languageOptions.find(lang => lang.code === selectedLang);
    if (selectedLanguage) {
      this.selectedLanguage = selectedLanguage.flag;
    }
  }
  private updateTranslations() {
    this.translate.get('HomePage.title').subscribe((title) => {
      this.title = title;
    }); }
    async logout() {
      const loading = await this.loadingController.create({
        message: 'Çıkış yapılıyor...',
        spinner: 'crescent',
        showBackdrop: true,
      });
  
      try {
        await loading.present();

        await this.authService.logout();
        setTimeout(async () => {
          await loading.dismiss();
          this.menuController.enable(false, 'MenuId');
          this.router.navigate(['/login'], { replaceUrl: true });
        }, 3000); 
      } catch (error) {
        console.error('Çıkış işlemi sırasında bir hata oluştu.', error);
        await loading.dismiss();
      }
    }
   
}
