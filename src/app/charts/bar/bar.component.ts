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
  private height = 120 - (this.margin * 2);

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
      .call(d3.axisBottom(x).tickSize(0).tickSizeOuter(0).tickPadding(10))
      .call((g: any) => g.select(".domain").remove())
      .call((g: any) => g.selectAll("text").attr("fill", "#c2c2c2"))

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
      .attr("height", (d: any) => this.height - y(d.percent))
      .attr("fill", "#09baa8");

    this.svg.selectAll("bars")
      .data(data).enter()
      .append("text")
      .text((d: any) => d.percent + "%")
      .attr("x", (d: any) => x(d.abbrev.toUpperCase())! + x.bandwidth() / 2)
      .attr("y", (d: any) => y(d.percent) - 5)
      .attr("font-family", "sans-serif")
      .attr("font-size", "10px")
      .attr("fill", "#c2c2c2")
      .attr("text-anchor", "middle");
  }
}
