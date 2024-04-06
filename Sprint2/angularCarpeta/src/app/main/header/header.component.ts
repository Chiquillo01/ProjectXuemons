import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
// Imports de los servicios //
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
    private router: Router,
    public tokenService: TokenService
  ) {
    this.userRole = this.tokenService ? this.tokenService.getRole() : null;
  }
}
