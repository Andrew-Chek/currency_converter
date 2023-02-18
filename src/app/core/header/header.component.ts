import { ConversionService } from './../../features/conversion/conversion.service';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { mergeMap, map, Subscription } from 'rxjs';
import { Currency } from 'src/app/shared/interfaces/Currency';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {

  currencies:Array<Currency> = [];
  private subscriptions: Array<Subscription> = [];

  constructor(private conversionService: ConversionService) { }

  ngOnInit(): void {
    this.fillCurrencies();
  }

  private fillCurrencies() {
    this.currencies = [];
    const conversionSub = this.conversionService.convertCurrencies('USD', 'UAH').pipe(
      mergeMap(value => {
        const usd = {name: 'USD', value: value.result}
        this.currencies.push(usd);
        return this.conversionService.convertCurrencies('EUR', 'UAH')
      }),
      map(value => {
        const eur = {name: 'EUR', value: value.result}
        this.currencies.push(eur);
      })
    ).subscribe();
    this.subscriptions.push(conversionSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
