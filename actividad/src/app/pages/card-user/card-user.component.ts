import { Component, inject, Input } from '@angular/core';
import { User } from '../../interfaces/objeto.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

  usuario: User | null = null 
  activeRoute = inject(ActivatedRoute);
  userService = inject(UsuariosService);
  

  ngOnInit(){
    try{
      this.activeRoute.params.subscribe(async (params:any)=>{
        //console.log(params.id)
        let id= params.id
        console.log(id)
        this.usuario = await firstValueFrom(this.userService.getById(id))
        console.log(this.usuario)
      })

    }catch(error)
    {
      console.log(error)  
    }
    
  }


}
