import React, { Component } from 'react';
import { Bubble } from 'react-chartjs-2';
import { connect } from 'react-redux'

function random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}
function sortFunction(a, b) {
  if (a[2] === b[2]) {
    return 0;
  }
  else {
    return (a[2] < b[2]) ? -1 : 1;
  }
}
let lastitem = 0;
var masAlto = 0;
let k_coods = [];
//Clase
class Bubble2 extends Component {

  constructor(props) {
    super(props)

    this.state = {
      labels: ['January'],
      datasets: this.getData(),

      group_one: [],
      group_two: [],
      group_three: []
    };
    this.fillGraph = this.fillGraph.bind(this);
    this.getData = this.getData.bind(this);
  }
  getData(state) {

    var k = 3;
    masAlto = 0;
    if (masAlto <= 0) {
      k = 3;
      masAlto = 3
    } else {
      k = masAlto;
      masAlto = masAlto;
    }
    var datasetsArray = [[]]
    var arrayByGroups = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    /*Arreglo de vectores */
    var arrayRandom = [
      [0, 6, 0],
      [1, 7, 1],
      [2, 8, 2],
      [3, 9, 1],
      [4, 10, 2],
      [5, 11, 1]
    ]
    if (!this.props.iris_data.data) {
      arrayRandom = [
        [0, 6, 0],
        [1, 7, 1],
        [2, 8, 2],
        [3, 9, 1],
        [4, 10, 2],
        [5, 11, 1]
      ]
    } else {
      arrayRandom = this.props.iris_data.data;
      k_coods = [];
      k_coods = [this.props.iris_data.data.pop()];
    }
    /*Sort Array by group */
    arrayRandom.sort(sortFunction);
    /*Llenar arreglo por grupos */

    arrayRandom.map((function (item, i) {
      if (item[2] > masAlto) {
        masAlto = item[2];
      }
      const it = {
        x: item[0],
        y: item[1],
        r: 5
      }
      arrayByGroups[item[2]].push(it)
    }));
    var centroidesByGroup = [];
    k_coods.map((function (item, i) {
      if (item[2] > masAlto) {
        masAlto = item[2];
      }
      item.map((ite) => {
        const it = {
          x: parseFloat(ite[0]),
          y: parseFloat(ite[1]),
          r: 5
        }
        centroidesByGroup.push(it)
      })


    }));
    /**For para crear los dataasets */
    for (let index = 0; index < masAlto + 1; index++) {
      var color = random_rgba();
      datasetsArray[index] = {
        label: 'Grupo ' + (index + 1),
        fill: false,
        lineTension: 0.1,
        backgroundColor: color,
        borderColor: color,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: color,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: color,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: arrayByGroups[index]
      }

    }
    var centroides = {
      label: 'Centroides',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(255,0,0,1.0)',
      borderColor: 'rgba(255,0,0,1.0)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(255,0,0,1.0)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(255,0,0,1.0)',
      pointHoverBorderColor: 'rgba(255,0,0,1.0)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: centroidesByGroup
    }
    datasetsArray.push(centroides);
    console.log(datasetsArray);
    this.setState({ datasets: datasetsArray });
    return datasetsArray

  }


  fillGraph() {
    this.state.group_one = [];
    this.state.group_two = [];
    this.state.group_three = [];
    this.props.iris_data.data.forEach(element => {
      var obj = {};
      obj.x = element[0];
      obj.y = element[1];
      obj.r = 5;
      switch (element[2]) {
        case 0:
          this.state.group_one.push(obj)
          break;
        case 1:
          this.state.group_two.push(obj);
          break;
        case 2:
          this.state.group_three.push(obj);
          break;
      }
    });

    this.state.datasets[0].data = this.state.group_one;
    this.state.datasets[1].data = this.state.group_two;
    this.state.datasets[2].data = this.state.group_three;
    this.setState({ datasets: this.state.datasets });
  }
  render() {
    return (
      <div>
        <h2 onClick={this.getData}>Kmeans Graph</h2>
        <Bubble data={this.state} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    iris_data: state.kmeans,
    get_k: state.getk
  }
}


export default connect(mapStateToProps)(Bubble2);