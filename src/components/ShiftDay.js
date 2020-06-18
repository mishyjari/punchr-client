import React from 'react'
const Chart = require('chart.js');

// Directions for chart.js in React: https://www.createwithdata.com/react-chartjs-dashboard/
class ShiftDay extends React.Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }
  
  // swap axes: https://stackoverflow.com/questions/37863112/chart-js-how-to-invert-swap-axes
  componentDidUpdate() {
    let date = this.props.date
    const shifts = this.props.shifts

    // set time to midnight https://stackoverflow.com/questions/3894048
    // setHours modifies in-place, so we need to create a new object
    let dateBegin = new Date(date)
    let dateEnd = new Date(date)
    dateBegin.setHours(0,0,0,0)
    dateEnd.setHours(23,59,0,0)

    let datasets = shifts.map((shift, index) => {
      return {
        // title: shift.user.first_name,
        label: shift.user.first_name + " " + shift.user.last_name,
        data: [{
          x: index,
          y: shift.start,
        },{
          x: index,
          y: shift.end
        }],
        backgroundColor: ['blue', 'blue'],
        borderColor: 'blue',
      }
    })

    let options = {
      // customizing tooltip: https://stackoverflow.com/questions/43604597
      tooltips: {
        callbacks: {
          // Set the title as the user's name
          title: (toolTipItem, allData) => {
            let datasetIndex = toolTipItem[0].xLabel
            return allData['datasets'][datasetIndex].label
          },
          // Set the label as just the simplified date & time
          label: (toolTipItem, allData) => {
            console.log('item', toolTipItem)
            console.log('data', allData)
            let datasetIndex = toolTipItem.xLabel
            let datapointIndex = toolTipItem.index
            let data = allData['datasets'][datasetIndex].data
            return data[datapointIndex]['y'].toLocaleString()
          },
        }
      },
      // Following two options make it look better w/ resizing
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Shifts ' +(date.getMonth()+1)+ '/' + date.getDate()
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          display: false,
          type: 'linear',
          position: 'bottom',
          ticks: {
            stepSize: 1,
            min: -1,
            max: shifts.length
          }
        }],
        yAxes: [{
          // position: 'bottom',
          type: 'time',
          // Format axis timestamps
          // https://stackoverflow.com/questions/43365325/
          time: {
            format: "HH:mm",
            unit: 'hour',
            unitStepSize: 4,
            displayFormats: {
              'minute': 'HH:mm', 
              'hour': 'HH:mm', 
              min: '00:00',
              max: '23:59'
            },
          },
          // Force it to display 24 hrs
          // https://stackoverflow.com/questions/61358036
          ticks: {
              reverse: true,
              min: dateBegin,
              max: dateEnd,
          }
        }]
      }
    }

    this.chart = new Chart(this.chartRef.current, {
      type: 'line',
      data: { datasets },
      options: options,
    })
  }

  render() {
    return (
      <div className="chart-container" style={{position: 'relative', height: '80vh', width: '20vw'}}>
        <canvas ref={this.chartRef}/>
      </div>
    )
  }

}

export default ShiftDay