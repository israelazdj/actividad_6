import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/objeto.interface';
import { firstValueFrom, from, lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
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
        Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)
      ]),
      apellido: new FormControl(null,[
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)
      ]),
      email: new FormControl(null,[
        Validators.required,
        Validators.pattern(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
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
            Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)
          ]),
          apellido: new FormControl(usuario.last_name,[
            Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)
          ]),
          email: new FormControl(usuario.email,[
            Validators.required,
          Validators.pattern(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
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
        console.log(response._id)
        if(response._id)
        {
          Swal.fire({
            title: "Deseas guardar los cambios?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `No guardar`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire("Guardado!", "", "success");
              this.router.navigate(['/control-panel', 'home'])
            } else if (result.isDenied) {
              Swal.fire("Los cambios no se guardaron", "", "info");
              this.router.navigate(['/control-panel', 'home'])
            }
          });   
        }
    } catch ({ error }: any) {
      this.errorform = error
      console.log(this.errorform)
    }
    }
    else{
      //console.log(this.usuarioform.value._id)
      try{
        
      const response: User = await firstValueFrom(this.usuarioService.insert(this.usuarioform.value))
      
      let _id = response.id
      //console.log(_id)
      if(_id)
        {
          console.log(response)
          Swal.fire({
            title: "Felicidades",
            text: "Usuario insertado correctamente",
            icon: "success",
            confirmButtonText: 'Aceptar'
          }).then(result=>{
            if (result.isConfirmed) {
              this.router.navigate(['/control-panel', 'home'])  
              }
            });
                 
        }
      }catch ({ error }: any) {
        this.errorform = error
        console.log(this.errorform)
      }
    }
    

  }



  

}
