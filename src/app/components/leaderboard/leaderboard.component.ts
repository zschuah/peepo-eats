import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { RankService } from 'src/app/services/rank.service';
import { map } from 'rxjs/operators';

import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  foodList: Food[];
  foodListChart: Food[];

  //SET TRUE FOR TESTING
  isHardcodedData: boolean = true;

  constructor(private rankService: RankService) {}

  ngOnInit(): void {
    if (this.isHardcodedData) {
      //Getting hardcoded data from service
      this.foodList = this.rankService.getFoodList();
      console.log(this.foodList);

      this.plotChart();
    } else {
      //Getting realtime data from firebase
      this.rankService
        .getFoodListFromFirebase()
        .pipe(
          map((responseData) => {
            const foodListArray: Food[] = [];
            for (const key in responseData) {
              foodListArray.push({ ...responseData[key], id: key });
            }
            return foodListArray;
          })
        )
        .subscribe((foodListFirebase) => {
          this.foodList = foodListFirebase;
          this.plotChart();
        });
    }
  }

  plotChart() {
    Chart.defaults.global.defaultFontColor = 'white';
    var myChart = new Chart('myChart', {
      type: 'horizontalBar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Rating',
            data: [],
            backgroundColor: [
              'rgba(255, 166, 0, 0.2)',
              'rgba(255, 124, 67, 0.2)',
              'rgba(249, 93, 106, 0.2)',
              'rgba(212, 80, 135, 0.2)',
              'rgba(160, 81, 149, 0.2)',
              'rgba(102, 81, 145, 0.2)',
              'rgba(47, 75, 124, 0.2)',
              'rgba(0, 63, 92, 0.2)',
            ],
            borderColor: [
              'rgba(255, 166, 0, 1)',
              'rgba(255, 124, 67, 1)',
              'rgba(249, 93, 106, 1)',
              'rgba(212, 80, 135, 1)',
              'rgba(160, 81, 149, 1)',
              'rgba(102, 81, 145, 1)',
              'rgba(47, 75, 124, 1)',
              'rgba(0, 63, 92, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: false,
              },
            },
          ],
        },
      },
    });

    //Sort by descending rating
    this.foodList.sort((a, b) => {
      return b.rating - a.rating;
    });
    this.foodListChart = this.foodList.slice(0, 10);
    for (let food of this.foodListChart) {
      myChart.data.labels.push(food.name);
      myChart.data.datasets.forEach((dataset) => {
        dataset.data.push(Math.round(food.rating));
        dataset.backgroundColor.push('rgba(0, 63, 92, 0.2)');
        dataset.borderColor.push('rgba(0, 63, 92, 1)');
      });
    }
    myChart.update();
  }
}
