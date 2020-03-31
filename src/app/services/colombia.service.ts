import { Injectable } from '@angular/core';
import {ColombiaDataModel} from '../models/colombia-data.model';
import {SharedService} from './shared.service';
import {DepartmentModel} from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class ColombiaService {

  constructor(private sharedService: SharedService) { }

  getGenderAndAgeData(data: ColombiaDataModel[]) {
    // console.time('getGenderAndAgeData');
    // console.log(`DATA -> ${JSON.stringify(data)}`);
    let ageLabels = [];
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
      if (item.attention.includes('casa')) { item.attention = 'Casa'; }
      if (ageLabels.indexOf(item.ageRange) < 0) {
        ageLabels.push(item.ageRange);
        ageData = {
          ...ageData,
          [item.ageRange]: {
            ...getObj(genderLabels),
            ...getObj(attentionLabels)
          }
        };
      }
      const idx = attentionLabels.indexOf(this.sharedService.upperFirstLetter(item.attention));
      // console.log(attentionLabels)
      item.attention = attentionLabels[idx];
      ageData[item.ageRange][item.gender] += 1;
      ageData[item.ageRange][item.attention] += 1;
    });

    ageLabels.sort();
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

    data.forEach(item => {
      labels.push(item.dept);
      chartData.push(item.cases);
    });
    // console.log({data, labels, chartData});

    return {
      labels,
      chartData
    };
  }

}
