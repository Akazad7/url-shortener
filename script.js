let btn = document.getElementById("shorten");
let newURL = document.getElementById("slide");
let copyBtn = document.getElementById("copy");
const copyButtons = document.querySelectorAll('.copy-button');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

btn.addEventListener('click', short);

async function short () {
  let longURL = document.getElementById("longurl").value;
  let shortURL1 = document.getElementById("shorturl1");
  let shortURL2 = document.getElementById("shorturl2");
  let shortURL3 = document.getElementById("shorturl3");
  let shortURL4 = document.getElementById("shorturl4");

  const result = await fetch(`https://api.shrtco.de/v2/shorten?url=${longURL}`);
  const data = await result.json();

  shortURL1.value = data.result.share_link;
  shortURL2.value = data.result.short_link;
  shortURL3.value = data.result.short_link2;
  shortURL4.value = data.result.short_link3;

  console.log(data);
  console.log(data.result.short_link2);
}

function nextSlide() {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlider();
}

function previousSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = slides.length - 1; 
    }
    updateSlider();
}

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

document.getElementById('nextButton').addEventListener('click', nextSlide);
document.getElementById('prevButton').addEventListener('click', previousSlide);

setInterval(nextSlide, 7500);

copyButtons.forEach((copyButton, index) => {
  copyButton.addEventListener('click', () => {
    const shortURLInput = document.getElementById(`shorturl${index + 1}`);

    shortURLInput.select();
    document.execCommand("copy");

    shortURLInput.setSelectionRange(0, 0);

    alert(`Copied to clipboard: ${shortURLInput.value}`);
  });
});