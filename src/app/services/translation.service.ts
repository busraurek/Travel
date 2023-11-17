import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TranslationService {

  private languageChangeSubject: Subject<void> = new Subject<void>();
  constructor(private translate: TranslateService ) {

    
  }

  getLanguageChangeObservable(): Observable<void> {
    return this.languageChangeSubject.asObservable();
  }
  getDefaultLanguage(): Observable<string> {
    return new Observable<string>((observer) => {
      let language = this.translate.getBrowserLang() || 'tr';
      this.translate.setDefaultLang(language);
      observer.next(language);
      observer.complete();
    });
  }
   
  setLanguage(setLang : string) {
    this.translate.use(setLang);
  }
  getTranslation(key: string): Observable<string> {
    return this.translate.get(key);
  }
}