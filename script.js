const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 1;
const apiKey = 'QNef9XpI4FP1-PXebPApOXwluf276eq1u0udd6twR9A';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded (){

 imagesLoaded++
 console.log('imgaes',imagesLoaded)
 console.log('total',totalImages)
 if (imagesLoaded == totalImages)
    ready = true;
    loader.hidden = true
}

// Helper function To set Attribute on Dom Element
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Element For Links & Photos, Add To Dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
  // Run Functionfor each object in PhotosAray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    // Create Image for photo
    const img = document.createElement('img');

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // img.setAttribute('src', photo.urls.regular);

    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);

    // Event Listener, check when each is finish loading
    img.addEventListener('load', imageLoaded)

    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (err) {}
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    ready = false;
    getPhotos();

  }
})

// On Load
getPhotos();
