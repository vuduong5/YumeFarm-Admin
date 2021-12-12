import { AfterViewInit, Component, ViewChild, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TypeService } from 'src/app/services/type.service';
import { ProductModel } from "../../models/product.model";
import { ProductService } from "../../services/product.service";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})


export class ListComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'title', 'createdDate', 'isActive', 'id'];
  dataSource = new MatTableDataSource<ProductModel>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog, private service: ProductService) { 
    this.refreshPaging();
  }

  refreshPaging(){
    this.service.getProducts().subscribe(data => {
      this.dataSource = new MatTableDataSource<ProductModel>(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  confirmDialog(element: ProductModel){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = element;
    const dialogRef = this.dialog.open(ProductDialogConfirm, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.refreshPaging();
    });
   }

}


@Component({
  selector: 'dialog-confirmation-product',
  templateUrl: 'dialog-confirm.html',
  styleUrls: ['./list.component.less']
})

export class ProductDialogConfirm {
  selectedProduct: ProductModel;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(    
    public service: ProductService,
    public typeService: TypeService,
    public dialogRef: MatDialogRef<ProductDialogConfirm>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel){
      this.selectedProduct = data;
    }

    confirmYes(element: ProductModel){
      this.service.deleteProduct(element.id).subscribe(result => {
        this.typeService.openSnackBar("Xóa thành công");
        this.dialogRef.close();
      });
    }
}