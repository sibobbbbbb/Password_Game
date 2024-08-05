import React, { useState, useEffect, useRef } from "react";
import TextBox from "./TextBox";
import {
  isStringAllFireEmoji,
  updateStringWithFireEmoji,
  intervalBurnByDifficulty,
} from "./rule10/BurnEffect";
import { checkWorms, feedPaulByDifficulty } from "./rule14/ClearWorm";
import {
  LetterPicker,
  nSacredLettersByDifficulty,
} from "./rule15/LetterPicker";
import calculateScore from "./score/CalculateScore";
import StartScreen from "./StartScreen";

const Password = () => {
  // password
  const [text, setText] = useState("");

  // GameState
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  // rules logic
  const [rules, setRules] = useState([]);
  const [revealedRules, setRevealedRules] = useState([]);
  const [countRevealedRules, setCountRevealedRules] = useState(0);

  // Calculate points
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (!gameOver && revealedRules.length > 0) {
      calculateScore(revealedRules, difficultyLevel, startTime, text, setScore);
    }
  }, [revealedRules, gameOver, text]);

  // Difficulty level
  const [difficultyLevel, setDifficultyLevel] = useState("");

  // rule 8
  const [flagImages, setFlagImages] = useState([]);
  const [countries, setCountries] = useState([]);

  // rule 12
  const [captchaImage, setCaptchaImage] = useState(null);
  const [answer, setAnswer] = useState("");

  // rule 11
  const [isAlreadyRule11, setIsAlreadyRule11] = useState(false);

  // rule 10
  const [isAlreadyRule10, setIsAlreadyRule10] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const [isFirstBurn, setIsFirstBurn] = useState(false);
  const [burnInterval, setBurnInterval] = useState(null);

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
    if (isBurning && isStringAllFireEmoji(text)) {
      setIsBurning(false);
      setIsFirstBurn(false);
      console.log("all burn");
      setTimeout(() => {
        setIsBurning(true);
      }, intervalBurnByDifficulty[difficultyLevel].X);
    } else if (isBurning && text.indexOf("🔥") === -1 && isFirstBurn) {
      setIsBurning(false);
      setIsFirstBurn(false);
      console.log("stop burn");
      setTimeout(() => {
        setIsBurning(true);
      }, intervalBurnByDifficulty[difficultyLevel].X);
    }
  }, [isBurning, text, isFirstBurn]);

  // refresh button captcha on click
  const refreshCaptcha = async () => {
    setCaptchaImage(null);
    setAnswer("");
  };

  // rule 14
  const [isAlreadyRule14, setIsAlreadyRule14] = useState(false);
  const wormInterval = useRef(null);

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
        checkRules(text);
      } else {
        console.log("GameOVER");
      }
    }
  }, [text, captchaImage]);

  // check password pemain
  const checkRules = async (textToCheck) => {
    try {
      const response = await fetch("http://localhost:5000/api/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: textToCheck, // text
          difficulty: difficultyLevel, // difficulty
          countRevealedRules, // rules yang sudah terbuka
          countries, // rule 8
          isAlreadyRule10, // rule 10
          answer, // rule 12
          sacrificedLetters, // rule 15
        }),
      });
      const { results, countRevealedRules: newCount } = await response.json();
      setCountRevealedRules(newCount);
      setRules(results);
      const newRevealedRules = results.map((rule) => rule.id);
      setRevealedRules((prevRevealedRules) => [
        ...new Set([...prevRevealedRules, ...newRevealedRules]),
      ]);

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
        setText((prevText) => prevText.replace(/🥚/g, "🐔"));
        setTimeout(() => {
          setIsAlreadyRule14(true);
        }, feedPaulByDifficulty[difficultyLevel].Y );
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
      {showStartScreen ? (
        <StartScreen
          onStart={(selectedDifficulty) => {
            setDifficultyLevel(selectedDifficulty);
            setShowStartScreen(false);
          }}
        />
      ) : (
        <>
          <h1 className="py-5 text-6xl font-bold text-white text-center">
            Welcome to Password Game
          </h1>
          <div className="text-white text-xl mb-4">
            Password length: {text.length}
          </div>
          {/* <div className="text-white text-xl mb-4">Score: {score}</div> */}
          <div className="px-40 w-full max-w-5xl">
            <TextBox
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full"
            />
          </div>
          {revealedRules.map((id) => {
            const rule = rules.find((r) => r.id === id);
            return (
              <div
                key={rule.id}
                className={`mt-4 text-2xl ${
                  rule.isValid ? "text-green-500" : "text-red-500"
                }`}
              >
                {rule.description}
              </div>
            );
          })}
          {flagImages.length > 0 && (
            <div className="mt-4 p-4 border border-gray-300 rounded-md bg-white">
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
            <div className="mt-4 p-4 border border-gray-300 rounded-md bg-white relative">
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
    </div>
  );
};

export default Password;