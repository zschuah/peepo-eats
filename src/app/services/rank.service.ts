import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RankService {
  //HARDCODED DATA
  compCounter: number = 0;
  foodList: Food[] = [
    new Food(
      'Satay',
      'Some delicious satay',
      1200,
      0,
      'https://upload.wikimedia.org/wikipedia/commons/4/4a/Satay_chicken.JPG'
    ),
    new Food(
      'Chicken rice',
      'Some delicious chicken rice',
      1200,
      0,
      'https://upload.wikimedia.org/wikipedia/commons/7/71/Hainanese_Chicken_Rice.jpg'
    ),
    new Food(
      'Chilli crab',
      'Some delicious chilli crab',
      1200,
      0,
      'https://upload.wikimedia.org/wikipedia/commons/c/c6/Chilli_crab-02.jpg'
    ),
    new Food(
      'Laksa',
      'Some delicious laksa',
      1200,
      0,
      'https://upload.wikimedia.org/wikipedia/commons/d/d6/Laksa.JPG'
    ),
    new Food(
      'Bak Kut Teh',
      'Some delicious bak kut teh',
      1200,
      0,
      'https://upload.wikimedia.org/wikipedia/commons/2/20/Bak_Kut_Teh%2C_Singapore.JPG'
    ),
  ];

  foodListFinal: Food[] = [
    new Food(
      'Turkey Bacon Sandwich',
      'Egg Stop. Really generous with their scrambled eggs.',
      1200,
      0,
      'assets/img/tbc-sandwich.jpg'
    ),
    new Food(
      'Brown Sugar Bingsu',
      'Oma Spoon. Ultimate satisfaction.',
      1200,
      0,
      'assets/img/bs-bingsu.jpg'
    ),
    new Food(
      'Shibuya Toast',
      'Tuk Tuk Cha. Ultimate satisfaction.',
      1200,
      0,
      'assets/img/tmt-shibuya.jpg'
    ),
    new Food(
      'Lor Mee',
      'Old Kallang Airport Hawker Center. The one with the longest queue.',
      1200,
      0,
      'assets/img/lormee.jpg'
    ),
    new Food(
      'Hokkien Mee',
      'Kims Place Seafood Restaurant. Absolutely amazing.',
      1200,
      0,
      'assets/img/hokkienmee.jpg'
    ),
    new Food(
      'Milo Dinosaur',
      'Julaiha Muslim Restautant. Iced Milo topped up with Milo powder.',
      1200,
      0,
      'assets/img/milodinosaur.jpg'
    ),
    new Food(
      'Bak Kut Teh',
      'Old Street Bak Kut Teh. Meat is so tender it falls right off the bone.',
      1200,
      0,
      'assets/img/bakkutteh.jpg'
    ),
    new Food(
      'Laksa',
      'Janggut Laksa. A must-try.',
      1200,
      0,
      'assets/img/laksa.jpg'
    ),
    new Food(
      'Cheese Prata',
      'Ali Khan Restaurant. Cheesy goodness.',
      1200,
      0,
      'assets/img/cheeseprata.jpg'
    ),
    new Food(
      'Fried Chicken',
      'Chickaboo. Crispy on the outside, tender on the inside.',
      1200,
      0,
      'assets/img/friedchicken.jpg'
    ),
    new Food(
      'Salmon Kaisen Don',
      'Tanuki Raw. Tiny portion, but still amazing.',
      1200,
      0,
      'assets/img/sk-don.jpg'
    ),
    new Food(
      'Paper Wrapped Chicken',
      'Hillman Restaurant. Incredible flavour.',
      1200,
      0,
      'assets/img/pw-chicken.jpg'
    ),
    new Food(
      'Chicken Rice',
      'Lam Bee Restaurant. Cheap and delicious.',
      1200,
      0,
      'assets/img/chickenrice.jpg'
    ),
    new Food(
      'Char Kuay Tiao',
      'Circuit Road Hawker Center. A classic dish.',
      1200,
      0,
      'assets/img/charkuaytiao.jpg'
    ),
    new Food(
      'Mee Pok',
      'The Art of Mee Pok. A must-try.',
      1200,
      0,
      'assets/img/meepok.jpg'
    ),
    new Food(
      'Ramen',
      'So Ramen. Tasty and affordable ramen.',
      1200,
      0,
      'assets/img/ramen.jpg'
    ),
    new Food(
      'Potato Salad',
      'So Ramen. Contains more potato than salad.',
      1200,
      0,
      'assets/img/potatosalad.jpg'
    ),
    new Food(
      'McGriddles',
      'McDonalds. Im lovin it.',
      1200,
      0,
      'assets/img/mcgriddles.jpg'
    ),
    new Food(
      'Unagi Don',
      'Man Man Japanese Unagi Restaurant. Definitely worth the long queue.',
      1200,
      0,
      'assets/img/unagidon.jpg'
    ),
    new Food(
      'Chicken Cutlet',
      'Astons. Side dishes were tasty too.',
      1200,
      0,
      'assets/img/bpc-cutlet.jpg'
    ),
    new Food(
      'Fish and Chips',
      'Fish and Co. Crispiness on the outside, softness on the inside.',
      1200,
      0,
      'assets/img/fishandchips.jpg'
    ),
    new Food(
      'Mala Xiang Guo',
      'Ri Ri Hong Mala Xiang Guo. A must-try.',
      1200,
      0,
      'assets/img/mala.jpg'
    ),
    new Food(
      'Tendon',
      'Tendon Kohaku. Great flavours packed in a bowl.',
      1200,
      0,
      'assets/img/tendon.jpg'
    ),
    new Food(
      'Wanton Mee',
      'Pontian Wanton Noodles. A classic dish.',
      1200,
      0,
      'assets/img/wantonmee.jpg'
    ),
    new Food(
      'Kaya Toast',
      'Toast Box. A great breakfast meal.',
      1200,
      0,
      'assets/img/kayatoast.jpg'
    ),
    new Food(
      'BBQ Chicken Wings',
      'Newton Food Centre. An absolute must-have.',
      1200,
      0,
      'assets/img/bbq-chickenwings.jpg'
    ),
    new Food(
      'Hotpot',
      'Hai Di Lao. Good overall, but on the pricy side.',
      1200,
      0,
      'assets/img/hotpot.jpg'
    ),
    new Food(
      'Duck Rice',
      'Yu Kee Duck Rice. A great combination of flavours.',
      1200,
      0,
      'assets/img/duckrice.jpg'
    ),
    new Food(
      'Prawn Roll',
      'Hong Kong Street Zhen Ji. Crispy and savoury.',
      1200,
      0,
      'assets/img/prawnroll.jpg'
    ),
    new Food(
      'Soft Boiled Eggs',
      'Toast Box. Part of a great breakfast meal.',
      1200,
      0,
      'assets/img/sb-eggs.jpg'
    ),
    new Food(
      'Grilled Fish',
      'Tan Yu. As spicy as it looks.',
      1200,
      0,
      'assets/img/grilledfish.jpg'
    ),
    new Food(
      'Chicago Pizza',
      'Pizza Maru. An explosion of cheese inside.',
      1200,
      0,
      'assets/img/chicagopizza.jpg'
    ),
    new Food(
      'Chicken Tikka',
      'Zaffron Kitchen. A tinge of sourness which adds to the overall flavour.',
      1200,
      0,
      'assets/img/chickentikka.jpg'
    ),
    new Food(
      'Doujiang Youtiao',
      'Yong He Eating House. Perfect for supper.',
      1200,
      0,
      'assets/img/dj-youtiao.jpg'
    ),
    new Food(
      'Roast Pork',
      'Hawker Chan. Not just a great place for chicken, but for pork as well.',
      1200,
      0,
      'assets/img/roastpork.jpg'
    ),
  ];

  constructor(private http: HttpClient) {}

  getFoodList() {
    return this.foodListFinal;
  }

  addFoodToFirebase(food: Food) {
    console.log('Adding food to firebase...');
    this.http
      .post(`https://foodprek.firebaseio.com/food.json`, food)
      .subscribe((response) => {
        console.log(response);
      });
  }
  addCounterToFirebase(counter: number) {
    console.log('Adding counter to firebase...');
    this.http
      .post(`https://foodprek.firebaseio.com/counter.json`, counter)
      .subscribe((response) => {
        console.log(response);
      });
  }

  getFoodListFromFirebase() {
    //console.log('Getting foodList from firebase...');
    return this.http.get(`https://foodprek.firebaseio.com/food.json`);
  }
  getCounterFromFirebase() {
    //console.log('Getting counter from firebase...');
    return this.http.get('https://foodprek.firebaseio.com/counter.json');
  }

  updateFoodInFirebase(food: Food) {
    //console.log('Updating food in firebase...');

    this.http
      .put(
        `https://foodprek.firebaseio.com/food/${food.id}/rating.json`,
        food.rating
      )
      .subscribe((response) => {
        //console.log(`${food.name} rating: ${response}`);
      });
    this.http
      .put(
        `https://foodprek.firebaseio.com/food/${food.id}/ratingChange.json`,
        food.ratingChange
      )
      .subscribe((response) => {
        //console.log(`${food.name} ratingChange: ${response}`);
      });
  }
  updateCounterInFirebase(counter: number, counterKey: string) {
    this.http
      .put(
        `https://foodprek.firebaseio.com/counter/${counterKey}.json`,
        counter
      )
      .subscribe((response) => {
        //console.log('COUNTER: ' + response);
      });
  }
}
