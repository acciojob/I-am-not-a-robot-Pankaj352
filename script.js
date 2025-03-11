//your code here
const images = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg"
];

let shuffledImages = [];
let selectedImages = [];

// Function to shuffle images and insert a duplicate randomly
function shuffleImages() {
  let uniqueImages = [...images];
  let duplicate = uniqueImages[Math.floor(Math.random() * uniqueImages.length)];
  uniqueImages.push(duplicate);

  shuffledImages = uniqueImages.sort(() => Math.random() - 0.5);
}

// Function to render images
function renderImages() {
  const container = document.getElementById("image-container");
  container.innerHTML = "";
  shuffledImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.index = index;
    img.addEventListener("click", () => selectImage(img, src));
    container.appendChild(img);
  });
}

// Function to handle image selection
function selectImage(img, src) {
  if (selectedImages.length < 2) {
    img.classList.add("selected");
    selectedImages.push({ element: img, src: src });

    document.getElementById("reset").style.display = "block";

    if (selectedImages.length === 2) {
      document.getElementById("verify").style.display = "block";
    }
  }
}

// Function to reset selection
document.getElementById("reset").addEventListener("click", () => {
  selectedImages.forEach(({ element }) => element.classList.remove("selected"));
  selectedImages = [];
  document.getElementById("verify").style.display = "none";
  document.getElementById("reset").style.display = "none";
  document.getElementById("para").innerText = "";
});

// Function to verify selection
document.getElementById("verify").addEventListener("click", () => {
  const message = document.getElementById("para");
  if (selectedImages[0].src === selectedImages[1].src) {
    message.innerText = "You are a human. Congratulations!";
  } else {
    message.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  document.getElementById("verify").style.display = "none";
});

// Initialize the game on page load
shuffleImages();
renderImages();
