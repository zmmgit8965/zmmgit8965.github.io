
var fs=require('fs');

function getFiles(dir) {

    // get all 'files' in this directory
    var all = fs.readdirSync(dir);

    // process each checking directories and saving files
    return all.map(file => {
        // am I a directory?
        if (fs.statSync(`${dir}/${file}`).isDirectory()) {
            // recursively scan me for my files
            return getFiles(`${dir}/${file}`);
        }
        // WARNING! I could be something else here!!!
        return `${dir}/${file}`;     // file name (see warning)
    });
}

var s = getFiles('C:\\zmm\\git\\fff89655.github.io\\host');

console.log(s);