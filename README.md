## Get ☀️ weather ⛈️ data 🌈

Here's a single webpage in vanilla _Javascript_ to get weather data by requesting an `API`.

Put the name of the city you are looking for and hopefully you'll get what you need 😁.

You'll need to subscribe to `Openweather` API to get the key to fetch data.
👉 https://openweathermap.org/api


Add this function to your env.js file :
```
function getApiKey(){
    return 'YOUR SECRET API KEY'}
```

#### Launch the program with Docker:

1- Build the Docker image:

`$docker build -t my-app .`

2- Run the container:

`$docker run -p 8000:80 my-app:latest`

Show page on a web explorer page @http://localhost:8000/

Emojis can be found [here](https://emojipedia.org/).