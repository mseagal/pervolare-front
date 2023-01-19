import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { CharacteristicComponent } from './characteristic.component';
import { CreateCharacteristicComponent } from './components/create-characteristic/create-characteristic.component';
import { EditCharacteristicComponent } from './components/edit-characteristic/edit-characteristic.component';

const routes: Routes = [
  { path: '', component: CharacteristicComponent, data: { title: marker('Characteristics') } },
  { path: 'create', component: CreateCharacteristicComponent, data: { title: marker('Create Characteristic') } },
  { path: ':id', component: EditCharacteristicComponent, data: { title: marker('Edit Characteristic') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacteristicRoutingModule {}
