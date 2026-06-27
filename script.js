
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
    let length = Math.floor(Math.random() * (11 - 4) + 4);
    let last;
    let beforeLast;
    let grandpaLast;
    function generateA() {
        let letter = alphabet[Math.floor(Math.random() * 26)];
        return letter;
    }
    function generateVowel() {
        let letter = vowels[Math.floor(Math.random() * 6)];
        return letter;
    }
    function updateLast() {
        last = name[name.length - 1];
        beforeLast = name[name.length - 2];
        grandpaLast = name[name.length - 3];
    }
    let name = generateA();
    updateLast();
    while (name.length < length) {
        let newLetter = generateA();
        if (last === 'h') {
            name += generateVowel();
            updateLast();
        }
        else if (last === 'q') {
            let restrictedvowels = ['a', 'e', 'i', 'o', 'y'];
            name += 'u' + restrictedvowels[Math.floor(Math.random() * 5)];
            updateLast();
        }
        else if (consonants.includes(last) && consonants.includes(beforeLast)) {
            name += generateVowel();
            updateLast();
        }
        else if (consonants.includes(last) && afterConsonants.includes(newLetter) && newLetter !== last && newLetter !== 'h') {
            name += newLetter;
            updateLast();
            console.log(last)
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
            name += generateVowel();
            updateLast();
    }
    else if (badEnding.includes(last) && (!vowels.includes(beforeLast) || !vowels.includes(grandpaLast))) {
        name += generateVowel();
    }
    return name;
}
// initialize buttons
let nameButton = document.querySelector("#nameButton");
let nameBox = document.querySelector("#nameBox")
nameButton.addEventListener("click", function () {
    nameBox.textContent = randomName();
});


//['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
//se allowed não está vendo depois de vogal, a próxima tem que ser vogal

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


