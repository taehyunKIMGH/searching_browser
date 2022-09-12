const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const  HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function  onLoginSubmit(info){
    info.preventDefault();
    const username = loginInput.value;
    loginForm.classList.add(HIDDEN_CLASSNAME);
    localStorage.setItem(USERNAME_KEY,username);
    paintFreetings(username);
}

function paintFreetings(username){
    greeting.innerText = `어서오세요 ${username}님`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
}else{
    paintFreetings(savedUsername);  
    loginForm.classList.add(HIDDEN_CLASSNAME);  
}

const clock = document.querySelector("h2#clock");

function getClock(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}
getClock();
setInterval(getClock,1000);

const body = document.querySelector('body');
const img_num = 7;
function paintImage(imgNumber){
    const image = new Image();
    image.src = `image/${imgNumber}.jpg`;
    image.classList.add('background_img');
    body.style.backgroundImage = `url('${image.src}')`;
}

function getRandom(){
    const number = Math.floor(Math.random() * img_num);
    return number;
}

function init(){
    const random = getRandom();
    paintImage(random);
}

init();

const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

let toDos = [];

function saveToDos(){
    localStorage.setItem("todos", JSON.stringify(toDos));
}

function deletetodo(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id
    const span = document.createElement("span");
    const i = document.createElement("i");
    span.innerText = newTodo.text + ' ';
    i.addEventListener("click", deletetodo)
    li.appendChild(span);
    li.appendChild(i);
    i.setAttribute("class", "fa-solid fa-square-minus");
    toDoList.append(li);
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text : newTodo,
        id : Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit",handleToDoSubmit);

function sayHello(item){
    paintToDo(item);
}

const savedToDos = localStorage.getItem("todos");
console.log(savedToDos);
if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

const API_KEY = "fca06edecd0289d546a7d17c143b1ef8";

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const  url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            const weatherContainer = document.querySelector("#weather span:first-child");
            const cityContainer = document.querySelector("#weather span:last-child");
            cityContainer.innerText = data.name;
            weatherContainer.innerText = `${data.weather[0].main} / ${data.main.temp}`
        });
}

function onGeoError(){
    alert("Can't find you. No weather for you.");
}

 navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

 const search = document.querySelector('#search');
 const searchtitle = document.querySelector("#searching");
 const searchbutton = document.querySelector("#gosearch");
 search.addEventListener("submit", gosearch);
 searchbutton.addEventListener('click',gosearch);
 function gosearch(event){
    if(searchtitle.value == ""){
        alert("검색할 내용을 입력해주세요");
    }else{
        event.preventDefault();
        location.href = `https://www.google.com/search?q=${searchtitle.value}`;
    }
 }

 $("#file").on('change',function(){
    var fileName = $("#file").val();
    $(".upload-name").val(fileName);
  });