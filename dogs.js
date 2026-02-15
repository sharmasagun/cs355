let breedlist = [];
let dogInterval;

const myInput = document.querySelector('input[list="breed-list"]');
const myButton = document.getElementById('image');
const imgElement = document.getElementById('dog-image');
const errorMsg = document.getElementById('error-msg');
const datalist = document.getElementById('breed-list');

fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
        breedlist = Object.keys(data.message);

        breedlist.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            datalist.appendChild(option);
        });
     })
    .catch(error => console.error('Error fetching dog breeds:', error));

function fetchDogImage(breed){
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(response => response.json())
        .then(data => {
            imgElement.src = data.message;
            imgElement.style.display = 'block';
        })
        .catch(error => console.error('Error fetching dog image:', error));
}; 

myButton.addEventListener('click', () => {
    const userInput = myInput.value.toLowerCase();

clearInterval(dogInterval);
errorMsg.style.display = 'none';
if (breedlist.includes(userInput)) {
    fetchDogImage(userInput);
    dogInterval = setInterval(() => {
        fetchDogImage(userInput);
    }, 5000);
}else {
    errorMsg.style.display = 'block';
    imgElement.src = '';
}
});