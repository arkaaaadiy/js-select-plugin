class Select {
  constructor(obj) {
    this.select = document.querySelector(`${obj.selector}`)
    this.url = obj.url
    this.input = document.getElementById('select-dropdown')
    this.label = document.querySelector('.lable-select')
    this.arrow = document.getElementById('arrow')
    this.btn = document.querySelector('.btn')
    this.dropdown = document.querySelector('.dropdowm-content')
    this.isOpen = false
    this.option = ''
    this.answer = false
    this.conect = false


    this.input.addEventListener('click', () => {
      this.open()
    })

    document.addEventListener('click', e => {
      let btn = Array.from(this.btn.children)
      if (!(e.target == this.select) &&
        !this.select.contains(e.target) &&
        this.isOpen == true &&
        (!(e.target == this.btn))
      ) {
        this.close()
      }
    })
    
  }



  open() {
    if (!this.answer) {
      this.conected()
    }        
    this.isOpen = true
    this.dropdown.style.display = 'block'
    this.arrow.classList.add('arrow-open')
    this.dropdown.style.opacity = '1'
    this.dropdown.style.transformOrigin = '0px 0px'
    this.dropdown.style.transform = 'scale(1)'
    this.label.classList.add('active')
  }
  close() {
    this.isOpen = false
    this.arrow.classList.remove('arrow-open')
    this.dropdown.style.display = ''
    this.dropdown.style.transformOrigin = ''
    this.dropdown.style.transform = ''
    this.dropdown.style.opacity = ''
    if (this.input.value == '') {
      this.label.classList.remove('active')
    }

  }
  setOption(id) {
    if (!this.option == '') {
      document.getElementById(`${this.option}`).style.color = ''
    }

    this.option = id
    this.input.value = document.getElementById(`${id}`).innerText
    document.getElementById(`${id}`).style.color = 'blue'
    this.close()

  }
  getElm() {
    console.log(this.select);
  }
  clearOption() {
    this.option = ''
    this.input.value = ''
  }
  destroy() {
    this.select.style.display = 'none'
  }
  conected() {
    this.conect = true
    this.load()
    fetch(`${this.url}`)
      .then(response => response.json())
      .then(json => {
        json.map(e => {                                  
          let li = document.createElement('li');
          li.id = `select-option-${e.id}`
          li.innerText = e.title
          this.dropdown.append(li);
          Array.from(this.dropdown.children).map(e => e.addEventListener('click', () => {
            this.setOption(e.id)                
            }))
          });          
      this.unload()
      this.answer = true
        })          
    
  }
  load(){    
      let div = document.createElement('div')
      div.id = 'load'
      div.classList.add('load')
      this.dropdown.append(div)    
  }
  unload(){
    let div = document.getElementById('load')
   div.remove()
  }
}

const select = new Select({
  selector: '#select',
  label: 'Выберите технологию',
  url: 'https://jsonplaceholder.typicode.com/posts',
  onSelect(selectedItem) {}
})
// select.input.addEventListener('click', () => {
//   select.open()
// })
const closebtn = document.querySelector('[data-type="close"]')
const openbtn = document.querySelector('[data-type="open"]')
const setbtn = document.querySelector('[data-type="set"]')
const getbtn = document.querySelector('[data-type="get"]')
const clearbtn = document.querySelector('[data-type="clear"]')
const destroybtn = document.querySelector('[data-type="destroy"]')
closebtn.addEventListener('click', () => {
  select.close()
})
openbtn.addEventListener('click', () => {
  select.open()
})
setbtn.addEventListener('click', () => {
  select.setOption('select-option-5')
  select.open()
  select.close()
})
getbtn.addEventListener('click', () => {
  alert(`"label: "${select.input.value}, "id": ${select.option}`)
})
clearbtn.addEventListener('click', () => {
  select.clearOption()
  select.close()
})
destroybtn.addEventListener('click', () => {
  Object.keys(select).forEach((key) => {
    delete select[key]
  })
  select.__proto__ = null
  document.getElementById('select').remove()

})