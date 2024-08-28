import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Objeto, User } from '../../interfaces/objeto.interface';
import { UserviewComponent } from "../userview/userview.component";
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { firstValueFrom } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserviewComponent,RouterLink,NgxPaginationModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  //@Input() listausuarios: User[] = []
  page: number= 1;
  currentPage: number = 1
  totalPage: number= 2

  userServices = inject(UsuariosService);
  arruser: User[] = []
  erroru: [] = []


  async filtro(){
    const response = await firstValueFrom(this.userServices.getAll(this.page) )
    //console.log(response.results)
    this.arruser = response.results
  }

  async previPage(){
    if(this.page <= 1)
    {
      this.page = this.totalPage;
      await this.filtro();      
    }
    else{      
      this.page -= 1;      
    }
    await this.filtro(); 
  }

  async nextPage(){
    if(this.page < this.totalPage)
    {
      this.page += 1
    }
    else{
      this.page = 1
    }
    await this.filtro();
  }
  
  async ngOnInit(){
    try{
      this.userServices.getAll().subscribe((data: Objeto)=>{
      
      this.arruser = data.results
      //console.log(this.arruser)
      })      
    } 
      catch(error)
      {
        console.log(error)
      }  
  }

}

