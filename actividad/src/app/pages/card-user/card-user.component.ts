import { Component, inject, Input } from '@angular/core';
import { User } from '../../interfaces/objeto.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

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

      Swal.fire({
        title: "Estas seguro?",
        text: "No podras revertirlo!",
        icon: "warning",
        cancelButtonText:"Cancelar",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar!"
        
      }).then(async(result)=>{
        if (result.isConfirmed) {

          try 
          {
            const response: User = await firstValueFrom(this.userService.delete(id))
            console.log(response)
            Swal.fire({title: "Borrado!",text: "Usuario eliminado correctamente.",icon: "success"});
            
              if(response._id)
              {
                const response = await firstValueFrom(this.userService.getAll())
      
                this.arruser = response.results;
                this.router.navigate(['/control-panel', 'home']) 
                
                  //alert('Usuario borrado correctamente')
        
              }
          }
        
        catch (error) {
          console.log(error)
        }
        }
      })
    }
  }


}
