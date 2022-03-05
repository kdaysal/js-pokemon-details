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
        button.classList.add('btn-primary'); //add bootstrap group-list classes to the buttons
        button.innerText = pokemon.name;
        listItem.classList.add('group-list-item'); //add bootstrap group-list classes to the li's
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        //this will trigger the modal when a pokemon button is pressed
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemonModalCenter')

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
        }).catch(function (e) {
            hideLoadingMessage()
            console.error(e);
        })
    }

    //show loading message prior to fetch
    function showLoadingMessage() {
        console.log(`showLoadingMessage function called`); //FOR TESTING ONLY - REMOVE LATER
        let loadingElement = document.querySelector('#loading-element');

        let spinner = document.createElement('div');
        loadingElement.classList.add('is-visible');
        // console.log(loadingElement.classList.contains("is-visible")); //FOR TESTING ONLY - REMOVE LATER

        loadingElement.appendChild(spinner);
        // console.log(loadingElement.classList.contains("is-visible")); //FOR TESTING ONLY - REMOVE LATER
    }

    //hide loading message once the fetch response has been received
    function hideLoadingMessage() {
        // console.log('hideLoadingMessage function called'); //FOR TESTING ONLY - REMOVE LATER
        let loadingElement = document.querySelector('#loading-element');

        loadingElement.classList.remove('is-visible');
        // console.log(loadingElement.classList.contains("is-visible")); //FOR TESTING ONLY - REMOVE LATER
    }

    //called when a user clicks on a pokemon button; gets pokemon details from the server
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon); //FOR TESTING ONLY - REMOVE LATER
            showModal(pokemon);
        });
    }

    //Show a modal with pokemon details
    function showModal(pokemon) {
        console.log(`showModal() is running`); //FOR TESTING ONLY - REMOVE LATER
        console.log(`name: ${pokemon.name}`); //FOR TESTING ONLY - REMOVE LATER
        console.log(`height: ${pokemon.height}`); //FOR TESTING ONLY - REMOVE LATER
        console.log(`image: ${pokemon.image}`); //FOR TESTING ONLY - REMOVE LATER
        console.log(`types: ${pokemon.types}`); //FOR TESTING ONLY - REMOVE LATER

        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        // let modalHeader = $(".modal-header"); - UNCOMMENT later to further customize modal header

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
        imageElementFront.attr("src", pokemon.imageUrl);

        //add all elements (modal content) to the modal
        modalTitle.append(nameElement);
        modalBody.append(heightElement);
        modalBody.append(typesElement);
        modalBody.append(imageElementFront);
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