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
   * Función: Envia los valores que tiene el formulario de tamaño al
   * servicio del xuxemon, para enviar la información a la api
   */
  editarTamanoDef() {
    this.xuxemonsService.confTamDef(this.configTam.value).subscribe({
      next: () => {
        alert('Tamaño por defecto de los Xuxemnos actualizado con exito rotundo.');
        this.router.navigate(['/home/header/config']);
      },
      error: () => {
        alert('Fallo estrepitoso al actualizar el tamaño por defecto');
      }
    });
  }

  /**
   * Nombre: editarEvoDef
   * Función: Envia los valores que tiene el formulario de evolución 1 al
   * servicio del xuxemon, para enviar la información a la api
   */
  editarEvoDef() {
    this.xuxemonsService.confEvo(this.configEvo.value).subscribe({
      next: () => {
        alert('Evos actualizado con exito rotundo.');
        this.router.navigate(['/home/header/config']);
      },
      error: () => {
        alert('Fallo estrepitoso al actualizar las eevoluciones  por defecto');
      }
    });
  }

  /**
   * Nombre: editarEvoDef2
   * Función: Envia los valores que tiene el formulario de evolución 1 al
   * servicio del xuxemon, para enviar la información a la api
   */
  editarEvoDef2() {
    this.xuxemonsService.confEvo2(this.configEvo2.value).subscribe({
      next: () => {
        alert('Evos actualizado con exito rotundo.');
        this.router.navigate(['/home/header/config']);
      },
      error: () => {
        alert('Fallo estrepitoso al actualizar las eevoluciones  por defecto');
      }
    });
  }
}
