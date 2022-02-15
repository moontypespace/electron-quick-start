
function get_font() {
    let {PythonShell} = require('python-shell')
    let path = require("path")

    PythonShell.runString('x=1+1;print(x)', null, function (err) {
      if (err) throw err;
      console.log('python-shell ready :)');
    });
    //var path_to_python = GLOBAL_DATA['path_to_python']
    //console.log('get_font path_to_python: ', path_to_python);

    var font_path = document.getElementById("font_path").value
    document.getElementById("font_path").value = "";

    let options = {
        scriptPath : path.join(__dirname, '/engine/'),
        pythonPath : 'python/bin/python3.9',
        pythonOptions: ['-u'], // get print results in real-time
        args : [font_path]
    }

    let loading_font = new PythonShell('loading_font.py', options);

    loading_font.on('message', function(message){
        alert(message);
    })
}

//document.getElementById("btn_font_path").addEventListener("click", get_font);
