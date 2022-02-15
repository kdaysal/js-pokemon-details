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

    return {
        getAll: getAll,
        add: add
    }
})(); //end of IIFE

let wowMessage = "Wow, that's big!";

//pokemonRepository.getAll() returns the full pokemonList array - then use forEach() to iterate through each pokemon object
pokemonRepository.getAll().forEach((pokemon) => {
let pokemonList = document.querySelector('.pokemon-list');
    
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.classList.add('pokemon-button-item');
    button.innerText = pokemon.name;
    listItem.classList.add('pokemon-button-class');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
});

//code below this line is just for testing - DELETE LATER
/*
pokemonRepository.add({ name: 'Kevin', height: 1.4 });
pokemonRepository.add({ name: 'Another Kevin', height: 7 });
pokemonRepository.add({ namezzz: 'DONT ADD', height: 'DONT ADD' });
pokemonRepository.add({ name: 'DONT ADD', heightzzz: 'DONT ADD' });
console.log(pokemonRepository.getAll());
*/