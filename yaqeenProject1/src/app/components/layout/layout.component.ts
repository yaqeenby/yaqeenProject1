import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  items = [1, 2, 3, 4, 5];

  constructor() {
  }

  ngOnInit() { }

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

      // Example data
      const data = [
        { x: 0, y: 50 },
        { x: 1, y: 60 },
        { x: 2, y: 70 },
        { x: 3, y: 65 },
        { x: 4, y: 80 },
        { x: 5, y: 85 },
        { x: 6, y: 90 },
        { x: 7, y: 94 },
        { x: 8, y: 57 },
        { x: 9, y: 105 },
        { x: 10, y: 110 }
      ];

      const data2 = [
        { x: 0, y: 55 },
        { x: 1, y: 66 },
        { x: 2, y: 77 },
        { x: 3, y: 60 },
        { x: 4, y: 88 },
        { x: 5, y: 70 },
        { x: 6, y: 99 },
        { x: 7, y: 95 },
        { x: 8, y: 57 },
        { x: 9, y: 50 },
        { x: 10, y: 95 },
        { x: 11, y: 90 },
        { x: 12, y: 120 },
        { x: 13, y: 130 }
      ];

      const margin = 50;
      const graphWidth = canvas.width - margin * 2;
      const graphHeight = canvas.height - margin * 2;

      if (ctx) {

        this.drawGrid(ctx, 50, 50, graphWidth + 100, graphHeight - 20);
        this.labelAxes(ctx, 50, 50, graphWidth, graphHeight);

        //ctx.beginPath();
        //ctx.moveTo(margin, margin);
        //ctx.lineTo(margin, canvas.height - margin);
        //ctx.lineTo(canvas.width - margin, canvas.height - margin);
        //ctx.stroke();

        let gradient = ctx.createLinearGradient(margin, margin, canvas.width - margin, canvas.height - margin);
        gradient.addColorStop(0, 'rgba(255, 113, 68, 0.01%)'); // Start color
        gradient.addColorStop(0.9, '#FF8979'); // End color
        gradient.addColorStop(0.24, '#FF4DCA'); // End color
        gradient.addColorStop(0.44, '#E930FF'); // End color
        gradient.addColorStop(0.94, '#E44D88'); // End color
        gradient.addColorStop(0.97, 'rgba(227, 78, 129, 59.42%)'); // End color
        gradient.addColorStop(1, 'rgba(227, 80, 122, 0.01%)'); // End color

        this.darwLine(canvas, margin, ctx, data, graphWidth, graphHeight, gradient, {
          color: '#BA1358',
          blur: 28.21,
          x: 0,
          y: 3.64
        });

        gradient = ctx.createLinearGradient(margin, margin, canvas.width - margin, canvas.height - margin);
        gradient.addColorStop(0, 'rgba(69, 175, 238, 0.01%)'); // Start color
        gradient.addColorStop(0.4, 'rgba(67, 177, 236, 61.55%)'); // Start color
        gradient.addColorStop(0.8, 'rgba(65, 179, 233, 76.75%'); // Start color
        gradient.addColorStop(0.15, '#3EB7E5'); // End color
        gradient.addColorStop(0.75, '#23DBBD'); // End color
        gradient.addColorStop(0.84, 'rgba(30, 224, 183, 85.3%)'); // End color
        gradient.addColorStop(0.90, 'rgba(28, 228, 179, 76.87%)'); // End color
        gradient.addColorStop(0.93, 'rgba(27, 229, 177, 14.45%)'); // End color
        gradient.addColorStop(1, 'rgba(23, 234, 172, 0.01%)'); // End color

        this.darwLine(canvas, margin, ctx, data2, graphWidth, graphHeight, gradient, {
          color: '#23DBBD',
          blur: 28.21,
          x: 0,
          y: 3.64
        });


        this.highLightPoint(ctx, data, 4, graphWidth, graphHeight, canvas, margin);

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
    const xScale = graphWidth / (line.length - 1);
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

  highLightPoint(ctx: any, line: any, pointIndex: number, graphWidth: any, graphHeight: any, canvas: any, margin: number) {

    let point1 = line[pointIndex - 1];
    let point2 = line[pointIndex + 1];

    const xScale = graphWidth / (line.length - 1);
    const yScale = graphHeight / 100; // Assuming data's y values are between 0 and 100

    const xt1 = margin + (point1.x * xScale);

    const xt2 = margin + (point2.x * xScale);

    const rectX = xt1;
    const rectY = 0;

    const rectHeight = graphHeight + (margin * 2); // Height extends to the bottom of the canvas

    // Draw rectangle around the point
    const gradient = ctx.createLinearGradient(rectX, rectY, xt2 - xt1, rectHeight);
    gradient.addColorStop(0, 'rgb(51, 47, 103, 14%)'); // Start color
    gradient.addColorStop(0.58, 'rgb(69, 65, 133, 25%)');
    gradient.addColorStop(1, 'rgb(78, 76, 161, 5.87%)'); // End color

    ctx.shadowColor = 'rgba(26, 24, 53, 50.66%)';
    ctx.shadowBlur = 43.68;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = -27.3;

    const tryv = margin + (line[pointIndex].x * xScale);

    //ctx.fillRect(rectX, rectY, (xt2 - xt1), rectHeight);
    this.drawRoundedRect(ctx, tryv - (margin * 1.5), rectY, (margin * 3), rectHeight, 10, gradient);




    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    const centerX = margin + (line[pointIndex].x * xScale);
    const centerY = canvas.height - margin - (line[pointIndex].y * yScale);


    let gradientLine = ctx.createLinearGradient(centerX, 0, 5 , rectHeight);
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
    ctx.fillStyle = circles3;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius3, 0, 2 * Math.PI);
    ctx.fill();

    let radius2: number = 25;
    const circles2 = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius2);
    circles2.addColorStop(0, '#FF1CAF'); // Start color
    circles2.addColorStop(1, 'rgba(255, 157, 241, 0.01%)'); // End color
    ctx.fillStyle = circles2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius2, 0, 2 * Math.PI);
    ctx.fill();

    let radius1: number = 15;
    const circles1 = ctx.createLinearGradient(centerX, centerY, 0, centerX, centerY, radius1);
    circles1.addColorStop(0, '#FF1CAF'); // Start color
    circles1.addColorStop(1, 'rgba(255, 157, 241, 0.01%)'); // End color
    ctx.fillStyle = circles1;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius1, 0, 2 * Math.PI);
    ctx.fill();

    let radius: number = 8;
    const whiteCircle = ctx.createLinearGradient(centerX, centerY, radius, radius);
    whiteCircle.addColorStop(0, '#FFF2FE'); // Start color
    whiteCircle.addColorStop(1, '#FFBFF6'); // End color
    ctx.fillStyle = whiteCircle;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  calculateSurroundingPoints(centerX: number, centerY: number, radius: number, count: number) {
    const points = [];
    const angleStep = (2 * Math.PI) / count;

    for (let i = 0; i < count; i++) {
      const angle = i * angleStep;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push({ x, y });
    }

    return points;
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

// Function to label x and y axes
  labelAxes(ctx: any, shapeX: any, shapeY: any, shapeWidth: any, shapeHeight: any) {
  ctx.font = '10.92px Arial';
  ctx.fillStyle = '#59588D';

  // Label x axis
  for (let x = shapeX; x <= shapeX + shapeWidth; x += 90) { // Adjust the interval as needed
    ctx.fillText('10:59PM', x + 2, shapeY + shapeHeight);
  }

  // Label y axis
  for (let y = shapeY; y <= shapeY + shapeHeight; y += 90) { // Adjust the interval as needed
    ctx.fillText(2000, shapeX - 25, y + 4);
  }
}
}
