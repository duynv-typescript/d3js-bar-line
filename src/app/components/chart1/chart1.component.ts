import {Component, HostListener, OnInit} from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})
export class Chart1Component implements OnInit {
  constructor() { }
  public w;
  public h;
  public dataY;
  public dataX;
  public svg;
  ngOnInit() {
    const elmnt = document.getElementById('graphic');
    this.w = elmnt.offsetWidth;
    this.w = document.getElementById('graphic-box').offsetWidth;
    this.h = 450;
    this.dataY = [0, 10, 20, 30, 40];
    this.dataX = {'val': [8, 9, 10, 11, 12,], 'year': [2014, 2014, 2014, 2014, 2014]};
    this.svg = d3.select('#graphic')
      .append('svg')
      .attr('width', this.w)
      .attr('height', this.h);
    const fakeRed =  [
      { 'month': this.dataX.val[0], 'x': 40, 'y': 290},
      { 'month': this.dataX.val[1], 'x': (this.w - 140) / 4 + 40, 'y': 280},
      { 'month': this.dataX.val[2], 'x': (this.w - 140) / 4 * 2 + 40, 'y': 260},
      { 'month': this.dataX.val[3], 'x': (this.w - 140) / 4 * 3 + 40, 'y': 270},
      { 'month': this.dataX.val[4], 'x': this.w - 100, 'y': 250}];
    const fakeBlue =  [
      { 'month': this.dataX.val[0], 'x': 40, 'y': 280},
      { 'month': this.dataX.val[1], 'x': (this.w - 140) / 4 + 40, 'y': 240},
      { 'month': this.dataX.val[2], 'x': (this.w - 140) / 4 * 2 + 40, 'y': 220},
      { 'month': this.dataX.val[3], 'x': (this.w - 140) / 4 * 3 + 40, 'y': 200},
      { 'month': this.dataX.val[4], 'x': this.w - 100 , 'y': 190}];
    const fakeGray =  [
      { 'month': this.dataX.val[0], 'x': 40, 'y': 200},
      { 'month': this.dataX.val[1], 'x': (this.w - 140) / 4 + 40, 'y': 180},
      { 'month': this.dataX.val[2], 'x': (this.w - 140) / 4 * 2 + 40, 'y': 170},
      { 'month': this.dataX.val[3], 'x': (this.w - 140) / 4 * 3 + 40, 'y': 160},
      { 'month': this.dataX.val[4], 'x': this.w - 100 , 'y': 140}];
    this.renderChart(this.w, this.h, this.dataY, this.dataX, this.svg, fakeRed, fakeBlue, fakeGray);
    this.drawLine(this.svg, fakeRed, this.w, '250', 'red');
    this.drawLine(this.svg, fakeBlue, this.w, '190', 'blue');
    this.drawLine(this.svg, fakeGray, this.w, '140', 'gray');
  }
  renderChart(w, h, dataY, dataX, svg, fakeRed, fakeBlue, fakeGray) {
    let yScale, yAxis, xScale, xAxis;
    yScale = d3.scaleLinear()
      .domain([d3.min(dataY), d3.max(dataY)])
      .range([h - 50, 100]);

    yAxis = d3.axisRight()
      .scale(yScale)
      .ticks(5)
      .tickFormat(d => d + '%');

    svg.append('g')
      .attr('class', 'gY')
      .attr('transform', 'translate(' + (w - 50) + ', -20)')
      .style('font-size', '20px')
      .attr('text-anchor', 'middle')
      .call(yAxis);

    xScale = d3.scaleBand()
      .domain(dataX.val)
      .range([40, w - 100]);

    xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(5)
      .tickFormat((d, i) =>  (d + '内' ));

    svg.append('g')
      .attr('class', 'gX  ')
      .attr('transform', 'translate(0, 377)')
      .style('font-size', '20px')
      .call(xAxis);

    svg.append('g')
      .attr('class', 'gX  ')
      .attr('transform', 'translate(0, 377)')
      .style('font-size', '20px')
      .call(xAxis);

    const tickText = d3.selectAll(`#graphic svg .gX .tick text`);
    if (tickText.select('tspan.tick-year').empty()) {
      tickText.append('tspan').data(dataX.val)
        .text((d,i) => {
          return (((i == 0 || i == dataX.val.length - 1)) ? dataX.year[i] : '');
        }).attr('class', 'tick-year')
        .attr('dy', '1em')
        .attr('x',     0);
    }
    ////////////Render x line fuzzy//////////////
    svg.append('line')
      .attr('style', 'fill: none;stroke: #eaeaea;stroke-width: 1.5px;')
      .attr('x1', 0)
      .attr('x2', w - 60)
      .attr('y1', 83)
      .attr('y2', 83);
    svg.append('line')
      .attr('style', 'fill: none;stroke: #eaeaea;stroke-width: 1.5px;')
      .attr('x1', 0)
      .attr('x2', w - 60)
      .attr('y1', 155)
      .attr('y2', 155);
    svg.append('line')
      .attr('style', 'fill: none;stroke: #eaeaea;stroke-width: 1.5px;')
      .attr('x1', 0)
      .attr('x2', w - 60)
      .attr('y1', 229)
      .attr('y2', 229);
    svg.append('line')
      .attr('style', 'fill: none;stroke: #eaeaea;stroke-width: 1.5px;')
      .attr('x1', 0)
      .attr('x2', w - 60)
      .attr('y1', 307)
      .attr('y2', 307);
    svg.append('line')
      .attr('style', 'fill: none;stroke: #eaeaea;stroke-width: 1.5px;')
      .attr('x1', 0)
      .attr('x2', w - 60)
      .attr('y1', 377)
      .attr('y2', 377);

    ////////////Add Title//////////////
    svg.append('text')
      .attr('x', (w / 2))
      .attr('text-anchor', 'middle')
      .style('font-size', '26px')
      .attr('y', 30)
      .text('アクティブユーザー411人');
    svg.append('text')
      .attr('x', (w / 2))
      .attr('text-anchor', 'middle')
      .style('font-size', '26px')
      .attr('y', 60)
      .text('2位／278社中');

    ////////////Add ToolTip and Line when Hover//////////////
    const div = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    const mouseG = svg.append('g')
      .attr('class', 'mouse-over-effects');
    mouseG.append('path') // this is the black vertical line to follow mouse
      .attr('class', 'mouse-line')
      .style('stroke', 'gray')
      .style('stroke-dasharray', '10,10')
      .style('opacity', '1');

    this.toolTip(svg, div, fakeRed, 'red');
    this.toolTip(svg, div, fakeBlue, 'blue');
    this.toolTip(svg, div, fakeGray, 'gray');

  }

  drawLine(svg, data, w, h, check) {
    let colorLine = '';
    let colorText = '';
    let text = '';
    if (check === 'red') {
      const valueline = d3.line()
        .x(function(d) { return (d.x); })
        .y(function(d) { return (d.y); });
      svg.append('path')
        .data([data])
        .attr('d', valueline)
        .attr('style', 'fill: none; stroke: red;stroke-width: 1.5px;');
      svg.append('text')
        .attr('style', 'fill:red;font-weight: bold;')
        .attr('transform', 'translate(' + (w - 70) + ', ' + h + ')')
        .attr('text-anchor', 'middle')
        .text('平均');
    } else if (check === 'blue') {
      const valueline = d3.line()
        .x(function(d) { return (d.x); })
        .y(function(d) { return (d.y); });
      svg.append('path')
        .data([data])
        .attr('d', valueline)
        .attr('style', 'fill: none; stroke: blue;stroke-width: 1.5px;');
      svg.append('text')
        .attr('style', 'fill:blue;font-weight: bold;')
        .attr('transform', 'translate(' + (w - 70) + ', ' + h + ')')
        .attr('text-anchor', 'middle')
        .text('自社');
    } else {
      const valueline = d3.line()
        .x(function(d) { return (d.x); })
        .y(function(d) { return (d.y); });
      svg.append('path')
        .data([data])
        .attr('d', valueline)
        .attr('style', 'fill: none; stroke: gray;stroke-width: 1.5px;');
      svg.append('text')
        .attr('style', 'fill:gray;font-weight: bold;')
        .attr('transform', 'translate(' + (w - 70) + ', ' + h + ')')
        .attr('text-anchor', 'middle')
        .text('TOP');
    }
  }

  toolTip(svg, div, data, color) {
    svg.selectAll('#graphic-box dot')
      .data(data)
      .enter().append('circle')
      .attr('r', 3)
      .attr('class', color)
      .attr('cx', function(d) { return (d.x); })
      .attr('cy', function(d) { return (d.y); })
      .on('mouseover', function() {
        div .attr('addcss', color)
        d3.select('.mouse-line')
          .style('opacity', '1');
        d3.selectAll('.mouse-per-line circle')
          .style('opacity', '1');
        d3.selectAll('.mouse-per-line text')
          .style('opacity', '1');
        return div.style('opacity', 1);
      })
      .on('mousemove', function(d) {
        const mouse = d3.mouse(this);
        const value = (300 - (d.y - 83)) / 300 * 40;
        const number = value.toFixed(2);
        div	.html('2018事' + (d.month) + '者 12 事' + '<br/>'  + number + '%')
        d3.select('#graphic-box .mouse-line')
          .attr('d', function() {
            let d = 'M' + mouse[0] + ',' + 377;
            d += ' ' + mouse[0] + ',' + 83;
            return d;
          });
        return div.style('top', (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px');
      })
      .on('mouseout', function() {
        d3.select('.mouse-line')
          .style('opacity', '0');
        d3.selectAll('.mouse-per-line circle')
          .style('opacity', '0');
        d3.selectAll('.mouse-per-line text')
          .style('opacity', '0');
        return div.style('opacity', 0);
      });
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  getRandomSetText(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  btnPreview() {
    d3.selectAll('#graphic svg > *').remove();
    this.w = document.getElementById('graphic3-box').offsetWidth;
    const dataX = {'val': [], 'year': []};
    // Fake data
    let randomDate = ((start, end) => {
      return new Date(+start + Math.random() * (+end - +start));
    });
    let date = randomDate(new Date('2010-01-01'), new Date('2020-01-01'));
    let count = 5;
    for (let i = 0; i < count; i++) {
      dataX.year.push((d3.timeFormat('%Y')(date)));
      dataX.val.push((d3.timeFormat('%m')(date)));
      date.setMonth(date.getMonth() + 1);
    }
    const yRed = this.getRandomSetText(230, 280); // Set position text
    const yBlue = this.getRandomSetText(160, 180); // Set position text
    const yGray = this.getRandomSetText(90, 140); // Set position text
    const fakeRed =  [
      { 'month': dataX.val[0], 'x': 40, 'y': this.getRandomInt(280, 300)},
      { 'month': dataX.val[1], 'x': (this.w - 140) / 4 + 40, 'y': this.getRandomInt(270, 290)},
      { 'month': dataX.val[2], 'x': (this.w - 140) / 4 * 2 + 40, 'y': this.getRandomInt(260, 270)},
      { 'month': dataX.val[3], 'x': (this.w - 140) / 4 * 3 + 40, 'y': this.getRandomInt(240, 260)},
      { 'month': dataX.val[4], 'x': this.w - 100, 'y': yRed}];
    const fakeBlue =  [
      { 'month': dataX.val[0], 'x': 40, 'y': this.getRandomInt(200, 250)},
      { 'month': dataX.val[1], 'x': (this.w - 140) / 4 + 40, 'y': this.getRandomInt(180, 230)},
      { 'month': dataX.val[2], 'x': (this.w - 140) / 4 * 2 + 40, 'y': this.getRandomInt(190, 210)},
      { 'month': dataX.val[3], 'x': (this.w - 140) / 4 * 3 + 40, 'y': this.getRandomInt(180, 190)},
      { 'month': dataX.val[4], 'x': this.w - 100 , 'y': yBlue}];
    const fakeGray =  [
      { 'month': dataX.val[0], 'x': 40, 'y': this.getRandomInt(100, 200)},
      { 'month': dataX.val[1], 'x': (this.w - 140) / 4 + 40, 'y': this.getRandomInt(100, 170)},
      { 'month': dataX.val[2], 'x': (this.w - 140) / 4 * 2 + 40, 'y': this.getRandomInt(100, 150)},
      { 'month': dataX.val[3], 'x': (this.w - 140) / 4 * 3 + 40, 'y': this.getRandomInt(100, 140)},
      { 'month': dataX.val[4], 'x': this.w - 100 , 'y': yGray}];
    this.renderChart(this.w, this.h, this.dataY, dataX, this.svg, fakeRed, fakeBlue, fakeGray);
    this.drawLine(this.svg, fakeRed, this.w, yRed, 'red');
    this.drawLine(this.svg, fakeBlue, this.w, yBlue, 'blue');
    this.drawLine(this.svg, fakeGray, this.w, yGray, 'gray');
  }
  btnNext() {
    d3.selectAll('#graphic svg > *').remove();
    this.w = document.getElementById('graphic3-box').offsetWidth;
    const dataX = {'val': [], 'year': []};
    // Fake data
    let randomDate = ((start, end) => {
      return new Date(+start + Math.random() * (+end - +start));
    });
    let date = randomDate(new Date('2010-01-01'), new Date('2020-01-01'));
    let count = 5;
    for (let i = 0; i < count; i++) {
      dataX.year.push((d3.timeFormat('%Y')(date)));
      dataX.val.push((d3.timeFormat('%m')(date)));
      date.setMonth(date.getMonth() + 1);
    }
    const yRed = this.getRandomSetText(230, 280); // Set position text
    const yBlue = this.getRandomSetText(160, 180); // Set position text
    const yGray = this.getRandomSetText(90, 140); // Set position text
    const fakeRed =  [
      { 'month':  dataX.val[0], 'x': 40, 'y': this.getRandomInt(280, 300)},
      { 'month':  dataX.val[1], 'x': (this.w - 140) / 4 + 40, 'y': this.getRandomInt(270, 290)},
      { 'month':  dataX.val[2], 'x': (this.w - 140) / 4 * 2 + 40, 'y': this.getRandomInt(260, 270)},
      { 'month':  dataX.val[3], 'x': (this.w - 140) / 4 * 3 + 40, 'y': this.getRandomInt(240, 260)},
      { 'month':  dataX.val[4], 'x': this.w - 100, 'y': yRed}];
    const fakeBlue =  [
      { 'month':  dataX.val[0], 'x': 40, 'y': this.getRandomInt(200, 250)},
      { 'month':  dataX.val[1], 'x': (this.w - 140) / 4 + 40, 'y': this.getRandomInt(180, 230)},
      { 'month':  dataX.val[2], 'x': (this.w - 140) / 4 * 2 + 40, 'y': this.getRandomInt(190, 210)},
      { 'month':  dataX.val[3], 'x': (this.w - 140) / 4 * 3 + 40, 'y': this.getRandomInt(180, 190)},
      { 'month':  dataX.val[4], 'x': this.w - 100 , 'y': yBlue}];
    const fakeGray =  [
      { 'month':  dataX.val[0], 'x': 40, 'y': this.getRandomInt(100, 200)},
      { 'month':  dataX.val[1], 'x': (this.w - 140) / 4 + 40, 'y': this.getRandomInt(100, 170)},
      { 'month':  dataX.val[2], 'x': (this.w - 140) / 4 * 2 + 40, 'y': this.getRandomInt(100, 150)},
      { 'month':  dataX.val[3], 'x': (this.w - 140) / 4 * 3 + 40, 'y': this.getRandomInt(100, 140)},
      { 'month':  dataX.val[4], 'x': this.w - 100 , 'y': yGray}];
    this.renderChart(this.w, this.h, this.dataY, dataX, this.svg, fakeRed, fakeBlue, fakeGray);
    this.drawLine(this.svg, fakeRed, this.w, yRed, 'red');
    this.drawLine(this.svg, fakeBlue, this.w, yBlue, 'blue');
    this.drawLine(this.svg, fakeGray, this.w, yGray, 'gray');
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    d3.selectAll('#graphic svg > *').remove();
    this.w = document.getElementById('graphic-box').offsetWidth;
    this.w = document.getElementById('graphic3-box').offsetWidth;
    const dataX = {'val': [], 'year': []};
    // Fake data
    let randomDate = ((start, end) => {
      return new Date(+start + Math.random() * (+end - +start));
    });
    let date = randomDate(new Date('2010-01-01'), new Date('2020-01-01'));
    let count = 5;
    for (let i = 0; i < count; i++) {
      dataX.year.push((d3.timeFormat('%Y')(date)));
      dataX.val.push((d3.timeFormat('%m')(date)));
      date.setMonth(date.getMonth() + 1);
    }
    const yRed = this.getRandomSetText(230, 280); // Set position text
    const yBlue = this.getRandomSetText(160, 180); // Set position text
    const yGray = this.getRandomSetText(90, 140); // Set position text
    const fakeRed =  [
      { 'month': dataX.val[0], 'x': 40, 'y': this.getRandomInt(280, 300)},
      { 'month': dataX.val[1], 'x': (this.w - 140) / 4 + 40, 'y': this.getRandomInt(270, 290)},
      { 'month': dataX.val[2], 'x': (this.w - 140) / 4 * 2 + 40, 'y': this.getRandomInt(260, 270)},
      { 'month': dataX.val[3], 'x': (this.w - 140) / 4 * 3 + 40, 'y': this.getRandomInt(240, 260)},
      { 'month': dataX.val[4], 'x': this.w - 100, 'y': yRed}];
    const fakeBlue =  [
      { 'month': dataX.val[0], 'x': 40, 'y': this.getRandomInt(200, 250)},
      { 'month': dataX.val[1], 'x': (this.w - 140) / 4 + 40, 'y': this.getRandomInt(180, 230)},
      { 'month': dataX.val[2], 'x': (this.w - 140) / 4 * 2 + 40, 'y': this.getRandomInt(190, 210)},
      { 'month': dataX.val[3], 'x': (this.w - 140) / 4 * 3 + 40, 'y': this.getRandomInt(180, 190)},
      { 'month': dataX.val[4], 'x': this.w - 100 , 'y': yBlue}];
    const fakeGray =  [
      { 'month': dataX.val[0], 'x': 40, 'y': this.getRandomInt(100, 200)},
      { 'month': dataX.val[1], 'x': (this.w - 140) / 4 + 40, 'y': this.getRandomInt(100, 170)},
      { 'month': dataX.val[2], 'x': (this.w - 140) / 4 * 2 + 40, 'y': this.getRandomInt(100, 150)},
      { 'month': dataX.val[3], 'x': (this.w - 140) / 4 * 3 + 40, 'y': this.getRandomInt(100, 140)},
      { 'month': dataX.val[4], 'x': this.w - 100 , 'y': yGray}];
    this.renderChart(this.w, this.h, this.dataY, dataX, this.svg, fakeRed, fakeBlue, fakeGray);
    this.drawLine(this.svg, fakeRed, this.w, yRed, 'red');
    this.drawLine(this.svg, fakeBlue, this.w, yBlue, 'blue');
    this.drawLine(this.svg, fakeGray, this.w, yGray, 'gray');
  }
}
