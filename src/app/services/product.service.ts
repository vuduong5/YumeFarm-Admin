import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ProductModel } from '../models/product.model';
import { ProductDetailModel } from "../models/product.detail.model";
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

  updateProduct(product: ProductModel): Observable<ProductModel>{
    return this.http.put<ProductModel>(this.productURL +'/'+ product.id, product);
  }

  deleteProduct(id: string): Observable<ProductModel>{
    return this.http.delete<ProductModel>(this.productURL + '/' + id);
  }


  uploadImages(files: Array<File>): Observable<any>{
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      formData.append(`files`, file);
    }
    return this.http.post<Array<File>>(this.productURL + '/upload', formData);
  }

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.productURL)
  }

  getProduct(id: string): Observable<ProductDetailModel>{
    return this.http.get<ProductDetailModel>(this.productURL+'/'+id);
  }

  initializeFormGroup() {
    this.form.setValue({
      id: '',
      name: '',
      title: '',
      description: '',
      isActive: true,
      typeId: '',
      price: '',
      images: '',
      thumbnail: '',
      salePrice: ''
    });
  }
}
