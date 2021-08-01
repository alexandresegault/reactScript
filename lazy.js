const fs = require("fs"); //Module to create / read / write a file in javascript
let args = process.argv; // Catch the arguments send through command line
args.shift(); // delete the first argument which is in that case the node location on your OS system
let path = args.shift(); // get the actual path of your directory
let newPath = path.split("\\");
newPath.pop();
let actualPath = newPath.join("/"); // delete the script name of the path and get the new one
let fileList = []
if (
  args.includes("help") ||
  args.includes("-help") ||
  args.includes("--help")
) {
  console.log(
    "The purpose of this JS script is to automatically generate a js file with react basic format and the css file according to it",
    "\n",
    "you can create files as much as you want in one line",
    "\n",
    "---------------------------------------------------------------------------------------------------------------------------------------------------------",
    "\n",
    "[-p] => Specify the path where the files should be created otherwise will be directly in src, EXAMPLE : node lazy.js -p screens/admin Homepage SigninPage",
    "\n",
    "---------------------------------------------------------------------------------------------------------------------------------------------------------",
    "\n",
    "[-d] => Create one directory, need to be the first argument , EXAMPLE : node lazy.js -d components -p components Header Footer",
    "\n",
    "---------------------------------------------------------------------------------------------------------------------------------------------------------"
  );
} else {
  if (args[0].includes("-d")) {
    args.shift();
    args.shift();
  }
  if (args[0] == "-p") {
    args.shift();
    actualPath += `/${args[0]}`;
    args.shift();
  }
  args.forEach((name) => {
    const cssFile = fs.createWriteStream(
      `${actualPath}/` + `${name.toLowerCase()}.css`,
      { flags: "w" }
    ); // create the css file
	fileList.push(`${name.toLowerCase()}.css`)
    cssFile.end(); // close the css file
    const jsFile = fs.createWriteStream(
      `${actualPath}/` + `${name.toLowerCase()}.js`,
      { flags: "w" }
    ); // create the js file
	fileList.push(`${name.toLowerCase()}.js`)
    jsFile.write(`import './${name}.css'\n\n`);
    jsFile.write(`const ${name} = () => {\n`);
    jsFile.write("	return(\n");
    jsFile.write(`	<div className="${name.toLowerCase()}">\n	</div>\n`);
    jsFile.write(")}\n\n");
    jsFile.write(`export default ${name}`);
    jsFile.end(); //close the js file
  });
}

fileList.forEach(file => {
	console.log(file, ' as been created')
})
console.log(`at ${actualPath}`)