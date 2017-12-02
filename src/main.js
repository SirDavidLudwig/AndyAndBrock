const {AndyAndBrock} = require("./andy_and_brock.js");
const jsonfile       = require("jsonfile");

// Main function
var main = function(config) {

	// Create the Andy and Brock manager
	var anb = new AndyAndBrock(config);

	// Start and Andy and Brock
	anb.start();
};

// Read the configuration
jsonfile.readFile("./env.json", (err, obj) => {
	// Execute main with the configuration
	main(obj);
});
