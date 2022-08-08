# Pokédex App
<p float="left">
  <img src="https://github.com/kdaysal/js-pokemon-details/blob/main/img/1-pokedex-main.png" width="500" />
</p>

 This single-page Pokemon App allows users to view details for up to 150 different pokemon characters. Details are fetched from a publicly available [here](https://pokeapi.co/api/v2/pokemon/?limit=150) 

## Main Objective

To build a small web application with HTML, CSS, and JavaScript that loads data from an external API and enables the viewing of data points in detail.

This project was built using HTML, CSS, and JavaScript in conjunction with jQuery and Bootstrap libraries. Data is fetched from an external API and displayed on the page in the form of a scrollable list. Users can click on any pokemon's name to display additional information about the selected pokemon.

## Key Features

* Load data from an external source (API)

* View a list of items

* On user action (e.g., by clicking on a list item), view details for that item

<p float="left">
  <img src="https://github.com/kdaysal/js-pokemon-details/blob/main/img/2-pokedex-main.png" width="300" />
</p>

* Search for a specific pokemon

<p float="left">
  <img src="https://github.com/kdaysal/js-pokemon-details/blob/main/img/3-pokedex-search.png" width="300" />
</p>

## Technologies / Strategies Used

* JavaScript (ES6)
    * DOM selection, traversal, and manipulation of nodes 
    * Event handlers
    * Event listeners
* HTML-5
    * Accessibility features
* CSS
* jQuery - used for DOM-traversal, event-handling and Ajax calls
* [Bootstrap](https://getbootstrap.com/) - UI framework chosen for styling (including Navbar, Modals, and Grid Columns)
* CodePen (sandbox coding environment used during development)
* Repl (another sandbox coding environment used during development)
* [Can I use](https://caniuse.com/) - resource for researching multi-browser compatability of features
* [JSON Viewer - Chrome](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh) - Chrome extension for printing/highlighting JSON
* UI patterns - including real-time form validation and modals
* [Prettier](https://prettier.io/) - used for formatting css code
* [ESLint](https://eslint.org/) - used for analyzing / formatting JS code

## User Stories

* As a user, I'd like to see a list of several pokemon characters so I can browse / scroll through different ones to learn more about them.

* As a user, when I click on the name of a pokemon, I want to see more information about that pokemon such as name, height, and an image.

* As a user on the home page, I want to be able to search for a particular pokemon by name so I don't have to scroll through the entire list to find the one that I'm looking for

## Technical Requirements

* The app must load data from an external API

* The app must display a list of items loaded from that API after the page is loaded.

* The app must enable the viewing of more details for a given list item (like a Pokémon) on
demand, such as when clicking on a list item.

* The app must have CSS styling.

* The JavaScript code must be formatted according to ESLint rules.

* The app must use at least one additional complex UI pattern, such as a modal, for details or
touch interactions.

  * The app may allow searching for items (e.g., searching for Pokémon).

* The app must not throw any errors when being used.

* The app must be deployed to a publicly accessible platform like GitHub Pages

* The app must work in Chrome, Firefox, Safari, Edge, and Internet Explorer 11.

* The app should show loading indicators while loading data.

* The app should handle errors (such as trying to load data while offline) and show user-friendly
error messages

## How to Run the App

* Simply click on the live hosted link [here](https://kdaysal.github.io/js-pokemon-details/)