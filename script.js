//variable to store reference to the <ul> element
const todoList = document.getElementById("list");

//function to add a new task
function addTask() {

    //variable to store what the user typed in the text field
    let submittedTask = document.getElementById("inputField").value;

    //if user enters text into the input field
    if (submittedTask.length > 0) {
        
        //create a new <li> element and store it to a variable
        const listItem = document.createElement("li");

        //add the submitted text to the list item
        listItem.textContent = submittedTask;      

        //append the <li> to the <ul>
        todoList.appendChild(listItem)

        //clear input field after submitting a task
        document.getElementById("inputField").value = "";
        
        //call the removeItem() function when a task is clicked to remove it
        listItem.onclick = removeItem; 
    } 

    //show message if user tries to submit a task with an empty input field
    else {
        alert("Please enter a task.");
    }
} //closing bracket for addTask() function

//event handler that calls the addTask() function if the "Enter" key is pressed
document.addEventListener("keyup", function(event) {
    
    //call addTask() only when the Enter key is pressed   
    if (event.key == "Enter") {
        addTask();
    }
}); //closing bracket for document.addEventListener

//function to remove items when clicked
function removeItem(event) {
    const completedTask = event.target;
    todoList.removeChild(completedTask);
}
