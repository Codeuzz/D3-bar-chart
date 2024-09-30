import './style.css'
import * as d3 from 'd3';

document.querySelector('#app').innerHTML = `
  <h1 id='title'>United States GDP</h1>
  <div id="container"></div>
  <div id='tooltip'></div>
`

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
.then(res => {
  if(res.ok) {
    return res.json();
  } else {
    throw new Error('Not ok')
  }
})
.then(data => {
  makeSvg(data)
  makeAxis(data)
  if(scale && scale2) {
   barMan(data)

  }

})

const height = 500;
const width = 900;
const padding = 40;


const makeSvg = (data) => {
 const donnee = data.data.map(d => d)

  const svg =  d3.select('#container')
    .append('svg')
    .attr('height', height + 40)
    .attr('width', width)
    // .style('border', '1px solid white')
    
}


const getYear = (dateString) => {
  const year = parseInt(dateString.split('-')[0], 10)
  return year
}

let scale, scale2;
const makeAxis = (data) => {
  const donnee = data.data.map(d => d)
  const svg = d3.select('svg')

  

   scale = d3.scaleLinear()
  .domain([1947, 2016])  
  .range([padding, width]);

  const axisX = d3.axisBottom(scale);
  svg.append('g')
  .attr("transform", `translate(0, ${height - padding})`)
  .attr('id', 'x-axis')
  .call(axisX);

  scale2 = d3.scaleLinear()
  .domain([0, d3.max(donnee.map(d => d[1]))])
  .range([height - padding, padding])

  const axisY = d3.axisLeft(scale2)
  svg.append('g')
      .attr("transform", `translate(${padding}, 0)`)
      .attr('id', 'y-axis')
      .call(axisY);


}



const barMan = (data) => {
 const donnee = data.data.map(d => d)
 const svg = d3.select('svg')

 const getQuarter = (dateString) => {
  const month = parseInt(dateString.split('-')[1], 10); 
  const year = getYear(dateString)
  if (month >= 1 && month <= 3) return { year: year, quarter: 'Q1', offset: 0};
  if (month >= 4 && month <= 6) return { year: year, quarter: 'Q2', offset: 0.25 };
  if (month >= 7 && month <= 9) return { year: year, quarter: 'Q3', offset: 0.5 };
  return { year: year, quarter: 'Q4', offset: 0.75 }
};

 const tooltip = d3.select('#tooltip')

 svg.selectAll('rect')
 .data(donnee)
 .enter()
 .append('rect')
 .style('width', 3)
 .style('height', d => `${d[1] / (padding + 3)}px`)
 .attr('class', 'bar')
 .attr('x', (d, i) => {
    const {year, offset} = getQuarter(d[0])
    
    return scale(year) + (offset * (scale(1948) - scale(1947)))
 })
 .attr("y", d => scale2(d[1]))
 .attr('fill', 'aqua')
 .on('mouseover', (event, d) => {
  const { quarter, year } = getQuarter(d[0]);
  tooltip.style('visibility', 'visible')
         .html(`${year} ${quarter} <br> $${d[1].toLocaleString('us-US')} Billion`)
         .style('top', `${height - padding - 50}px`)
         .style('left', `${event.pageX + padding}px`);
  })
 .on('mouseout', () => {
  tooltip.style('visibility', 'hidden'); 
  });
 

  d3.select('svg')
  .append('text')
  .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
  .attr('x', 470 )
  .attr('y', height + 30)
  .attr('fill', 'white')

  d3.select('svg')
  .append('text')
  .text('Gross Domestic Product')
  .attr('x', -260)
  .attr('y', 70)
  .attr('fill', 'white')
  .attr('transform', 'translate(10, 20) rotate(-90)')
  .style('font-size', '20px')
  
}






