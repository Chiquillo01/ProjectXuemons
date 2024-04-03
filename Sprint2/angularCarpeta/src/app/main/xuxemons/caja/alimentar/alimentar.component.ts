import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Imports de los servicios //
import { UsersService } from 'src/app/services/users.service';
import { XuxemonsService } from 'src/app/services/xuxemons.service';
// Imports de las rutas //
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alimentar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alimentar.component.html',
  styleUrls: ['./alimentar.component.css']
})
export class AlimentarComponent {
  alimentarForm: FormGroup;
  xuxeData: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.xuxeData = {
        id: params['id'],
        nombre: params['nombre'],
        tipo: params['tipo'],
        tamano: params['tamano'],
        comida: params['comida'],
        evo1: params['evo1'],
        evo2: params['evo2'],
        archivo: params['archivo'],
      };
    });

    // Seteamos los valores //
    this.alimentarForm.setValue({
      nombre: this.xuxeData.nombre || '',
      tipo: this.xuxeData.tipo || '',
      archivo: this.xuxeData.archivo || '',
    });
  }

  constructor(
    private fb: FormBuilder,
    public userService: UsersService,
    public xuxemonsService: XuxemonsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Restricciones que se espera que tenga el FormGroup //
    this.alimentarForm = this.fb.group({
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      archivo: ['', [Validators.required]],
    });
  }

  // Función para editar el Xuxemon //
  alimentarXuxemon() {
    // Se subscribe para recibir la información de la función a la que hace referencia en users.service //
    this.xuxemonsService
      .XuxeComer(this.alimentarForm.value, this.xuxeData.id)
      .subscribe({
        // Aceptada //
        next: (data: any) => {
          // Redirije al usuario y le da un mensaje //
          alert('Xuxemon alimentado con exito.');
          this.router.navigate(['home/home/caja/alimentar']);
        },
        // Rechazada //
        error: (error) => {
          console.log(error);
          // Avisa de que algo salió mal //
          alert('No se pudo alimantar al Xuxemon');
          throw new Error(error);
        },
      });
  }
}
