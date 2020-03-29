import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  title = 'Preguntas frecuentes acerca del Covid-19';

  info = [
    {
      id: 0,
      question: '¿Qué es la COVID-19?',
      answer: 'La COVID-19 es la enfermedad infecciosa causada por el coronavirus que se ha descubierto más recientemente. ' +
        'Tanto el nuevo virus como la enfermedad eran desconocidos antes de que estallara el brote en Wuhan (China) en diciembre de 2019.',
      chart: null,
      sources: [
        {
          description: 'OMS',
          link: 'https://www.who.int/es/emergencies/diseases/novel-coronavirus-2019/advice-for-public/q-a-coronaviruses'
        }
      ]
    },
    {
      id: 1,
      question: '¿Cuáles son los síntomas de la COVID-19?',
      answer: 'Los síntomas más comunes de la COVID-19 son fiebre, cansancio y tos seca. Algunos pacientes pueden presentar dolores, ' +
        'congestión nasal, rinorrea, dolor de garganta o diarrea. Estos síntomas suelen ser leves y aparecen de forma gradual. ' +
        'Algunas personas se infectan pero no desarrollan ningún síntoma y no se encuentran mal. La mayoría de las personas ' +
        '(alrededor del 80%) se recupera de la enfermedad sin necesidad de realizar ningún tratamiento especial. Alrededor de 1 de cada 6 ' +
        'personas que contraen la COVID-19 desarrolla una enfermedad grave y tiene dificultad para respirar. Las personas mayores y las que ' +
        'padecen afecciones médicas subyacentes, como hipertensión arterial, problemas cardiacos o diabetes, tienen más probabilidades de ' +
        'desarrollar una enfermedad grave. En torno al 2% de las personas que han contraído la enfermedad han muerto. Las personas que ' +
        'tengan fiebre, tos y dificultad para respirar deben buscar atención médica.',
      chart: {
        name: 'covid-19-symptoms',
        title: 'Síntomas del Covid-19',
        chartData: {
          type: 'bar',
          data: {
            labels: [
              'Fiebre',
              'Tos Seca',
              'Fatiga',
              'Producción de Esputo',
              'Dificultad para respirar',
              'Dolor muscular o de articulaciones',
              'Dolor de garganta',
              'Dolor de cabeza',
              'Escalofríos',
              'Nauseas o vómito',
              'Congestión nasal',
              'Diarrea'],
            datasets: [{
              label: 'Síntomas (%)',
              data: [
                87.9,
                67.7,
                38.1,
                33.4,
                18.6,
                14.8,
                13.9,
                13.6,
                11.4,
                5,
                4.8,
                3.7
              ],
              backgroundColor: 'rgba(231, 76, 60, 0.3)',
              borderColor: 'rgba(231, 76, 60, 1)',
              borderWidth: 1
            }]
          }
        }
      },
      sources: [
        {
          description: 'OMS',
          link: 'https://www.who.int/es/emergencies/diseases/novel-coronavirus-2019/advice-for-public/q-a-coronaviruses'
        },
        {
          description: 'Our World in Data',
          link: 'https://ourworldindata.org/coronavirus'
        }
      ]
    },
    {
      id: 2,
      question: '¿Cómo se propaga la COVID-19?',
      answer: 'Una persona puede contraer la COVID-19 por contacto con otra que esté infectada por el virus. ' +
        'La enfermedad puede propagarse de persona a persona a través de las gotículas procedentes de la nariz o la boca que salen ' +
        'despedidas cuando una persona infectada tose o exhala. Estas gotículas caen sobre los objetos y superficies que rodean a la ' +
        'persona, de modo que otras personas pueden contraer la COVID-19 si tocan estos objetos o superficies y luego se tocan los ojos, ' +
        'la nariz o la boca. También pueden contagiarse si inhalan las gotículas que haya esparcido una persona con COVID-19 al toser o' +
        ' exhalar. Por eso es importante mantenerse a más de 1 metro (3 pies) de distancia de una persona que se encuentre enferma.',
      chart: null,
      sources: [
        {
          description: 'OMS',
          link: 'https://www.who.int/es/emergencies/diseases/novel-coronavirus-2019/advice-for-public/q-a-coronaviruses'
        }
      ]
    },
    {
      id: 3,
      question: '¿Qué puedo hacer para protegerme y prevenir la propagación de la enfermedad?',
      answer: 'Una persona puede contraer la COVID-19 por contacto con otra que esté infectada por el virus. ' +
        'La enfermedad puede propagarse de persona a persona a través de las gotículas procedentes de la nariz o la boca que salen ' +
        'despedidas cuando una persona infectada tose o exhala. Estas gotículas caen sobre los objetos y superficies que rodean a la ' +
        'persona, de modo que otras personas pueden contraer la COVID-19 si tocan estos objetos o superficies y luego se tocan los ojos, ' +
        'la nariz o la boca. También pueden contagiarse si inhalan las gotículas que haya esparcido una persona con COVID-19 al toser o' +
        ' exhalar. Por eso es importante mantenerse a más de 1 metro (3 pies) de distancia de una persona que se encuentre enferma.',
      chart: null,
      sources: [
        {
          description: 'OMS',
          link: 'https://www.who.int/es/emergencies/diseases/novel-coronavirus-2019/advice-for-public/q-a-coronaviruses'
        }
      ]
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
