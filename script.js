let cardDiv = document.getElementById("card");
let pokeBall = document.getElementById("pokeball-container");
let button = document.getElementById("pokeball-click")

function getPokemonId(event) {
	event.preventDefault();
	let pokemonId = Math.floor(Math.random() * Math.floor(800));
	if (pokemonId) {
		getPokemonData(pokemonId);
	}
}

document
	.getElementById("pokeball-click")
	.addEventListener("click", getPokemonId);

const getPokemonData = async (pokemonId) => {
	let url = 'https://pokeapi.co/api/v2/pokemon/'
	const response = await fetch(url + pokemonId)
	const data = await response.json()
	const moveJson = await fetch(data.moves[0].move.url)
	const moveData = await moveJson.json()
	const image = await `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`
	await showCard(data, image)
	await showMoveData(moveData)
}


const showCard = async (data, image) => {
	let {name} = data
	pokeBall.style.animation = "spin .3s linear infinite";
	button.style.stroke = "#2dfdd4"
	cardDiv.innerHTML = null;

	let pokemonName = document.createElement("h2");
	pokemonName.textContent = `${name.toUpperCase()}`;

	let mediaContainer = document.createElement("div");
	mediaContainer.setAttribute("class", "mediaContainer");

	let pokemonImage = await document.createElement("img");
	pokemonImage.setAttribute(
		"src",
		image
	);
	pokemonImage.setAttribute("alt", name);

	cardDiv.appendChild(pokemonName);
	mediaContainer.appendChild(pokemonImage);
	cardDiv.appendChild(mediaContainer);

	let pokemonType = data.types[0].type.name;
	let pokemonTypeTitle = document.createElement("h3");
	pokemonTypeTitle.textContent = pokemonType;
	cardDiv.appendChild(pokemonTypeTitle);

	setBackgroundColour(mediaContainer, pokemonType);
	setTextColour([pokemonTypeTitle], pokemonType);

	waitForImageToLoad(pokemonImage).then(() => {
		cardDiv.style.visibility = "visible";
		pokeBall.style.animation = "wobble 2s infinite both";
		button.style.stroke = "#424242"
		pokeBall.style.display = "none";
		
	})	
}

function waitForImageToLoad(imageElement){
	return new Promise(resolve=>{imageElement.onload = resolve})
}

function showMoveData(data) {
	let pokemonMoves = data.name;
	let cardBodyText = document.createElement("div");
	let moveData = data.flavor_text_entries[2].flavor_text;
	cardBodyText.innerHTML = `<p>${pokemonMoves.toUpperCase()}</p><br><p id="inner">${moveData}</p>`;
	cardDiv.appendChild(cardBodyText);
}

function setBackgroundColour(element, data) {
	element.style.background = `linear-gradient(0deg, white 10%, ${pokemonTypeColours[data]})`;
}

function setTextColour(element, data) {
	element.forEach((item) => {
		item.style.color = pokemonTypeColours[data];
	});
}

function reset() {
	cardDiv.style.visibility = "hidden";
	pokeBall.style.display = "block";
}

cardDiv.addEventListener("click", reset);


