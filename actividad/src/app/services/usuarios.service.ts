import { inject, Injectable } from '@angular/core';
import { Objeto, User } from '../interfaces/objeto.interface';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor() { }

  baseurl: string = "https://peticiones.online/api/users";

  private arrusers: User[] = []

  http = inject(HttpClient)

  getAll():Observable<Objeto>{
    return this.http.get<Objeto>(this.baseurl)
  }
  
  /* getById(id:string): Observable<User[]>{

    return firstValueFrom
    (this.http.get<User[]>(`${this.baseurl}${id}`))
  
  } */
}
