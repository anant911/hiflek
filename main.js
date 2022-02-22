var previous_results='';
function setup() {
  canvas = createCanvas(300, 300);
  canvas.position(800,400);
  video = createCapture(VIDEO);
  video.hide();
  classifier= ml5.imageClassifier('MobileNet',modelLoaded);
}

function modelLoaded()
{
  console.log('Model is Loaded');
}

function draw()
{
image(video,0,0,300,300);
classifier.classify(video, gotResult);
}

function gotResult(error,results)
{
if(error)
{
  console.error(error);
} else{
  if((results[0].confidence>0.5)&&(previous_results != results[0].label)){
    console.log(results);
    previous_results=results[0].label;
    var synth= window.speechSynthesis;
    speak_data= 'Object detected is-'+results[0].Label;
    var utterThis= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);

    document.getElementById("obj").innerHTML=results[0].label;
    document.getElementById("acc").innerHTML=results[0].confidence.toFixed(3);

  }
}
}



