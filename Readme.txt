Manifest:
{
  "name": "communitybook",
  "version": "1.0.0",
  "description": "Project for ITIS 6112",
  "author": "Team One",
  "private": true,
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "unit": "jest --config test/unit/jest.conf.js --coverage",
    "e2e": "node test/e2e/runner.js",
    "test": "npm run unit && npm run e2e",
    "lint": "eslint --ext .js,.vue src test/unit test/e2e/specs",
    "build": "node build/build.js"
  },
  "dependencies": {
    "bootstrap-vue": "^2.1.0",
    "firebase": "^7.4.0",
    "git": "^0.1.5",
    "typicons": "^2.0.9",
    "vue": "^2.5.2",
    "vue-router": "^3.0.1",
    "vuefire": "^2.2.0"
  }

Descriptions:
bootstrap-vue
    https://bootstrap-vue.js.org/
    With BootstrapVue you can build responsive, mobile-first, and ARIA accessible projects on the web using Vue.js and the world's most popular front-end CSS library — Bootstrap v4.

firebase
    https://firebase.google.com/
    A comprehensive app development platform
        Components utilised for communitybook:
            Cloud Firestore - Store and sync app data at global scale
            Cloud Storage - Store and serve files at Google scale
            Hosting - Deliver web app assets with speed and security

git
    https://git-scm.com/
    A free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

typicons
    https://www.s-ings.com/typicons/
    Free-to-use vector icons embedded in a webfont for easy use in any UI, whether it be on the web or in a native app.

vue
    https://vuejs.org/
    Progressive JavaScript Framework - An incrementally adoptable ecosystem that scales between a library and a full-featured framework.

vue-router
    https://router.vuejs.org/
    Vue Router is the official router for Vue.js. It deeply integrates with Vue.js core to make building Single Page Applications with Vue.js a breeze.

vuefire
    https://vuefire.vuejs.org/
    Realtime bindings between Vue/Vuex and Firebase
    
Project files:
index.html
    Links to adobe typekit for Interstate and Utopia Std fonts, typicons for icon library. Fontawesome is also linked to but has not been used up to this point in the implementation of the project.

src/main.js
    Imports library dependencies and instantiates the app

src/db.js
    Contains configuration information to connect to firebase

router/index.js
    Lists the routes for the various pages of the app

static/img/background.jpg
    Background image used for landing, sign in, and sign up screens

css/bootstrap-themed.css
    Contains the customized bootstrap css for the project

components/AddBook.vue
    Contains the code for adding a book screen and its functionality

components/Home.vue
    Contains the code for the home screen and its functionality

components/Landing.vue
    Contains the code for the landing page and its functionality

components/MyBooks.vue
    Contains the code for the my books screen and its functionality

components/Search.vue
    Contains the code for the search screen and its functionality

components/SignIn.vue
    Contains the code for the sign in screen and its functionality

components/SignUp.vue
    Contains the code for the sign up screen and its functionality

components/Wishlist.vue 
    Contains the code for the wishlist screen and its functionality

Use cases implemented:
    1. Search for a book
    2. Add a book
    Note: Creating an account, the My Books view, and Wishlist view have also been implemented but would need authentication to be fully functionality

Known bugs:
    Authentication has not been implemented and was not needed for the two use cases we focused on

Instructions to install:
    The project is available publicly at https://communitybook-1.web.app/#/
    The code is also available for re-download at https://github.com/CrystalSundara/communitybook if there is a problem with the submitted version; such as if the submission process corrupts any of the files
    To run the project locally:
	1. Download node.js from https://nodejs.org/ if you don't have it installed already
        2. cd to the unzipped directory (where this Readme is)
        3. npm install
        4. npm run dev
        5. Open the URL from the terminal in your browser. It should be something like http://localhost:8080
