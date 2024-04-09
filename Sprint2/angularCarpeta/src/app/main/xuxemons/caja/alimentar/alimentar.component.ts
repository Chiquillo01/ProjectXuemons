import { Component } from '@angular/core';
// imports extras //
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { XuxemonsService } from 'src/app/services/xuxemons.service';
import { TokenService } from '../../../../services/token.service';
import { ChuchesService } from '../../../../services/chuches.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alimentar',
  templateUrl: './alimentar.component.html',
  styleUrls: ['./alimentar.component.css']
})
export class AlimentarComponent {
  alimentForm: FormGroup;
  xuxeData: any;
  chuchesList: any[] = [];

  constructor(
    private fb: FormBuilder,
    public xuxemonsService: XuxemonsService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private chuchesService: ChuchesService
  ) {
    this.alimentForm = this.fb.group({
      chucheSeleccionada: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getChuches()

    this.route.queryParams.subscribe((params) => {
      this.xuxeData = {
        id: params['id'],
        nombre: params['nombre'],
        archivo: params['archivo'],
        tamano: params['tamano'],
      };
    });
  }

  /**
   * Nombre: alimentarXuxemon
   * Función: para editar el Xuxemon
   */
  alimentarXuxemon() {
    this.xuxemonsService
      .alimentar(this.xuxeData.id, this.alimentForm.value)
      .subscribe({
        next: (request) => {
          console.log(request)
          alert('Xuxemon modificado con exito.');
        },
        error: (error) => {
          console.log(error);
          alert('No se pudo editar el Xuxemon');
          throw new Error(error);
        },
      });
  }

  /**
   * Nombre: getChuches
   * Función: obtiene todas las chuches que son del usuario que esta en sessión
   */
  getChuches() {
    const userId = this.tokenService.getRole();

    if (userId !== null) {
      this.chuchesService.getAllChuchesUser(userId).subscribe({
        next: (chuchesUser: any) => {
          this.chuchesList = chuchesUser[0];
        },
        error: (error) => {
          console.error('Error fetching Xuxemons:', error);
        },
      });
    } else {
      console.error('User ID is null');
    }
  }

  getImageStyle(tamano: string): any {
    let width: number;
    const paqueno = 50;
    const mediano = 100;
    const grande = 150;

    switch (tamano) {
      case 'pequeno': width = paqueno; break;
      case 'mediano': width = mediano; break;
      case 'grande': width = grande; break;
      default: width = grande; break;
    }
    return {
      'width.px': width,
    };
  }

}
