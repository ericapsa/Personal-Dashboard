// TO-DO 
function newItem(){
  var item = document.getElementById("input").value;
  console.log(item);
  /*Store the list element in a var*/
  var list = document.getElementById("list");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode("☀ " + item));
  list.appendChild(li);
  /*Clear the text in the box*/
  document.getElementById("input").value = " ";
  li.onclick = removeItem;
}
function removeItem(e) {
  e.target.remove();
}
document.body.onkeyup = function(e) {
  if (e.keyCode == 13){
    console.log("enter clicked!");
    newItem();
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
        temperature.innerHTML = "Today it is " + temp + "° F and " + data.weather[0].main + " in " + data.name;
        /* temperature.innerHTML = temp + ;
        location.innerHTML =
          data.name /*+ " (" + latitude + "°, " + longitude + "°)";
        description.innerHTML = data.weather[0].main; */
      });
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
}


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
 
var name = "Welcome back!"
var i = 0;

// TYPING
function typeName() {
  if (i<name.length){
    // steals html item from my html thru ID
    var nameHeader = document.getElementById("welcome");
    // prints out to the console
    console.log(nameHeader);
    nameHeader.innerHTML = nameHeader.innerHTML + name.charAt(i);
    i = i +1;
    // How long the type function will run
    setTimeout(typeName,100);
  }
}

window.onload = typeName;
getWeather();
