import { Component, Input, OnInit } from '@angular/core';
// Imports agregados //
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Xuxemons } from '../../../models/xuxedex/xuxedex.model';
import { UsersService } from 'src/app/services/users.service';
import { XuxemonsService } from 'src/app/services/xuxemons.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent {
  // Variables especificas //
  configTam: FormGroup;
  configChuches: FormGroup;
  xuxeData: any;
  xuxeUsersData: any;

  ngOnInit(): void {
    // Especificamos los parametros que queremos que nos de el servidor //
    this.route.queryParams.subscribe((params) => {
      this.xuxeData = {
        id: params['id'],
        nombre: params['nombre'],
        tipo: params['tipo'],
        tamano: params['tamano'],
        vida: params['vida'],
        archivo: params['archivo'],
      };
    });
    this.route.queryParams.subscribe((params) => {
      this.xuxeUsersData = {
        id: params['id'],
        nombre: params['nombre'],
        tipo: params['tipo'],
        tamano: params['tamano'],
        comida: params['comida'],
        evo1: params['evo1'],
        evo2: params['evo2'],
        vida: params['vida'],
        archivo: params['archivo'],
      };
    });

    // Seteamos los valores //
    this.configTam.setValue({
      nombre: this.xuxeData.nombre || '',
      tamano: this.xuxeData.tamano || '',
    });
    this.configChuches.setValue({
      nombre: this.xuxeData.nombre || '',
      evo1: this.xuxeUsersData.evo1 || '',
      evo2: this.xuxeUsersData.evo2 || '',
    });
  }

  constructor(
    private fb: FormBuilder,
    public userService: UsersService,
    public xuxemonsService: XuxemonsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configTam = this.fb.group({
      nombre: ['', [Validators.required]],
      tamano: ['', [Validators.required]],
    });
    this.configChuches = this.fb.group({
      nombre: ['', [Validators.required]],
      evo1: ['', [Validators.required]],
      evo2: ['', [Validators.required]],
    });
  }

  // // Función para editar el tamaño por defecto de los Xuxemon //
  // editarTamanoDef() {
  //   this.xuxemonsService
  //     .XuxeConfig(this.configTam.value, this.xuxeData.id)
  //     .subscribe({
  //       next: (data: any) => {
  //         alert('Tamaño de los Xuxemons modificado con exito.');
  //       },
  //       error: (error) => {
  //         console.log(error);
  //         alert('No se pudo cambiar el tamaño del Xuxemon');
  //         throw new Error(error);
  //       },
  //     });
  // }

  // // Función para editar el nivel por defecto que necessitan para evolucionar los Xuxemon //
  // editarChuches() {
  //   this.xuxemonsService
  //     .ChuchesConfig(this.configChuches.value, this.xuxeData.id)
  //     .subscribe({
  //       next: (data: any) => {
  //         alert('Requisitos de evolución modificados');
  //       },
  //       error: (error) => {
  //         console.log(error);
  //         alert('No se pudo cambiar las evoluciones del Xuxemon');
  //         throw new Error(error);
  //       },
  //     });
  // }
}
