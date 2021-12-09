import { TypeService } from './../../services/type.service';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SelectionModel } from 'src/app/models/selection.model';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {
  public uploadedThumbnailImg: BehaviorSubject<string> = new BehaviorSubject("");
  public uploadedSliderImg: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public urlImage = environment.ggURL;
  private subscription: Subscription = new Subscription();
  private strCount: Array<string> = new Array<string>();
  thumbnailImage = new FileUploadControl(
    { listVisible: false, accept: ['image/*'], discardInvalid: true, multiple: false },
    [FileUploadValidators.accept(['image/*']), FileUploadValidators.filesLimit(1)]
  );
  sliderImages = new FileUploadControl({ listVisible: false, accept: ['image/*'] });
  editThumbImage: string = '';
  editSliderImages: string[] = [];
  types: SelectionModel[] = [];
  isValidateForm: boolean = true;
  

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    private typeService: TypeService) { 
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
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.productService.getProduct(id ?? '').subscribe(data => {
        debugger
        this.productService.form.patchValue({
          name: data.name,
          description: data.description,
          isActive: data.isActive,
          typeId: data.type.id,
          price: data.price,
          title: data.title,
          images: data.images.join(','),
          thumbnail: data.thumbnail,
          salePrice: data.salePrice,
          id: data.id
        })
        this.editThumbImage = 'mac-OS-Big-Sur-Vector-Wave-Wallpaper-i-Download-Blog.jpg';
        this.editSliderImages = ['mac-OS-Big-Sur-Vector-Wave-Wallpaper-i-Download-Blog.jpg']
      })
    }

    this.subscription = this.thumbnailImage.valueChanges.subscribe((values: Array<File>) => {
      this.getThumbnailImage(values[0])
    });

    this.subscription = this.sliderImages.valueChanges.subscribe((values: Array<File>) => {
      this.getSlideImage(values);
    });
  }

  saveProduct() {
    this.isValidateForm = false;
    this.productService.updateProduct(this.productService.form.value).subscribe(result => {
      this.typeService.openSnackBar("Cập nhật thành công");
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

  removeThumbnailImage(image: string): void{
    this.editThumbImage = '';
    this.productService.form.controls["thumbnail"].setValue('');
  }

  removeThumbnailUpload(file: File): void{
    this.thumbnailImage.removeFile(file);
    this.productService.form.controls["thumbnail"].setValue('');
  }
  
  removeSliderImage(image: string): void{
    const index = this.editSliderImages.indexOf(image);
    if (index > -1) {
      this.editSliderImages.splice(index, 1);
      let imgs = this.productService.form.controls["images"].value.split(',');
      let i = imgs.indexOf(image);
      if(i > -1){
        imgs.splice(i, 1);
        this.productService.form.controls["images"].setValue(imgs.join(','));
      }
    }
  }

  combineImageURL(img: string){
    return `${this.urlImage}/${img}`;
  }
}
