/* Suppose that you want to make sure that both a status code and an error message are sent back to the user when they request the URL for a task that does not exist. Assume that you’ve created a CustomAPIError class and an error handler that references that class. Complete the code:
*/
const getTask = asyncWrapper(async (req, res, next) => {  
  const { id: taskID } = req.params;  

  //awaiting to find this one task by its ID
  const task = await Task.findOne({ _id: taskID });  

  //if we are not successful
  if (!task) {  
    // your code here  
    //next(error)
    //next(res.status(404).json({ msg: `No task with id: ${taskID}`}))
    // next(new CustomAPIError(`No task with id: ${taskID}`, 404))
    /* Updated programming to reflect an idea from instructor provided code on this week's lesson video at the 3:01:38 (three hour, one minute, and 38-second) mark. This code was then found in the controllers subfolder of the starter subfolder of the 03-task-manager folder, in the the task.js file. It also surrounded error handling. 
    */ 
    return next(createCustomError(`No task with id: ${taskID}`, 404))
  }  
  //next(res.status(200).json({ task }));
  res.status(200).json({ task }); 
});  