import title from './inner-modal/title'
import description from './inner-modal/description'
import categories from './inner-modal/categories'
import priority from './inner-modal/priority'

export default {
	namespaced: true,
	modules: {
		title,
		description,
		categories,
		priority,
	},
	state: {
		isShowModal: false,
		initSettingsTask: {
			id: null,
			title: '',
			description: '',
			categoriesId: [1],
			category: [{ id: 1, name: 'Дом' }],
			priorityType: 1001,
			priority: 'Низкий',
			completed: false,
			isShowCategory: false,
			date: null,
			time: null,
		},
		copyInitTask: {},
	},
	getters: {
		GET_IS_SHOW_MODAL: (state) => state.isShowModal,
		GET_INIT_SETTINGS_TASK: (state) => state.initSettingsTask,
		GET_COPY_INIT_TASK: (state) => state.copyInitTask,
	},
	mutations: {
		SET_IS_SHOW_MODAL: (state, bool) => (state.isShowModal = bool),
		SET_CURR_EXISTING_TASK: (state, existingTask) =>
			(state.initSettingsTask = { ...existingTask }),

		SAVE_COPY_INIT_TASK: (state) =>
			(state.copyInitTask = { ...state.initSettingsTask }),
		SET_DEFAULT_SETTINGS_TO_TASK: (state, copyInitTask) =>
			(state.initSettingsTask = { ...copyInitTask }),
		SET_LOCALE(state) {
			state.initSettingsTask.locale = new Date();
		},
	},
	actions: {
		SET_IS_SHOW_MODAL: ({ commit }, bool) =>
			commit('SET_IS_SHOW_MODAL', bool),
		SET_CURR_EXISTING_TASK: ({ commit }, existingTask) =>
			commit('SET_CURR_EXISTING_TASK', existingTask),

		SAVE_COPY_INIT_TASK: ({ commit }) => commit('SAVE_COPY_INIT_TASK'),
		SET_DEFAULT_SETTINGS_TO_TASK: ({ commit }, copyInitTask) =>
			commit('SET_DEFAULT_SETTINGS_TO_TASK', copyInitTask),
		SET_LOCALE: ({ commit }) => commit('SET_LOCALE'),

		DELEGATE_TO_CREATE_NEW_TASK({ dispatch, commit, getters }) {
			dispatch('todoTask/CREATE_NEW_TASK', getters.GET_INIT_SETTINGS_TASK, {
				root: true,
			});
			dispatch('todoModal/SET_FIRST_PAGINATION_LIST_PAGE', null, {
				root: true,
			});
			commit('SET_DEFAULT_SETTINGS_TO_TASK', getters.GET_COPY_INIT_TASK);
		},
		DELEGATE_TO_UPDATE_COMPLETED_TASK({ dispatch, commit, getters }) {
			dispatch(
				'todoTask/UPDATE_COMPLETED_TASK',
				getters.GET_INIT_SETTINGS_TASK,
				{ root: true }
			);
			dispatch('todoModal/SET_FIRST_PAGINATION_LIST_PAGE', null, {
				root: true,
			});
			commit('SET_DEFAULT_SETTINGS_TO_TASK', getters.GET_COPY_INIT_TASK);
		},
		CLOSE_MODAL: ({ dispatch, commit, getters, rootGetters }) => {
			const { isCreated } = rootGetters[
				'todoTask/GET_SCENARIO_EXECUTION_MODAL'
			];

			if (!isCreated) {
				dispatch(
					'todoTask/UPDATE_COMPLETED_TASK',
					rootGetters['todoTask/GET_CURR_CACHED_TASK'],
					{ root: true }
				);
			} else {
				dispatch(
					'todoTask/UPDATE_COMPLETED_TASK',
					getters.GET_INIT_SETTINGS_TASK,
					{ root: true }
				);
			}
			commit('SET_DEFAULT_SETTINGS_TO_TASK', getters.GET_COPY_INIT_TASK);
			dispatch('SET_DEFAULT_SETTINGS_TO_VALID_TITLE');
			dispatch('DELETE_NO_SET_CATEGORY');
		},
	},
};