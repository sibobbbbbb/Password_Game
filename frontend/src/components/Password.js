import React, { useState, useEffect, useRef } from "react";
import TextBox from "./TextBox";
import {
  isStringAllFireEmoji,
  updateStringWithFireEmoji,
  deleteAllFireEmoji,
  intervalBurnByDifficulty,
} from "./rule10/BurnEffect";
import { checkWorms, feedPaulByDifficulty } from "./rule14/ClearWorm";
import {
  LetterPicker,
  nSacredLettersByDifficulty,
} from "./rule15/LetterPicker";
import calculateScore from "./score/CalculateScore";
import StartScreen from "./StartScreen";
import GameOverScreen from "./GameOverScreen";
import { highlightInvalidCharacters } from "./Highlighter";

const isContainCheat = (text) => {
  const regex = /cheat/i;
  return regex.test(text);
};

const Password = () => {
  // password
  const [text, setText] = useState("");
  const [highlightedText, setHighlightedText] = useState("");

  // GameState
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  // rules logic
  const [rules, setRules] = useState([]);
  const [revealedRules, setRevealedRules] = useState([]);
  const [countRevealedRules, setCountRevealedRules] = useState(0);

  // Calculate points
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (!gameOver && revealedRules.length > 0) {
      calculateScore(revealedRules, difficultyLevel, startTime, text, setScore);
    }
  }, [revealedRules, gameOver, text]);

  // Difficulty level
  const [difficultyLevel, setDifficultyLevel] = useState("");

  // highlighter
  const [invalidNumberRule, setInvalidNumberRule] = useState(false);
  const [invalidRomanRule, setInvalidRomanRule] = useState(false);

  // cheat
  const [isCheat, setIsCheat] = useState(false);

  // rule 8
  const [flagImages, setFlagImages] = useState([]);
  const [countries, setCountries] = useState([]);

  // rule 12
  const [captchaImage, setCaptchaImage] = useState(null);
  const [answer, setAnswer] = useState("");

  // rule 11
  const [isAlreadyRule11, setIsAlreadyRule11] = useState(false);

  // rule 10
  const [cheatBurn, setCheatBurn] = useState(false);
  const [isAlreadyRule10, setIsAlreadyRule10] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const [isFirstBurn, setIsFirstBurn] = useState(false);
  const [burnInterval, setBurnInterval] = useState(null);
  const [burnTimeOut, setBurnTimeOut] = useState(null);

  const textRef = useRef(text);
  useEffect(() => {
    textRef.current = text;
  }, [text]);

  // interval burning untuk rule 10
  useEffect(() => {
    if (isBurning && burnInterval == null) {
      console.log("ini buat interval nya");
      const interval = setInterval(() => {
        console.log("ini dari interval");
        setText((prevText) => updateStringWithFireEmoji(prevText));
        if (!isFirstBurn) {
          console.log("ini dari interval first burn");
          setIsFirstBurn(true);
        }
      }, 1000);
      setBurnInterval(interval);
    } else if (burnInterval) {
      console.log("ini buat clear interval nya");
      clearInterval(burnInterval);
      setBurnInterval(null);
    }

    return () => {
      if (burnInterval) {
        console.log("ini buat clear interval nya dari return");
        clearInterval(burnInterval);
      }
    };
  }, [isBurning, setText]);

  // check apakah interval nya harus stop
  useEffect(() => {
    if (!cheatBurn) {
      let timeOut;
      if (isBurning && isStringAllFireEmoji(text)) {
        setIsBurning(false);
        setIsFirstBurn(false);
        console.log("all burn");
        timeOut = setTimeout(() => {
          setIsBurning(true);
        }, intervalBurnByDifficulty[difficultyLevel].X);
        setBurnTimeOut(timeOut);
      } else if (isBurning && text.indexOf("🔥") === -1 && isFirstBurn) {
        setIsBurning(false);
        setIsFirstBurn(false);
        console.log("stop burn");
        timeOut = setTimeout(() => {
          setIsBurning(true);
        }, intervalBurnByDifficulty[difficultyLevel].X);
      }
      setBurnTimeOut(timeOut);
    } else {
      console.log("clear timeout");
      setIsBurning(false);
      setIsFirstBurn(false);
      clearTimeout(burnTimeOut);
      clearInterval(burnInterval);
    }
  }, [isBurning, text, isFirstBurn, cheatBurn]);

  // refresh button captcha on click
  const refreshCaptcha = async () => {
    setCaptchaImage(null);
    setAnswer("");
  };

  // rule 14
  const [isAlreadyRule14, setIsAlreadyRule14] = useState(false);
  const [handleGameOverRule14, setHandleGameOverRule14] = useState(false);
  const [isCheatWorm, setIsCheatWorm] = useState(false);
  const wormInterval = useRef(null);

  useEffect(() => {
    if (handleGameOverRule14) {
      setText((prevText) => prevText.replace(/🥚/g, "🐔"));
    }
  }, [handleGameOverRule14]);

  useEffect(() => {
    if (isAlreadyRule14 && wormInterval.current === null) {
      wormInterval.current = setInterval(() => {
        checkWorms(
          textRef.current,
          setGameOver,
          setText,
          feedPaulByDifficulty[difficultyLevel].X
        );
      }, feedPaulByDifficulty[difficultyLevel].Y);
    }

    return () => {
      if (wormInterval.current) {
        clearInterval(wormInterval.current);
        wormInterval.current = null;
      }
    };
  }, [isAlreadyRule14]);

  useEffect(() => {
    if (isCheatWorm) {
      console.log("clear interval worm");
      clearInterval(wormInterval.current);
      wormInterval.current = null;
    }
  }, [isCheatWorm]);

  // rule 15
  const [sacrificedLetters, setSacrificedLetters] = useState([]);
  const [showLetterPicker, setShowLetterPicker] = useState(false);

  const handleSacrificedLetters = (letters) => {
    setSacrificedLetters(letters);
  };

  const openLetterPicker = () => {
    setShowLetterPicker(true);
  };

  const closeLetterPicker = () => {
    setShowLetterPicker(false);
  };

  // start the game
  useEffect(() => {
    if (text.trim().length > 0) {
      if (!gameOver) {
        if (isContainCheat(text)) {
          setIsCheat(true);
        } else {
          setIsCheat(false);
        }

        checkRules(text);
      } else {
        console.log("GameOVER");
      }
    }
    highlightInvalidCharacters(
      text,
      invalidNumberRule,
      invalidRomanRule,
      setHighlightedText
    );
  }, [text, captchaImage]);

  // game over
  useEffect(() => {
    if (isAlreadyRule11 && !handleGameOverRule14) {
      const regex = /🥚/g;
      if (!regex.test(text)) {
        console.log("ini rule 11");
        setGameOver(true);
        setIsWinner(false);
      }
    } else if (handleGameOverRule14) {
      const regex = /🐔/g;
      if (!regex.test(text)) {
        console.log("ini rule 14");
        setGameOver(true);
        setIsWinner(false);
      }
    }
  }, [text]);

  // play again
  const handlePlayAgain = () => {
    clearInterval(burnInterval);
    clearInterval(wormInterval.current);
    clearTimeout(burnTimeOut);
    setShowStartScreen(true);
    setText("");
    setGameOver(false);
    setIsWinner(false);
    setScore(0);
    setRevealedRules([]);
    setCountRevealedRules(0);
    setRules([]);
    setHighlightedText("");
    setInvalidNumberRule(false);
    setInvalidRomanRule(false);
    setIsCheat(false);
    setFlagImages([]);
    setCountries([]);
    setCaptchaImage(null);
    setAnswer("");
    setIsAlreadyRule11(false);
    setCheatBurn(false);
    setIsAlreadyRule10(false);
    setIsBurning(false);
    setIsFirstBurn(false);
    setBurnInterval(null);
    setBurnTimeOut(null);
    setIsAlreadyRule14(false);
    setIsCheatWorm(false);
    setSacrificedLetters([]);
    setShowLetterPicker(false);
    setStartTime(null);
    setHandleGameOverRule14(false);
  };

  // check password pemain
  const checkRules = async (textToCheck) => {
    try {
      const response = await fetch("http://localhost:5000/api/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cheat: isCheat, // cheat
          text: textToCheck, // text
          difficulty: difficultyLevel, // difficulty
          countRevealedRules, // rules yang sudah terbuka
          countries, // rule 8
          isAlreadyRule10, // rule 10
          answer, // rule 12
          sacrificedLetters, // rule 15
        }),
      });
      const {
        text: newText,
        results,
        countRevealedRules: newCount,
      } = await response.json();
      setCountRevealedRules(newCount);
      setRules(results);
      const newRevealedRules = results.map((rule) => rule.id);
      setRevealedRules((prevRevealedRules) => [
        ...new Set([...prevRevealedRules, ...newRevealedRules]),
      ]);

      // cheat
      if (isCheat) {
        // cheat rule 10
        setCheatBurn(true);
        const tempText = deleteAllFireEmoji(newText);

        // cheat rule 14
        setIsCheatWorm(true);

        setText((prevText) => tempText);
        setIsCheat(false);
      }

      // highlighter
      const rule5 = results.find((rule) => rule.id === 5);
      const rule17 = results.find((rule) => rule.id === 17);
      const rule18 = results.find((rule) => rule.id === 18);
      setInvalidNumberRule(
        (rule5 && !rule5.isValid) ||
          (rule17 && !rule17.isValid) ||
          (rule18 && !rule18.isValid)
      );

      const rule9 = results.find((rule) => rule.id === 9);
      setInvalidRomanRule(rule9 && !rule9.isValid);

      // rule 8 logic
      const rule8 = results.find((rule) => rule.id === 8);
      if (rule8 && flagImages.length === 0) {
        const flagDataResponse = await fetch(
          "http://localhost:5000/api/flags/random"
        );
        if (flagDataResponse.ok) {
          const flags = await flagDataResponse.json();
          const countries = flags.map((flag) => flag.country);
          setCountries(countries);

          const flagImagePromises = flags.map((flag) =>
            fetch(flag.imageUrl)
              .then((res) => res.blob())
              .then((blob) => URL.createObjectURL(blob))
          );
          const imageUrls = await Promise.all(flagImagePromises);
          setFlagImages(imageUrls);

          return () => imageUrls.forEach((url) => URL.revokeObjectURL(url));
        } else {
          console.error(
            "Failed to fetch the flag data:",
            flagDataResponse.statusText
          );
        }
      }

      // rule 10 logic
      const rule10 = results.find((rule) => rule.id === 10);
      if (rule10 && !isAlreadyRule10) {
        setIsAlreadyRule10(true);
        setIsBurning(true);
      }

      // paul logic (rule 11 && rule 14)
      const rule11 = results.find((rule) => rule.id === 11);
      if (rule11 && rule11.isValid && !isAlreadyRule11) {
        setText((prevText) => prevText + "🥚");
        setIsAlreadyRule11(true);
      }
      const rule14 = results.find((rule) => rule.id === 14);
      if (rule14 && rule14.isValid && !isAlreadyRule14) {
        setHandleGameOverRule14(true);
        setTimeout(() => {
          setIsAlreadyRule14(true);
        }, feedPaulByDifficulty[difficultyLevel].Y);
      }

      // rule 12 logic
      const rule12 = results.find((rule) => rule.id === 12);
      if (rule12 && captchaImage === null) {
        const captchaDataResponse = await fetch(
          "http://localhost:5000/api/captchas/random"
        );
        if (captchaDataResponse.ok) {
          const captchas = await captchaDataResponse.json();
          setAnswer(captchas.answer);

          const captchaImagePromise = fetch(captchas.imageUrl)
            .then((res) => res.blob())
            .then((blob) => URL.createObjectURL(blob));

          const imageUrls = await captchaImagePromise;
          setCaptchaImage(imageUrls);

          return () => URL.revokeObjectURL(imageUrls);
        } else {
          console.error(
            "Failed to fetch the flag data:",
            captchaDataResponse.statusText
          );
        }
      }

      // rule 15 logic
      if (sacrificedLetters.length === 0) {
        const rule15 = results.find((rule) => rule.id === 15);
        if (rule15) {
          openLetterPicker();
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-[#022B42] min-h-screen flex flex-col items-center justify-center">
      {gameOver ? (
        <GameOverScreen
          isWinner={isWinner}
          score={score}
          onPlayAgain={handlePlayAgain}
        />
      ) : (
        <>
          {showStartScreen ? (
            <StartScreen
              onStart={(selectedDifficulty) => {
                setDifficultyLevel(selectedDifficulty);
                setShowStartScreen(false);
                setStartTime(Date.now());
              }}
            />
          ) : (
            <>
              <h1 className="py-5 text-6xl font-bold text-white text-center">
                Welcome to Password Game
              </h1>
              <div className="text-white text-xl mb-4">
                Password length: {text ? text.length : 0}
              </div>
              <div className="px-40 w-full max-w-5xl">
                <TextBox
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full"
                />
              </div>
              <div
                className="mt-4 text-2xl text-white"
                dangerouslySetInnerHTML={{ __html: highlightedText }}
              ></div>

              {/* Rules */}
              <div className="p-4 shadow-md flex justify-between">
                <div>
                  {revealedRules.map((id) => {
                    const rule = rules.find((r) => r.id === id);
                    return (
                      <div
                        key={rule.id}
                        className={`mt-4 text-xl ${
                          rule.isValid ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {rule.description}
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 shadow-md flex flex-col items-center">
                  {flagImages.length > 0 && (
                    <div className="w-full p-4 border border-gray-300 rounded-md bg-white mb-4">
                      <h2 className="text-lg font-bold mb-2 text-center">
                        Rule 8
                      </h2>
                      <div className="grid grid-cols-3 gap-4">
                        {flagImages.map((image, index) => (
                          <div key={index} className="text-center">
                            <img
                              src={image}
                              alt={`Flag ${index + 1}`}
                              className="w-full h-auto object-contain"
                              style={{ maxHeight: "150px" }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {captchaImage && (
                    <div className="w-full p-4 border border-gray-300 rounded-md bg-white relative">
                      <h2 className="text-lg font-bold mb-2 text-center">
                        Rule 12
                      </h2>
                      <img
                        src={captchaImage}
                        alt="Captcha"
                        className="w-full h-auto object-contain"
                        style={{ maxHeight: "150px" }}
                      />
                      <button
                        onClick={refreshCaptcha}
                        className="absolute top-2 right-2 bg-blue-500 text-white py-1 px-3 rounded"
                      >
                        Refresh
                      </button>
                    </div>
                  )}

                  {sacrificedLetters.length > 0 && (
                    <div className="w-full p-4 border border-gray-300 rounded-md bg-white mt-4">
                      <h2 className="text-lg font-bold mb-2 text-center">
                        Rule 15
                      </h2>
                      <div className="flex justify-center items-center">
                        {sacrificedLetters.map((letter, index) => (
                          <div
                            key={index}
                            className="text-4xl font-bold text-red-500"
                          >
                            {letter}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {showLetterPicker && (
                <LetterPicker
                  onSelect={handleSacrificedLetters}
                  maxLetters={nSacredLettersByDifficulty[difficultyLevel].X}
                  onClose={closeLetterPicker}
                />
              )}
              <div className="pt-10"></div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Password;
