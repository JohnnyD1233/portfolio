document.addEventListener("scroll", function () {
  var pageTop = window.pageYOffset;
  var pageBottom = pageTop + window.innerHeight;
  var tags = document.querySelectorAll(".tags");

  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];
    var tagTop = tag.getBoundingClientRect().top + pageTop;
    if (tagTop < pageBottom) {
      tag.classList.add("visible");
    } else {
      tag.classList.remove("visible");
    }
  }
});

const contrast = document.getElementById("toggle-contrast");
contrast.addEventListener("click", function () {
  const elements = document.querySelectorAll("h1, h2, h3, h4, h5, a, p, label");
  elements.forEach(function (element) {
    element.classList.toggle("high-contrast");
  });
});

const increaseFontButton = document.getElementById("increase-font");

increaseFontButton.addEventListener("click", function () {
  // Select all elements whose font size you want to increase
  const elementsToChange = document.querySelectorAll(
    "h1, h2, h3, h4, h5, p, a, label"
  );

  // Loop through each element and increase its font size
  elementsToChange.forEach(function (element) {
    let currentFontSize = window.getComputedStyle(element).fontSize;
    let fontSize = parseFloat(currentFontSize);
    fontSize++;
    element.style.fontSize = fontSize + "px";
  });
});

const decreaseFont = document.getElementById("decrease-font");

decreaseFont.addEventListener("click", function () {
  // Select all elements whose font size you want to increase
  const elementsToChange = document.querySelectorAll(
    "h1, h2, h3, h4, h5, p, a, label"
  );
  // Loop through each element and increase its font size
  elementsToChange.forEach(function (element) {
    let currentFontSize = window.getComputedStyle(element).fontSize;
    let fontSize = parseFloat(currentFontSize);
    fontSize--;
    element.style.fontSize = fontSize + "px";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const accessibilityMenuToggle = document.getElementById(
    "accessibility-menu-toggle"
  );
  const stickyMenu = document.getElementById("sticky-menu");
  const toggleNarratorButton = document.getElementById("toggle-narrator");
  let narratorEnabled = false;

  accessibilityMenuToggle.addEventListener("click", function () {
    stickyMenu.classList.toggle("open");
  });

  toggleNarratorButton.addEventListener("click", function (event) {
    event.stopPropagation();
    narratorEnabled = !narratorEnabled;
    if (narratorEnabled) {
      startNarrator();
    } else {
      stopNarrator();
    }
  });

  function startNarrator() {
    const text = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }

  function stopNarrator() {
    window.speechSynthesis.cancel();
  }
});
