document.getElementById("getStarted").addEventListener("click", function() {
    const word = generateRandomWord();
    document.getElementById("generatedWord").textContent = word;
    document.getElementById("generatedWordContainer").classList.remove("hidden");
    document.getElementById("letsGo").classList.remove("hidden");

    localStorage.setItem("sessionWord", word); // Store word
});

document.getElementById("copyWord").addEventListener("click", function() {
    const word = document.getElementById("generatedWord").textContent;
    navigator.clipboard.writeText(word).then(() => alert("Copied!"));
});

document.getElementById("letsGo").addEventListener("click", function() {
    window.location.href = "call.html?word=" + localStorage.getItem("sessionWord");
});

document.getElementById("goTalk").addEventListener("click", function() {
    const enteredWord = document.getElementById("enteredWord").value.trim();
    if (enteredWord) {
        window.location.href = "call.html?word=" + enteredWord;
    } else {
        alert("Please enter a valid word.");
    }
});

function generateRandomWord() {
    return Math.random().toString(36).substring(2, 10);
}
