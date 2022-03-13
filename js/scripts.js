/* eslint-env jquery */ //this prevents eslinter from throwing an 'undefined' error on every "$" encountered
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //add new item (returned from the api fetch) to pokemonList
    function add(item) {
        if ((typeof (item) === 'object') && ('name' in item) && (('detailsUrl' in item))) {
            pokemonList.push(item);
        }

        else {
            console.log('invalid data type');
        }
    }

    //add event listener to each button, passing in pokemon details
    function addListener(button, pokemonDetails) {
        button.on('click', function () {
            showDetails(pokemonDetails);
        });
    }

    //create a button for each pokemon
    function addListItem(pokemon) {
        let pokemonList = $('.pokemon-list'); //jQuery replacement for: document.querySelector('.pokemon-list');
        let listItem = $('<li></li>'); //jQuery replacement for: document.createElement('li');
        let button = $('<button></button>'); //jQuery replacement for: document.createElement('button');
        button.addClass('btn-primary btn-lg poke-button'); //add bootstrap group-list classes to the buttons
        button.text(pokemon.name); //jQuery replacement for: button.innerText = pokemon.name;
        listItem.addClass('list-group-item'); //add bootstrap list-group-item class to the li's. jQuery replacement for: listItem.classList.add('list-group-item');
        listItem.append(button); //jQuery replacement for: listItem.appendChild(button);
        pokemonList.append(listItem);

        //this will trigger the modal when a pokemon button is pressed
        button.attr('data-toggle', 'modal');
        button.attr('data-target', '#pokemonModalCenter');

        //Append button element (child) to button-wrapper
        let listGroup = $('.list-group');
        listGroup.append(button);

        //add an event listener to each button to log details of the pokemon object to the console
        addListener(button, pokemon);
    }

    //return the entire pokemonList
    function getAll() {
        return pokemonList;
    }

    //load detailed data for a given pokemon when a pokemon button is pressed
    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            hideLoadingMessage();
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;

            //blank array that will hold all of the available 'types' for each pokemon
            item.types = [];
            details.types.forEach((pokemon) => {
                item.types.push(' ' + pokemon.type.name); //adding a single leading blank space to visually separate the types when there are 2 or more of them
            })
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });
    }

    //load list of pokemon from apiUrl
    function loadList() {
        showLoadingMessage();
        //remember, the below fetch syntax is shorthand for method: GET
        return fetch(apiUrl).then(function (response) {
            hideLoadingMessage()
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
            sortPokemonList();//now that pokemonList is generated, I can sort the list alphabetically by pokemon name
        }).catch(function (e) {
            hideLoadingMessage()
            console.error(e);
        })
    }

    //sort PokemonList alphabetically by pokemon name
    function sortPokemonList() {
        pokemonList.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }

    //show loading message prior to fetch
    function showLoadingMessage() {
        let loadingElement = $('#loading-element');
        let spinner = $('<div></div>');
        loadingElement.addClass('is-visible');
        loadingElement.append(spinner);
    }

    //hide loading message once the fetch response has been received
    function hideLoadingMessage() {
        let loadingElement = $('#loading-element');
        loadingElement.removeClass('is-visible');
    }

    //called when a user clicks on a pokemon button; gets pokemon details from the server
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    //show a modal with pokemon details
    function showModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        // let modalHeader = $(".modal-header"); - UNCOMMENT later to further customize modal header, or remove if not desired

        //clear out anything currently in the modal
        modalTitle.empty();
        modalBody.empty();

        //create a name element in the modal
        let nameElement = $('<h1>' + pokemon.name + '</h1>');

        //create a height element in the modal
        let heightElement = $('<h3>' + 'Height: ' + pokemon.height + '</h3>');

        //create a types element in the modal
        let typesElement = $('<h4>' + 'Types: ' + pokemon.types + '</h4>');

        //create an img element in the modal
        let imageElementFront = $('<img class="modal-img" style="width:50%">');
        imageElementFront.attr('src', pokemon.imageUrl);

        //add all elements (modal content) to the modal
        modalTitle.append(nameElement);
        modalBody.append(heightElement);
        modalBody.append(typesElement);
        modalBody.append(imageElementFront);
    }

    //add event listener to input on search field
    $('#search-input').on('keyup', function () {
        let searchValue = $(this).val();
        console.log(`value: ${searchValue}`); //for testing only - REMOVE LATER
        filterData(searchValue); //filter pokemon buttons to only show names that contain the user's search string
    });

    function filterData(searchValue) {
        //because getElementsByClassName will return an HTML Collection, not an array, I can't use a regular "forEach" method...but I CAN use Array.from ... which will enable the use of forEach afterwards
        //see: https://stackoverflow.com/questions/3871547/js-iterating-over-result-of-getelementsbyclassname-using-array-foreach
        Array.from(document.getElementsByClassName("poke-button")).forEach(
            function (element, index, array) {
                let name = element.innerHTML.toLowerCase();
                console.log(name); //FOR TESTING ONLY - DELETE LATER

                //if pokemon name does NOT include the searchValue, make it invisible
                if (!name.includes(searchValue)) {
                    element.classList.add('make-invisible'); // not sure why I couldn't use the JQuery equivalent addClass here...but this worked???
                }
                
                //otherwise, make it visible again (in case the user has already typed in the search field and is now backspacing/removing characters)
                else {
                    element.classList.remove('make-invisible');
                }
            }
        );
    }

    //this makes it possible to call functions that are nested inside the IIFE
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})(); //end of IIFE

//this code will only run after the promise is resolved
pokemonRepository.loadList().then(function () {
    //now that data is loaded...
    //generate list item (button) for each pokemon name. Note - I'm only calling getAll() AFTER all the info from the server is loaded via loadList()
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});