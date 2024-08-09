import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/objeto.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-userview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './userview.component.html',
  styleUrl: './userview.component.css'
})
export class UserviewComponent {
  @Input() myuser!: User;
}
