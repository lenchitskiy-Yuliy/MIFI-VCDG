const readline = require('node:readline/promises');

function ticketPrice(category) {
  switch (category) {
    case 1:
      return 300;
    case 2:
      return 500;
    case 3:
      return 900;
    default:
      return 0;
  }
}

function maxTickets(budget, price) {
  let ticketsCount = 0;
  let availableBudget = budget;

  while (availableBudget >= price) {
    availableBudget -= price;
    ticketsCount++;
  }

  return ticketsCount;
}

function printTicketResult(category, budget) {
  const price = ticketPrice(category);

  if (price === 0) {
    console.log('неизвестная категория');
    return;
  }

  const ticketsCount = maxTickets(budget, price);

  console.log(
    `Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${ticketsCount} шт.`,
  );
}

function deliveryPrice(distance, total) {
  if (total >= 3000 || distance <= 3) {
    return 0;
  }

  if (distance <= 10) {
    return 200;
  }

  return 200 + (distance - 10) * 25;
}

function printDelivery(distance, total) {
  const price = deliveryPrice(distance, total);

  console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`);
}

function printSteps(height) {
  let stepsCount = 0;

  for (let step = 1; step <= height; step++) {
    if (step === 4) {
      continue;
    }

    if (step > 10) {
      console.log('Дальше лестница не построена');
      break;
    }

    console.log(`Ступень ${step}`);
    stepsCount++;
  }

  console.log(`Всего построено: ${stepsCount}`);
}

async function askNumber(rl, question) {
  return Number(await rl.question(question));
}

async function runTicketOffice(rl) {
  const category = await askNumber(rl, 'Категория билета: ');
  const budget = await askNumber(rl, 'Бюджет: ');

  printTicketResult(category, budget);
}

async function runDelivery(rl) {
  const distance = await askNumber(rl, 'Расстояние: ');
  const total = await askNumber(rl, 'Сумма заказа: ');

  printDelivery(distance, total);
}

async function runSteps(rl) {
  const height = await askNumber(rl, 'Высота лестницы: ');

  printSteps(height);
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  try {
    console.log('Выберите задачу:');
    console.log('1 — билетная касса');
    console.log('2 — доставка заказа');
    console.log('3 — лестница');

    const action = await askNumber(rl, 'Ваш выбор: ');

    switch (action) {
      case 1:
        await runTicketOffice(rl);
        break;
      case 2:
        await runDelivery(rl);
        break;
      case 3:
        await runSteps(rl);
        break;
      default:
        console.log('такой задачи нет');
    }
  } finally {
    rl.close();
  }
}

main();
