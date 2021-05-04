import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/data.service.ts';
// import { outputdata } from '../../../data/output.js';
import { outputdata } from '../../../../../../tweetsdata/output.js';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  myMap: any;

  option: any;

  outputdata = outputdata;

  data = [
    {name: 'Alabama', value: 4822023},
    {name: 'Alaska', value: 731449},
    {name: 'Arizona', value: 6553255},
    {name: 'Arkansas', value: 2949131},
    {name: 'California', value: 38041430},
    {name: 'Colorado', value: 5187582},
    {name: 'Connecticut', value: 3590347},
    {name: 'Delaware', value: 917092},
    {name: 'District of Columbia', value: 632323},
    {name: 'Florida', value: 19317568},
    {name: 'Georgia', value: 9919945},
    {name: 'Hawaii', value: 1392313},
    {name: 'Idaho', value: 1595728},
    {name: 'Illinois', value: 12875255},
    {name: 'Indiana', value: 6537334},
    {name: 'Iowa', value: 3074186},
    {name: 'Kansas', value: 2885905},
    {name: 'Kentucky', value: 4380415},
    {name: 'Louisiana', value: 4601893},
    {name: 'Maine', value: 1329192},
    {name: 'Maryland', value: 5884563},
    {name: 'Massachusetts', value: 6646144},
    {name: 'Michigan', value: 9883360},
    {name: 'Minnesota', value: 5379139},
    {name: 'Mississippi', value: 2984926},
    {name: 'Missouri', value: 6021988},
    {name: 'Montana', value: 1005141},
    {name: 'Nebraska', value: 1855525},
    {name: 'Nevada', value: 2758931},
    {name: 'New Hampshire', value: 1320718},
    {name: 'New Jersey', value: 8864590},
    {name: 'New Mexico', value: 2085538},
    {name: 'New York', value: 19570261},
    {name: 'North Carolina', value: 9752073},
    {name: 'North Dakota', value: 699628},
    {name: 'Ohio', value: 11544225},
    {name: 'Oklahoma', value: 3814820},
    {name: 'Oregon', value: 3899353},
    {name: 'Pennsylvania', value: 12763536},
    {name: 'Rhode Island', value: 1050292},
    {name: 'South Carolina', value: 4723723},
    {name: 'South Dakota', value: 833354},
    {name: 'Tennessee', value: 6456243},
    {name: 'Texas', value: 26059203},
    {name: 'Utah', value: 2855287},
    {name: 'Vermont', value: 626011},
    {name: 'Virginia', value: 8185867},
    {name: 'Washington', value: 6897012},
    {name: 'West Virginia', value: 1855413},
    {name: 'Wisconsin', value: 5726398},
    {name: 'Wyoming', value: 576412},
    {name: 'Puerto Rico', value: 3667084}
  ]

  mapXData: any = {};

  threshold: any = 500;

  email: any = 'maneesha24@vt.edu';

  finalData = [];

  emailSent = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    Object.values(this.data).map(val => {
        if (val && val.name) {
            this.mapXData[val.name] = 0
        }
    });

    this.outputdata.map(data => {
        if (data.location in this.mapXData) {
            this.mapXData[data.location] += 1
        } else {
            this.mapXData[data.location] = 1
        }
    });

    Object.keys(this.mapXData).map (value => {
        this.finalData.push({
            'name': value,
            'value': this.mapXData[value]
        })
    });
    

    if(this.finalData && this.finalData.length) {
        $.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95368/USA_geo.json', (usaJson) => {
            const myMap = echarts.init((document.getElementById('map')) as any);
        
            echarts.registerMap('USA', usaJson, {
                Alaska: {              // 把阿拉斯加移到美国主大陆左下方
                    left: -131,
                    top: 25,
                    width: 15
                },
                Hawaii: {
                    left: -110,        // 夏威夷
                    top: 28,
                    width: 5
                },
                'Puerto Rico': {       // 波多黎各
                    left: -76,
                    top: 26,
                    width: 2
                }
            });
            const option = {
                // title: {
                //     text: 'USA Protest data'
                // },
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    transitionDuration: 0.2,
                    formatter: function (params) {
                        let value = (params.value + '').split('.');
                        value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                        return params.seriesName + '<br/>' + params.name + ': ' + value;
                    }
                },
                visualMap: {
                    left: 'right',
                    min: 0,
                    max: 25,
                    inRange: {
                        color: ['#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c']
                    },
                    text: ['High', 'Low'],           // 文本，默认为数值文本
                    calculable: true,
                    // borderWidth: 5
                },
                toolbox: {
                    show: true,
                    left: 'left',
                    top: 'top',
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: 'USA Protest data',
                        type: 'map',
                        roam: true,
                        map: 'USA',
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        darkMode: "auto",
                        textFixed: {
                            Alaska: [20, -20]
                        },
                        data: this.finalData
                    }
                ]
            };
        
            myMap.setOption(option);
        });
    }
  }

  sendMail() {
    this.authService.sendEmail().subscribe(value => {
        if(value && value.success) {
            this.emailSent = true;
            setTimeout(() => {
                this.emailSent = false;
            }, 3000)
        }
    })
  }
  
}
