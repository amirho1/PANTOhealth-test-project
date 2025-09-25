export type multiData = [number, number, number];
export type singleData = number | null;
export type Data<T = singleData | multiData> = [singleData, T][];

export type Charts =
  | {
      title: string;
      data: Data<singleData>;
    }[]
  | {
      title: string;
      data: Data<multiData>;
    }[];
