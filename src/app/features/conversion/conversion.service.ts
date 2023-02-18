import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurrencyResonse } from 'src/app/shared/interfaces/CurrencyResponse';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  private apiUrl = 'https://api.apilayer.com/exchangerates_data';
  private accessKey = 'bWI6JXBskJrZ90ElyLKC26GdCMcMlIZe';

  constructor(private http: HttpClient) { }

  convertCurrencies(startCurrency:string, exchangeCurrency:string, amount=1) {
    return this.http.get<CurrencyResonse>(
      `${this.apiUrl}/convert?to=${exchangeCurrency}&from=${startCurrency}&amount=${amount}`, 
      { headers: {apikey: this.accessKey}}
    )
  }
}
