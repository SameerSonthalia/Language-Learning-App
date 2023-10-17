const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const port = process.env.PORT || 8000;
const mysql = require("./db/conn").con



const static_path = path.join(__dirname,"../public");
app.use(express.static(static_path));


const templates_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");
app.set("views",templates_path);
hbs.registerPartials(partial_path)



app.get('/', (req, res) => {
    
        res.render('index');
    
});


app.get("/article",(req,res)=>{
    
        res.render('article');
    
})



app.get('/register',(req,res)=>{
  res.render("register")
})


app.get('/contests',(req,res)=>{
  res.render("contests")
})

app.get('/courses',(req,res)=>{
  res.render("courses")
})



app.get('/contact',(req,res)=>{
  let qry = "select firstname, feedback from feedback";
  mysql.query(qry,(err,results)=>{
      if(err) throw err;
      else {
          if(results.length>0){
              res.render("contact",{data1: results});
          }
          else{
              res.render("contact");
          }
      }
  })
})





app.get("/adduser",(req,res)=>{
  // res.send("You asre using get method")

  const {firstname,lastname,email,password,confirm_password}=req.query;
  let qry = "select * from users where email=?";
  mysql.query(qry,[email],(err,result)=>{
      if(err) throw err;
      else{
          if(password!==confirm_password){
              res.render("register",{mesg1: true});
          }else if(result.length>0){
              res.render("register",{mesg2: true})
          }else{
              let qry2 = "insert into users values(?,?,?,?,?)";
              mysql.query(qry2,[firstname,lastname,email,password,confirm_password],(err,results)=>{
                  if(results.affectedRows>0){
                      res.render("index",{mesg3: true});
                  }
              })
          }
      }
  })
  // res.send(req.query)
})


app.get('/addfeedback', (req, res) => {
  const { email, feedback } = req.query;

  const qry = "SELECT firstname FROM users WHERE email=?";
  mysql.query(qry, [email], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
      } else {
          if (results.length > 0) {
              const { firstname} = results[0]; // Extract 'username' and 'phone'
              const qry2 = "INSERT INTO feedback (firstname, email, feedback) VALUES (?, ?, ?)";
              mysql.query(qry2, [firstname, email, feedback], (err, result) => {
                  if (err) {
                      console.error(err);
                      res.status(500).send("Internal Server Error"); // Handle database error gracefully
                  } else {
                      if (result.affectedRows > 0) {
                          res.render("index", { msg1: true, data: result });
                      }
                  }
              });
          } else {
              res.render("feedback", { msg2: true });
          }
      }
  });
});



const bodyP = require("body-parser");
const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);
app.use(bodyP.json());

const comp_path = path.join(__dirname,"../codemirror-5.65.15")

app.use(
  "/codemirror-5.65.15",
  express.static(comp_path)
);

app.get("/codeeditor", function (req, res) {
  compiler.flush(function () {
    console.log("deleted");
  });
  res.render("practice")
});





app.post("/compile", function (req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var lang = req.body.lang;
  try {
    if (lang == "Cpp") {
      if (!input) {
        var envData = {
          OS: "windows",
          cmd: "g++",
          options: { timeout: 10000 },
        };
        compiler.compileCPP(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var envData = {
          OS: "windows",
          cmd: "g++",
          options: { timeout: 10000 },
        };
        compiler.compileCPPWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else if (lang == "Java") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compileJava(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        //if windows
        var envData = { OS: "windows" };
        //else
        compiler.compileJavaWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else if (lang == "Python") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compilePython(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var envData = { OS: "windows" };
        compiler.compilePythonWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    }
  } catch (e) {
    console.log("error");
  }
});



app.get("*",(req,res)=>{
    res.render("404")
})

app.listen(port,()=>{
    console.log(`Listning at port number ${port}`)
})