document.title = linkObject.name

getDiv = document.getElementById('groupLinks')


let trueLinks = linkObject['links'].filter(link => link!=='');


for(var i = 0; i < trueLinks.length; i++)
    {
        //We make sure that the links begin with 'https'. This is because Javascript will otherwise see the links as files and not web links.
        if(!trueLinks[i].includes('https://')&&!trueLinks[i].includes('http://'))
        {
            trueLinks[i] = 'https://'+trueLinks[i];
        }
        
    }

for(var i = 0; i<trueLinks.length;i++)
{
    var newLink = document.createElement("a");
    newLink.setAttribute("href",trueLinks[i])
    newLink.innerHTML = trueLinks[i]
    var buffer = document.createElement("span");
    buffer.innerHTML = "</br>"
    getDiv.appendChild(newLink)
    getDiv.appendChild(buffer)
}

var getButton = document.getElementById('activateButton')

getButton.addEventListener("click",openLinks)

function openLinks()
{
    for(var i = 0;i<trueLinks.length;i++)
    {
        window.open(trueLinks[i],'_blank');
    }
}