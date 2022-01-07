export interface IBanner {
  message: string;
  time: number;
  position?: 'left' | 'right' | 'center';
  colors?: [string, string, string];
}
