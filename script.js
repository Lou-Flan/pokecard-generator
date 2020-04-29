const pokemonTypeColours = {
	ground: "#e7d39f",
	electric: "#fdd998",
	bug: "#cee397",
	dark: "#222831",
	dragon: "#8ac6d1",
	fairy: "#ffb6b9",
	fighting: "#ffc38b",
	fire: "#ff6363",
	flying: "#a4c5c6",
	ghost: "#827397",
	grass: "#b7efcd",
	ice: "#dae1e7",
	normal: "#eae7d9",
	poison: "#8566aa",
	psychic: "#efa8e4",
	rock: "#d2c6b2",
	steel: "#5f6769",
	water: "#9aceff"
};
var cardDiv = document.getElementById("characters");
var pokeBall = document.getElementById("pokeball-container");

function randomIdNumber() {
	return Math.floor(Math.random() * Math.floor(307));
}

function getCharacter(event) {
	event.preventDefault();
	let numberInput = document.getElementById("number-input");

	var pokemonId = randomIdNumber();
	if (pokemonId) {
		getCharacters(pokemonId);
	}
}

document
	.getElementById("submit-number")
	.addEventListener("click", getCharacter);

function getCharacters(pokemonId) {
	fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
		.then((response) => response.json())
		.then((data) => showCard(data))
		.catch((error) => console.log(error));
}

function getMoveData(url) {
	fetch(url)
		.then((response) => response.json())
		.then((data) => showMoveData(data))
		.catch((error) => console.log(error));
}

function showCard(data) {
	pokeBall.style.display = "none";
	cardDiv.innerHTML = null;

	var pokemonName = document.createElement("h2");
	pokemonName.textContent = `${data.name.toUpperCase()}`;

	let mediaContainer = document.createElement("div");
	mediaContainer.setAttribute("class", "mediaContainer");

	let pokemonImage = document.createElement("img");
	pokemonImage.setAttribute(
		"src",
		`https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`
	);
	pokemonImage.setAttribute("alt", data.name);

	cardDiv.appendChild(pokemonName);
	mediaContainer.appendChild(pokemonImage);
	cardDiv.appendChild(mediaContainer);

	let pokemonType = data.types[0].type.name;
	let pokemonTypeTitle = document.createElement("h3");
	pokemonTypeTitle.textContent = pokemonType;
	cardDiv.appendChild(pokemonTypeTitle);
	getMoveData(data.moves[0].move.url);

	setBackgroundColour(mediaContainer, pokemonType);
	setTextColour([pokemonTypeTitle], pokemonType);
	cardDiv.style.visibility = "visible";
}

function showMoveData(data) {
	var pokemonMoves = data.name;
	var cardBodyText = document.createElement("div");
	var moveData = data.flavor_text_entries[2].flavor_text;
	cardBodyText.innerHTML = `<p>${pokemonMoves.toUpperCase()}</p><br><p id="inner">${moveData}</p>`;
	cardDiv.appendChild(cardBodyText);
}

function reset() {
	cardDiv.style.visibility = "hidden";
	pokeBall.style.display = "block";
}

cardDiv.addEventListener("click", reset);

function setBackgroundColour(element, data) {
	element.style.background = `linear-gradient(0deg, white 10%, ${pokemonTypeColours[data]})`;
}

function setTextColour(element, data) {
	element.forEach((item) => {
		item.style.color = pokemonTypeColours[data];
	});
}
