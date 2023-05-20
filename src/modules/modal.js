function modal() {
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

}

module.exports = modal