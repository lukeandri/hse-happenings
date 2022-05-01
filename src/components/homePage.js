//imports all other files we use in the code
//used prettier download on VS code for the entire thing for correct formatting
//reused some logic/principles from previous projects, task app since we had
//similar aspects to this project on the homepage
import "../App.css";
import React from "react";
import Tasks from "./Tasks";
import Header from "./Header";
import { useState, useEffect } from "react";
import TaskEdit from "./taskEdit";
//these imports let us print what is stored in the data base
import { getRecentEvents, useAuth, writeEvent } from "./contexts/AuthContext";
//this new import we had to learn and expirement with allows us to put links and
//have buttons link the user to different pages.
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

function HomePage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showTaskedit, showEdit] = useState(false);
  //this const allows it so we can see the task we are editing in the input bars
  const [currentEditableTask, setCurrentEditableTask] = useState({});
  //sets the editable task to the task we chose to edit
  const editTask = (task) => {
    setCurrentEditableTask(task);
    showEdit(true);
  };
  useEffect(async () => {
    const tasks = await getRecentEvents();
    console.log(tasks + "results");
    console.log("test" + JSON.stringify(tasks));
    setTasks(tasks);
  }, []);
  //this assigns the properties to the event, it is checking to see if it edited so it knows to replace the values of event
  //with the new values instead of just submitting a new event on top of it (a bug i had)
  //the else statement is just for new event since the edited will not return true
  const onSaveTask = (Ename, te, date, contactInfo, orgName, edited) => {
    if (edited) {
      const taskID = currentEditableTask.id;
      setCurrentEditableTask({});
      tasks.forEach((task) => {
        if (taskID === task.id) {
          task.Ename = Ename;
          task.te = te;
          task.date = date;
          task.contactInfo = contactInfo;
          task.orgName = orgName;
        }
      });
    } else {
      console.log("saving tasks");
      const myNewTaskObj = {
        Ename: Ename,
        te: te,
        date: date,
        status: "tbd",
        orgName: orgName,
        contactInfo: contactInfo,
        id: tasks.length + 1,
      };
      console.log("obj" + myNewTaskObj);
      writeEvent(myNewTaskObj);
      //Hide the edit form
      showEdit(false);

      setTasks([myNewTaskObj, ...tasks]);
    }
  };

  //marks the event as complete and sets the status to complete so it can be marked green in task.js
  const completeTask = (cTask) => {
    const cloneTask = tasks;
    cloneTask.forEach((task) => {
      if (task.id === cTask.id) {
        console.log("Task has been completed");
        task.status = "completed";
      }
    });

    setTasks([...cloneTask]);
  };

  const [tasks, setTasks] = useState([]);
  let sortTasks = () => {
    tasks.sort((a, b) => {
      if (a.priority < b.priority) {
        return -1;
      }
      if (a.priority > b.priority) {
        return 1;
      }
      return 0;
    });

    console.log(tasks);

    setTasks([...tasks]);
  };
  //this function had to be async because if not we would get a infinite loop
  //for some reason of it trying to logout and checking if it is signed in
  //when the user hits logout they then get pushed to the login page
  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate.push("/login");
    } catch {
      setError("failed to log out");
    }
  }
  //this is where we are printing everything out and putting the buttons as well
  return (
    <div>
      <Header></Header>
      {/* had a bug that wouldnt allow us to put the email and learned we had to start 
      using react fragments a lot in this project.  */}
      <React.Fragment>
        <h2 className="text-center mb-4"> Profile</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <strong>Email: </strong> {currentUser.email}
      </React.Fragment>

      <div classname="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      <div className="main area">
        <div className="right side">
          <button
            className="menu-button"
            onClick={() => showEdit(!showTaskedit)}
          >
            {!showTaskedit && "New"}
            {showTaskedit && "Hide"}
          </button>
        </div>

        {/* calls our task edit, allows us to input things into our task */}
        {showTaskedit && (
          <TaskEdit
            currentEditableTask={currentEditableTask}
            onSaveTask={onSaveTask}
          />
        )}

        <Tasks
          tasks={tasks}
          completeTask={completeTask}
          editTask={editTask}
        ></Tasks>

        {showTaskedit == false && tasks.length == 0 && (
          <h1>No events coming up! Add one! </h1>
        )}
      </div>
    </div>
  );
}

export default HomePage;
