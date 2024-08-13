import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/objeto.interface';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  usuarioService = inject(UsuariosService);
  router = inject(Router);
  activateRoute = inject(ActivatedRoute);
  errorform:any [] = []
  

  variable:string = 'Insertar';
  usuarioform:FormGroup;

  constructor(){
    this.usuarioform= new FormGroup({
      nombre: new FormControl(null,[
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/)
      ]),
      apellido: new FormControl(null,[
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/)
      ]),
      email: new FormControl(null,[
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      imagen: new FormControl(null,[
        Validators.required,
        Validators.pattern(/^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
      ]),
    })
  
  }


  checkControl(formControlName: string, Validator: string){
    return this.usuarioform.get(formControlName)?.hasError(Validator) && this.usuarioform.get(formControlName)?.touched;

  }

  ngOnInit(){
    this.activateRoute.params.subscribe(async (params: any)=>{
      console.log(params.id)
      if(params.id){
        this.variable = 'Actualizar'
        const usuario: User = await firstValueFrom(this.usuarioService.getById(params.id))

        this.usuarioform= new FormGroup({
          _id: new FormControl(usuario._id,[]),
          nombre: new FormControl(usuario.first_name,[
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/)
          ]),
          apellido: new FormControl(usuario.last_name,[
            Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/)
          ]),
          email: new FormControl(usuario.email,[
            Validators.required,
          Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
          ]),
          imagen: new FormControl(usuario.image,[
            Validators.required,
            Validators.pattern(/^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
          ]),
        },          
        [])
      }
    })
  }

  async getDataForm(){
    if(this.usuarioform.invalid){
      this.usuarioform.markAllAsTouched();
      return
    }
    if(this.usuarioform.value._id){
      const val = this.usuarioform.value
      console.log(val)
     
      //actualizar
      try{
        const response: User = await firstValueFrom(this.usuarioService.update(this.usuarioform.value))        
        //console.log('response 1'+response)
        if(response._id)
        {
          alert('Usuario actualizado');
            this.router.navigate(['/control-panel', 'home'])          
        }
    } catch ({ error }: any) {
      this.errorform = error
      console.log(this.errorform)
    }
    }
    else{
      //insertando
      //peticion al servicio para insertar los datos en la API
      try{
      const response: User = await firstValueFrom(this.usuarioService.insert(this.usuarioform.value))
      
      console.log(response)
      if(response._id)
        {
          alert('Usuario insertado');
         this.router.navigate(['/control-panel', 'home'])          
        }
      }catch ({ error }: any) {
        this.errorform = error
        console.log(this.errorform)
      }
    }
    

  }



  

}
