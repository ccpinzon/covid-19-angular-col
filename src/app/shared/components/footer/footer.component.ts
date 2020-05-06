import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  year;
  developers = [
    {name: 'Cristhian Rodríguez', github: 'https://github.com/ccpinzon'},
    {name: 'Laura Botia', github: 'https://github.com/lbotia'},
    {name: 'Jhon Puentes', github: 'https://github.com/jfreddypuentes'},
    {name: 'Mónica Carvajal', github: 'https://github.com/monik182'}
  ];
  constructor() { }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

}
