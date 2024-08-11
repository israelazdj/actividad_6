import { Component, inject, Input } from '@angular/core';
import { User } from '../../interfaces/objeto.interface';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {
  userService = inject(UsuariosService)
  @Input() myuser!: User[];

}
