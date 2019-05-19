import { Chart } from 'angular-highcharts';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonSlides } from '@ionic/angular'; 
@Component({
  selector: 'app-myrequest',
  templateUrl: './myrequest.page.html',
  styleUrls: ['./myrequest.page.scss'],
})
export class MyrequestPage implements OnInit {

  @ViewChild("Slides") slides: IonSlides;

  chart: Chart;
  segmentSelected:any = 0;
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
  SlideOrders = {
    initialSlide: 0,
    speed: 400,
    autoHeight:true,
  };
  // Segment = {
  //    spaceBetween: 0,
  //     slidesPerView: "auto",
  //     freeMode: true,
  //     watchSlidesVisibility: true,
  //     watchSlidesProgress: true,
  // };
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.segmentSelected = ev.detail.value;
  }
  ngOnInit() {
  }

}
