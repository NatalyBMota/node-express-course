const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let phrase = "Enter your name below.";
let fName;
let lName;

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <p>${phrase}</p>
  <form method="POST">
  <b>First Name:</b> <input name="firstName"></input>
  <br />
  <br />
  <b>Last Name:</b> <input name="lastName"></input>
  <br />
  <br />
  <button type="submit">Submit</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      fName = body["firstName"];
      lName = body["lastName"];
      
      // here, you can add your own logic
      if (body["firstName"] && body["lastName"]) {
        phrase = `<b>Hello, ${body["firstName"]} ${body["lastName"]}! It's so good of you to visit this web page!</b>`;
      } else if (body["firstName"]){
        phrase = `What is your last name, ${body["firstName"]}? You did not enter one!`;
      } else if (body["lastName"]){
        phrase = `What is your first name, ${body["lastName"]}? You did not enter one!`; 
      } else {
        phrase = "You did not enter a first name or a last name! Please enter them below.";
      }      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
