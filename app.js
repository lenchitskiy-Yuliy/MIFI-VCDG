const sourceJson = `{
  "event": {
    "title": "Ночь в музее",
    "date": "15 ноября, 18:30",
    "place": "Музей космонавтики, проспект Мира, 111",
    "description": "Вечерняя программа с выставкой и экскурсиями",
    "meeting": "Сбор: 18:30. Начало: 19:00."
  },
  "services": [
    { "id": "guide", "title": "  Экскурсия с гидом  ", "price": 500 },
    { "id": "audio", "title": "Аудиогид", "price": 350 },
    { "id": "catalog", "title": "Каталог выставки", "price": 250 }
  ]
}`;

/** Формирует отчёт, сохраняя исходные услуги и их порядок. */
function buildReport(services, guideChecked, audioChecked, catalogChecked) {
  const selectedServices = {
    guide: guideChecked,
    audio: audioChecked,
    catalog: catalogChecked,
  };
  const items = services
    .filter(({ id }) => selectedServices[id])
    .map(({ title, price }) => ({ title: title.trim(), price }));
  const total = items.reduce((sum, { price }) => sum + price, 0);

  return { count: items.length, total, items };
}

function initialize() {
  const serviceForm = document.querySelector("#service-form");
  const showProgramButton = document.querySelector("#show-program");
  const program = document.querySelector("#program");
  const choiceError = document.querySelector("#choice-error");
  const dataError = document.querySelector("#data-error");
  const result = document.querySelector("#result");
  const reportJson = document.querySelector("#report-json");
  const guide = document.querySelector("#guide");
  const audio = document.querySelector("#audio");
  const catalog = document.querySelector("#catalog");

  let data;

  function showProgram() {
    if (!data) return;

    program.innerHTML = data.event.meeting;
    program.hidden = false;
  }

  function submitServices(event) {
    event.preventDefault();

    if (!data) return;

    const report = buildReport(
      data.services,
      guide.checked,
      audio.checked,
      catalog.checked,
    );

    choiceError.hidden = true;
    result.hidden = true;
    reportJson.hidden = true;

    if (report.count === 0) {
      choiceError.textContent = "Выберите хотя бы одну услугу.";
      choiceError.hidden = false;
      return;
    }

    const json = JSON.stringify(report);
    JSON.parse(json);

    result.innerHTML = [
      `Выбрано услуг: ${report.count}`,
      `Итого: ${report.total} руб.`,
      ...report.items.map(({ title }) => title),
    ].join("<br>");
    reportJson.textContent = json;
    result.hidden = false;
    reportJson.hidden = false;
  }

  try {
    data = JSON.parse(sourceJson);
  } catch {
    dataError.textContent = "Ошибка данных.";
    dataError.hidden = false;
  }

  if (data) {
    document.querySelector("#event-title").textContent = data.event.title;
    document.querySelector("#event-date").textContent = data.event.date;
    document.querySelector("#event-place").textContent = data.event.place;
    document.querySelector("#event-description").textContent =
      data.event.description;
    serviceForm.hidden = false;
  }

  showProgramButton.addEventListener("click", showProgram);
  serviceForm.addEventListener("submit", submitServices);
}

initialize();
