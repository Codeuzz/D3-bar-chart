import './style.css'
import * as d3 from 'd3';

document.querySelector('#app').innerHTML = `
  <h1>United States GDP</h1>
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
  barMan(data)
  makeAxis(data)

})

const height = 500;
const width = 899;
const padding = 40;


const makeSvg = (data) => {
 const donnee = data.data.map(d => d)

  const svg =  d3.select('#app')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .style('border', '1px solid white')

}

//        NEED TO DO GETYEAR FUNCTION TO ADD IT TO BOTTOM SCALE DOMAIN AND REUSE IT IN GETQUARTER ??

// const getYear = (dateString) => {
//   const year = parseInt(dateString.split('-')[0], 10)
//   return year
// }

const makeAxis = (data) => {
  const donnee = data.data.map(d => d)
  const svg = d3.select('svg')

  

  const scale = d3.scaleLinear()
  .domain([1947, 2016])  
  .range([padding, width - padding]);

  const axisX = d3.axisBottom(scale);
  svg.append('g')
  .attr("transform", `translate(0, ${height - padding})`)
  .call(axisX);

  const scale2 = d3.scaleLinear()
  .domain([0, d3.max(donnee.map(d => d[1]))])
  .range([height - padding, padding])
  // console.log(d3.max(donnee.map(d => d[1])))
  const axisY = d3.axisLeft(scale2)
  svg.append('g')
      .attr("transform", `translate(${padding}, 0)`)
      .call(axisY);
}



const barMan = (data) => {
 const donnee = data.data.map(d => d)
 const svg = d3.select('svg')

 const getQuarter = (dateString) => {
  const month = parseInt(dateString.split('-')[1], 10); 
  const year = parseInt(dateString.split('-')[0], 10)
  if (month >= 1 && month <= 3) return year + ' Q1';
  if (month >= 4 && month <= 6) return year + ' Q2';
  if (month >= 7 && month <= 9) return year + ' Q3';
  return year + ' Q4';
};

 const tooltip = d3.select('#tooltip')

 svg.selectAll('rect')
 .data(donnee.map(d => d))
 .enter()
 .append('rect')
 .style('height', d => `${d[1] / 40}px`)
 .style('width', 3)
 .attr('class', 'bar')
 .attr('x', (d, i) => i * 3.1 + padding )
 .attr("y", d => height - d[1] / 40 - padding)
 .attr('fill', 'aqua')
 .on('mouseover', (event, d) => {
  tooltip.style('visibility', 'visible')
         .html(`${getQuarter(d[0])} <br> $${d[1].toLocaleString('us-US')} Billion`)
         .style('top', `${height - padding - 50}px`)
         .style('left', `${event.pageX + padding}px`);
  })
 .on('mouseout', () => {
  tooltip.style('visibility', 'hidden'); 
  });
 

//  .append('title')
//  .text(d => `
//   ${getQuarter(d[0])} 
//   $${d[1].toLocaleString()} Billion
//   `)
 
}




// const svg =  d3.select('div')
//     .append('svg')
//     .attr('height', height)
//     .attr('width', width)
//     .style('border', '1px solid white')

//     const scale = d3.scaleLinear()
//     .domain([1947, 2015])  
//     .range([0, 1100]);

//     console.log(scale())

//     const axis = d3.axisBottom(scale);

//     svg.append('g')
//     .attr("transform", `translate(0, ${height - padding})`)
//     .call(axis);

    






// .append('rect')
// .attr('x', 0)
// .attr('y', 0)
// .attr('height', 10)
// .attr('width', 10)





