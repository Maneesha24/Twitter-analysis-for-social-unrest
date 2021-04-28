import { Component, OnInit } from '@angular/core';
import { data } from '../../../data/result.js';
import { outputdata } from '../../../data/output.js';
import * as echarts from 'echarts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  result = data

  outputdata = outputdata

  protestTweets: any = [];

  hashtags: any = {};

  result_arr: any = [];

  private myChart: any = null;

  xAxisData: any = ['20:58:53', '20:59:57', '21:00:23', '21:01:11'];

  yAxisObj = {
    '20:58:53': 0,
    '20:59:57': 0,
    '21:00:23': 0,
    '21:01:11': 0,
  }

  yAxisData: any = [];

  sentimentScoreColorObj = {
    '1': 'border-low-violent',
    '2': 'border-lowly-violent',
    '3': 'border-neutral-violent',
    '4': 'border-high-violent',
    '5': 'border-highly-violent'
  }

  ngOnInit(): void {

    for (let i = 0;i < outputdata.length; i++) {
      if(outputdata[i] && outputdata[i].tweetcreatedts.includes('20:58')) {
        this.yAxisObj['20:58:53'] += 1
      } else if(outputdata[i] && outputdata[i].tweetcreatedts.includes('20:59')) {
        this.yAxisObj['20:59:57'] += 1
      } else if(outputdata[i] && outputdata[i].tweetcreatedts.includes('21:00')) {
        this.yAxisObj['21:00:23'] += 1
      } else {
        this.yAxisObj['21:01:11'] += 1
      }
    }
    
    this.yAxisData = Object.values(this.yAxisObj);
    this.InitPipe();
  }

  private InitPipe(): void {
    this.myChart = echarts.init((document.getElementById('main')) as any);

    const option = {
      xAxis: {
          type: 'category',
          data: this.xAxisData
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: this.yAxisData,
          type: 'line',
          smooth: true,
          color: 'black'
      }]
    };

    this.myChart.setOption(option);

  }

  getBorder(score) {
    return this.sentimentScoreColorObj[score]
  }

}