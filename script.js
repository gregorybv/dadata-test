const token = "4588af0078c76bcdde9adb13cf510c2ea8dea299" // API берем с сайта https://dadata.ru/api/suggest/party/

const inputField = document.getElementById("party")
const nameShortField = document.getElementById("name_short")
const nameFullField = document.getElementById("name_full")
const innKppField = document.getElementById("inn_kpp")
const addressField = document.getElementById("address")

const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party"

inputField.addEventListener("input", () => {
  const inputValue = inputField.value.trim()

  if (inputValue) {
    fetch(url, {
      // код с сайта API
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        query: inputValue,
        count: 10,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const partyList = data.suggestions.map((suggestion) => suggestion.data)

        // создаем выпадающий список вариантов
        const listContainer = document.createElement("div")
        listContainer.classList.add("list-container")
        listContainer.innerHTML = ""

        partyList.forEach((party) => {
          const listItem = document.createElement("div")
          listItem.classList.add("list-item")
          listItem.innerHTML = `${party.name.short_with_opf} (${party.inn})`
          listItem.addEventListener("click", () => {
            // заполняем поля реквизитов выбранной компании(данные полей берем с сайта API)
            nameShortField.value = party.name.short_with_opf
            nameFullField.value = party.name.full_with_opf
            innKppField.value = `${party.inn}/${party.kpp}`
            addressField.value = party.address.value
            // убираем выпадающий список вариантов
            listContainer.innerHTML = ""
          })
          listContainer.appendChild(listItem)
        })

        // добавляем выпадающий список в подходящее место на странице
        const resultSection = document.querySelector(".result")
        resultSection.appendChild(listContainer)
      })
      .catch((error) => console.log(error))
  }
})
