import { ConversionService } from './conversion.service';
import { CurrencyInput } from './../../shared/interfaces/currencyInput';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss']
})
export class ConversionComponent implements OnInit {

  startAmount = 0;
  exchangeAmount = 0;
  startCurrency = "UAH"
  exchangeCurrency = "USD"
  exhangeDirection = false;
  constructor(private conversionService: ConversionService) { }

  ngOnInit(): void {
  }

  setAmount(amount:number) {
    this.exchangeAmount != amount ? this.exhangeDirection = true : this.exhangeDirection = false;
    this.exchangeAmount = amount;
  }

  convertCurrencies(currencyInfo: CurrencyInput) {
    if(currencyInfo.directionFlag)
    {
      this.setAmount(currencyInfo.amount)
      this.exchangeCurrency = currencyInfo.name;
    }
    else
    {
      this.startAmount = currencyInfo.amount;
      this.startCurrency = currencyInfo.name;
    }
    let request;
    this.exhangeDirection ?
      request = this.conversionService.convertCurrencies(this.exchangeCurrency, this.startCurrency, this.exchangeAmount)
      .pipe(
        map((value) => {
          this.startAmount = value.result;
          return value;
        })) :
      request = this.conversionService.convertCurrencies(this.startCurrency, this.exchangeCurrency, this.startAmount)
      .pipe(
        map((value) => {
          this.exchangeAmount = value.result;
          return value;
        }));
    request.subscribe();
  }
}
