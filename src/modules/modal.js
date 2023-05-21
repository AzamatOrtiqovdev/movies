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

export default modal
export {closeModal, showModal}