export class PercentModel {
  confirmation: boolean;
  percent: number;
}

export interface PercentagesModel {
  global: Percentage;
  la: Percentage;
}

export interface Percentage {
  recovered: string;
  death: string;
  sick: string;
}
