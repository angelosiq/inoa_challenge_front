import { CommonModule } from '@angular/common';
import { Component, OnChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stocks-pie-chart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './stocks-pie-chart.component.html',
  styleUrls: ['./stocks-pie-chart.component.css']
})
export class StocksPieChartComponent implements OnChanges {
  @Input() chart!: any;
  chartView: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["chart"] && this.chart) {
      this.createChart();
    }
  }

  createChart(){
    this.chartView = new Chart("MyChart", this.chart);
  }

}
