window.addEventListener("DOMContentLoaded", () => {

      const tabParenetElement = document.querySelector(".tabheader__items"),
            tabChildElements = document.querySelectorAll(".tabheader__item"),
            tabContentElements = document.querySelectorAll(".tabcontent")

      function hideTabContent() {

            tabChildElements.forEach(item => {
                  item.classList.remove('tabheader__item_active')
            })

            tabContentElements.forEach(item => {
                  item.classList.add('hide')
                  item.classList.remove('show', "fade")
            })

      }

      function showTabContent(i = 0) {
            tabChildElements[i].classList.add("tabheader__item_active")
            tabContentElements[i].classList.add("show","fade")
            tabContentElements[i].classList.remove("hide")
      }

      hideTabContent()
      showTabContent()

      tabParenetElement.addEventListener("click", (event) => {
            if(event.target && event.target.classList.contains("tabheader__item")) {
                  tabChildElements.forEach((item, index) => {
                        if(event.target == item) {
                              hideTabContent()
                              showTabContent(index)
                        }
                  })
            }
      })
})