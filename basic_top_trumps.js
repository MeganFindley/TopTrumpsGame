// Top Trumps Project
fishNames = ["Anchovy", "Barracuda", "Blobfish", "Cod", "Catfish", "Dory", "Eel", "Flatfish", "Goldfish", "Guppy", "Herring", "Haddock", "Icefish", "Jellyfish", "Koi", "Lionfish", "Mackerel", "Noodlefish", "Oilfish", "Plaice", "Quillfish", "Rockfish", "Salmon", "Seahorse", "Tuna", "Unicorn-fish", "Viperfish", "Wormfish", "Yellowtail-Clownfish", "Zebrafish"];
mammalNames = ["Aardvark", "Baboon", "Cheetah", "Dolphin", "Elephant", "Fox", "Giraffe", "Horse", "Impala", "Jaguar", "Koala", "Lion", "Moose", "Narwhal", "Orangutan", "Otter", "Platypus", "Quokka", "Raccoon", "Sloth", "Tapir", "Uakari", "Vampire-Bat", "Walrus", "Yak", "Zebra", "Human", "Skunk", "Mouse", "Llama"]
// Card object class
class Animal {
    constructor(animalName) {
        this.name = animalName;
        this.power = Math.floor(Math.random() * 50 + 1);
        this.size = Math.floor(Math.random() * 50 + 1);
        this.colour = Math.floor(Math.random() * 50 + 1);
    }
};
// Building the decks:
let fishDeck = [];
let mammalDeck = [];
for (let i = 0; i < 30; i++) {
    let fish = new Animal(fishNames[i]);
    fishDeck.push(fish);
    let mammal = new Animal(mammalNames[i]);
    mammalDeck.push(mammal);
};

// Shuffle Function:
function shuffle(deck) {
    for (let i = 0; i < 30; i++) {
        let randNum = Math.floor(Math.random() * 29);
        let card = deck[i];
        deck[i] = deck[randNum];
        deck[randNum] = card;
    }
};
// Deal function:
let player = [];
let computer = [];
function deal(deck) {
    for (let i = 0; i < 30; i++) {
        if (i % 2 == 0) {
            player.push(deck[i]);
        } else {
            computer.push(deck[i]);
        }
    }
};

// take played cards:
function takeCards(winner, loser) {
    let card1 = winner[0];
    let card2 = loser[0];
    winner.shift();
    loser.shift();
    winner.push(card1, card2);
};
// add to limbo deck:
function addLimbo(person) {
    if (limboDeck.length > 0) {
        for (let i = 0; i < limboDeck.length; i++) {
            person.push(limboDeck[i]);
        }
        limboDeck = []
    }
}

// choose from choice of 2 decks:
let readlineSync = require("readline-sync");
let deckName = readlineSync.question("TOP TRUMPS, Choose your Deck: Fish or Mammal => ");
let deck = [];
if (deckName.toLowerCase() == 'fish') {
    deck = fishDeck;
} else if (deckName.toLowerCase() == 'mammal') {
    deck = mammalDeck;
}
shuffle(deck);
deal(deck);
console.log('Cards have been shuffled and dealt');
let i = 1;
let limboDeck = [];
let playstat = '';
let compstat = '';
// game play:
while (player.length != 0 && computer.length != 0) {
    console.log(`Round ${i}`);
    i++;
    // show your card
    console.log(`Your card is: ${player[0].name}, power = ${player[0].power}, size = ${player[0].size}, colour = ${player[0].colour}`);
    // choose stat to play 
    let statName = readlineSync.question("Choose your stat: power or size => ");
    if (statName.toLowerCase() == 'power') {
        playstat = player[0].power;
        compstat = computer[0].power;
    } else if (statName.toLowerCase() == 'size') {
        playstat = player[0].size;
        compstat = computer[0].size;
    } else if (statName.toLowerCase() == 'colour'){
        playstat = player[0].colour;
        compstat = computer[0].colour
    }
    // show computers card
    console.log(`Computers card is: ${computer[0].name}, power = ${computer[0].power}, size = ${computer[0].size}, colour = ${computer[0].colour}`);

    if (playstat > compstat) {
        // player wins
        console.log(`You win this round!`);
        addLimbo(player);
        takeCards(player, computer);
        console.log(`Cards left: You = ${player.length}, Computer = ${computer.length}`);
    }
    else if (playstat == compstat) {
        // draw
        console.log(`It's a draw cards in Limbo`);
        limboDeck.push(player[0], computer[0]);
        player.shift();
        computer.shift();
        console.log(`Cards left: You = ${player.length}, Computer = ${computer.length}`);
    }
    else if (playstat < compstat) {
        // computer wins
        console.log(`Computer wins this round`);
        addLimbo(computer);
        takeCards(computer, player);
        console.log(`Cards left: You = ${player.length}, Computer = ${computer.length}`);
    }
    console.log('');
}

if(player.length == 0){
    console.log('Computer Wins!')
}else{
    console.log('You Win!')
}
