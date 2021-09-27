import React, { useState } from "react";
import "./Settings.css";

export default function Settings({
  categories,
  changeSettings,
  closeSettings,
}) {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");

  const playClick = () => {
    const settings = {};

    settings.category = category;
    settings.difficulty = difficulty;
    settings.type = type;

    changeSettings(settings);
    closeSettings(false);
  };

  const settingsBackgroundClick = (e) => {
    if (e.target.id === "modal") {
      closeSettings(false);
    }
  };

  return (
    <div
      className="settings-background"
      id="modal"
      onClick={settingsBackgroundClick}
    >
      <div className="settings-container">
        <h1>Settings</h1>
        <label for="category">Category:</label>
        <div className="select-container">
          <select
            name="category"
            id="categorySelect"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Any category</option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <label for="difficulty">Difficulty:</label>
        <div className="select-container">
          <select
            name="difficulty"
            id="difficultySelect"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Any difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <label for="type">Type:</label>
        <div className="select-container">
          <select
            name="type"
            id="typeSelect"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Any type</option>
            <option value="multiple">Multiple choice</option>
            <option value="boolean">True / False</option>
          </select>
        </div>

        <button onClick={playClick}>Play</button>
      </div>
    </div>
  );
}
