//Because of the security protocols with Firefox's browser, absolutely no inline Javascript commands will work.
//This means that the <script> tag will not work, nor will the 'onclick' attribute on any HTML element.
//Due to this, we have to set functions outside of the html, in explicit Javascript files.


//Grabbing the div from the view.html file
grabDiv = document.getElementById("savedLinks");

//Grabbing all keys from the local browser storage.
var keys = Object.keys(localStorage);


//We check if the keys are empty. If they are, we just let the user know in HTML that there are no links saved. Otherwise, we show all available links.
if(keys.length===0)
{
    var message = document.createElement("p");
    message.innerHTML = "<--There are no links saved in local storage-->";
    grabDiv.appendChild(message);
}
else
{
    //Iterate through each GroupLink and display some of the relevant information.
    keys.forEach(element =>
    {
        var value = localStorage.getItem(element);
        //Reverse method of JSON.stringify - converts a string representation into an object
        var linkObject = JSON.parse(value);

        //Creates a new button and buffer, and sets the button's inner HTML to the name, along with the date it was last opened.
        //If it was never opened, the date will be when it was first created.
        var newElement = document.createElement("button");
        var buffer = document.createElement("br");
        newElement.innerHTML = linkObject.name+", last opened - "+new Date(linkObject.time).toString();
        newElement.classList.add("selectionButton");

        //We also create an onclick function so that the links to the object will be loaded as soon as it is clicked.
        newElement.onclick = function() {openLinks(newElement)};

        //Adding the button and buffer
        grabDiv.appendChild(newElement);
        grabDiv.appendChild(buffer);
        grabDiv.appendChild(buffer);
    })
}

//Function that grabs information from the button chosen and opens the links within the browser
function openLinks(selection)
{
    var title = selection.textContent.split(",")[0];
    var linkObject = JSON.parse(localStorage.getItem(title));
    /*There are two possible cases for this function, in regards to the newWindow attribute
     *If newWindow is true, it means the user chose for the GroupLink to be opened as a new window.
     *Otherwise (by default), it will open as new tabs in the same window.
    */
    if(linkObject.newWindow)
    {
        //Create a new window in the browser and set the tabs to linkObject.link
        //We first filter out any links that were empty due to user error
        let trueLinks = linkObject.links.filter(link => link!=="");
        for(var i = 0; i < trueLinks.length; i++)
        {
            //We make sure that the links begin with 'https'. This is because Javascript will otherwise see the links as files and not web links.
            if(!trueLinks[i].includes("https://")&&!trueLinks[i].includes("http://"))
            {
                trueLinks[i] = "https://"+trueLinks[i];
            }
        }
        browser.windows.create({url:trueLinks});

        //Updating the GroupLink to the current time
        var newObject = 
        {
            name:linkObject.name,
            links:trueLinks,
            newWindow:linkObject.newWindow,
            time:Date.now()
        }
        newObject = JSON.stringify(newObject);
        localStorage.setItem(linkObject.name,newObject)
    }
    else
    {
        //Different syntax, but basically for loop for each link
        linkObject.links.forEach(link=>
        {
            //Checks if any link is empty and omit it
            if(link==="")
            {
                console.log("Empty");
            }
            else
            {
                var copyLink = link;
                if(!link.includes("https://"))
                {
                    copyLink = "https://"+link;
                }
                //Updating the GroupLink to the current time
                var newObject = 
                {
                    name:title,
                    links:linkObject.links,
                    newWindow:true,
                    time:Date.now()
                }
                newObject = JSON.stringify(newObject);
                localStorage.setItem(title,newObject);
                browser.tabs.create({url:copyLink})
            }
        })
    }
}