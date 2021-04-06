var faker = require("faker");

function generateEvents() {
  let events = [];

  for (let id = 0; id < 50; id++) {
    const name = faker.commerce.productName();
    const price = faker.commerce.price();
    const qty = faker.finance.amount();
    const date = new Date(faker.date.recent()).toLocaleDateString();
    const time = new Date(date).toLocaleTimeString();
    const title = faker.name;

    events.push({
      id: id + 100,
      title,
      name,
      price,
      qty,
      date,
      time,
    });
  }

  return events;
}

module.exports = () => {
  return {
    events: generateEvents(),
  };
};
