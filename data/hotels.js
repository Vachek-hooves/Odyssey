const HOTELS = [
  {
    id: 1,
    name: "Bellagio Hotel & Casino",
    rating: 5,
    location: {
      lat: "36.1129° N",
      long: "115.1765° W"
    },
    address: "3600 S Las Vegas Blvd, Las Vegas, NV 89109",
    images: [
      "bellagio-exterior.jpg",
      "bellagio-room.jpg", 
      "bellagio-pool.jpg",
      "bellagio-lobby.jpg"
    ],
    description: "An elegant luxury resort known for its Mediterranean-inspired design and world-famous fountains. Features 3,933 rooms and suites, a 116,000-square-foot casino, fine dining restaurants, the Conservatory & Botanical Gardens, high-end retail shops, and a gallery of fine art. The resort also offers multiple pools, a spa and salon, and nightly performances of 'O' by Cirque du Soleil."
  },
  {
    id: 2,
    name: "The Venetian Resort",
    rating: 5,
    location: {
      lat: "36.1211° N",
      long: "115.1696° W"
    },
    address: "3355 S Las Vegas Blvd, Las Vegas, NV 89109",
    images: [
      "venetian-exterior.jpg",
      "venetian-suite.jpg",
      "venetian-pool.jpg",
      "grand-canal.jpg"
    ],
    description: "A luxury resort celebrating the romance of Venice, featuring all-suite accommodations with Italian-inspired décor. Home to the Grand Canal Shoppes, authentic gondola rides, and over 40 restaurants. The resort includes a 120,000-square-foot casino, Canyon Ranch spa, multiple pools, and various entertainment options. Each suite offers nearly double the space of conventional hotel rooms."
  },
  {
    id: 3,
    name: "Wynn Las Vegas",
    rating: 5,
    location: {
      lat: "36.1275° N",
      long: "115.1664° W"
    },
    address: "3131 S Las Vegas Blvd, Las Vegas, NV 89109",
    images: [
      "wynn-exterior.jpg",
      "wynn-room.jpg",
      "wynn-lake.jpg",
      "wynn-casino.jpg"
    ],
    description: "An upscale resort offering luxurious accommodations and exceptional service. Features a distinctive curved bronze building with 2,716 rooms, multiple award-winning restaurants, designer boutiques, and a pristine golf course. The property includes spectacular entertainment options, a lavish spa, outdoor pools, and meticulously maintained gardens with a Lake of Dreams multimedia experience."
  },
  {
    id: 4,
    name: "ARIA Resort & Casino",
    rating: 5,
    location: {
      lat: "36.1072° N",
      long: "115.1767° W"
    },
    address: "3730 S Las Vegas Blvd, Las Vegas, NV 89158",
    images: [
      "aria-exterior.jpg",
      "aria-room.jpg",
      "aria-pool.jpg",
      "aria-dining.jpg"
    ],
    description: "A modern luxury resort featuring contemporary architecture and advanced technology. Offers 4,004 guest rooms with cutting-edge amenities, a 150,000-square-foot casino, world-class spa, and multiple pools. The resort is known for its fine art collection, exceptional dining options, and commitment to sustainability as one of the largest LEED Gold certified buildings in the world."
  },
  {
    id: 5,
    name: "Caesars Palace",
    rating: 4.5,
    location: {
      lat: "36.1162° N",
      long: "115.1745° W"
    },
    address: "3570 S Las Vegas Blvd, Las Vegas, NV 89109",
    images: [
      "caesars-exterior.jpg",
      "caesars-room.jpg",
      "caesars-pool.jpg",
      "caesars-forum.jpg"
    ],
    description: "An iconic Las Vegas resort celebrating the glory of Rome. Features 3,960 rooms across six towers, a sprawling casino floor, the Forum Shops, and the Colosseum entertainment venue. The resort offers seven pools styled after Roman baths, a luxurious spa, celebrity chef restaurants, and extensive meeting spaces. Known for its classical architecture and legendary entertainment performances."
  },
  {
    id: 6,
    name: "MGM Grand",
    rating: 4.5,
    location: {
      lat: "36.1020° N",
      long: "115.1674° W"
    },
    address: "3799 S Las Vegas Blvd, Las Vegas, NV 89109",
    images: [
      "mgm-exterior.jpg",
      "mgm-room.jpg",
      "mgm-pool.jpg",
      "mgm-arena.jpg"
    ],
    description: "One of the largest hotels in the world, offering 6,852 rooms and suites. Features a 171,500-square-foot casino, the Grand Pool Complex with four pools and lazy river, top-rated shows, and the MGM Grand Garden Arena. The resort includes numerous restaurants, a comprehensive spa, and the TopGolf facility. Known for its extensive entertainment options and diverse dining choices."
  },
  {
    id: 7,
    name: "The Cosmopolitan",
    rating: 5,
    location: {
      lat: "36.1097° N",
      long: "115.1747° W"
    },
    address: "3708 S Las Vegas Blvd, Las Vegas, NV 89109",
    images: [
      "cosmo-exterior.jpg",
      "cosmo-room.jpg",
      "cosmo-pool.jpg",
      "chandelier-bar.jpg"
    ],
    description: "A luxury resort known for its contemporary design and unique vertical multi-tower architecture. Features residential-styled living spaces with private terraces, the distinctive Chandelier Bar, and a diverse collection of restaurants. Offers multiple pools including the Boulevard Pool with stunning Strip views, a world-class spa, and the Marquee Nightclub & Dayclub."
  },
  {
    id: 8,
    name: "Mandalay Bay",
    rating: 4,
    location: {
      lat: "36.0919° N",
      long: "115.1756° W"
    },
    address: "3950 S Las Vegas Blvd, Las Vegas, NV 89119",
    images: [
      "mandalay-exterior.jpg",
      "mandalay-room.jpg",
      "beach-pool.jpg",
      "shark-reef.jpg"
    ],
    description: "A tropical-themed resort featuring a 11-acre pool paradise with real sand beach and wave pool. Houses 3,211 rooms, a 135,000-square-foot casino, the Shark Reef Aquarium, and the House of Blues music hall. Offers diverse dining options, a full-service spa, shopping, and the Mandalay Bay Events Center. Known for its extensive convention facilities and beach-like atmosphere."
  },
  {
    id: 9,
    name: "Paris Las Vegas",
    rating: 4,
    location: {
      lat: "36.1125° N",
      long: "115.1707° W"
    },
    address: "3655 S Las Vegas Blvd, Las Vegas, NV 89109",
    images: [
      "paris-exterior.jpg",
      "paris-room.jpg",
      "paris-pool.jpg",
      "eiffel-view.jpg"
    ],
    description: "A French-themed resort featuring a half-scale replica of the Eiffel Tower. Offers 2,916 rooms and suites decorated in European style, French restaurants including the Eiffel Tower Restaurant, and a 95,000-square-foot casino. Features include a rooftop pool with a French courtyard setting, spa facilities, and entertainment venues. Known for its romantic atmosphere and Parisian streetscape."
  },
  {
    id: 10,
    name: "Red Rock Casino Resort & Spa",
    rating: 4.5,
    location: {
      lat: "36.1147° N",
      long: "115.3006° W"
    },
    address: "11011 W Charleston Blvd, Las Vegas, NV 89135",
    images: [
      "redrock-exterior.jpg",
      "redrock-room.jpg",
      "redrock-pool.jpg",
      "canyon-view.jpg"
    ],
    description: "A modern luxury resort located near Red Rock Canyon, offering a more relaxed Vegas experience. Features 796 rooms and suites, a 87,000-square-foot casino, a 3-acre pool backyard, and a luxury spa. Includes multiple restaurants, a movie theater, bowling alley, and kids club. Known for its stunning views of the Red Rock mountains and sophisticated desert-modern design."
  }
];