import { Component, OnInit } from '@angular/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { TypeService } from "../../services/type.service";
import { SelectionModel } from "../../models/selection.model";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {
  fileUploadControl = new FileUploadControl({ listVisible: false });
  types: SelectionModel[] = [];
  constructor(private typeService: TypeService) { 
    this.typeService.getTypes().subscribe(results => {
      this.types = results.map((data) =>{
        return <SelectionModel>{
          value: data.id,
          name: data.name
        }
      })
    })
  }

  ngOnInit(): void {
  }

}
