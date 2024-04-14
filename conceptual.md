### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
> - You can manage asynchronous code using promises and asynchronous callbacks. A promise is a one time guarantee of a future value. Asynchronous callbacks run *after* the rest of the code, once that promise is resolved or rejected. You can use *async* and *await* to write code that looks synchronous, even if it isn't. *Async* functions always return promises. *Await* pauses the execution of the *async* function by waiting for the promise to resolve and then extracts its resolved value for use by the rest of the code. It then resumes the *async* function's execution.

- What is a Promise?
> - A promise is a one time guarantee of a future value. Promises in JavaScript are objects. They can be in one of three states: *Pending*, *Resolved*, or *Rejected*. When it is *Pending*, it still has no value. When it is *Resolved*, it has successfully obtained a value. When it is *Rejected*, it has failed to obtain a value for some reason. You can access the *resolved* or *rejected* values through chaining a method on to the end of a promise. You can use *.then* and *.catch*, chained onto the promise. *.then* is the callback that will run if the promise is resolved, *.catch* will run if the promise is rejected.

- What are the differences between an async function and a regular function?
> - Async functions return a promise, where as regular functions return a value. The value of the async function has to be resolved, or rejected and then extracted through chaining or other methods.

- What is the difference between Node.js and Express.js?
> - Node.js is the JavaScript language used to write server-side code. Express.js is a framework built on top of Node.js used to more easily develop server-side applications.
 
- What is the error-first callback pattern?
> - The callback function's first parameter should be listed as *error*. Node will supply an *error object*(if an error occurs), otherwise *null* as arguments. Then the other parameters come after.
> 
> - For Example:  
> fs.readFile("myfile.txt", "utf8", fucntion(err, data){.  
> if(err) { //handle error };   
> //otherwise we are good   
> });
- What is middleware?
> - Middleware is code that is run between the request and response cycle for a given request to an Express.js application. Middleware functions get access to the *req* and *res* objects and can also call the *next* function. You can use it to sepearte code into more logical groupings and it provides more robust/abstracted error handling. You can use it to log useful information on every request, adding a current_user for every request (like g in flask), ensuring users are authenticated, ensuring that a user is authorized to access specific endpoints.

- What does the `next` function do?
> - *next* allows us to make it the the next matching route in the code. Without it we wouldn't be able to continue. If you do not pass any arguments into the next function, it will find the next matching route. If you do pass any argument into *next*, Express will always treat this as an error.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

> - The code can be refactored using Parallel Requests with async/await. This will start the requests in parallel rather than in sequence so that each reqest won't have to wait for the previous request before starting. We can also use *Promise.all* to await multiple resolved promises. There is also no error handling. As far as the naming they are not exactly the same as the names from the api, so perhaps there is a more descriptive way to name the variables that can allow us to more easily identify what the variable is representing.
