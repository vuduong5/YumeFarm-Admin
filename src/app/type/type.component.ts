import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

/**
 * @title Table with pagination
 */
 @Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.less']
})
export class TypeComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'title', 'createdDate', 'isActive'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
   paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogType);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

export interface PeriodicElement {
  name: string;
  title: string;
  createdDate: Date;
  isActive: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: "Sấy", title: "Đồ sấy khô", createdDate: new Date, isActive: true},
  {name: "Sấy 1", title: "Đồ sấy khô 1", createdDate: new Date, isActive: true},
  {name: "Sấy 2", title: "Đồ sấy khô 2", createdDate: new Date, isActive: true},
  {name: "Sấy 3", title: "Đồ sấy khô 3", createdDate: new Date, isActive: true},
];

@Component({
  selector: 'dialog-type',
  templateUrl: 'dialog-type.html',
  styleUrls: ['./type.component.less']
})
export class DialogType {}
