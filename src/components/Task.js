//this is what will add all the date we see on the screen, the labels and the information we input will be displayed from here
//all it is pretty much doing is writing out what the user will be seeing
import "../App.css";
function Task({ task, completeTask, editTask }) {
  console.log(task);
  return (
    <div className="task-container" key={task.id}>
      <h4>
        {/* for example here it will print out Name and then go get that events Name. */}
        <b>Name:</b>
        <p>{task.Ename}</p>
        <b>Description:</b> <p>{task.te}</p>
      </h4>

      <b>Date:</b>
      <p> {task.date} </p>
      <p>
        <b>Contact info:</b> {task.contactInfo}
      </p>
      <p>
        <b>Org Name:</b> {task.orgName}
      </p>

      <button className="common-button" onClick={() => editTask(task)}>
        Edit
      </button>
      <button className="common-button" onClick={() => completeTask(task)}>
        {task.status === "completed" && "Done ✅"}
        {task.status !== "completed" && "Click to complete ⬜"}
      </button>
    </div>
  );
}

export default Task;
