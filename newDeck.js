let globalStore = {
  deck: [],
  drawDeck: []
}

function Deck(cards) {
  let deck = [];
  // ...
  if(Array.isArray(cards)){
    cards.forEach(card => deck.push(card))
  } else {
    
    // let drawDeck = [];
  //   if(cards) {
  //     let temp = cards.toString().split(',');
  //     temp.forEach(card => deck.push(card))
  //   }
    for(let i = 0; i < arguments.length; i++){
      deck.push(arguments[i]);
    }
  }
  console.log("Deck: " + deck + "\n")

  globalStore.deck = deck;
  // this.deck = deck;
  // this.drawDeck = drawDeck;
}

Deck.prototype = {
  shuffle: function() {
    // Deck.call(this, deck);
    let newDeck = [];
    // const length = this.deck.length;
    const length = globalStore.deck.length;

    for(let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * globalStore.deck.length);
      let temp = globalStore.deck.splice(random, 1);
      newDeck.push(temp);
    }

    // Deck(newDeck.join(","));
    globalStore.deck = newDeck;

    console.log("New Deck: " +  globalStore.deck + "\n" )
    return new Deck(globalStore.deck);
    
  },

  /*
  draw
  @params
    number- number of cards to be drawn
    from- 1 equals top of deck and down, -1 equals bottom of deck and up
  */

  draw: function(number, from) {
    // Deck.call(this, deck)
    globalStore.drawDeck = [];
    if(globalStore.deck.length === 0) {
      return [];
    }
    let drawDeck = globalStore.drawDeck;
    if(number > globalStore.deck.length) {
      number = globalStore.deck.length;
      console.log("Ran out of cards in the deck.");
    }
    if(number === undefined) {
      //draw from top deck
      drawDeck.push(globalStore.deck.shift());
      // Deck(this.deck.join(","));
      console.log("Draw: " + number + "\n...Deck: " + globalStore.deck + "\n...Draw Deck: " + drawDeck + "\n");
    } else if(!parseInt(number) || number <= 0) {
      throw 'Number must be a number greater than 0';
    } else {
      if(from === 1) {
        for(let i = 0; i < number; i++) {
          drawDeck.push(globalStore.deck.shift());
        }
        // Deck(this.deck.join(","));
        console.log("Draw: " + number + " From: " + from + "\n...Deck: " + globalStore.deck + "\n...Draw Deck: " + drawDeck + "\n");
      } else if(from === -1) {
        for(let i = 0; i < number; i++) {
          drawDeck.push(globalStore.deck.pop());
        }
        // Deck(this.deck.join(","));
        console.log("Draw: " + number  + " From: " + from + "\n...Deck: "  + globalStore.deck + "\n...Draw Deck: " + drawDeck + "\n");
      } else if((from !== 1 || from !== -1) && from !== undefined) {
        throw "Second argument to draw must be eith 1 or -1. You wrote: " + from;
      } else {
        for(let i = 0; i < number; i++) {
          drawDeck.push(globalStore.deck.shift());
        }
        // Deck(this.deck.join(","));
        console.log("Draw: " + number + "\n...Deck: " + globalStore.deck + "\n...Draw Deck: " + drawDeck);
      }
    }
    globalStore.drawDeck = drawDeck;
    return new Deck(globalStore.deck);
  },
  put: function(cards, where) {
    if(!Array.isArray(cards)) {
      throw "First argument must be an array of cards.";
      new Deck(globalStore.deck)
    }
    if (!arguments[1]) {
      cards.forEach(card => globalStore.deck.unshift(card));
    }
    switch(where.toLowerCase()) {
      case "top":
        cards.forEach(card => globalStore.deck.unshift(card));
        break;
      case "middle":
        cards.forEach(card => {
          let random = 0;
          do {
            random = Math.floor(Math.random() * globalStore.deck.length);
          } while (random === 0 || (random === globalStore.deck.length - 1));

          globalStore.deck.splice(random, 0, card);
        });
        break;
      case "bottom":
        cards.forEach(card => globalStore.deck.push(card));
        break;
      default:
//      throw "2nd argument must be 'top', 'middle', or 'bottom'.";
        cards.forEach(card => globalStore.deck.unshift(card));
        break;
    }
    console.log("Deck after new cards is: " + globalStore.deck + "\n");
    return new Deck(globalStore.deck);
  },
  count: function() {
    console.log("Count is running!")
    if(globalStore.deck.length === 1) {
      console.log("The deck has " + globalStore.deck.length + " card.\n")
    }
    if(globalStore.deck.length === 0) {
      console.log("The deck has no cards, therefore there is no deck!\n")
    }
    console.log("The deck has " + globalStore.deck.length + " cards.\n")
    return globalStore.deck.length;
  }
  
};



// Deck("Aspades,1diamonds,2hearts,3hearts,4diamonds,5clubs,6spades,7clubs,8spades,9hearts");
// Deck.prototype.shuffle();
// Deck.prototype.draw();
// Deck.prototype.shuffle();
// Deck.prototype.draw(2);
// Deck.prototype.draw(2, -1);
// Deck.prototype.put(['KingSpades','QueenHearts','JackDiamonds','10clubs'], 'miDDlE');
// Deck.prototype.count();

let deck = new Deck(1,2,3,4,5,6);
console.log(globalStore.deck);
// deck.shuffle();
deck.count();
console.log(globalStore.deck);
// deck.put([1,2,3],'miDDlE');
deck.put([0], "top").put([4], "middle").put([5], "bottom").count()
// new Deck(1, 2, 3).shuffle().put([0], "top").put([4], "middle").put([5], "bottom");