phrasesSS = [
    {name: "Complete", color: "rainbow"},
    {name: "Practically done", color: "blue"},
    {name: "Partially done", color: "green"},
    {name: "Important parts done", color: "green"},
    {name: "In progress", color: "yellow"},
    {name: "AAAAAAA", color: "red"},
    {name: "Not done", color: "red"},
    {name: "???", color: "purple"},
]

const setColorSS = (block) => {
    for (let i = 0; i < phrasesSS.length; i++) {
        if (phrasesSS[i].name == block.innerHTML) block.className = phrasesSS[i].color + "Before"
    }
}
