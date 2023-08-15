const config = {
    development: {
      backendUrl: "http://localhost:5000/openai/generateimage",
    },
    production: {
      backendUrl: "https://devswag.onrender.com/api/v1/dalle",
    },
  };
  
  export default config;