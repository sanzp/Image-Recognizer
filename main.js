//https://teachablemachine.withgoogle.com/models/381zA0fCx/
Webcam.set({
    width: 400,
    height: 350,
    image_format: 'png',
    png_quality: 90
});
//webcam .set is used to set the camera properties before it loads..
camera = document.getElementById("input");
Webcam.attach('#input');
//webcam.atach is used to attah the camera in the output window..
function capture() {
    Webcam.snap(
        function (data_uri) {
            document.getElementById("output").innerHTML = "<img id='captured' src='" + data_uri + "'>"
        }
    )
}
//webcam.snap is used to click the picture and show it on the output div tag
//machine learning starts from here
console.log('ml5version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/381zA0fCx/model.json', modelLoaded);

function modelLoaded() {
    console.log("model loaded");

}

function identify() {
    img = document.getElementById("captured");
    classifier.classify(img, gotresult);
}

function gotresult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById('o_name').innerHTML=results[0].label;
        percentage=results[0].confidence.toFixed(3);
        per=percentage*100;
        document.getElementById('o_acc').innerHTML=per+" %";
    }
}