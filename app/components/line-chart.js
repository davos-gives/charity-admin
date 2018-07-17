import Component from '@ember/component';
import britecharts from 'britecharts/dist/bundled/britecharts.min';
import D3Selection from 'd3-selection';

export default Component.extend({

  didInsertElement() {
  var container = D3Selection.select(this.$('.js-chart-container')[0]);

  var lineChart = new britecharts.line(),
      chartToolTip = new britecharts.tooltip();

    if (container.node()) {
      lineChart
        .tooltipThreshold(200)
        .width(450)
        .height(300)
        .xAxisFormat('custom')
        .xAxisCustomFormat('%m/%d')
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

    var dataSet = {
      dataByTopic: [
        {
            topicName: 'Single Donations',
            topic: 'one-time',
            dates: [
                {
                    date: '2018-07-01T16:00:00-08:00',
                    value: 20
                },
                {
                    date: '2018-07-02T17:00:00-08:00',
                    value: 25
                },
                {
                    date: '2018-07-03T17:00:00-08:00',
                    value: 12
                },
                {
                    date: '2018-07-04T17:00:00-08:00',
                    value: 200
                },
                {
                    date: '2018-07-05T17:00:00-08:00',
                    value: 5
                },
                {
                    date: '2018-07-06T17:00:00-08:00',
                    value: 300
                },
                {
                    date: '2018-07-07T17:00:00-08:00',
                    value: 250
                },
                {
                    date: '2018-07-08T17:00:00-08:00',
                    value: 120
                },
                {
                    date: '2018-07-09T17:00:00-08:00',
                    value: 230
                },
                {
                    date: '2018-07-10T17:00:00-08:00',
                    value: 100
                },
            ]
        },
          {
            topicName: 'Recurring',
            topic: 'recurring',
            dates: [
                {
                    date: '2018-07-01T16:00:00-08:00',
                    value: 10
                },
                {
                    date: '2018-07-02T17:00:00-08:00',
                    value: 40
                },
                {
                    date: '2018-07-03T17:00:00-08:00',
                    value: 30
                },
                {
                    date: '2018-07-04T17:00:00-08:00',
                    value: 80
                },
                {
                    date: '2018-07-05T17:00:00-08:00',
                    value: 120
                },
                {
                    date: '2018-07-06T17:00:00-08:00',
                    value: 20
                },
                {
                    date: '2018-07-07T17:00:00-08:00',
                    value: 50
                },
                {
                    date: '2018-07-08T17:00:00-08:00',
                    value: 90
                },
                {
                    date: '2018-07-09T17:00:00-08:00',
                    value: 10
                },
                {
                    date: '2018-07-10T17:00:00-08:00',
                    value: 70
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
