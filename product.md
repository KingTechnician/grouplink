# GroupLink
## Purpose
 - GroupLink is a plugin for students and faculty to organize relevant online links into a single, clickable link
 - This plugin was made in mind for intuitive research, organized lesson plans, and convenience throughout the high school and college learning process

## At a Macro
- One pge displats the menu (with Create Link, View Link and Profile tabs)
- User can type a set of links, along with a title
- Upon submission, two things will occur
    - The links will be saved in the cloud (through Amazon Web Services)
    - The links will also be saved in local storage ( lasting for as logn as the browser is active)
## Technical Highlights
- Interesting bugs
    - The largest limitation to the GroupLink browser extension is that links are not openable on Safari browsers or Apple devices
        - The primary reason for this is that Apple has protections to prevent acess to tabs from anything other than iOS applications or iOS extensions
    - We wanted to implement a login feature for the extension as well, but we felt that this was not feasible
        - The majority of login APIs require a web app or runnable backend, which was often incompatible with something like a browser extension