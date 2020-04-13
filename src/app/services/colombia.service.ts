import { Injectable } from '@angular/core';
import {ColombiaDataModel} from '../models/colombia-data.model';
import {SharedService} from './shared.service';
import {DepartmentModel} from '../models/department.model';
import {CityCasesModel} from '../models/city-cases.model';

@Injectable({
  providedIn: 'root'
})
export class ColombiaService {

  static getRanges() {
    const range = (start = 0, length = 10) => {
      return [...Array(length).keys()].map(k => (k + start).toString());
    };
    const ranges = {};

    for (let i = 0; i < 10; i++) {
      const v = range(i * 10);
      const label = `${v[0]} a ${v[v.length - 1]}`;
      ranges[label] = v;
    }

    // console.log(ranges);
    // console.log([...Object.keys(ranges)]);
    return ranges;
  }

  constructor(private sharedService: SharedService) { }

  getGenderAndAgeData(data: ColombiaDataModel[]) {
    ColombiaService.getRanges();
    // console.time('getGenderAndAgeData');
    // console.log(`DATA -> ${JSON.stringify(data)}`);
    const ageRanges = ColombiaService.getRanges();
    let ageLabels = [...Object.keys(ageRanges)];
    let ageData = {};
    const getObjArr = arr => {
      const obj = {};
      arr.forEach(i => { obj[i] = []; });
      // console.log(obj);
      return obj;
    };
    const genderLabels = ['F', 'M'];
    const attentionLabels = ['Casa', 'Hospital', 'Fallecido'];
    const getObj = (arr) => {
      const obj = {};
      arr.map(d => {
        obj[d] = 0;
      });
      return obj;
    };
    const sortedData = getObjArr(genderLabels);
    const sortedAttentionData = getObjArr(attentionLabels);
    // console.log(getObj(attentionLabels));
    data.forEach(item => {
      // console.log(item)
      if (item.attention.toLowerCase().includes('casa')) { item.attention = 'Casa'; }
      const idx = attentionLabels.indexOf(this.sharedService.upperFirstLetter(item.attention));
      // console.log(attentionLabels)
      item.attention = attentionLabels[idx];


      for (const range in ageRanges) {
        if (ageRanges.hasOwnProperty(range)) {
          if (ageRanges[range].indexOf(item.ageRange.toString()) >= 0) {
            if (!ageData[range]) {
              ageData = {
                ...ageData,
                [range]: {
                  ...getObj(genderLabels),
                  ...getObj(attentionLabels)
                }
              };
            }
            ageData[range][item.gender] += 1;
            ageData[range][item.attention] += 1;
          }
        }
      }
    });

    // ageLabels.sort();
    ageLabels = ageLabels.map(label => {
      for (const p in sortedData) {
        if (sortedData.hasOwnProperty(p)) {
          sortedData[p].push(ageData[label][p]);
        }
      }
      for (const p in sortedAttentionData) {
        if (sortedAttentionData.hasOwnProperty(p)) {
          sortedAttentionData[p].push(ageData[label][p]);
        }
      }
      return `${label} años`;
    });

    // console.log({ageLabels, ageData, sortedData, sortedAttentionData});
    // console.timeEnd('getGenderAndAgeData');
    return {
      labels: ageLabels,
      sortedData,
      sortedAttentionData
    };
  }

  getDepartmentData(data: DepartmentModel[]) {
    data.sort((a, b) => b.cases - a.cases);
    const labels = [];
    const chartData = [];
    let total = 0;
    const dataOthers = data.slice(25, data.length);
    data = data.slice(0, 32);
    data.forEach(item => {
      labels.push(item.dept);
      chartData.push(item.cases);
      total += item.cases;
    });

    const percentages = chartData.map(c => parseFloat((c * 100 / total).toFixed(1)));

    const getPercentageData = values => {
      const p = [];
      const l = [];
      const others = {
        p: 0,
        l: 'Otros'
      };
      values.forEach((value, i) => {
        if (value > 1.5) {
          p.push(value);
          l.push(`${labels[i]} (${percentages[i]}%)`);
        } else {
          others.p += value;
        }
      });

      p.push(parseFloat(others.p.toFixed(1)));
      l.push(others.l);

      return {
        data: p,
        labels: l
      };
    };
    // console.log({data, labels, chartData, percentages});

    return {
      labels: labels.map((l, i) => `${l} (${chartData[i]})`),
      chartData,
      percentages: getPercentageData(percentages)
    };
  }

  getCityData(dataCities: CityCasesModel[]) {
    dataCities.sort( (cityA, cityB ) => cityB.cases - cityA.cases );
    // console.log(dataCities);
    const labels = [];
    const chartData = [];
    const cutData = dataCities.slice(0, 10);
    cutData.forEach( cityInfo => {
      // console.log(cityInfo)
      if (cityInfo.percentCases) {
        console.log(cityInfo);
        const percent = cityInfo.percentCases.toFixed(1);
        labels.push(`${cityInfo.city} (${percent}%)`);
        chartData.push(percent);
      } else {
        console.log(cityInfo);
        // const percent = cityInfo.percentCases.toFixed(1);
        labels.push(`${cityInfo.city} (${cityInfo.cases})`);
        chartData.push(cityInfo.cases);
      }
    } );

    return {
      labels,
      chartData
    };
  }

}
