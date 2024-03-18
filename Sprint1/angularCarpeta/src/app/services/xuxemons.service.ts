import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class XuxemonsService {
  constructor(private http: HttpClient, public tokenService: TokenService) {}
}
