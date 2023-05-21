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

export default clas
