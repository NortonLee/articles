var current_image;
var next_img_num = 0;
var current_img_num;
var img_num = 944;

function backgroundImage() {
    var img_path = '/assets/images/';
    // var img_path = 'http://localhost:8080/assets/images/';
    var random_img_num = function () {
        return Math.floor(Math.random() * img_num + 1);
    };

    current_img_num = next_img_num != 0 ? next_img_num : random_img_num();
    next_img_num = random_img_num();

    var img_url = function (img_num) {
        return img_path + 'bg_' + img_num + '.jpg';
    };

    if (current_image === undefined) {
        current_image = img_url(current_img_num);
    }

    // preLoadImg(img_url(next_img_num));

    var header = $(".header").get(0).style;
    header.backgroundSize = 'cover';
    header.backgroundRepeat = 'no-repeat';
    setTimeout(function () {
        header.backgroundImage = 'url(' + current_image + ')';
    });
    var span = document.getElementById('img_placer');
    span.innerHTML = '<span style="background-image: url(' + (current_image = img_url(current_img_num)) + ');width: 0px;height: 0px;display: inline;"></span>';
}

function preLoadImg(url) {
    var img = new Image();
    img.src = url;
}

function backgroundVideo() {
    var bg_video_array = [
        "http://pic.ibaotu.com/00/29/00/66u888piCstw.mp4",
        "http://pic.ibaotu.com/00/29/19/17W888piC8ES.mp4",
        "http://pic.ibaotu.com/00/29/27/24A888piCGtw.mp4",
        "http://pic.ibaotu.com/00/29/46/80K888piCHq9.mp4",
        "http://pic.ibaotu.com/00/21/03/24j888piC9UQ.mp4",
        "http://pic.ibaotu.com/00/29/20/04J888piCicZ.mp4",
        "http://pic.ibaotu.com/00/21/58/30n888piCX8R.mp4",
        "http://pic.ibaotu.com/00/27/86/49D888piCeGq.mp4",
        "http://assets.serpent.ai/serpent_bg.mp4"
    ];
    var random_video_num = function () {
        return Math.floor(Math.random() * bg_video_array.length);
    };
    var index = random_video_num();
    var video_html = '<video autoplay loop muted style="background-color: black;filter: blur(1px);"><source id="bg-video" src=' + bg_video_array[index] + ' type="video/mp4"></video>';
    $(".header-video").append(video_html);
}

var randomType = Math.floor(Math.random() * 2);
if(randomType == 0){
    backgroundVideo();
}else{
    backgroundImage()
}

// setInterval(function () {
//     backgroundImage()
// }, 4000);