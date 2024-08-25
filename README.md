# Weather Application

This is a weather application built with React, displaying current weather and a 5-day forecast for any city. It supports temperature units in Celsius and Fahrenheit, and features responsive design for both desktop and mobile.

## Features

- Search for weather by city name.
- View current weather details.
- Toggle between Celsius and Fahrenheit.
- View a 5-day weather forecast.
- Responsive design for mobile and desktop.

## Technologies Used

- React
- Axios
- React Animated Weather
- HTML/CSS

## Setup and Installation

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (which includes npm)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

### Clone the Repository

```bash
git clone https://github.com/Ajaypratap4015/ajay-pratap-singh-wasserstoff-FullstackInternTask.git
```

### Install Dependencies
Run the following command to install the required npm packages:

```bash
npm install
```

### API Keys
1. Create a .env file in the root of the project.

2. Add your API keys to the .env file using the following format:
   REACT_APP_API_KEY=your_openweathermap_api_key
3. Update apiKeys.js to use the environment variable:
``` bash
   const apiKeys = {
  base: "https://api.openweathermap.org/data/2.5/",
  key: process.env.REACT_APP_API_KEY,
};

export default apiKeys;
```
### Run the Application
Start the development server with:

```bash
npm start
```

### Contributing
Feel free to open issues or submit pull requests if you find any bugs or have suggestions for improvements.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgements
OpenWeatherMap API for weather data.
React for building the user interface.
Axios for making HTTP requests.
React Animated Weather for animated weather icons.

### Screenshot
![Screenshot 2024-08-26 004649](https://github.com/user-attachments/assets/51228f00-60b4-402c-8d2b-d5d7acdf0b66)


