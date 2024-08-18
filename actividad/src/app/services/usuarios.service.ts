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
  /* getAll(page:number):Observable<Objeto>{
    return this.http.get<Objeto>(`${this.baseurl}?page=${page}`)
  } */


  
  /* getAlll():Promise<Objeto>{
    return this.http.get<Objeto>(this.baseurl)
  } */
  
  getById(id:string): Observable<User>{

    return this.http.get<User>(`${this.baseurl}${id}`)
  
  }

  /* update(body:User): Observable<User>{
    let id = body._id;
    //esto sirve para eliminar de un objeto una clave con su valor    
    return this.http.put<User>(`${this.baseurl}${id}`, body)
    
  } */

    update(body:User): Observable<User> {
      let id = body._id;
      //esto sirve para eliminar de un objeto una clave con su valor    
      return this.http.put<User>(`${this.baseurl}${id}`, body)
      
    }

  insert(body:User): Observable<User>{
    return this.http.post<User>(this.baseurl,body)
  }

 /*  duplicado(body: User): Response {
    let posicion = this.http.get<Response>(`${this.baseurl}${body}`)
    console.log(posicion)
    if(posicion){
      this.http.post(this.baseurl,body)
      return {msg: "Usuario registrado correctamente", title: "Felicidades!!", icon:'success'}
    }
    else{
      return {msg: "usuario duplicado", title: "Error!!", icon:'error'}
    }    //tenemos que comprobar que el usuario no esta duplicado.
    
  } */

    /* insert(body:User):Observable<User> {
      
      let posicion = this.arrusers.find(myuser => myuser.email === body.email)
      console.log(posicion._id)
      return this.http.post<User>(this.baseurl,body)
      
    } */
    /*   
    return {
     {  = this.http.post<User>(this.baseurl,body)}
      Response: {msg: "Usuario registrado correctamente", title: "Felicidades!!", icon:'success'}
    }
    //let posicion = this.arrusers.findIndex(myuser => myuser.email === body.email)
  } */
/* 
  if(this.arrusers.findIndex(myuser => myuser.email === body.email)){
    return this.http.post<User>(this.baseurl,body).pipe(map((user:User)=>{
      return {
        user,
        Response: {msg: "Usuario registrado correctamente", title: "Felicidades!!", icon:'success'}
      }
    }))
  }
  else{
    return of({
      Response: {msg: "Error", title: "No se ha podido registrar correctamente", icon:'error'}
    })
      }
    }
 */

    //delete
  delete(id:string): Observable<User>{
    return this.http.delete<User>(`${this.baseurl}${id}`)
    
  }

}
