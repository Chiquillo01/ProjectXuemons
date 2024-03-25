import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Imports de los servicios //
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegisterComponent implements OnInit{
  // Valores y validadores del formulario //
  RegisterForm: FormGroup = new FormGroup({
    nick: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    password_confirmation: new FormControl('', [Validators.required]),
    rol: new FormControl(false)
  });
  constructor(public userService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  Registrar() {
    // Comprueba que sean la misma contraseña //
    if (this.RegisterForm.value.contraseña === this.RegisterForm.value.RepetirContraseña) {
      this.userService.Registrar(this.RegisterForm.value).subscribe(
        (data) => {
          // Si esta todo correcto dirige al login //
          this.router.navigate(['/login']);
          alert('Usuario registrado correctamente.');
        },
        (error) => {
          // Si algo falla envia error //
          alert('No se pudo registrar el usuario correctamente');
          throw new Error(error);
        }
      );
    } else {
      // Si las contraseñas son distintas //
      alert("Las contraseñas no coinciden");
    }
  }
}
