import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/@shared/alert.service';
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
    { value: 'MANUFACTURE', name: 'Fabricante' },
  ];

  constructor(
    private characteristicService: CharacteristicService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.characteristicForm.valid) {
      this.characteristicService.createCharacteristic(this.characteristicForm.value as any).subscribe({
        next: () => {
          this.alertService.showAlert('Creado Correctamente', '', 'success');
          this.router.navigate(['/characteristics']);
        },
        error: (error) => {
          if (error.status == 400) {
            this.alertService.showAlert('Datos Inválidos', 'Por favor verifica los datos', 'warning');
          } else {
            this.alertService.showAlert('Error', 'No se pudo crear el atributo', 'error');
          }
        },
      });
    } else {
      this.alertService.showAlert('Datos Inválidos', 'Por favor verifica los datos', 'warning');
    }
  }
}
