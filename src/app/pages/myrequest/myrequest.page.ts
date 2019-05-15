import { Chart } from 'angular-highcharts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myrequest',
  templateUrl: './myrequest.page.html',
  styleUrls: ['./myrequest.page.scss'],
})
export class MyrequestPage implements OnInit {
  // Highcharts: typeof Highcharts = Highcharts;
  // chartOptions: Highcharts.Options;
  chart: Chart;
  constructor() { }
  
  ionViewWillEnter(){
    this.chart = new Chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        style: {
          fontFamily: 'iransans',
          fontWeight: 'normal',
          backgroundColor: null,
        }
      },
      title: {
        text: '',
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            startAngle: -95,
            endAngle: 95,
            center: ['50%', '90%'],
            size: '110%',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: '{point.color}'
                }
            }
        }
    },
      legend: {
        labelFormat: '{name} | {y} ',
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom'
      },
  
      series: [{
        type: 'pie',
        name: 'گرازش وضعیت درخواست ها',
        innerSize: '75%',
        showInLegend: true,
        keys: ['name', 'y', 'color', 'label'],
        data: [
          ['منتظر متخصص', 20, '#4286F5', 'منتظر متخصص'],
          ['منتظر تایید', 20, '#ff77a9', 'منتظر تایید'],
          ['پذیرش شده', 20, '#ffc107', 'پذیرش شده'],
          ['خاتمه یافته', 30, '#7cb342', 'خاتمه یافته'],
          ['لغو شده', 10, '#EA4235', 'لغو شده'],
        ],
        dataLabels: {
          enabled: true,
          format: '{point.label}'
        },
      }]
    });
  }


  // this.chartOptions = {
  //   chart: {
  //     type: 'item',
  //     style: {
  //       fontFamily: 'iransans',
  //       fontWeight: 'normal',
  //       backgroundColor: null,
  //     }
  //   },
  //   title: {
  //     text: 'گزارش وضعیت درخواست های من',
  //     align: 'center',
  //     verticalAlign: 'top',
  //     y: 40
  //   },
  //   plotOptions: {
  //     pie: {
  //       dataLabels: {
  //         enabled: true,
  //         distance: -50,
  //         style: {
  //           fontWeight: 'bold',
  //           color: 'white'
  //         }
  //       },
  //       startAngle: -95,
  //       endAngle: 95,
  //       center: ['50%', '75%'],
  //       size: '110%'
  //     }
  //   },
  //   legend: {
  //     labelFormat: '{name} | {y} ',
  //     layout: 'horizontal',
  //     align: 'center',
  //     verticalAlign: 'bottom'
  //   },

  //   series: [{
  //     type: 'pie',
  //     name: 'گرازش وضعیت درخواست ها',
  //     innerSize: '50%',
  //     showInLegend: true,
  //     keys: ['name', 'y', 'color', 'label'],
  //     data: [
  //       ['منتظر متخصص', 20, '#4286F5', 'منتظر متخصص'],
  //       ['منتظر تایید', 20, '#ff77a9', 'منتظر تایید'],
  //       ['پذیرش شده', 20, '#ffc107', 'پذیرش شده'],
  //       ['خاتمه یافته', 30, '#7cb342', 'خاتمه یافته'],
  //       ['لغو شده', 10, '#EA4235', 'لغو شده'],
  //     ],
  //     dataLabels: {
  //       enabled: true,
  //       format: '{point.label}'
  //     },
  //   }]
  // };



  ngOnInit() {
  }

}
