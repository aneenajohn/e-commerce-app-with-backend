import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";

faker.seed(123);

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },

    models: {
      product: Model
    },

    routes() {
      this.namespace = "api";
      // this.timing = 3000;
      this.resource("products");
    },

    seeds(server) {
      [...Array(30)].forEach((_) => {
        server.create("product", {
          id: faker.random.arrayElement([
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12
          ]),
          quantity: 0,
          name: faker.commerce.productName(),
          image: faker.random.image(),
          price: faker.commerce.price(),
          inStock: faker.datatype.boolean(),
          fastDelivery: faker.datatype.boolean(),
          ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
          offer: faker.random.arrayElement([
            "Save 50%",
            "70% bonanza",
            "Best Seller",
            "Best Deals",
            "Upto 40% OFF"
          ])
        });
      });
    }
  });
}
