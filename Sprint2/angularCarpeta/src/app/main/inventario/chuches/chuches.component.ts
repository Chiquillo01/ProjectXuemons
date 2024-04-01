// import { Component } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Imports de los modelos necesarios //
import { Chuches } from '../../../models/chuches/chuches.model';

// Imports de los servicios //
import { UsersService } from '../../../services/users.service';
import { ChuchesService } from '../../../services/chuches.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-chuches',
  templateUrl: './chuches.component.html',
  styleUrls: ['./chuches.component.css'],
})
export class ChuchesComponent implements OnInit{
  Chuches: Chuches[] = [];
  ChuchesUser: Chuches[] = [];
  // Variables para saber si el usuario tiene al xuxemon y para saber el rol del usuario //
  ChuchesView: boolean = false;
  userRole: Number | null;
  constructor(
    public userService: UsersService,
    public ChuchesService: ChuchesService,
    private router: Router,
    public tokenService: TokenService
  ) {
    this.userRole = this.tokenService ? this.tokenService.getRole() : null;
  }

  //preguntar al valentin
  ngOnInit(): void {
    this.updateChuches();
    this.getChuches();
  }

  updateChuches() {
    this.ChuchesService.getAllChuchesUser().subscribe({
      next: (value: any) => {
        this.ChuchesUser = value[0];
      },
      error: (error) => {
        console.error('Error fetching Chuches:', error);
      },
    });
  }

  getChuches() {
    this.ChuchesService.getAllChuches().subscribe({
      next: (value: any) => {
        this.Chuches = value[0];
      },
      error: (error) => {
        console.error('Error fetching Xuxemons:', error);
      },
    });
  }

  // Función para el botón de debug //
  debug() {
    console.log(this.Chuches.length)
    const randomIndex = Math.floor(Math.random() * this.Chuches.length);
    const randomChuches = this.Chuches[randomIndex];
    // const reference = TokenService;
    // const token = TokenService.getToken();
    // console.log(token);

    const chuchesData = {
      nombre: randomChuches.nombre,
      modificador: randomChuches.modificador,
      dinero: randomChuches.dinero,
      archivo: randomChuches.archivo,
      idUser: 1,
    };

    this.ChuchesService.createChuchesAleatorios(chuchesData).subscribe({
      next: () => {
        alert('Chuches creado aleatoriamente con éxito');
        window.location.reload();
      },
      error: (error) => {
        console.error('Error al crear la Chuches:', error);
        console.error(chuchesData);
        alert('Ocurrió un error al crear la Chuche aleatoria');
      },
    });
  }
}
