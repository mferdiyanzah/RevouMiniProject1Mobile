export interface IData {
  id: number;
  avatar: string;
  name: string;
  position: string;
  time: Date;
  title: string;
  description: string;
  label: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  shares: number;
}

export interface ICarouselItem {
  id: number;
  title: string;
  description: string;
  image: any;
}
