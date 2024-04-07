import { Component, EventEmitter, Output } from '@angular/core';
// Imports extras //
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { XuxemonsService } from 'src/app/services/xuxemons.service';
import { Xuxemons } from '../../../../models/xuxedex/xuxedex.model';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent {
  // Variables //
  xuxemonForm!: FormGroup;
  xuxemon: Xuxemons | undefined;

  @Output() enviarFormulario: EventEmitter<Xuxemons> =
    new EventEmitter<Xuxemons>();
  @Output() ocultarForm = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    public userService: UsersService,
    public xuxemonsService: XuxemonsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Restricciones que se espera que tenga el FormGroup //
    this.xuxemonForm = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      archivo: new FormControl('', [Validators.required]),
    });
  }

  // Guarda el Xuxemon en la BD //
  crearXuxemon() {
    if (this.xuxemonForm.valid) {
      // Se subscribe para recibir la información de la función a la que hace referencia en xuxemons.service //
      this.xuxemonsService.createXuxemon(this.xuxemonForm.value).subscribe({
        // Aceptada //
        next: () => {
          // Redirije a la xuxedex y le da un mensaje //
          this.router.navigate(['home/home/xuxemons/xuxedex']);
          alert('Xuxemon creado con exito.');
          this.router.navigate(['home/home/xuxemons/xuxedex']);
        },
        // Rechazada //
        error: (error) => {
          console.log(error);
          // Avisa de que algo salió mal //
          console.error('Error al crear el Xuxemon:', error);
          alert('No se pudo crear el Xuxemon');
          throw new Error(error);
        },
      });
    }
  }
}
