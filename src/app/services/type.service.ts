import { Injectable } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { TypeModel } from "../models/type.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  private typesUrl = 'http://localhost:5000/api/types';  // URL to web api
  form: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private _snackBar: MatSnackBar,) { 
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

  openSnackBar(title: string) {
    this._snackBar.open(title, 'đóng', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 10000,
      panelClass: ['green-snackbar']
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
