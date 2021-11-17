import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private typesUrl = 'http://localhost:5000/api/products';  // URL to web api
  constructor(private http: HttpClient) { }

  uploadImages(files: Array<File>): Observable<any>{
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      formData.append(`files`, file);
    }
    return this.http.post<Array<File>>(this.typesUrl + '/upload', formData);
  }
}
