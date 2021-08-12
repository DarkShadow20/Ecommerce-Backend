const faker = require("faker");

const categories = [
  "Racquet",
  "Shuttle",
  "String"
];
const featuredCategories=[
  {name:"Racquet",img:"https://www.yonex.com/media/catalog/category/Badminton-Racquets-Desktop.jpg"},
  {name:"Shuttle",img:"https://www.yonex.com/media/catalog/category/Badminton-Shuttles-Desktop.jpg"},
  {name:"String",img:"https://www.yonex.com/media/catalog/category/Badminton-Strings-Desktop.jpg"}
]

faker.seed(123);
const products = [...Array(40)].map((item) => ({
  name: faker.commerce.productName(),
  image: faker.random.image(),
  category:faker.random.arrayElement([...categories]),
  price: faker.commerce.price(),
  inStock: faker.random.boolean(),
  fastDelivery: faker.random.boolean(),
  quantity:faker.random.number({
    'min': 1,
    'max': 1
}),
  rating: faker.random.arrayElement([1, 2, 3, 4, 5]),
}));


module.exports = products;