import React, { useState, useEffect } from "react";
import TextBox from "./TextBox";
import {
  isStringAllFireEmoji,
  updateStringWithFireEmoji,
} from "./rule10/BurnEffect";

const Password = () => {
  // password
  const [text, setText] = useState("");

  // rules logic
  const [rules, setRules] = useState([]);
  const [revealedRules, setRevealedRules] = useState([]);
  const [countRevealedRules, setCountRevealedRules] = useState(0);

  // rule 8
  const [flagImages, setFlagImages] = useState([]);
  const [countries, setCountries] = useState([]);

  // rule 12
  const [captchaImage, setCaptchaImage] = useState(null);
  const [answer, setAnswer] = useState("");

  // rule 10
  const [isAlreadyRule10, setIsAlreadyRule10] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const [isFirstBurn, setIsFirstBurn] = useState(false);
  const [burnInterval, setBurnInterval] = useState(null);

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
      }, Math.floor(Math.random() * (60000 - 50000 + 1)) + 50000);
    } else if (isBurning && text.indexOf("🔥") === -1 && isFirstBurn) {
      setIsBurning(false);
      setIsFirstBurn(false);
      console.log("stop burn");
      setTimeout(() => {
        setIsBurning(true);
      }, Math.floor(Math.random() * (60000 - 50000 + 1)) + 50000);
    }
  }, [isBurning, text, isFirstBurn]);

  // refresh button captcha on click
  const refreshCaptcha = async () => {
    try {
      const captchaDataResponse = await fetch("http://localhost:5000/api/captchas/random");
      if (captchaDataResponse.ok) {
        const captchas = await captchaDataResponse.json();
        setAnswer(captchas.answer);
  
        const captchaImagePromise = fetch(captchas.imageUrl)
          .then((res) => res.blob())
          .then((blob) => URL.createObjectURL(blob));
  
        const imageUrl = await captchaImagePromise;
        setCaptchaImage(imageUrl);
  
        // Revoke old URL
        return () => URL.revokeObjectURL(imageUrl);
      } else {
        console.error("Failed to fetch the captcha data:", captchaDataResponse.statusText);
      }
    } catch (error) {
      console.error("Error refreshing captcha:", error);
    }
  };
  

  // start the game
  useEffect(() => {
    if (text.trim().length > 0) {
      checkRules(text);
    }
  }, [text, refreshCaptcha]);

  // check password pemain
  const checkRules = async (textToCheck) => {
    try {
      const response = await fetch("http://localhost:5000/api/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: textToCheck,
          countRevealedRules,
          countries,
          answer,
        }),
      });
      const { results, countRevealedRules: newCount } = await response.json();
      setCountRevealedRules(newCount);
      setRules(results);
      const newRevealedRules = results.map((rule) => rule.id);
      setRevealedRules((prevRevealedRules) => [
        ...new Set([...prevRevealedRules, ...newRevealedRules]),
      ]);
      const rule10 = results.find((rule) => rule.id === 10);
      if (rule10 && rule10.isValid && !isAlreadyRule10) {
        setIsAlreadyRule10(true);
        setIsBurning(true);
      }

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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-[#022B42] min-h-screen flex flex-col items-center justify-center">
      <h1 className="py-14 text-6xl font-bold text-white text-center">
        Welcome to Password Game
      </h1>
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
      <div className="pt-10"></div>
    </div>
  );
};

export default Password;
