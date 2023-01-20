import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/@shared/alert.service';
import { CharacteristicService } from '@app/characteristic/services/characteristic.service';
import { CharacteristicTypeSpanish } from '@app/enums/characteristic-type-spanish';
import { Characteristic } from '@app/interfaces/characteristic/characteristic.interface';
import { AddCharacteristicToProduct } from '@app/interfaces/product/add-characteristic-to-product.interface';
import { CharactersiticProduct } from '@app/interfaces/product/characteristic-product.interface';
import { ProductService } from '@app/product/services/product.service';
export interface SelectCharacteristcType {
  value: number;
  name: string;
}
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  productId: number;
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    value: [0, [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
  });
  selectCharacteristicType: SelectCharacteristcType[] = [];
  combinationsOfCharacteristic: string[] = [];
  characteristicsOfProduct: CharactersiticProduct[] = [];
  selectCharacteristicInput: FormControl = new FormControl('', Validators.required);

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private characteristicService: CharacteristicService
  ) {
    this.productId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.fillProductForm(this.productId);
  }

  fillProductForm(productId: number) {
    this.productService.getOneProduct(productId).subscribe({
      next: (data) => {
        if (data) {
          this.productForm.patchValue({
            name: data.name,
            value: data.value,
            description: data.description,
          });
          this.combinationsOfCharacteristic = data.combinations;
          this.characteristicsOfProduct = data.characteristics;
          this.getAllCharacteristics();
        } else {
          this.router.navigate(['/products']);
        }
      },
      error: (error) => {
        this.alertService.showAlert('Error', 'Ha ocurrido un error al obtener el registro', 'error');
        this.router.navigate(['/products']);
      },
    });
  }

  getAllCharacteristics() {
    this.characteristicService.getAllCharacteristics().subscribe({
      next: (data) => {
        this.selectCharacteristicType = [];
        data.forEach((characteristic) => {
          let alreadyExists = this.characteristicsOfProduct.find((item) => item.characteristicId == characteristic.id);

          if (!alreadyExists) {
            this.selectCharacteristicType.push({
              value: characteristic.id,
              name: CharacteristicTypeSpanish[characteristic.type] + ' ' + characteristic.name,
            });
          } else {
            // This option is skipped
          }
        });
      },
      error: () => {
        this.alertService.showAlert('No se pudo obtener atributos', '', 'error');
      },
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.updateProduct(this.productId, this.productForm.value as any).subscribe({
        next: () => {
          this.alertService.showAlert('Actualizado Correctamente', '', 'success');
          this.router.navigate(['/products']);
        },
        error: (error) => {
          if (error.status == 400) {
            this.alertService.showAlert('Datos Inválidos', 'Por favor verifica los datos', 'warning');
          } else {
            this.alertService.showAlert('Error', 'No se pudo actualizar el producto', 'error');
          }
        },
      });
    } else {
      this.alertService.showAlert('Datos Inválidos', 'Por favor verifica los datos', 'warning');
    }
  }

  addCharacteristicToProduct() {
    let data: AddCharacteristicToProduct = {
      characteristicIds: [+this.selectCharacteristicInput.value],
    };
    this.productService.addCharacteristicToProduct(this.productId, data).subscribe({
      next: () => {
        this.alertService.showAlert('Atributo agregado Correctamente', '', 'success');
        this.selectCharacteristicInput.reset();
        this.fillProductForm(this.productId);
      },
      error: (error) => {
        if (error.status == 400) {
          this.alertService.showAlert('Datos Inválidos', 'Por favor verifica los datos', 'warning');
        } else {
          this.alertService.showAlert('Error', 'No se pudo agregar el atributo', 'error');
        }
      },
    });
  }
}
