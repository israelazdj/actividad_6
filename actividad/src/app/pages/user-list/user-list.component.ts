import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/objeto.interface';
import { UserviewComponent } from "../userview/userview.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserviewComponent,RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  @Input() listausuarios: User[] = []
}
