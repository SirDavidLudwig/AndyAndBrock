const {AndyAndBrock} = require("./andy_and_brock.js");
const jsonfile       = require("jsonfile");

var main = function(config) {
	var anb = new AndyAndBrock(config);
	anb.start();
};

jsonfile.readFile("./env.json", (err, obj) => {
	main(obj);
});
