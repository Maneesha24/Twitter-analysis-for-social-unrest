import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { data } from '../../../data/result.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  result = data;

  private myChart: any = null;

  private myBarChart: any = null;

  protestTweets = 0

  nonProtestTweets = 0

  constructor() { }

  ngOnInit(): void {
    for(let i =0; i < this.result.length; i++) {
        if(this.result[i].target == 1) {
            this.protestTweets += 1
        } else {
            this.nonProtestTweets += 1
        }
    }
    this.InitPipe();
    this.BarPipe();
  }

  private BarPipe() {
    this.myBarChart = echarts.init((document.getElementById('bar')) as any);
    const baroption = {
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data: ['蒸发量', '降水量']
      },
      toolbox: {
          show: true,
          feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
          }
      },
      calculable: true,
      xAxis: [
          {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
      ],
      yAxis: [
          {
              type: 'value'
          }
      ],
      series: [
          {
              name: '蒸发量',
              type: 'bar',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
              markPoint: {
                  data: [
                      {type: 'max', name: '最大值'},
                      {type: 'min', name: '最小值'}
                  ]
              },
              markLine: {
                  data: [
                      {type: 'average', name: '平均值'}
                  ]
              },
              color: ['#14557b'],
          },
          {
              name: '降水量',
              type: 'bar',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
              markPoint: {
                  data: [
                      {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                      {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                  ]
              },
              markLine: {
                  data: [
                      {type: 'average', name: '平均值'}
                  ]
              },
              color: ['#7fcec5']
          }
      ]
    }

    this.myBarChart.setOption(baroption);
  }

  private InitPipe() {
    this.myChart = echarts.init((document.getElementById('pipe')) as any);

    const option = {
      tooltip: {
          trigger: 'item'
      },
      legend: {
          top: '5%',
          left: 'center'
      },
      series: [
          {
              type: 'pie',
              radius: ['40%', '70%'],
              color: ['#14557b', '#7fcec5'],
              avoidLabelOverlap: false,
              itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
              },
              label: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  label: {
                      show: true,
                      fontSize: '40',
                      fontWeight: 'bold'
                  }
              },
              labelLine: {
                  show: false
              },
              data: [
                  {value: this.protestTweets, name: 'Protest'},
                  {value: this.nonProtestTweets, name: 'Non-protest'},
              ]
          }
      ]
    };

    this.myChart.setOption(option);
  }

}
