import ErrorHandler from "../middleware/error.js";
import { List } from "../models/list.js";

export const newList = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const userListsCount = await List.countDocuments({ user: req.user._id });
        // Set the maximum number of lists a user can create
        const maxListsAllowed = 2;
        if (userListsCount >= maxListsAllowed) {
            return res.status(400).json({
                success: false,
                message: `You can create only ${maxListsAllowed} lists.`
            });
        }
        await List.create({
            title,
            description,
            user: req.user
        })
        res.status(201).json({
            success: true,
            message: "List added successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const getMyList = async (req, res, next) => {
    try {
        const userid = req.user.id

        const lists = await List.find({ user: userid })

        res.status(200).json({
            success: true,
            lists
        })
    } catch (error) {
        next(error)
    }
}
export const deleteList = async (req, res, next) => {

    try {
        const list = await List.findById(req.params.id);

        if (!list) return next(new ErrorHandler("List not found", 404));

        await list.deleteOne();

        res.status(200).json({
            success: true,
            message: "List Deleted!"
        })
    } catch (error) {
        next(error)
    }
}

export const addTaskToList = async (req, res, next) => {
    try {
        const listId = req.params.id;
        const { taskTitle, taskDescription } = req.body;

        const list = await List.findById(listId);

        if (!list) {
            return next(new ErrorHandler("List not found", 404));
        }

        // Add the new task to the tasks array
        list.tasks.push({
            taskTitle,
            taskDescription,
        });

        await list.save();

        res.status(201).json({
            success: true,
            message: "Task added to the list successfully"
        });
    } catch (error) {
        next(error);
    }
}