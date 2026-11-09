// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

let resultCount = null
let resultList = null

function selectAttempts(filter) {
  const attempts = window.reportData.attempts

  if (filter === 'passed') {
    return attempts.filter((attempt) => attempt.passed)
  }

  if (filter === 'failed') {
    return attempts.filter((attempt) => !attempt.passed)
  }

  return attempts
}

function renderAttempts(attempts) {
  const total = window.reportData.attempts.length
  const questionCount = window.reportData.questionCount
  let markup = ''

  attempts.forEach((attempt) => {
    const status = attempt.passed ? 'Порог пройден' : 'Порог не пройден'

    markup += `
      <li class="result-item">
        <span class="result-name">${escapeHtml(attempt.name)}</span>
        <span>${attempt.score} из ${questionCount} (${attempt.percentage}%) — ${status}</span>
      </li>`
  })

  resultCount.textContent = `Показано: ${attempts.length} из ${total}`
  resultList.innerHTML = markup
}

function startFilter() {
  const form = document.querySelector('#filter-form')
  const select = document.querySelector('#filter')
  resultCount = document.querySelector('#result-count')
  resultList = document.querySelector('#result-list')

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderAttempts(selectAttempts(select.value))
  })
}

startFilter()
