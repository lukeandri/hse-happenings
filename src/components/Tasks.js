//creates our actual array of events events
import Task from "./Task";
function Tasks(props) {
  console.log(props);
  return (
    <div>
      {/* maps our event to our events array */}
      {props.tasks.map((task) => {
        return (
          //this event is an object, this is what is being stored in the tasks
          <Task
            key={task.id}
            task={task}
            completeTask={props.completeTask}
            editTask={props.editTask}
          />
        );
      })}
    </div>
  );
}

export default Tasks;
