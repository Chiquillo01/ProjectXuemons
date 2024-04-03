import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Imports de los servicios //
import { UsersService } from 'src/app/services/users.service';
import { ChuchesService } from '../../../../services/chuches.service';
import { XuxemonsService } from 'src/app/services/xuxemons.service';
// Imports de las rutas //
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editar',
  standalone: true,
  // imports: [CommonModule],
  imports: [ReactiveFormsModule],
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent {
  // Variables especificas //
  xuxemonForm: FormGroup;
  xuxeData: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.xuxeData = {
        id: params['id'],
        nombre: params['nombre'],
        tipo: params['tipo'],
        tamano: params['tamano'],
        evo1: params['evo1'],
        evo2: params['evo2'],
        archivo: params['archivo'],
      };
    });

    // Seteamos los valores //
    this.xuxemonForm.setValue({
      nombre: this.xuxeData.nombre || '',
      tipo: this.xuxeData.tipo || '',
      tamano: this.xuxeData.tamano || '',
      evo1: this.xuxeData.evo1 || '',
      evo2: this.xuxeData.evo2 || '',
      archivo: this.xuxeData.archivo || '',
    });
  }

  constructor(
    public chuchesService: ChuchesService,
    private fb: FormBuilder,
    public userService: UsersService,
    public xuxemonsService: XuxemonsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Restricciones que se espera que tenga el FormGroup //
    this.xuxemonForm = this.fb.group({
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      tamano: ['', [Validators.required]],
      evo1: ['', [Validators.required]],
      evo2: ['', [Validators.required]],
      archivo: ['', [Validators.required]],
    });
  }

  // Función para editar el Xuxemon //
  editarXuxemon() {
    // Se subscribe para recibir la información de la función a la que hace referencia en users.service //
    this.xuxemonsService
      .XuxeUpdate(this.xuxemonForm.value, this.xuxeData.id)
      .subscribe({
        // Aceptada //
        next: (data: any) => {
          // Redirije al usuario y le da un mensaje //
          alert('Xuxemon modificado con exito.');
          this.router.navigate(['home/home/xuxemons/xuxedex']);
        },
        // Rechazada //
        error: (error) => {
          console.log(error);
          // Avisa de que algo salió mal //
          alert('No se pudo editar el Xuxemon');
          throw new Error(error);
        },
      });
  }
}
