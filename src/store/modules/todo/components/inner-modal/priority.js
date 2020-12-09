export default {
   state: {
      priority: [
         { type: 1001, name: 'Низкий' },
         { type: 2001, name: 'Средний' },
         { type: 3001, name: 'Высокий' },
      ],
   },
   getters: {
      GET_PRIORITY: state => state.priority,
      GET_CHECKED_PRIORITY_TYPE: (s, getters) => getters.GET_INIT_SETTINGS_TASK.priorityType,
      GET_IS_CHECKED_PRIORITY_TYPE: (s, getters) => type => getters.GET_INIT_SETTINGS_TASK.priorityType === type,
   },
   mutations: {
      SET_CHECKED_PRIORITY_TYPE: (s, { rState, type }) => rState.initSettingsTask.priorityType = type,
      SET_CHECKED_PRIORITY_NAME(state, { rState, type }) {
         const PRIORITY_NAME = state.priority.find(curr => curr.type === type).name;
         rState.initSettingsTask.priority = PRIORITY_NAME;
      },
   },
   actions: {
      SET_CHECKED_PRIORITY_TYPE({ dispatch, commit, rootState }, type) {
         const { todo: { todoModal } } = rootState;

         commit('SET_CHECKED_PRIORITY_TYPE', { rState: todoModal, type });
         dispatch('SET_CHECKED_PRIORITY_NAME', { rState: todoModal, type });
      },
      SET_CHECKED_PRIORITY_NAME: ({ commit }, type) => commit('SET_CHECKED_PRIORITY_NAME', type),
   }
}