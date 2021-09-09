import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IAccount } from '../interfaces/account.model';


@Injectable({
    providedIn: 'root'
  })
  export class AccountService {

    private api: string = environment.apiUrl;

    constructor( private http: HttpClient ) { }

    getAllAccounts(): Observable<IAccount[]> {

        const headers = new HttpHeaders().set(
            'x-token', localStorage.getItem('token') || ''
        );

        return this.http.get<IAccount[]>(`${this.api}/accounts`, {headers});
    }

  }