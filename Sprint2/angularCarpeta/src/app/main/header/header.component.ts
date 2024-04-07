import { Component } from '@angular/core';
// Imports extras //
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { XuxemonsService } from 'src/app/services/xuxemons.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userRole: Number | null;

  constructor(
    public userService: UsersService,
    public xuxemonsService: XuxemonsService,
    public tokenService: TokenService,
    private router: Router
  ) {
    this.userRole = this.tokenService ? this.tokenService.getRole() : null;
  }

  logout() {
    // Elimina el token de autenticación y el rol del usuario del localStorage
    this.tokenService.removeToken();
    this.tokenService.removeRole();

    // Redirige a la página de inicio de sesión
    this.router.navigate(['/landingPage']);
  }
}
