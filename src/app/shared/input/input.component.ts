import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CurrencyInput } from '../interfaces/currencyInput';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() direction = ""
  @Input() selectValue = "USD"
  @Input() inputValue = ""
  @Output() sentCurrencyInput = new EventEmitter<CurrencyInput>();
  options = ['EUR', 'USD', 'UAH', 'GBP'];
  checkError = false;
  constructor() { }

  ngOnInit(): void {
  }
  checkDirectionFlag() {
    return this.direction == "to"
  }
  sendRequestData(name:string, amount: string)
  {
    const parsed = Number.parseInt(amount)
    Number.isNaN(parsed) ? this.checkError = true : this.sentCurrencyInput.emit({directionFlag: this.checkDirectionFlag(), name, amount: parsed})
  }
}
