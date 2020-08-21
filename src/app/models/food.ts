export class Food {
  constructor(
    public name: string,
    public description: string,
    public rating: number,
    public ratingChange: number,
    public imgPath: string,
    public id?: number | string
  ) {}
}
