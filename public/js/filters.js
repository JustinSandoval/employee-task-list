const filterOverdue = document.querySelector('#overdue')
const filterInProgress = document.querySelector('#inProgress')
const filterToday = document.querySelector('#today')
const filterAllDays = document.querySelector('#allDays')

filterOverdue.addEventListener('click', filterItems)
filterInProgress.addEventListener('click', filterItems)
filterToday.addEventListener('click', filterByDate)
filterAllDays.addEventListener('click', showAlldays)

function filterItems(e) {
    // get inner html text of link clicked
    const filterValue = e.srcElement.innerHTML.toUpperCase()
    // select each a element 'task'
    const tasks = document.querySelectorAll('#listdiv a')

    // for every task
    for (let i = 0; i < tasks.length; i++) {
        // select badge inner text
        const badgeValue = tasks[i]
            .querySelector('small span')
            .innerHTML.toUpperCase()
        // select inner html of date task was created, remove spaces and time
        const html = tasks[i].querySelector('#time').innerHTML

        if (badgeValue === filterValue) {
            tasks[i].classList.replace('d-none', 'd-flex')
        } else {
            tasks[i].classList.replace('d-flex', 'd-none')
        }
    }
}

function filterByDate(e) {
    // select each anchor element 'task'
    const tasks = document.querySelectorAll('#listdiv a')

    // for every task
    for (let i = 0; i < tasks.length; i++) {
        // select inner html of date task was created, remove spaces and time
        const html = tasks[i].querySelector('#time').innerHTML
        const taskDate = html.split(' ').join('').slice(0, 13).replace('-', '')
        const todaysDate = dayjs(Date.now()).format('dddMMMD,YYYY')

        if (taskDate === todaysDate) {
            tasks[i].classList.replace('d-none', 'd-flex')
        } else {
            tasks[i].classList.replace('d-flex', 'd-none')
        }
    }
}

function showAlldays(e) {
    const tasks = document.querySelectorAll('#listdiv a')

    for (let i = 0; i < tasks.length; i++) {
        tasks[i].classList.replace('d-none', 'd-flex')
    }
}
