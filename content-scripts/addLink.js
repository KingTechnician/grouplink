//Because of the security protocols with Firefox's browser, absolutely no inline Javascript commands will work.
//This means that the <script> tag will not work, nor will the 'onclick' attribute on any HTML element.
//Due to this, we have to set functions outside of the html, in explicit Javascript files.

//For debugging purposes, printing the local storage of the browser
console.log(localStorage);

//The below function call simply ensures that the cursor is inside of the first text box.
focusLastElement();


/*Below is an action listener that will check to see if all html is in the html page.
 *When it is, it will grab the button used for adding new text boxes and set an action listener to the handler function that will add a new text box.
 *^^^Works the same way the onclick attribute would.
 *It will then set another action listener to the same method but also when the user presses Enter at any time (You can test this by pressing Enter on the test.html page)
 *Finally, it will set a third action listener to a method that will handle submitting and saving links into browser storage.
*/
document.addEventListener('DOMContentLoaded',function()
{
    document.getElementById("plusButton").addEventListener("click",handler);
    document.onkeydown = (keyDownEvent) =>
    {
        if(keyDownEvent.key==="Enter")
        {
            handler()
        }
    }
    document.getElementById("submitButton").addEventListener("click",submitHandler)
})

//This below function works by grabbing the links that were entered and saving them into the local browser storage.
function submitHandler()
{
    //We grab all of the text boxes with the class name 'linkChoice' which map to all of the user's link choices
    var links=document.getElementsByClassName("linkChoice");
    //links is not an array, but an HTMLCOllection, so we cannot map or filter. We will have to make an array, then append the values from each text box.
    var linkList = []
    for (var i = 0; i < links.length; i++)
    {
        linkList.push(links[i].value)
    }

    //Printing this array for debugging.
    console.log(linkList);

    //The name the user chooses for the GroupLink is separate from the link choices, so we have to load it separately.
    var name = document.getElementsByClassName("nameLink")[0].value

    //Printing the name for debugging.
    console.log(name)

    //To prevent blank names, we also check to see if the name was never chosen. By default, if a name was not chosen, the name will be the current date in milliseconds.
    if(name===undefined)
    {
        name = Date.now()
    }

    /*Here is where we make the object to save in browser storage.
     *We store the name and the links as an array.
     *We also check to see if the "Create in new winow" checkbox was checked. If it is, the newWindow attribute will be true, false otherwise.
     *The time is the date in milliseconds as a string.
     *Important note: The structure is exactly the structure of a JSON file.
    */
    let linkObject = 
    {
        name:name,
        links:linkList,
        newWindow: ((document.getElementById("newWindow").checked===true)? true:false),
        time:Date.now()
    };

    //Printing the object for debugging purposes.
    console.log(linkObject)

    //JSON objects on their own can be lost in translation if it is not converted properly. So we go through the process of converting the object into a string.
    var stringify = JSON.stringify(linkObject);

    //Now we are able to save the information into browser storage using a key/value pair. The key is the name of the GroupLink and the value is the GroupLink object itself.
    localStorage.setItem(name,stringify);

    //And a friendly alert to confirm that the file has been saved.
    alert("GroupLink has been saved!");
}


//This method goes through the proces of adding a new text box to the page for a new link.
function handler()
{
    //We grab the div with the 'link' class, which we will add a new element to. There will always only be one div.
    var link=document.getElementsByClassName("link")[0];

    //Next, we create the new input element and add the 'linkChoice' class so it matches the other text boxes. We also set the type and placeholder.
    var input=document.createElement("input");
    input.classList.add("linkChoice")
    input.type="text";
    input.placeholder="Enter link";

    //We also add a br element to create some space between the text boxes.
    var buffer=document.createElement("br");
    link.appendChild(buffer);
    link.appendChild(input);

    //Finally, we make sure that the cursor is moved to the newly created element.
    focusLastElement();
}
//Grabs all current text boxes from test.html and moves the cursor to the very last one in existence.
function focusLastElement()
{
    var choices = document.getElementsByClassName("linkChoice");
    choices[choices.length-1].focus()
}