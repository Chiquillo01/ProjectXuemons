import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// Imports de los servicios //
import { UsersService } from '../services/users.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Valores y validadores del formulario //
  LoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    public usersService: UsersService,
    public tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Función que al iniciar de forma correcta enviara al usuario a su menu //
  Login() {
    this.usersService.Login(this.LoginForm.value).subscribe({
      next: (data: any) => {
        this.router.navigate(['/home']);
        const token = data.access_token;
        this.tokenService.setToken(data);
        //alert('Sesion iniciada correctamente.');
      },
      error: (error) => {
        // Si algo falla estra aqui //
        alert('Correo electrónico o contraseña erroneos');
        throw new Error(error);
      },
    });
  }
}
