// get Element
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
// Switch Dark Mode get Element
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleText = document.getElementById("toggle-icon");

// initialize
let imageLoadedFinish = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Check Loacl Storage for theme
const currentTheme = localStorage.getItem("theme");
if(currentTheme === "dark") {
    toggleSwitch.checked = true
    document.documentElement.setAttribute("data-theme", "dark")
    toggleText.children[0].textContent = "Dark Mode"
} else if (currentTheme === "light") {
    toggleSwitch.checked = false
    document.documentElement.setAttribute("data-theme", "light")
    toggleText.children[0].textContent = "Light Mode"
}

// Unsplash API
let count = 5;
const YOUR_ACCESS_KEY = "hQuNkivTNLcBLZywpi3JfzRwM8t63b7SwJXrSDbloTI";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${YOUR_ACCESS_KEY}&count=${count}`

// Check if all of images were loaded
const imageLoaded = () => {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        imageLoadedFinish = true;
        loader.hidden = true;
        imagesLoaded = 0;
    }
}

// Create Elements for Link & Photos, Add to DOM;
const displayPhotos = () => {
    totalImages = photosArray.length;
    // Run function to each object in Array
    photosArray.forEach((photo) => {
        // Create <a> to link to Unplash
        const item = document.createElement("a");
        item.setAttribute("href", photo.links.html);
        item.setAttribute("target", "_blank");
        // Create <img> for photo
        const img = document.createElement("img");
        img.setAttribute("src", photo.urls.regular);
        img.setAttribute("alt", photo.alt_description);
        img.setAttribute("title", photo.alt_description);
        img.addEventListener("load", imageLoaded);
        // put img & a into image-container
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos from Unsplash API
const getPhotos = async () => {
    try {
        const reponse = await fetch(apiURL);
        photosArray = await reponse.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}
getPhotos();

// handle switch Dark Mode
const switchTheme = (e) => {
    if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark")
        toggleText.children[0].textContent = "Dark Mode"
        localStorage.setItem("theme", "dark")
    } else {
        document.documentElement.setAttribute("data-theme", "light")
        toggleText.children[0].textContent = "Light Mode"
        localStorage.setItem("theme", "light")
    }
}

// add acroll event listener to window
window.addEventListener("scroll", () => {
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1080) && imageLoadedFinish ) {
        imageLoadedFinish = false;
        getPhotos();
    }
})

// Dark Mode Switch Change event listener
toggleSwitch.addEventListener("change", switchTheme)