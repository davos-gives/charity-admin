import Component from '@ember/component';
import D3Selection from 'd3-selection';
import c3 from 'c3';
import { computed } from '@ember/object';

export default Component.extend({
  didUpdateAttrs() {
    let data = this.get('oneTimeGiftsFormatted');
    let recurringData = this.get('recurringGiftsFormatted');
    let month = this.get('month');
    let year = 2018;
    let date = new Date();
    let today = date.getDate();
    let DayArray = ['x'];
    let OneTimeArray = ['One Time Gifts'];
    let RecurringArray = ['Ongoing Gifts'];

    let monthLength = {Jan: 31, Feb: 28, Mar: 31, Apr: 30, May: 31, Jun: 30, Jul: 31, Aug: 31, Sept: 30, Oct: 31, Nov: 30, Dec: 31}
    let monthKey = {Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sept: 8, Oct: 9, Nov: 10, Dec: 11}

    let DataSummarized = data.reduce((day, total) => {
      day[total.day] = (day[total.day] || 0) + (total.amount/100);
      return day;
    }, {});

    let RecurringDataSummarized = recurringData.reduce((day, total) => {
      day[total.day] = (day[total.day] || 0) + (total.amount/100);
      return day;
    }, {});

    let i = 0;

    while (i < monthLength[month]){
      DayArray.push(`2018-${monthKey[month]}-${i+1}`);
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
    let month = this.get('month');
    let year = data[0].year;
    let date = new Date();
    let today = date.getDate();
    let DayArray = ['x'];
    let OneTimeArray = ['One Time Gifts'];
    let RecurringArray = ['Ongoing Gifts'];

    let monthLength = {Jan: 31, Feb: 28, Mar: 31, Apr: 30, May: 31, Jun: 30, Jul: 31, Aug: 31, Sept: 30, Oct: 31, Nov: 30, Dec: 31}
    let monthKey = {Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sept: 8, Oct: 9, Nov: 10, Dec: 11}


    let DataSummarized = data.reduce((day, total) => {
      day[total.day] = (day[total.day] || 0) + (total.amount/100);
      return day;
    }, {});


    let RecurringDataSummarized = recurringData.reduce((day, total) => {
      day[total.day] = (day[total.day] || 0) + (total.amount/100);
      return day;
    }, {});

    let i = 0;
    while (i < monthLength[month]){
      DayArray.push(`2018-${monthKey[month]}-${i+1}`);
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
      bindto: "#chart",
      data: {
          type: 'spline',
          x: 'x',
          columns: cols,
      },
      size: {
        height: 240,
        width: 480
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
          show: false
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
  }
});
