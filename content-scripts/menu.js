import {uploadToServer} from '../content-scripts/serverConnection.js'

var menuArray = ["linkMenu","links","profile"]

function focusLastElement()
{
    var choices = document.getElementsByClassName("link");
    choices[choices.length-1].focus()
}

function setActive(name)
{
    for (var i = 0; i<menuArray.length;i++)
    {
        var element = document.getElementsByClassName(menuArray[i])[0]
        element.style.display="none";
    }
    var getMenu = document.getElementsByClassName(name)[0]
    getMenu.style.display = "block";
}
var createLinkButton = document.getElementById("createLink")


var plusButton = document.getElementsByClassName("plusButton")[0]

plusButton.addEventListener("click",addLink)



function addLink()
{
    var getDiv = document.getElementsByClassName("linkChoices")[0]
    var newLink = document.createElement("input")
    newLink.setAttribute("type","text")
    newLink.setAttribute("size","90");
    newLink.classList.add("link")
    newLink.style.width="80%"
    var buffer = document.createElement("br");
    getDiv.appendChild(newLink)
    focusLastElement()
}

document.addEventListener('DOMContentLoaded',function()
{
    document.getElementById("plusButton").addEventListener("click",addLink);
    document.onkeydown = (keyDownEvent) =>
    {
        if(keyDownEvent.key==="Enter")
        {
            addLink()
        }
    }
    document.getElementById("submitButton").addEventListener("click",submitHandler)
})

createLinkButton.addEventListener("click",function(){setActive("linkMenu")})

var createSaveButton = document.getElementById("savedLinks")

createSaveButton.addEventListener("click",function(){setActive("links")})

var profileButton = document.getElementById("profile")

profileButton.addEventListener("click",function(){setActive("profile")})


//This below function works by grabbing the links that were entered and saving them into the local browser storage.
function submitHandler()
{
    //We grab all of the text boxes with the class name 'linkChoice' which map to all of the user's link choices
    var links=document.getElementsByClassName("link");
    //links is not an array, but an HTMLCollection, so we cannot map or filter. We will have to make an array, then append the values from each text box.
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
     *We also check to see if the "Create in new window" checkbox was checked. If it is, the newWindow attribute will be true, false otherwise.
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

    uploadToServer(name)

    //And a friendly alert to confirm that the file has been saved.
    
}

//Function to be used later - at the moment, does not do anything important
window.addEventListener("keydown",function()
{
    var desiredPass = document.getElementById("desiredPass")
    var repeatPass=  document.getElemenyById("repeatPass")
    console.log(desiredPass.value)
    console.log(repeatPass.value)
})

