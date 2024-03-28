import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  static getToken() {
    throw new Error('Method not implemented.');
  }
  // static getToken: any;
  constructor() {}

  private readonly TOKEN_KEY = 'auth_token';

  // Recoje el token de la bd //
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || 'default';
  }
  // Recoje el rol de la bd //
  getRole(): number | null {
    return parseInt(localStorage.getItem('userRole') || '1');
  }

  // Setea el token y el rol //
  setToken(token: any): void {
    localStorage.setItem(this.TOKEN_KEY, token.access_token);
    localStorage.setItem('userRole', token.rol);
  }

  // Funciones para eliminar el token y el rol //
  removeToken(): boolean {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }
  removeRole(): boolean {
    try {
      localStorage.removeItem('userRole');
      return true;
    } catch (error) {
      return false;
    }
  }
  
  // recargarPagina(router): void {
  //   router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     router.navigate([router.url]);
  //   });
  // }

}
