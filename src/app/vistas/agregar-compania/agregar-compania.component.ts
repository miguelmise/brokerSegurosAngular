import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompaniaService } from 'src/app/servicios/compania.service';

@Component({
  selector: 'app-agregar-compania',
  templateUrl: './agregar-compania.component.html',
  styleUrls: ['./agregar-compania.component.css']
})
export class AgregarCompaniaComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router:Router, private _companiaService: CompaniaService) { 
    this.registerForm = this.formBuilder.group(
      {
        nombrecompania: ["",Validators.required],
        ruc: ["",Validators.required],
        nombrecoordinador: ["",Validators.required],
        celular: ["",[Validators.required,Validators.minLength(10)]],
        correo: ["",[Validators.required,Validators.email]]
    }
    );
  }

  ngOnInit(): void {
    
  }

  get form(){
    return this.registerForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    //en caso que el formulario no es valido
    if(this.registerForm.invalid){
      return;
    }

    this._companiaService.guardarCompania(JSON.stringify(this.registerForm.value,null,4))

  }

  onReset(){
    this.submitted = false;
    this.registerForm.reset();
  }

}
