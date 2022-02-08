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

for (let i = 0; i < pokemonList.length; i++) {
    document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height}m)`)
}


