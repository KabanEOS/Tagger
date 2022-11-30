export interface XTag {
  xc: number;
  xi: number;
  xv: number;
};

export interface Tag {
  id: number;
  name: string;
  rating:number;
  XTag:XTag;
};

