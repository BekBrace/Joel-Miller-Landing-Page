const Typewriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.wait = parseInt(wait, 10);
  this.txt = "";
  this.wordsIndex = 0;
  this.type();
  this.isDeleting = false;
};

// type method
Typewriter.prototype.type = function () {
  // current index of word
  const current = this.wordsIndex % this.words.length;
  // get full text of current word
  const fullTxt = this.words[current];
  // check if deleting
  if (this.isDeleting) {
    // if deleting - remove charachter
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // if not deleting - add charachter
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert span of txt into element
  this.txtElement.innerHTML = `<span class="txt"> ${this.txt} </span`;
  // initital type speed
  let typeSpeed = 300;
  // type speed when deleting
  if (this.isDeleting) {
    typeSpeed /= 2; // same as typeSpeed = typeSpeed / 2
  }
  // if word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // make pause at the end
    typeSpeed = this.wait;
    // set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    // Move to next word
    this.wordsIndex++;
    // Pause before typing
    typeSpeed = 500;
  }
  setTimeout(() => this.type(), 500);
};

// Init on dom load
document.addEventListener("DOMContentLoaded", init);

// function init
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // init typewriter
  new Typewriter(txtElement, words, wait);
}
