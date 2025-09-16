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
                <li class="form__task--list js-task">
                    <button class="js-done button button__done">
                        ${task.done ? "Y" : ""}
                    </button>
                    <span class="form__tasks--content${ task.done ? " class=\"form__task--done\"" : ""}">
                        ${task.content}
                    </span>
                    <button class="js-remove button button__remove">usuń</button>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };


    const onFormSubmit = (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-newTask").value.trim();
            
            if (newTaskContent === "") {
                return;
            }
        
            addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}