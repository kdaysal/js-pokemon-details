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

    //external function to add eventListener, passing in 'pokemon' object as the item ('advanced' task)
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

        //add an event listener to each button to log details of the pokemon object to the console
        addListener(button, pokemon);
    }

    //return the entire pokemonList
    function getAll() {
        return pokemonList;
    }

    //load detailed data for a given pokemon
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //load list of pokemon from apiUrl
    function loadList() {

        //recall the below fetch syntax is shorthand for method: GET
        return fetch(apiUrl).then(function (response) {
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
            console.error(e);
        })
    }

    //called when a user clicks on a pokemon button; gets pokemon details from the server
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

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

let wowMessage = "Wow, that's big!";

//generate list item (button) for each pokemon name. Note - we only call getAll() AFTER we've gotten all the info from the server via loadList()
pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
});