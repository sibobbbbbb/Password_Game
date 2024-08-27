const calculateScore = (fulfilledRules,difficultyLevel,startTime,text,setScore) => {
  // 1. Point tiap rule
  const basePointsPerRule = 100;
  const fulfilledRulesPoints = basePointsPerRule * fulfilledRules.length;

  // 2. Bonus point dari tingkat kesulitan
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

  // 3. Bonus Point dari waktu
  const maxTime = 3600;
  const timeTaken = (Date.now() - startTime) / 1000;
  const timeBonusMultiplier = 0.1;
  const timeRemaining = Math.max(0, maxTime - timeTaken);
  const timeBonusPoints = timeRemaining * timeBonusMultiplier;

  // 4. Bonus Point dari karakter unik
  const uniqueChars = new Set(text).size;
  const uniqueBonusPoints = uniqueChars * 10;

  // Total score
  const totalScore =
    fulfilledRulesPoints +
    difficultyBonusPoints +
    timeBonusPoints +
    uniqueBonusPoints;
  setScore(totalScore);
};

export default calculateScore;
