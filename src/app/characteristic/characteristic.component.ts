import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/@shared/alert.service';
import { Characteristic } from '@app/interfaces/characteristic/characteristic.interface';
import { CharacteristicService } from './services/characteristic.service';

@Component({
  selector: 'app-characteristic',
  templateUrl: './characteristic.component.html',
  styleUrls: ['./characteristic.component.scss'],
})
export class CharacteristicComponent implements OnInit {
  characteristics: Characteristic[] = [];

  constructor(private characteristicService: CharacteristicService, private alertService: AlertService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getAllCharacteristics();
  }

  getAllCharacteristics() {
    this.characteristicService.getAllCharacteristics().subscribe({
      next: (data) => {
        this.characteristics = data;
        console.log(data);
      },
      error: () => {
        this.alertService.showAlert('No se pudo obtener los atributos', '', 'error');
      },
    });
  }

  deleteCharacteristic(id: number) {
    this.characteristicService.deleteCharacteristic(id).subscribe({
      next: () => {
        this.alertService.showAlert('Eliminado correctamente', '', 'success');
        this.getAllCharacteristics();
      },
      error: () => {
        this.alertService.showAlert('No se pudo eliminar', '', 'error');
      },
    });
  }
}
