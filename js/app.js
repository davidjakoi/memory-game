
 let counter=document.getElementById("moves");
 let moves=0;
 let star=document.getElementsByClassName('fa fa-star');
 let stars=[...star];
 let names=["card1","card2","card3","card4","card5","card6","card7","card8","card9","card10","card11","card12","card13","card14","card15","card16"];
 let matchedCards=0;
 let second=0;
 let minute=0;

shuffle(names);
let table=document.createElement("ul");
let main=document.getElementById("container");
main.appendChild(table);
table.setAttribute("class","deck");

// creating the cards and adding pictures to them

for(var i=0;i<16; i++){
  let card=document.createElement("li");
  card.setAttribute("class","card");
  table.appendChild(card);
  let image=document.createElement("i");
  card.appendChild(image);
  image.setAttribute("id", ""+names[i]);
}

document.getElementById("card1").setAttribute("class","fa fa-bomb");
document.getElementById("card2").setAttribute("class","fa fa-bomb");
document.getElementById("card3").setAttribute("class","fa fa-bolt");
document.getElementById("card4").setAttribute("class","fa fa-bolt");
document.getElementById("card5").setAttribute("class","fa fa-cube");
document.getElementById("card6").setAttribute("class","fa fa-cube");
document.getElementById("card7").setAttribute("class","fa fa-leaf");
document.getElementById("card8").setAttribute("class","fa fa-leaf");
document.getElementById("card9").setAttribute("class","fa fa-bicycle");
document.getElementById("card10").setAttribute("class","fa fa-bicycle");
document.getElementById("card11").setAttribute("class","fa fa-diamond");
document.getElementById("card12").setAttribute("class","fa fa-diamond");
document.getElementById("card13").setAttribute("class","fa fa-paper-plane-o");
document.getElementById("card14").setAttribute("class","fa fa-paper-plane-o");
document.getElementById("card15").setAttribute("class","fa fa-anchor");
document.getElementById("card16").setAttribute("class","fa fa-anchor");



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let card=document.getElementsByClassName("card");
let cards=[...card];
let openedCards=[];

// add eventlisteners to cards

for(var i=0; i<cards.length;i++){
  cards[i].addEventListener("click",displayCard);
  cards[i].addEventListener("click", cardOpen);
    }

// function to display cards that are clicked

  function displayCard(){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
  }

// function to check if the two cards match

  function cardOpen(){
    openedCards.push(this);


    if(openedCards.length===2){
  moveCounter();
  if(openedCards[0].firstElementChild.className===openedCards[1].firstElementChild.className){
    matched();
  } else{
    unmatched();
  }
  }
  }

// function if the two cards match and if the player wins

  function matched(){
  openedCards[0].classList.add("match");
  openedCards[0].classList.remove("show", "open");
  openedCards[1].classList.add("match");
  openedCards[1].classList.remove("show", "open");
  openedCards=[];
  matchedCards++;
  if(matchedCards==8){
    document.getElementById("totalTime").innerHTML=minute+": "+second;
    document.getElementById("totalMoves").innerHTML=moves;
    let finalStars=document.getElementById("totalStars");
    let stars=finalStars.getElementsByClassName("fa fa-star");
    table.innerHTML="";
    if(moves>10 && moves<20){
    stars[2].setAttribute("class", "");
    }else if(moves>20){
    stars[2].setAttribute("class","");
    stars[1].setAttribute("class", "");
    }
    let modal=document.getElementById("modalBase");
    table.appendChild(modal);
    modal.style.display="block";
  }
  }

// function if the two cards don't match

  function unmatched(){

  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");

  setTimeout(function(){
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards=[];
  },800);
  }

// function to count the moves and print the stars

  function moveCounter(){
  moves++;
  counter.innerHTML=moves;
  if(moves>10 && moves<20){
  stars[2].setAttribute("class", "");
  }else if(moves>20){
  stars[2].setAttribute("class","");
  stars[1].setAttribute("class", "");
  }
  }

// function to start a new game, reset timer, stars, moves and shuffle cards

  function newGame(){
    second=0;
    minute=0;
    startTime();
    shuffle(names);
    cards=shuffle(cards);
    for(var i=0;i<16; i++){
    table.innerHTML="";
    [].forEach.call(cards,function(item){
      table.appendChild(item);
    });
    cards[i].classList.remove("show","open","match","disabled");
  }
    moves=0;
    counter.innerHTML=moves;
    stars[1].setAttribute("class","fa fa-star");
    stars[2].setAttribute("class","fa fa-star");
  }

//timer

  let timer=document.getElementById("timer");
  function startTime(){
    setInterval(function(){
      timer.innerHTML=minute+"m "+second+"s";
      second++;
      if(second==60){
        minute++;
        second=0;
      }
    },1000);
  }
