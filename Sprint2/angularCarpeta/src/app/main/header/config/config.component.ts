import { Component } from '@angular/core';
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
  configTam!: FormGroup;
  configChuches!: FormGroup;
  xuxemons: Xuxemons[] = [];
  xuxeData: any;

  ngOnInit(): void {
    // Especificamos los parametros que queremos que nos de el servidor //
    this.route.queryParams.subscribe((params: { [x: string]: any; }) => {
      this.xuxeData = {
        id: params['id'],
        nombre: params['nombre'],
        tipo: params['tipo'],
        archivo: params['archivo'],
      };
    });

    // Seteamos los valores //
    this.configTam.setValue({
      tamano: this.xuxeData.tamano || '',
    });
  }

  constructor(
    private fb: FormBuilder,
    public userService: UsersService,
    public xuxemonsService: XuxemonsService,
    private route: ActivatedRoute
  ) {
    this.configTam = this.fb.group({
      tamano: ['', [Validators.required]],
    });
    this.configChuches = this.fb.group({
      evo1: ['', [Validators.required]],
      evo2: ['', [Validators.required]],
    });
  }

  // Función para editar el tamaño por defecto de los Xuxemon //
  editarTamanoDef() {
    this.xuxemonsService.XuxeConfig(this.configTam.value).subscribe({
      next: () => {
        alert('Tamaño de los Xuxemons modificado con exito.');
      },
      error: (error) => {
        console.error('Error fetching Xuxemons:', error);
      },
    });
  }

  // Función para editar el nivel por defecto que necessitan para evolucionar los Xuxemon //
  editarChuches() {
    this.xuxemonsService.ChuchesConfig(this.configChuches.value).subscribe({
      next: () => {
        alert('Requisitos de evolución modificados');
      },
      error: (error) => {
        console.log(error);
        alert('No se pudo cambiar el tamaño del Xuxemon');
        throw new Error(error);
      },
    });
  }
}
