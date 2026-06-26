
function randomName() {
    
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let allowed = ['h', 'l', 'r', 's','w', 'y'];
    let length = Math.floor(Math.random() * (11 - 4) + 4);
    let name = alphabet[Math.floor(Math.random() * 26)];
    while (name.length < length) {
        letter = alphabet[Math.floor(Math.random() * 26)];
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
// initialize button
let nameButton = document.querySelector("#nameButton");
nameButton.onclick = randomName;



//['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
