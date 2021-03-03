import { Component } from '@angular/core';

import FakeData from './interfaces/fake-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'acme-dash';

  topCards = ["AMS[%]",
    "AMC[%]",
    "APM[%]",
    "HH DE MAN. SISTEMATICA x HH TOTAL[%]",
    "APROPRIAÇÃO DE MÃO DE OBRA[%]"]


  bottomCards = [{ "label": "BACKLOG [dias]", "type": "days" },
  { "label": "NOTAS/OM'S SEM PLANEJAMENTO [Qtd.]", "type": "quantity" },
  { "label": "AD. AO MAPA DE 52 SEMANA [%]", "type": "percent" },
  { "label": "PAMS [%]", "type": "percent" }]

  bottomData = this.getRandomDataMonthly();

  getRandomData(items: string[]) {
    let data: any = [];

    items.forEach(item => {
      data.push({
        "label": item,
        "data": this.getRandomDataMonthly()
      })
    });

    return data;
  }

  getRandomDataMonthly(): FakeData[] {
    const color = () => {
      return (Math.random() * 100) > 50 ? "#2ab315" : "#d92754";
    }

    const numberValue = (multiply: number) => Math.floor((Math.random() * multiply));

    return [
      { "fullName": "janeiro", "abbrev": "jan", "color": color(), "percent": numberValue(100), "days": numberValue(1000), "quantity": numberValue(100) },
      { "fullName": "fevereiro", "abbrev": "fev", "color": color(), "percent": numberValue(100), "days": numberValue(1000), "quantity": numberValue(100) },
      { "fullName": "março", "abbrev": "mar", "color": color(), "percent": numberValue(100), "days": numberValue(1000), "quantity": numberValue(100) },
      { "fullName": "abril", "abbrev": "abr", "color": color(), "percent": numberValue(100), "days": numberValue(1000), "quantity": numberValue(100) },
      { "fullName": "maio", "abbrev": "mai", "color": color(), "percent": numberValue(100), "days": numberValue(1000), "quantity": numberValue(100) }
    ]
  }




}
