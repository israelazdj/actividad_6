import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuariosService } from './services/usuarios.service';
import { User } from './interfaces/objeto.interface';
import { firstValueFrom } from 'rxjs';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserviewComponent } from './pages/userview/userview.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,UserListComponent,UserviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

    userServices = inject(UsuariosService);
    arruser: User[] = []

    async ngOnInit(){
      try{
        const respuesta = await firstValueFrom(this.userServices.getAll())
    
        this.arruser = respuesta.results
        console.log(this.arruser)
        }
        catch(error)
        {
          console.log(error)
        }  
    }

}
