import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { data } from '../../../data/result.js';
import { outputdata } from '../../../../../../tweetsdata/output.js';


@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

    result = data;

    outputdata = outputdata;

    private myChart: any = null;

    private myBarChart: any = null;

    protestTweets = 0;

    nonProtestTweets = 0;

    sentimentScoreObj = {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0
    }

    hashtags = {};

    hashtagsXData = []

    hashtagsYData = []

    retweetData = {};

    followerData = {};

    retweetXData = [];

    followerXData = [];

    constructor() { }

    ngOnInit(): void {

        this.outputdata.map(data => {
            this.sentimentScoreObj[data.sentiment_class] += 1
            data.hashtags.map(tag => {
                if (tag in this.hashtags) {
                    this.hashtags[tag] += 1
                } else {
                    this.hashtags[tag] = 1
                }
            })
        });

        this.hashtags = Object.entries(this.hashtags).sort((a, b) => b[1] - a[1])

        this.hashtagsXData = Object.values(this.hashtags.slice(0, 5)).map(val => val[0]);
        this.hashtagsYData = Object.values(this.hashtags.slice(0, 5)).map(val => val[1]);

        this.hashtagsXData.map(tag => {
            this.retweetData[tag] = 0
            this.followerData[tag] = 0
        });


        console.log('data', this.hashtags)
        this.outputdata.map(data => {
            if(data.hashtags.includes('#maga')) {
                this.retweetData['#maga'] += data?.retweetcount;
                this.followerData['#maga'] += data?.followers;
            } 
            if(data.hashtags.includes('#trump')) {
                this.retweetData['#trump'] += data?.retweetcount;
                this.followerData['#trump'] += data?.followers;
            }
            if(data.hashtags.includes('#capitolattack')) {
                this.retweetData['#capitolattack'] += data?.retweetcount;
                this.followerData['#capitolattack'] += data?.followers;
            }
            if(data.hashtags.includes('#terrorism')) {
                this.retweetData['#terrorism'] += data?.retweetcount;
                this.followerData['#terrorism'] += data?.followers;
            } 
            if(data.hashtags.includes('#biden')) {
                this.retweetData['#biden'] += data?.retweetcount
                this.followerData['#biden'] += data?.followers;
            }
        });

        
        this.retweetXData = Object.values(this.retweetData)

        this.followerXData = Object.values(this.followerData)
        for (let i = 0; i < this.result.length; i++) {
            if (this.result[i].target == 1) {
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
                data: ['Retweet', 'Followers']
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: this.hashtagsXData
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Retweets',
                    type: 'bar',
                    data: this.retweetXData,
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Retweets'},
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: 'Retweets' }
                        ]
                    },
                    color: ['#14557b'],
                },
                {
                    name: 'Followers',
                    type: 'bar',
                    data: this.followerXData,
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Followers'},
                            { type: 'min', name: 'Followers' }
                        // data: [
                        //     { name: 'Retweets', value: 182.2, xAxis: 7, yAxis: 183 },
                        //     { name: 'Followers', value: 2.3, xAxis: 11, yAxis: 3 }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: 'Followers' }
                        ]
                    },
                    color: ['#7fcec5']
                },
                {
                    name: 'Hashtags',
                    type: 'bar',
                    data: this.hashtagsYData,
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Hashtags'},
                            { type: 'min', name: 'Hashtags' }
                        ]
                    },
                    color: ['#d6f48b']
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
                    color: ['#14557b',
                        '#1779b3',
                        'rgb(22, 200, 224)',
                        'rgb(22, 224, 204)',
                        '#7fcec5'],
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
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: this.sentimentScoreObj['5'], name: 'Score 5' },
                        { value: this.sentimentScoreObj['4'], name: 'Score 4' },
                        { value: this.sentimentScoreObj['3'], name: 'Score 3' },
                        { value: this.sentimentScoreObj['2'], name: 'Score 2' },
                        { value: this.sentimentScoreObj['1'], name: 'Score 1' },
                    ]
                }
            ]
        };

        this.myChart.setOption(option);
    }

}
