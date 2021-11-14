import { AfterViewInit, Component, ViewChild, Inject, Optional } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

  constructor(private service: ProductService) { 
    this.refreshPaging();
  }

  refreshPaging(){
    // this.service.getTypes().subscribe(data => {
    //   this.dataSource = new MatTableDataSource<TypeModel>(data);
    //   this.dataSource.paginator = this.paginator;
    // })
    this.dataSource = new MatTableDataSource<ProductModel>(SEED_DATA);
    this.dataSource.paginator = this.paginator;
  }


}


const SEED_DATA: ProductModel[] = [
  {id: "1", name: "product 1", title: 'title 1', createdDate: '2021-11-13', isActive: true, description: ""},
  {id: "2", name: "product 2", title: 'title 2', createdDate: '2021-11-13', isActive: true, description: ""},
  {id: "3", name: "product 3", title: 'title 3', createdDate: '2021-11-13', isActive: true, description: ""},
]