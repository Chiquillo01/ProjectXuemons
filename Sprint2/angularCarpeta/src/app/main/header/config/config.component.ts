import { Component } from '@angular/core';
// Imports agregados //
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Xuxemons } from '../../../models/xuxedex/xuxedex.model';
import { UsersService } from 'src/app/services/users.service';
import { XuxemonsService } from 'src/app/services/xuxemons.service';
import { Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    public userService: UsersService,
    public xuxemonsService: XuxemonsService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
