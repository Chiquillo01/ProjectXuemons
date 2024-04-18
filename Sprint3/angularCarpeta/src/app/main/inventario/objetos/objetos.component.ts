import { Component, OnInit } from '@angular/core';
// Imports extras //
import { TokenService } from '../../../services/token.service';
import { ChuchesService } from '../../../services/chuches.service';
import { ChuchesUser } from '../../../models/chuches/chuchesUser.model';
import { Horario } from '../../../models/horario/horario.model';

@Component({
  selector: 'app-objetos',
  templateUrl: './objetos.component.html',
  styleUrls: ['./objetos.component.css'],
})
export class ObjetosComponent implements OnInit {
  chucheUser: ChuchesUser[] = [];
  horario: Horario[] = [];
  userRol!: number;

  constructor(
    private tokenService: TokenService,
    private chuchesService: ChuchesService
  ) {}

  ngOnInit(): void {
    this.userRol = this.tokenService.getRole()!;
    this.getChuches();  
  }

    /**
   * Nombre: getChuches
   * Función: obtiene todas las chuches que son del usuario que esta en sessión
   */
    getChuches() {
      const userToken = this.tokenService.getToken();
      console.log('userToken getChuches: ' + userToken);
  
      if (userToken !== null) {
        this.chuchesService.getAllChuchesUser(userToken).subscribe({
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
}
