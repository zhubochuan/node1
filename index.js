const express = require('express')
const app = express()

app.use(express.json());


//store data
let store = [];

//create a task
app.post('/tasks', (req, res) => {
    const data = {
        id: req.body.id,
        description: req.body.description,
        done: req.body.done
    }
    store.push(data);

    res.status(201).json(data);
});

//return all tasks
app.get('/tasks', (req, res) => {
    const description = req.query.description
    const data = store.filter(task => task.description === description);


    res.status(200).json(data);
});

//get task by id
app.get("/tasks/:id", (req, res) => {
    const search_id = req.params


    const data = store.find(task => task.id == search_id.id); //Question

    if (data !== null && data !== undefined) {     //几个等于号
        res.status(200).json(data);
    } else {
        res.status(404).json("Task not found");
    }
});

//update a task
app.put("/tasks/:id", (req, res) => {
    const change = {
        id: req.body.id,
        description: req.body.description,
        done: req.body.done
    }

    const data = store.find(t => t.id == req.params.id);

    if (data !== null && data !== undefined) {     //几个等于号
        data.id = change.id
        data.description = change.description
        data.done = change.done
        res.status(200).json(data);
    } else {
        res.status(404).json("Task not found");
    }
}
);

//delete a task
app.delete('/tasks/:id', (req, res) => {
    const search_id = req.params.id;
    const data = store.find(t => t.id == search_id);
    if (data !== null && data !== undefined) {     //几个等于号
       // const d = store.findIndex(t => t.id == search_id);
        //  store[0]=null;//为什么不行
        //   store.splice(d,1,'');  //貌似也占位置了
        //赋予新值的方法在数据量大的时候好像不太好
       store=  store.filter(t => t.id != search_id);
        res.status(200).json(store);
    } else {
        res.status(404).json("Task not found");
    }

})


app.listen(3000)
