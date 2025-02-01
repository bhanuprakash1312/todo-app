document.addEventListener("DOMContentLoaded" , () =>{
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks){
        storedTasks.forEach((task) => tasks.push(task));
        updateTaskList();
        updatestats();
    }
})

let tasks = [];
const savetasks = () => {
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ""; // Clear input after adding task
        updateTaskList();
        updatestats();
        savetasks();
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="add.png" onclick="editTask(${index})"/>
                    <img src="delete.png" onclick="deleteTask(${index})"/>
                </div>
            </div>
        `;

        // Add event listener to checkbox
        
        listItem.addEventListener("change",()=> toggleTaskComplete(index));
        taskList.append(listItem);
    });
};
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updatestats();
    savetasks();
};
const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTaskList();
    updatestats();
    savetasks();
};
const editTask = (index) => {
    const newtext = document.getElementById("taskInput");
    newtext.value = tasks[index].text;
    tasks.splice(index,1);
    updateTaskList(); 
    updatestats();
    savetasks();
}
const updatestats = () => {
    const completeTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completeTasks / totalTasks) * 100;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;
    document.getElementById("number").innerHTML = `${completeTasks}/${totalTasks}`;
    if (completeTasks === totalTasks && totalTasks > 0) {
        blastconfetti();
    }
}


document.getElementById("newtask").addEventListener("click", function(e) {
    e.preventDefault();
    addTask();
});
const blastconfetti = () => {
    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["heart"],
        colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
      };
      
      confetti({
        ...defaults,
        particleCount: 50,
        scalar: 2,
      });
      
      confetti({
        ...defaults,
        particleCount: 25,
        scalar: 3,
      });
      
      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 4,
      });
}