import { AfterViewInit, Component, ViewChild, Inject, Optional } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeService } from "../services/type.service";
import { TypeModel } from "../models/type.model";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
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
    this.refreshPaging();
  }

  refreshPaging(){
    this.service.getTypes().subscribe(data => {
      this.dataSource = new MatTableDataSource<TypeModel>(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  createDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DialogType, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.refreshPaging();
    })
  }

  editDialog(element: TypeModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = element;
    const dialogRef = this.dialog.open(DialogType, dialogConfig);
    dialogRef.afterClosed().subscribe(s => {
      this.refreshPaging();
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogType);

    dialogRef.afterClosed().subscribe(result => {
      this.refreshPaging();
    });
  }

   confirmDialog(element: TypeModel){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = element;
    const dialogRef = this.dialog.open(DialogConfirm, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.refreshPaging();
    });
   }

}

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
  
  onClear(): void{
    this.service.form.reset();
    this.dialogRef.close();
  }
  onSubmit(): void{
    console.log(this.service.form.value);
    switch (this.action) {
      case "create":
        this.service.createType(this.service.form.value).subscribe(data => {
          this.service.openSnackBar("Tạo mới thành công");
          this.dialogRef.close();
        })
        break;
      case "edit":
        this.service.editType(this.service.form.value).subscribe(data => {
          this.service.openSnackBar("Chỉnh sửa thành công");
          this.dialogRef.close();
        })
        break;
      default:
        break;
    }
    
    debugger;
  }
}

@Component({
  selector: 'dialog-confirmation',
  templateUrl: 'dialog-confirm.html',
  styleUrls: ['./type.component.less']
})

export class DialogConfirm {
  selectedType: TypeModel;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(    
    public dialogRef: MatDialogRef<DialogType>,
    public service: TypeService,
    @Inject(MAT_DIALOG_DATA) public data: TypeModel){
      this.selectedType = data;
    }

    confirmYes(element: TypeModel){
      this.service.deleteType(element.id).subscribe(result => {
        this.service.openSnackBar("Xóa thành công");
        this.dialogRef.close();
      });
    }
}