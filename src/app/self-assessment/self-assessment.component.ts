import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

interface Result {
  text: string;
  level: string;
  pd: string;
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
  questionsAnswers = {
    question1: 1,
    question2: 1,
    question3: 1,
    question4: 1,
    question5: 1,
    question6: 1,
    question7: 1,
    question8: 2,
    question9: 2,
    question10: 2,
    question11: 3,
    question12: 3,
    question13: 3,
  };
  result: Result;

  static getResult(): Result {
    return {
      text: '',
      level: '',
      pd: '',
      recommendations: []
    };
  }

  constructor(private fb: FormBuilder) { }

  init() {
    this.testForm = this.fb.group({
      question1: new FormControl(false, []),
      question2: new FormControl(false, []),
      question3: new FormControl(false, []),
      question4: new FormControl(false, []),
      question5: new FormControl(false, []),
      question6: new FormControl(false, []),
      question7: new FormControl(false, []),
      question8: new FormControl(false, []),
      question9: new FormControl(false, []),
      question10: new FormControl(false, []),
      question11: new FormControl(false, []),
      question12: new FormControl(false, []),
      question13: new FormControl(false, []),
    });
    // this.testForm.valueChanges.subscribe(values => { console.log('Values:', values); });
  }

  getTestResult() {
    let result = 0;
    const values = this.testForm.value;
    for (const q in values) {
      if (values.hasOwnProperty(q)) {
        if (values[q]) {
          result += this.questionsAnswers[q];
        }
      }
    }

    let observation = {...SelfAssessmentComponent.getResult()};
    // if (result <= 2) {
    //   observation = {
    //     ...observation,
    //     text: 'Baja probabilidad de COVID-19.',
    //     level: 'info'
    //   };
    // } else
    if (result <= 5) {
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
    } else if (result > 5 && result <= 11) {
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

    console.log('Result:', result, observation);
    this.showResults = true;
    this.result = observation;
  }

  reTakeTest() {
    this.showResults = false;
    this.init();
  }

  ngOnInit() {
    this.init();
  }

}
