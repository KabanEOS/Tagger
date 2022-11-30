import { Tag } from "./Tag.model";

export interface User {
  id: number;
  name: string;
  Tags: Tag[];
}