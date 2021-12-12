import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TypeComponent, DialogType, DialogConfirm } from './type/type.component';
import { ProductComponent } from './product/product.component';
import { CreateComponent } from './product/create/create.component';
import { EditComponent } from './product/edit/edit.component';
import { ErrorComponent } from './error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListComponent, ProductDialogConfirm } from './product/list/list.component';
import { MatSelectModule } from '@angular/material/select';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import {MatCardModule} from '@angular/material/card';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TypeComponent,
    ProductComponent,
    CreateComponent,
    EditComponent,
    ErrorComponent,
    DialogType,
    DialogConfirm,
    ProductDialogConfirm,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSlideToggleModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSelectModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    FileUploadModule, MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
