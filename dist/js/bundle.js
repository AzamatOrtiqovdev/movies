/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/class.js":
/*!******************************!*\
  !*** ./src/modules/class.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function clas() {
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

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clas);


/***/ }),

/***/ "./src/modules/form.js":
/*!*****************************!*\
  !*** ./src/modules/form.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/modules/modal.js");
/* harmony import */ var _server_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./server/server */ "./src/modules/server/server.js");



function form(formSelector, modalTimerId) {
      // Form
      const formElements = document.querySelectorAll(formSelector)

      formElements.forEach(form => {
            bindPostData(form)
      })

      const msg = {
            loading: "img/spinner.svg",
            success: "Thank's for submitting our form",
            failure: "Somthing went wrong"
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

                  ;(0,_server_server__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/request", json)
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
            ;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)(".modal", modalTimerId)

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
                  ;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal")
            }, 4000)
      }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);


/***/ }),

/***/ "./src/modules/loader.js":
/*!*******************************!*\
  !*** ./src/modules/loader.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function loader(loaderElement) {
      const loader = document.querySelector(loaderElement)

      // Loader
      setTimeout(() => {
            loader.style.opacity = "0"
            setTimeout(() => {
                  loader.style.display = 'none'
            }, 500)
      }, 2000)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loader);


/***/ }),

/***/ "./src/modules/modal.js":
/*!******************************!*\
  !*** ./src/modules/modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   showModal: () => (/* binding */ showModal)
/* harmony export */ });
function closeModal(modalSelector) {
      const modalElement = document.querySelector(modalSelector)
      modalElement.classList.add("hide")
      modalElement.classList.remove("show")
      document.body.style.overflow = ""
}

function showModal(modalSelector, modalTimerId) {
      const modalElement = document.querySelector(modalSelector)
      modalElement.classList.add("show")
      modalElement.classList.remove("hide")
      document.body.style.overflow = "hidden"
      if(modalTimerId) {
            clearInterval(modalTimerId)
      }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
      // Modal
      const modalTrigger = document.querySelectorAll(triggerSelector),
            modalElement = document.querySelector(modalSelector)
            

      modalTrigger.forEach(item => {
            item.addEventListener("click", () => showModal(modalSelector, modalTimerId))
      })


      modalElement.addEventListener("click", (event) => {
            if(event.target.classList.contains('modal') || event.target.getAttribute('data-close') == "") {
                  closeModal(modalSelector)
            }
      })

      document.addEventListener("keydown", (event) => {
            if(event.code == "Escape" && modalElement.classList.contains("show")) {
                  closeModal(modalSelector)
            }
      })

      function showModalByScroll() {
            if((window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
                  showModal(modalSelector, modalTimerId)
                  window.removeEventListener("scroll", showModalByScroll)
            }
      }

      window.addEventListener("scroll", showModalByScroll)

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./src/modules/server/server.js":
/*!**************************************!*\
  !*** ./src/modules/server/server.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
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



/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider(
      {
            container,
            slide, 
            nextArrow,
            prevArrow,
            totalCounter,
            currentCounter,
            wrapper,
            field
      }
) {
      // Slider
      const slides = document.querySelectorAll(slide),
            next = document.querySelector(nextArrow),
            prev = document.querySelector(prevArrow),
            current = document.querySelector(currentCounter),
            total = document.querySelector(totalCounter),
            slideWrapper = document.querySelector(wrapper),
            slideInner = document.querySelector(field),
            width = window.getComputedStyle(slideWrapper).width,
            slider = document.querySelector(container)

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

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./src/modules/tab.js":
/*!****************************!*\
  !*** ./src/modules/tab.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tab(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
      // tabs
      const tabParenetElement = document.querySelector(tabsParentSelector), 
            tabChildElements = document.querySelectorAll(tabsSelector), 
            tabContentElements = document.querySelectorAll(tabsContentSelector) 
            
      function hideTabContent() {

            tabChildElements.forEach(item => {
                  item.classList.remove(activeClass)
            })

            tabContentElements.forEach(item => {
                  item.classList.add('hide')
                  item.classList.remove('show', "fade")
            })

      }

      function showTabContent(i = 0) {
            tabChildElements[i].classList.add(activeClass)
            tabContentElements[i].classList.add("show","fade")
            tabContentElements[i].classList.remove("hide")
      }

      hideTabContent()
      showTabContent()

      tabParenetElement.addEventListener("click", (event) => {
            if(event.target && event.target.classList.contains(tabsSelector.slice(1))) {
                  tabChildElements.forEach((item, index) => {
                        if(event.target == item) {
                              hideTabContent()
                              showTabContent(index)
                        }
                  })
            }
      })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tab);

/***/ }),

/***/ "./src/modules/timer.js":
/*!******************************!*\
  !*** ./src/modules/timer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) { 
      // timer

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

      setClock(id, deadline)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/class */ "./src/modules/class.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/form */ "./src/modules/form.js");
/* harmony import */ var _modules_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/loader */ "./src/modules/loader.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/modal */ "./src/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/slider */ "./src/modules/slider.js");
/* harmony import */ var _modules_tab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/tab */ "./src/modules/tab.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/timer */ "./src/modules/timer.js");









window.addEventListener("DOMContentLoaded", () => {
      const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.showModal)(".modal", modalTimerId), 5000)

      ;(0,_modules_class__WEBPACK_IMPORTED_MODULE_0__["default"])()
      ;(0,_modules_form__WEBPACK_IMPORTED_MODULE_1__["default"])("form",modalTimerId)
      ;(0,_modules_loader__WEBPACK_IMPORTED_MODULE_2__["default"])(".loader")
      ;(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])("[data-modal]", ".modal", modalTimerId)
      ;(0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
            container: ".offer__slider",
            nextArrow: ".offer__slider-next",
            prevArrow: ".offer__slider-prev",
            slide: ".offer__slide",
            totalCounter: "#total",
            currentCounter: "#current",
            wrapper: ".offer__slider-wrapper",
            field: ".offer__slider__inner"
      })
      ;(0,_modules_tab__WEBPACK_IMPORTED_MODULE_5__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active")
      ;(0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])(".timer",'2023-06-04')
         
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map