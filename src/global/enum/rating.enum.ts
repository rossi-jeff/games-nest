export enum Rating {
  Gray = 0,
  Brown = 1,
  Green = 2,
}

export const RatingArray = Object.keys(Rating).filter((k) =>
  isNaN(parseInt(k)),
);
