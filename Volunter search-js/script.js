//store list of categories (the <li> elements)
const categoryList = document.querySelectorAll("#filter-list li"); 

//store all the gallery cards
const allCards = document.querySelectorAll("#card-gallery-wrapper li");

//function that runs when a filter category is clicked
function onFilterClick(e) {

    //get the "data-group" attribute of the clicked card
    const categoryNumber = e.target.getAttribute("data-group");
    
    //calls a function once for each card (<li> element) in the allCards array (the card gallery)
    allCards.forEach((list) => {
        
        //if the clicked filter has data-group="0", remove ".hidden" class to display all the cards
        if (categoryNumber == 0) {
            list.classList.remove("hidden")
        }
        
        //else statement with nested if and else statements
        else {
            //if the data-group of the cicked filter does not match the data-group of the cards currently displayed
            if (list.getAttribute("data-group") != categoryNumber)  { 
                list.classList.add("hidden");  
            }
            
            //otherwise display the cards that have a matching data-group
            else { 
                list.classList.remove("hidden");
            }
        } //closing bracket for outer else statement         
    }); //closing bracket for the ForEach() function    
} //closing bracket for onLastClick() function

//call the onLastClick() function when a filter is clicked
categoryList.forEach((list) => {
    list.addEventListener("click", onFilterClick);
});