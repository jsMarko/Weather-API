// Add EventListener to BUTTON **** CLICK EVENT
document.querySelector("#getText").addEventListener("click", getTextFunc);
document.querySelector("#getUsers").addEventListener("click", getUsersFunc);
document.querySelector("#getApi").addEventListener("click", getApiFunc);

function getTextFunc() {
   fetch("myText.txt")
      .then((res) => res.text())
      .then((data) => {
         document.querySelector("#result").innerHTML = data;
      })
      .catch((err) => console.log("error"));
}

function getUsersFunc() {
   fetch("users.json")
      .then((res) => res.json())
      .then((data) => {
         let output = `<h1>List of Users</h1>`;
         data.forEach(function (user) {
            output += `
         <li>    
           <ul class='list'>
             <li>ID: ${user.id}</li>
             <li>NAME: ${user.name}</li>
             <li>EMAIL: ${user.email}</li>
           </ul>
          </li>
       `;
         });
         document.querySelector("#myList").innerHTML = output;
      });
}

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=Broken+Arrow&units=imperial&appid=";
const apiKey = "3a8b21781d624f82a82ceb29137dda93";
let city = "Broken Arrow";

function getApiFunc() {
   fetch(baseUrl + apiKey)
      .then((res) => res.json())
      .then((data) => {
         document.querySelector("#grid-1").innerHTML = data.name;
         document.querySelector("#mainTemp").innerHTML = `${Math.round(data.main.temp) + "º"}`;
         document.querySelector("#feelsLike").innerHTML = `Feels like: ${Math.round(data.main.feels_like) + "º"}`;
         document.querySelector("#description").innerHTML = data.weather[0].description;
         document.querySelector("#grid-4").innerHTML = `Humidity: ${data.main.humidity}%`;

         //  Building icon url for display
         const weatherIcon = data.weather[0].icon + "@2x.png";
         const iconURL = "http://openweathermap.org/img/wn/" + weatherIcon;

         document.querySelector("#icon").style.backgroundImage = `url(${iconURL})`;

         // for debugging
         console.log(data);
         console.log(data.name);
         console.log(`Temperature: ${Math.round(data.main.temp)}º`);
         console.log(` Feels Like: ${Math.round(data.main.feels_like)}º`);
         console.log(`   Humidity: ${data.main.humidity}%`);
         console.log(`${data.weather[0].description}`);
      });
}
