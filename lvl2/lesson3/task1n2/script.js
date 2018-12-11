let BigText = `Fluffy wakes up. He hopes he is in a bad dream, but now he sees this is real. Bam sits beside him.

'Is it time for your 9 o'clock bath?' he smiles.

'I don't have a 9 o'clock bath. I have a 9 o'clock golf match!' Fluffy answers angrily.
`;

let result = BigText.replace(/^(')|\W(')|(')\W|(')$/g, replaceInReplace);

function replaceInReplace(match) {
    return match.replace("\'", "\"");
}

console.log(result);
