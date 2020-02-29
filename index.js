//require fs to write file
//user asked for github username
//github api call: retrieves email & profile image
//questions about user's project:
//project title
//description
//installation?
//Usage?
//License
//Contributing : multiple users?
//tests?
//questions
//
//ToC? : automatic
//badge specific to the repo
//user's profile pic
//user's email

const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

//const writeFileAsync = util.promisify(fs.writeFile);

//function generateMD(answers) {
 //return "Project Title: " + answers.projectTitle +  "\nUsername: " + answers.username + "\nEmail: "
//}

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
  /*
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
  }, */
])
  .then(function(answers) {
      const userName = answers.username;
    const queryUrl = `https://api.github.com/users/` + userName;
    // url for repository: https://api.github.com/users/${username}/repos?per_page=100
    
    axios.get(queryUrl).then(function(res) { 
        console.log(res.data.email)
        const email = res.data.email
        const picURL = res.data.avatar_url
      
       fs.appendFile("info.md", 
       "Project Title: " + answers.projectTitle + "\nUser: " + answers.username + "\nEmail: " + email + "\n \nTable of Contents: \nInstallation \nUsage \nLicense \nContributing \nTests \n \nInstallation: \n" + answers.installation + "\nUsage: \n" + answers.usage + "\nLicense: \n" + answers.license + "\nContributing: \n" + answers.contributors + "\nTests: \n" + answers.tests + "\n",
       function(err) {
            if (err) {
              throw err;
            }
    
            console.log(`Saved ${picURL}`);
          });
      
    });
  }); 