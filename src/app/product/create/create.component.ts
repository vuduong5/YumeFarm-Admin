import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { TypeService } from "../../services/type.service";
import { SelectionModel } from "../../models/selection.model";
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit, OnDestroy {
  public uploadedThumbnailImg: BehaviorSubject<string> = new BehaviorSubject("");
  public uploadedSliderImg: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private subscription: Subscription = new Subscription();
  private strCount: Array<string> = new Array<string>();
  thumbnailImage = new FileUploadControl(
    { listVisible: false, accept: ['image/*'], discardInvalid: true, multiple: false },
    [FileUploadValidators.accept(['image/*']), FileUploadValidators.filesLimit(1)]
  );
  sliderImages = new FileUploadControl({ listVisible: false, accept: ['image/*'] });
  types: SelectionModel[] = [];
  isValidateForm: boolean = true;
  constructor(private typeService: TypeService,
    public productService: ProductService) {
      this.productService.initializeFormGroup();
      this.typeService.getTypes().subscribe(results => {
        this.types = results.map((data) => {
          return <SelectionModel>{
            value: data.id,
            name: data.name
          }
        })
      })
  }

  ngOnInit(): void {
    this.subscription = this.thumbnailImage.valueChanges.subscribe((values: Array<File>) => {
      this.getThumbnailImage(values[0])
    });

    this.subscription = this.sliderImages.valueChanges.subscribe((values: Array<File>) => {
      this.getSlideImage(values);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveProduct() {
    this.isValidateForm = false;
    this.productService.createProduct(this.productService.form.value).subscribe(result => {
      console.log(result);
      this.typeService.openSnackBar("Tạo mới thành công");
    })
  }

  private getThumbnailImage(file: File): void {
    if (FileReader && file) {
      const fr = new FileReader();
      fr.onload = (e: any) => {
        this.uploadedThumbnailImg.next(e.target.result);
      }
      fr.readAsDataURL(file);
    } else {
      this.uploadedThumbnailImg.next("");
    }
  }

  private getSlideImage(files: File[]) {
    this.strCount = [];
    if (files.length == 0) {
      this.uploadedSliderImg.next([]);
    } else {
      files.forEach((file, index) => {
        if (FileReader && file) {
          const fr = new FileReader();
          fr.onload = (e: any) => {
            this.strCount.push(e.target.result);
            if (files.length == this.strCount.length) {
              this.uploadedSliderImg.next(this.strCount);
            }
          }
          fr.readAsDataURL(file);
        } else {
          this.uploadedSliderImg.next([]);
        }
      })
    }
  }

  uploadThumbnail(): void{
    // let files: Array<File> = this.thumbnailImage.value.map(file => {
    //   return file;
    // })
    // this.productService.uploadImages(files).subscribe(result => {
    //   if(result.status == 1){
    //     this.typeService.openSnackBar("Upload success");
    //     this.productService.form.controls["thumbnail"].setValue(result.data);
    //   }
    // });
    this.productService.form.controls["thumbnail"].setValue('abc.png');
  }

  uploadImages(): void{
    // let files: Array<File> = this.sliderImages.value.map(file => {
    //   return file;
    // })
    // this.productService.uploadImages(files).subscribe(result => {
    //   if(result.status == 1){
    //     this.typeService.openSnackBar("Upload success");
    //     this.productService.form.controls["images"].setValue(result.data);
    //   }
    // });
    this.productService.form.controls["images"].setValue('bcd.png');
  }

  onSubmit(): void{

  }
}
