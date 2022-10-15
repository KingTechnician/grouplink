//When the user clicks on the extension icon, it will open intro.html
browser.browserAction.onClicked.addListener( async function()
{
    const tabs = await browser.tabs.query({active:true,currentWindow:true});
    browser.tabs.create({url:"platforms/intro.html"});
})