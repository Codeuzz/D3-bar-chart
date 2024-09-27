import './style.css'
import * as d3 from 'd3';

document.querySelector('#app').innerHTML = `
  <h1>D3 Bar Chart</h1>
`

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
.then(res => {
  if(res.ok) {
    return res.json();
  } else {
    throw new Error('Not ok')
  }
})
.then(data => barMan(data))



const barMan = (data) => {
 const donnee = data.data.map(d => d)

 const svg = d3.select('svg')

 svg.selectAll('rect')
 .data(donnee.map(d => d[1]))
 .enter()
 .append('rect')
 .style('height', d => `${d / 40}px`)
 .style('width', 3)
 .attr('class', 'bar')
 .attr('x', (d, i) => i * 3 )
 .attr("y", d => height - d / 40 - padding)
 .attr('fill', 'aqua')
 
}


const height = 550;
const width = 1100;
const padding = 30;
const x = -40;

const svg =  d3.select('body')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .style('border', '1px solid white')

    const scale = d3.scaleLinear()
    .domain([1947, 2015])  
    .range([0, 1087]);

    const axis = d3.axisBottom(scale);

    svg.append('g')
    .attr("transform", `translate(0, ${height - padding})`)
    .call(axis);

    

// .append('rect')
// .attr('x', 0)
// .attr('y', 0)
// .attr('height', 10)
// .attr('width', 10)





