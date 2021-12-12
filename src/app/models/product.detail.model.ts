import { TypeModel } from "./type.model";
export interface ProductDetailModel {
  name: string,
  description: string,
  isActive: Boolean,
  type: TypeModel,
  price: number,
  title: string,
  images: Array<string>,
  thumbnail: string,
  salePrice: Number,
  id: string
}