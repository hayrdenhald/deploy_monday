import * as Utils from "./utils.js";

const contentPath = "./frontend/content.json";

const avatarPaths = {
  default: {
    b: "./frontend/images/b_avatar.svg",
    h: "./frontend/images/h_avatar.svg",
    r: "./frontend/images/r_avatar.svg",
  },
  chosen: {
    b: "./frontend/images/b_avatar_chosen.svg",
    h: "./frontend/images/h_avatar_chosen.svg",
    r: "./frontend/images/r_avatar_chosen.svg",
  },
  notChosen: {
    b: [
      "./frontend/images/b_avatar_not_chosen_1.svg",
      "./frontend/images/b_avatar_not_chosen_2.svg",
      "./frontend/images/b_avatar_not_chosen_3.svg",
    ],
    h: [
      "./frontend/images/h_avatar_not_chosen_1.svg",
      "./frontend/images/h_avatar_not_chosen_2.svg",
      "./frontend/images/h_avatar_not_chosen_3.svg",
    ],
    r: [
      "./frontend/images/r_avatar_not_chosen_1.svg",
      "./frontend/images/r_avatar_not_chosen_2.svg",
      "./frontend/images/r_avatar_not_chosen_3.svg",
    ],
  },
};

document.addEventListener("DOMContentLoaded", async () => {
  const bAvatar = document.getElementById("b-avatar");
  const hAvatar = document.getElementById("h-avatar");
  const rAvatar = document.getElementById("r-avatar");

  const bSurpriseElement = document.getElementById("b-surprise");
  const hSurpriseElement = document.getElementById("h-surprise");
  const rSurpriseElement = document.getElementById("r-surprise");

  const content = await getContent();

  setLastUpdate(content.lastUpdate);

  setDeployAmounts(content.deployAmounts);

  switch (content.chosenPersonName) {
    case "b":
      setAvatarImage(bAvatar, avatarPaths.chosen.b, false, false);
      enableSurprise(bSurpriseElement);

      setAvatarImage(hAvatar, Utils.choose(avatarPaths.notChosen.h), true, true);
      setAvatarImage(rAvatar, Utils.choose(avatarPaths.notChosen.r), true, true);
      break;
    case "h":
      setAvatarImage(hAvatar, avatarPaths.chosen.h, false, false);
      enableSurprise(hSurpriseElement);

      setAvatarImage(bAvatar, Utils.choose(avatarPaths.notChosen.b), false, true);
      setAvatarImage(rAvatar, Utils.choose(avatarPaths.notChosen.r), true, true);
      break;
    case "r":
      setAvatarImage(rAvatar, avatarPaths.chosen.r, true, false);
      enableSurprise(rSurpriseElement);

      setAvatarImage(hAvatar, Utils.choose(avatarPaths.notChosen.h), false, true);
      setAvatarImage(bAvatar, Utils.choose(avatarPaths.notChosen.b), false, true);
      break;
    default:
      setAvatarImage(bAvatar, avatarPaths.default.b, false, true);
      setAvatarImage(hAvatar, avatarPaths.default.h, false, true);
      setAvatarImage(rAvatar, avatarPaths.default.r, true, true);
      break;
  }
});

function setAvatarImage(imageElement, imagePath, turnLeft, grayScale) {
  imageElement.src = imagePath;
  if (grayScale) {
    imageElement.style.filter = "grayscale(100%)";
  } else {
    imageElement.style.filter = "none";
  }

  if (turnLeft) {
    imageElement.style.webkitTransform = "scaleX(-1)";
    imageElement.style.transform = "scaleX(-1)";
  } else {
    imageElement.style.webkitTransform = "none";
    imageElement.style.transform = "none";
  }
  imageElement.style.opacity = 1;
}

function setDeployAmounts(deployAmounts) {
  const bDeployAmountSpan = document.getElementById("b-deploy-amount");
  const hDeployAmountSpan = document.getElementById("h-deploy-amount");
  const rDeployAmountSpan = document.getElementById("r-deploy-amount");

  setDeployAmount(deployAmounts.b, bDeployAmountSpan);
  setDeployAmount(deployAmounts.h, hDeployAmountSpan);
  setDeployAmount(deployAmounts.r, rDeployAmountSpan);
}

function setDeployAmount(deployAmount, span) {
  span.textContent = Number(deployAmount);
  span.style.opacity = 1;
}

function setLastUpdate(lastUpdate) {
  const lastUpdateSpan = document.getElementById("last-update-span");

  lastUpdateSpan.textContent = lastUpdate;
  lastUpdateSpan.style.opacity = 1;
}

function enableSurprise(element) {
  setSurprise(element, 1);
}

function disableSurprise(element) {
  setSurprise(element, 0);
}

function setSurprise(element, binaryFlag) {
  element.style.opacity = binaryFlag;
  element.style.visibility = "visible";
}

async function getContent() {
  const content = await Utils.readJsonFile(contentPath);
  return content;
}
