import { inject, Injectable } from '@angular/core';
import { Objeto, User } from '../interfaces/objeto.interface';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor() { }

  private baseurl: string = "https://peticiones.online/api/users/";

  private arrusers: User[] = []

  private http = inject(HttpClient)

  /**
   * GETALL()
   * return Observable<Objeto>
   * 
   *  */

  getAll():Observable<Objeto>{
    return this.http.get<Objeto>(this.baseurl)
  }

  /* getAlll():Promise<Objeto>{
    return this.http.get<Objeto>(this.baseurl)
  } */
  
  getById(id:string): Observable<User>{

    return this.http.get<User>(`${this.baseurl}${id}`)
  
  }

  update(body:User): Observable<User>{
    let id = body._id;
    //esto sirve para eliminar de un objeto una clave con su valor    
    return this.http.put<User>(`${this.baseurl}${id}`, body)
    
  }

  insert(body:User): Observable<User>{
    return this.http.post<User>(this.baseurl,body)
  }


}
