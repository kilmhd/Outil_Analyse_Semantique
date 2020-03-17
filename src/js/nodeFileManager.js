var fs = require('fs');

function updatefile(name, content){
    fs.writeFile(name, content, function (err) {
        if (err) throw err;
        console.log('Replaced!');
    });
}
