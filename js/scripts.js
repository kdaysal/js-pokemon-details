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
];

//Print list of Pokemon names and heights to the DOM
let wowMessage = "Wow, that's big!";
for (let i = 0; i < pokemonList.length; i++) {

    if (pokemonList[i].height > 3) {
        document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height}m) - ${wowMessage}`)
    }

    else {
        document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height}m)`)
    }
}


