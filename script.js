
/*function randomNameOld() {
    
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
}*/


function randomName() {
    
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
    let vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
    let afterConsonants = ['a', 'e', 'i', 'o', 'u', 'y', 'r', 'w', 'l'];
    let beforeH = ['l', 'n', 'p', 'c', 'k', 't']
    let badEnding = ['b', 'c', 'd', 'f', 'j', 'p', 'q', 't', 'v'];
    let needVocal1 = ['l', 'm', 'n', 'r', 's', 'w', 'x'];
    let afterM = ['a', 'e', 'i', 'o', 'u', 'y', 'p', 'b', 'p', 'b']
    let restrictedvowels = ['a', 'e', 'i', 'o', 'y', 'i', 'i', 'e', 'e'];
    let notBeforeW = ['c', 'h', 'm', 'n', 'r', 'u', 'v', 'w', 'x', 'y'];
    let vowelsPlusW = ['a', 'e', 'i', 'o', 'u', 'y', 'w'];
    let vowelsAfterJ = ['a', 'o', 'u']
    let last;
    let beforeLast;
    let grandpaLast;
    let excludedLetters = getExcludedLetters();
    let length = Math.floor(Math.random() * (11 - 4) + 4);
    function generate(array){
        let letter = array[Math.floor(Math.random() * array.length)];
        return letter;
    }
    function updateLast() {
        last = name[name.length - 1];
        beforeLast = name[name.length - 2];
        grandpaLast = name[name.length - 3];
    }
    let name = generate(alphabet);
    updateLast();
    while (name.length < length) {
        let newLetter = generate(alphabet);
        if (newLetter === 'w'  && notBeforeW.includes(last)) {
            while (newLetter === 'w') {
                newLetter = generate(alphabet);
            }
        }
        if (newLetter === 'q' && name.length >= length - 2) {
            while (newLetter === 'q') {
                newLetter = generate(alphabet);
                console.log('rejected q');
                console.log(last);
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
            else {
                name += generate(afterM);
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
        name += generate(vowels);
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

nameButton.addEventListener("click", function () {
    nameBox.textContent = randomName();
    nameButtonText.textContent = "Tente de novo"
});

function getExcludedLetters() {
    let lettersToExclude = [];
    if (!k.checked) lettersToExclude.push('k');
    if (!w.checked) lettersToExclude.push('w');
    if (!y.checked) lettersToExclude.push('y');
    return lettersToExclude;
}





let letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
//não permitir 'q' nos ultimos 2 indexes
/*function generateConsonant() {
        let letter = consonants[Math.floor(Math.random() * 20)];
        return letter;
    }
    function generateAfterConsonant() {
        let letter = afterConsonants[Math.floor(Math.random() * 9)];
        return letter;
    }
        
    
    
    let name = generateA();
    updateLast();
    while (name.length < length) {
        if (consonants.includes(last) && consonants.includes(beforeLast)) {
            name += generateVowel();
            updateLast();
        }
        if (last === 'h') {
            name += generateVowel();
            updateLast();
        };
        let newLetter = generateA();
        if (newLetter !== last && newLetter !== 'h') {
            if (consonants.includes(last) && afterConsonants.includes(newLetter)) {
                name += newLetter;
                updateLast();
                console.log(last)
            };
            if (vowels.includes(last)) {
                name += newLetter;
                updateLast();
                updateLast();
            }}
        if (newLetter === 'h' && beforeH.includes(last)) {
                name += newLetter;
                updateLast();            
        };    
    };
    return name;
    
    
    
    
    */


