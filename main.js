let addBtn = document.querySelector(".add-btn")
let modalCont = document.querySelector(".modal-container")
let mainContainer = document.querySelector(".main-container")
let textContainer = document.querySelector(".text-container");
let allColourDiv = document.querySelectorAll(".priority-colour");
let removeBtn = document.querySelector(".remove-btn");
let allPriorityColour = document.querySelectorAll(".colour")
let allColour = ["lightpink", "lightblue", "lightgreen", "black"]
let selectedColour = "black"
let idx = 3;
let ticketId = 1;
let addFlag = false;
let removeFlag = false;
let allTicketObj = if(JSON.parse(localStorage.getItem("all-tickets"))){
    appendTickets(allTicketObj);
    ticketId = allTicketObj.length+1;
};
// let allTicketObj = []


for(let i =0;i<allPriorityColour.length;i++){
    allPriorityColour[i].addEventListener("click", function(){
        if(allPriorityColour[i].classList.contains("border")){
            allPriorityColour[i].classList.remove("border")
            updateObject();
            localStorage.setItem("all-tickets",JSON.stringify(allTicketObj));
            let r = document.querySelectorAll(".ticket-container");
            for(let i = 0;i<r.length;i++)r[i].remove();
            appendTickets(allTicketObj)
        }else{
            allPriorityColour.forEach(function(oneEle){
                if(oneEle.classList.contains("border"))
                oneEle.classList.remove("border");
            })
            allPriorityColour[i].classList.add("border")
            updateObject();
            localStorage.setItem("all-tickets",JSON.stringify(allTicketObj));
            // mainContainer.innerHTML = "";
            let r = document.querySelectorAll(".ticket-container");
            for(let i = 0;i<r.length;i++)r[i].remove();
            let selectedObj = allTicketObj.filter(function(obj){
                return obj.ticketColour === allPriorityColour[i].classList[0]
            })
            
            appendTickets(selectedObj);
        }
    })
}

addBtn.addEventListener("click", function(e){
        addFlag = !addFlag;
        if(addFlag){
            modalCont.style.display = "flex"
        }else{
            console.log(addFlag);
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
    
    newEle.addEventListener("click", function(e){
        if(removeFlag) {newEle.remove();
            let removeId = newEle.querySelector(".ticket-id").innerHTML;
          allTicketObj = allTicketObj.filter(function(obj){ console.log(obj.ticketId, ticketId); return '#'+obj.ticketId != removeId})
          localStorage.setItem("all-tickets",JSON.stringify(allTicketObj));
       }})

    newEle.querySelector(".lock-btn>*").addEventListener("click",function(e){
        if(newEle.querySelector(".lock-btn>*").classList.contains("fa-lock")){
            newEle.querySelector(".lock-btn>*").classList.remove("fa-lock");
            newEle.querySelector(".lock-btn>*").classList.add("fa-lock-open")
            newEle.querySelector(".task-area").setAttribute("contenteditable", "true")
        }else{
            newEle.querySelector(".lock-btn>*").classList.remove("fa-lock-open");
            newEle.querySelector(".lock-btn>*").classList.add("fa-lock")
            newEle.querySelector(".task-area").setAttribute("contenteditable", "false")
        }
    })
    handleTicketColour(newEle);
    allTicketObj.push({
        ticketColour:selectedColour,
        ticketId:ticketId,
        ticketValue:value
    })
    ticketId++;
    localStorage.setItem("all-tickets",JSON.stringify(allTicketObj));
} 

allColourDiv.forEach(function(ele, i){

    ele.addEventListener("click", function(e){
        allColourDiv[idx].classList.remove("border");
        idx = i;
        selectedColour = allColour[idx];
        ele.classList.add("border");
    })
})

function handleTicketColour(ticket){
    ticket.querySelector(".ticket-colour").addEventListener("click", function(e){
        ticket.querySelector(".ticket-colour").classList.remove(selectedColour);
        idx = Math.floor(( idx + 1 ) % (allColour.length)) ;
        // console.log(idx);
        selectedColour = allColour[idx];
        ticket.querySelector(".ticket-colour").classList.add(allColour[idx]);
    })
    // setInterval(function(){
    //     ticket.querySelector(".ticket-colour").classList.remove(selectedColour);
    //         idx = Math.floor(( idx + 1 ) % (allColour.length)) ;
    //         // console.log(idx);
    //         selectedColour = allColour[idx];
    //         ticket.querySelector(".ticket-colour").classList.add(allColour[idx]);
    
    // }, 100);
}

function appendTickets(arr){
    for(let i = 0;i< arr.length;i++){
        let selectedColour = arr[i].ticketColour;
        let selectedticketId = arr[i].ticketId;
        let selectedValue = arr[i].ticketValue;
    let newEle =  document.createElement("div");
    newEle.setAttribute("class", "ticket-container")
    newEle.innerHTML = `<div class="ticket-colour ${selectedColour}" ></div>
    <div class="ticket-id">#${selectedticketId}</div>
    <div class="task-area">${selectedValue}</div>
    <div class="lock-btn"><i class="fas fa-lock"></i></div>`
     mainContainer.appendChild(newEle);
    //  ticketId++;
     newEle.addEventListener("click", function(e){
         if(removeFlag) {newEle.remove();
           allTicketObj = allTicketObj.filter(function(obj){ console.log(obj.ticketId, '#' + selectedticketId); return obj.ticketId != selectedticketId})
           localStorage.setItem("all-tickets",JSON.stringify(allTicketObj));
        }})
     newEle.querySelector(".lock-btn>*").addEventListener("click",function(e){
         if(newEle.querySelector(".lock-btn>*").classList.contains("fa-lock")){
             newEle.querySelector(".lock-btn>*").classList.remove("fa-lock");
             newEle.querySelector(".lock-btn>*").classList.add("fa-lock-open")
             newEle.querySelector(".task-area").setAttribute("contenteditable", "true")
         }else{
             newEle.querySelector(".lock-btn>*").classList.remove("fa-lock-open");
             newEle.querySelector(".lock-btn>*").classList.add("fa-lock")
             newEle.querySelector(".task-area").setAttribute("contenteditable", "false")
         }
     })
     handleTicketColour(newEle);
}}


function updateObject(){
    let newTickets = document.querySelectorAll(".ticket-container");

    for(let i = 0;i<newTickets.length;i++){
        let newTicketId = newTickets[i].querySelector(".ticket-id").innerHTML;
        let newValue = newTickets[i].querySelector(".task-area").innerHTML;
        let newColour = newTickets[i].querySelector(".ticket-colour").classList[1];
        console.log(newTicketId, newValue, newColour);
        for(let j=0;j<allTicketObj.length;j++){
            console.log('#'+allTicketObj[j].ticketId);
            if('#'+allTicketObj[j].ticketId === newTicketId){
                allTicketObj[j].ticketValue = newValue;
                allTicketObj[j].ticketColour = newColour;
                break;
            }
        } 
    }
    
}