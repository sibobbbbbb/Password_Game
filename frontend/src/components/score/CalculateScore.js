const calculateScore = (fulfilledRules,difficultyLevel,startTime,text,setScore) => {
  // 1. Base points for fulfilled rules
  const basePointsPerRule = 100;
  const fulfilledRulesPoints = basePointsPerRule * fulfilledRules.length;

  // 2. Difficulty bonus multiplier
  let difficultyBonusMultiplier;
  switch (difficultyLevel) {
    case "easy":
      difficultyBonusMultiplier = 1;
      break;
    case "medium":
      difficultyBonusMultiplier = 1.2;
      break;
    case "hard":
      difficultyBonusMultiplier = 1.5;
      break;
    default:
      difficultyBonusMultiplier = 1;
  }
  const difficultyBonusPoints =
    fulfilledRulesPoints * (difficultyBonusMultiplier - 1);

  // 3. Time bonus points
  const maxTime = 3600; // 1 hour in seconds
  const timeTaken = (Date.now() - startTime) / 1000; // time taken in seconds
  const timeBonusMultiplier = 0.1; // 10% of remaining time converted to points
  const timeRemaining = Math.max(0, maxTime - timeTaken);
  const timeBonusPoints = timeRemaining * timeBonusMultiplier;

  // 4. Uniqueness of password characters
  const uniqueChars = new Set(text).size;
  const uniqueBonusPoints = uniqueChars * 10; // adjust multiplier as needed

  // Total score
  const totalScore =
    fulfilledRulesPoints +
    difficultyBonusPoints +
    timeBonusPoints +
    uniqueBonusPoints;
  setScore(totalScore);
};

export default calculateScore;
