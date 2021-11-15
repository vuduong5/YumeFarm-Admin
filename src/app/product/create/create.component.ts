import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { TypeService } from "../../services/type.service";
import { SelectionModel } from "../../models/selection.model";
import { BehaviorSubject, Subscription } from 'rxjs';

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
  constructor(private typeService: TypeService) {
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
    debugger
    console.log(this.thumbnailImage)
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
}
