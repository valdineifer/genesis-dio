let sequence = [];
let inputSequence = [];
let points = 0;
let sections = document.querySelectorAll(".container > *");
let startButton =  document.querySelector('button');

function doAnimation() {
  startButton.disabled = true;
  emphasizeSections(sequence);
}

function emphasizeSections(seq) {
  if (seq.length) {
    const elIndex = seq[0];
    sections[elIndex].style.opacity = "70%";

    setTimeout(() => {
      sections[elIndex].style.opacity = "100%";

      setTimeout(() => {
        emphasizeSections(seq.slice(1));
      }, 100);
    }, 700);
  } else {
    const pos = Math.floor(Math.random() * sections.length);
    emphasizeSection(sections[pos]);

    sequence.push(pos);
  }
}

function emphasizeSection(element) {
  element.style.opacity = "70%";

  return setTimeout(() => {
    element.style.opacity = "100%";
  }, 700);
}

function clickSection(sectionIndex) {
  if (!startButton.disabled) return;
 
  inputSequence.push(sectionIndex);
  checkOrder();
}

function checkOrder() {
  for (let i = 0; i < inputSequence.length; i++) {
    if (inputSequence[i] !== sequence[i]) {
      alert(`Você perdeu com um total de ${points} ponto(s)`);
      inputSequence = [];
      sequence = [];
      points = 0;
      startButton.disabled = false;

      return -1;
    }
  }

  if (inputSequence.length === sequence.length) {
    points++;
    inputSequence = [];
    doAnimation();
  }
}