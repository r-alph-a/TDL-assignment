/**Hello Mr. Sarkis. I wanted to write you a quick message.
 * I am aware that some edge cases were not covered (like checking done while a task
 * is in the input stage) and also know that i haven't used the localStorage API that was
 * mentioned in the assignment pdf, but i didn't do these tasks because i felt that what we learned
 * last time wasn't enough to implement those features.
 * That being said i am happy to say that this assignment was made with no ai help (particullarly
 * the js part) and i hope you take this into consideration when grading.
 * Thank you.**/

let list = document.querySelector("#tasks");
let adder = document.querySelector('#add');

let tasks = [];

//These 2 functions come from the course material
function taskToListItem(task){      //Transform a js object to an li item
    //initialize the list item
    const li = document.createElement('li');
    li.classList.add('task');
    li.dataset.id = task.id;

    //create the text element
    const t = document.createElement('div');    
    t.dataset.id = task.id                      
    if (task.editing){      //if editing, an input field shoudl appear
        let input = document.createElement('input');
        input.dataset.id = task.id;
        input.classList.add('input');
        input.value = task.text;
        t.append(input);
    } else {        //if not we simply display the text
        const te = document.createElement('p');
        te.textContent = task.text;
        te.dataset.id = task.id;
        te.style.textDecoration = task.textStyle;
        t.append(te); 
    }
    
    //create the delete button element
    const deleteButtons = document.createElement('div');
    const bu = document.createElement('button');
    bu.textContent = 'Delete';
    bu.dataset.id = task.id;
    bu.classList.add('delete');
    deleteButtons.append(bu);

    //create the checkbox element
    const checkBox = document.createElement('div');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.dataset.id = task.id;
    cb.classList.add('checkbox');
    cb.checked = task.done;
    //checkBox.style.backgroundColor = 'green';
    checkBox.append(cb);
    
    //append all elements to the list item
    li.append(checkBox);
    li.append(t);
    li.append(deleteButtons);
    
    return li       //Had to return the end result so i could append it in another function
}

function renderTasks(){     //Render the tasks
    list.innerHTML = '';
    tasks.map(taskToListItem).forEach(li => list.append(li));
}

list.addEventListener('click', (e) => {         //testing for event listners
    e.preventDefault();
    let di = e.target.closest('div');
    if (!di) {
        return;
    } else if (e.target.closest('button')){  
        let bu = e.target.closest('button');
        let buId = bu.dataset.id;
        const newTasks = tasks.filter(task => task.id !== buId);    
        tasks = newTasks;         
        renderTasks();      //we filter out the taks with the id and re-render the page
    } else if (e.target.closest('p')){
        let text = e.target.closest('p');
        let textId = text.dataset.id;
        tasks[textId - 1].editing = true;
        renderTasks();
    } else if (e.target.closest('input')) {
        let cb = e.target.closest('input');
        let cbId = cb.dataset.id;
        if (cb.type === "checkbox"){    //check that the input is a checkbox;
            if (cb.checked){        //if boxe is checked -> task is not done
                tasks[cbId - 1].textStyle = 'line-through'; //id-1 because id doesn't represent the list's index
                tasks[cbId - 1].done = true;    //set done as true and overline the task
            } else {
                tasks[cbId - 1].textStyle = '';
                tasks[cbId - 1].done = false;   //set undone and return text to no style
            }
            renderTasks();
        } else {    //here the user would have pressed the input to edit the tasks
            cb.addEventListener('keydown', (e) => {     //we check for the enter keydown event
                if (e.key === 'Enter'){                 //in order to reload the page when the user is done
                    tasks[cbId - 1].text = e.target.value;
                    tasks[cbId - 1].editing = false;
                    renderTasks();
                }
            })
        }
    } else if(e.target.closest('li')){      //this was for testing purposes
        let li = e.target.closest('li');
        let liId = li.dataset.id;
        console.log(`task${liId} pressed`);
    }
})

adder.addEventListener('click', (e) => {    //this listner is for the add button
    e.preventDefault();
    let index = String(tasks.length + 1);   //set it as string because we are comparing str to str in the delete function
    tasks.push({id:index, text:'', textStyle:"", done:false, editing: true});
    renderTasks();
})

renderTasks();