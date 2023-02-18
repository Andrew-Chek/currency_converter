import { ConversionService } from './../../features/conversion/conversion.service';
import { Component, OnInit } from '@angular/core';
import { mergeMap, map } from 'rxjs';
import { Currency } from 'src/app/shared/interfaces/Currency';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currencies:Array<Currency> = []
  constructor(private conversionService: ConversionService) { }

  ngOnInit(): void {
    this.currencies = [];
    const usd = {
      name: 'USD', 
      value: 0
    }
    const eur = {
      name:'EUR', 
      value: 0
    }
    this.conversionService.convertCurrencies('USD', 'UAH').pipe(
      mergeMap(value => {
        usd.value = value.result;
        return this.conversionService.convertCurrencies('EUR', 'UAH')
      }),
      map(value => {
        eur.value = value.result;
      })
    ).subscribe();
    this.currencies.push(usd);
    this.currencies.push(eur);
  }
}
