import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IAuth } from '../interfaces/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api: string = environment.apiUrl;
  private _auth!: IAuth;

  private options = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  };

  get auth(): IAuth {
    return { ...this._auth };
  }

  constructor( private http: HttpClient ) { }

  login( email: string, password: string ) {
    let loginInfo = {
      email: email,
      password: password
    };

    return this.http.post<IAuth>( `${this.api}/login`, loginInfo, this.options )
      .pipe(
        tap( auth => {
          localStorage.setItem('token', auth.token);
          if ( auth.ok ) {
            this._auth = auth;
            console.log(this._auth);
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );
  }

  validateToken(): Observable<boolean> {
    const headers = new HttpHeaders().set(
      'x-token', localStorage.getItem('token') || ''
    );

    return this.http.get<IAuth>( `${this.api}/login/renew`, { headers })
      .pipe(
        map( auth => {
          localStorage.setItem('token', auth.token);
          if ( auth.ok ) {
            console.log('se ejecuto')
            this._auth = auth
          }

          return auth.ok;
        }),
        catchError( err => of(false) )
      );
  }

  logout() {
    localStorage.clear();
  }
}
