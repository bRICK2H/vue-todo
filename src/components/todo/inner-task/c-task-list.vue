<template>
	<ul class="task-list">
		<li class="task-item task-list__task-item">
			<span class="task-item__cell task-item__cell--name task-item__cell--title">
				Название
				<img class="task-item__sort"
					:src="GET_ISON_SORT('title')"
					alt="sort"
					@click="SET_SORT('title')"
				>
			</span>
			<span class="task-item__cell task-item__cell--name task-item__cell--categories">Категории</span>
			<span class="task-item__cell task-item__cell--name task-item__cell--priority">
				Приоритет
				<img class="task-item__sort"
					:src="GET_ISON_SORT('priorityType')"
					alt="sort"
					@click="SET_SORT('priorityType')"
				>
			</span>
			<span class="task-item__cell task-item__cell--name task-item__cell--locale">
				Дата
				<img class="task-item__sort"
					:src="GET_ISON_SORT('locale')"
					alt="sort"
					@click="SET_SORT('locale')"
				>
			</span>
			<span class="task-item__cell task-item__cell--name task-item__cell--management">
				Управление
				<img class="task-item__sort"
					:src="GET_ISON_SORT('completed')"
					alt="sort"
					@click="SET_SORT('completed')"
				>
			</span>
		</li>
		<transition-group tag="ul" name="move-tasks" v-if="GET_PAGINATION_LIST.length">
			<li class="task-item task-list__task-item task-item--row"
				v-for="task of GET_PAGINATION_LIST"
				:class="{ 'task-item--completed': task.completed }"
				:key="task.id"
			>
				<span class="task-item__cell task-item__cell--title">{{ task.title | title }}</span>
				<div class="cell-categories task-item__cell task-item__cell--categories task-item__cell-categories"
					:class="{ 'cell-categories--active': task.isShowCategory, 'cell-categories--more': task.category.length > 1 }"
				>
					<div class="cell-categories__f-item">

						{{ task.category | isCategory }}

						<img class="cell-categories__open-item"
							v-if="task.category.length > 1"
							:class="{ 'cell-categories__open-item--active': task.isShowCategory }"
							:src="task.id === currCategoryId && task.isShowCategory ? iconMenuOpen: iconMenu"
							alt="menu"
							@click="openCategories(task.id, task.completed)"
						/>
					</div>

					<transition name="show-categories">
						<ul class="cell-categories__o-list"
							v-if="task.id === currCategoryId && task.isShowCategory"
						>
							<li class="cell-categories__o-item"
								v-for="(cat, index) of task.category.slice(1)"
								:key="index"
							>
								{{ cat.name }}
							</li>
						</ul>
					</transition>
				</div>
				<span class="task-item__cell task-item__cell--priority">
					{{ task.priority }}
				</span>
				<div class="cell-locale task-item__cell task-item__cell--locale task-item__cell-locale">
					<span class="cell-locale__locale">{{ task.locale | locale }}</span>
				</div>
				<div class="cell-management task-item__cell task-item__cell--management task-item__cell-management">
					<span class="cell-management__box-icon cell-management__box-icon--edit"
						@click="editTask(task.id, task.completed)"
					>
						<img class="cell-management__icon"
							:src="GET_ICON_EDIT"
							alt="edit"
						>
					</span>
					<span class="cell-management__box-icon cell-management__box-icon--delete"
						@click="deleteTask(task.id)"
					>
						<img class="cell-management__icon"
							:src="GET_ICON_DELETE"
							alt="delete"
						>
					</span>
					<label class="cell-management__label"
						:class="{ 'cell-management__label--active': task.completed }"
						:for="`management-${task.id}`"
						@change="completedTask($event, task.id)"
					>
						<input type="checkbox" class="cell-management__checkbox"
							:checked="task.completed"
							:id="`management-${task.id}`"
						>
					</label>
				</div>
			</li>
		</transition-group>
		<div class="task-list__empty-item" v-else>
			Список задач пуст
		</div>
	</ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'cTaskList',
	data: () => ({
		currCategoryId: null,
		iconMenu: require('@/assets/img/icons/menu.svg'),
		iconMenuOpen: require('@/assets/img/icons/menu-open.svg'),
	}),
	filters: {
		title(val) {
			return val.length > 35 ? `${val.slice(0, 35)}...` : val;
		},
		locale(val) {
			const DATE = val.toLocaleDateString();
			const TIME = val.toLocaleTimeString();
			const [ hours, minutes ] = TIME.split(':');

			return `${DATE}
				${hours} : ${minutes}`;
		},
		isCategory(val) {
			return val.length !== 0 ? val[0].name : 'не выбраны';
		}
	},
	computed: {
		...mapGetters('todoTask', [
			'GET_TASKS',
			'GET_ICON_EDIT',
			'GET_ICON_DELETE',
			'GET_ISON_SORT',

			'GET_PAGINATION_LIST',
		]),
	},
	methods: {
		...mapActions('todoTask', [
			'DELEGATE_TO_SCENARIO_EXECUTION_MODAL',
			'SET_IS_SHOW_CATEGORY',
			'SET_COMPLETED_TASK',

			'SET_TASK_ID_TO_DELETE',

			'SET_SORT',
		]),
		completedTask({ target }, taskId) {
			this.SET_COMPLETED_TASK({
				id: taskId,
				completed: target.checked
			})
		},
		editTask(taskId, isCompleted) {
			if (isCompleted) return;
			this.DELEGATE_TO_SCENARIO_EXECUTION_MODAL({
				id: taskId,
				isCreated: false
			});
		},
		deleteTask(taskId) {
			this.SET_TASK_ID_TO_DELETE(taskId);
		},
		openCategories(taskId, isCompleted) {
			if (isCompleted) return;
			this.currCategoryId = taskId;
			this.SET_IS_SHOW_CATEGORY(taskId);
		},
	},
}
</script>

<style lang="scss">
	.task-list {
		height: 35rem;

		@media (max-width: 899px) {
			height: 25rem;
		}
		
		&__task-item {
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
		&__empty-item {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.task-item {
			margin-bottom: .5rem;

		&--row {
			background: #222;
			color: #fff;
		}
		&--completed {
			position: relative;
			color: #777;

			&::after {
				content: '';
				width: 3rem;
				height: 3rem;
				position: absolute;
				top: 0;
				left: 0;
				clip-path: polygon(0 0, 100% 0, 0 100%);
				animation: completed-item .2s ease-in forwards;

				@keyframes completed-item {
					100% { background: #40bf68 }
				}
			}
			&::before {
				content: '';
				width: 100%;
				height: 100%;
				position: absolute;
				opacity: 0;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				background: #666;
				animation: completed-bg .2s ease-out forwards;

				@keyframes completed-bg {
					100% { opacity: .5; }
				}
			}

			& .cell-management__box-icon--edit {
				background: #52656b;
				cursor: no-drop;

				&:hover {
					background: #52656b;
				}
			}
			& .cell-categories {
				&__f-item {
					color: #656565;
				}
				&--more {
					background: #555;
				}
				&__open-item {
					cursor: no-drop;
					filter: invert(0.4);
				}
			}
		}
		&__cell {
			padding: 1.5rem 0;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1.6rem;
			backface-visibility: hidden;

			@media (max-width: 899px) {
				font-size: 1.4rem;
				padding: 1.2rem 0;
			}

			&--name {
				font-size: 1.8rem;
				font-weight: 400;
				padding: 2rem 0;

				@media (max-width: 899px) {
					font-size: 1.6rem;
				}
				@media (max-width: 414px) {
					font-size: 1.6rem;
				}
			}
			&:first-child {
				text-align: left;
				padding-left: 1rem;
				justify-content: flex-start;
			}
			&--title {
				height: 3rem;
				flex: 0 1 30%;
				@media (max-width: 699px) {
					flex: 0 1 40%;
				}
				@media (max-width: 375px) {
					flex: 0 1 50%;
				}
			}
			&--categories, &--priority,
			&--management, &--locale {
				flex: 0 1 15%;
			}

			@media (max-width: 799px) {
				&--priority {
					display: none;
				}
			}
			@media (max-width: 699px) {
				&--categories {
					display: none;
				}
			}
			@media (max-width: 375px) {
				&--locale {
					display: none;
				}
			}
		}

		&__sort {
			filter: invert(1);
			cursor: pointer;
			margin: .2rem 0 0 1rem;
			transition: .2s;

			&:hover {
				filter: invert(.5);
			}
		}
	}

	.cell-categories {
		height: 3.2rem;
		font-size: 1.6rem;
		color: #fff;
		position: relative;
		font-weight: 400;
		border-radius: .4rem;

		@media (max-width: 899px) {
			font-size: 1.4rem;
		}

		&--active {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
		&--more {
			background: #fff;
			color: #000;
		}
		
		&__f-item {
			width: 100%;
			height: inherit;
			user-select: none;
			text-align: center;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&__o-list {
			width: 100%;
			background: #fff;
			position: absolute;
			top: 100%;
			z-index: 3;
			text-align: center;
			border-bottom-left-radius: .4rem;
			border-bottom-right-radius: .4rem;

			&:after {
				content: '';
				width: 100%;
				height: calc(100% + 3.2rem);
				position: absolute;
				top: -3.2rem;
				left: 0;
				box-shadow: inset 0 0 2rem #000;
			}

		}
		&__o-item {
			user-select: none;
			padding: .9rem 0;
		}
		&__open-item {
			position: absolute;
			top: 0rem;
			right: -3.5rem;
			border-radius: .4rem;
			padding: .4rem;

			transform: rotate(0deg);
			
			backface-visibility: hidden;
			z-index: 4;
			filter: invert(1);
			transition: .2s;

			&--active {
				top: -1rem;
				right: -1rem;
				transform: rotate(-45deg);
				border-radius: 50%;
				filter: invert(0);
				background: #fff;
				box-shadow: -.2rem 0 .5rem #222;
			}
		}
	}

	.cell-management {
		display: flex;
		justify-content: center;

		&__box-icon {
			width: 3rem;
			height: 3rem;
			margin: 0 .5rem;
			border-radius: .3rem;
			position: relative;
			cursor: pointer;
			transition: .3s;

			@media (max-width: 699px) {
				width: 2.5rem;
				height: 2.5rem;
			}

			&--edit {
				background: #54c4e8;
				&:hover {
					background: #add8e6;
				}
			}
			&--delete {
				background: #f05656;
				&:hover {
					background: #f08080;
				}
			}
		}
		&__icon {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		&__label {
			width: 3rem;
			height: 3rem;
			margin: 0 .5rem;
			border-radius: .3rem;
			background: #fff;
			user-select: none;

			@media (max-width: 699px) {
				width: 2.5rem;
				height: 2.5rem;
			}

			&--active {
				background: #40c168;
				position: relative;

				&::after {
					content: '';
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					background: url('/static/icons/check.svg') no-repeat center / cover;
				}
			}
		}
		&__checkbox {
			display: none;
		}
	}
	.cell-locale {
		text-align: center;
		white-space: pre-line;
	}

	.show-categories-enter, .show-categories-leave-to {
		opacity: 0;
		top: 75%;
	}
	.show-categories-enter-active, .show-categories-leave-active {
		transition: .2s;
	}
	.show-categories-enter-to {
		top: 100%;
		opacity: 1;
	}

	.move-tasks-enter {
		transform: translateY(100%);
		opacity: 0;
	}
	.move-tasks-enter-active {
		transition: .5s;
	}
	.move-tasks-enter-to {
		opacity: 1;
		transform: translateY(0);
	}

	.delete-tasks-leave-active {
		transition: .5s;
	}
	.delete-tasks-leave-to {
		opacity: 0;
		transform: translateX(-50%);
	}

</style>
