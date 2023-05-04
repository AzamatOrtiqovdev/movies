window.addEventListener("DOMContentLoaded", () => {

      const tabParenetElement = document.querySelector(".tabheader__items"),
            tabChildElements = document.querySelectorAll(".tabheader__item"),
            tabContentElements = document.querySelectorAll(".tabcontent"),
            loaderElement = document.querySelector(".loader")

      // Loader
      setTimeout(() => {
            loaderElement.style.opacity = "0"
            setTimeout(() => {
                  loaderElement.style.display = 'none'
            }, 500)
      }, 2000)

      // tabs
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

      // timer
      const deadline = '2023-06-04'

      function getTimeRemaining(endtime) {

            let days, hours, minutes,seconds;

            const timer = Date.parse(endtime) - Date.parse(new Date());
             
            if(timer <= 0) {
                  days = 0
                  hours = 0
                  minutes = 0
                  seconds = 0
            } else {
                  days = Math.floor(timer / (24*60*60*1000))
                  hours = Math.floor((timer / (60*60*1000))%24)
                  minutes = Math.floor((timer / (60*1000))%60)
                  seconds = Math.floor((timer / 1000)%60)
            }
                  

            return {timer, days, hours, minutes, seconds}
      }

      function getZero(num) {
            if(num >=0 && num < 10) {
                  return `0${num}`
            }else {
                  return num
            }
      }

      function setClock(selector, endtime) {
            const timerElement = document.querySelector(selector),
                  days = timerElement.querySelector("#days"),
                  hours = timerElement.querySelector("#hours"),
                  minutes = timerElement.querySelector("#minutes"),
                  seconds = timerElement.querySelector("#seconds")
                  timeInterval = setInterval(updateClock, 1000)

            updateClock() 

            function updateClock() {
                  const t = getTimeRemaining(endtime)

                  days.innerHTML = getZero(t.days)
                  hours.innerHTML = getZero(t.hours)
                  minutes.innerHTML = getZero(t.minutes)
                  seconds.innerHTML = getZero(t.seconds)

                  if(t.timer <= 0) {
                        clearInterval(timeInterval)
                  }
            }
      }

      setClock(".timer", deadline)

      // Modal

      const modalTrigger = document.querySelectorAll("[data-modal]"),
            modalElement = document.querySelector(".modal"),
            modalCloseElement = document.querySelector("[data-close")

      function closeModal() {
            modalElement.classList.add("hide")
            modalElement.classList.remove("show")
            document.body.style.overflow = ""
      }

      function showModal() {
            modalElement.classList.add("show")
            modalElement.classList.remove("hide")
            document.body.style.overflow = "hidden"
            clearInterval(modalTimerId)
      }

      modalTrigger.forEach(item => {
            item.addEventListener("click", showModal)
      })

      modalCloseElement.addEventListener("click", closeModal)

      modalElement.addEventListener("click", (event) => {
            if(event.target = 'modal') {
                  closeModal()
            }
      })

      document.addEventListener("keydown", (event) => {
            if(event.code == "Escape" && modalElement.classList.contains("show")) {
                  closeModal()
            }
      })

      const modalTimerId = setTimeout(showModal, 5000)

      function showModalByScroll() {
            if((window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
                  showModal()
                  window.removeEventListener("scroll", showModalByScroll)
            }
      }

      window.addEventListener("scroll", showModalByScroll)
})