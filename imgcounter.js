// initialize tag count
let tagCount = 1;

// get canvas and its 2D context
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');

// create input element for image selection
const imageInput = document.createElement('input');
imageInput.type = 'file';
imageInput.accept = 'image/*';
imageInput.style.display = 'none';

// event listener for "Import Image" button
document.getElementById('importButton').addEventListener('click', function() {
    imageInput.click();
});

// event listener for image selection
imageInput.addEventListener('change', function(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // load the selected image into the canvas
            const img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// event listener for canvas click (tag creation)
canvas.addEventListener('click', function(event) {
    // create a tag element
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = tagCount++;
    // calculate tag position relative to canvas
    const left = event.clientX - canvas.getBoundingClientRect().left - 1; // Adjust for the canvas border
    const top = event.clientY - canvas.getBoundingClientRect().top - 1; // Adjust for the canvas border
    // set tag position
    tag.style.left = `${left}px`;
    tag.style.top = `${top}px`;
    // append tag to the canvas container
    document.getElementById('canvasContainer').appendChild(tag);
    // add click event listener to remove the tag
    tag.addEventListener('click', function() {
        removeTag(tag);
    });
});

// function to remove a tag
function removeTag(tag) {
    // remove the tag from the canvas container
    document.getElementById('canvasContainer').removeChild(tag);
}
