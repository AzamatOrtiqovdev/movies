import { msg } from "../js/data.js";

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
                  seconds = timerElement.querySelector("#seconds"),
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
            modalElement = document.querySelector(".modal")

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


      modalElement.addEventListener("click", (event) => {
            if(event.target.classList.contains('modal') || event.target.getAttribute('data-close') == "") {
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

      // Class
      
      class MenuCard {
            constructor(src, alt, title, descr, price, parentSelector, ...classes) {
                  this.src = src
                  this.alt = alt
                  this.title = title
                  this.descr = descr
                  this.price = price
                  this.classes = classes
                  this.parent = document.querySelector(parentSelector)
                  this.transfer = 11380
                  this.changeToUZS()
            }

            changeToUZS() {
                  this.price = this.price * this.transfer
            }

            render() {
                  const menuItemElement = document.createElement("div")

                  if(this.classes.length === 0) {
                        menuItemElement.classList.add("menu__item")
                  } else {
                        this.classes.forEach(className => {menuItemElement.classList.add(className)})
                  }

                  menuItemElement.innerHTML = `
                        <img src=${this.src} alt=${this.alt} />
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                        <div class="menu__item-cost">Price:</div>
                        <div class="menu__item-total"><span>${this.price}</span> uzs/month</div>
                        </div>
                  `
                  this.parent.append(menuItemElement)
            }
      }

      axios.get("http://localhost:3000/menuData")
            .then((menuData) => {
                  menuData.data.forEach(({src, alt, title, descr, price}) => { // destruptizatsiya
                        new MenuCard(src, alt, title, descr, price, ".menu .container").render()
                  })
            })

      // async function getRecource(url) {
      //       const res = await fetch(url)
      //       return await res.json()
      // }

      // getRecource("http://localhost:3000/menuData")
      //       .then((menuData) => {
      //             menuData.forEach(({src, alt, title, descr, price}) => { // destruptizatsiya
      //                   new MenuCard(src, alt, title, descr, price, ".menu .container").render()
      //             })
      //       })
      

      // Form

      const formElements = document.querySelectorAll("form")

      formElements.forEach(form => {
            bindPostData(form)
      })

      async function postData(url , data) {
            const res = await fetch(url, {
                  method: "POST",
                  headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                  },
                  body: data,
            })

            return await res.json()
      }

      function bindPostData(form) {
            form.addEventListener("submit", (event) => {
                  event.preventDefault()

                  const statusMessage = document.createElement("img")
                  statusMessage.src = msg.loading

                  statusMessage.style.cssText = "display: block; margin: 0 auto;"
                  form.insertAdjacentElement("afterend", statusMessage)

                  const formData = new FormData(form)
                  const json = JSON.stringify(Object.fromEntries(formData.entries()))

                  postData("http://localhost:3000/request", json)
                  .then((data) => {
                        console.log(data)
                        showThanksModal(msg.success)
                        statusMessage.remove()
                  })
                  .catch(() => {
                        showThanksModal(msg.failure)
                  })
                  .finally(() => {
                        form.reset()
                  })
            })
      }

      function showThanksModal(message) {
            const prevModalDialog = document.querySelector(".modal__dialog")

            prevModalDialog.classList.add("hide")
            showModal()

            const thanksModal = document.createElement('div')
            thanksModal.classList.add("modal__dialog")
            thanksModal.innerHTML = `
            <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
            </div>
            `

            document.querySelector(".modal").append(thanksModal)
            setTimeout(()=> {
                  thanksModal.remove()
                  prevModalDialog.classList.add("show")
                  prevModalDialog.classList.remove("hide")
                  closeModal()
            }, 4000)
      }

      // Slider
      const slides = document.querySelectorAll(".offer__slide"),
            next = document.querySelector(".offer__slider-next"),
            prev = document.querySelector(".offer__slider-prev"),
            current = document.querySelector("#current"),
            total = document.querySelector("#total"),
            slideWrapper = document.querySelector(".offer__slider-wrapper"),
            slideInner = document.querySelector(".offer__slider__inner"),
            width = window.getComputedStyle(slideWrapper).width,
            slider = document.querySelector(".offer__slider")

      let slideIndex = 1;
      let offset = 0;

      //$$$$$$$--carusel slider--$$$$$$$$$//
      slideInner.style.width = `${100*slides.length}%`
      slideWrapper.style.overflow = 'hidden'
      slideInner.style.display = 'flex'
      slideInner.style.transition = '.5s ease all'
      slides.forEach(slide => {
            slide.style.width = width
      })

      if(slides.length < 10) {
            total.textContent = `0${slides.length}`
            current.textContent = `0${slideIndex}`
      } else {
            total.textContent = slides.length
            current.textContent = slideIndex
      }

      const indicators = document.createElement('ul')
      const dots = []
      indicators.classList.add('carosel-indecator')
      slider.append(indicators)

      for(let i=0; i<slides.length; i++) {
            const dot = document.createElement('li')
            dot.classList.add('carusel-dot')
            dot.setAttribute("data-slide-to", i+1)
            indicators.append(dot) 
            if(i == 0) {
                  dot.style.opacity = "1"
            }
            dots.push(dot)
      }
      
      next.addEventListener("click", () => {
            if(offset == (+width.replace(/\D/g, ''))*(slides.length - 1)) {
                  offset = 0
            } else {
                  offset += (+width.replace(/\D/g, ''))
            }
            slideInner.style.transform = `translateX(-${offset}px)`

            if(slideIndex == slides.length) {
                  slideIndex = 1
            } else {
                  slideIndex ++
            }

            if(slides.length < 10) {
                  current.textContent = `0${slideIndex}`
            } else {
                  current.textContent = slideIndex
            }

            dots.forEach(dot => dot.style.opacity = '.5')
            dots[slideIndex-1].style.opacity = 1
      })

      prev.addEventListener("click", () => {
            if(offset == 0) {
                  offset = (+width.replace(/\D/g, ''))*(slides.length - 1)
            } else {
                  offset -= +width.replace(/\D/g, '')
            }
            slideInner.style.transform = `translateX(-${offset}px)`

            if(slideIndex == 1) {
                  slideIndex = slides.length
            } else {
                  slideIndex --
            }

            if(slides.length < 10) {
                  current.textContent = `0${slideIndex}`
            } else {
                  current.textContent = slideIndex
            }

            dots.forEach(dot => dot.style.opacity = '.5')
            dots[slideIndex-1].style.opacity = 1
      })

      dots.forEach(dot => {
            dot.addEventListener("click", (e) => {
                  const slideto = e.target.getAttribute('data-slide-to')

                  slideIndex = slideto

                  offset = (+width.replace(/\D/g, ''))*(slideto - 1)
                  slideInner.style.transform = `translateX(-${offset}px)`

                  if(slides.length < 10) {
                        current.textContent = `0${slideIndex}`
                  } else {
                        current.textContent = slideIndex
                  }

                  dots.forEach(dot => dot.style.opacity = '.5')
                  dots[slideIndex-1].style.opacity = 1
            })
      })


      // +++++++++simple slider++++++++ //

      // if(slides.length < 10) {
      //       total.textContent = `0${slides.length}`
      // } else {
      //       total.textContent = slides.length
      // }

      // showSlide(1)

      // function showSlide(idx) {
      //       if(idx > slides.length) {
      //             slideIndex = 1
      //       }

      //       if(idx < 1) {
      //             slideIndex = slides.length
      //       }
      //       slides.forEach(item => {item.style.display = "none"})
      //       slides[slideIndex-1].style.display = "block"

      //       if(slides.length < 10) {
      //             current.textContent = `0${slideIndex}`
      //       } else {
      //             current.textContent = slideIndex
      //       }
      // }

      // function plusSlides(idx) {
      //       showSlide(slideIndex += idx)
      // }

      // next.addEventListener("click", () => {plusSlides(1)})
      // prev.addEventListener("click", () => {plusSlides(-1)})
})