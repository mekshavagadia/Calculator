const display = document.getElementById("display");
const historyBox = document.getElementById("historyBox");
const toggleHistoryBtn = document.getElementById("toggleHistory");
const historyList = document.getElementById("historyList");

let currentInput = "";

// Append number/operator to display
function press(val) {
  currentInput += val;
  display.value = currentInput;
}

//Clear display
function clearDisplay() {
  currentInput = "";
  display.value = "";
}

// Calculate and store in history
function calculate() {
  try {
    let result = eval(currentInput);
    addToHistory(currentInput + " = " + result);
    display.value = result;
    currentInput = result.toString();
  } catch {
    display.value = "Error";
  }
}

// Add entry to history list (top-down)
function addToHistory(entry) {
  const li = document.createElement("li");
  li.textContent = entry;
  historyList.prepend(li); // latest on top
}

// Show/Hide History panel
toggleHistoryBtn.addEventListener("click", () => {
  historyBox.classList.toggle("open");
  toggleHistoryBtn.textContent = historyBox.classList.contains("open")
    ? "Hide History"
    : " Show History";
});

// Keyboard Support
document.addEventListener("keydown", function(event) {
  const key = event.key;
  const validKeys = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/'];

  if (validKeys.includes(key)) {
    press(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
  });