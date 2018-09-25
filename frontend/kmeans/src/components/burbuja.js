import React, { Component } from 'react';
import {Bubble} from 'react-chartjs-2';


//Clase
class Bubble2 extends Component{

    constructor(props){
        super(props)
    
    this.state = {
        labels: ['January'],
        datasets: [
          {
            label: 'Grupo1',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [{x:1,y:2,r:5},{x:11,y:30,r:5},{x:10,y:20,r:5}]
          },
          {
            label: 'Grupo2',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(255,128,114,0.4)',
            borderColor: 'rgba(255,0,0,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [{x:15,y:2,r:5},{x:35,y:35,r:5},{x:12,y:27,r:5}]
          },
          {
            label: 'Grupo3',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgb(135,206,235,0.4)',
            borderColor: 'rgb(30,144,255,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [{x:20,y:20,r:5},{x:14,y:32,r:5},{x:13,y:22,r:5}]
          }
        ]
      };

    }
    render() {
        return (
          <div>
            <h2>Kmeans Graph</h2>
            <Bubble data={this.state} />
          </div>
        );
      }
}

export default Bubble2;