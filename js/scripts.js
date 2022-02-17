let pokemonRepository = (function () {
    let pokemonList = [{
        name: 'Bulbasaur',
        height: 0.7,
        types: [
            'grass', 'poison'
        ]
    },
    {
        name: 'Sandslash',
        height: 1,
        types: ['ground']
    },
    {
        name: 'Squirtle',
        height: 0.5,
        types: ['water']
    },
    {
        name: 'Arbok',
        height: 3.5,
        types: ['poison']
    },
    {
        name: 'Kakuna',
        height: 0.6,
        types: [
            'bug', 'poison'
        ]
    },
    {
        name: 'Sharpedo',
        height: 1.8,
        types: [
            'dark', 'water'
        ]
    }
    ];//end of array

    //return the entire pokemonList
    function getAll() {
        return pokemonList;
    }

    //add new item to pokemonList
    function add(item) {
        if ((typeof (item) === 'object') && ((Object.keys(item)[0]) === 'name') && ((Object.keys(item)[1]) === 'height')) {
            pokemonList.push(item);
        }

        else {
            console.log('invalid data type');
        }
    }

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
<<<<<<< HEAD
        addListener(button, pokemon);
    }

    //external function to add eventListener, passing in 'pokemon' object as the item
    function addListener(button, item) {
        button.addEventListener("click", () => {
            showDetails(item);
=======
        button.addEventListener("click", () => {
            showDetails(pokemon);
>>>>>>> 1f434354aa35dd11d1dcafa07fff1f72128286df
        });
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }
})(); //end of IIFE

let wowMessage = "Wow, that's big!";

//generate list item (button) for each pokemon name
pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
});