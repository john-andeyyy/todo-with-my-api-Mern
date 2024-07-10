const Todo = require('../model/todo');
const User = require('../model/User.Model')

exports.ViewTodo = async (req, res) => {
    try {
        // console.log(req.user.id)
        const user = await User.findById(req.user.id).populate('todos').exec()

        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "User not found",
            });
        }

        return res.status(200).json({
            todos: user.todos
        });

    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
};




exports.AddTodo = async (req, res) => {
    try {
        const { title, completed, description, time } = req.body;
        const newTodo = new Todo({
            title: title,
            description: description,
            completed: completed,
            time: time,
            user: req.user.id
        });
        await newTodo.save();

        await User.findOneAndUpdate(
            { _id: req.user.id },
            { $push: { todos: newTodo._id } },
            { new: true }
        );
        console.log(`added`);
        return res.status(200).json({
            status: "Success",
            newTodo: newTodo,
        });



    } catch (err) {
        res.status(400).json({
            status: "Error",
            content: err,
        });
    }
};

exports.DeleteTodo = async (req, res) => {
    try {
        const { id } = req.params; // Get the id from the request parameters
        const result = await Todo.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                status: "Error",
                message: "Todo not found",
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Todo deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            status: "Error",
            message: err.message,
        });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed, description } = req.body;

        const updatedTodo = await Todo.updateOne(
            { _id: id },
            {
                title: title,
                completed: completed,
                description: description
            }
        );

        if (updatedTodo.matchedCount === 0) {
            return res.status(404).json({
                status: "Error",
                message: "Todo not found",
            });
        }
        console.log(`updated`);
        return res.status(200).json({
            status: "Success",
            message: "Todo updated successfully",
            updatedTodo: updatedTodo
        });
    } catch (err) {
        res.status(500).json({
            status: "Error",
            message: err.message,
        });
    }
};