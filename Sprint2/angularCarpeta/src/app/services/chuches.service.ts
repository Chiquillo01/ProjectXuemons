import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chuches } from '../models/chuches/chuches.model';
import { ChuchesUser } from '../models/chuches/chuchesUser.model';

@Injectable({
  providedIn: 'root',
})
export class ChuchesService {
  constructor(private http: HttpClient, public tokenService: TokenService) {}

  getAllChuches(): Observable<Chuches[]> {
    // Realizar la solicitud HTTP GET para obtener todos los Xuxemons
    return this.http.get<Chuches[]>('http://127.0.0.1:8000/api/chuches/');
  }

  getAllChuchesUser(): Observable<ChuchesUser[]> {
    // Realizar la solicitud HTTP GET para obtener todos los Xuxemons
    return this.http.get<ChuchesUser[]>(
      'http://127.0.0.1:8000/api/chuchesUser/'
    );
  }

  // Método para crear un nuevo xuxemon //
  createChuchesAleatorios(chuchesData: any): Observable<any> {
    return this.http.post<any>(
      'http://127.0.0.1:8000/api/chuches/random/',
      chuchesData
    );
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
