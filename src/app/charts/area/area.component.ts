import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import FakeData from 'src/app/interfaces/fake-data';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit, AfterViewInit {

  @Input("id")
  idChart: number = 0;

  @Input("data")
  data: FakeData[] = [];

  private svg: any;
  margin = { top: 10, right: 10, bottom: 10, left: 10 };
  width = 275 - this.margin.left - this.margin.right;
  height = 200 - this.margin.top - this.margin.bottom;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log(this.data)
    this.createSVG();
    this.drawArea();
  }

  private createSVG(): void {
    this.svg = d3.select("figure#area" + this.idChart)
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  private drawArea() {

    // Add X axis --> it is a date format
    const x = d3.scaleLinear()
      .domain([0, this.data.length - 1])
      .range([this.margin.left * 4, this.width - this.margin.right * 2])

    this.svg.append("g")
      .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(x)
        .ticks(4)
        .tickSize(0)
        .tickPadding(12)
        .tickFormat(x => this.data[Number(x)].abbrev.toUpperCase()))
      .call((g: any) => g.select(".domain").remove())
      .call((g: any) => g.selectAll("text").attr("fill", "#c2c2c2"))



    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height - this.margin.bottom, this.margin.top * 2])

    this.svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${this.margin.left * 2},0)`)
      .call(d3.axisLeft(y)
        .ticks(5)
        .tickSize(-this.width + this.margin.right + this.margin.left)
        .tickFormat(x => `${x}%`)
      )
      .call((g: any) => g.select(".domain").remove())
      .call((g: any) => g.selectAll("text").attr("fill", "#c2c2c2"))


    // Add the area
    this.svg.append("path")
      .datum(this.data)
      .attr("fill", "#09baa8")
      .attr("fill-opacity", .4)
      .attr("stroke", "#09baa8")
      .attr("stroke-width", 1.5)
      .attr("d", d3.area()
        .x((d, i) => x(i))
        .y0(y(0))
        .y1((d: any) => y(d.percent))
      )

    // Add the line on the top area
    this.svg.append("path")
      .datum(this.data)
      .attr("fill", "none")
      .attr("stroke", "#09baa8")
      .attr("stroke-width", 2)
      .attr("d", d3.line()
        .x((d: any, i) => x(i))
        .y((d: any) => y(d.percent))
      )

    // Add the line data points
    this.svg.selectAll("dataPoints")
      .data(this.data)
      .enter()
      .append("circle")
      .attr("fill", "#000000")
      .attr("stroke", "#09baa8")
      .attr("stroke-width", 2)
      .attr("cx", (d: any, i: number) => x(i))
      .attr("cy", (d: any) => y(d.percent))
      .attr("r", 3)

  }
}
