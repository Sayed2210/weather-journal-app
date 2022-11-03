/* Global Variables */
const baseURL= 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey= ',&appid=8d4857d5181f57c8927265fd947e6626&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

//callback function to execute when it is clicked
const action= () => {
    const newZip= document.getElementById('zip').value;
    const feelings= document.getElementById('feelings').value;
//Function to GET Web API DATA
    getWeather(baseURL,newZip,apiKey).then((data) => {
        postData('/add',{
            date:newDate,
            temp:data.main.temp,
            content:feelings
        })
        updateUI();
    })
}

/*Create an event listener for the element with the id: generate,
 with a callback function to execute when it is clicked.*/
document.getElementById('generate').addEventListener('click',action);

//Write an async function in app.js that uses fetch() to make a GET request to the OpenWeatherMap API.
async function getWeather(baseURL,newZip,apiKey) {
    const res = await fetch(baseURL+newZip+apiKey)
    try {
        const data= await res.json();
         if (data.cod != 200){
            throw `${data.message}`;
         }
         return data;
    } catch (error) {
        console.log("error"+error);
    }    
}

//postData function to send Data
const postData = async(url = `${baseURL,newZip,apiKey}`, data ={} )=>{
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try{
        const newDate = await res.json();
        if (res.status !== 200) throw Error(data.message);
        return newDate;      
    } catch(error){
        console.log("error"+error);
    }
}

//updates the UI dynamically Write another async function that is called after the completed POST request
async function updateUI(){
    const req= await fetch('/all');
    try {
        const allData= await req.json();
        document.getElementById('date').innerHTML= `Data : ${allData.date}`;
        document.getElementById('temp').innerHTML= `temp : ${allData.temp}`;
        document.getElementById('content').innerHTML= `Fellings : ${allData.content}`;
    } catch (error) {
        console.log('error'+error);
    }
}



