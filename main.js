var gesture1= ""
var gesture2= ""

Webcam.set({
    width:350,
    height: 300,
    image_format: "png",
    png_quality: 90
})

Webcam.attach("#camera")

function takeSnapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML= "<img id='snapshot' src='" + data_uri + "'>"
    })
}

console.log(ml5.version)
classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/8PIMQSSEa/model.json", modelLoaded)

function modelLoaded() {
    console.log("model is loaded")
}

function speak() {
    synth= window.SpeechSynthesis
    speakData= "The first prediction is " + prediction1 + ". The second prediction is " + prediction2 + "."
    utterThis= new SpeechSynthesisUtterance(speakData)
    synth.speak(utterThis)
}

function predictGesture() {
    var img= document.getElementById("snapshot")
    classifier.classify(img, gotResults)
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    }

    else {
        console.log(results)
        document.getElementById("gesture1").innerHTML= results[0].label
        document.getElementById("gesture2").innerHTML= results[1].label
        prediction1= results[0].label
        prediction2= results[1].label
        speak()

        if (prediction1=="Peace") {
            document.getElementById("predictionGesture1").innerHTML= "✌️"
        }

        if (prediction1=="OK") {
            document.getElementById("predictionGesture1").innerHTML= "👌"
        }

        if (prediction1=="Good") {
            document.getElementById("predictionGesture1").innerHTML= "👍"
        }

        if (prediction2=="Peace") {
            document.getElementById("predictionGesture2").innerHTML= "✌️"
        }

        if (prediction2=="OK") {
            document.getElementById("predictionGesture2").innerHTML= "👌"
        }

        if (prediction2=="Good") {
            document.getElementById("predictionGesture2").innerHTML= "👍"
        }
    }
}
