import {Component, HostListener, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {TranslateService} from 'ng2-translate';
import { Http, HttpModule } from '@angular/http';
@Component({
  selector: 'app-chart3',
  templateUrl: './chart3.component.html',
  styleUrls: ['./chart3.component.css']
})
export class Chart3Component implements OnInit {
  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('ja');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('ja');

  }
  public w;
  public h;
  public dataY;
  public dataX;
  public svg;
  public title;
  public des;
  ngOnInit() {

    const elmnt = document.getElementById('graphic3');
    this.w = elmnt.offsetWidth;
    this.w = document.getElementById('graphic3-box').offsetWidth;

    this.h = 450;
    this.dataY = [0, 250, 500, 750, 1000];
    this.dataX = {'val': [8, 9, 10, 11, 12, 1], 'year': [2014, 2014, 2014, 2014, 2014, 2015]};
    this.svg = d3.select('#graphic3')
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
    this.translate.get(['chart-3.title', 'chart-3.des']).subscribe((res: string) => {
      this.title = res['chart-3.title'];
      this.des = res['chart-3.des'];
      this.renderChart(this.w, this.h, this.dataY, this.dataX, this.svg, fakeRed, fakeBlue, fakeGray);
    });
    this.drawLine(this.svg, fakeRed, this.w, '250', 'red');
    this.drawLine(this.svg, fakeBlue, this.w, '190', 'blue');
    this.drawLine(this.svg, fakeGray, this.w, '140', 'gray');
  }

  renderChart(w, h, dataY, dataX, svg, fakeRed, fakeBlue, fakeGray ) {
    let yScale, yAxis, xScale, xAxis;

    svg.attr('width', parseInt(d3.select('#graphic3-box').style('width')));

    yScale = d3.scaleLinear()
      .domain([d3.min(dataY), d3.max(dataY)])
      .range([h - 50, 100]);

    yAxis = d3.axisRight()
      .scale(yScale)
      .ticks(5)
      .tickFormat(d => d + '平');

    svg.append('g')
      .attr('class', 'gY ')
      .attr('transform', 'translate(' + (w - 70) + ', -20)')
      .style('font-size', '20px')
      .attr('text-anchor', 'middle')
      .call(yAxis);

    xScale = d3.scaleBand()
      .domain(dataX.val)
      .range([40, w - 100]);

    xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(5)
      .tickFormat((d, i) => (d + '内'));



    svg.append('g')
      .attr('class', 'gX  ')
      .attr('transform', 'translate(0, 377)')
      .style('font-size', '20px')
      .call(xAxis);

    const tickText = d3.selectAll(`.graphic3 svg .gX .tick text`);
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
      .attr('class', 'line')
      .attr('style', 'fill: none;stroke: #eaeaea;stroke-width: 1.5px;')
      .attr('x1', 0)
      .attr('x2', w - 80)
      .attr('y1', 83)
      .attr('y2', 83);
    svg.append('line')
      .attr('class', 'line')
      .attr('style', 'fill: none;stroke: #eaeaea;stroke-width: 1.5px;')
      .attr('x1', 0)
      .attr('x2', w - 80)
      .attr('y1', 155)
      .attr('y2', 155);
    svg.append('line')
      .attr('class', 'line')
      .attr('style', 'fill: none;stroke: #eaeaea;stroke-width: 1.5px;')
      .attr('x1', 0)
      .attr('x2', w - 80)
      .attr('y1', 229)
      .attr('y2', 229);
    svg.append('line')
      .attr('class', 'line')
      .attr('style', 'fill: none;stroke: #eaeaea;stroke-width: 1.5px;')
      .attr('x1', 0)
      .attr('x2', w - 80)
      .attr('y1', 307)
      .attr('y2', 307);
    svg.append('line')
      .attr('class', 'line')
      .attr('style', 'fill: none;stroke: #eaeaea;stroke-width: 1.5px;')
      .attr('x1', 0)
      .attr('x2', w - 80)
      .attr('y1', 377)
      .attr('y2', 377);

    ////////////Add Title//////////////

    svg.append('text')
      .attr('x', (w / 2))
      .attr('text-anchor', 'middle')
      .style('font-size', '26px')
      .attr('y', 30)
      .text( this.title );
    console.log(this.title);
    svg.append('text')
      .attr('x', (w / 2))
      .attr('text-anchor', 'middle')
      .style('font-size', '26px')
      .attr('y', 60)
      .text(this.des);

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
      colorLine = 'lineRed';
      colorText = 'txtRed';
      text = '平均';
    } else if (check === 'blue') {
      colorLine = 'lineBlue';
      colorText = 'txtBlue';
      text = '自社';
    } else {
      colorLine = 'lineGray';
      colorText = 'txtGray';
      text = 'TOP';
    }
    const valueline = d3.line()
      .x(function(d) { return (d.x); })
      .y(function(d) { return (d.y); });
    svg.append('path')
      .data([data])
      .attr('class', colorLine)
      .attr('d', valueline)
      .attr('style', 'fill: none; stroke: ' + check + ';stroke-width: 1.5px;');
    svg.append('text')
      .attr('class', colorText)
      .attr('transform', 'translate(' + (w - 70) + ', ' + h + ')')
      .attr('style', 'fill:' + check + ';font-weight: bold;')
      .attr('text-anchor', 'middle')
      .text(text);
  }

  toolTip(svg, div, data, color) {
    svg.selectAll('#graphic3 dot')
      .data(data)
      .enter().append('circle')
      .attr('r', 3)
      .attr('class', color)
      .attr('cx', function(d) { return (d.x); })
      .attr('cy', function(d) { return (d.y); })
      .on('mouseover', function() {
        div .attr('addcss', color)
        d3.select(' #graphic3 .mouse-line')
          .style('opacity', '1');
        d3.selectAll('#graphic3 .mouse-per-line circle')
          .style('opacity', '1');
        d3.selectAll('#graphic3 .mouse-per-line text')
          .style('opacity', '1');
        return div.style('opacity', 1);
      })
      .on('mousemove', function(d) {
        const mouse = d3.mouse(this);
        const value = (300 - (d.y - 83)) / 300 * 40;
        const number = value.toFixed(2);
        div	.html('2018事' + (d.month) + '者 12 事' + '<br/>'  + number + '%')
        d3.select('#graphic3 .mouse-line')
          .attr('d', function() {
            let d = 'M' + mouse[0] + ',' + 377;
            d += ' ' + mouse[0] + ',' + 83;
            return d;
          });
        return div.style('top', (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px');
      })
      .on('mouseout', function() {
        d3.select('#graphic3 .mouse-line')
          .style('opacity', '0');
        d3.selectAll('#graphic3 .mouse-per-line circle')
          .style('opacity', '0');
        d3.selectAll('#graphic3 .mouse-per-line text')
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
  btnPreview3() {
    d3.selectAll('#graphic3 svg > *').remove();
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
      { 'month': this.dataX.val[0], 'x': 40, 'y': this.getRandomInt(280, 300)},
      { 'month': this.dataX.val[1], 'x': (this.w - 140) / 4 + 40, 'y': this.getRandomInt(270, 290)},
      { 'month': this.dataX.val[2], 'x': (this.w - 140) / 4 * 2 + 40, 'y': this.getRandomInt(260, 270)},
      { 'month': this.dataX.val[3], 'x': (this.w - 140) / 4 * 3 + 40, 'y': this.getRandomInt(240, 260)},
      { 'month': this.dataX.val[4], 'x': this.w - 100, 'y': yRed}];
    const fakeBlue =  [
      { 'month': this.dataX.val[0], 'x': 40, 'y': this.getRandomInt(200, 250)},
      { 'month': this.dataX.val[1], 'x': (this.w - 140) / 4 + 40, 'y': this.getRandomInt(180, 230)},
      { 'month': this.dataX.val[2], 'x': (this.w - 140) / 4 * 2 + 40, 'y': this.getRandomInt(190, 210)},
      { 'month': this.dataX.val[3], 'x': (this.w - 140) / 4 * 3 + 40, 'y': this.getRandomInt(180, 190)},
      { 'month': this.dataX.val[4], 'x': this.w - 100 , 'y': yBlue}];
    const fakeGray =  [ { 'month': this.dataX.val[0], 'x': 40, 'y': this.getRandomInt(100, 200)},
      { 'month': this.dataX.val[1], 'x': (this.w - 140) / 4 + 40, 'y': this.getRandomInt(100, 170)},
      { 'month': this.dataX.val[2], 'x': (this.w - 140) / 4 * 2 + 40, 'y': this.getRandomInt(100, 150)},
      { 'month': this.dataX.val[3], 'x': (this.w - 140) / 4 * 3 + 40, 'y': this.getRandomInt(100, 140)},
      { 'month': this.dataX.val[4], 'x': this.w - 100 , 'y': yGray}];
    this.renderChart(this.w, this.h, this.dataY, dataX, this.svg, fakeRed, fakeBlue, fakeGray);
    this.drawLine(this.svg, fakeRed, this.w, yRed, 'red');
    this.drawLine(this.svg, fakeBlue, this.w, yBlue, 'blue');
    this.drawLine(this.svg, fakeGray, this.w, yGray, 'gray');
  }
  btnNext3() {
    d3.selectAll('#graphic3 svg > *').remove();
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
    const fakeGray =  [ { 'month': this.dataX.val[0], 'x': 40, 'y': this.getRandomInt(100, 200)},
      { 'month': dataX.val[1], 'x': (this.w - 140) / 4 + 40, 'y': this.getRandomInt(100, 170)},
      { 'month': dataX.val[2], 'x': (this.w - 140) / 4 * 2 + 40, 'y': this.getRandomInt(100, 150)},
      { 'month': dataX.val[3], 'x': (this.w - 140) / 4 * 3 + 40, 'y': this.getRandomInt(100, 140)},
      { 'month': dataX.val[4], 'x': this.w - 100 , 'y': yGray}];
    this.renderChart(this.w, this.h, this.dataY, dataX, this.svg, fakeRed, fakeBlue, fakeGray);
    this.drawLine(this.svg, fakeRed, this.w, yRed, 'red');
    this.drawLine(this.svg, fakeBlue, this.w, yBlue, 'blue');
    this.drawLine(this.svg, fakeGray, this.w, yGray, 'gray');
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    d3.selectAll('#graphic3 svg > *').remove();
   // console.log(this.w+'i')
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
    const fakeGray =  [ { 'month': this.dataX.val[0], 'x': 40, 'y': this.getRandomInt(100, 200)},
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
