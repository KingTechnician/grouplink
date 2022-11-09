# GroupLink
## Purpose
 - GroupLink is a plugin for students and faculty to organize relevant online links into a single, clickable link
 - This plugin was made in mind for intuitive research, organized lesson plans, and convenience throughout the high school and college learning process

## At a Macro
- One page displays the menu (with Create Link, View Link and Profile tabs)
- User can type a set of links, along with a title
- Upon submission, two things will occur
    - The links will be saved in the cloud (through Amazon Web Services)
    - The links will also be saved in local storage ( lasting for as logn as the browser is active)
## Technical Highlights
-  Interesting bugs
    - The largest limitation to the GroupLink browser extension is that links are not openable on Safari browsers or Apple devices
        - The primary reason for this is that Apple has protections to prevent acess to tabs from anything other than iOS applications or iOS extensions
    - We wanted to implement a login feature for the extension as well, but we felt that this was not feasible
        - The majority of login APIs require a web app or runnable backend, which was often incompatible with something like a browser extension
        - We hope to use services such as Auth0 in order to properly create a secure login process
- Challenges
    - The largest challenge was the implementation of allowing other devices that do not have the extension to open our GroupLinks
        - The methodology we centered on was using AWS to upload to a static website host
            - Minified HTML for success message
            - Minified CSS for styling
            - Minified JS for opening the links as new tabs
        - Another challenge was lerning how the Amazon S3 service uses CORS (Cross-origin resource sharing) policy to upload the files we needed

## What Would a Final Version Look Like
- Our extension would have an added login function that allows people to store their links not only on the web, but also within the cloud
    - Ideally, upon login, the Saved Links tab would populate with all of the links that they have in their account
- An iOS version of our browser extension would have to be made in order to ensure compatibility with Apple devices and the Safari browser
## Team Process
- Due to our conflicting schedules, the best way for us to work effective was an asynchronous work schedule
    - We work on our particular portions independently, reaching out when we need assisstance
    - We arrange weekly meetings where we discuss our progress, next steps, and any other related topics
        - Include links to meeting maps here
    - This has proven to be a very benefiial process to allow us to work quickly, however we also feel there is an important component to working in-person that we missed
