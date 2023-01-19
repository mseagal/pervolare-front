import { Component, OnInit } from '@angular/core';
import { Characteristic } from '@app/interfaces/characteristic/characteristic.interface';
import { CharacteristicService } from './services/characteristic.service';

@Component({
  selector: 'app-characteristic',
  templateUrl: './characteristic.component.html',
  styleUrls: ['./characteristic.component.scss'],
})
export class CharacteristicComponent implements OnInit {
  characteristics: Characteristic[] = [];

  constructor(private characteristicService: CharacteristicService) {}

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
        alert('Ha ocurrido un error');
      },
    });
  }

  deleteCharacteristic(id: number) {
    this.characteristicService.deleteCharacteristic(id).subscribe({
      next: () => {
        console.log('eliminado correctamente');
        this.getAllCharacteristics();
      },
      error: () => {
        console.log('error al eliminar');
      },
    });
  }
}
