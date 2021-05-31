const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const select = document.querySelectorAll(".row.selected");
const total = document.getElementById("total");
const movieselect = document.getElementById("movie");

let ticketPrice = movieselect.value;

populateUI();
function setMovieData(movieIndex,moviePrice){
        localStorage.setItem("selectedMovieIndex",movieIndex);
        localStorage.setItem("selectedMoviePrice",moviePrice);
}
// GEt From LocalStorage
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); 
    console.log(selectedSeats);
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex")   
}


// Movie Select
movieselect.addEventListener("change",(e)=>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedcount(); 
    

})
function updateSelectedcount(){
    const selectedseats = document.querySelectorAll(".row .seat.selected");
    const selectedseatsCount = selectedseats.length; 
    count.innerText = selectedseatsCount;
    total.innerText = selectedseatsCount * ticketPrice;
    const seatIndex = [...selectedseats].map(function(selectedseats){
        return [...seats].indexOf(selectedseats);
    });
    localStorage.setItem("selectedSeats",JSON.stringify(seatIndex));
    
    // console.log(seatIndex);

}
container.addEventListener("click",(e)=>{
    if(e.target.classList.contains("seat")&& !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected");
        updateSelectedcount();
    }
})