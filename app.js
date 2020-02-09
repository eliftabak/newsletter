const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  var option = {
    url: "https://us4.api.mailchimp.com/3.0/lists/8bdf902989",
    method: "POST",
    headers: {
      "Authorization": "eliftc1 5f58bd3fabf74db1e009372b67a99b60-us4"
    },
    body: jsonData
  };

  request(option, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
          res.sendFile(__dirname + "/failure.html");
      }
    }
  });

});

app.post("/failure", function(req, res){
res.redirect("/");
});

app.listen(process.env.PORT || 5000, function(req, res) {
  console.log("Server started on port 5000.");
});

// api key
// 5f58bd3fabf74db1e009372b67a99b60-us4

// id 8bdf902989
