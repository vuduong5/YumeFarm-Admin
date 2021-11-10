import { Injectable } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { TypeModel } from "../models/type.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private typesUrl = 'http://localhost:5000/api/types';  // URL to web api
  form: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient,) { 
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      isActive: [true],
    });
  }
  
  initializeFormGroup() {
    this.form.setValue({
      id: "",
      name: "",
      title: "",
      description: "",
      isActive: true
    });
  }

  fillFormGroup(data: TypeModel){
    this.form.setValue({
      id: data.id,
      name: data.name,
      title: data.title,
      description: data.description,
      isActive: data.isActive
    });
  }

  /** GET types from the server */
  getTypes(): Observable<TypeModel[]> {
    return this.http.get<TypeModel[]>(this.typesUrl)
  }

  createType(type: TypeModel): Observable<TypeModel>{
    return this.http.post<TypeModel>(this.typesUrl, type);
  }

  editType(type: TypeModel): Observable<TypeModel>{
    return this.http.put<TypeModel>(`${this.typesUrl}/${type.id}`, type);
  }

  deleteType(id: String): Observable<TypeModel>{
    return this.http.delete<TypeModel>(`${this.typesUrl}/${id}`);
  }
}
