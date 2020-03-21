export class CountryModel {
  name: string;
  nameEs: string;
  cases: number;
  suspects: number;
  critic: number;
  cured: number;
  deaths: number;
  flag?: string;
  percentRecovered?: string;
  history: Array<any>;
}
