
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt([
    {
    type: "input",
    message: "Enter your GitHub username: ",
    name: "username",
  },
  {
    type: "input",
    name: "projectTitle",
    message: "What is the title of your project?"
  },
  
  {
    type: "input",
    name: "description",
    message: "What is the description of your project?"
  },
  {
    type: "input",
    name: "installation",
    message: "What are your project's installation requirements?"
  },
  {
    type: "input",
    name: "usage",
    message: "What is your project's usage type?"
  },
  {
    type: "input",
    name: "license",
    message: "What is your project's licensing?"
  },
  {
      type: "input",
      name: "contributors",
      message: "Who are your project's contributors?"
  },
  {
      type: "input",
      name: "tests",
      message: "Tests: "
  }, 
])
  .then(function(answers) {
      const userName = answers.username;
    const queryUrl = `https://api.github.com/users/` + userName;
   
    axios.get(queryUrl).then(function(res) { 
        console.log(res.data.email)
        const email = res.data.email
        const picURL = "(" + res.data.avatar_url + ")"

      
       fs.appendFile("generatedREADME.md", 
       "Project Title: " + answers.projectTitle + "\n \nTable of Contents: \n1. Installation \n2. Usage \n3. License \n4. Contributing \n5. Tests \n6. User Info\n \nInstallation: \n" + answers.installation + "\nUsage: \n" + answers.usage + "\nLicense: \n" + answers.license + "\nContributing: \n" + answers.contributors + "\nTests: \n" + answers.tests + "\n \n \n" + "![User's profile picture]" + picURL + "\n \nUser: " + answers.username + "\nEmail: " + email ,
       function(err) {
            if (err) {
              throw err;
            }
    
            console.log(`Saved to generatedREADME`);
          });
      
    });
  }); 