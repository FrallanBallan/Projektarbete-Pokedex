//FRALLANBALLAN
// "https://pokeapi.co/api/v2/pokemon?limit=151";

//API
let API_KEY1 = "https://pokeapi.co/api/v2/pokemon?limit=151";
let API_KEY2 = "https://pokeapi.co/api/v2/pokemon/1/";
let API_KEY3 = "https://pokeapi.co/api/v2/pokemon/";

//Globals
//Button
let startBtn = document.querySelector("#start");
let startBtn2 = document.querySelector("#start2");
//Select
let pokeSelect = document.querySelector("#pokeSelect");
pokeSelect.style.textTransform = "capitalize";
let pokeSelect2 = document.querySelector("#pokeSelect2");
pokeSelect2.style.textTransform = "capitalize";
//Containers
let pokeContainer = document.querySelector("#poke-container");
let pokeCardOne = document.querySelector("#pokecard-one");
let pokeCardTwo = document.querySelector("#pokecard-two");
//Arrays
let pokemonArray = [];
let cardArray = [];

//Pokemon Class
class Pokemon {
  constructor(name, type, weight, height, stats) {
    this.name = name;
    this.type = type;
    this.weight = weight;
    this.height = height;
    this.stats = stats;
  }
}

//GETDATA - Calling api and getting info
let getData = async (url) => {
  let response = await axios.get(url);
  return response.data;
};
// Creating options for the dropdown. Creating a new array from getData and then using it to create the options.
let createDropdown = async (pokeSelect) => {
  let pokemonDataArray = await getData(API_KEY1);
  pokemonArray = pokemonDataArray.results;
  pokemonArray.forEach((pokemon) => {
    let option = document.createElement("option");
    option.value = pokemon.url;
    option.textContent = pokemon.name;
    pokeSelect.append(option);
  });
};
createDropdown(pokeSelect);
createDropdown(pokeSelect2);

//Start making things happen

startBtn.addEventListener("click", () => {
  let selectedPokemon = pokeSelect.value;
  if (cardArray.length < 2) {
    createPokemon(selectedPokemon, pokeCardOne);
  } else {
    cardArray.shift();
    createPokemon(selectedPokemon, pokeCardOne);
  }
});
startBtn2.addEventListener("click", () => {
  let selectedPokemon = pokeSelect2.value;
  if (cardArray.length < 2) {
    createPokemon(selectedPokemon, pokeCardTwo);
  } else {
    cardArray.shift();
    createPokemon(selectedPokemon, pokeCardTwo);
  }
});

//Create Pokemon! Getting information from the api and passing it to the create pokeCard function
let createPokemon = async (pokemonUrl, targetContainer) => {
  let response = await axios.get(pokemonUrl);
  let pokemonDetails = response.data;
  console.log(pokemonDetails.name);
  createPokeCard(pokemonDetails, targetContainer); //Sending all the pokemonDetails to CreatePokeCard and pushing to DOM
};

//Create Pokemon Card! Creating a class and appending to DOM
//PokeCardOne and Two should be as one. to decrease code.
let createPokeCard = (pokemonDetails, targetContainer) => {
  targetContainer.innerHTML = "";
  console.log(pokemonDetails);
  let newPokemon = new Pokemon(
    pokemonDetails.name,
    pokemonDetails.types[0].type.name,
    pokemonDetails.weight,
    pokemonDetails.height,
    pokemonDetails.stats
  );
  console.log(newPokemon);
  //CONTAINER APPEND NAME AND IMAGE AND TYPE
  let pokeName = document.createElement("h2");
  pokeName.innerText = pokemonDetails.name;
  let pokeImg = document.createElement("img");
  pokeImg.src = pokemonDetails.sprites.front_default;
  let pokeType = pokemonDetails.types[0].type.name;
  let typeIcon = document.createElement("span");
  typeIcon.classList.add("elementIcon");
  if (pokeType.toLowerCase() === "grass") {
    targetContainer.style.background = "green";
    typeIcon.innerText = "🍃";
  } else if (pokeType.toLowerCase() === "fire") {
    targetContainer.style.background = "crimson";
    typeIcon.innerText = "🔥";
  } else if (pokeType.toLowerCase() === "electric") {
    targetContainer.style.background = "yellow";
    typeIcon.innerText = "⚡";
  } else if (pokeType.toLowerCase() === "water") {
    targetContainer.style.background = "dodgerblue";
    typeIcon.innerText = "💧";
  } else if (
    pokeType.toLowerCase() === "rock" ||
    pokeType.toLowerCase() === "ground"
  ) {
    targetContainer.style.background = "lightgray";
    typeIcon.innerText = "🗿";
  } else if (pokeType.toLowerCase() === "normal") {
    targetContainer.style.background = "peachpuff";
    typeIcon.innerText = "🧸";
  } else if (pokeType.toLowerCase() === "ghost") {
    targetContainer.style.background = "darkgray";
    typeIcon.innerText = "🧛‍♂️";
  } else if (pokeType.toLowerCase() === "bug") {
    targetContainer.style.background = "darkgreen";
    typeIcon.innerText = "🐝";
  } else if (pokeType.toLowerCase() === "fighting") {
    targetContainer.style.background = "darkorange";
    typeIcon.innerText = "💪";
  } else if (pokeType.toLowerCase() === "poison") {
    targetContainer.style.background = "darksalmon";
    typeIcon.innerText = "🥫";
  } else if (pokeType.toLowerCase() === "dragon") {
    targetContainer.style.background = "pink";
    typeIcon.innerText = "🐲";
  } else {
    targetContainer.style.background = "purple";
    targetContainer.innerText = "🌠";
  }
  targetContainer.appendChild(typeIcon);

  // Container for small info above stats
  let weightHeightDiv = document.createElement("div");
  weightHeightDiv.classList.add("weightHeight");

  // paragraphs
  //   let pokeTypeDesc = document.createElement("p")
  //   pokeTypeDesc.innerText =
  let pokeWeight = document.createElement("p");
  pokeWeight.innerText = "Weight: " + pokemonDetails.weight + "lbs.";
  let pokeHeight = document.createElement("p");
  pokeHeight.innerText = "Height: " + pokemonDetails.height + "feet.";
  weightHeightDiv.append(pokeWeight, pokeType, pokeHeight);

  // CONTAINER FOR STATS (PROGRESS BAR AND LABEL)
  let statsContainer = document.createElement("div");
  statsContainer.classList.add("statsContainer");
  //PROGRESS BARS AND LABELS
  let hpLabel = (document.createElement("label").innerText =
    "HP: " + pokemonDetails.stats[0].base_stat);
  let hpProgress = document.createElement("progress");
  hpProgress.setAttribute("value", pokemonDetails.stats[0].base_stat);
  hpProgress.setAttribute("max", 200);

  let attackLabel = (document.createElement("label").innerText =
    "Attack: " + pokemonDetails.stats[1].base_stat);
  let attackProgress = document.createElement("progress");
  attackProgress.setAttribute("value", pokemonDetails.stats[1].base_stat);
  attackProgress.setAttribute("max", 200);

  let defenseLabel = (document.createElement("label").innerText =
    "Defense: " + pokemonDetails.stats[2].base_stat);
  let defenseProgress = document.createElement("progress");
  defenseProgress.setAttribute("value", pokemonDetails.stats[2].base_stat);
  defenseProgress.setAttribute("max", 200);

  let sAttackLabel = (document.createElement("label").innerText =
    "Speical Attack: " + pokemonDetails.stats[3].base_stat);
  let sAttackProgress = document.createElement("progress");
  sAttackProgress.setAttribute("value", pokemonDetails.stats[3].base_stat);
  sAttackProgress.setAttribute("max", 200);

  let sDefenseLabel = (document.createElement("label").innerText =
    "Special Defense: " + pokemonDetails.stats[4].base_stat);
  let sDefenseProgress = document.createElement("progress");
  sDefenseProgress.setAttribute("value", pokemonDetails.stats[4].base_stat);
  sDefenseProgress.setAttribute("max", 200);

  let speedLabel = (document.createElement("label").innerText =
    "Speed: " + pokemonDetails.stats[5].base_stat);
  let speedProgress = document.createElement("progress");
  speedProgress.setAttribute("value", pokemonDetails.stats[5].base_stat);
  speedProgress.setAttribute("max", 200);

  statsContainer.append(
    hpLabel,
    hpProgress,
    attackLabel,
    attackProgress,
    defenseLabel,
    defenseProgress,
    sAttackLabel,
    sAttackProgress,
    sDefenseLabel,
    sDefenseProgress,
    speedLabel,
    speedProgress
  );
  targetContainer.append(pokeName, pokeImg, weightHeightDiv, statsContainer);
  cardArray.push(newPokemon);
  console.log(cardArray);
};
