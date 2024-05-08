const form = document.querySelector("form");
const resultDiv = document.getElementsByClassName("result");
const input = document.querySelector("input");
const w = document.querySelector(".word");
const pos = document.querySelector(".part-of-speech");
const defi = document.querySelector(".definition");
const defi2 = document.querySelector(".definition-2");
const antonyms = document.querySelector(".antonyms");
const synonyms = document.querySelector(".synonyms");
const ex = document.querySelector(".example");
const btn = document.querySelector("#btn");
const link = document.querySelector("#btn a");
const main = document.querySelector("main");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getWordInfo(input.value);
    pos.innerHTML = "";
    synonyms.innerHTML = "";
    antonyms.innerHTML = "";
    w.innerHTML = "";

});

const getWordInfo = async (word) => {
    try {


        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        console.log(data);

        let definitions = data[0].meanings[0].definitions[0];

        resultDiv[0].style.display = "block";
        resultDiv[1].style.display = "block";
        resultDiv[2].style.display = "block";
        resultDiv[3].style.display = "block";
        resultDiv[4].style.display = "block";
        resultDiv[5].style.display = "block";
        btn.style.display = "block";


        // Word
        w.innerHTML = data[0].word.toUpperCase();
        // Definition
        defi.innerText = definitions.definition === undefined ? "Not Found" : definitions.definition;

        // Antonyms
        if (data[0].meanings[0].antonyms.length === 0) {
            antonyms.innerHTML = "Not Found";
        } else {
            for (let i = 0; i <= 2; i++) {
                antonyms.innerHTML += `<li>${data[0].meanings[0].antonyms[i]}</li>`;
            }
        }
        if (data[0].meanings[0].synonyms.length === 0) {
            synonyms.innerHTML = "Not Found";
        } else {
            for (let i = 0; i <= 2; i++) {
                synonyms.innerHTML += `<li>${data[0].meanings[0].synonyms[i]}</li>`;
            }
        }
        link.href = data[0].sourceUrls;
        ex.innerHTML = definitions.example === undefined ? "Not Found" : definitions.example;

        // Part Of Speech
        // for (let i = 0; i <= data[0].meanings.length; i++) {
        //     pos.innerHTML += `<li>${data[0].meanings[i].partOfSpeech}</li>`;
        // }
    }
    catch (error) {
        resultDiv[0].style.display = "block";
        resultDiv[1].style.display = "none";
        resultDiv[2].style.display = "none";
        resultDiv[3].style.display = "none";
        resultDiv[4].style.display = "none";
        resultDiv[5].style.display = "none";
        btn.style.display = "none";
        w.innerHTML = "Not Found";
    }

}





