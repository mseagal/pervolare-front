import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/@shared/alert.service';
import { environment } from '@env/environment';
import { finalize } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  registerForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  private createForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register() {
    this.isLoading = true;
    const register$ = this.authenticationService.register(this.registerForm.value as any);
    register$
      .pipe(
        finalize(() => {
          this.registerForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          this.alertService.showAlert('Registrado correctamente', 'Ahora puedes iniciar sesión', 'success');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          if (error.status == 400) {
            this.alertService.showAlert('Datos Inválidos', 'Por favor verifica los datos', 'warning');
          } else {
            this.alertService.showAlert('Error', 'No se pudo realizar el registro', 'error');
          }
        },
      });
  }
}
