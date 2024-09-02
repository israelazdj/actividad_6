import { Component, inject, Input } from '@angular/core';
import { User } from '../../interfaces/objeto.interface';
import { RouterLink } from '@angular/router';
import { CardUserComponent } from '../card-user/card-user.component';
import { UsuariosService } from '../../services/usuarios.service';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userview',
  standalone: true,
  imports: [RouterLink,CardUserComponent],
  templateUrl: './userview.component.html',
  styleUrl: './userview.component.css'
})
export class UserviewComponent {
  @Input() myuser!: User;
  userServices = inject(UsuariosService)
  arruser: User[]=[]

  delete(id:string | undefined) {
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
            const response: User = await firstValueFrom(this.userServices.delete(id))
            //console.log(response)
            Swal.fire({title: "Borrado!",text: "Usuario eliminado correctamente.",icon: "success"});
              if(response._id)
              {
                const response = await firstValueFrom(this.userServices.getAll())
      
                this.arruser = response.results;
        
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



  