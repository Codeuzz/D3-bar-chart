import './style.css'
import * as d3 from 'd3';

document.querySelector('#app').innerHTML = `
  <h1>D3 Bar Chart</h1>
`
const height = 500;
const width = 500;
const padding = 30;
const x = -40;

const svg =  d3.select('body')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    // .style('border', '1px solid black')

    const scale = d3.scaleLinear()
    .domain([200, 1000])  
    .range([1947, 2015]);

    const axis = d3.axisBottom(scale);

      svg.append('g')
    .attr("transform", `translate(0, ${height - padding})`)
    .call(axis);


// .append('rect')
// .attr('x', 0)
// .attr('y', 0)
// .attr('height', 10)
// .attr('width', 10)





