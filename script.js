const pokemonTypeColours = {
    ground: '#e7d39f',
    electric: '#fdd998',
    bug: '#cee397',
    dark: '#222831',
    dragon: '#8ac6d1',
    fairy: '#ffb6b9',
    fighting: '#ffc38b',
    fire: '#ff6363',
    flying: '#a4c5c6',
    ghost: '#827397',
    grass: '#b7efcd',
    ice: '#dae1e7',
    normal: '#eae7d9',
    poison: '#8566aa',
    psychic: '#efa8e4',
    rock: '#d2c6b2',
    steel: '#5f6769',
    water: '#9aceff'
}

// THIS WORKS :)
// function getCharacter(event) {
    
// 	event.preventDefault()
// 	let numberInput = document.getElementById("number-input");
//     var pokemonId = numberInput.value.trim();
// 	if (pokemonId) {
// 		getCharacters(pokemonId)
// 	}
// }
// document.getElementById("submit-number").addEventListener("click", getCharacter)

// CHANGE 1 TO  pokemonId and input in args too
function getCharacters() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${620}/`)
    .then((response) => response.json())
	.then((data) => showCard(data))
	.catch((error) => console.log(error))
}


function showCard(data) {
	let cardDiv = document.getElementById("characters");
	cardDiv.innerHTML = null;

    var pokemonName = document.createElement("h2");
    pokemonName.textContent = data.name;
    
    let mediaContainer = document.createElement('div');
    mediaContainer.setAttribute('class', 'mediaContainer');

    let pokemonImage = document.createElement("img");
    pokemonImage.setAttribute("src", `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`);
    pokemonImage.setAttribute("alt", data.name);

    cardDiv.appendChild(pokemonName);
    mediaContainer.appendChild(pokemonImage);
    cardDiv.appendChild(mediaContainer);
    
    let pokemonType = data.types[0].type.name;
    let pokemonTypeTitle = document.createElement('h3');
    pokemonTypeTitle.textContent = pokemonType;
    cardDiv.appendChild(pokemonTypeTitle);

    setBackgroundColour(mediaContainer, pokemonType);
    setTextColour([pokemonName, pokemonTypeTitle], pokemonType);

};

function setBackgroundColour(element, data){
    // element.style.background = pokemonTypeColours[data];
    element.style.background = `linear-gradient(0deg, white 10%, ${pokemonTypeColours[data]})`;
}

function setTextColour(element, data){
    element.forEach((item) => {
        item.style.color = pokemonTypeColours[data];
    })
        
    // args.style.color = pokemonTypeColours[data];
}

// // to show single character info
// function handleCharacterClick(character){
// 	console.log("character from handleCharacterClick:", character)
// 	let cardDiv = document.getElementById("characters")
// 	cardDiv.innerHTML = null
// 	let charDiv = document.createElement("div")
// 	let pokemonName = document.createElement("h2")
// 	pokemonName.textContent = character.name
// 	// add character image
// 	let pokemonImage = document.createElement("img")
// 	pokemonImage.setAttribute("src",character.image)
// 	pokemonImage.setAttribute("alt",character.name)
// 	// append to the DOM
// 	charDiv.appendChild(pokemonName)
// 	charDiv.appendChild(pokemonImage)
// 	let charInfoDiv = document.createElement("div")
// 	charInfoDiv.innerHTML = `<p>Status: ${character.status}</p>`
// 	charInfoDiv.innerHTML += `<p>Species: ${character.species}</p>`
// 	charInfoDiv.innerHTML +=`<p>Location: ${character.location.name}</p>`
// 	charDiv.appendChild(charInfoDiv)
// 	cardDiv.appendChild(charDiv)
// }

// bcos the input type is a submit type, the default behaviour on click is to reload the page. to combat this, the event must be parsed to the function and prevent default specified


getCharacters();