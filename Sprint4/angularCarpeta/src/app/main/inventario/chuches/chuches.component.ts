import { Component, OnInit } from '@angular/core';
// Imports extras //
import { TokenService } from '../../../services/token.service';
import { ChuchesService } from '../../../services/chuches.service';
import { ChuchesUser } from '../../../models/chuches/chuchesUser.model';

@Component({
  selector: 'app-chuches',
  templateUrl: './chuches.component.html',
  styleUrls: ['./chuches.component.css'],
})
export class ChuchesComponent implements OnInit {
  chucheUser: ChuchesUser[] = [];

  constructor(
    private tokenService: TokenService,
    private chuchesService: ChuchesService
  ) { }

  ngOnInit(): void {
    this.getChuches()
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
          this.chucheUser = chuchesUser[0];
        },
        error: (error) => {
          console.error('Error fetching Xuxemons:', error);
        },
      });
    } else {
      console.error('User ID is null');
    }
  }

  /**
   * Nombre: debug
   * Función: crea aleatoriamente una chuche pasandole el id del usuario de la sesión habierta.
   * Despues actualizara la lista de chuches del Usuario
   */
  debug(): void {
    const userId = this.tokenService.getRole();

    this.chuchesService.createChuchesAleatorios(userId!).subscribe({
      next: () => {
        this.getChuches();
      },
      error: (error) => {
        alert('Chuche fallida.');
      }
    });
  }
}
