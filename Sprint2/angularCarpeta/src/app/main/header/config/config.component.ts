import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Imports de los modelos necesarios //
import { Xuxemons } from '../../../models/xuxedex/xuxedex.model';
// Imports de los servicios //
import { UsersService } from 'src/app/services/users.service';
import { XuxemonsService } from 'src/app/services/xuxemons.service';
// Imports de las rutas //
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {

  // Variables especificas //
  configTam: FormGroup<any>;
  configChuches: FormGroup;
  xuxemons: Xuxemons[] = [];

  constructor(
    private fb: FormBuilder,
    public userService: UsersService,
    public xuxemonsService: XuxemonsService,
    private router: Router,
  ) {
    // Restricciones que se espera que tenga el FormGroup //
    this.configTam = this.fb.group({
      tamano: ['', [Validators.required]],
    });

    this.configChuches = this.fb.group({
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      archivo: ['', [Validators.required]],
    });
  }

  // Función para editar el tamaño por defecto de los Xuxemon //
  editarTamanoDef() {
    console.log('Datos antes de enviar:', this.configTam.value);
    
    this.xuxemonsService.getAllXuxemons().subscribe({
      next: (value: any) => {
        this.xuxemons = value[0];
        alert('Xuxemons modificados con exito.');
      },
      error: (error) => {
        console.error('Error fetching Xuxemons:', error);
      },
    });
  }

  // Función para editar el tamaño por defecto de los Xuxemon //
  editarChuches() {
    // Se subscribe para recibir la información de la función a la que hace referencia en xuxemons.service //
    this.xuxemonsService
      .XuxeConfig(this.configTam.value)
      .subscribe({
        // Aceptada //
        next: (data: any) => {
          // Redirije al usuario y le da un mensaje //
          alert('Tamaño base de los Xuxemons se ha moificado');
          this.router.navigate(['home/home']);
        },
        // Rechazada //
        error: (error) => {
          console.log(error);
          // Avisa de que algo salió mal //
          alert('No se pudo cambiar el tamaño del Xuxemon');
          throw new Error(error);
        },
      });
  }
}
