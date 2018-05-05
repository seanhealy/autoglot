const sampleFloatingPointNumber = 0.8;

const talkName = document.getElementById("talk-name");
const talkType = document.getElementById("talk-type");
const button = document.getElementById("button");

const talkTypeArray = [
  'Fish Bowl Discussion',
  'Prepared Talk',
  'Mob Programming/Hackathon',
  'Round Table',
  'World Cafe',
];

function randomizer(inputNumber) {
  return Math.floor(Math.random() * inputNumber);
}

talkName.textContent = sampleNetwork(sampleFloatingPointNumber).sentence
talkType.textContent = talkTypeArray[randomizer(talkTypeArray.length)];

button.onclick = () => {
  talkName.textContent = sampleNetwork(sampleFloatingPointNumber).sentence;
  talkType.textContent = talkTypeArray[randomizer(talkTypeArray.length)];
};
