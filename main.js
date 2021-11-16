let addBtn = document.querySelector(".add-btn")
let modalCont = document.querySelector(".modal-container")
let mainContainer = document.querySelector(".main-container")
let textContainer = document.querySelector(".text-container");
let allColourDiv = document.querySelectorAll(".priority-colour");
let removeBtn = document.querySelector(".remove-btn");
let allColour = ["lightpink", "lightblue", "lightpink", "black"]
let selectedColour = "black"
let idx = 3;
let ticketId = 1;
let addFlag = false;
let removeFlag = false;

addBtn.addEventListener("click", function(e){
        addFlag = !addFlag;
        if(addFlag){
            modalCont.style.display = "flex"
        }else{
            modalCont.style.display = "none"
        }
})

textContainer.addEventListener("keydown", function(e){
    if(e.key == "Shift"){
        createTicket(textContainer.value);
        modalCont.style.display = "none";
        // textContainer.innerText = "";
        textContainer.value = "";
        addFlag = false;
    }
})

removeBtn.addEventListener("click", function(e){
    removeFlag = !removeFlag;
})

function createTicket(value){
   let newEle =  document.createElement("div");
   newEle.setAttribute("class", "ticket-container")
   newEle.innerHTML = `<div class="ticket-colour ${selectedColour}" ></div>
   <div class="ticket-id">#${ticketId}</div>
   <div class="task-area">${value}</div>
   <div class="lock-btn"><i class="fas fa-lock"></i></div>`
    mainContainer.appendChild(newEle);
    ticketId++;
    newEle.addEventListener("click", function(e){
        if(removeFlag) newEle.remove();
    })
} 

allColourDiv.forEach(function(ele, i){

    ele.addEventListener("click", function(e){
        allColourDiv[idx].classList.remove("border");
        idx = i;
        selectedColour = allColour[idx];
        ele.classList.add("border");
    })
})