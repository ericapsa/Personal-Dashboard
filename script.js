// TO-DO

// localStorage.clear()
var storage = localStorage.getItem("TODO");

function loadList(array){
  array.forEach(function(item) {
    newItem(item.name, item.trash, item.id);
  });
}

if (storage) {
  // changes JSON string into Javascript object so you can manipulate it again
  data = JSON.parse(storage);
  // if storage, bring that list into data
  console.log("about to add old data");
  loadList(data);
  // set up for next todo item
  id = data.length;
} else {
  // initialize vars to "nothing"
  id = 0;
  data = [];
}

function newItem(todo, trash, id){

  if(trash === true){
    return; // exit this if i dont want anything done
  }

  var item = document.getElementById("input").value;
  console.log(item);
  /*Store the list element in a var*/
  var list = document.getElementById("list");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode("☀ " + todo));
  li.setAttribute('id', id);
  list.appendChild(li);
  /*Clear the text in the box*/
  document.getElementById("input").value = "";
  li.onclick = removeItem;
}

function removeItem(event) {
  element = event.target;
  element.remove();
  confetti.start(1000);

  //gonna check all items and if there is a match with the item in the list and the current element e we called remove on, we are marking it as trash
  data.forEach(function(item){
    if (item.id == element.id){
      item.trash = true;
    }
  })
  localStorage.setItem("TODO", JSON.stringify(data));
}

document.body.onkeyup = function(e) {
  todo = document.getElementById("input").value;

  if (e.keyCode == 13){
    //adding it to the front end
    newItem(todo, false, id);

    // add the todo struct into the backend storage with the correct info
    data.push({
      name: todo,
      trash: false,
      id: id

    });
    // note: need commas to separate items in struct- i was getting so many syntax errors lmao

    localStorage.setItem("TODO", JSON.stringify(data));

    //now that the item has been added, change the id var for the next one
    id++;

  }

}
// ^^ TO-DO

// WEATHER 08835f670ab2327e9a93f3f584c2a946
function getWeather() {
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let location = document.getElementById("location");

  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "08835f670ab2327e9a93f3f584c2a946";

  temperature.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let urlW =
      api +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=imperial";

    fetch(urlW)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let temp = data.main.temp;
        // temperature.innerHTML = "Today it is " + temp + "° F and " + data.weather[0].main + " in " + data.name;
        /* temperature.innerHTML = temp + ;
        location.innerHTML =
          data.name /*+ " (" + latitude + "°, " + longitude + "°)";
        description.innerHTML = data.weather[0].main; */
        var celcius = math.round((temp - 32) * (5/9));
        if (data.sys.country == "US") {
          temperature.innerHTML = "Today it is " + temp + "° F and " + data.weather[0].main + " in " + data.name;
        } else {
          temperature.innerHTML = "Today it is " + celcius + "° C and " + data.weather[0].main + " in " + data.name;
        }
      });
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
}
getWeather();

// NEWS
let url = "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=Gm3ZhZcGZYX7AC1QmrAGViKZg7Udw9Br";
let headlines = document.getElementById("headlines");

fetch(url).then(response => response.json()).then(data => {  console.log(data);  data.results.slice(0,5).map(article => {    console.log(article.title);
 let a = document.createElement("a");
 a.setAttribute('href', article.url);
 a.innerHTML = article.title;

 let p = document.createElement("p");
 p.innerHTML = article.abstract;

 let img = document.createElement("img");
 img.setAttribute('src', article.multimedia[0].url);

  headlines.appendChild(img);
  headlines.appendChild(a);
  headlines.appendChild(p);

 })
 })

var welcome = "Welcome back!";
var i = 0;

// TYPING
function typeName() {
  if (i<welcome.length){
    // steals html item from my html thru ID
    var nameHeader = document.getElementById("welcome");
    // prints out to the console
    console.log(nameHeader);
    nameHeader.innerHTML = nameHeader.innerHTML + welcome.charAt(i);
    i = i +1;
    // How long the type function will run
    setTimeout(typeName,100);
  }
}

window.onload = typeName;



// COLOR GENERATOR
function getColor() {
  return (
    "#" +
    Math.random()
      .toString(16)
      .slice(2, 8)
  );
}
function setBackground() {
  var bgColor = getColor();
  console.log("color: "+ bgColor);
  document.getElementById("color_block").style.cssText = "background-color: "+ bgColor + ";";
}
setBackground();


// WORD GENERATOR
function randomWord() {
  // lists stored in separate files

  // pick a random word from lists
  var random_noun = nouns[Math.floor(Math.random()*nouns.length)];
  var random_adj = adjs[Math.floor(Math.random()*adjs.length)];

  console.log(random_adj);
  console.log(random_noun);

  var nounBox = document.getElementById("noun");
  var adjBox = document.getElementById("adjective");

  // set the word in the area
  nounBox.innerHTML = random_noun;
  adjBox.innerHTML = random_adj;
}
randomWord();

// REFRESH BUTTON
function click(){
  var audio = new Audio('FasterClick.m4a');
  audio.play();
}

function refreshAll() {
  randomWord();
  setBackground();
  click();
}
