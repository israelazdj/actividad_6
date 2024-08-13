import { Component, inject, Input } from '@angular/core';
import { Objeto, User } from '../../interfaces/objeto.interface';
import { UserviewComponent } from "../userview/userview.component";
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserviewComponent,RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  //@Input() listausuarios: User[] = []

  userServices = inject(UsuariosService);
  arruser: User[] = []

  async ngOnInit(){
    try{
      //observable devuelve los usuarios
     this.userServices.getAll().subscribe((data: Objeto)=>{
      this.arruser = data.results
      console.log(this.arruser)
    })
      /* const respuesta = await firstValueFrom(this.userServices.getAll())
  
      this.arruser = respuesta.results
      console.log(this.arruser)*/
      } 
      catch(error)
      {
        console.log(error)
      }  
  }

  delete(){}


  /* async ngOnInit(){ */
    //observable revuelve los usuarios
    /* this.userServices.getAlll().subscribe((data: Objeto)=>{
      this.arruser = data.results
      console.log(this.arruser)
    }) */
   /*  try{
      const respuesta = await this.userServices.getAll()
  
      this.arruser = respuesta.results
      console.log(this.arruser)
      }
      catch(error)
      {
        console.log(error)
      }   */
  
}
