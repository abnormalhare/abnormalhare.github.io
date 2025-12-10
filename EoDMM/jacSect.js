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
    1537, // ∀, =, ⊤, ⊥
    1562, // ⊤ + ⊥
    1592, // hadd
    1620, // cadd
    1626, // min
    1640, // imp
    1657, // meredith
    1668, // luka
    1674, // nic
];
const locationG = 1623;
/////

const interpretPercentage = (block, percentage) => {
    if (percentage >= 100 && block != null) {
        block.className = "greenBefore";
        block.innerHTML = "100%";
        if (percentage == 100) block.innerHTML = "100%!";
    } else if (block != null) {
        if (percentage >= 75) {
            block.className = "ygBefore";
        } else if (percentage >= 50) {
            block.className = "yellowBefore";
        } else if (percentage >= 25) {
            block.className = "orangeBefore";
        } else {
            block.className = "redBefore";
            if (percentage < 0) {
                percentage = 0;
            }
        }
        block.innerHTML = percentage + "%+";
    }
    
    if (percentage > 100) percentage = 100;
    else if (percentage < 0) percentage = 0;
    return percentage;
}

const getPercentageComplete = (index, block) => {
    const currCompletion = locationG;

    const prevIndex = index <= 0 ? 0 : chapter_ends[index - 1]
    const theoremsToComplete = chapter_ends[index] - (index <= 0 ? 0 : prevIndex)
    const theoremsComplete = currCompletion - prevIndex;
    let percentage = Math.round(theoremsComplete / theoremsToComplete * 1000) / 10;

    percentage = interpretPercentage(block, percentage);
    if (percentage > 100) {
        percentage = 100;
    }

    let chapter_start = index <= 0 ? 1 : chapter_ends[index - 1] + 1;
    let chapter_end = chapter_ends[index];

    block.innerHTML += " (" + chapter_start + "-" + chapter_end + ")";
    return percentage;
}

const setSectPercentageComplete = (num) => {
    let sectPercent = 0;
    
    for (let i = part_indexes[num]; i <= part_indexes[num + 1] - 1; i++) {
        const id = `${num}-${i - part_indexes[num]}`;
        const blockSet = document.getElementById(id);
        if (blockSet == null) break
        sectPercent += getPercentageComplete(i, blockSet);
    }
    const block = document.getElementById(`sect-${num}`);
    num++;
    sectPercent = Math.round(sectPercent / num * 10) / 10;
    interpretPercentage(block, sectPercent);
}

const position = () => {
    let posOut = locationG;
    if (!(locationG % 100)) posOut += "!";
    document.getElementById("LUP").innerHTML = posOut;
}