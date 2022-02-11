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

let wowMessage = "Wow, that's big!";

pokemonList.forEach((pokemon) => {
    //write pokemon heights and names to the document and add wowMessage for tallest pokemon
    return (pokemon.height > 3) ? document.write(`<p>${pokemon.name} (height: ${pokemon.height}m) - ${wowMessage}</p>`) : document.write(`<p>${pokemon.name} (height: ${pokemon.height}m)</p>`);
});


