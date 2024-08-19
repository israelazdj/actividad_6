import { inject, Injectable } from '@angular/core';
import { Objeto, User } from '../interfaces/objeto.interface';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, map, Observable, of } from 'rxjs';
import { SweetAlertIcon } from 'sweetalert2';

type Response = { msg:string, title:string, icon:SweetAlertIcon}

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

  getAll(page:number = 1):Observable<Objeto>{
    return this.http.get<Objeto>(`${this.baseurl}?page=${page}`)
  }
  
  getById(id:string): Observable<User>{
    return this.http.get<User>(`${this.baseurl}${id}`)  
  }

    update(body:User): Observable<User> {
      let id = body._id;
      //esto sirve para eliminar de un objeto una clave con su valor    
      return this.http.put<User>(`${this.baseurl}${id}`, body)      
    }

  insert(body:User): Observable<User>{
    return this.http.post<User>(this.baseurl,body)
  }
    //delete
  delete(id:string): Observable<User>{
    return this.http.delete<User>(`${this.baseurl}${id}`)
    
  }

}
