function solve(s) {
  let lettersArr = [];
  let result = [];
  for(let i = 1; i < 27; i++){
  	let letter = String.fromCharCode(96 + i);
  	lettersArr[letter] = i;
  };
  const vowel = ["a", "e", "i", "o", "u"];
  const re = /[aeiou]/g;
  let consonants = s.split(re);
  function convert(letter) {
  	return lettersArr[letter];
  }
  consonants.forEach((letter) => {
    if(letter === ""){
    } else {
    	let tempResult = [];
    	letter.split("").forEach(l => tempResult.push(convert(l)));
    	result.push(tempResult.reduce((a, b) => a + b));
    }
  })
  return Math.max(...result);
};

console.log(solve("zodiac"));
console.log(solve("chruschtschov"));
console.log(solve('twelfthstreet'));
console.log(solve('nicholas'));