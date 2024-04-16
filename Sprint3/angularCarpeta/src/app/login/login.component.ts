import { Component, OnInit } from '@angular/core';
// Imports necesarios //
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Valores que espera y validadores de estos que espera del formulario //
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    public usersService: UsersService,
    public tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Función: Login
   * Explicación: Manda los datos recogidos por el 
   * formulario al servicio del usuario
   */
  Login() {
    this.usersService.Login(this.loginForm.value).subscribe({
      next: (data: any) => {
        this.router.navigate(['/home/home']);
        const token = data.access_token;
        console.log(data);
        this.tokenService.setToken(data);
      },
      error: (error) => {
        alert('Correo electrónico o contraseña erroneos');
        throw new Error(error);
      },
    });
  }
}
