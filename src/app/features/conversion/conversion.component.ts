import { ConversionService } from './conversion.service';
import { CurrencyInput } from './../../shared/interfaces/currencyInput';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss'],
})
export class ConversionComponent implements OnInit, OnDestroy {

  startAmount = 0;
  exchangeAmount = 0;
  startCurrency = "UAH"
  exchangeCurrency = "USD"
  exhangeDirection = false;
  private subscriptions:Array<Subscription> = []

  constructor(private conversionService: ConversionService) { }

  ngOnInit(): void {
  }

  setAmount(amount:number) {
    this.exchangeAmount != amount ? this.exhangeDirection = true : this.exhangeDirection = false;
    this.exchangeAmount = amount;
  }

  private setCurrencyInfo(currencyInfo: CurrencyInput) {
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
  }

  convertCurrencies(currencyInfo: CurrencyInput) {
    this.setCurrencyInfo(currencyInfo)
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
    const sub = request.subscribe(value => console.log(value));
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
