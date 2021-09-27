import React, { useState, useEffect } from 'react'
import "./Game.css"

function Game({ apiLink }) {

    const shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array
    }

    const decodeHtml = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const [response, setResponse] = useState({ loading: true })
    const [guessMade, setGuessMade] = useState()
    const [reload, setReload] = useState(false)

    const guess = (e) => {
        if (e.target.innerText !== response.question.correct_answer && !guessMade) {
            e.target.className += " incorrect"
        }

        setGuessMade(true)

        if (!guessMade) {
            setTimeout(() => {
                setResponse({ loading: true })
                setReload(!reload)
            }, 1000)
        }
    }

    // get question
    useEffect(async () => {
        let response = await fetch(apiLink)
        let responseJSON = await response.json()

        setGuessMade(false)


        setResponse({
            loading: false,
            question: responseJSON.results[0],
            answers: shuffle([...responseJSON.results[0].incorrect_answers, responseJSON.results[0].correct_answer].map((a) => decodeHtml(a)))
        })



    }, [reload])


    if (response.loading) {
        return <main><h1>Loading...</h1></main>
    }

    return (
        <div id="container">
            <main>
                <h1 id="question">{decodeHtml(response.question.question)}</h1>
                <div id="answers">
                    {response.answers.map((option, index) => {
                        return <h2
                            key={index}
                            onClick={guess}
                            className={`option ${(guessMade && option === response.question.correct_answer) ? "correct" : ""}`}>
                            {option}
                        </h2>
                    })}
                </div>
            </main>
        </div>
    )
}

export default Game
