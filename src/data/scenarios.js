/**
 * SCENARIOS
 * Each scenario has a unique id, income, categories, and surprise bills.
 * Categories use a stable `id` field as the dictionary key for allocations —
 * never use `name` as a key, since display names can change.
 */

export const SCENARIOS = [
  {
    id: "child",
    emoji: "🧒",
    title: "The Cost of YOU",
    subtitle:
      "Ever wondered how much it costs to raise a child for a year? These are the real monthly costs — just for one kid aged around 10.",
    income: 800,
    incomeLabel: "£800 a month — just for one child!",
    isHighlighted: true,
    categories: [
      { id: "food",           name: "Food",                      emoji: "🍽️", amount: 150, type: "variable", tip: "Three meals a day plus snacks for a growing child. That's roughly £5 a day — more than you might think!" },
      { id: "uniform",        name: "School uniform & clothes",   emoji: "👕", amount: 40,  type: "variable", tip: "Uniform, PE kit, shoes, and everyday clothes. Children grow so fast that things need replacing all the time." },
      { id: "school_dinners", name: "School dinners",             emoji: "🥗", amount: 50,  type: "fixed",    tip: "A hot school meal every weekday. Packed lunches are cheaper but still cost money." },
      { id: "clubs",          name: "Clubs & activities",         emoji: "⚽", amount: 70,  type: "variable", tip: "Football, gymnastics, swimming, or music lessons. Most clubs charge a weekly or monthly fee." },
      { id: "trips",          name: "School trips & events",      emoji: "🎒", amount: 20,  type: "variable", tip: "Museum trips, theatre visits, and school charity days all cost money throughout the year." },
      { id: "gifts",          name: "Birthday & Christmas gifts", emoji: "🎁", amount: 40,  type: "variable", tip: "Saving a little each month means the big occasions do not come as a nasty shock." },
      { id: "books",          name: "Books & stationery",         emoji: "📚", amount: 10,  type: "variable", tip: "Pens, pencils, exercise books, reading books, and the occasional revision guide." },
      { id: "toiletries",     name: "Toiletries",                 emoji: "🧴", amount: 15,  type: "fixed",    tip: "Shampoo, toothpaste, soap, and everything else needed to stay clean and healthy." },
      { id: "pocket_money",   name: "Pocket money",               emoji: "💰", amount: 20,  type: "variable", tip: "Many parents give around £5 a week to help children learn about money." },
      { id: "entertainment",  name: "Entertainment",              emoji: "🎮", amount: 25,  type: "variable", tip: "Cinema trips, bowling, gaming, and days out. Children need fun too!" },
      { id: "dentist",        name: "Dentist & optician",         emoji: "🦷", amount: 10,  type: "variable", tip: "NHS dental check-ups are free for children, but glasses and other appointments can add up." },
      { id: "housing_share",  name: "Share of household bills",   emoji: "🏠", amount: 200, type: "fixed",    tip: "A child needs a bedroom, heating, electricity, and food storage. This is their share of the family's housing costs." },
    ],
    surprises: [
      { id: "shoes",     name: "New school shoes needed already!", emoji: "👟", amount: 40,  description: "After just one term, the old pair are worn through. Children's feet grow so quickly — sometimes two sizes in a year." },
      { id: "trip",      name: "School residential trip",          emoji: "🏕️", amount: 180, description: "A three-night trip to an outdoor activity centre. It sounds brilliant — but the letter came home with just two weeks' notice!" },
      { id: "glasses",   name: "Broken glasses",                   emoji: "👓", amount: 90,  description: "Sat on during PE. A new pair of glasses has to be ordered straight away." },
      { id: "phone",     name: "Phone screen cracked",             emoji: "📱", amount: 80,  description: "Dropped on the playground. The repair has to be paid for before it can be used again." },
    ],
  },

  {
    id: "family",
    emoji: "👨‍👩‍👦",
    title: "The Taylor Family",
    subtitle:
      "Mum is a teacher, dad is a nurse. They own a 3-bed semi-detached house and have a dog called Biscuit.",
    income: 4800,
    incomeLabel: "£4,800 a month",
    isHighlighted: false,
    categories: [
      { id: "mortgage",    name: "Mortgage",             emoji: "🏠", amount: 1100, type: "fixed",    tip: "Monthly repayment on a 3-bed semi-detached worth about £280,000. They borrowed from a bank and pay it back over 25 years." },
      { id: "food",        name: "Food shopping",         emoji: "🛒", amount: 400,  type: "variable", tip: "About £100 a week at the supermarket — breakfast, lunch, dinner, and snacks for three people." },
      { id: "energy",      name: "Gas & electricity",     emoji: "💡", amount: 150,  type: "fixed",    tip: "Heating a 3-bed house and running the oven, washing machine, TV, and everything else." },
      { id: "council_tax", name: "Council tax",           emoji: "🏛️", amount: 180,  type: "fixed",    tip: "Paid to the local council for bin collections, street lighting, and local parks." },
      { id: "car",         name: "Car",                   emoji: "🚗", amount: 250,  type: "fixed",    tip: "Monthly finance payment on a 5-year-old hatchback, plus petrol and insurance." },
      { id: "dog",         name: "Biscuit the dog",       emoji: "🐕", amount: 80,   type: "variable", tip: "Dog food, vet check-ups, flea treatment, grooming, and treats!" },
      { id: "internet",    name: "Internet & TV",         emoji: "📺", amount: 60,   type: "fixed",    tip: "Broadband fast enough for working from home and a couple of streaming services." },
      { id: "phones",      name: "Phones",                emoji: "📱", amount: 50,   type: "fixed",    tip: "Two monthly SIM-only contracts — one for mum, one for dad." },
      { id: "clubs",       name: "Kids' clubs",           emoji: "⚽", amount: 120,  type: "variable", tip: "Football on Saturday mornings, swimming lessons midweek, and a school art club." },
      { id: "clothes",     name: "Clothes",               emoji: "👟", amount: 60,   type: "variable", tip: "School uniform, shoes, and casual clothes. Children grow fast — new things are needed every few months." },
      { id: "eating_out",  name: "Eating out",            emoji: "🍕", amount: 80,   type: "variable", tip: "A family takeaway or restaurant trip most weeks — usually Friday night pizza!" },
      { id: "savings",     name: "Savings",               emoji: "🐷", amount: 200,  type: "saving",   tip: "Money set aside every month in case something goes wrong, like the boiler breaking down." },
      { id: "gifts",       name: "Birthdays & Christmas", emoji: "🎁", amount: 60,   type: "variable", tip: "Saving a little each month so the big celebrations do not all arrive at once." },
      { id: "holiday",     name: "Holiday fund",          emoji: "✈️", amount: 150,  type: "saving",   tip: "Saving towards a week abroad in the summer — flights, hotel, and spending money." },
    ],
    surprises: [
      { id: "boiler",   name: "The boiler breaks down!",  emoji: "🔧", amount: 800,  description: "It stops working on a cold January evening. An engineer comes out and fixes it — but it is not cheap." },
      { id: "mot",      name: "The car fails its MOT",    emoji: "🚙", amount: 350,  description: "The car needs new brake pads and a tyre before it can go back on the road." },
      { id: "vet",      name: "Biscuit needs the vet",    emoji: "🐕", amount: 420,  description: "Biscuit eats something he should not have. An emergency vet visit on a Sunday night!" },
      { id: "washing",  name: "The washing machine breaks", emoji: "🫧", amount: 500, description: "It finally gives up after eight years. A new one has to be bought, delivered, and fitted." },
    ],
  },

  {
    id: "student",
    emoji: "🎓",
    title: "Chloe the Student",
    subtitle: "Chloe lives on her own in a small flat and works part-time in a café.",
    income: 1200,
    incomeLabel: "£1,200 a month",
    isHighlighted: false,
    categories: [
      { id: "rent",        name: "Rent",                emoji: "🏠", amount: 550, type: "fixed",    tip: "A small studio flat near her college." },
      { id: "food",        name: "Food",                emoji: "🛒", amount: 120, type: "variable", tip: "Cooking at home as much as possible keeps costs down." },
      { id: "energy",      name: "Gas & electricity",   emoji: "💡", amount: 60,  type: "fixed",    tip: "On top of rent — always check before you sign anything!" },
      { id: "internet",    name: "Internet",            emoji: "📶", amount: 25,  type: "fixed",    tip: "Needed for her studies and video calls home." },
      { id: "phone",       name: "Phone",               emoji: "📱", amount: 20,  type: "fixed",    tip: "A SIM-only plan is much cheaper than a full contract." },
      { id: "council_tax", name: "Council tax",         emoji: "🏛️", amount: 0,   type: "fixed",    tip: "Full-time students do not have to pay council tax — it is one of the few bills they are exempt from!" },
      { id: "transport",   name: "Getting about",       emoji: "🚌", amount: 40,  type: "variable", tip: "A bus pass to get to college and work." },
      { id: "social",      name: "Socialising",         emoji: "🎉", amount: 80,  type: "variable", tip: "Evenings out, meals with friends, and trips." },
      { id: "clothes",     name: "Clothes & toiletries",emoji: "🧴", amount: 30,  type: "variable", tip: "Just the basics." },
      { id: "subs",        name: "Subscriptions",       emoji: "🎵", amount: 15,  type: "fixed",    tip: "Music and TV streaming — student discounts help a lot." },
      { id: "savings",     name: "Savings",             emoji: "🐷", amount: 50,  type: "saving",   tip: "Even saving a small amount each month adds up over time." },
      { id: "laundry",     name: "Laundry",             emoji: "🫧", amount: 20,  type: "variable", tip: "Shared washing machines in the building." },
      { id: "books",       name: "Books & stationery",  emoji: "📚", amount: 15,  type: "variable", tip: "Textbooks can be very expensive — the library is a great help." },
    ],
    surprises: [
      { id: "laptop",   name: "Laptop needs repairing",   emoji: "💻", amount: 180, description: "Chloe spills coffee on her laptop. It needs a new keyboard before she can use it again." },
      { id: "dentist",  name: "Trip to the dentist",       emoji: "🦷", amount: 65,  description: "An NHS check-up and a small filling. Even NHS dentists are not always free." },
      { id: "train",    name: "Train home for Christmas",  emoji: "🚂", amount: 120, description: "Booked at the last minute — much more expensive than it would have been earlier!" },
      { id: "deposit",  name: "Deposit on a new flat",     emoji: "🔑", amount: 600, description: "Moving to a different flat next year means paying a deposit upfront — usually about five weeks' rent." },
    ],
  },

  {
    id: "couple",
    emoji: "💑",
    title: "James & Emma",
    subtitle:
      "James is a police officer and Emma is a graphic designer. They rent a flat together.",
    income: 4200,
    incomeLabel: "£4,200 a month combined",
    isHighlighted: false,
    categories: [
      { id: "rent",        name: "Rent",                    emoji: "🏠", amount: 1200, type: "fixed",    tip: "A two-bedroom flat — they split the cost equally." },
      { id: "food",        name: "Food shopping",           emoji: "🛒", amount: 300,  type: "variable", tip: "Cooking together at home saves a lot of money." },
      { id: "energy",      name: "Gas & electricity",       emoji: "💡", amount: 100,  type: "fixed",    tip: "Bills split between the two of them." },
      { id: "council_tax", name: "Council tax",             emoji: "🏛️", amount: 130,  type: "fixed",    tip: "Everyone who lives somewhere has to pay this to their local council." },
      { id: "internet",    name: "Internet & TV",           emoji: "📺", amount: 55,   type: "fixed",    tip: "Fast broadband because Emma works from home." },
      { id: "phones",      name: "Phones",                  emoji: "📱", amount: 60,   type: "fixed",    tip: "Two monthly phone contracts." },
      { id: "gym",         name: "Gym",                     emoji: "🏋️", amount: 50,   type: "variable", tip: "They both go to the same gym — and get a small discount for joining together." },
      { id: "car",         name: "Car",                     emoji: "🚗", amount: 200,  type: "fixed",    tip: "One shared car — insurance and petrol." },
      { id: "eating_out",  name: "Eating out & takeaways",  emoji: "🍜", amount: 150,  type: "variable", tip: "Their biggest weakness — they love going to restaurants!" },
      { id: "holidays",    name: "Holidays",                emoji: "✈️", amount: 200,  type: "saving",   tip: "Saving up for two holidays a year." },
      { id: "savings",     name: "Savings",                 emoji: "🐷", amount: 300,  type: "saving",   tip: "Putting money aside every month so they can buy their own home one day." },
      { id: "hobbies",     name: "Clothes & hobbies",       emoji: "🎨", amount: 100,  type: "variable", tip: "Art supplies, clothes, cinema trips, and concerts." },
      { id: "subs",        name: "Subscriptions",           emoji: "🎵", amount: 30,   type: "fixed",    tip: "Streaming services, music, and news apps." },
    ],
    surprises: [
      { id: "boiler",   name: "The boiler stops working",    emoji: "🔧", amount: 2800, description: "It breaks down completely. The landlord asks them to help pay — always read your tenancy agreement carefully!" },
      { id: "car_ins",  name: "Car insurance renewal",       emoji: "🚗", amount: 650,  description: "The annual bill arrives — much higher than last year after a small bump." },
      { id: "phone",    name: "Broken phone screen",         emoji: "📱", amount: 220,  description: "Emma drops her phone on the pavement. The repair is expensive without insurance." },
      { id: "wedding",  name: "A friend's wedding abroad",   emoji: "💒", amount: 400,  description: "James's best friend gets married in Spain. Flights, the hotel, and a wedding gift all add up." },
    ],
  },
];
