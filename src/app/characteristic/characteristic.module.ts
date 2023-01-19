import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacteristicRoutingModule } from './characteristic-routing.module';
import { CharacteristicComponent } from './characteristic.component';

@NgModule({
  declarations: [CharacteristicComponent],
  imports: [CommonModule, CharacteristicRoutingModule],
})
export class CharacteristicModule {}
