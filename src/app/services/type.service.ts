import { Injectable } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { TypeModel } from "../models/type.model";

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  form: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      isActive: [true],
    });
  }
  
  initializeFormGroup() {
    this.form.setValue({
      name: "",
      title: "",
      description: "",
      isActive: true
    });
  }

  fillFormGroup(data: TypeModel){
    this.form.setValue({
      name: data.name,
      title: data.title,
      description: data.description,
      isActive: data.isActive
    });
  }
}
