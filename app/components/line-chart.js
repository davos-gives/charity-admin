import Component from '@ember/component';
import britecharts from 'britecharts/dist/bundled/britecharts.min';
import D3Selection from 'd3-selection';
import { computed } from '@ember/object';

export default Component.extend({

  newLineChart: computed(() => {
    var lineChart = new britecharts.line();
    return lineChart;
  }),

  didUpdate() {

    let data = this.get('oneTimeGiftsFormatted');
    let DataSummarized = data.reduce((day, total) => {
      day[total.day] = (day[total.day] || 0) + (total.amount/100);
      return day;
    }, {});

    let oneTimeDates = []

    Object.keys(DataSummarized).forEach(function(key) {
      let newObject = {};
      newObject.date = `2018-0${data[0].month + 1}-${key}T16:00:00-08:00`;
      newObject.value = DataSummarized[key];
      oneTimeDates.push(newObject);
    });

    var dataSet = {
      dataByTopic: [
        {
            topicName: 'One Time Gifts',
            topic: 'one-time',
            dates: oneTimeDates,

        },
          {
            topicName: 'Ongoing Gifts',
            topic: 'recurring',
            dates: [
                {
                    date: '2018-07-14T16:00:00-08:00',
                    value: 10
                },
                {
                    date: '2018-07-15T16:00:00-08:00',
                    value: 40
                },
                {
                    date: '2018-07-18T16:00:00-08:00',
                    value: 40
                },

            ]
        },
    ]
}


    let container = D3Selection.select(this.$('.js-chart-container')[0]);

    let lineChart = this.get('lineChart');

    container
      .datum(dataSet)
      .call(lineChart)
  },


  didInsertElement() {

    let data = this.get('oneTimeGiftsFormatted');
    let DataSummarized = data.reduce((day, total) => {
      day[total.day] = (day[total.day] || 0) + (total.amount/100);
      return day;
    }, {});

    let oneTimeDates = []

    Object.keys(DataSummarized).forEach(function(key) {
      let newObject = {};
      newObject.date = `2018-0${data[0].month + 1}-${key}T16:00:00-08:00`;
      newObject.value = DataSummarized[key];
      oneTimeDates.push(newObject);
    });

    let container = D3Selection.select(this.$('.js-chart-container')[0]);
    var chartToolTip = new britecharts.tooltip();
    let lineChart = this.get('newLineChart');

    this.set('lineChart', lineChart);

      if (container.node()) {
        lineChart
          .tooltipThreshold(200)
          .width(500)
          .height(300)
          .xAxisFormat('custom')
          .xAxisCustomFormat('%m/%d/%y')
          .xTicks(4)
          .dateLabel('date')
          .lineCurve('basis')
          .grid('vertical')
          .on('customMouseOver', chartToolTip.show)
          .on('customMouseMove', function(dataPoint, topicColorMap, dataPointXPosition) {
            chartToolTip.update(dataPoint, topicColorMap, dataPointXPosition);
          })
          .on('customMouseOut', chartToolTip.hide);

      }

     this.set('lineChart', lineChart);

      var dataSet = {
        dataByTopic: [
          {
              topicName: 'One Time Gifts',
              topic: 'one-time',
              dates: oneTimeDates,

          },
            {
              topicName: 'Ongoing Gifts',
              topic: 'recurring',
              dates: [
                  {
                      date: '2018-07-14T16:00:00-08:00',
                      value: 10
                  },
                  {
                      date: '2018-07-15T16:00:00-08:00',
                      value: 40
                  },

              ]
          },
      ]
  }

    container
      .datum(dataSet)
      .call(lineChart)

    chartToolTip
      .valueLabel('value')
      .title('')
      .numberFormat('$')

    var toolTipContainer = D3Selection.select('.js-chart-container .metadata-group .hover-marker')

    toolTipContainer.datum([]).call(chartToolTip);
  }
});
