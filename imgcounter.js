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
// list to store all tags
const tagsList = [];

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
    const left = event.clientX - canvas.getBoundingClientRect().left - 1; // adjust for the canvas border
    const top = event.clientY - canvas.getBoundingClientRect().top - 1; // adjust for the canvas border
    // set tag position
    tag.style.left = `${left}px`;
    tag.style.top = `${top}px`;
    // append tag to the canvas container
    document.getElementById('canvasContainer').appendChild(tag);
    // add tag to the list
    tagsList.push(tag);
});

// event listener for "Undo" button
document.getElementById('undoButton').addEventListener('click', function() {
    // Decrease the tag count by 1
    if (tagCount > 1) {
        tagCount--;
    }
    // remove the last added tag from the list
    const lastTag = tagsList.pop();
    // remove the last added tag from the canvas
    if (lastTag) {
        lastTag.parentNode.removeChild(lastTag);
    }
});

// event listener for "Clear All" button
document.getElementById('clearAllButton').addEventListener('click', function() {
    // reset the tag count to 1
    tagCount = 1;

    // remove all tags from the list
    tagsList.forEach(tag => {
        tag.parentNode.removeChild(tag);
    });

    // clear the list
    tagsList.length = 0;
});
