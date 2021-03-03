import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { color } from 'd3';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss']
})
export class DoughnutComponent implements OnInit, AfterViewInit {

  @Input('percent')
  percent: number = 0;

  @Input('month')
  month: string = '';

  @Input('color')
  color: string = "#09baa8";

  @Input('id')
  idChart: number = 0;


  svg: any;

  width = 175;
  height = 150;
  angleBase = Math.PI / 2;
  outerRadius = 75;
  innerRadius = 55;


  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.createSvg();

    this.drawChart();
  }

  private createSvg(): void {

    this.svg = d3.select("figure#doughnut" + this.idChart).append("svg")
      .attr("width", this.width)
      .attr("height", this.height / 2)
      .append("g")
      .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");


  }

  private drawChart(): void {

    const arcForeground = d3.arc()
      .outerRadius(this.outerRadius)
      .innerRadius(this.innerRadius)
      .startAngle(-Math.PI / 2)
      .endAngle((-Math.PI / 2) + (Math.PI * (this.percent / 100)));

    const arcLineThreshold = d3.arc()
      .outerRadius(this.outerRadius + 5)
      .innerRadius(this.innerRadius - 5)
      .startAngle((-Math.PI / 2) + (Math.PI * (70 / 100)))
      .endAngle((-Math.PI / 2) + (Math.PI * (70.5 / 100)));

    const arcBG = d3.arc()
      .outerRadius(this.outerRadius)
      .innerRadius(this.innerRadius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    // Background arc
    this.svg.append("path")
      .attr("fill", "#292929")
      .attr("d", (d: any) => arcBG(d));

    // foreground arc (actual percentage value)
    this.svg.append("path")
      .attr("fill", this.color)
      .attr("d", (d: any) => arcForeground(d));
    // foreground arc (actual percentage value)

    this.svg.append("path")
      .attr("fill", "#fff")
      .attr("d", (d: any) => arcLineThreshold(d));

    this.svg.append('text')
      .datum(this.percent)
      .text((d: any) => d + "%")
      .attr("class", 'percentText')
      .attr("text-anchor", 'middle')
      .attr("fill", this.color)
      .attr("font-size", '30px')
      .attr("dy", 0)
      .attr("dx", 5)

    this.svg.append('text')
      .datum(70)
      .text((d: any) => d + "%")
      .attr("class", 'percentText')
      .attr("text-anchor", 'middle')
      .attr("fill", "#fff")
      .attr("font-size", '12px')
      .attr("dy", -65)
      .attr("dx", 65)

  }

}
