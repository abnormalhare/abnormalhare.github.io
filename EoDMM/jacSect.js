///// important
const part_ends = [1, 1620, 1778]
const part_indexes = [0, 1, 18, 30]
const chapter_ends = [
    2,    // infered
    4,    // wff
    8,    // ⊢
    112,  // →
    205,  // ¬
    394,  // ⟷
    846,  // ∧
    955,  // ∨
    1061, // ∧ + ∨
    1081, // if
    1084, // ded
    1490, // 3wff
    1510, // nand
    1527, // xor
    1537, // nor
    1562, // ∀, =, ⊤, ⊥
    1592, // ⊤ + ⊥
    1620, // hadd/cadd
    1626, // min
    1640, // imp
    1657, // meredith
    1668, // luka
    1674, // nicod
    1693, // luka-nicod
    1697, // lukshef
    1712, // tbw
    1735, // merco1
    1748, // merco2
    1767, // rb
    1778, // stoic
];
const locationG = 1639;
/////

const interpretPercentage = (block, percentage) => {
    if (block == null) return;

    block.style.display = "inline";

    if (percentage < 0) {
        block.style.color = "#FF0000";
        block.innerHTML = "0%+";
    } else if (percentage < 50) {
        const greenNum = Math.round(percentage / 50 * 255);
        const green = greenNum.toString(16).padStart(2, '0');
        
        block.style.color = "#FF" + green + "00";
        block.innerHTML = percentage + "%+"
    } else if (percentage < 100) {
        const redNum = 255 - Math.round((percentage - 50) / 50 * 255);
        const red = redNum.toString(16).padStart(2, '0');

        block.style.color = "#" + red + "FF00";
        block.innerHTML = percentage + "%+"
    } else if (percentage == 100) {
        block.style.color = "#00FF00";
        block.innerHTML = "100%!"
    } else {
        block.style.color = "#00FF00";
        block.innerHTML = "100%"
    }
}

const getPercentageComplete = (index, block) => {
    const currCompletion = locationG;

    const prevIndex = index <= 0 ? 0 : chapter_ends[index - 1]
    const theoremsToComplete = chapter_ends[index] - (index <= 0 ? 0 : prevIndex)
    const theoremsComplete = currCompletion - prevIndex;
    const percentage = Math.round(theoremsComplete / theoremsToComplete * 1000) / 10;

    interpretPercentage(block, percentage);

    const chapter_start = index <= 0 ? 1 : chapter_ends[index - 1] + 1;
    const chapter_end = chapter_ends[index];

    block.innerHTML += " (" + chapter_start + "-" + chapter_end + ")";
}

const setSectPercentageComplete = (num) => {
    for (let i = part_indexes[num]; i <= part_indexes[num + 1] - 1; i++) {
        const id = `${num}-${i - part_indexes[num]}`;
        const block = document.getElementById(id);
        if (block == null) break;

        getPercentageComplete(i, block);
    }

    const block = document.getElementById(`sect-${num}`);
    const partStart = num <= 0 ? 0 : chapter_ends[part_indexes[num] - 1];
    const partEnd   = chapter_ends[part_indexes[num + 1] - 1];
    const partCount = partEnd - partStart;
    const amountComplete = locationG - partStart;
    const partPercentage = Math.round(amountComplete / partCount * 1000) / 10;
    interpretPercentage(block, partPercentage);
}

const position = () => {
    const posOut = locationG;
    if (!(locationG % 100)) posOut += "!";
    document.getElementById("LUP").innerHTML = posOut;
}

function toggleCollapse() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

const initializePage = () => {
    for (var i = 0; i < 3; i++) {
        setSectPercentageComplete(i);
    }
    position();

    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", toggleCollapse);

        if (i == coll.length - 1) {
            coll[i].nextElementSibling.style.display = "block";
            coll[i].classList.add("active");
        }
    }
}


initializePage();

