{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) =>{
            tasks = [
                ...tasks,
                { content: newTaskContent },
            ];
            render();
    };

    const removeTask = (taskIndex) => {
            tasks = [
                ...tasks.slice(0, taskIndex),
                ...tasks.slice(taskIndex + 1),
            ];
            render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const markAllTasksDone =() => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        
        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        
        toggleDoneButtons.forEach((toggleDoneButtons, index) => {
            toggleDoneButtons.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        const taskToHTML = task => `
            <li class="tasks${task.done && hideDoneTasks ? " tasks__hiden" : ""} js-tasks">
                <button class="js-done button tasks__content button__done">
                    ${task.done ? "✔" : ""}
                </button>
                <span class="tasks__content${ task.done ? " tasks__content--done" : ""}">
                    ${task.content}
                </span>
                <button class="js-remove button tasks__content button__remove">🗑</button>
            </li>
        `;
        const taskElement = document.querySelector(".js-tasks")
        taskElement.innerHTML = tasks.map(taskToHTML).join("")
    };

    const renderButtons = () => {
        const buttonElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonElement.innerHTML = "";
            return;
        }
        buttonElement.innerHTML = `
            <button class="button button__hiden js-toggleHideDoneTasks js-buttons">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="button button__hiden js-markAllDone js-buttons"${ tasks.every(({ done }) => done) ? " disabled" : ""}>
                Ukończ wszystkie
            </button>
        `;
    };

    const bindButtonEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click", markAllTasksDone);
        }

        const toggleHideTasksButton = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideTasksButton) {
            toggleHideTasksButton.addEventListener("click", toggleHideDoneTasks);
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonEvents();
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