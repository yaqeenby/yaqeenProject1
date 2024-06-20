import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ChartColor } from '../../types/chartColor.type';
import { Line } from '../../types/line.type';
import { Point } from '../../types/point.type';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, AfterViewInit {
  @Input() height: string = '';
  @Input() width: string = '';
  @Input() lines: Line[] = [];
  @Input() highLightedPoint: Point;
  @Input() xAxesLabels: string[] = [];
  @Input() yAxesLabels: string[] = [];
  @Input() showChartGrids: boolean = true;
  @Input() margin: number = 50;
  ngOnInit() {

  }

  ngAfterViewInit() {
    this.draw();
  }



  draw() {
    const canvas: any = document.getElementById('myCanvas');
    if (canvas) {
      const scale = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * scale;
      canvas.height = canvas.clientHeight * scale;

      const ctx = canvas.getContext('2d');
      ctx.scale(scale, scale);

      const margin = this.margin;
      const graphWidth = canvas.width - margin * 2;
      const graphHeight = canvas.height - margin * 2;

      if (ctx) {

        if (this.showChartGrids) {
          this.drawGrid(ctx, 50, 50, graphWidth + 100, graphHeight - 20);
        }

        if (this.xAxesLabels.length > 0) {
          this.labelXAxes(ctx, 50, 50, graphWidth, graphHeight);
        }

        if (this.yAxesLabels.length > 0) {
          this.labelYAxes(ctx, 50, 50, graphWidth, graphHeight);
        }

        if (this.lines && this.lines.length > 0) {
          for (let line of this.lines) {
            this.darwLine(canvas, margin, ctx, line.points, graphWidth, graphHeight, this.getColor(ctx, line.color, margin, margin, 0, canvas.width - margin, canvas.height - margin, 0), line.shadow);
          }
        }

        if (this.highLightedPoint) {
          this.drawHighLightPoint(ctx, 4, graphWidth, graphHeight, canvas, margin);
        }

      }
    }
  }

  darwLine(canvas: any, margin: any, ctx: any, line: any, graphWidth: any, graphHeight: any, color: any, shadow: any) {
    ctx.beginPath();

    ctx.strokeStyle = color;

    ctx.lineWidth = 3.64;
    ctx.lineCap = 'round';

    // Set shadow properties

    if (shadow) {
      ctx.shadowColor = shadow.color; // Shadow color (black with transparency)
      ctx.shadowBlur = shadow.blur; // Blur radius
      ctx.shadowOffsetX = shadow.x; // Shadow offset X
      ctx.shadowOffsetY = shadow.y; // Shadow offset Y
    }


    // Scale factors
    const xScale = graphWidth / 100;
    const yScale = graphHeight / 100; // Assuming data's y values are between 0 and 100

    // Plot each point
    line.forEach((point: any, index: any) => {
      if (index != line.length - 1) {
        const x = margin + (point.x * xScale);
        const y = canvas.height - margin - (point.y * yScale);

        const x2 = margin + (line[index + 1].x * xScale);
        const y2 = canvas.height - margin - (line[index + 1].y * yScale);

        //if (index === 0) {
        //  ctx.moveTo(x, y);
        //} else {
        //  ctx.lineTo(x, y);
        //}
        this.drawCurvedLine(ctx, x, y, x2, y2, 2);
      }
    });

    ctx.stroke();
  }

  drawCurvedLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, radius: number) {
    const midX = (x1 + x2) / 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(midX, y1, midX, y2, x2, y2);
    ctx.lineWidth = radius * 2; // Adjust line width for visual effect
    ctx.stroke();
  }

  drawGrid(ctx: any, shapeX: any, shapeY: any, shapeWidth: any, shapeHeight: any) {
    const gridHeight = 40; // Size of each grid square
    const gridWidth = 120; // Size of each grid square

    for (let x = shapeX; x <= shapeX + shapeWidth; x += gridWidth) {
      for (let y = shapeY; y <= shapeY + shapeHeight; y += gridHeight) {
        // Calculate color based on grid position

        const gradient = ctx.createLinearGradient(x, y, gridWidth, gridHeight);
        gradient.addColorStop(0, 'rgb(27, 25, 61, 90.25%)'); // Start color
        gradient.addColorStop(1, 'rgb(35, 33, 76, 0.01%)'); // End color

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, gridWidth, gridHeight);
      }
    }

    ctx.strokeStyle = '#1C1A41';
    ctx.lineWidth = 10;

    // Draw vertical grid lines
    for (let x = shapeX; x <= shapeX + shapeWidth; x += gridWidth) {
      ctx.beginPath();
      ctx.moveTo(x, shapeY);
      ctx.lineTo(x, shapeY + shapeHeight);
      ctx.stroke();
    }



    // Draw horizontal grid lines
    for (let y = shapeY; y <= shapeY + shapeHeight; y += gridHeight) {
      ctx.beginPath();
      ctx.moveTo(shapeX, y);
      ctx.lineTo(shapeX + shapeWidth, y);
      ctx.stroke();
    }
  }

  drawHighLightPoint(ctx: any, pointIndex: number, graphWidth: any, graphHeight: any, canvas: any, margin: number) {

    const xScale = graphWidth / 100;
    const yScale = graphHeight / 100; // Assuming data's y values are between 0 and 100

    const rectX = margin + (this.highLightedPoint.x * xScale);
    const rectY = 0;

    const rectHeight = graphHeight + (margin * 2); // Height extends to the bottom of the canvas

    // Draw rectangle around the point
    const gradient = ctx.createLinearGradient(rectX - (margin * 1.5), rectY, (margin * 3), rectHeight);
    gradient.addColorStop(0, 'rgb(51, 47, 103, 14%)'); // Start color
    gradient.addColorStop(0.58, 'rgb(69, 65, 133, 25%)');
    gradient.addColorStop(1, 'rgb(78, 76, 161, 5.87%)'); // End color

    ctx.shadowColor = 'rgba(26, 24, 53, 50.66%)';
    ctx.shadowBlur = 43.68;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = -27.3;

    this.drawRoundedRect(ctx, rectX - (margin * 1.5), rectY, (margin * 3), rectHeight, 10, gradient);

    this.clearShadow(ctx);

    const centerX = margin + (this.highLightedPoint.x * xScale);
    const centerY = canvas.height - margin - (this.highLightedPoint.y * yScale);


    let gradientLine = ctx.createLinearGradient(centerX, 0, 5, rectHeight);
    gradientLine.addColorStop(0, 'rgba(249, 76, 213, 0.01%)'); // Start color
    gradientLine.addColorStop(0.46, 'rgba(253, 138, 216, 56.74%)'); // End color
    gradientLine.addColorStop(0.80, '#FA59FF'); // End color
    gradientLine.addColorStop(1, 'rgba(249, 76, 213, 0.01%)'); // Start color


    ctx.strokeStyle = gradientLine; // Ensure no border is drawn

    ctx.beginPath();

    ctx.moveTo(centerX, margin)
    ctx.lineTo(centerX, rectHeight - margin * 3);
    ctx.stroke();


    ctx.strokeStyle = 'transparent'; // Ensure no border is drawn

    //point.x, point.y, 0, point.x, point.y, surroundingPointRadius
    let radius3: number = 50;
    const circles3 = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius3);
    circles3.addColorStop(0, '#FF731C'); // Start color
    circles3.addColorStop(1, 'rgba(255, 73, 200, 0.01%)'); // End color
    this.drawCircle(ctx, centerX, centerY, radius3, circles3);


    let radius2: number = 25;
    const circles2 = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius2);
    circles2.addColorStop(0, '#FF1CAF'); // Start color
    circles2.addColorStop(1, 'rgba(255, 157, 241, 0.01%)'); // End color
    this.drawCircle(ctx, centerX, centerY, radius2, circles2);

    let radius1: number = 15;
    const circles1 = ctx.createLinearGradient(centerX, centerY, centerX, centerY);
    circles1.addColorStop(0, '#FF1CAF'); // Start color
    circles1.addColorStop(1, 'rgba(255, 157, 241, 0.01%)'); // End color
    this.drawCircle(ctx, centerX, centerY, radius1, circles1);


    let radius: number = 8;
    const whiteCircle = ctx.createLinearGradient(centerX, centerY, radius, radius);
    whiteCircle.addColorStop(0, '#FFF2FE'); // Start color
    whiteCircle.addColorStop(1, '#FFBFF6'); // End color
    this.drawCircle(ctx, centerX, centerY, radius, whiteCircle);

  }


  drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number, color: any) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();

    ctx.fillStyle = color; // Set fill color
    ctx.fill();
  }

  drawCircle(ctx: any, centerX: number, centerY: number, radius: number, color: any) {
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
  }
  // Function to label x and y axes
  labelXAxes(ctx: any, shapeX: any, shapeY: any, shapeWidth: any, shapeHeight: any) {
    ctx.font = '10.92px Arial';
    ctx.fillStyle = '#59588D';

    // Label x axis
    for (let x = shapeX; x <= shapeX + shapeWidth; x += 90) { // Adjust the interval as needed
      ctx.fillText('10:59PM', x + 2, shapeY + shapeHeight);
    }
  }

  // Function to label x and y axes
  labelYAxes(ctx: any, shapeX: any, shapeY: any, shapeWidth: any, shapeHeight: any) {
    ctx.font = '10.92px Arial';
    ctx.fillStyle = '#59588D';

    // Label y axis
    for (let y = shapeY; y <= shapeY + shapeHeight; y += 90) { // Adjust the interval as needed
      ctx.fillText(2000, shapeX - 25, y + 4);
    }
  }

  clearShadow(ctx: any) {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  getColor(ctx: any, color: ChartColor | any, x0: any, y0: any, r0: any, x1: any, y1: any, r1: any) {
    let drawColor: any = '';
    switch (color.type) {
      case 'color':
        drawColor = color.color;
        break;
      case 'linear':
        drawColor = ctx.createLinearGradient(x0, y0, x1, y1);
        for (let stop of color.stops) {
          drawColor.addColorStop(stop.start, stop.color); // Start color
        }
        break;
      case 'radial':
        drawColor = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        for (let stop of color.stops) {
          drawColor.addColorStop(stop.start, stop.color); // Start color
        }
        break;
    }

    return drawColor;
  }
}
