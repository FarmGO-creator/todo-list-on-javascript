const priseFromStorage = localStorage.getItem('todo-list');
const todoList = priseFromStorage ? JSON.parse(priseFromStorage) : {
    todo: [],
    done: [],
    pointer: 0,
};

let pointer = 1;

let coutry = 0;

const selects = document.querySelector('#select');
const form = document.querySelector('form');
const countainer = document.querySelector('.todo-list');
const countainerDone = document.querySelector('.done-list');
let point = document.querySelector('.point span');
const preloder = document.getElementById('preloader');

const getSelectedApi = () => {
    if (selects.value === 'random') {
        return `http://www.boredapi.com/api/activity`
    } else {
        return `http://www.boredapi.com/api/activity?type=${selects.value}`
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    coutry++;
    preloder.style.display = 'block';

    const printCounter = (responseText) => {
        const response = JSON.parse(responseText);

        const seclectTodo = {
            activity: response.activity,
            type: response.type,
            id: coutry
        };
        todoList.todo.push(seclectTodo);

        localStorage.setItem('todo-list', JSON.stringify(todoList));

        const box = document.createElement('div');
        todoList.todo.forEach(person => {
            box.className = 'box'
            box.innerHTML = `
                <p> Тип: <span>${person.type}</span></p>
                <p> Задание: <span>${person.activity}</span></p>
            `;
            countainer.appendChild(box);

            
            const remove = document.createElement('button');
            remove.innerHTML = 'Delete';
            remove.addEventListener('click', () => {
                const curront = todoList.todo.indexOf(person);
                todoList.todo.splice(curront, 1);
                localStorage.setItem('todo-list', JSON.stringify(todoList));
                box.remove();
            });
            box.appendChild(remove);

            const done = document.createElement('button');
            done.innerHTML = 'Done';
            done.addEventListener('click', () => {
                const curront = todoList.todo.indexOf(person);
                todoList.todo.splice(curront, 1);
                todoList.done.push(person);

                countainerDone.appendChild(box);
                done.remove();

                todoList.pointer = pointer++;
                point.innerHTML = todoList.pointer;
                
                box.style.background = '#4caf50';

                localStorage.setItem('todo-list', JSON.stringify(todoList));
            });
            box.appendChild(done);
        })

        preloder.style.display = 'none';
    };

    request({
        url: `${getSelectedApi()}`,
        method: 'GET',
        success: printCounter,
        error: error => alert('Ошибка: ' + error),
    });
});

todoList.todo.forEach(person => {
    const box = document.createElement('div');
    box.className = 'box';

    box.innerHTML = `
        <p> Тип: <span>${person.type}</span></p>
        <p> Задание: <span>${person.activity}</span></p>
    `;
    countainer.appendChild(box);


    const remove = document.createElement('button');
    remove.innerHTML = 'Delete';
    remove.addEventListener('click', () => {
        const curront = todoList.todo.indexOf(person);
        todoList.todo.splice(curront, 1);
        localStorage.setItem('todo-list', JSON.stringify(todoList));
        box.remove();
    })
    box.appendChild(remove);

    const done = document.createElement('button');
    done.innerHTML = 'Done';
    done.addEventListener('click', () => {
        const curront = todoList.todo.indexOf(person);
        todoList.todo.splice(curront, 1);
        todoList.done.push(person);

        countainerDone.appendChild(box);
        done.remove();

        todoList.pointer = pointer++;
        point.innerHTML = todoList.pointer;

        box.style.background = '#4caf50';

        localStorage.setItem('todo-list', JSON.stringify(todoList));
    });
    box.appendChild(done);
})


todoList.done.forEach(person => {
    const box = document.createElement('div');
    box.className = 'box';
    box.style.background = '#4caf50';

    box.innerHTML = `
        <p> Тип: <span>${person.type}</span></p>
        <p> Задание: <span>${person.activity}</span></p>
    `;
    countainerDone.appendChild(box);

    todoList.pointer = pointer++;
    point.innerHTML = todoList.pointer;
    

    const remove = document.createElement('button');
    remove.innerHTML = 'Delete';
    remove.addEventListener('click', () => {
        const curront = todoList.done.indexOf(person);
        todoList.done.splice(curront, 1);
        localStorage.setItem('todo-list', JSON.stringify(todoList));
        box.remove();
    })
    box.appendChild(remove);
})