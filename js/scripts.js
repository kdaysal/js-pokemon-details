let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //add new item to pokemonList
    function add(item) {
        if ((typeof (item) === 'object') && ('name' in item) && (('detailsUrl' in item))) {
            pokemonList.push(item);
        }

        else {
            console.log('invalid data type');
        }
    }

    //external function to add eventListener, passing in 'pokemon' object as the item
    function addListener(button, item) {
        button.addEventListener("click", () => {
            showDetails(item);
        });
    }

    //create a button for each pokemon
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.classList.add('button-class');
        button.innerText = pokemon.name;
        listItem.classList.add('pokemon-button');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        //Append button element (child) to button-wrapper
        let buttonWrapper = document.querySelector('.button-wrapper');
        buttonWrapper.appendChild(button);

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
            item.types = details.types;

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
        }).catch(function (e) {
            hideLoadingMessage()
            console.error(e);
        })
    }

    //bonus task - show loading message prior to fetch
    function showLoadingMessage() {
        console.log(`showLoadingMessage function called`); //FOR TESTING ONLY - REMOVE LATER
        let loadingElement = document.querySelector('#loading-element');

        let spinner = document.createElement('div');
        loadingElement.classList.add('is-visible');
        // console.log(loadingElement.classList.contains("is-visible")); //FOR TESTING ONLY - REMOVE LATER

        loadingElement.appendChild(spinner);
        // console.log(loadingElement.classList.contains("is-visible")); //FOR TESTING ONLY - REMOVE LATER
    }

    //bonus task - hide loading message once the fetch response has been received
    function hideLoadingMessage() {
        // console.log('hideLoadingMessage function called'); //FOR TESTING ONLY - REMOVE LATER
        let loadingElement = document.querySelector('#loading-element');

        loadingElement.classList.remove('is-visible');
        // console.log(loadingElement.classList.contains("is-visible")); //FOR TESTING ONLY - REMOVE LATER
    }

    //called when a user clicks on a pokemon button; gets pokemon details from the server
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
            showModal(pokemon.name, pokemon.height);

        });
    }

    //Show a modal with pokemon details
    function showModal(name, height) {
        console.log(`showModal function called`);
        let modalContainer = document.querySelector('#modal-container');
        console.log(`modalContainer: ${modalContainer}`);
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = name;

        let contentElement = document.createElement('p');
        contentElement.innerText = height;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);


        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    //Close the modal if the user presses the Escape key
    let modalContainer = document.querySelector('#modal-container');
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    //Close the modal if the user clicks anywhere outside of the modal
    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})(); //end of IIFE

//this code runs once the promise is resolved (i.e. once the list is loaded) and will add each pokemon to my pokemonList
pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

//generate list item (button) for each pokemon name. Note - we only call getAll() AFTER we've gotten all the info from the server via loadList()
pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
});