import { ConversionComponent } from './conversion.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ConversionComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ConversionComponent
  ]
})
export class ConversionModule { }
