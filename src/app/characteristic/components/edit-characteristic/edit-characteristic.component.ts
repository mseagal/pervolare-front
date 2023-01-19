import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacteristicService } from '@app/characteristic/services/characteristic.service';

@Component({
  selector: 'app-edit-characteristic',
  templateUrl: './edit-characteristic.component.html',
  styleUrls: ['./edit-characteristic.component.scss'],
})
export class EditCharacteristicComponent implements OnInit {
  characteristicId: number;
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
    private activatedRoute: ActivatedRoute,
    private characteristicService: CharacteristicService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.characteristicId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.fillCharacteristicForm(this.characteristicId);
  }

  fillCharacteristicForm(characteristicId: number) {
    this.characteristicService.getOneCharacteristic(characteristicId).subscribe({
      next: (data) => {
        if (data) {
          this.characteristicForm.patchValue({
            name: data.name,
            type: data.type,
          });
        } else {
          this.router.navigate(['/characteristics']);
        }
      },
      error: (error) => {
        console.log('ha ocurrido un error al obtener el registro');
        this.router.navigate(['/characteristics']);
      },
    });
  }

  onSubmit() {
    if (this.characteristicForm.valid) {
      this.characteristicService
        .updateCharacteristic(this.characteristicId, this.characteristicForm.value as any)
        .subscribe({
          next: () => {
            console.log('ACtualizado correctamente');
            this.router.navigate(['/characteristics']);
          },
          error: (error) => {
            console.log('ha ocurrido un error al actualizar el registro', error);
          },
        });
    } else {
      console.log('Formulario inválido');
    }
  }
}
