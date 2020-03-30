import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validator, Validators} from '@angular/forms';
import {CovidApiService} from '../services/covid-api.service';

interface Result {
  text: string;
  level: string;
  pd: string;
  score: number;
  ageRange: string;
  gender: string;
  recommendations: string[];
}

@Component({
  selector: 'app-self-assessment',
  templateUrl: './self-assessment.component.html',
  styleUrls: ['./self-assessment.component.scss']
})
export class SelfAssessmentComponent implements OnInit {

  testForm: FormGroup;
  showResults = false;
  questions;
  checkBoxes = [];
  questionsAnswers = {};
  result: Result;
  ageQuestion;
  genderQuestion;

  static getResult(): Result {
    return {
      text: '',
      level: '',
      pd: '',
      score: 0,
      recommendations: [],
      ageRange: '',
      gender: ''
    };
  }

  constructor(private fb: FormBuilder,
              private covidApiService: CovidApiService) { }

  getQuestions() {
    this.covidApiService.getSelfAssessmentQuestions()
      .subscribe(questions => {
        // console.log('QUESTIONS:', questions);
        this.questions = questions;
        this.buildForm(questions);
      });
  }

  buildForm(questions) {
    const group = {};
    const options = questions.flatMap(q => {
      if (q.age) {
        this.ageQuestion = q;
      }

      if (q.gender) {
        this.genderQuestion = q;
      }

      return q.options;
    });
    // console.log(options);
    options.forEach(option => {
      const validator = []; // option.required ? [Validators.required] : [];
      if (!group[option.name]) {
        this.questionsAnswers[option.name] = option.score;
        const value = option.type === 'checkbox' ? false : typeof option.value === 'string' ? option.value : option.score.toString();
        group[option.name] = new FormControl(value, validator);
      }
    });

    // console.log(group);
    this.testForm = this.fb.group(group);
    // console.log(this.questionsAnswers);
    // console.log(this.testForm);
    this.testForm.valueChanges.subscribe(values => { console.log('Values:', values); });
  }

  onCheckBoxChange(option) {
    if (option.type !== 'checkbox') { return; }
    const idx = this.checkBoxes.indexOf(option.name);
    const obj = {};

    if (idx === -1) {
      this.checkBoxes.push(option.name);
      // obj[option.name] = true;
    } else {
      this.checkBoxes.splice(idx, 1);
      obj[option.name] = false;
    }
    this.testForm.patchValue(obj);
  }

  getTestResult() {
    let score = 0;
    const values = this.testForm.value;
    for (const q in values) {
      if (values.hasOwnProperty(q)) {
        const val = values[q]; // !isNaN(values[q]) ? parseInt(values[q], 10) : 0;
        if (val && val !== '0') {
          score += this.questionsAnswers[q];
        }
      }
    }

    let observation = {
      ...SelfAssessmentComponent.getResult(),
      score
    };
    // if (score <= 2) {
    //   observation = {
    //     ...observation,
    //     text: 'Baja probabilidad de COVID-19.',
    //     level: 'info'
    //   };
    // } else
    if (score <= 5) {
      observation = {
        ...observation,
        text: '⚠️ Practique el distanciamiento social. Hidrátese, conserve medidas de higiene, observe y reevalúe en 2 días.',
        level: 'warning',
        pd: 'Vuelva a tomar esta autoevaluación si desarrolla nuevos síntomas o tiene contácto ' +
          'con una persona que presenta síntomas respiratorios',
        recommendations: [
          'Quedese en casa el mayor tiempo posible',
          'Salga por provisiones solo una vez por semana',
          'Mantenga una distancia de al menos 2 metros con otras personas cuando salga'
        ]
      };
    } else if (score > 5 && score <= 11) {
      observation = {
        ...observation,
        text: '⚠️ Practique el auto aislamiento y llame a su médico de confianza o proveedor de salud.',
        level: 'danger',
        pd: 'La mayoría de los síntomas del COVID-19 son leves. ' +
          'Si los síntomas comienzan a empeorar, comuníquese con su proveedor de salud.',
        recommendations: [
          'Solo salga de casa o esté en contácto con otras personas por motivos críticos (Ej. emergencia de salud)',
          'Pida sus servicios por teléfono, internet o pida ayuda a familiares, amigos o vecinos.',
          'No vaya a hospitales o clínicas para hacerse la prueba del COVID-19, a menos que un profesional de la salud se lo solicite'
        ]
      };
    } else {
      observation = {
        ...observation,
        text: '🚨 Llame a los servicios para realizar detección del COVID-19.',
        level: 'danger',
        recommendations: [
          'Solo salga de casa o esté en contácto con otras personas por motivos críticos (Ej. emergencia de salud)',
          'Pida sus servicios por teléfono, internet o pida ayuda a familiares, amigos o vecinos.',
          'No vaya a hospitales o clínicas para hacerse la prueba del COVID-19, a menos que un profesional de la salud se lo solicite'
        ]
      };
    }

    const getValue = (question, val) => {
      // console.log({question, val});
      const name = question.options[0].name;
      const value = val[name];
      return question.options.filter(o => o.value === value)[0].value;
    };

    observation = {
      ...observation,
      ageRange: getValue(this.ageQuestion, this.testForm.value),
      gender: getValue(this.genderQuestion, this.testForm.value)
    };


    // console.log('Result:', observation);
    this.result = observation;
    this.saveResults({...observation});
  }

  saveResults(data: Result) {
    delete data.pd;
    delete data.recommendations;
    delete data.text;
    this.covidApiService.saveSelfAssessmentResults(data)
      .subscribe(res => {
        // console.log('Posted results', res);
        this.showResults = true;
      });
  }

  reTakeTest() {
    this.showResults = false;
    this.buildForm(this.questions);
  }

  ngOnInit() {
    this.getQuestions();
  }

}
