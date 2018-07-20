import Component from '@ember/component';
import D3Selection from 'd3-selection';
import c3 from 'c3';
import { computed } from '@ember/object';

export default Component.extend({
  didUpdateAttrs() {
    let data = this.get('oneTimeGiftsFormatted');
    let recurringData = this.get('recurringGiftsFormatted');
    let month = data[0].month;
    let year = data[0].year;
    let date = new Date();
    let today = date.getDate();
    let DayArray = ['x'];
    let OneTimeArray = ['One Time Gifts'];
    let RecurringArray = ['Recurring Gifts'];

    let DataSummarized = data.reduce((day, total) => {
      day[total.day] = (day[total.day] || 0) + (total.amount/100);
      return day;
    }, {});

    let RecurringDataSummarized = recurringData.reduce((day, total) => {
      day[total.day] = (day[total.day] || 0) + (total.amount/100);
      return day;
    }, {});

    let i = 0;

    while (i < today){
      DayArray.push(`2018-0${month}-${i+1}`);
      OneTimeArray.push(DataSummarized[i+1] ? `${DataSummarized[i+1]}` : '0')
      RecurringArray.push(RecurringDataSummarized[i+1] ? `${RecurringDataSummarized[i+1]}` : '0')
      i++;
    }

    let chart = this.get('chart');
    chart.load({
      columns: [
        OneTimeArray,
        RecurringArray,
      ]
    });
  },


  didInsertElement() {

    let data = this.get('oneTimeGiftsFormatted');
    let recurringData = this.get('recurringGiftsFormatted');
    let month = data[0].month;
    let year = data[0].year;
    let date = new Date();
    let today = date.getDate();
    let DayArray = ['x'];
    let OneTimeArray = ['One Time Gifts'];
    let RecurringArray = ['Recurring Gifts'];


    let DataSummarized = data.reduce((day, total) => {
      day[total.day] = (day[total.day] || 0) + (total.amount/100);
      return day;
    }, {});

    console.log(recurringData);

    let RecurringDataSummarized = recurringData.reduce((day, total) => {
      day[total.day] = (day[total.day] || 0) + (total.amount/100);
      return day;
    }, {});

    let i = 0;
    while (i < today){
      DayArray.push(`2018-0${month}-${i+1}`);
      OneTimeArray.push(DataSummarized[i+1] ? `${DataSummarized[i+1]}` : '0')
      RecurringArray.push(RecurringDataSummarized[i+1] ? `${RecurringDataSummarized[i+1]}` : '0')
      i++;
    }

    let cols = [
        DayArray,
        OneTimeArray,
        RecurringArray,
    ];

    let chart = c3.generate({
    data: {
        type: 'spline',
        x: 'x',
        columns: cols,
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%d'
            }
        },
        y: {
          show: true,
          tick: {
            format: function (d) { return "$" + parseFloat(d.toFixed(2)); }
          }
        }
    },
    grid: {
      x: {
        show: true
      },
    },
    color: {
      pattern: ['#f2d024', '#6d3eff']
    },
    legend: {
        show: false
    }

});

this.set('chart', chart);

  //   let data = this.get('oneTimeGiftsFormatted');
  //   let DataSummarized = data.reduce((day, total) => {
  //     day[total.day] = (day[total.day] || 0) + (total.amount/100);
  //     return day;
  //   }, {});
  //
  //   let oneTimeDates = []
  //
  //   Object.keys(DataSummarized).forEach(function(key) {
  //     let newObject = {};
  //     newObject.date = `2018-0${data[0].month + 1}-${key}T16:00:00-08:00`;
  //     newObject.value = DataSummarized[key];
  //     oneTimeDates.push(newObject);
  //   });
  //
  //   let container = D3Selection.select(this.$('.js-chart-container')[0]);
  //   var chartToolTip = new britecharts.tooltip();
  //   let lineChart = this.get('newLineChart');
  //
  //   this.set('lineChart', lineChart);
  //
  //     if (container.node()) {
  //       lineChart
  //         .tooltipThreshold(200)
  //         .width(500)
  //         .height(300)
  //         .xAxisFormat('custom')
  //         .xAxisCustomFormat('%m/%d/%y')
  //         .xTicks(4)
  //         .dateLabel('date')
  //         .lineCurve('basis')
  //         .grid('vertical')
  //         .on('customMouseOver', chartToolTip.show)
  //         .on('customMouseMove', function(dataPoint, topicColorMap, dataPointXPosition) {
  //           chartToolTip.update(dataPoint, topicColorMap, dataPointXPosition);
  //         })
  //         .on('customMouseOut', chartToolTip.hide);
  //
  //     }
  //
  //    this.set('lineChart', lineChart);
  //
  //     var dataSet = {
  //       dataByTopic: [
  //         {
  //             topicName: 'One Time Gifts',
  //             topic: 'one-time',
  //             dates: oneTimeDates,
  //
  //         },
  //           {
  //             topicName: 'Ongoing Gifts',
  //             topic: 'recurring',
  //             dates: [
  //                 {
  //                     date: '2018-07-14T16:00:00-08:00',
  //                     value: 10
  //                 },
  //                 {
  //                     date: '2018-07-15T16:00:00-08:00',
  //                     value: 40
  //                 },
  //
  //             ]
  //         },
  //     ]
  // }
  //
  //   container
  //     .datum(dataSet)
  //     .call(lineChart)
  //
  //   chartToolTip
  //     .valueLabel('value')
  //     .title('')
  //     .numberFormat('$')
  //
  //   var toolTipContainer = D3Selection.select('.js-chart-container .metadata-group .hover-marker')
  //
  //   toolTipContainer.datum([]).call(chartToolTip);
  }
});
