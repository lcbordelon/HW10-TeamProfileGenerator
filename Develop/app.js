const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
//setup two consts, both equal to empty arrays (where info will be pushed to). one for team members and one for id numbers
const teamMember = [];
const idNumber = [];

function manager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "ManagerName",
        message: "What is your name?",
      },
      {
        type: "input",
        name: "ManagerID",
        message: "What is your ID number?",
      },
      {
        type: "input",
        name: "ManagerEmail",
        message: "What is your email address?",
      },
      {
        type: "input",
        name: "ManagerOfficeNumber",
        message: "What is your office #?",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.ManagerName,
        answers.ManagerID,
        answers.ManagerEmail,
        answers.ManagerOfficeNumber
      );
      teamMember.push(manager);
      idNumber.push(answers.ManagerID);
      addTeamMember();
    });
}

function addTeamMember() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "MoreMembers",
        message:
          "Do you want to create another team member? If yes, select which member you would like to create.",
        choices: ["Engineer", "Intern", "No More Employees"],
      },
    ])
    .then((userResp) => {
      switch (userResp) {
        case "Engineer":
          engineer();
          break;
        case "Intern":
          intern();
          break;
        default:
          writeToFile();
      }
    });
}

function engineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "EngineerName",
        message: "What is your name?",
      },
      {
        type: "input",
        name: "EngineerID",
        message: "What is your ID number?",
      },
      {
        type: "input",
        name: "EngineerEmail",
        message: "What is your email address?",
      },
      {
        type: "input",
        name: "EngineerGitHub",
        message: "What is your GitHub address?",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.EngineerName,
        answers.EngineerID,
        answers.EngineerEmail,
        answers.EngineerGitHub
      );
      teamMember.push(engineer);
      idNumber.push(answers.EngineerID);
      addTeamMember();
    });
}

function intern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "InternName",
        message: "What is your name?",
      },
      {
        type: "input",
        name: "InternID",
        message: "What is your ID number?",
      },
      {
        type: "input",
        name: "InternEmail",
        message: "What is your email address?",
      },
      {
        type: "input",
        name: "InternSchool",
        message: "What school do you attend?",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.InternName,
        answers.InternID,
        answers.InternEmail,
        answers.InternSchool
      );
      teamMember.push(intern);
      idNumber.push(answers.InternID);
      addTeamMember();
    });
}

// function to write the user responses data to the HTML files that are already created. Need to create output folder.
function writeToFile() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  return fs.writeFileSync(outputPath, render(teamMember));
}

// function to initialize program
function init() {
  manager();
}

// function call to initialize program
init();

//first question is the user selecting which role they are via button. that response calls a switch function that directs them to the proper set of questions based on their role

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
