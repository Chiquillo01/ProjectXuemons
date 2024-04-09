import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, public tokenService: TokenService) { }

  // Funciones de logear, registrarse y salir de la sesión //
  Login(user: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/login', user);
  }
  Registrar(user: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/register', user);
  }
}
