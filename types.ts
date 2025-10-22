
export type Rank = 1 | 2 | 3 | 4;

export interface GameResult {
  rank: Rank;
  message: string;
  numbers: number[];
  prize: number;
}