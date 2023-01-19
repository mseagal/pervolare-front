import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { CharacteristicComponent } from './characteristic.component';

const routes: Routes = [{ path: '', component: CharacteristicComponent, data: { title: marker('Characteristics') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacteristicRoutingModule {}
