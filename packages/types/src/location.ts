export interface LocationItem {
  id: string;
  title: string;
  image: string;
  name: string;
  fee: number;
  time: number;
  address: string;
  rating: number;
  reviews: number;
}

export interface LocationTileItem {
  id?: string;
  title: string;
  imageUrl: string;
  slug: string;
  count: number;
}
