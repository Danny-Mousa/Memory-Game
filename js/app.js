

const deckItems = ["fa-diamond", "fa-diamond",
				   "fa-paper-plane-o", "fa-paper-plane-o",
				   "fa-anchor", "fa-anchor",
				   "fa-bolt", "fa-bolt",
				   "fa-cube", "fa-cube",
				   "fa-leaf", "fa-leaf",
				   "fa-bicycle", "fa-bicycle",
				   "fa-bomb", "fa-bomb",

                  ];

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


function deckItem (item){
		
		return(`<li class="card" tabindex="0" data-c="${item}">
                 <i class="fa ${item}"></i></li>`);

}

let makeDeckFrag = document.createDocumentFragment();
makeDeckFrag= shuffle(deckItems).map( (item) =>{

		return deckItem(item);
});

makeDeckFrag=makeDeckFrag.join(" ");
const deck= document.querySelector(".deck");
deck.innerHTML= makeDeckFrag;


let cardsArray=[];
let movesCount=0;
const closeCards = document.querySelectorAll(".card");
const moves = document.querySelector(".moves");
const stars = document.querySelector(".rating");


const timer = document.querySelector(".timer");
let secs =0;
let mins =0;
let matched=0;
var clicksHolder=[];
let matchedArray= [];

// HOLD CURRENT AND PREVIOUS DASHBOARDS //
const currentDash= document.querySelector(".current-dash");
const previousDassh =document.querySelector(".previous-dash");
const dashContainer =document.querySelector(".result-popup");

// VARIABLES that HOLD DASHBOARD BUTTONS //
const playAgain= document.querySelector(".leftB");
const previousResults=document.querySelector(".rightB");

const yourTime =document.querySelector(".yTime span");
const yourMoves =document.querySelector(".yMove span");
let yourStars =document.querySelector(".yStar span");

	
// MAKE DASHBOARD HIDDEN BY DEFAULT //	
currentDash.classList.add("hide");
previousDassh.classList.add("hide");
dashContainer.classList.add("hide");

/**
* @description Represents a function that reset the board of the game and its timer, moves, and star rating
* @returns {numbers} number of zero for stars, moves, minutes, seconds
* @returns {string} html snippet code that represent the start rating with 5 stars
*/
let resetFunc = function(){
									
					// RESET CARDS //
					closeCards.forEach( (card)=>{

							card.classList.remove("open", "show", "match");
					});

					// RESET TIMER //
					clearInterval(timeFunc);
					clicksHolder=[];
					mins=0;
					secs=0;
					timer.textContent=`${mins} mins  ${secs} secs`;

					// RESET MOVES //
					movesCount=0;
					moves.textContent=`${movesCount} Moves`;

					// RESET STARS //
					yourStars.textContent="";
					stars.innerHTML=`<li><i class="fa fa-star"></i></li>
					        		<li><i class="fa fa-star"></i></li>
					                <li><i class="fa fa-star"></i></li>
					                <li><i class="fa fa-star"></i></li>
					        		<li><i class="fa fa-star"></i></li>`;
					// RESET CARDS //   
					matchedArray=[];
					cardsArray=[];   
					matched=0;  	

					let makeDeckFrag=document.createDocumentFragment();
					makeDeckFrag= shuffle(deckItems).map( (item) =>{

							return deckItem(item);
					});
					makeDeckFrag=makeDeckFrag.join(" ");
					const deck= document.querySelector(".deck");
					deck.innerHTML= makeDeckFrag;

};

/**
* @description Represents  THE MAIN GAME FUNCTION and add functionality to the cards
* @param {object} e - the event that will be fired by pressing enter or click
* @returns {numbers} number of stars, moves, minutes, seconds
*/ 
function playGame(e){

									//TO PREVENT CONSIDERING THE CARD WHICH CLICKED TWICE AS A MATCHED CARD //	
	if(e.target.nodeName==="LI" && e.target.classList =="card"){

		// TO PREVENT THE SPACE BUTTON DEFAULT ACTION (SCROLLING)//
		if(e.which===32){
			e.preventDefault();
		}

		cardsArray.push(e.target);

//***************** SET TIMER *****************//
		clicksHolder.push(1);

		if (clicksHolder.length ===1) {

			 timeFunc= setInterval( ()=>{
					secs +=1;

					if (secs % 60 ===0) {
							mins +=1;
							secs =0;
					}
					timer.textContent=`${mins} mins  ${secs} secs`;

					if (matchedArray.length===1) {
						clearInterval(timeFunc);//***STOP THE TIMER WHWEN ALL CARDS MATCHED**//

						// DISPLAY THE DASHBOARD //
						currentDash.classList.remove("hide");
						dashContainer.classList.remove("hide");
						playAgain.focus();//MOVE THE FOCUS TO THE (play again) BUTTON WHEN THE YOU OPEN THE DASHBOARD//


                    // SENDING TIMER, MOVES VALUES TO THE DASHBOARD //	
            			yourTime.textContent=` ( ${mins} ) mins  ( ${secs} ) secs`;
            			yourMoves.textContent=` ( ${movesCount} ) movements`;


            		   // SENDING  STARS VALUE TO THE DASHBOARD //	
            			
            			const starsNum=stars.querySelectorAll("i");
            			const fragment=document.createDocumentFragment();
                    	let iElement;
                    	let i;
                    	for(i=0; i<starsNum.length; i++){
                    		
                    		iElement=starsNum[i].cloneNode(false);

                    		fragment.appendChild(iElement);
                    	}
                    	
                    	yourStars.appendChild(fragment);

                    	// STORE THE MOVES, MINUTES, SECONDES, AND STARS NUMPER TO THE LOCAL MEMORY//
                    	let memoryMins  = localStorage.getItem("mMins");
                    	let memorySecs  = localStorage.getItem("mSecs");
                    	let memoryMoves = localStorage.getItem("mMoves");
                    	let memoryStars = localStorage.getItem("mStars");

                    	let minsArr=[];
                    	let secsArr=[];
                    	let movesArr=[];
                    	let starsArr=[];
                    	// INITIALIZE IF NULL //
                    	if(!memoryMins) {memoryMins="";}
                    	if(!memorySecs) {memorySecs="";}
                    	if (!memoryMoves) {memoryMoves="";}
                    	if (!memoryStars) {memoryStars="";}

                    	minsArr = memoryMins.split(" ");
                    	secsArr = memorySecs.split(" ");
                    	movesArr = memoryMoves.split(" ");
                    	starsArr = memoryStars.split(" ");

                    	minsArr.push(mins);
                    	secsArr.push(secs);
                    	movesArr.push(movesCount);
                    	starsArr.push(starsNum.length);

                    	memoryMins = minsArr.join(" ");
                    	memorySecs = secsArr.join(" ");
                    	memoryMoves = movesArr.join(" ");
                    	memoryStars = starsArr.join(" ");

                    	localStorage.setItem("mMins", memoryMins);
                    	localStorage.setItem("mSecs", memorySecs);
                    	localStorage.setItem("mMoves", memoryMoves);
                    	localStorage.setItem("mStars", memoryStars);
					}



					                 // SET RELOAD GAME BUTTON //

					document.querySelector(".repeat").addEventListener("click", resetFunc);
			}, 1000);
		}	
		
		
		//  SET THE FUNCTIONALITY OF CARDS  //

		if(cardsArray.length===1){

			e.target.classList.add("open", "show");

		}else if (cardsArray.length===2) {
			
			movesCount +=1;
			moves.textContent=`${movesCount} Moves`;




              // SETTING THE STARS //
			
			if (movesCount===9 ) {

				stars.lastElementChild.remove();

			}else if (movesCount ===13 ) {

				stars.lastElementChild.remove();

			}else if (movesCount ===16 ) {

				stars.lastElementChild.remove();

			}else if (movesCount===19){

				stars.lastElementChild.remove();

			}				
		
			  // END OF SETTING THE STARS //



			e.target.classList.add("open", "show");

			if(cardsArray[0].dataset.c===cardsArray[1].dataset.c){

				matched +=1;

				cardsArray[0].classList.add("match");
				cardsArray[1].classList.add("match");

				cardsArray=[];


				if (matched===8) {
					matchedArray.push(1);//  TO inform the clearInterval() that all the cards are matched and should stop the timer//
				}

			}else{

				setTimeout( ()=>{

					cardsArray[0].classList.remove("open","show");
				    cardsArray[1].classList.remove("open","show");

				    cardsArray=[];
				   

				}, 1000);
			}
		}

		
	}
}

deck.addEventListener("click", playGame);

// SET EXIT (X) SYMBOL TO HIDE THE POPUPED DASHBOARD WHEN CLICK ON IT //
const exitX=document.querySelector(".exit");
exitX.addEventListener("click", ()=>{
	dashContainer.classList.add("hide");
});



// SET EXIT (X) SYMBOL TO HIDE THE PREVIOUS RESULTS POPUPED DASHBOARD WHEN CLICK ON IT //
const exitPre=document.querySelector(".exitPre");
exitPre.addEventListener("click", ()=>{
	dashContainer.classList.add("hide");
	previousDassh.classList.add("hide");
});

// SET THE (reset results) BUTTON TO CLEAR THE LOCAL STORAGE //
 const resetResults=document.querySelector(".resetGame");
 resetResults.addEventListener("click", ()=>{
 	localStorage.clear();
 	dashContainer.classList.add("hide");
	previousDassh.classList.add("hide");
	location.reload();

 })
// SET THE (back) BUTTON TO MAKE US COME BACK TO PREVIOUS DASHBOARD //
const backButton = document.querySelector(".back");
backButton.addEventListener("click", ()=>{
	previousDassh.classList.add("hide");
	currentDash.classList.remove("hide");
	playAgain.focus();
})

//HOLD THE SECTIONS OF THE (previous results dashboard) IN THESE VARIABLES//
const firstAttempt = document.querySelector(".first");
const secondAttempt = document.querySelector(".second");
const thirdAttempt = document.querySelector(".third");
const forthAttempt = document.querySelector(".forth");

const attemptsArr = [firstAttempt, secondAttempt, thirdAttempt, forthAttempt];
const forSubHeadings = ["first", "second", "third", "forth"];

// RESTORE "mMins", "mSecs", "mMoves", "mStars" FROM MEMPRY AND SEND THEM TO THE PROPER PLACES //

previousResults.addEventListener("click", ()=>{
	let min = localStorage.getItem("mMins"); 
	let sec = localStorage.getItem("mSecs");
	let move = localStorage.getItem("mMoves");
	let star = localStorage.getItem("mStars");

	let minsArr=[];
	let secsArr=[];
	let movesArr=[];
	let starsArr=[];

	/**CONVERT THE LOCAL STORAGE STRINGS INTO ARRAYS*/
	minsArr = min.split(" ");
	secsArr = sec.split(" ");
	movesArr = move.split(" ");
	starsArr = star.split(" ");// HOLDS THE NUMBER OF STARS IN EVERY TURN //


	/* TO GET RID OF THE FIRST ITEM IF IT WAS AN EMPTY STRING 
	WHICH IS SET TO IT AT THE LINES(141 TO 144)*/
	
	if(minsArr[0]===""){minsArr.splice(0,1);}
	if(secsArr[0]===""){secsArr.splice(0,1);}
	if(movesArr[0]===""){movesArr.splice(0,1);}
	if(starsArr[0]===""){starsArr.splice(0,1);}


	let i;
	for( i=0; i<minsArr.length; i++ ){
		console.log(starsArr[i]);
		attemptsArr[i].innerHTML=`<h2>your ${forSubHeadings[i]} attempt</h2>
		                          <p>your best time : <span id="firstTime">( ${minsArr[i]} ) mins ( ${secsArr[i]} ) secs </span></p>
		                          <p>your moves : <span id="firstMoves">( ${movesArr[i]} )</span></p>
		                          <p>your stars :<br>
		                              <span id="preDashStars">( <span>${starsArr[i]}</span> ) STARS</span>
		                           </p>`;
		if ( minsArr.length>4) {
				

				let j; //TO LOOP OVER (attemptsArr) ARRAY
				let i;
				for( i=1; i<=4 ; i++ ){

					/* WHEN THE LENGTH OF THESE ARRAYS 
					(minsArr, secsArr, movesArr, starsArr ) BECOME
					LARGER THAN 4, SEND THEIR VALUES TO THE
					"your first attempt" SECTION ON THE 
					"previous results dashboard"
					 */
				 	if(i===1){
				 		attemptsArr[0].innerHTML=`<h2>your ${forSubHeadings[0]} attempt</h2>
		                          <p>your best time : <span id="firstTime">( ${minsArr[4]} ) mins ( ${secsArr[4]} ) secs </span></p>
		                          <p>your moves : <span id="firstMoves">( ${movesArr[4]} )</span></p>
		                          <p>your stars :<br>
		                              <span id="preDashStars">( <span>${starsArr[i]}</span> ) STARS</span>
		                           </p>`;
				 	}else{

				 	/*AND SET THE REST OF SECTIONS (your second attempt, third and forth)
				 	  TO THEIR INITIAL VALUES BEFORE YOU SART PLAYING
				 	*/
				 		j = i-1; 
						attemptsArr[j].innerHTML=`<h2>your ${forSubHeadings[j]} attempt</h2>
						                          <p>your best time :<span id="firstTime">--:--</span></p>
						                          <p>your moves :<span id="firstMoves">----</span></p>
						                          <p>your stars :<br>
						                              <span id="preDashStars">---</span>
						                           </p>`;	
				 	}
				}

				/* SET THE LOCALE STORAGE TO THESE NEW VALUES 
				WHICH ARE THE FIFTH ELEMENTS OF ITS ARRAYS TO 
				EXIST AS A VALUES FOR THE FIRST ATTEMPT SECTION 
				AT AND FOR NOT LOSING THEM AT THE PREVIOUS
				 RESULTS DASHBOARD*/
				localStorage.setItem("mMins", minsArr[4]);
				localStorage.setItem("mSecs", secsArr[4]);
				localStorage.setItem("mMoves", movesArr[4]);
				localStorage.setItem("mStars", starsArr[4]);

				// SET THESE VARIABLES TO EMPTY ARRAYS AGAIN //
				minsArr=[];
				secsArr=[];
				movesArr=[];
				starsArr=[];
		}

	}
	
});

// MAKING THE  ENTER BUTTON FIRES THE MAIN FUNC. GAME WHEN IT IS CLICKED ON CARDS //
Mousetrap(deck).bind(["enter","space"], playGame);

// MAKING THE  ENTER BUTTON FIRES THE resetFunc FUNC. WHEN IT IS CLICKED ON REPEAT BUTTON //
const repeatBtn=document.querySelector(".repeat");
Mousetrap(repeatBtn).bind("enter",resetFunc);

// USING ARROW BUTTONS TO NAVIGATE ACROSS THE CARDS //
deck.addEventListener("keydown", (e)=>{
	
	const childList= deck.querySelectorAll("li");	
		
	for(i=0; i<childList.length; i++){
		childList[i].setAttribute("id", i);
	}

	let currElementIndex = e.target.id;
	


	if(e.which===37){
		
		if(e.target.id == 0){
			childList[15].focus();
		}else{
			childList[e.target.id-1].focus();
		}
	}

	if(e.which=== 39){

		if (e.target.id == 15) {
			childList[0].focus();
		}else{
			childList[e.target.id -1+2].focus();
		}
	}

	if (e.which==38) {
		e.preventDefault();
		if(e.target.id == 0){
			childList[12].focus();
		}else if(e.target.id == 1){
			childList[13].focus();
		}else if(e.target.id == 2){
			childList[14].focus();
		}else if(e.target.id == 3){
			childList[15].focus();
		}else{
			childList[e.target.id -4].focus();

		}

	}

	if (e.which == 40) {
		e.preventDefault();
		if(e.target.id == 12){
			childList[0].focus();
		}else if(e.target.id == 13){
			childList[1].focus();
		}else if(e.target.id == 14){
			childList[2].focus();
		}else if(e.target.id == 15){
			childList[3].focus();
		}else{
			childList[e.target.id -1+5].focus();

		}
		
	}
});

// ADD THE ABILITY TO NAVIGATE THE CURRENT DASHBOARD BY FOCUS USING KEYBOARD ARROW BUTTONS  //

/*const playAgain= document.querySelector(".leftB");
const previousResults=document.querySelector(".rightB");*/
const aExit=document.querySelector(".aExit");

currentDash.addEventListener("keydown", (e)=>{

	if(e.which === 37 || e.which === 39){
		if(e.target.classList.contains("leftB")){
			previousResults.focus();
		}else if(e.target.classList.contains("rightB")){
			playAgain.focus();
		}
	}

	if (e.which ===38 || e.which=== 40) {
		e.preventDefault();
		if(e.target.classList.contains("leftB") || e.target.classList.contains("rightB")){
			aExit.focus();
		}else{
			playAgain.focus();

		}
	}
		// TO ENSURE THAT THE FOCUS WILL REMAIN IT THE CURRENT DASH//
	if (e.which===9) {
		if(e.target.classList.contains("aExit")){
			e.preventDefault();
			playAgain.focus();
		}
	}

	if(e.shiftKey && e.which===9){
		if(e.target.classList.contains("aExit")){
			playAgain.focus();
		}

		if(e.target.classList.contains("leftB")){
			e.preventDefault();
			aExit.focus();
		}
	}


});

// ADD THE ABILITY TO NAVIGATE THE PREVIOUS RESULTS DASHBOARD BY FOCUS USING KEYBOARD ARROW BUTTONS //

//const backButton = document.querySelector(".back");
//const resetResults=document.querySelector(".resetGame");
const aExitPre=document.querySelector(".aExitPre");

previousDassh.addEventListener("keydown", (e)=>{

	if(e.which === 37 || e.which === 39){
		if(e.target.classList.contains("back")){
			resetResults.focus();
		}else if(e.target.classList.contains("resetGame")){
			backButton.focus();
		}
	}

	if (e.which ===38 || e.which=== 40) {
		e.preventDefault();
		if(e.target.classList.contains("back") || e.target.classList.contains("resetGame")){
			aExitPre.focus();
		}else{
			backButton.focus();

		}
	}

		// TO ENSURE THAT THE FOCUS WILL REMAIN IT THE PREVIOUS RESULTS DASH//
	if(e.which===9){
		if (e.target.classList.contains("resetGame")) {
			e.preventDefault();
			aExitPre.focus();
		}
	}
	if(e.shiftKey && e.which===9){
		if(e.target.classList.contains("aExitPre")){
			e.preventDefault();
			backButton.focus();
		}
	}


});

/* WHEN YOU REACH THE LAST SOCIAL MEDIA ICON, PRESSING TAB BUTTON
WIIL TAKE YOU TO THE FIRST CARD IN THE DECK,
I DID THAT FOR KEEPING THE FOCUS INSIDE THE DODY ELEMENT
AND PREVENTING IT FROM GOING TO THE ADDRESS BAR AT THE TOP OF PAGE*/
const linkedin= document.querySelector("#linkedin");
const gitHub = document.querySelector("#gitHub");
linkedin.addEventListener("keydown", (e)=>{
	if(e.which === 9){
		e.preventDefault();
		deck.firstChild.focus();
	}
	if(event.shiftKey && event.which == 9){
		gitHub.focus();
	}
});
// MAKE THE GAME PAGE RELOAD & HIDE THE DASHBOARD WHEN CLICK ON THE PLAY AGAIN BUTTON //
playAgain.addEventListener("click", ()=>{
	location.reload();
});

// GO TO PREVIOUS RESULTS PAGE WHEN CLICK ON (previous results) BUTTON //

previousResults.addEventListener("click", ()=>{
	currentDash.classList.add("hide");
	previousDassh.classList.remove("hide");
	backButton.focus();

});

