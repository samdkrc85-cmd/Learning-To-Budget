/**
 * QUIZ ITEMS
 * Full pool of questions. QUIZ_COUNT are picked at random per game.
 * Each item has a stable `id`, a proper question string, four options
 * (including deliberately low and high outliers), and a context fact
 * shown after the answer is revealed.
 */

export const QUIZ_COUNT = 10;

export const ALL_QUIZ_ITEMS = [
  {
    id: "milk",
    question: "How much do 4 pints of milk cost?",
    emoji: "🥛", amount: 1.55, options: [0.10, 1.55, 5, 12], category: "Supermarket",
    context: "A family of four gets through about 4 pints of milk every week. That adds up to around £80 a year — just on milk!",
  },
  {
    id: "eggs",
    question: "How much do 6 free-range eggs cost?",
    emoji: "🥚", amount: 2, options: [0.20, 2, 6, 15], category: "Supermarket",
    context: "Eggs are one of the cheapest sources of protein. A family eating two eggs each for breakfast would use a box in just one morning!",
  },
  {
    id: "mcdonalds",
    question: "How much does a large McDonald's meal cost?",
    emoji: "🍔", amount: 8, options: [2, 4, 8, 20], category: "Eating out",
    context: "If a family of four each had a meal, that's over £30 — the same as buying a whole week's worth of bread, milk, and eggs at home.",
  },
  {
    id: "football",
    question: "How much does a ticket to a Premier League match cost?",
    emoji: "⚽", amount: 50, options: [5, 15, 50, 200], category: "Entertainment",
    context: "Top clubs like Arsenal and Manchester City charge even more — sometimes over £100. A season ticket for every home game can cost over £1,000!",
  },
  {
    id: "coke",
    question: "How much does a Coca-Cola cost in a restaurant?",
    emoji: "🥤", amount: 4, options: [0.50, 1.50, 4, 10], category: "Eating out",
    context: "The same can from a supermarket costs about 50p. Restaurants charge about eight times more to cover their staff, rent, and kitchen costs.",
  },
  {
    id: "cinema",
    question: "How much does a cinema ticket cost for an adult?",
    emoji: "🎬", amount: 14, options: [2, 6, 14, 30], category: "Entertainment",
    context: "A family of four at the cinema could easily spend £50–£60 on tickets before any popcorn! A monthly streaming service costs about the same as one cinema trip.",
  },
  {
    id: "bread",
    question: "How much does a loaf of bread cost?",
    emoji: "🍞", amount: 1, options: [0.10, 1, 4, 10], category: "Supermarket",
    context: "A family might get through two or three loaves a week — that's around £150 a year just on bread. Prices went up sharply in 2022 and 2023.",
  },
  {
    id: "petrol",
    question: "How much does it cost to fill up a small car with petrol?",
    emoji: "⛽", amount: 65, options: [5, 20, 65, 150], category: "Getting about",
    context: "A full tank takes you about 400 miles — roughly ten return trips to a school 20 miles away. Most drivers fill up once or twice a month.",
  },
  {
    id: "food_shop",
    question: "How much does a week's food shopping cost for a family of four?",
    emoji: "🛒", amount: 100, options: [10, 40, 100, 300], category: "Supermarket",
    context: "That's over £400 a month and around £5,000 a year — one of the biggest costs for any family. Buying own-brand products can save hundreds of pounds.",
  },
  {
    id: "haircut",
    question: "How much does an adult's haircut cost?",
    emoji: "✂️", amount: 18, options: [1, 7, 18, 60], category: "Personal",
    context: "Getting a haircut every six weeks costs about £150 a year. Children's haircuts are usually cheaper. Some families save money by cutting hair at home!",
  },
  {
    id: "gym",
    question: "How much does a monthly gym membership cost?",
    emoji: "🏋️", amount: 35, options: [2, 12, 35, 100], category: "Health",
    context: "That's £420 a year. If you only go twice a month, each visit costs nearly £18. Going regularly makes it much better value for money.",
  },
  {
    id: "coffee",
    question: "How much does a coffee cost in a coffee shop?",
    emoji: "☕", amount: 4, options: [0.30, 1.50, 4, 12], category: "Eating out",
    context: "Buying a coffee every working day costs around £1,000 a year! Making one at home costs about 20p. Small daily habits can add up to a huge amount.",
  },
  {
    id: "netflix",
    question: "How much does a year of Netflix cost?",
    emoji: "📺", amount: 144, options: [10, 40, 144, 500], category: "Subscriptions",
    context: "Many families have several subscriptions — Netflix, Disney+, Spotify, Apple TV — which can easily add up to over £500 a year without people noticing.",
  },
  {
    id: "car_insurance",
    question: "How much does car insurance cost for a year?",
    emoji: "🚗", amount: 620, options: [30, 150, 620, 2000], category: "Getting about",
    context: "You cannot legally drive without insurance. Young, new drivers often pay even more — sometimes over £2,000 a year — because they are more likely to have accidents.",
  },
  {
    id: "pizza",
    question: "How much does a large pizza delivery cost?",
    emoji: "🍕", amount: 16, options: [2, 7, 16, 45], category: "Eating out",
    context: "A family ordering two pizzas with sides could spend £40–£50. Making a pizza at home costs about £2–£3 and can be just as tasty — and much better value!",
  },
  {
    id: "train",
    question: "How much does a return train ticket from London to Manchester cost?",
    emoji: "🚂", amount: 80, options: [10, 35, 80, 200], category: "Getting about",
    context: "Booking weeks in advance can cut the price in half. Last-minute tickets can cost over £200! Trains in the UK are some of the most expensive in Europe.",
  },
  {
    id: "school_shoes",
    question: "How much does a pair of school shoes cost?",
    emoji: "👟", amount: 30, options: [3, 12, 30, 90], category: "Clothes",
    context: "Children often need new shoes every term as their feet grow so quickly. A family with two children could spend over £100 a year just on school shoes.",
  },
  {
    id: "birthday_cake",
    question: "How much does a birthday cake from a supermarket cost?",
    emoji: "🎂", amount: 8, options: [1, 4, 8, 25], category: "Supermarket",
    context: "A cake from a bakery or with a character on it can cost £30 or more! Birthdays, Christmas, and other celebrations can add up to hundreds of pounds a year.",
  },
  {
    id: "phone_contract",
    question: "How much does a monthly phone contract cost?",
    emoji: "📱", amount: 25, options: [2, 10, 25, 80], category: "Subscriptions",
    context: "Over two years (a typical contract length), that's £600 — just for the phone plan. A SIM-only deal is much cheaper if you already own a phone.",
  },
  {
    id: "cat_food",
    question: "How much does a month's worth of cat food cost?",
    emoji: "🐱", amount: 20, options: [2, 8, 20, 60], category: "Pets",
    context: "That's £240 a year just on food! Add in vet bills, cat litter, and pet insurance and a cat can easily cost over £1,000 a year to keep.",
  },
  {
    id: "sofa",
    question: "How much does a sofa cost?",
    emoji: "🛋️", amount: 600, options: [50, 200, 600, 2000], category: "Home",
    context: "A sofa is one of those big costs that sneaks up on you. Most families replace theirs every 8–10 years — so it works out at about £60–£70 a year.",
  },
  {
    id: "washing_machine",
    question: "How much does a washing machine cost?",
    emoji: "🫧", amount: 400, options: [40, 150, 400, 1200], category: "Home",
    context: "A washing machine lasts about 8 years on average. That works out at roughly £50 a year — but you have to find the full amount upfront when it breaks!",
  },
  {
    id: "weekly_coffee",
    question: "How much does a weekly takeaway coffee cost over a year?",
    emoji: "🧋", amount: 200, options: [20, 80, 200, 600], category: "Eating out",
    context: "Just one coffee a week at £4 adds up to over £200 a year. Many people buy one every day — that's nearly £1,500! Small treats add up surprisingly fast.",
  },
  {
    id: "school_trousers",
    question: "How much does a pair of school trousers cost?",
    emoji: "👖", amount: 10, options: [1, 5, 10, 30], category: "Clothes",
    context: "School uniform might seem cheap, but with multiple children needing new sizes every year — plus PE kits, jumpers, and shirts — it can cost hundreds annually.",
  },
  {
    id: "tv_licence",
    question: "How much does a TV licence cost for a year?",
    emoji: "📡", amount: 175, options: [20, 70, 175, 400], category: "Home",
    context: "Everyone in the UK who watches live TV or uses BBC iPlayer needs one. It funds the BBC — but if you only use Netflix and don't watch live TV, you don't need it.",
  },
  {
    id: "dog_food",
    question: "How much does a bag of dog food (15kg) cost?",
    emoji: "🦴", amount: 45, options: [5, 15, 45, 120], category: "Pets",
    context: "A medium-sized dog gets through one of these bags in about 6 weeks. Add vet bills, flea treatment, and insurance and a dog costs well over £1,500 a year.",
  },
  {
    id: "mattress",
    question: "How much does a new mattress cost?",
    emoji: "🛏️", amount: 350, options: [30, 100, 350, 1000], category: "Home",
    context: "We spend about a third of our lives in bed! A good mattress can last 8–10 years, but a cheap one that leaves you tired costs more in the long run.",
  },
  {
    id: "shampoo",
    question: "How much does a bottle of shampoo cost?",
    emoji: "🧴", amount: 4, options: [0.50, 2, 4, 15], category: "Personal",
    context: "A bottle lasts about a month — so that's £48 a year, just on shampoo. Toiletries like shower gel, toothpaste, and deodorant add up to over £200 a year for most adults.",
  },
  {
    id: "spotify",
    question: "How much does a Spotify subscription cost per month?",
    emoji: "🎵", amount: 11, options: [1, 5, 11, 25], category: "Subscriptions",
    context: "That's £132 a year. Many families also pay for Netflix, Disney+, and Apple TV — it's easy to rack up over £500 a year on subscriptions without realising.",
  },
  {
    id: "backpack",
    question: "How much does a new school backpack cost?",
    emoji: "🎒", amount: 20, options: [2, 8, 20, 60], category: "Clothes",
    context: "A decent bag should last a couple of years. But add in pencil cases, lunch boxes, and water bottles and the start of each school year can cost £50 or more.",
  },
  {
    id: "theme_park",
    question: "How much does a family day out at a theme park cost?",
    emoji: "🎢", amount: 160, options: [20, 60, 160, 400], category: "Entertainment",
    context: "That's for two adults and two children at a mid-sized UK park. Add food, parking, and souvenirs and it can easily top £200–£250 for the day!",
  },
  {
    id: "toilet_rolls",
    question: "How much does a pack of 24 toilet rolls cost?",
    emoji: "🧻", amount: 9, options: [1, 4, 9, 25], category: "Supermarket",
    context: "A family of four gets through about 100 rolls a month. That works out at roughly £45 a year just on toilet paper — one of those costs you never really think about!",
  },
  {
    id: "bicycle",
    question: "How much does a children's bicycle cost?",
    emoji: "🚲", amount: 120, options: [15, 50, 120, 400], category: "Toys & gear",
    context: "Children often need a new bike every couple of years as they grow. A decent one costs around £100–£150, and you will need a helmet too — around £25–£40 extra.",
  },
  {
    id: "bus_pass",
    question: "How much does a weekly bus pass cost in a city?",
    emoji: "🚌", amount: 20, options: [2, 8, 20, 60], category: "Getting about",
    context: "That's £80 a month, or nearly £1,000 a year, just to get around by bus. Many people have to pay this on top of all their other bills.",
  },
  {
    id: "tea_bags",
    question: "How much does a box of 40 tea bags cost?",
    emoji: "🍵", amount: 3, options: [0.20, 1, 3, 10], category: "Supermarket",
    context: "A family that drinks 4 cups of tea a day would use a box in under two weeks — that's over £70 a year just on tea bags. Very British!",
  },
];
