import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chuches } from '../models/chuches/chuches.model';  

@Injectable({
  providedIn: 'root',
})
export class ChuchesService {
  constructor(private http: HttpClient, public tokenService: TokenService) {}

  getAllChuches(): Observable<Chuches[]> {
    // Realizar la solicitud HTTP GET para obtener todos los Xuxemons
    return this.http.get<Chuches[]>('http://127.0.0.1:8000/api/chuches/');
  }

  // Método para crear un nuevo xuxemon //
  createChuchesAleatorios(chuchesData: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/chuches/random/', chuchesData);
  }
}
