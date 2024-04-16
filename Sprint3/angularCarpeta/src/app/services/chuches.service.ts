import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChuchesUser } from '../models/chuches/chuchesUser.model';
import { Horario } from '../models/horario/horario.model';

@Injectable({
  providedIn: 'root',
})
export class ChuchesService {
  constructor(private http: HttpClient, public tokenService: TokenService) {}

  /**
   * Nombre: getAllChuchesUser
   * Función: Obtener todas las chuches que tiene un usuario
   * @returns la url de la api
   */
  getAllChuchesUser(userToken: string): Observable<ChuchesUser[]> {
    return this.http.get<ChuchesUser[]>(
      `http://127.0.0.1:8000/api/chuchesUser/${userToken}`
    );
  }

  /**
   * Nombre: getHorario
   * Función: Obtener todas las chuches que tiene un usuario
   * @returns la url de la api
   */
  activarHorario(userToken: string): Observable<Horario[]> {
    const authToken = this.tokenService.getToken();
    const headers = {
      headers: { Authorization: `Bearer ${authToken}` },
    };

    return this.http.put<Horario[]>(
      `http://127.0.0.1:8000/api/activar/horario/${userToken}`,
      headers
    );
  }

  /**
   * Nombre: getHorario
   * Función: Obtener todas las chuches que tiene un usuario
   * @returns la url de la api
   */
  getHorario(userToken: string): Observable<Horario[]> {
    return this.http.get<Horario[]>(
      `http://127.0.0.1:8000/api/horario/show/${userToken}`
    );
  }

  /**
   * Nombre: createChuchesAleatorios
   * Función: Crear una nueva chuche para el usuario que esta la sesión
   * @returns la url de la api
   */
  createChuchesAleatorios(userToken: string): Observable<any> {
    const authToken = this.tokenService.getToken();
    const headers = {
      headers: { Authorization: `Bearer ${authToken}` },
    };

    return this.http.post<any>(
      `http://127.0.0.1:8000/api/chuches/random/${userToken}`,
      headers
    );
  }

  horario(userToken: string): Observable<any> {
    const authToken = this.tokenService.getToken();
    const headers = {
      headers: { Authorization: `Bearer ${authToken}` },
    };

    return this.http.post<any>(
      `http://127.0.0.1:8000/api/chuches/horario/${userToken}`,
      headers
    );
  }

  chucheUpdate(stack: any, id: any): Observable<any> {
    // Token de sesion //
    const authToken = this.tokenService.getToken();
    // Header con el token //
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    // Peticion con headers de actualizacion //
    return this.http.put(
      `http://127.0.0.1:8000/api/chuches/${id.id}`,
      { stack: stack.stack },
      {
        headers,
      }
    );
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
