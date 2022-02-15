console.log('8 my very first app: console :)');
const path = require('path')

const cp = require("child_process");
const util = require("util");
const execFile = util.promisify(cp.execFile);

const fs = require("fs");
const {app} = require("electron");
const {PythonShell} = require("python-shell");

function findPython() {
  const possibilities = [
    // In packaged app
    path.join(process.resourcesPath, "python", "bin", "python3.9"),
    // In development
    path.join(__dirname, "python", "bin", "python3.9"),
  ];
  for (const path of possibilities) {
    if (fs.existsSync(path)) {
      console.log('path_to_python path: ', path)
      return path;
    }
  }
  console.log("Could not find python3, checked", possibilities);
  app.quit();
}

var path_to_python = findPython();
console.log('path_to_python: ', path_to_python);

function findPyEngine() {
  const possibilities = [
    // In packaged app
    path.join(process.resourcesPath, "engine"),
    // In development
    path.join(__dirname, "engine"),
  ];
  for (const path of possibilities) {
    if (fs.existsSync(path)) {
      console.log('path_to_python path: ', path)
      return path;
    }
  }
  console.log("Could not find 'engine', checked", possibilities);
  app.quit();
}

var path_to_engine = findPyEngine();
console.log('path_to_engine: ', path_to_engine);

PythonShell.runString('x=1+1;print(x)', null, function (err) {
  if (err) throw err;
  console.log('python-shell ready :)');
});

function get_font() {
    var font_path = document.getElementById("font_path").value
    //document.getElementById("font_path").value = "";

    let options = {
        scriptPath : path_to_engine,
        pythonPath : path_to_python,
        pythonOptions: ['-u'], // get print results in real-time
        args : [font_path]
    }

    let loading_font = new PythonShell('loading_font.py', options);

    loading_font.on('message', function(message){
        alert(message);
    })
}

function get_font_table_ttx() {

    var font_path = document.getElementById("font_path").value
    var font_table = document.getElementById("font_table").value
    //document.getElementById("font_path").value = "";

    let options = {
        scriptPath : path_to_engine,
        pythonPath : path_to_python,
        pythonOptions: ['-u'], // get print results in real-time
        args : [font_path, font_table]
    }

    let get_font_table = new PythonShell('get_font_table.py', options);

    get_font_table.on('message', function(message){
        //alert(message)
        //console.log(message)
        //console.log(typeof message);
        //var array = JSON.parse(message.replace('\'', '\"'));
        //console.log(array)
        document.getElementById("font_table_content").innerHTML = message;
    })
}

//document.getElementById("btn_font_path").addEventListener("click", get_font);
