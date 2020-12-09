export default {
   state: {},
   getters: {
      GET_CURR_DESCRIPTION: (s, getters) => getters.GET_INIT_SETTINGS_TASK.description,
   },
   mutations: {
      SET_CURR_DESCRIPTION: (s, { rState, description }) => rState.initSettingsTask.description = description,
   },
   actions: {
      SET_CURR_DESCRIPTION({ commit, rootState }, description) {
         const { todo: { todoModal } } = rootState;
         commit('SET_CURR_DESCRIPTION', { rState: todoModal, description });
      },
   }
}