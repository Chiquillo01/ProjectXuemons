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
  constructor(private http: HttpClient, public tokenService: TokenService) {}

  getAllXuxemons(): Observable<Xuxemons[]> {
    // Realizar la solicitud HTTP GET para obtener todos los Xuxemons
    return this.http.get<Xuxemons[]>('http://127.0.0.1:8000/api/xuxemons/');
  }

  getAllXuxemonsUser(): Observable<XuxemonsUsers[]> {
    // Realizar la solicitud HTTP GET para obtener todos los Xuxemons
    return this.http.get<XuxemonsUsers[]>('http://127.0.0.1:8000/api/xuxemonsUser/');
  }

  // Método para crear un nuevo xuxemon //
  createXuxemon(xuxemonData: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/xuxemons/', xuxemonData);
  }

  // Función para eliminar xuxemons de la bd //
  XuxeDelete(id: any): Observable<any> {
    // Token de sesion //
    const authToken = this.tokenService.getToken();

    // Header con el token //
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    // Peticion //
    return this.http.delete(`http://127.0.0.1:8000/api/xuxemons/${id}`, {
      headers,
    });
  }

  // Función para actualizar datos del Xuxemon //
  XuxeUpdate(card: any, id: any): Observable<any> {
    card.tamano = parseInt(card.tamano);
    card.evo1 = parseInt(card.evo1);
    card.evo2 = parseInt(card.evo2);
    console.log('Datos del Xuxemon a actualizar:', card);
    // Token de sesion //
    const authToken = this.tokenService.getToken();
    // Header con el token //
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    // Peticion con headers de actualizacion //
    return this.http.put(`http://127.0.0.1:8000/api/xuxemons/${id}`, card, {
      headers,
    });
  }

  // Método para crear un nuevo xuxemon //
  createXuxemonAleatorios(xuxemonData: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/xuxemons/users/random/', xuxemonData);
  }

  // Función para actualizar datos del Xuxemon //
  XuxeComer(card: any, id: any): Observable<any> {
    console.log('Datos del Xuxemon a actualizar la comida:', card);
    // Token de sesion //
    const authToken = this.tokenService.getToken();
    // Header con el token //
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    // Peticion con headers de actualizacion //
    return this.http.put(`http://127.0.0.1:8000/api/xuxemons/users/comer/${id}`, card, {
      headers,
    });
  }

  // Función para actualizar tamaño del Xuxemon //
  XuxeConfig(tamano: any, id: any): Observable<any> {
    // Token de sesion //
    const authToken = this.tokenService.getToken();
    // Header con el token //
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    // Peticion con headers de actualizacion //
    return this.http.put(`http://127.0.0.1:8000/api/xuxemons/${id}`, tamano, {
      headers,
    });
  }

  // Función para actualizar tamaño del Xuxemon //
  ChuchesConfig(evos: any, id: any): Observable<any> {
    // Token de sesion //
    const authToken = this.tokenService.getToken();
    // Header con el token //
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    // Peticion con headers de actualizacion //
    return this.http.put(`http://127.0.0.1:8000/api/xuxemons/${id}`, evos, {
      headers,
    });
  }
}