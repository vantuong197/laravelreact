const perpage = [
    '10',
    '20',
    '50',
    '100',
]

const status =[
    {
        name: 'All status',
        value: '0'
    },
    {
        name: 'Publish',
        value: '2'
    },
    {
        name: 'UnPublish',
        value: '1'
    }
]

const sort = [
    {
        value: 'id,desc',
        name: 'Sort by newest records'
    },
    {
        value: 'id,asc',
        name: 'Sort by oldest records'
    },
    {
        value: 'name,asc',
        name: 'Sort by name A-Z'
    },
    {
        value: 'name,desc',
        name: 'Sort by name Z-A'
    }
]
export {perpage, status, sort}