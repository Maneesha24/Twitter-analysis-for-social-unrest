import { Component, OnInit } from '@angular/core';
import { data } from '../../../data/result.js';
import { outputdata } from '../../../../../../tweetsdata/output.js';
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

  xAxisData: any = ['2:30PM', '2:45PM', '3:00 PM', '3:15 PM'];

  yAxisObj = {
    '2:30PM': 0,
    '2:45PM': 0,
    '3:00PM': 0,
    '3:15PM': 0
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
      console.log('date', outputdata[i] && outputdata[i].tweetcreatedts)
      if(outputdata[i] && outputdata[i].tweetcreatedts.includes('14:30')) {
        this.yAxisObj['2:30PM'] += 1
      } else if(outputdata[i] && outputdata[i].tweetcreatedts.includes('14:45')) {
        this.yAxisObj['2:45PM'] += 1
      } else if(outputdata[i] && outputdata[i].tweetcreatedts.includes('15:00')) {
        this.yAxisObj['3:00PM'] += 1
      } else {
        this.yAxisObj['3:15PM'] += 1
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