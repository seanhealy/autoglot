let sampleFloatingPointNumber = (Math.random() * (0.15 - 0.1) + 0.1).toFixed(4);

const talkName = document.getElementById("talk-name");
const talkType = document.getElementById("talk-type");
const button = document.getElementById("button");
const floatTextField = document.getElementById("floating-point-input") || 0;
const floatButton = document.getElementById("floating-point-button");

const talkTypeArray = [
  "Fish Bowl Discussion",
  "Prepared Talk",
  "Mob Programming/Hackathon",
  "Round Table",
  "World Cafe"
];

function randomizer(inputNumber) {
  return Math.floor(Math.random() * inputNumber);
}

talkName.textContent = sampleNetwork(sampleFloatingPointNumber).sentence;
talkType.textContent = talkTypeArray[randomizer(talkTypeArray.length)];
floatTextField.value = sampleFloatingPointNumber;

button.onclick = () => {
  talkName.textContent = sampleNetwork(sampleFloatingPointNumber).sentence;
  talkType.textContent = talkTypeArray[randomizer(talkTypeArray.length)];
};

if (floatButton) {
  floatButton.onclick = () => {
    if (
      floatTextField.value > 0.15 ||
      floatTextField.value < 0 ||
      isNaN(floatTextField.value)
    ) {
      alert(
        "Input Value = must be between 0 and 0.15. Did not update floating point number."
      );
    } else {
      alert("Success");
      sampleFloatingPointNumber = floatTextField.value;
    }
  };
}
