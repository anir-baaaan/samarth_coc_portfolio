window.onload = function() {
  getFullDate()
  document.querySelector(".boot").style.display = "none"
}

let dateText = document.querySelector("#date")

//Console
const console = document.querySelector(".console")
const consoleBody = document.querySelector(".console__body")
const consoleHeader = console.querySelector(".console__header")
const consoleInput = document.querySelector("#console__input")
const consoleOutput = document.querySelector(".console__output")

//Files
const readMe = document.querySelector("#readme")
const files = document.querySelector("#files")

//Apps
const browser = document.querySelector("#browser")
const browserInput = document.querySelector(".browser__input")

const spotify = document.querySelector("#spotify")

dragElement(console)
dragElement(readMe)
dragElement(files)

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
  if (document.getElementById(elmnt.id + "__header")) {
    document.getElementById(elmnt.id + "__header").onmousedown = dragMouseDown
  } else {
    elmnt.onmousedown = dragMouseDown
  }

  function dragMouseDown(e) {
    e = e || window.event
    e.preventDefault()
    // get the mouse cursor position at startup
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    // call a function whenever the cursor moves
    document.onmousemove = elementDrag
  }

  function elementDrag(e) {
    e = e || window.event
    e.preventDefault()
    // calculate the new cursor position
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"
  }

  function closeDragElement() {
    // stop moving when mouse button is released
    document.onmouseup = null
    document.onmousemove = null
  }
}

function getFullDate() {
    const date = new Date()

    let day = date.toLocaleString('en-us', {  weekday: 'short' })
    let dayNumber = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()

    if (minutes < 10) {
        minutes = "0" + minutes
    }

    let fullDate = day + " " + dayNumber + " " + hours + ":" + minutes

    dateText.innerHTML = fullDate

    setTimeout(getFullDate, 60000)
}

function openObject(id) {
  let object = document.getElementById(id.id)

  if (object.style.display != "none") {
    object.style.display = "none"
  } else {
    object.style.display = "block"
    if (id == console || id == files || id == readme) {
      consoleInput.focus()
      object.style.top = "20vh"
      object.style.left = "30vh"
    }
  }
}

function buttonClose(id) {
  document.getElementById(id.id).style.display = "none"

  if (id == console) {
    consoleInput.value = ""
    consoleOutput.innerHTML = ""
  }
}

function buttonMinimize(id) {
  document.getElementById(id.id).style.display = "none"
}

let isConsoleFullscreen = false
let isReadmeFullscreen = false

function buttonFullscreen(id) {
  if (id == console) {
    if (!isConsoleFullscreen) {
      isConsoleFullscreen = true
  
      consoleInput.focus()
      consoleHeader.onmousedown = null
  
      console.style.top = "0"
      console.style.left = "0"
      console.style.width = "100%"
      consoleBody.style.height = "100vh"
      consoleOutput.style.maxHeight = "92vh"
    }
    else {
      isConsoleFullscreen = false
  
      consoleInput.focus()
      dragElement(console)
  
      console.style.top = "30vh"
      console.style.left = "30vh"
      console.style.width = "666px"
      consoleBody.style.height = "400px"
      consoleOutput.style.maxHeight = "374px"
    }
  }
  else if (id == readMe) {
    if (!isReadmeFullscreen) {
      isReadmeFullscreen = true

      document.getElementById(id.id + "__header").onmousedown = null

      readMe.style.top = "0"
      readMe.style.left = "0"
      readMe.style.width = "100%"
      document.getElementById("readme__body").style.height = "100vh"
    }
    else {
      isReadmeFullscreen = false

      dragElement(id)

      readMe.style.top = "25%"
      readMe.style.left = "32%"
      readMe.style.width = "666px"
      document.getElementById("readme__body").style.height = "400px"
    }
  }
}

function openApp(id) {
  let app = document.getElementById(id.id)
  let apps = document.querySelectorAll(".app")

  if (app.style.display != "none") {
    app.style.display = "none"
  } else {
    apps.forEach(app => {
      app.style.display = "none"
    })

    app.style.display = "block"
  }
}

//Console commands
consoleInput.addEventListener("keyup", function (e){
  if (e.key === 'Enter' || e.keyCode === 13) {
    if (consoleInput.value == "whoami") {
      consoleOutput.innerHTML += "<p class=\"console__admin text-nowrap\">anir_baaaan@ubuntu: ~$</p> " + "Hey, this is Anirban. Currently studying my 4 year B.Tech course in Techno Main Salt Lake. Interested in Web Development, Game Development, Graphics, Video, VFX, Hacking, etc. Currently trying to survive college and lab assignments.. If you wanna reach out to me write 'contact' to console.<br><br>\n"
    }
    else if (consoleInput.value == "contact") {
      consoleOutput.innerHTML += "<p class=\"console__admin text-nowrap\">anir_baaaan@ubuntu: ~$</p> " + "Contact via Mail: doesnotwork@example.com<br>\n"
      consoleOutput.innerHTML += "                       " + "Write 'social' to see my social links.<br><br>\n"
    }
    else if (consoleInput.value == "social") {
      consoleOutput.innerHTML += "<p class=\"console__admin text-nowrap\">anir_baaaan@ubuntu: ~$</p> " + "Instagram: <a href='https://www.instagram.com/anir_baaaan/' target='_blank'>[GO]<a><br>\n"
      consoleOutput.innerHTML += "Github: <a href='https://github.com/anir-baaaan' target='_blank'>[GO]<a><br><br>\n"
    }
    else if (consoleInput.value == "help") {
      consoleOutput.innerHTML += "<p class=\"console__admin text-nowrap\">anir_baaaan@ubuntu: ~$</p> " + "Commands: whoami, contact, social, help, clear, exit.<br><br>\n"
    }
    else if (consoleInput.value == "clear") {
      consoleOutput.innerHTML = ""
    }
    else if (consoleInput.value == "exit") {
      consoleOutput.innerHTML = ""
      consoleInput.value = ""
      console.style.display = "none"
    }
    else {
      consoleOutput.innerHTML += "<p class=\"console__admin text-nowrap\">anir_baaaan@ubuntu: ~$</p> " + "Command not found. Write 'help' to see commands.<br><br>\n"
    }
    //Move to end of overflow
    consoleOutput.scrollTop = consoleOutput.scrollHeight
    //Clear after press ENTER
    consoleInput.value = ""
}
})

function fileMoves(id) {
  const fileList = document.querySelectorAll(".files__item")
  const bodyList = document.querySelectorAll(".files__screen")

  //Press to different button
  if (!document.getElementById(id + "__files").classList.contains("active-file")) {
    fileList.forEach(listItem => {
      listItem.classList.remove('active-file')
    })

    bodyList.forEach(body => {
      body.style.display = "none"
    })

    document.getElementById(id + "__body").style.display = "flex"
    document.getElementById(id + "__files").classList.add("active-file")
  }
}

//Browser Functions
const browserFrame = document.querySelector(".browser__screen")

browserInput.addEventListener("keyup", function (e){
  if (e.key === 'Enter' || e.keyCode === 13) {
    if (!browserInput.value.includes("http") && !browserInput.value.includes("https")) {
      browserInput.value = "https://" + browserInput.value
      browserFrame.src = browserInput.value
    } else {
      browserFrame.src = browserInput.value
    }
  }
})

function goHomepage() {
  browserInput.value = "https://anir-baaaan.github.io/samarth_coc_portfolio/"
  browserFrame.src = "https://anir-baaaan.github.io/samarth_coc_portfolio/"
}

function reloadPage() {
  browserFrame.src = browserFrame.src
}
