import title from './inner-task/title'
import infoList from './inner-task/info-list'
import taskList from './inner-task/task-list'
import pagination from '../../_dry/pagination'


export default {
   namespaced: true,
   modules: {
      title,
      infoList,
      taskList,
      pagination: {
         state: {
            list: [],
            currPage: 1,
            itemsInPage: null,
         },
         ...pagination
      }
   },
   state: {
      scenarioExecutionModal: {},
   },
   getters: {
      GET_SCENARIO_EXECUTION_MODAL: state => state.scenarioExecutionModal,
   },
   mutations: {
      SET_SCENARIO_EXECUTION_MODAL: (state, settings) => state.scenarioExecutionModal = settings,
   },
   actions: {
      SET_SCENARIO_EXECUTION_MODAL: ({ commit }, settings) => commit('SET_SCENARIO_EXECUTION_MODAL', settings),
   },
};