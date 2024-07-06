const imgs = document.querySelectorAll("img");
const container = document.querySelector(".images-container");
const layer = document.querySelector(".not-layer");
const showImage = document.querySelector(".not-show-image");
const showImageContainer = document.querySelector(
  ".not-show-image .show-image-container .image-container"
);
const indexes = document.querySelector(".indexes ul");
const nextArrow = document.querySelector(".right-arrow");
const prevArrow = document.querySelector(".left-arrow");
const closeBtn = document.querySelector(".close-btn");

let currentIndex = 1;

imgs.forEach((img, index) => {
  img.parentElement.addEventListener("click", () => {
    imgClickHandler(index);
  });
});

nextArrow.addEventListener("click", () => {
  nextArrowFunction();
});

prevArrow.addEventListener("click", () => {
  prevArrowFunction();
});

closeBtn.addEventListener("click", () => {
  closeBtnFunction();
});

const imgClickHandler = (index) => {
  currentIndex = index + 1;
  createIndexes();
  getChosenImage();
  checkNextImage();
  closeBtn.style.display = "block";

  layer.className = "layer";
  showImage.className = "show-image";
};
const closeBtnFunction = () => {
  layer.className = "not-layer";
  showImage.className = "not-show-image";
  closeBtn.style.display = "none";
  showImageContainer.innerHTML = "";
  indexes.innerHTML = "";
};

function createIndexes() {
  indexes.innerHTML = "";
  for (let i = 0; i < imgs.length; i++) {
    let li = document.createElement("li");
    li.innerText = i + 1;
    li.addEventListener("click", chooseImage);
    if (i + 1 == currentIndex) {
      li.className = "active";
    }
    indexes.appendChild(li);
  }
}

function getChosenImage() {
  showImageContainer.innerHTML = "";
  imgs.forEach((img, index) => {
    if (index + 1 == currentIndex) {
      let newImg = document.createElement("img");
      newImg.src = img.src;
      showImageContainer.appendChild(newImg);
    }
  });
}

function chooseImage(event) {
  currentIndex = event.target.textContent;
  getChosenImage();
  createIndexes();
  checkNextImage();
}

function checkNextImage() {
  nextArrow.classList.remove("disabled");

  prevArrow.classList.remove("disabled");

  if (currentIndex == imgs.length) {
    nextArrow.classList.add("disabled");
  } else if (currentIndex == 1) {
    prevArrow.classList.add("disabled");
  }
}

const prevArrowFunction = () => {
  if (currentIndex > 1) {
    currentIndex--;

    getChosenImage();
    createIndexes();

    // Check After Dencrement currentIndex
    checkNextImage();
  }
};

const nextArrowFunction = () => {
  if (currentIndex < imgs.length) {
    currentIndex++;

    getChosenImage();
    createIndexes();

    // Check After Increment currentIndex
    checkNextImage();
  }
};
