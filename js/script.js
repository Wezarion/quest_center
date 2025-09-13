{
    const tasks = [
        {
            content: "nauczyć sie",
            done: false,
        },
        {
            content: "zjesc obiad",
            done: true
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li>
                    ${task.content}
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    }

    const init = () => {
        render();
    };

    init();
}