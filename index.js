let myLinks = []
const inputEl = document.getElementById("input-el")
const inputbtn = document.getElementById("input-btn")
const delbtn = document.getElementById("del-btn")
const delbtnele = document.getElementById("del-btn-ele")
const tabbtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-El")
let linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

//localStorage.setItem("sdf","sdfsdfa")
//console.log(localStorage.getItem("sdf"))

if(linksFromLocalStorage) {
  myLinks = linksFromLocalStorage
  render(myLinks)
}

const tabs = [
  {url: "https://jsbin.com"}
]

inputbtn.addEventListener("click", function() {
  if(inputEl.value == "")
    return;
  let value = inputEl.value
  myLinks.push(value)
  inputEl.value = ""
  localStorage.setItem("myLinks", JSON.stringify(myLinks))
  //ulEl.innerHTML += "<li>" + myLinks[myLinks.length - 1] + "</li>"
  console.log(myLinks)
  render(myLinks)
})

delbtn.addEventListener("click", function() {
  myLinks.pop()
  //myLinks = []
  localStorage.setItem("myLinks", JSON.stringify(myLinks))
  render(myLinks)
})

tabbtn.addEventListener("click", function() {
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myLinks.push(tabs[0].url)
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    render(myLinks)
  })
})


function render(links){
    let listItems = ""
    for(let i = 0; i < links.length; i++) {
        //ulEl.innerHTML += "<li>" + myLinks[i] + "</li>"
        //listItems += "<li><a target='_blank' href='" + myLinks[i] + "'>" + myLinks[i] + "</a></li>"
        listItems += `
        <li>
            <a target='_blank' href='${links[i]}'>
                ${links[i]} 
            </a>
        </li>`
    }
    ulEl.innerHTML = listItems
}