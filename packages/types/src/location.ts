export interface LocationItem {
  readonly id: string;
  readonly title: string;
  readonly image: string;
  readonly name: string;
  readonly fee: number;
  readonly time: number;
  readonly address: string;
  readonly rating: number;
  readonly reviews: number;
}

export interface LocationTileItem {
  readonly id: string;
  readonly title: string;
  readonly imageUrl: string;
  readonly slug: string;
  readonly count: number;
}
