const addtask = document.getElementById("addtask");
const tb = document.getElementById("tb");
const Tasklist = document.getElementById("Tasklist");
const count = document.getElementById("count");

let tasks = [];

tb.addEventListener("click", function () 
{
    let text = addtask.value.trim();
    if (text === "")
        {
        alert("You have entered an empty task!!")
        return;
        }

    tasks.push({ text: text, completed: false });
    addtask.value = "";
    showTasks();
});

function showTasks() 
{
    Tasklist.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) 
    {
        let task=tasks[i];

        let li=document.createElement("li");

        let checkbox=document.createElement("input");
        checkbox.type="checkbox";
        checkbox.checked=task.completed;

        let span=document.createElement("span");
        span.textContent=task.text;

        function applyStyle()
        {
            span.style.textDecoration=task.completed ? "line-through" : "none";
            li.style.backgroundColor=task.completed ? "#b6f2b6" : "";
        }

        applyStyle(); // runs when the li is first built

        checkbox.addEventListener("change", function (){
            task.completed=checkbox.checked;
            applyStyle(); // runs on every tick/untick
            updateCounts();
        });

        let delBtn=document.createElement("button");
        delBtn.textContent="Delete";

        delBtn.addEventListener("click", function () {
            let index=tasks.indexOf(task);
            tasks.splice(index, 1);
            showTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(delBtn);
        Tasklist.appendChild(li);
    }

    updateCounts();
}

function updateCounts() 
{
    let completedCount = 0;
    for (let i=0;i<tasks.length;i++) 
    {
        if (tasks[i].completed) 
        {
            completedCount++;
        }
    }

    count.textContent = "Total Tasks: "+tasks.length+" | Completed Tasks: "+completedCount+" | Remaining Tasks: "+(tasks.length-completedCount);
}




//Weather API
const button = document.getElementById("getLocbtn");

async function getWeather(latitude, longitude) {
    const promise=await fetch(`http://api.weatherapi.com/v1/current.json?key=aca3fcec52c843b385f95656260610&q=${latitude},${longitude}&aqi=yes`)
    return await promise.json()
}
async function gotLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const weatherData = await getWeather(position.coords.latitude, position.coords.longitude);
    console.log(weatherData);
    const weatherInfoDiv = document.getElementById("weatherInfo");
    weatherInfoDiv.innerHTML = `
        <p>Location: ${weatherData.location.name}</p>
        <p>Temperature: ${weatherData.current.temp_c}°C</p>
        <p>Weather: ${weatherData.current.condition.text}</p>
    `;
}
function failedToGetLocation() {
    console.log("Failed to get location");
}

button.addEventListener("click",async () => {
    const result=navigator.geolocation.getCurrentPosition(gotLocation,failedToGetLocation)
    
})