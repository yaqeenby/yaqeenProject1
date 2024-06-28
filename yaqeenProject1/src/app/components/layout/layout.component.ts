import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/test.service';
import { Line } from '../../types/line.type';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  items = [1, 2, 3, 4, 5];
  lines: Line[] = [];

  cardLine1: Line;
  cardLine2: Line;
  cardLine3: Line;
  cardLine4: Line;

  currencyChart1: Line;
  currencyChart2: Line;
  currencyChart3: Line;

  trendCards: any[];

  toggleMenu: boolean = true;
  constructor(private userService: UserService) {
    const data = [
      { x: 0, y: 50 },
      { x: 11, y: 60 },
      { x: 22, y: 70 },
      { x: 33, y: 65 },
      { x: 44, y: 80 },
      { x: 55, y: 85 },
      { x: 66, y: 90 },
      { x: 77, y: 94 },
      { x: 88, y: 57 },
      { x: 99, y: 105 },
      { x: 100, y: 110 }
    ];

    const data2 = [
      { x: 0, y: 40 },
      { x: 10, y: 55 },
      { x: 11, y: 66 },
      { x: 22, y: 77 },
      { x: 33, y: 60 },
      { x: 44, y: 88 },
      { x: 55, y: 70 },
      { x: 66, y: 99 },
      { x: 77, y: 95 },
      { x: 80, y: 57 },
      { x: 85, y: 50 },
      { x: 89, y: 95 },
      { x: 95, y: 90 },
      { x: 99, y: 120 },
      { x: 100, y: 130 }
    ];

    this.lines.push({
      label: '',
      points: data,
      color: {
        type: 'linear',
        stops: [
          {
            start: 0,
            color: 'rgba(255, 113, 68, 0.01%)'
          },
          {
            start: 0.9,
            color: '#FF8979'
          },
          {
            start: 0.24,
            color: '#FF4DCA'
          },
          {
            start: 0.44,
            color: '#E930FF'
          },
          {
            start: 0.94,
            color: '#E44D88'
          },
          {
            start: 0.97,
            color: 'rgba(227, 78, 129, 59.42%)'
          },
          {
            start: 1,
            color: 'rgba(227, 80, 122, 0.01%)'
          },
        ]
      },
      shadow: {
        color: '#BA1358',
        blur: 28.21,
        x: 0,
        y: 3.64
      }
    })


    this.lines.push({
      label: '',
      points: data2,
      color: {
        type: 'linear',
        stops: [
          {
            start: 0,
            color: 'rgba(69, 175, 238, 0.01%)'
          },
          {
            start: 0.4,
            color: 'rgba(67, 177, 236, 61.55%)'
          },
          {
            start: 0.8,
            color: 'rgba(65, 179, 233, 76.75%)'
          },
          {
            start: 0.15,
            color: '#3EB7E5'
          },
          {
            start: 0.75,
            color: '#23DBBD'
          },
          {
            start: 0.84,
            color: 'rgba(30, 224, 183, 85.3%)'
          },
          {
            start: 0.90,
            color: 'rgba(28, 228, 179, 76.87%)'
          },
          {
            start: 0.93,
            color: 'rgba(27, 229, 177, 14.45%)'
          },
          {
            start: 1,
            color: 'rgba(23, 234, 172, 0.01%)'
          },
        ]
      },
      shadow: {
        color: '#23DBBD',
        blur: 28.21,
        x: 0,
        y: 3.64
      }
    });










    const data3 = [
      { x: 0, y: 77 },
      { x: 22, y: 40 },
      { x: 44, y: 88 },
      { x: 55, y: 70 },
      { x: 66, y: 40 },
      { x: 77, y: 95 },
      { x: 100, y: 100 },
    ];

    this.cardLine1 = {
      label: '',
      points: data3,
      color: {
        type: 'linear',
        stops: [
          {
            start: 0,
            color: '#63C178'
          },
          {
            start: 0.83,
            color: 'rgba(54, 187, 255, 46.6%)'
          },
          {
            start: 1,
            color: 'rgba(193, 247, 147, 0.01%)'
          }
        ]
      },
      shadow: {
        color: 'rgba(12, 10 ,32, 54.36%)',
        blur: 9.1,
        x: 0,
        y: 9.1
      }
    }

    this.cardLine2 = {
      label: '',
      points: data3,
      color: {
        type: 'linear',
        stops: [
          {
            start: 0,
            color: 'rgba(163, 48 ,255, 0.01%)'
          },
          {
            start: 0.39,
            color: '#BC3DCB'
          },
          {
            start: 1,
            color: '#E3507A'
          }
        ]
      },
      shadow: {
        color: 'rgba(12, 10 ,32, 54.36%)',
        blur: 9.1,
        x: 0,
        y: 9.1
      }
    }

    this.cardLine3 = {
      label: '',
      points: data3,
      color: {
        type: 'linear',
        stops: [
          {
            start: 0,
            color: '#FFAD57'
          },
          {
            start: 0.77,
            color: 'rgba(234, 255, 0, 46.6%)'
          },
          {
            start: 1,
            color: 'rgba(255, 133, 2, 0.01%)'
          }
        ]
      },
      shadow: {
        color: 'rgba(12, 10 ,32, 54.36%)',
        blur: 9.1,
        x: 0,
        y: 9.1
      }
    }

    this.cardLine4 = {
      label: '',
      points: data3,
      color: {
        type: 'linear',
        stops: [
          {
            start: 0,
            color: 'rgba(255, 219, 48, 0.01%)'
          },
          {
            start: 0.39,
            color: '#E27034'
          },
          {
            start: 1,
            color: '#3EDEF6'
          }
        ]
      },
      shadow: {
        color: 'rgba(12, 10 ,32, 54.36%)',
        blur: 9.1,
        x: 0,
        y: 9.1
      }
    }

    this.trendCards = [
      {
        currency1: 'BTC',
        currency2: 'USD',
        per: '-5.23%',
        chart: this.cardLine1
      },
      {
        currency1: 'BTC',
        currency2: 'USD',
        per: '-5.23%',
        chart: this.cardLine2
      },
      {
        currency1: 'BTC',
        currency2: 'USD',
        per: '-5.23%',
        chart: this.cardLine3
      },
      {
        currency1: 'BTC',
        currency2: 'USD',
        per: '-5.23%',
        chart: this.cardLine4
      },
    ]






    

    let currencyDataUp = [
      { x: 0, y: 0 },
      { x: 25, y: 50 },
      { x: 50, y: 75 },
      { x: 75, y: 50 },
      { x: 100, y: 100 }
    ];


    this.currencyChart1 = {
      label: '',
      points: currencyDataUp,
      color: {
        type: 'linear',
        stops: [
          {
            start: 0,
            color: '#AAFFF7'
          },
          {
            start: 1,
            color: '#FFFFFF'
          }
        ]
      }
    }

    this.currencyChart2 = {
      label: '',
      points: data3,
      color: {
        type: 'linear',
        stops: [
          {
            start: 0,
            color: 'rgba(163, 48 ,255, 0.01%)'
          },
          {
            start: 0.39,
            color: '#BC3DCB'
          },
          {
            start: 1,
            color: '#E3507A'
          }
        ]
      }
    }

    this.currencyChart3 = {
      label: '',
      points: data3,
      color: {
        type: 'linear',
        stops: [
          {
            start: 0,
            color: '#309AFF'
          },
          {
            start: 0.29,
            color: '#309AFF'
          },
          {
            start: 0.65,
            color: '#5364AE'
          },
          {
            start: 1,
            color: 'rgba(112, 54, 107, 0.01%)'
          }
        ]
      }
    }
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      console.log(users);
    });
  }

  ngAfterViewInit() {
  }
}
