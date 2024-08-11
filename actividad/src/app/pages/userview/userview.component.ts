import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/objeto.interface';
import { RouterLink } from '@angular/router';
import { CardUserComponent } from '../card-user/card-user.component';

@Component({
  selector: 'app-userview',
  standalone: true,
  imports: [RouterLink,CardUserComponent],
  templateUrl: './userview.component.html',
  styleUrl: './userview.component.css'
})
export class UserviewComponent {
  @Input() myuser!: User;
}
