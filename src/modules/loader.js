function loader() {
      const loaderElement = document.querySelector(".loader")

      // Loader
      setTimeout(() => {
            loaderElement.style.opacity = "0"
            setTimeout(() => {
                  loaderElement.style.display = 'none'
            }, 500)
      }, 2000)
}

module.exports = loader
