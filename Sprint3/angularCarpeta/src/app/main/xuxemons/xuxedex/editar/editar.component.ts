import { Component } from '@angular/core';
// imports extras //
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { XuxemonsService } from 'src/app/services/xuxemons.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule],
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
        archivo: params['archivo'],
      };
    });

    // Seteamos los valores //
    this.xuxemonForm.setValue({
      nombre: this.xuxeData.nombre || '',
      tipo: this.xuxeData.tipo || '',
      archivo: this.xuxeData.archivo || '',
    });
  }

  constructor(
    private fb: FormBuilder,
    public xuxemonsService: XuxemonsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Restricciones que se espera que tenga el FormGroup //
    this.xuxemonForm = this.fb.group({
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      archivo: ['', [Validators.required]],
    });
  }

  /**
   * Nombre: editarXuxemon
   * Función: para editar el Xuxemon
   */
  editarXuxemon() {
    this.xuxemonsService
      .XuxeUpdate(this.xuxemonForm.value, this.xuxeData.id)
      .subscribe({
        next: () => {
          alert('Xuxemon modificado con exito.');
          this.router.navigate(['home/home/xuxemons/xuxedex']);
        },
        error: (error) => {
          console.log(error);
          alert('No se pudo editar el Xuxemon');
          throw new Error(error);
        },
      });
  }
}
