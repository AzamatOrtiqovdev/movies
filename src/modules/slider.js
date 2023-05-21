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

export default slider
