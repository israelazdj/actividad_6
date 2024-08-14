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
  erroru: [] = []

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

  async delete(id:string | undefined){
    if(id){
      let borrar= confirm('estas seguro que quieres borrar el empleado' + id)
      if(borrar)
      {
        try{
        const response: User = await firstValueFrom(this.userServices.delete(id))
        console.log(response)
        if(response._id)
        {
          const response = await firstValueFrom(this.userServices.getAll())

          this.arruser = response.results;
          alert('Empleado borrado correctamente')

        }
      }
      catch (error) {
        console.log(error)
        /* this.erroru = error
        console.log(this.erroru) */
      }
      }

    }



  }


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
