import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChuchesUser } from '../models/chuches/chuchesUser.model';

@Injectable({
  providedIn: 'root',
})
export class ChuchesService {
  constructor(private http: HttpClient, public tokenService: TokenService) { }

  /**
   * Nombre: getAllChuchesUser
   * Función: Obtener todas las chuches que tiene un usuario
   * @returns la url de la api
   */
  getAllChuchesUser(userId: number): Observable<ChuchesUser[]> {
    return this.http.get<ChuchesUser[]>(
      `http://127.0.0.1:8000/api/chuchesUser/${userId}`
    );
  }

  /**
   * Nombre: createChuchesAleatorios
   * Función: Crear una nueva chuche para el usuario que esta la sesión
   * @returns la url de la api
   */
  createChuchesAleatorios(userId: number): Observable<any> {
    const authToken = this.tokenService.getToken();
    const headers = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    
    return this.http.post<any>(`http://127.0.0.1:8000/api/chuches/random/${userId}`, headers);
  }

  // // Función para editar la chuche //
  // chucheUpdate(card: any, id: any): Observable<any> {
  //   // Token de sesion //
  //   const authToken = this.tokenService.getToken();
  //   // Header con el token //
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${authToken}`,
  //   });
  //   // Peticion con headers de actualizacion //
  //   return this.http.put(`http://127.0.0.1:8000/api/chuches/${id}`, card.stack, {
  //     headers,
  //   });
  // }

  chucheUpdate(stack: any, id: any): Observable<any> {
    // Token de sesion //
    const authToken = this.tokenService.getToken();
    // Header con el token //
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    // Peticion con headers de actualizacion //
    return this.http.put(`http://127.0.0.1:8000/api/chuches/${id.id}`, { stack: stack.stack }, {
      headers,
    });
  }

  // chucheUpdate(stack: number, id: any): Observable<any> {
  //   // Token de sesion //
  //   const authToken = this.tokenService.getToken();
  //   // Header con el token //
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${authToken}`,
  //   });
  //   // Peticion con headers de actualizacion //
  //   return this.http.put(`http://127.0.0.1:8000/api/chuches/${id}`, { stack: stack }, {
  //     headers,
  //   });
  // }

}
