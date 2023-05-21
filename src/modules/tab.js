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

export default tab