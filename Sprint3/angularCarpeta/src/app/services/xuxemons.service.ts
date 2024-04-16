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
  getAllXuxemonsUser(userToken: string): Observable<XuxemonsUsers[]> {
    return this.http.get<XuxemonsUsers[]>(
      `http://127.0.0.1:8000/api/xuxemonsUser/${userToken}`
    );
  }

  /**
   * Nombre: getAllXuxemonsUser
   * Función: Obtener todos los Xuxemons activos que tiene un usuario
   * @returns la url de la api
   */
  getAllXuxemonsUserActivos(userToken: string): Observable<XuxemonsUsers[]> {
    // const body={
    //   'userToken': userToken
    // }
    return this.http.get<XuxemonsUsers[]>(
      `http://127.0.0.1:8000/api/xuxemonsUserActivos/${userToken}`
    );
  }

  /**
   * Nombre: createXuxemon
   * Función: Crear un nuevo xuxemon
   * @returns la url de la api
   */
  createXuxemon(xuxemonData: any): Observable<any> {
    return this.http.post<any>(
      'http://127.0.0.1:8000/api/xuxemons/',
      xuxemonData
    );
  }

  /**
   * Nombre: createRandomXuxemon
   * Función: Crear un nuevo xuxemon al pc del usuario que esta la sesión
   * @returns la url de la api
   */
  createRandomXuxemon(userToken: string): Observable<any> {
    const authToken = this.tokenService.getToken();
    const headers = {
      headers: { Authorization: `Bearer ${authToken}` },
    };

    return this.http.post<any>(
      `http://127.0.0.1:8000/api/xuxemons/pc/random/${userToken}`,
      headers
    );
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
    const authToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.put(`http://127.0.0.1:8000/api/xuxemons/${id}`, card, {
      headers,
    });
  }

  /**
   * Nombre: XuxeUpdate
   * Función: Función para actualizar el tamaño por defecto del juego
   * @returns la url de la api
   */
  confTamDef(tamano: any): Observable<any> {
    const authToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.put(
      `http://127.0.0.1:8000/api/xuxemons/tamano/${tamano.tamano}`,
      {
        headers,
      }
    );
  }

  /**
   * Nombre: XuxeUpdate
   * Función: Función para actualizar el nivel evolutivo por defecto del juego
   * @returns la url de la api
   */
  confEvo(evo: any): Observable<any> {
    const authToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.put(
      `http://127.0.0.1:8000/api/xuxemons/evos/${evo.evo1}`,
      {
        headers,
      }
    );
  }

  /**
   * Nombre: XuxeUpdate
   * Función: Función para actualizar el nivel evolutivo por defecto del juego
   * @returns la url de la api
   */
  confEvo2(evo: any): Observable<any> {
    const authToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.put(
      `http://127.0.0.1:8000/api/xuxemons/evos2/${evo.evo2}`,
      {
        headers,
      }
    );
  }

  /**
   * Nombre: alimentar
   * Función: Función para actualizar el nivel evolutivo por defecto del juego
   * @returns la url de la api
   */
  alimentar(xuxemon_id: number, chuche_id: number): Observable<any> {
    const userToken = this.tokenService.getToken();
    const authToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.put(
      `http://127.0.0.1:8000/api/xuxemons/${xuxemon_id}/alimentar/${chuche_id}/user/${userToken}`,
      {},
      {
        headers,
      }
    );
  }


  /**
   * Nombre: xuxemonActivo
   * Función: Función para actualizar el nivel evolutivo por defecto del juego
   * @returns la url de la api
   */
  xuxemonActivo(userToken: string, xuxemon_id: number): Observable<any> {
    const authToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.post<any>(
      `http://127.0.0.1:8000/api/xuxemons/${userToken}/activo/${xuxemon_id}`,
      headers
    );
  }


    /**
   * Nombre: xuxemonActivo
   * Función: Función para actualizar el nivel evolutivo por defecto del juego
   * @returns la url de la api
   */
    xuxemonFav(userToken: string, xuxemon_id: number): Observable<any> {
      const authToken = this.tokenService.getToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      });
  
      return this.http.post<any>(
        `http://127.0.0.1:8000/api/xuxemons/${userToken}/favorito/${xuxemon_id}`,
        headers
      );
    }

  /**
   * Nombre: xuxemonActivo
   * Función: Función para actualizar el nivel evolutivo por defecto del juego
   * @returns la url de la api
   */
  evolucionarXuxemon(xuxemonId: number, cumpleEvo1: boolean): Observable<any> {
    const userToken = this.tokenService.getRole();
    const authToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.put(
      `http://127.0.0.1:8000/api/xuxemons/${userToken}/evolucionar/${xuxemonId}`,
      { cumpleEvo1, headers }
    );
  }
  evolucionarXuxemon2(xuxemonId: number, cumpleEvo2: boolean): Observable<any> {
    const userToken = this.tokenService.getRole();
    const authToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.put(
      `http://127.0.0.1:8000/api/xuxemons/${userToken}/evolucionar2/${xuxemonId}`,
      { cumpleEvo2, headers }
    );
  }
}
