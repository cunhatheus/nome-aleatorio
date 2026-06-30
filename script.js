



function randomName() {
    
    // arrays used to generate newLetter
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
    let vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
    let afterM = ['a', 'e', 'i', 'o', 'u', 'y', 'p', 'b', 'p', 'b'];    
    let vowelsAfterJ = ['a', 'o', 'u'];
    let restrictedvowels = ['a', 'e', 'i', 'o', 'y', 'i', 'i', 'e', 'e'];
    let afterVowels = ['l', 'm', 'n', 'r', 's']
    let hardConsonantsPlusS = ['b', 'c', 'd', 'f', 'g', 'k', 'p', 'q', 's', 't', 'v', 'x', 'z'];
    
    //arrays used for comparing
    let afterConsonants = ['a', 'e', 'i', 'o', 'u', 'y', 'r', 'w', 'l'];
    let beforeH = ['l', 'n', 'p', 'c', 'k', 't']
    let badEnding = ['b', 'c', 'd', 'f', 'j', 'p', 'q', 't', 'v'];
    let needVocal1 = ['l', 'm', 'n', 'r', 's', 'w', 'x'];
    let notBeforeW = ['c', 'h', 'm', 'n', 'r', 'u', 'v', 'w', 'x', 'y'];
    let vowelsPlusW = ['a', 'e', 'i', 'o', 'u', 'y', 'w'];
    
    let last;
    let beforeLast;
    let grandpaLast;
    let length = Math.floor(Math.random() * (11 - 4) + 4);
    let abrasileirar = Number(document.querySelector('input[name="abrasileirar"]:checked').value);
    console.log('abrasileirar ' + abrasileirar);

    function generate(array){
        let letter = array[Math.floor(Math.random() * array.length)];
        return letter;
    }
    function updateLast() {
        last = name[name.length - 1];
        beforeLast = name[name.length - 2];
        grandpaLast = name[name.length - 3];
    }
    function diceRoll() {
    console.log('rolling dice')    
    let roll = Math.floor(Math.random() * 3);
    if (roll > abrasileirar) return true;
    else return false;
}

    [alphabet, consonants, vowels, afterM, vowelsAfterJ, restrictedvowels, hardConsonantsPlusS] =
    [alphabet, consonants, vowels, afterM, vowelsAfterJ, restrictedvowels, hardConsonantsPlusS].map(updateArray)    
    
    let name = generate(alphabet);
    updateLast();
    while (name.length < length) {

        console.log('name ' + name);
        console.log('length ' + name.length + '/' + length);
        
        let newLetter = generate(alphabet);

        //chance to update name if last is vowel
        if (vowels.includes(last) && diceRoll()) {
            name += generate(afterVowels);
            console.log('rolled true');
            updateLast();
            if (last === 'm' && name.length < length - 2) {
                name += generate(afterM);
                console.log('afterM+afterVoewls');
                updateLast();
            }
            else if (last === 'l' && name.length < length - 2) {
                name += generate(hardConsonantsPlusS);
                updateLast();
            }
            else if (last === 'n' && name.length < length - 2) {
                let aConsonant = generate(consonants);
                if (aConsonant !== last && !['m', 'b', 'p'].includes(aConsonant)) name += aConsonant;
                updateLast();
            }
            else if (name.length < length - 2) {
                let aConsonant = generate(consonants);
                if ((aConsonant !== last && aConsonant !== 'h') || ['r', 's'].includes(aConsonant)) name += aConsonant;
                updateLast();
            }
            else if (name.length === length) return name;
        }

        //chance of updating newLetter if last is consonant
        /*
        if (consonants.includes(last) && diceRoll()) {
            newLetter = generate(vowels)
            console.log('rolled true with consonant')
            console.log('new letter = ' + newLetter)
        }
        */
        if (newLetter === 'w'  && notBeforeW.includes(last)) {
            while (newLetter === 'w') {
                newLetter = generate(alphabet);
            }
        }
        if (newLetter === 'q' && name.length >= length - 2) {
            while (newLetter === 'q') {
                newLetter = generate(alphabet);
                console.log('rejected q');
            }
        }
        if (last === 'j' && ['i', 'e', 'r'].includes(newLetter)) {
            newLetter = generate(vowelsAfterJ);
        }
        if (vowelsPlusW.includes(newLetter) && vowelsPlusW.includes(last) && vowelsPlusW.includes(beforeLast) && vowelsPlusW.includes(grandpaLast)) {
            while (vowelsPlusW.includes(newLetter)) {
                newLetter = generate(consonants);
            } 
        }
        if (name.length === 1 && needVocal1.includes(last)) {
            name += generate(vowels);
            updateLast();
        }
        else if (last === 'm') {
            if (name.length === 1) {
                name += generate(vowels);
                updateLast();
            }
            else if (name.length < length - 1) {
                name += generate(afterM);
                updateLast();
            }
            else if (name.length === length - 1) {
                name += generate(vowels);
                updateLast();
            }
        }
        else if (last === 'h') {
            name += generate(vowels);
            updateLast();
        }
        else if (last === 'q') {
            name += 'u' + generate(restrictedvowels);
            updateLast();
        }
        else if (consonants.includes(last) && consonants.includes(beforeLast)) {
            name += generate(vowels);
            updateLast();
        }
        else if (consonants.includes(last) && afterConsonants.includes(newLetter) && newLetter !== last && newLetter !== 'h') {
            name += newLetter;
            updateLast();
        }
        else if (vowels.includes(last) && newLetter !== last && newLetter !== 'h') {
            name += newLetter;
            updateLast();
        }
        else if (newLetter === 'h' && beforeH.includes(last)) {
                name += newLetter;
                updateLast();            
        }    
    }
    if (consonants.includes(last) && consonants.includes(beforeLast)) {
            name += generate(vowels);
            updateLast();
    }
    else if (badEnding.includes(last) && (!vowels.includes(beforeLast) || !vowels.includes(grandpaLast))) {
        if (last === 'j') {
            name += generate(vowelsAfterJ)
        }
        else name += generate(vowels);
    }
    console.log("target " + length)
    console.log("length " + name.length)
    return name;
}
// set up buttons
let nameButton = document.querySelector("#nameButton");
let nameBox = document.querySelector("#nameBox");
let nameButtonText = document.querySelector("#nameButtonText");
let k = document.querySelector("#k");
let w = document.querySelector("#w");
let y = document.querySelector("#y");
let x = document.querySelector("#x");
let z = document.querySelector("#z");
let h = document.querySelector("#h");


nameButton.addEventListener("click", function () {
    nameBox.textContent = randomName();
    nameButtonText.textContent = "Tente de novo"
});

function updateArray(array) {
        let excludedLetters = [];
        if (!k.checked) excludedLetters.push('k');
        if (!w.checked) excludedLetters.push('w');
        if (!y.checked) excludedLetters.push('y');
        if (!x.checked) excludedLetters.push('x');
        if (!z.checked) excludedLetters.push('z');
        if (!h.checked) excludedLetters.push('h');
        console.log('excluded ' + excludedLetters);
        if (excludedLetters.length > 0) {
            let tempArray = [];
            for (let i = 0; i < array.length; i ++) {
                let letter = array[i];
                if (!excludedLetters.includes(letter)) {
                    tempArray.push(letter)
                }
            }
            array = tempArray;
        }
        return array;
    }








//code cemetery
/*
function getExcludedLetters() {
    let lettersToExclude = [];
    if (!k.checked) lettersToExclude.push('k');
    if (!w.checked) lettersToExclude.push('w');
    if (!y.checked) lettersToExclude.push('y');
    return lettersToExclude;
}

function randomNameOld() {
    
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let allowed = ['h', 'l', 'r', 's','w', 'y'];
    let length = Math.floor(Math.random() * (11 - 4) + 4);
    let name = alphabet[Math.floor(Math.random() * 26)];
    while (name.length < length) {
        let letter = alphabet[Math.floor(Math.random() * 26)];
        let i = name.length - 1;
        if (consonants.includes(letter) && (!consonants.includes(name[i]) || allowed.includes(name[i]))) {
            name += letter;
        }
        if (vowels.includes(letter) && letter !== name[i]) {
            name += letter;
        }
    }
    return name
}

*/
    


// testing
let letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


const minInput = document.querySelector('input[name="minLength"]');
const minDecrease = document.getElementById('min-decrease');
const minIncrease = document.getElementById('min-increase');

minDecrease.addEventListener('click', () => {
  const min = Number(minInput.min);
  minInput.value = Math.max(min, Number(minInput.value) - 1);
});

minIncrease.addEventListener('click', () => {
  const max = Number(minInput.max);
  minInput.value = Math.min(max, Number(minInput.value) + 1);
});

const maxInput = document.querySelector('input[name="maxLength"]');
const maxDecrease = document.getElementById('max-decrease');
const maxIncrease = document.getElementById('max-increase');

maxDecrease.addEventListener('click', () => {
  maxInput.value = Math.max(Number(maxInput.min), Number(maxInput.value) - 1);
});
maxIncrease.addEventListener('click', () => {
  maxInput.value = Math.min(Number(maxInput.max), Number(maxInput.value) + 1);
});