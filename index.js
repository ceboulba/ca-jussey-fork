import "./style.css";
import cloudinary from "cloudinary-core";
import * as BABYLON from "babylonjs";
var cl = new cloudinary.Cloudinary({
  cloud_name: "archipicture",
  secure: true
});

// var tag = cl.imageTag("ca-jussey");
// tag.toHtml();

const canvas = document.getElementById("renderCanvas");
const imgBox = document.querySelector(".box-container");
const imgView = document.getElementById("img-view");
const viewType = document.querySelector(".view-type");
const imageName = document.querySelector(".imageName");
let num = 0;

const imgs = [
  "https://res.cloudinary.com/archipicture/image/upload/v1563284170/clot-des-orangers/clots-des-orangets-00.jpg",
  "https://res.cloudinary.com/archipicture/image/upload/v1580713699/ca-jussey/cam01.jpg",
  "https://res.cloudinary.com/archipicture/image/upload/v1580719118/ca-jussey/cam08.jpg",
  "https://res.cloudinary.com/archipicture/image/upload/v1580715376/ca-jussey/cam10.jpg",
  "https://res.cloudinary.com/archipicture/image/upload/v1580715596/ca-jussey/cam09.jpg",
  "https://res.cloudinary.com/archipicture/image/upload/v1580719923/ca-jussey/cam16.jpg",
  "https://res.cloudinary.com/archipicture/image/upload/v1580733315/ca-jussey/cam05.jpg",
  "https://res.cloudinary.com/archipicture/image/upload/v1580736995/ca-jussey/cam18.jpg",
  "https://res.cloudinary.com/archipicture/image/upload/v1580720640/ca-jussey/cam11.jpg",
  "https://res.cloudinary.com/archipicture/image/upload/v1580721036/ca-jussey/cam20.jpg"
];

const imgName = [
  "Vue axo 01",
  "Vue axo 02",
  "Vue 01",
  "Vue 02",
  "Vue 03",
  "Vue 04",
  "Vue 05",
  "Vue 06",
  "Vue 07",
  "Vue 08",
  "Vue 09"
];


const btnPrev = document
  .getElementById("btnPrev")
  .addEventListener("click", () => prev());

const btnNext = document
  .getElementById("btnNext")
  .addEventListener("click", (num) => next(num));

var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.ArcRotateCamera(
    "Camera",
    9,
    Math.PI / 2,
    2,
    BABYLON.Vector3.Zero(),
    scene
  );

  let zoomLevel = 2;

  camera.attachControl(canvas, true);
  camera.inputs.attached.mousewheel.detachControl(canvas);
  //camera.lowerAlphaLimit = .85
  //camera.upperAlphaLimit = 4.77


  const assetsManager = new BABYLON.AssetsManager(scene);
  const binaryTask = assetsManager.addBinaryFileTask("binary task", imgs[num]);

  // var dome = new BABYLON.PhotoDome(
  //   'testdome',
  //   // imgs[num],
  //   binaryTask.url,
  //   {
  //     resolution: 32,
  //     size: 15,
  //     useDirectMapping: false,
  //   },
  //   scene
  // )

  //assetsManager.onTaskSuccessObservable.add(function(task) {
  //});

  binaryTask.onSuccess = function (task) {
    console.log('SUCCES !')
    var dome = new BABYLON.PhotoDome(
      "testdome",
       //imgs[num],
      binaryTask.url,
      {
        resolution: 32,
        size: 15,
        useDirectMapping: false
      },
      scene
    );
      // Do something with task.data
  }

  //  assetsManager.onFinish = function (tasks) {
  //       engine.runRenderLoop(function () {
  //           scene.render();
  //       });
  //   };

  assetsManager.load();

  return scene;
};

const scene = createScene();

//  AssetsManager
// const assetsManager = new BABYLON.AssetsManager(scene)

// var imageTask = assetsManager.addImageTask("image task", "https://res.cloudinary.com/archipicture/image/upload/v1580715596/ca-jussey/cam09.jpg");
// imageTask.onSuccess = function(task) {
//     console.log(task.image.src);
// }

// assetsManager.load()

const check = () => {
  console.log("num = ", num);
  num === 0
    ? //num <= 1 ?
      (() => {
        canvas.classList.add("hide");
        imgBox.classList.remove("hide");
        viewType.classList.add("hide");
        imgBox.innerHTML = htmlCode
      })()
    : (() => {
        canvas.classList.remove("hide");
        viewType.classList.remove("hide");
        imgBox.classList.add("hide");
      })();
  // scene.render()
  //num === 0 ? imgView.src = imgs[0] : null
  //num === 1 ? imgView.src = imgs[1] : null
  //num === 5 ? imgView.src = imgs[5] : null
};

const htmlCode = `
	<div id="img-box" class="image-box">
		<figure class="image canvas">
			<img id="img-view" 
      class="view-content" src="https://res.cloudinary.com/archipicture/image/upload/v1563284170/clot-des-orangers/clots-des-orangets-00.jpg" />
     </figure>
	</div>
`

check(num);

const next = () => {
  num < imgs.length - 1 ? num++ : (num = 0);
  scene = createScene();
  check();
};

const prev = () => {
  //event.preventDefault()
  num === 0 ? (num = imgs.length - 1) : num--;
  scene = createScene();
  check();
};

engine.runRenderLoop(function() {
  imageName.innerHTML = imgName[num];
  scene.render();
});

if (num !== 0) {
  window.addEventListener("resize", function() {
    engine.resize();
  });
}
