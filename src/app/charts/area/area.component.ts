import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit, AfterViewInit {

  @Input("id")
  idChart: number = 0;

  @Input("data")
  data: { fullName: string; abbrev: string; percent: number; days: number; quantity: number; }[] = [];

  private svg: any;
  private margin = 20;
  private width = 200 - (this.margin * 2);
  private height = 150 - (this.margin * 2);

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    this.createSVG();
    this.drawArea();
  }

  private createSVG(): void {
    this.svg = d3.select("figure#area" + this.idChart)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height + this.margin * 2)
      .append("g")
      .attr("transform",
        "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawArea() {

    // Add X axis --> it is a date format
    const x = d3.scaleTime()
      .domain([0, 100])
      .range([0, this.width]);
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0]);
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Add the area
    this.svg.append("path")
      .datum(this.data)
      .attr("fill", "#cce5df")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.area()
        .x((d: any) => x(d.abbrev))
        .y0(y(0))
        .y1((d: any) => y(d.percent))
      )
  }
}
