import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacteristicRoutingModule } from './characteristic-routing.module';
import { CharacteristicComponent } from './characteristic.component';
import { CreateCharacteristicComponent } from './components/create-characteristic/create-characteristic.component';
import { EditCharacteristicComponent } from './components/edit-characteristic/edit-characteristic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CharacteristicComponent, CreateCharacteristicComponent, EditCharacteristicComponent],
  imports: [CommonModule, CharacteristicRoutingModule, FormsModule, ReactiveFormsModule],
})
export class CharacteristicModule {}
