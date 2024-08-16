import { Component, inject, Input } from '@angular/core';
import { User } from '../../interfaces/objeto.interface';
import { RouterLink } from '@angular/router';
import { CardUserComponent } from '../card-user/card-user.component';
import { UsuariosService } from '../../services/usuarios.service';
import { firstValueFrom } from 'rxjs';

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

  async delete(id:string | undefined){
    if(id){
      let borrar= confirm('Estas seguro que quieres borrar el empleado: ' + id)
      if(borrar)
      {
        try{
        const response: User = await firstValueFrom(this.userServices.delete(id))
        console.log(response)
        if(response._id)
        {
          const response = await firstValueFrom(this.userServices.getAll())

          this.arruser = response.results;
          alert('Usuario borrado correctamente')

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
}