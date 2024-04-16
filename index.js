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
let compareButton = document.querySelector("#compareBtn");
let battleButton = document.querySelector("#battleBtn");

//Select
let pokeSelect = document.querySelector("#pokeSelect");
pokeSelect.style.textTransform = "capitalize";
let pokeSelect2 = document.querySelector("#pokeSelect2");
pokeSelect2.style.textTransform = "capitalize";
//Containers
let pokeWrap = document.querySelector("#pokeWrap");
let pokeContainer = document.querySelector("#poke-container");
let pokeCardOne = document.querySelector("#pokecard-one");
let pokeCardTwo = document.querySelector("#pokecard-two");
let interactContainer = document.querySelector("#interact");
let compareResults = document.querySelector("#compareResults");
compareResults.style.display = "none";
let buttonContainer = document.querySelector("#buttonContainer");
buttonContainer.style.display = "none";

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
  compare(otherPokemon) {
    let comparison = [];
    if (this.weight > otherPokemon.weight) {
      //COMPARE WEIGHT
      comparison.push(`${this.name} is heavier than ${otherPokemon.name}`);
    } else {
      comparison.push(`${otherPokemon.name} is heavier than ${this.name}`);
    } //COMPARE HEIGHT
    if (this.height > otherPokemon.height) {
      comparison.push(`${this.name} is taller than ${otherPokemon.name}`);
    } else {
      comparison.push(`${otherPokemon.name} is taller than ${this.name}`);
    } //COMPARE HEALTH
    if (this.stats[0].base_stat > otherPokemon.stats[0].base_stat) {
      comparison.push(
        `${this.name} got greater health than ${otherPokemon.name}`
      );
    } else if (this.stats[0].base_stat === otherPokemon.stats[0].base_stat) {
      comparison.push(`${this.name} health is equal ${otherPokemon.name}`);
    } else {
      comparison.push(
        `${otherPokemon.name} got greater health than ${this.name}`
      );
    } //COMPARE ATTACK
    if (this.stats[1].base_stat > otherPokemon.stats[1].base_stat) {
      comparison.push(
        `${this.name} has greater attack damage than ${otherPokemon.name}`
      );
    } else {
      comparison.push(
        `${otherPokemon.name} has greater attack damage than ${this.name}`
      );
    } //COMPARE DEFENSE
    if (this.stats[2].base_stat > otherPokemon.stats[2].base_stat) {
      comparison.push(
        `${this.name} has greater defense than ${otherPokemon.name}`
      );
    } else {
      comparison.push(
        `${otherPokemon.name} has greater defense than ${this.name}`
      );
    } //COMPARE SPEED
    if (this.stats[5].base_stat > otherPokemon.stats[5].base_stat) {
      comparison.push(`${this.name} is faster than ${otherPokemon.name}`);
    } else {
      comparison.push(`${otherPokemon.name} is faster than ${this.name}`);
    }
    return comparison;
  }
  attack(defender) {
    let attack = this.stats[1].base_stat + this.stats[3].base_stat;
    let defense = defender.stats[2].base_stat + defender.stats[4].base_stat;
    let damage = Math.floor((attack - defense) * 0.8);
    if (damage < 10) {
      defender.hp -= 10;
      return 10;
    } else {
      defender.hp -= damage;
      return damage;
    }
  }
  battle(opponent) {
    let damageDealt = this.attack(opponent);
    let battleLog = `${this.name} attacks ${opponent.name} and deals ${damageDealt} damage.`;
    console.log(battleLog);
    this.removeHp(damageDealt, opponent);
    return battleLog;
  }
  //add remove health
  removeHp(damageDealt, opponent) {
    let defender = document.querySelector(`#${opponent.name}`);
    defender.value -= damageDealt;
    if (defender.value <= 0) {
      setTimeout(() => {
        compareResults.innerHTML = "";
        let firstLine = document.createElement("h3");
        firstLine.innerText = opponent.name + " is slain";
        //Lägg till quote?
        let secondLine = document.createElement("p");
        secondLine.innerText =
          "All these moments will be lost in time, like tears, in rain, time to die";
        compareResults.append(firstLine, secondLine);
      }, 2000);
    }
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
//Buttons
startBtn.addEventListener("click", () => {
  compareResults.style.display = "none";
  compareResults.innerHTML = "";
  let selectedPokemon = pokeSelect.value;
  createPokemon(selectedPokemon, pokeCardOne);
});

startBtn2.addEventListener("click", () => {
  compareResults.style.display = "none";
  compareResults.innerHTML = "";
  let selectedPokemon = pokeSelect2.value;
  createPokemon(selectedPokemon, pokeCardTwo);
});

//Create Pokemon! Getting information from the api and passing it to the create pokeCard function
let createPokemon = async (pokemonUrl, targetContainer) => {
  let response = await axios.get(pokemonUrl);
  let pokemonDetails = response.data;
  console.log(pokemonDetails.name);
  console.log(pokemonDetails);
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

  let pokeWeight = document.createElement("p");
  pokeWeight.innerText = "Weight: " + pokemonDetails.weight + " lbs.";
  let pokeHeight = document.createElement("p");
  pokeHeight.innerText = "Height: " + pokemonDetails.height + " feet.";
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
  if (targetContainer === pokeCardOne) {
    cardArray.splice(0, 1, newPokemon); // börjar på 0, hur många steg tar vi bort och vad lägger vi till
  } else {
    cardArray.splice(1, 1, newPokemon);
  }
  console.log(cardArray);
  //Bryt ut. Give each card an index and compare function each other
  if (cardArray.length === 2) {
    buttonContainer.style.display = "flex";
  }
};

//COMPARE POKEMONS
compareButton.addEventListener("click", () => {
  compareResults.style.display = "block";
  compareResults.innerHTML = "";

  interactContainer.append(compareResults);
  if (cardArray.length >= 2) {
    let firstPokemon = cardArray[0];
    let secondPokemon = cardArray[1];
    let comparisonArray = firstPokemon.compare(secondPokemon);
    comparisonArray.forEach((string) => {
      console.log(string);
      let p = document.createElement("p");
      p.innerText = string;
      compareResults.append(p);
    });
  }
});
//BATTLE POKEMONS
battleButton.addEventListener("click", () => {
  compareResults.style.display = "block";
  compareResults.innerHTML = "";
  let firstPokemon = cardArray[0];
  let secondPokemon = cardArray[1];
  let battleDiv = document.createElement("div");
  battleDiv.classList.add("battleDiv");
  let battleLogContainer = document.createElement("div");
  battleLogContainer.id = "battleLogContainer";
  battleLogContainer.style.display = "none";
  compareResults.append(battleDiv, battleLogContainer);

  createBattleField(firstPokemon, secondPokemon, battleDiv);
});

//Creating the battle ground
let createBattleField = (firstPokemon, secondPokemon, battleDiv) => {
  let battleLogContainer = document.querySelector("#battleLogContainer");

  let leftField = document.createElement("div");
  leftField.classList.add("fighter");
  let rightField = document.createElement("div");
  rightField.classList.add("fighter");
  let leftName = document.createElement("h3");
  let rightName = document.createElement("h3");
  let leftHP = document.createElement("progress");
  let rightHP = document.createElement("progress");
  let leftAttack = document.createElement("button");
  let rightAttack = document.createElement("button");
  if (firstPokemon.stats[5].base_stat > secondPokemon.stats[5].base_stat) {
    rightAttack.classList.add("disableBtn");
  } else {
    leftAttack.classList.add("disableBtn");
  }
  leftName.innerText = firstPokemon.name;
  rightName.innerText = secondPokemon.name;
  leftHP.setAttribute("value", firstPokemon.stats[0].base_stat);
  leftHP.setAttribute("max", firstPokemon.stats[0].base_stat);
  leftHP.id = firstPokemon.name;
  rightHP.setAttribute("value", secondPokemon.stats[0].base_stat);
  rightHP.setAttribute("max", secondPokemon.stats[0].base_stat);
  rightHP.id = secondPokemon.name;
  leftAttack.innerText = "Attack";
  rightAttack.innerText = "Attack";
  leftField.append(leftName, leftHP, leftAttack);
  rightField.append(rightName, rightHP, rightAttack);
  battleDiv.append(leftField, rightField);

  battleFunction(
    leftAttack,
    rightAttack,
    firstPokemon,
    secondPokemon,
    battleLogContainer,
    leftHP,
    rightHP
  );
};

//Function for battle and attacks
let battleFunction = (
  leftAttack,
  rightAttack,
  firstPokemon,
  secondPokemon,
  battleLogContainer
) => {
  leftAttack.addEventListener("click", () => {
    battleLogContainer.style.display = "block";
    battleLogContainer.innerHTML = "";
    leftAttack.classList.toggle("disableBtn");
    rightAttack.classList.toggle("disableBtn");
    let battleLog = firstPokemon.battle(secondPokemon); // battle innehåller tre metoder
    //battle(opponent) + this.attack(opponent) + removeHp(damageDealt, opponent)
    battleLogContainer.innerText = battleLog; //battle innehåller battleLog
  });
  rightAttack.addEventListener("click", () => {
    battleLogContainer.style.display = "block";
    battleLogContainer.innerHTML = "";
    rightAttack.classList.toggle("disableBtn");
    leftAttack.classList.toggle("disableBtn");
    let battleLog = secondPokemon.battle(firstPokemon); //battle innehåller battleLog
    battleLogContainer.innerText = battleLog;
  });
};
