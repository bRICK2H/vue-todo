/**
 * Title in Modal
 */

export default {
	state: {
		isValidTitle: true,
		isDirtyTitle: false,
		isErrorTitle: false,
		linkTitle: null,
	},
	getters: {
		GET_LINK_CARET_TITLE: (state) => state.linkTitle,
		GET_CURR_TITLE: (s, getters) => getters.GET_INIT_SETTINGS_TASK["title"],
		GET_IS_ERROR_TITLE: (state) => state.isErrorTitle,

		GET_CLASS_ERROR_TITLE: (s, getters) => ({
			"modal-content__title--error": getters.GET_IS_ERROR_TITLE,
		}),
	},
	mutations: {
		SET_LINK_CARET_TITLE: (state, link) => (state.linkTitle = link),
		SET_CURR_TITLE: (state, { rState, title }) => {
			const regExp = /^\s+$/g;

			state.isValidTitle = Boolean(title.length) && !regExp.test(title);
			state.isDirtyTitle = true;
			state.isErrorTitle = !(state.isValidTitle && state.isDirtyTitle);

			rState.initSettingsTask.title = title;
		},
		SET_DEFAULT_SETTINGS_TO_VALID_TITLE(state) {
			state.isValidTitle = true;
			state.isDirtyTitle = false;
			state.isErrorTitle = false;
		}
	},
	actions: {
		SET_LINK_CARET_TITLE: ({ commit }, link) =>
			commit("SET_LINK_CARET_TITLE", link),
		SET_CURR_TITLE({ commit, rootState }, title) {
			const {
				todo: { todoModal },
			} = rootState;
			commit("SET_CURR_TITLE", { rState: todoModal, title });
		},
		SET_DEFAULT_SETTINGS_TO_VALID_TITLE({ commit }) {
			commit("SET_DEFAULT_SETTINGS_TO_VALID_TITLE");
		},
	},
};