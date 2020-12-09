export default {
   getters: {
      _GET_COUNT_ALL_TASKS: (s, g, { todo: { todoTask: { taskList: { taskList } } } }) => taskList.length,
      _GET_COUNT_COMPLETED_TASKS(s, g, { todo: { todoTask: { taskList: { taskList } } } }) {
         return taskList.filter(curr => curr.completed).length
      },
      _GET_COUNT_PROCESS_TASKS(s, g, { todo: { todoTask: { taskList: { taskList } } } }) {
         return taskList.filter(curr => !curr.completed).length;
      },
   },
}