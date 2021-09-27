import React, { useState, useEffect } from "react";
import Game from "./components/Game";
import SettingsBtn from "./components/SettingsBtn";
import Settings from "./components/Settings";

function Test() {
  const [state, setState] = useState(0);

  useEffect(() => {
    const newState = Number(state + 1);
    setState(newState);
  }, [state]);

  return <div>{state}</div>;
}

function App() {
  const [settings, setSettings] = useState({
    category: "",
    difficulty: "",
    type: "",
  });

  const baseApiLink = "https://opentdb.com/api.php?amount=1";
  const [apiLink, setApiLink] = useState(
    "https://opentdb.com/api.php?amount=1"
  );

  const [showSettings, setShowSettings] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingSettings, setLoadingSettings] = useState(true);

  // get name of the categories
  useEffect(async () => {
    const response = await fetch("https://opentdb.com/api_category.php");
    const responseJson = await response.json();

    setCategories(responseJson.trivia_categories);

    setLoadingSettings(false);
  }, []);

  // set link configuration
  useEffect(() => {
    let link = baseApiLink;
    if (settings.category !== "") {
      link += `&category=${settings.category}`;
    }
    if (settings.difficulty !== "") {
      link += `&difficulty=${settings.difficulty}`;
    }
    if (settings.type !== "") {
      link += `&type=${settings.type}`;
    }

    setApiLink(link);
  }, [settings]);

  return (
    <>
      <Test />
      {loadingSettings || !showSettings ? (
        ""
      ) : (
        <Settings
          categories={categories}
          closeSettings={setShowSettings}
          changeSettings={setSettings}
        />
      )}
      <SettingsBtn onClick={() => setShowSettings(!showSettings)} />
      <Game apiLink={apiLink} />
    </>
  );
}

export default App;
