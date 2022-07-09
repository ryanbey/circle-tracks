export class Track{
   constructor (
      public _id: string,
      public id: string,
      public name: string,
      public built: string,
      public length: string,
      public surface: string,
      public turns: string,
      public banking: string,
      public capacity: string,
      public mapUrl: string,
      public imageUrl: string,
   ) {}
}