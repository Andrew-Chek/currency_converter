import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurrencyResonse } from 'src/app/shared/interfaces/CurrencyResponse';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  apiUrl = 'https://api.apilayer.com/fixer'
  accessKey = 'bWI6JXBskJrZ90ElyLKC26GdCMcMlIZe'

  constructor(private http: HttpClient) { }

  convertCurrencies(startCurrency:string, exchangeCurrency:string, amount=1) {
    return this.http.get<CurrencyResonse>(
      `${this.apiUrl}/convert?from=${startCurrency}&to=${exchangeCurrency}&amount=${amount}`, 
      { headers: {apikey: this.accessKey}}
    )
  }
}
