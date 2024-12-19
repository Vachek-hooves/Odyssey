const ATTRACTIONS = [
  {
    id: 1,
    name: "Bellagio Conservatory & Botanical Gardens",
    location: {
      lat: "36.1126° N",
      long: "115.1767° W"
    },
    images: [
      "bellagio-conservatory-spring.jpg",
      "bellagio-conservatory-flowers.jpg",
      "bellagio-glass-ceiling.jpg"
    ],
    description: "A 14,000-square-foot floral playground that transforms with the seasons. Located inside the Bellagio Hotel, this magnificent garden showcases extraordinary horticulture displays that change five times per year – four seasons plus Chinese New Year. Each display features tens of thousands of flowers, trees, and plants arranged in whimsical designs with enchanting music and lighting effects. The conservatory is maintained by 120 expert horticulturists who meticulously care for the exhibits.",
    rating: 4.8
  },
  {
    id: 2,
    name: "Fountains of Bellagio",
    location: {
      lat: "36.1129° N", 
      long: "115.1765° W"
    },
    images: [
      "bellagio-fountains-night.jpg",
      "fountains-show.jpg",
      "bellagio-water-dance.jpg"
    ],
    description: "An iconic Las Vegas attraction featuring a vast man-made lake with over 1,000 fountains that sway and dance in perfect synchronization to music and lights. The fountains shoot water up to 460 feet in the air during the spectacular shows that occur every 30 minutes from 3:00 PM to 8:00 PM Monday through Friday, every 30 minutes from noon to 8:00 PM on weekends and holidays, and every 15 minutes from 8:00 PM to midnight.",
    rating: 4.9
  },
  {
    id: 3,
    name: "High Roller Observation Wheel",
    location: {
      lat: "36.1173° N",
      long: "115.1711° W"
    },
    images: [
      "high-roller-night.jpg",
      "observation-cabin.jpg",
      "vegas-view.jpg"
    ],
    description: "Standing 550 feet tall, the High Roller is the world's tallest observation wheel. Located at The LINQ, this massive Ferris wheel takes passengers on a 30-minute journey offering breathtaking 360-degree views of the Las Vegas Valley. Each spherical cabin can hold up to 40 passengers and is equipped with interactive screens and an open bar option. The wheel is illuminated at night with thousands of LED lights creating a stunning visual display.",
    rating: 4.7
  },
  {
    id: 4,
    name: "Welcome to Fabulous Las Vegas Sign",
    location: {
      lat: "36.0814° N",
      long: "115.1728° W"
    },
    images: [
      "vegas-sign-day.jpg",
      "welcome-sign-night.jpg",
      "historic-landmark.jpg"
    ],
    description: "This iconic neon sign has been welcoming visitors to Las Vegas since 1959. Designed by Betty Willis, the 25-foot-tall sign has become one of the most recognizable symbols of Las Vegas. Located on the south end of the Strip, it features the famous text 'Welcome to Fabulous Las Vegas, Nevada' on the front and 'Drive Carefully, Come Back Soon' on the back. The sign is powered by solar panels and is illuminated 24/7.",
    rating: 4.6
  },
  {
    id: 5,
    name: "Fremont Street Experience",
    location: {
      lat: "36.1699° N",
      long: "115.1398° W"
    },
    images: [
      "fremont-lights.jpg",
      "street-performers.jpg",
      "viva-vision.jpg"
    ],
    description: "A five-block entertainment district in historic downtown Las Vegas featuring Viva Vision, the world's largest video screen. This pedestrian mall offers free nightly light shows, live music, street performers, and unique attractions. The 1,500-foot-long canopy features 12.5 million LED lights creating stunning visual displays. The area is home to classic casinos, restaurants, and shops, providing a more vintage Vegas experience compared to the modern Strip.",
    rating: 4.5
  },
  {
    id: 6,
    name: "The Venetian Gondola Rides",
    location: {
      lat: "36.1211° N",
      long: "115.1696° W"
    },
    images: [
      "venetian-canals.jpg",
      "gondola-ride.jpg",
      "venice-replica.jpg"
    ],
    description: "Experience a slice of Venice at The Venetian Resort with authentic gondola rides along recreated Venetian canals. Professional gondoliers serenade passengers as they navigate through the indoor and outdoor waterways beneath bridges and alongside cafes. The attraction perfectly captures the romance and charm of Venice, complete with detailed architecture and hand-painted scenery. Choose between indoor rides through the Grand Canal Shoppes or outdoor rides with views of the Strip.",
    rating: 4.6
  },
  {
    id: 7,
    name: "Stratosphere Tower Thrill Rides",
    location: {
      lat: "36.1475° N",
      long: "115.1566° W"
    },
    images: [
      "strat-tower.jpg",
      "thrill-rides.jpg",
      "skyjump.jpg"
    ],
    description: "The tallest freestanding observation tower in the United States features some of the world's highest thrill rides. Located atop the STRAT Hotel, the tower offers four extreme rides including X-Scream, Insanity, Big Shot, and SkyJump. At 1,149 feet high, these attractions provide both heart-pounding excitement and spectacular views of Las Vegas. The indoor and outdoor observation decks offer 360-degree views of the city.",
    rating: 4.5
  },
  {
    id: 8,
    name: "Red Rock Canyon",
    location: {
      lat: "36.1311° N",
      long: "115.4262° W"
    },
    images: [
      "red-rock-vista.jpg",
      "hiking-trails.jpg",
      "desert-landscape.jpg"
    ],
    description: "Located just 20 minutes from the Strip, Red Rock Canyon offers a stunning contrast to the city's neon lights. The conservation area features a 13-mile scenic drive, more than 30 miles of hiking trails, rock climbing areas, and desert wildlife viewing. The distinctive red sandstone formations were created by geological forces over millions of years. The visitor center provides educational exhibits about the area's geology, ecology, and cultural history.",
    rating: 4.8
  },
  {
    id: 9,
    name: "Mob Museum",
    location: {
      lat: "36.1735° N",
      long: "115.1405° W"
    },
    images: [
      "mob-museum-exterior.jpg",
      "crime-lab.jpg",
      "prohibition-exhibit.jpg"
    ],
    description: "The National Museum of Organized Crime and Law Enforcement, commonly known as the Mob Museum, provides a world-class, interactive journey through true stories of organized crime. Located in a historic former courthouse, the museum features engaging exhibits, artifacts, and multimedia presentations. Visitors can explore the real stories of Mob history, law enforcement's fight against organized crime, and the impact on Las Vegas and American society.",
    rating: 4.7
  },
  {
    id: 10,
    name: "Paris Las Vegas Eiffel Tower Experience",
    location: {
      lat: "36.1125° N",
      long: "115.1707° W"
    },
    images: [
      "paris-tower.jpg",
      "observation-deck.jpg",
      "night-view.jpg"
    ],
    description: "A half-scale replica of the famous Parisian landmark, the Eiffel Tower at Paris Las Vegas offers spectacular views from its observation deck at 460 feet. The experience includes a glass elevator ride to the top where knowledgeable ambassadors point out Las Vegas landmarks. The tower is particularly romantic at night, offering stunning views of the Bellagio fountains and the glittering Strip below.",
    rating: 4.6
  },
  {
    id: 11,
    name: "Neon Museum",
    location: {
      lat: "36.1766° N",
      long: "115.1356° W"
    },
    images: [
      "neon-boneyard.jpg",
      "vintage-signs.jpg",
      "night-tour.jpg"
    ],
    description: "Known as the 'Neon Boneyard,' this outdoor museum preserves iconic Las Vegas signs from the 1930s to the present day. The collection includes more than 200 unrestored neon signs, each telling a unique story about Las Vegas history. Guided tours are available day and night, with evening tours offering illuminated signs and special lighting effects. The visitor center is housed in the restored La Concha Motel lobby.",
    rating: 4.7
  },
  {
    id: 12,
    name: "Caesar's Palace Forum Shops",
    location: {
      lat: "36.1178° N",
      long: "115.1756° W"
    },
    images: [
      "forum-shops.jpg",
      "spiral-escalator.jpg",
      "fall-of-atlantis.jpg"
    ],
    description: "A luxury shopping destination featuring Roman-themed architecture, animated statues, and a stunning sky-painted ceiling that changes from day to night. The Forum Shops at Caesars Palace offers over 160 specialty stores and fine restaurants. The mall features attractions like the Fall of Atlantis animatronic show, a 50,000-gallon aquarium, and the world's largest spiral escalator. The architecture and design create an immersive ancient Roman atmosphere.",
    rating: 4.5
  }
];
