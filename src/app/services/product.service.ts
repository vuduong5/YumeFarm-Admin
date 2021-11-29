import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ProductModel } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productURL = 'http://localhost:5000/api/products';  // URL to web api
  form: FormGroup;
  constructor(private http: HttpClient,
    private fb: FormBuilder) { 
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      isActive: [true],
      typeId: ['', Validators.required],
      price: ['', Validators.required],
      images: ['', Validators.required],
      thumbnail: ['', Validators.required],
      salePrice: ['']
    });
  }

  createProduct(product: ProductModel): Observable<ProductModel>{
    return this.http.post<ProductModel>(this.productURL, product);
  }


  uploadImages(files: Array<File>): Observable<any>{
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      formData.append(`files`, file);
    }
    return this.http.post<Array<File>>(this.productURL + '/upload', formData);
  }
}
