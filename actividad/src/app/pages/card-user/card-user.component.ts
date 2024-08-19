import { Component, inject, Input } from '@angular/core';
import { User } from '../../interfaces/objeto.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {

  router = inject(Router)
  arruser: User[]=[]
  usuario: User | null = null 
  activeRoute = inject(ActivatedRoute);
  userService = inject(UsuariosService);
  

  ngOnInit(){
    try{
      this.activeRoute.params.subscribe(async (params:any)=>{
        //console.log(params.id)
        let id= params.id
        //console.log(id)
        this.usuario = await firstValueFrom(this.userService.getById(id))
        console.log(this.usuario)
      })

    }catch(error)
    {
      console.log(error)  
    }
    
  }

  async delete(id:string | undefined){
    if(id){
      let borrar= confirm('Deseas Borrar al Usuario: ' + id)
      if(borrar)
      {
        try{
        const response: User = await firstValueFrom(this.userService.delete(id))
        console.log(response)
        if(response._id)
        {
          const response = await firstValueFrom(this.userService.getAll())

          this.arruser = response.results;
          this.router.navigate(['/control-panel', 'home']) 
          alert('Empleado borrado correctamente')
          

        }
      }
      catch (error) {
        console.log(error)
      }
      }
      
    }



  }


}
