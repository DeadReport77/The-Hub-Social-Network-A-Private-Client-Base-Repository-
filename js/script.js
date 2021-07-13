let canvas = document.getElementById('my-canvas');
canvas.width = document.getElementById("div1").offsetWidth;
canvas.height = document.getElementById("div1").offsetHeight;

let context = canvas.getContext("2d");
context.filter = '';

let fileInput = document.getElementById('input');
let img = new Image();


function upload() {
    fileInput.onchange = function (evt) {
        var files = evt.target.files;
        var file = files[0];
        if (file.type.match('image.*')) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (evt) {
                if (evt.target.readyState == FileReader.DONE) {
                    img.src = evt.target.result;
                    img.onload = () => context.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
            }
        } else {
            alert("This is not an image.");
        }
    }
}

filters = {
    greyFilter: '',
    sepiaFilter: '',
    brightnessFilter: '',
    invertFilter: '',
    blurFilter: ''
};

let grey = document.getElementById('grey');
grey.addEventListener('input', function () {
    let greyFilter = 'grayscale('+ grey.value +')';
    filters.greyFilter = greyFilter;
    applyFilter(filters);
});

let sepia = document.getElementById('sepia');
sepia.addEventListener('input', function () {
    let sepiaFilter = 'sepia('+ sepia.value +')';
    filters.sepiaFilter = sepiaFilter;
    applyFilter(filters);
});

let brightness = document.getElementById('brightness');
brightness.addEventListener('input', function () {
    let brightnessFilter = 'brightness('+ brightness.value +')';
    filters.brightnessFilter = brightnessFilter;
    applyFilter(filters);
});

let invert = document.getElementById('invert');
invert.addEventListener('input', function () {
    let invertFilter = 'invert('+ invert.value +')';
    filters.invertFilter = invertFilter;
    applyFilter(filters);
});

let blur = document.getElementById('blur');
blur.addEventListener('input', function () {
    let blurFilter = 'blur('+ blur.value +'px)';
    filters.blurFilter = blurFilter;
    applyFilter(filters);
});

var download = document.getElementById('download');
download.onclick = function () {
    var link = document.createElement('a');
    link.download = 'image.png';
    link.href = document.getElementById('my-canvas').toDataURL();
    link.click();
};

function applyFilter(filters) {
    context.filter = filters.sepiaFilter + filters.greyFilter + filters.brightnessFilter + filters.invertFilter + filters.blurFilter;
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
}

document.getElementById('btnInput').onclick = function() {
    document.getElementById('input').click();
};
