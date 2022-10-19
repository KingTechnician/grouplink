


export function uploadToServer(groupLinkName)
{
    var grabObject = localStorage.getItem(groupLinkName)

    console.log("Grab: "+grabObject.toString())
    var linkObject = {"name":grabObject.name,"links":grabObject.links,"newWindow":grabObject.newWindow,"time":grabObject.time}

    AWS.config.apiVersions = {
        s3:'latest'
    }
    const s3 = new AWS.S3({
        accessKeyId: ,
        secretAccessKey: 
    })

    const uploadFile = (content,bucket,key,contentType) => 
    {
        const params = {
            Bucket:bucket,
            Key:key,
            Body: content,
            ContentType:contentType
    };

    s3.upload(params, function(err,data)
    {
        if(err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`)
    });
    }
    const bucket = "grouplink"
    const jsType = "application/x-javascript"
    const htmlType = "text/html"

    const randomCode = Math.random().toString(36).slice(2)

    const jsonContent = "linkObject = "+grabObject
    console.log("JSON: "+jsonContent)
    const jsonKey = randomCode+"/linkInformation.js"
    uploadFile(jsonContent,bucket,jsonKey,jsType)

    const jsContent = "document.title=linkObject.name,getDiv=document.getElementById('groupLinks');let trueLinks=linkObject.links.filter(e=>''!==e);for(var i=0;i<trueLinks.length;i++)trueLinks[i].includes('https://')||trueLinks[i].includes('http://')||(trueLinks[i]='https://'+trueLinks[i]);for(var i=0;i<trueLinks.length;i++){var e=document.createElement('a');e.setAttribute('href',trueLinks[i]),e.innerHTML=trueLinks[i];var t=document.createElement('span');t.innerHTML='</br>',getDiv.appendChild(e),getDiv.appendChild(t)}var getButton=document.getElementById('activateButton');function openLinks(){for(var e=0;e<trueLinks.length;e++)window.open(trueLinks[e],'_blank')}getButton.addEventListener('click',openLinks);"
    const jsKey = randomCode+"/open.js"
    uploadFile(jsContent,bucket,jsKey,jsType)

    const htmlContent = "<style>body{background-image: linear-gradient(rgb(112,61,214), rgb(188,196,255)); background-repeat: no-repeat; background-attachment:fixed; color: white; text-align:center;}a{color:white;}</style><head> <title>Your Group Links</title></head><body> <script src='linkInformation.js'></script> <h1>Here are your Group Links!</h1> <p>If the links do not show, try enabling popups in your browser settings.</p><div id='groupLinks'> <h2>Links Connected to This GroupLink:</h2> </div><button id='activateButton' style='display:none;'></button> <script src='open.js'></script> <script>document.getElementById('activateButton').click();</script></body>"
    const htmlKey = randomCode+"/open.html"
    uploadFile(htmlContent,bucket,htmlKey,htmlType)

    console.log("Success!")
    var modal = document.getElementById("submitModal");
    var submitText = document.getElementById("submitText")

    submitText.innerText = "https://grouplink.s3.amazonaws.com/"+randomCode+"/open.html"

    submitText.setAttribute("href","https://grouplink.s3.amazonaws.com/"+randomCode+"/open.html")

    modal.style.display="block"

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function()
    {
        modal.style.display = "none";
    }
}

