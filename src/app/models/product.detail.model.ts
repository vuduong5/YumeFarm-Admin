import { TypeModel } from "./type.model";
export interface ProductDetailModel {
  name: String,
  description: String,
  isActive: Boolean,
  type: TypeModel,
  price: number,
  title: String,
  images: Array<string>,
  thumbnail: String,
  salePrice: Number,
  id: String
}