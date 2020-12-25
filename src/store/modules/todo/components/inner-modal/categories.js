import Vue from 'vue'
const vm = new Vue()

import pagination from '../../../_dry/pagination'

export default {
	modules: {
		pagination: {
			state: {
				list: [],
				currPage: 1,
				itemsInPage: null,
			},
			...pagination,
		},
	},
	state: {
		categories: [
			{
				id: 1,
				name: "Дом",
				isOptions: {
					isDisabled: false,
					isntName: false,
					isIcon: false,
					isEdit: false,
				},
			},
			{
				id: 2,
				name: "Работа",
				isOptions: {
					isDisabled: false,
					isntName: false,
					isIcon: false,
					isEdit: false,
				},
			},
			{
				id: 3,
				name: "Учёба",
				isOptions: {
					isDisabled: false,
					isntName: false,
					isIcon: false,
					isEdit: false,
				},
			},
			{
				id: 4,
				name: "Спорт",
				isOptions: {
					isDisabled: false,
					isntName: false,
					isIcon: true,
					isEdit: false,
				},
				icons: {
					edit: require("@/assets/img/icons/edit.svg"),
					delete: require("@/assets/img/icons/delete.svg"),
				},
			},
		],
		currCategoryIdToDelete: null,
		currCategoryId: 0,
		isWarningCaret: false,
		isWarningTempInput: false,
		currRefInputCategory: '',
		isDirtyCategory: false,
		isEditCategory: false,

		iconSave: require("@/assets/img/icons/save.svg"),
	},
	getters: {
		GET_CATEGORIES: (state) => state.categories,
		GET_CURR_CATEGORY: (state) =>
			state.categories.find((curr) => curr.id === state.currCategoryId),
		GET_CURR_CATEGORY_ID: (state) => state.currCategoryId,
		GET_CURR_CATEGORY_ID_TO_DELETE: (state) => state.currCategoryIdToDelete,
		GET_CHECKED_CATEGORIES_ID: (s, getters) =>
			getters.GET_INIT_SETTINGS_TASK.categoriesId,
		GET_CURR_CATEGORY_INDEX: (state) => (id) =>
			state.categories.findIndex((curr) => curr.id === id),
		GET_CURR_INDEX_CATEGORY_EDIT: (state) =>
			state.categories.findIndex((curr) => curr.isOptions.isEdit),
		GET_NEW_NAME_CATEGORY: (state) =>
			state.categories.find((curr) => curr.id === state.currCategoryId).name,
		GET_INDEX_CUSTOM_CHECKED_CATEGORY: (s, getters) => (id) =>
			getters.GET_INIT_SETTINGS_TASK.categoriesId.findIndex(
				(curr) => curr === id
			),
		GET_CURR_REF_INPUT_CATEGORY: state => state.currRefInputCategory,

		GET_IS_CURR_CATEGORY_EDIT: (state) => (id) =>
			state.categories.find((curr) => curr.id === id).isOptions.isEdit,
		GET_IS_NO_SET_NAME_NEW_CATEGORY: (state) =>
			state.categories.some((curr) => curr.isOptions.isntName),
		GET_IS_SOME_EDIT_CATEGORY: (state) =>
			state.categories.some((curr) => curr.isOptions.isEdit),
		GET_IS_CHECKED_CATEGORIES: (s, getters) => (id) =>
			getters.GET_INIT_SETTINGS_TASK.categoriesId.includes(id),
		// GET_IS_DIRTY_CATEGORY: state => state.isDirtyCategory,
		// GET_IS_SAVE_CATEGORY: state => state.isEditCategory,

		GET_CLASS_OF_WARNING_TEMP_INPUT: (state) => ({
			"categories-list__temp-input--error": state.isWarningTempInput,
		}),
		GET_CLASS_OF_WARNING_CARET: (state) => ({
			"categories-list__temp-input--caret-error": state.isWarningCaret,
		}),
		GET_CLASS_ERROR_OF_DIRTY_CATEGORY: state => state.isDirtyCategory ? 'categories-list__error--dirty' : '',
		GET_CLASS_ERROR_OF_EDIT_CATEGORY: state => state.isEditCategory ? 'categories-list__error--edit' : '',

		GET_ICON_SAVE: (state) => state.iconSave,
	},
	mutations: {
		OPEN_NEW_CATEGORY(state, options) {
			const { id } = options;
			state.currCategoryId = id;
			state.categories.push(options);
		},
		SET_NAME_NEW_CATEGORY: (state, { CURR_CATEGORY, categoryName, rS }) => {
			CURR_CATEGORY["name"] = categoryName;
			const CURR_INDEX = rS.category.findIndex(curr => curr.id === state.currCategoryId);

			if (CURR_INDEX !== -1) {
				vm.$set(rS.category[CURR_INDEX], 'name', categoryName);
			}

		},
		ADD_NEW_CATEGORY(state, { index, isOptions }) {
			for (const key in isOptions) {
				vm.$set(state.categories[index].isOptions, key, isOptions[key]);
			}
		},
		UPDATE_CATEGORY(state, { index, isOptions }) {
			state.categories.forEach((curr) => {
				vm.$set(curr.isOptions, "isEdit", false);
				vm.$set(curr.isOptions, "isDisabled", false);
			});
			vm.$set(state.categories[index].isOptions, "isEdit", isOptions.isEdit);
			vm.$set(
				state.categories[index].isOptions,
				"isDisabled",
				isOptions.isDisabled
			);
			state.currCategoryId = state.categories[index].id;
		},
		SET_CATEGORY_ID_TO_DELETE: (state, id) => (state.currCategoryIdToDelete = id),
		DELETE_CATEGORY(state, { index, checkedIndex, categoriesId, rS, id }) {
			vm.$delete(state.categories, index);
			vm.$delete(categoriesId, checkedIndex);

			rS.category.forEach((curr, cIndex) => {
				if (curr.id === id) {
					vm.$delete(rS.category, cIndex);
				}
			});
		},
		DELETE_NO_SET_CATEGORY: (state, { index }) =>
			vm.$delete(state.categories, index),

		SET_CHECKED_CATEGORIES_ID: (s, { rState, categoriesId }) =>
			(rState.initSettingsTask.categoriesId = categoriesId),
		CREATE_CHECKED_CATEGORIES(state, { rState, categoriesId }) {
			if (!categoriesId.length) {
				vm.$set(rState.initSettingsTask, "category", []);
				return;
			}

			const CHECKED_CATEGORIES = state.categories
				.filter((curr) => categoriesId.includes(curr.id))
				.reduce((acc, curr) => {
					acc.push({
						id: curr.id,
						name: curr.name,
					});

					return acc;
				}, []);

			vm.$set(rState.initSettingsTask, "category", CHECKED_CATEGORIES);
		},

		SET_CLASS_WARNING_CARET: (state, bool) => (state.isWarningCaret = bool),
		SET_ERROR_INPUT_CATEGORY: (state, { isDirtyCategory, isEditCategory }) => {
			state.isDirtyCategory = isDirtyCategory;
			state.isEditCategory = isEditCategory;
		},
		SET_CURR_REF_INPUT_CATETORY: (state, ref) => state.currRefInputCategory = ref,
	},
	actions: {
		OPEN_NEW_CATEGORY({ dispatch, commit }, options) {
			commit("OPEN_NEW_CATEGORY", options);
			dispatch("SET_NEXT_PAGINATION_LIST_PAGE");
		},
		SET_NAME_NEW_CATEGORY: ({ commit, getters, state, rootState }, categoryName) => {
			const {
				todo: {
					todoModal: { initSettingsTask },
				},
			} = rootState;

			const CURR_CATEGORY = getters.GET_CURR_CATEGORY;

			if (CURR_CATEGORY["name"].length > 10) {
				state.isWarningTempInput = true;

				setTimeout(() => {
					commit("SET_NAME_NEW_CATEGORY", {
						CURR_CATEGORY,
						categoryName: CURR_CATEGORY["name"].slice(0, -1),
					});
					state.isWarningTempInput = false;
				}, 200);
			}

			commit("SET_NAME_NEW_CATEGORY", { CURR_CATEGORY, categoryName, rS: initSettingsTask });
		},
		ADD_NEW_CATEGORY({ commit, getters }, { id, isOptions }) {
			commit("ADD_NEW_CATEGORY", {
				index: getters.GET_CURR_CATEGORY_INDEX(id),
				isOptions,
			});
		},
		UPDATE_CATEGORY({ commit, getters }, { id, isOptions }) {
			commit("UPDATE_CATEGORY", {
				index: getters.GET_CURR_CATEGORY_INDEX(id),
				isOptions,
			});
		},
		SET_CATEGORY_ID_TO_DELETE({ dispatch, commit }, { categoryId, isModal }) {
			commit("SET_CATEGORY_ID_TO_DELETE", categoryId);

			if (isModal) {
				dispatch(
					"SET_SETTINGS_OF_DELETE",
					{
						method: "DELETE_CATEGORY",
						namespace: "todoModal",
						typeOfModal: "cModalDelete",
					},
					{ root: true }
				);
			} else {
				dispatch('DELETE_CATEGORY');
			}
		},
		DELETE_CATEGORY({ dispatch, commit, getters, rootState }) {
			const {
				todo: {
					todoModal: { initSettingsTask },
				},
			} = rootState;
			const CURR_DELETE_ID = getters.GET_CURR_CATEGORY_ID_TO_DELETE;
			commit("DELETE_CATEGORY", {
				index: getters.GET_CURR_CATEGORY_INDEX(CURR_DELETE_ID),
				checkedIndex: getters.GET_INDEX_CUSTOM_CHECKED_CATEGORY(CURR_DELETE_ID),
				categoriesId: getters.GET_INIT_SETTINGS_TASK.categoriesId,
				rS: initSettingsTask,
				id: CURR_DELETE_ID,
			});
			dispatch("SET_PREV_PAGINATION_LIST_PAGE");
		},
		DELETE_NO_SET_CATEGORY({ dispatch, commit, getters }) {
			commit("DELETE_NO_SET_CATEGORY", {
				index: getters.GET_CURR_INDEX_CATEGORY_EDIT,
			});
			dispatch("SET_PREV_PAGINATION_LIST_PAGE");
		},

		SET_CHECKED_CATEGORIES_ID({ dispatch, commit, rootState }, categoriesId) {
			const {
				todo: { todoModal },
			} = rootState;
			commit("SET_CHECKED_CATEGORIES_ID", {
				rState: todoModal,
				categoriesId,
			});
			dispatch("CREATE_CHECKED_CATEGORIES", {
				rState: todoModal,
				categoriesId,
			});
		},
		CREATE_CHECKED_CATEGORIES: ({ commit }, settings) =>
			commit("CREATE_CHECKED_CATEGORIES", settings),

		SET_CLASS_WARNING_CARET({ commit }) {
			commit("SET_CLASS_WARNING_CARET", true);

			setTimeout(() => {
				commit("SET_CLASS_WARNING_CARET", false);
			}, 100);
		},
		SET_ERROR_INPUT_CATEGORY: ({ commit, getters }, { isSave } = { isSave: false }) => {
			commit('SET_ERROR_INPUT_CATEGORY', {
				isDirtyCategory: !Boolean(getters.GET_NEW_NAME_CATEGORY),
				isEditCategory: Boolean(getters.GET_NEW_NAME_CATEGORY),
			});

			if (isSave) {
				commit('SET_ERROR_INPUT_CATEGORY', {
					isDirtyCategory: false,
					isEdit: false,
				})
			}
		},
		SET_CURR_REF_INPUT_CATETORY: ({ commit }, ref) => commit('SET_CURR_REF_INPUT_CATETORY', ref),
	},
};