import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CharacteristicService } from '@app/characteristic/services/characteristic.service';

@Component({
  selector: 'app-create-characteristic',
  templateUrl: './create-characteristic.component.html',
  styleUrls: ['./create-characteristic.component.scss'],
})
export class CreateCharacteristicComponent implements OnInit {
  characteristicForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    type: ['', [Validators.required]],
  });
  types = [
    { value: 'COLOR', name: 'Color' },
    { value: 'SIZE', name: 'Talla' },
    { value: 'BRAND', name: 'Marca' },
    { value: 'MANUFACTURER', name: 'Fabricante' },
  ];

  constructor(
    private characteristicService: CharacteristicService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.characteristicForm.valid) {
      this.characteristicService.createCharacteristic(this.characteristicForm.value as any).subscribe({
        next: () => {
          console.log('creado correctamente');
          this.router.navigate(['/characteristics']);
        },
        error: () => {
          console.log('ha ocurrido un error');
        },
      });
    } else {
      console.log('form invalido');
    }
  }
}
