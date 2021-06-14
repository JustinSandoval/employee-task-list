module.exports = t => {
    if (t.completed === 'on') {
        return 'list-group-item-success'
    } else if (Date.now() > new Date(t.deadline)) {
        return 'list-group-item-danger'
    } else {
        return 'list-group-item-info'
    }
}
