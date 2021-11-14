import { Component, OnInit } from '@angular/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {
  public fileUploadControl = new FileUploadControl({ listVisible: false });
  constructor() { }

  ngOnInit(): void {
  }

}
