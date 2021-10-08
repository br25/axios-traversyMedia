import React from "react";
import axios from "axios";



const Axios = () => {

	// Axios Globals
  axios.defaults.headers.common["X-Auth-Token"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";


  // Intercepting Req & Res
  axios.interceptors.request.use(
  	config => {
  		console.log(
  			`${config.method.toUpperCase()} request send to
  			${config.url} at ${new Date().getTime()}`);

  		return config;
  	},

  	error => {
  		return Promise.reject(error);
  	}
  );



  // Axios Instance
  const axiosInstance = axios.create({
    // Other custom settings
    baseURL: "https://jsonplaceholder.typicode.com"
  });
  // axiosInstance.get("/comments").then(res => showOutput(res));



  const handleClickGet = () => {
    axios ({
      method:"get",
      url:"https://jsonplaceholder.typicode.com/todos", 
      params:{ 
      	_limit: 2
      }
    })

	//OR SHOTCUT
	//axios
		//.get("https://jsonplaceholder.typicode.com/todos?_limit=5", { timeout:5000})
    .then(
      res => showOutput(res))
    .catch(
      err => console.error(err))
  };


  const handleClickPost = () => {
    axios
		.post("https://jsonplaceholder.typicode.com/todos",{
			title: "post title",
			head: "header",
			complete: false
		})

    .then(
      res => showOutput(res))
    .catch(
      err => console.error(err))
  };


  //UPDATING DATA PUT & PATCH


  const handleClickPut = () => {
	axios
		.put("https://jsonplaceholder.typicode.com/todos/1",{
			title: "put request",
		})
    .then(
      res => showOutput(res))
    .catch(
      err => console.error(err))
  };


  const handleClickPatch = () => {
    axios
		.patch("https://jsonplaceholder.typicode.com/todos/1",{
			footer: "this is patch footer",
			title: ""
		})

    .then(
      res => showOutput(res))
    .catch(
      err => console.error(err))
  };


  const handleClickDelete = () => {
    axios
		.delete("https://jsonplaceholder.typicode.com/todos/1")
	    .then(
	      res => showOutput(res))
	    .catch(
	      err => console.error(err))
  };



  const handleClickSimultaneous = () => {
    axios
		.all([
				axios.get("https://jsonplaceholder.typicode.com/todos?_limit=4"),
				axios.get("https://jsonplaceholder.typicode.com/posts?_limit=4")
			])

    .then(
      axios.spread((todos,posts) => showOutput(todos)))
    .catch(
      err => console.error(err))
  };



  const customHeaders = () => {
  	const config = {
  		headers:{
  			"Content-Type": "application/json",
  			Authorization: "sometoken"
  		}
  	};

  	
    axios
		.post("https://jsonplaceholder.typicode.com/todos",{
			title: "post title",
			head: "header",
			complete: false
		},
		config
		)

    .then(
      res => showOutput(res))
    .catch(
      err => console.error(err))
  
  };



  const transformResponse = () => {
    const options = {
      method:"post",
      url:"https://jsonplaceholder.typicode.com/todos",
      data:{
        title:"transformResponse"
      },
      transformResponse:axios.defaults.transformResponse.concat(data => {
        data.title = data.title.toUpperCase();
        return data;
      })
    };
    axios(options).then(res => showOutput(res));
  };



  const errorHandling = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todosddd")
      // ,{validateStatus: function(status) {
        //return status < 500; } Reject only if status is greater or equal to 500
      // }}
      .then(res => showOutput(res))
      .catch(err => {
        if(err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);

          if(err.response.status === 404) {
            alert("Error: Page Not Found");
          }
        } else if (err.request) {
          //request was made but no response
          console.error(err.request);
        } else {
          console.log(err.message);
        }
      });
  };


  const cancelToken = () => {
    const source = axios.CancelToken.source();
    axios
       .get("https://jsonplaceholder.typicode.com/todos", {
        cancelToken: source.token
       })
       .then(res => showOutput(res))
       .catch(thrown => {
        if(axios.isCancel(thrown)) {
          console.log("Request Canceled", thrown.message);
        }
       });

       if(true) {
        source.cancel("Request canceled!");
       }
  };



  //show data on browser
  const showOutput = (res) => {
  	
	    document.getElementById("res").innerHTML = `
	    <div>
	      <p>Status : ${res.status}</p>
	      <br>
	      <br>
	      <p>${JSON.stringify(res.headers, null, 2)}</p>
	      <br>
	      <br>
	      <p>${JSON.stringify(res.data, null, 2)}</p>
	      <br>
	      <br>
	      <p>${JSON.stringify(res.config, null, 2)}</p>
	    </div>
	    `
   
  };


  

  

    return(
        <div className="container mx-auto">
					<div className="d-flex justify-content-center fs-1 mt-4 bg-secondary text-white">
						Axios 18 Req & Res
					</div>
        	<div className="d-flex mt-4">
		        <div>
		          <button onClick={handleClickGet} className="bg-success text-white fs-6">Get</button>
		          <p id="res" />
		        </div>
		        <div>
		          <button onClick={handleClickPost} className="bg-info text-white fs-6">Post</button>   
		          <p id="res" />
		        </div>
		        <div>
		          <button onClick={handleClickPut} className="bg-warning text-white fs-6">Put</button>
		          <p id="res" />
		        </div>
		        <div>
		          <button onClick={handleClickPatch} className="bg-primary text-white fs-6">Patch</button>
		          <p id="res" />
		        </div>
		        <div>
		          <button onClick={handleClickDelete} className="bg-danger text-white fs-6">Delete</button>
		          <p id="res" />
		        </div>
		        <div>
		          <button onClick={handleClickSimultaneous} className="bg-dark text-white fs-6">Simultaneous</button>
		          <p id="res" />
		        </div>
		        <div>
		          <button onClick={customHeaders} className="bg-light text-dark fs-6">CustomHeaders</button>
		          <p id="res" />
		        </div>
            <div>
              <button onClick={transformResponse} className="bg-light text-dark fs-6">Transform Response</button>
              <p id="res" />
            </div>
            <div>
              <button onClick={errorHandling} className="bg-light text-dark fs-6">Error Handling</button>
              <p id="res" />
            </div>
            <div>
              <button onClick={cancelToken} className="bg-light text-dark fs-6">Cancel Token</button>
              <p id="res" />
            </div>
	    		</div>
        </div>
    );
};



export default Axios;