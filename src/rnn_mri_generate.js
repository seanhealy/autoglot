
// if sampleDistribution is false or not provided, the generated sentence
// is simply the argmax at every output step.
var generateSentence = function (model, sampleDistribution, samplingTemperature, maxGenerationLength=200) {
  if (sampleDistribution == null) { sampleDistribution = false; }
  if (samplingTemperature == null) { samplingTemperature = 1.0; }

  var G = new R.Graph(false);
  var sentence = '';
  var previousNetworkOutput = {};
  var networkHistory = [];
  while(true) {

    // RNN tick
    var currentIndex = sentence.length === 0 ? 0 : characterToIndex[sentence[sentence.length-1]];
    var currentNetworkOutput = forwardPropagateNetwork(G, model, currentIndex, previousNetworkOutput);
    previousNetworkOutput = currentNetworkOutput;
    networkHistory.push(currentNetworkOutput);

    // sample predicted letter
    var logProbabilities = currentNetworkOutput.o;
    if(samplingTemperature !== 1.0 && sampleDistribution) {
      // scale log probabilities by temperature and renormalize
      // if temperature is high, logProbabilities will go towards zero
      // and the softmax outputs will be more diffuse. if temperature is
      // very low, the softmax outputs will be more peaky
      for (var probabilityIdx = 0; probabilityIdx < logProbabilities.w.length; probabilityIdx++) {
        logProbabilities.w[probabilityIdx] /= samplingTemperature;
      }
    }

    probs = R.softmax(logProbabilities);
    if(sampleDistribution) {
      var currentIndex = R.samplei(probs.w);
    } else {
      var currentIndex = R.maxi(probs.w);
    }

    if(currentIndex === 0) break; // END token predicted, break out
    if(sentence.length > maxGenerationLength) { break; }

    var letter = indexToCharacter[currentIndex];
    sentence += letter;
  }
  return { sentence: sentence, internalStateHistory: networkHistory };
}

var sampleNetwork = function (sampleSoftmaxTemperature) {
  var generationResult = generateSentence(model, true, sampleSoftmaxTemperature);
  return generationResult;
}

var sampleNetworkGreedy = function () {
  var generationResult = generateSentence(model, false);
  return generationResult;
}
