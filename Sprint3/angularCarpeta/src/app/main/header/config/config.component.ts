import { Component, } from '@angular/core';
// Imports agregados //
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { XuxemonsService } from '../../../services/xuxemons.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent {
  configTam: FormGroup;
  configEvo: FormGroup;
  configEvo2: FormGroup;

  ngOnInit(): void {
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private xuxemonsService: XuxemonsService
  ) {
    this.configTam = this.fb.group({
      tamano: ['', [Validators.required]],
    });
    this.configEvo = this.fb.group({
      evo1: ['', [Validators.required]],
    });
    this.configEvo2 = this.fb.group({
      evo2: ['', [Validators.required]],
    });
  }

  /**
   * Nombre: editarTamanoDef
   * Función: 
   */
  editarTamanoDef() {
    this.xuxemonsService.confTamDef(this.configTam.value).subscribe({
      next: (response) => {
        console.log('Configuración de tamaño actualizada:', response);
        alert('Tamaño por defecto de los Xuxemnos actualizado con exito rotundo.');
        this.router.navigate(['/home/header/config']);
      },
      error: (error) => {
        alert('Fallo estrepitoso al actualizar el tamaño por defecto');
        console.error('Error al actualizar la configuración de tamaño:', error);
      }
    });
  }

  /**
   * Nombre: editarEvoDef
   * Función:
   */
  editarEvoDef() {
    this.xuxemonsService.confEvo(this.configEvo.value).subscribe({
      next: (response) => {
        console.log('Configuración de los  actualizada:', response);
        alert('Evos actualizado con exito rotundo.');
        this.router.navigate(['/home/header/config']);
      },
      error: (error) => {
        alert('Fallo estrepitoso al actualizar las eevoluciones  por defecto');
        console.error('Error al actualizar las evoluciones:', error);
      }
    });
  }

  /**
   * Nombre: editarEvoDef
   * Función:
   */
  editarEvoDef2() {
    this.xuxemonsService.confEvo2(this.configEvo2.value).subscribe({
      next: (response) => {
        console.log('Configuración de los  actualizada:', response);
        alert('Evos actualizado con exito rotundo.');
        this.router.navigate(['/home/header/config']);
      },
      error: (error) => {
        alert('Fallo estrepitoso al actualizar las eevoluciones  por defecto');
        console.error('Error al actualizar las evoluciones:', error);
      }
    });
  }
}
