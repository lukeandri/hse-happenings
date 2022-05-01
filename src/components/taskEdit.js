//this file is mainly used for the inputs and setting the values in our event
import { useState, useEffect } from "react";

function TaskEdit({ currentEditableTask, onSaveTask }) {
  const [EName, setEName] = useState("");
  const [te, setTe] = useState("");
  const [date, setDate] = useState("");
  const [contactInfo, setContact] = useState("");
  const [orgName, setOrgName] = useState("");

  const saveTask = () => {
    let edited = currentEditableTask.te !== undefined;
    console.log(currentEditableTask);

    console.log("TaskEdit.js SaveTask. Edited: " + edited);
    console.log("ename =" + EName);
    onSaveTask(EName, te, date, contactInfo, orgName, edited);

    setTe("");
    setDate("");
    setContact("");
    setOrgName("");
    setEName("");
  };

  // useEffect is called anytime the edit button is clicked
  //took some time to figure this one out but it is the equivilant to a constructor in my head
  useEffect(() => {
    if (currentEditableTask.te !== undefined) {
      setTe(currentEditableTask.te);
      setDate(currentEditableTask.date);
      setOrgName(currentEditableTask.subject);
      setContact(currentEditableTask.contactInfo);
      setEName(currentEditableTask.Ename);
    }

    console.log("Task Edit loaded/rendered");
  }, [currentEditableTask]);

  const handleFromSubmission = (event) => {
    event.preventDefault();
  };

  return (
    //below are all the fields and types to handle a submit from the inputs we use for each of the fields
    //all it really does is just have those fields and gives them values to hold
    <div className="task">
      <h3>Add your Event</h3>
      <form onSubmit={(event) => handleFromSubmission(event)}>
        <label>Name</label>
        <input
          type="text"
          name="Ename"
          id="Ename"
          value={EName}
          placeholder="Enter name"
          onChange={(e) => setEName(e.target.value)}
        />
        <label>Description</label>
        <input
          type="text"
          name="desc"
          id="te"
          value={te}
          placeholder="Enter description"
          onChange={(e) => setTe(e.target.value)}
        />
        <label>Date</label>
        <input
          type="text"
          name="date"
          id="date"
          value={date}
          placeholder="Enter date"
          onChange={(e) => setDate(e.target.value)}
        />
        <label>contact info</label>
        <input
          type="text"
          name="contactInfo"
          id="contact info"
          placeholder="Enter contact info"
          value={contactInfo}
          onChange={(e) => setContact(e.target.value)}
        />
        <label>Org Name</label>
        <input
          type="text"
          name="orgname"
          value={orgName}
          placeholder="Enter Org name"
          onChange={(e) => setOrgName(e.target.value)}
        />
        <div className="saveSide">
          <button className="menu-button" onClick={() => saveTask()}>
            Save{console.log("it works")}{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
export default TaskEdit;
