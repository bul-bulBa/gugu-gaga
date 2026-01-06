import { PORT } from "../api/interceptor";

// 25
// I created a URL for the link in the backend and set the URL to the server as localhost. 
// When I hosted the server, these URLs stopped working. 
// To avoid losing these images, I created the following workaround
export const urlSlice = (url: string) => {
    return url.replace('http://localhost:5000/api', PORT)
}