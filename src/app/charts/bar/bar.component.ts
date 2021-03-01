import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit, AfterViewInit {

  @Input('data')
  data: [] = [];

  @Input('id')
  idChart: number = 0;

  private svg: any;
  private margin = 20;
  private width = 200 - (this.margin * 2);
  private height = 150 - (this.margin * 2);

  colors: any;

  constructor() { }


  ngAfterViewInit() {
    if (this.data.length > 0) {
      this.createSvg();
      this.drawBars(this.data);

    }
  }


  ngOnInit(): void {

  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar" + this.idChart)
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Add X axis
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.abbrev.toUpperCase()))
      .padding(0.2);

    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0]);

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.abbrev.toUpperCase()))
      .attr("y", (d: any) => y(d.percent))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => {
        return this.height - y(d.percent)
      })
      .attr("fill", "#09baa8");
  }
}
