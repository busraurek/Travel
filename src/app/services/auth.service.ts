import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor(private http: HttpClient,
    private loadingController: LoadingController) { }

    async login(username: string, password: string): Promise<boolean> {
      const loading = await this.loadingController.create({
        message: 'Giriş yapılıyor...', 
        spinner: 'crescent',
        showBackdrop: true
      });
  
      try {
        await loading.present();
  
        if (username === 'busra' && password === '1') {
          this.isAuthenticated = true;
          return true;
        }
        return false;
      } finally {
        await loading.dismiss(); 
      }
    }
  

  logout(): void {
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
  
  
}
