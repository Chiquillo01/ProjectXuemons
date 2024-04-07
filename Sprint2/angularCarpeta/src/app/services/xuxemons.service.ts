import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Xuxemons } from '../models/xuxedex/xuxedex.model';
import { XuxemonsUsers } from '../models/xuxemons/xuxemons.model';

@Injectable({
  providedIn: 'root',
})
export class XuxemonsService {
  constructor(private http: HttpClient, public tokenService: TokenService) { }

  /**
   * Nombre: getAllXuxemons
   * Función: Realizar la solicitud HTTP GET para obtener todos los Xuxemons
   * @returns la url de la api
   */
  getAllXuxemons(): Observable<Xuxemons[]> {
    return this.http.get<Xuxemons[]>('http://127.0.0.1:8000/api/xuxemons/');
  }

  /**
   * Nombre: getAllXuxemonsUser
   * Función: Obtener todos los Xuxemons que tiene un usuario
   * @returns la url de la api
   */
  getAllXuxemonsUser(userId: number): Observable<XuxemonsUsers[]> {
    return this.http.get<XuxemonsUsers[]>(`http://127.0.0.1:8000/api/xuxemonsUser/${userId}`);
  }

  /**
   * Nombre: createXuxemon
   * Función: Crear un nuevo xuxemon
   * @returns la url de la api
   */
  createXuxemon(xuxemonData: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/xuxemons/', xuxemonData);
  }

  /**
   * Nombre: createRandomXuxemon
   * Función: Crear un nuevo xuxemon al pc del usuario que esta la sesión
   * @returns la url de la api
   */
  createRandomXuxemon(userId: number): Observable<any> {
    const authToken = this.tokenService.getToken();
    const headers = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    return this.http.post<any>(`http://127.0.0.1:8000/api/xuxemons/pc/random/${userId}`, headers);
  }

  /**
   * Nombre: XuxeDelete
   * Función: Función para eliminar un xuxemon de la bd
   * @returns la url de la api
   */
  XuxeDelete(id: any): Observable<any> {
    const authToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.delete(`http://127.0.0.1:8000/api/xuxemons/${id}`, {
      headers,
    });
  }

  /**
   * Nombre: XuxeUpdate
   * Función: Función para actualizar datos del Xuxemon
   * @returns la url de la api
   */
  XuxeUpdate(card: any, id: any): Observable<any> {
    // card.tamano = parseInt(card.tamano);
    // card.evo1 = parseInt(card.evo1);
    // card.evo2 = parseInt(card.evo2);
    console.log('Datos del Xuxemon a actualizar:', card);
    const authToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.put(`http://127.0.0.1:8000/api/xuxemons/${id}`, card, {
      headers,
    });
  }

  // // Función para actualizar datos del Xuxemon //
  // XuxeUserUpdate(card: any, id: any): Observable<any> {
  //   // card.tamano = parseInt(card.tamano);
  //   // card.evo1 = parseInt(card.evo1);
  //   // card.evo2 = parseInt(card.evo2);
  //   console.log('Datos del Xuxemon a actualizar:', card);
  //   // Token de sesion //
  //   const authToken = this.tokenService.getToken();
  //   // Header con el token //
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${authToken}`,
  //   });
  //   // Peticion con headers de actualizacion //
  //   return this.http.put(`http://127.0.0.1:8000/api/xuxemons_users/${id}`, card, {
  //     headers,
  //   });
  // }

  // // Función para actualizar datos del Xuxemon //
  // XuxeComer(card: any, id: any): Observable<any> {
  //   console.log('Datos del Xuxemon a actualizar la comida:', card);
  //   // Token de sesion //
  //   const authToken = this.tokenService.getToken();
  //   // Header con el token //
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${authToken}`,
  //   });
  //   // Peticion con headers de actualizacion //
  //   return this.http.put(`http://127.0.0.1:8000/api/xuxemons/users/comer/${id}`, card, {
  //     headers,
  //   });
  // }

  // // Función para actualizar tamaño del Xuxemon //
  // XuxeConfig(tamano: any, id: any): Observable<any> {
  //   // Token de sesion //
  //   const authToken = this.tokenService.getToken();
  //   // Header con el token //
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${authToken}`,
  //   });
  //   // Peticion con headers de actualizacion //
  //   return this.http.put(`http://127.0.0.1:8000/api/xuxemons/${id}`, tamano, {
  //     headers,
  //   });
  // }

  // // Función para actualizar tamaño del Xuxemon //
  // ChuchesConfig(evos: any, id: any): Observable<any> {
  //   // Token de sesion //
  //   const authToken = this.tokenService.getToken();
  //   // Header con el token //
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${authToken}`,
  //   });
  //   // Peticion con headers de actualizacion //
  //   return this.http.put(`http://127.0.0.1:8000/api/xuxemons/${id}`, evos, {
  //     headers,
  //   });
  // }
}