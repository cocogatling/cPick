// genFileList.js
const fs = require("fs");
const path = require("path");

const vol = "1C";                                    // volume key
const dir = path.join(__dirname, "images", vol); // adjust if needed

// read all image files
const files = fs.readdirSync(dir)
	.filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
	.sort();

// dump as JSON array for your JS
const output = JSON.stringify(files, null, 2);
fs.writeFileSync(path.join(__dirname, `${vol}_files.json`), output);

console.log(`Generated ${vol}_files.json with ${files.length} entries`);