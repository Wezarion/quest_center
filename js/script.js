{
    const tasks = [
    ];

    const addNewTask = (newTaskContent) =>{
            tasks.push({
                content: newTaskContent,
            });
            render();
    };

    const removeTask = (taskIndex) => {
            tasks.splice(taskIndex, 1);
            render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        
        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");
        
        toggleDoneButtons.forEach((toggleDoneButtons, index) => {
            toggleDoneButtons.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="tasks js-task">
                    <button class="js-done button tasks__content button__done">
                        ${task.done ? "✔" : ""}
                    </button>
                    <span class="tasks__content${ task.done ? " tasks__content--done" : ""}">
                        ${task.content}
                    </span>
                    <button class="js-remove button tasks__content button__remove">🗑</button>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };


    const onFormSubmit = (event) => {
            event.preventDefault();
            
            const newTaskElement = document.querySelector(".js-newTask")
            const newTaskContent = newTaskElement.value.trim();
            
            if (newTaskContent !== "") {
                addNewTask(newTaskContent);
                newTaskElement.value = "";
            }
        
            newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}