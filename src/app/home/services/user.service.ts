import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IAuth } from 'src/app/auth/interfaces/auth.model';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
  })
  export class UserService {

    private api: string = environment.apiUrl;

    constructor( private http: HttpClient ) { }

    getAllUsers(): Observable<IAuth[]> {
        const headers = new HttpHeaders().set(
            'x-token', localStorage.getItem('token') || ''
        );

        return this.http.get<IAuth[]>(`${this.api}/users`, {headers});
    }

    addUser( newUser:IAuth ) {
      const headers = new HttpHeaders().set(
        'x-token', localStorage.getItem('token') || ''
      );

      return this.http.post(`${this.api}/users`, newUser, {headers});
    }

    deleteUser( id: number ) {
      const headers = new HttpHeaders().set(
        'x-token', localStorage.getItem('token') || ''
      );

      return this.http.delete(`${this.api}/users/${id}`, {headers});
    }

  }