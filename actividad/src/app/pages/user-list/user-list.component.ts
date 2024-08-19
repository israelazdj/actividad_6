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
  page!: number;
  currentPage: number = 1
  totalPage: number= 2

  userServices = inject(UsuariosService);
  arruser: User[] = []
  erroru: [] = []


  async gotoPage(page: number){
    const response = await firstValueFrom(this.userServices.getAll(page) )
    this.arruser = response.results
  }

  async ngOnInit(){
    try{
      this.userServices.getAll().subscribe((data: Objeto)=>{
      
      this.arruser = data.results
      console.log(this.arruser)
      })      
    } 
      catch(error)
      {
        console.log(error)
      }  
  }

}

