import { AfterViewInit, Component, ViewChild, Inject, Optional } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeService } from "../services/type.service";
import * as moment from 'moment';
import { TypeModel } from "../models/type.model";
/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.less']
})
export class TypeComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'title', 'createdDate', 'isActive', 'id'];
  dataSource = new MatTableDataSource<TypeModel>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog, private service: TypeService) { 
    this.service.getTypes().subscribe(data => {
      this.dataSource = new MatTableDataSource<TypeModel>(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  createDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(DialogType, dialogConfig);
  }

  editDialog(element: TypeModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = element;
    this.dialog.open(DialogType, dialogConfig);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogType);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

var ELEMENT_DATA: TypeModel[] = [
  { id: "1", name: "Sấy", title: "Đồ sấy khô", createdDate: moment(new Date).format('DD-MM-YYYY'), isActive: true, description: "" },
  { id: "2", name: "Sấy 1", title: "Đồ sấy khô 1", createdDate: moment(new Date).format('DD-MM-YYYY'), isActive: true, description: "" },
  { id: "3", name: "Sấy 2", title: "Đồ sấy khô 2", createdDate: moment(new Date).format('DD-MM-YYYY'), isActive: false, description: "" },
  { id: "4", name: "Sấy 3", title: "Đồ sấy khô 3", createdDate: moment(new Date).format('DD-MM-YYYY'), isActive: true, description: "" },
];

@Component({
  selector: 'dialog-type',
  templateUrl: 'dialog-type.html',
  styleUrls: ['./type.component.less']
})

export class DialogType {
  action = "";
  constructor(
    public dialogRef: MatDialogRef<DialogType>,
    public service: TypeService,
    @Inject(MAT_DIALOG_DATA) public data: TypeModel) {
      service.initializeFormGroup();
      this.action = "create"
      if(data){
        service.fillFormGroup(data);
        this.action = "edit";
      }
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onClear(): void{
    this.service.form.reset();
    this.dialogRef.close();
  }
  onSubmit(): void{
    console.log(this.service.form.value);
    switch (this.action) {
      case "create":
        this.service.createType(this.service.form.value).subscribe(data => {
          console.log("created successfully");
        })
        break;
      case "edit":
        this.service.editType(this.service.form.value).subscribe(data => {
          console.log("edit succesfully");
        })
        break;
      default:
        break;
    }
    
    debugger;
  }
}