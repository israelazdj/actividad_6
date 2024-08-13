import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  
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

  getDataForm(){}



  checkControl(formControlName: string, Validator: string){
    return this.usuarioform.get(formControlName)?.hasError(Validator) && this.usuarioform.get(formControlName)?.touched;

  }

}
