import Vue from 'vue';
const vm = new Vue;

export default {
	state: {
		taskList: [
			{
				id: 1,
				title: 'Изучить Vue.js',
				description: 'Изучить Vue.js и все связанные технологии',
				categoriesId: [3],
				category: [{ id: 3, name: 'Учёба' }],
				priority: 'Высокий',
				priorityType: 3001,
				completed: true,
				isShowCategory: false,
				locale: new Date(2020, (8 - 1), 19, 10, 50),
			},
			{
				id: 2,
				title: 'Повесить турник',
				description: '',
				categoriesId: [1, 4],
				category: [
					{ id: 1, name: 'Дом' },
					{ id: 4, name: 'Спорт' },
				],
				priority: 'Низкий',
				priorityType: 1001,
				completed: false,
				isShowCategory: false,
				locale: new Date(2020, (6 - 1), 15, 14, 30),
			},
			{
				id: 3,
				title: 'Заказать новый аккумулятор для iPhone X',
				description:
					'Заказать новый аккумулятор для iPhone X с ёмкостью 2716 мАч',
				categoriesId: [2],
				category: [{ id: 2, name: 'Работа' }],
				priority: 'Средний',
				priorityType: 2001,
				completed: false,
				isShowCategory: false,
				locale: new Date(2020, (6 - 1), 15, 13, 0),
			},
		],
		currCachedTask: {},
		currTaskIdToDelete: null,
		classTransitionGroupTasks: 'move-tasks',
		sortSettings: {
			title: { side: false },
			priorityType: { side: false },
			locale: { side: false },
			completed: { side: false },
		},
		iconEdit: require('@/assets/img/icons/edit.svg'),
		iconDelete: require('@/assets/img/icons/delete.svg'),
		iconSortAsc: require('@/assets/img/icons/sort-asc.svg'),
		iconSortDesc: require('@/assets/img/icons/sort-desc.svg'),
	},
	getters: {
		GET_TASKS: (state) => state.taskList,
		GET_CURR_TASK: (state) => (id) =>
			state.taskList.find((curr) => curr.id === id),
		GET_CURR_INDEX_TASK: (state) => (id) =>
			state.taskList.findIndex((curr) => curr.id === id),
		GET_NEW_ID_TASKS: (state) =>
			Math.max.apply(
				null,
				state.taskList.map((curr) => curr.id)
			) + 1,
		GET_CURR_TASK_ID_TO_DELETE: (state) => state.currTaskIdToDelete,
		GET_IS_MODAL_DELETE_TASK: (state) => state.isModalDeleteTask,

		GET_ICON_EDIT: (state) => state.iconEdit,
		GET_ICON_DELETE: (state) => state.iconDelete,
		GET_ISON_SORT: (state) => (type) => state.sortSettings[type].side ? state.iconSortDesc : state.iconSortAsc,

		GET_CURR_CACHED_TASK: (state) => state.currCachedTask,
	},
	mutations: {
		CREATE_NEW_TASK: (state, { id, task }) => {
			task.id = id;
			state.taskList.push(task);
		},
		UPDATE_COMPLETED_TASK: (state, { index, task }) =>
			vm.$set(state.taskList, index, task),
		DELETE_TASK: (state, index) => vm.$delete(state.taskList, index),
		SET_TASK_ID_TO_DELETE: (state, id) => state.currTaskIdToDelete = id,
		SET_COMPLETED_TASK(state, { id, completed }) {
			state.taskList.find((curr) => curr.id === id).completed = completed;
		},

		SET_CURR_CACHED_TASK: (state, currTask) =>
			(state.currCachedTask = { ...currTask }),
		SET_IS_SHOW_CATEGORY(state, index) {
			const currIsShowCategory =
				index !== null ? state.taskList[index].isShowCategory : null;
			state.taskList.forEach((curr) => (curr.isShowCategory = false));

			if (index !== null) {
				vm.$set(
					state.taskList[index],
					'isShowCategory',
					!currIsShowCategory
				);
			}
		},
		SET_IS_HIDE_CURR_CATEGORY: (state, index) => { vm.$set(state.taskList[index], 'isShowCategory', false) },

		SET_SORT: (state, type) => {
			state.taskList.sort(( { [type]: a }, { [type]: b } ) => {
				switch(type) {
					case 'completed':
						return state.sortSettings[type].side
							? String(Number(a)).localeCompare(String(Number(b)))
							: String(Number(b)).localeCompare(String(Number(a)))
					case 'locale':
						return state.sortSettings[type].side
							? new Date(a) - new Date(b)
							: new Date(b) - new Date(a)
					case 'title':
						return state.sortSettings[type].side
							? a.localeCompare(b)
							: b.localeCompare(a)
					case 'priorityType':
						return state.sortSettings[type].side
							? a - b
							: b - a
				}
			});

			state.sortSettings[type].side = !state.sortSettings[type].side;	
		},
	},
	actions: {
		DELEGATE_TO_SCENARIO_EXECUTION_MODAL(
			{ commit, dispatch, getters },
			{ id, isCreated }
		) {
			const SCENARIO_EXECUTION_MODAL = isCreated
				? { methodName: 'createTask', buttonName: 'Создать', isCreated }
				: { methodName: 'updateTask', buttonName: 'Изменить', isCreated };

			commit('SET_IS_SHOW_CATEGORY', null);
			dispatch('SET_SCENARIO_EXECUTION_MODAL', SCENARIO_EXECUTION_MODAL);

			if (!isCreated) {
				commit('SET_CURR_CACHED_TASK', getters.GET_CURR_TASK(id));
				setTimeout(() => {
					dispatch(
						'todoModal/SET_CURR_EXISTING_TASK',
						getters.GET_CURR_TASK(id),
						{ root: true }
					);
				}, 200);
			}

			dispatch('todoModal/SET_IS_SHOW_MODAL', true, { root: true });
		},

		CREATE_NEW_TASK: ({ dispatch, commit, getters }, task) => {
			commit('CREATE_NEW_TASK', { id: getters.GET_NEW_ID_TASKS, task });
			dispatch('todoTask/SET_NEXT_PAGINATION_LIST_PAGE', null, {
				root: true,
			});
			dispatch('todoModal/SET_IS_SHOW_MODAL', false, { root: true });
		},
		UPDATE_COMPLETED_TASK: ({ dispatch, commit, getters }, task) => {
			commit('UPDATE_COMPLETED_TASK', {
				index: getters.GET_CURR_INDEX_TASK(task.id),
				task,
			});
			dispatch('todoModal/SET_IS_SHOW_MODAL', false, { root: true });
		},
		SET_TASK_ID_TO_DELETE({ dispatch, commit }, id) {
			commit('SET_TASK_ID_TO_DELETE', id);
			dispatch('SET_SETTINGS_OF_DELETE', {
				method: 'DELETE_TASK',
				namespace: 'todoTask',
				typeOfModal: 'cModalDelete',
			},
				{ root: true }
			);
		},
		DELETE_TASK({ dispatch, commit, getters }) {
			commit('DELETE_TASK', getters.GET_CURR_INDEX_TASK(getters.GET_CURR_TASK_ID_TO_DELETE))
			dispatch('todoTask/SET_PREV_PAGINATION_LIST_PAGE', null, { root: true });
		}, 

		SET_COMPLETED_TASK: ({ dispatch, commit }, settings) => {
			commit('SET_COMPLETED_TASK', settings);
			dispatch('SET_IS_HIDE_CURR_CATEGORY', settings.id);
		},
		SET_IS_HIDE_CURR_CATEGORY: ({ commit, getters }, id) =>
			commit('SET_IS_HIDE_CURR_CATEGORY', getters.GET_CURR_INDEX_TASK(id)),
		SET_IS_SHOW_CATEGORY: ({ commit, getters }, id) =>
			commit('SET_IS_SHOW_CATEGORY', getters.GET_CURR_INDEX_TASK(id)),
			
		SET_SORT: ({ commit }, type) => commit('SET_SORT', type),
	},

};