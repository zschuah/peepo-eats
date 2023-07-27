import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { RankService } from 'src/app/services/rank.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css'],
})
export class RankComponent implements OnInit {
  food1: Food = {
    name: '',
    description: '',
    id: 0,
    imgPath: '',
    rating: 1200,
    ratingChange: 0,
  };
  food2: Food = {
    name: '',
    description: '',
    id: 0,
    imgPath: '',
    rating: 1200,
    ratingChange: 0,
  };
  foodList: Food[] = [this.food1, this.food2];
  compCounter: number = 0;
  compCounterKey: string = '';

  //SET TRUE TO ADD HARDCODED DATA TO FIREBASE
  isAddHardcodedToFirebase: boolean = false;
  //SET TRUE FOR TESTING
  isHardcodedData: boolean = true;

  constructor(private rankService: RankService) {}

  ngOnInit(): void {
    if (this.isHardcodedData) {
      //Getting hardcoded data from service
      this.foodList = this.rankService.getFoodList();
      this.compCounter = this.rankService.compCounter;
      this.refreshTwoFoods();
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
          this.refreshTwoFoods();
        });

      //Getting compCounter
      this.rankService
        .getCounterFromFirebase()
        .pipe(
          map((responseData) => {
            let fbCounter: number = 0;
            for (const key in responseData) {
              fbCounter = responseData[key];
              this.compCounterKey = key;
            }
            return fbCounter;
          })
        )
        .subscribe((counter) => {
          this.compCounter = counter;
          console.log('COUNTER: ' + counter);
        });
    }

    if (this.isAddHardcodedToFirebase) {
      for (let food of this.foodList) {
        this.rankService.addFoodToFirebase(food);
      }
      this.rankService.addCounterToFirebase(this.compCounter);
    }
  }

  refreshTwoFoods() {
    // To generate between 1 and 10
    // Math.floor(Math.random() * 10 + 1)

    console.log('Length of foodList: ' + this.foodList.length);
    console.log('Generating 2 numbers...');
    let foodNum1 = Math.floor(Math.random() * this.foodList.length + 1) - 1;
    let foodNum2 = Math.floor(Math.random() * this.foodList.length + 1) - 1;
    while (foodNum1 === foodNum2) {
      foodNum2 = Math.floor(Math.random() * this.foodList.length + 1) - 1;
    }

    console.log(foodNum1);
    console.log(foodNum2);

    //JS arrays are pass by reference! No need to put back into array
    this.food1 = this.foodList[foodNum1];
    this.food2 = this.foodList[foodNum2];
    console.log(this.food1.name);
    console.log(this.food2.name);
  }

  playTwoFoods(status: number) {
    this.compCounter++;
    this.rankService.compCounter++;

    console.log('PLAY TWO FOODS');
    console.log(
      `Comparing ${this.food1.name}:${this.food1.rating} and ${this.food2.name}:${this.food2.rating}`
    );
    this.calculateEloRating(this.food1.rating, this.food2.rating, status);

    //Sort by descending rating
    this.foodList.sort((a, b) => {
      return b.rating - a.rating;
    });
    //console.log(this.foodList);

    this.refreshTwoFoods();
  }

  calculateProbability(rating1: number, rating2: number): number {
    return 1 / (1 + Math.pow(10, (rating1 - rating2) / 400));
  }

  calculateEloRating(ratingA: number, ratingB: number, status: number) {
    let k = 30;

    //Calculate winning probability of B
    let winProbB = this.calculateProbability(ratingA, ratingB);
    //Calculate winning probability of A
    let winProbA = this.calculateProbability(ratingB, ratingA);

    //If A wins
    if (status == 1) {
      console.log(`${this.food1.name} has won`);
      ratingA = ratingA + k * (1 - winProbA);
      ratingB = ratingB + k * (0 - winProbB);
    }
    //If B wins
    else {
      console.log(`${this.food2.name} has won`);
      ratingA = ratingA + k * (0 - winProbA);
      ratingB = ratingB + k * (1 - winProbB);
    }

    this.food1.ratingChange = ratingA - this.food1.rating;
    this.food2.ratingChange = ratingB - this.food2.rating;

    // console.log('UPDATED RATINGS');
    // console.log(this.food1.ratingChange);
    // console.log('Rating A: ' + ratingA);
    // console.log(this.food2.ratingChange);
    // console.log('Rating B: ' + ratingB);

    //JS arrays are pass by reference! No need to put back into array
    this.food1.rating = ratingA;
    this.food2.rating = ratingB;

    //UPDATE FIREBASE
    if (!this.isHardcodedData) {
      this.rankService.updateFoodInFirebase(this.food1);
      this.rankService.updateFoodInFirebase(this.food2);
      this.rankService.updateCounterInFirebase(
        this.compCounter,
        this.compCounterKey
      );
    }
  }
}
