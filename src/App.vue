<template>
  <div class="todo">
	  <div class="todo-container todo__todo-container">
			<!-- Task field -->
			<c-task />

			<!-- Modal -->
			<transition name="show-modal">
		  		<c-modal v-if="GET_IS_SHOW_MODAL" />
			</transition>
	  </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import cModal from '@/components/todo/c-modal'
import cTask from '@/components/todo/c-task'

export default {
	name: 'cTodo',
	components: {
		cModal,
		cTask,
	},
	computed: {
		...mapGetters('todoModal', ['GET_IS_SHOW_MODAL', 'GET_COPY_INIT_TASK']),
	},
	methods: {
		...mapActions('todoModal', ['SAVE_COPY_INIT_TASK', 'CLOSE_MODAL', 'SET_FIRST_PAGINATION_LIST_PAGE']),
	},
	created() {
		this.SAVE_COPY_INIT_TASK();
	},
	destroyed() {
		this.SET_FIRST_PAGINATION_LIST_PAGE();
		if (this.GET_IS_SHOW_MODAL) {
			this.CLOSE_MODAL();
		}
	}
}
</script>

<style lang="scss">
.todo {
	height: 100vh;

	&__todo-container {
		height: inherit;
	}
}
.todo-container {
	position: relative;
	overflow: hidden;
	background: #000;
	box-shadow: 0 0 2rem #000;
	display: flex;
	flex-direction: column;
	align-items: center;

	&__todo-tasks {
		width: 80%;

		@media (max-width: 899px) {
			width: 95%;
		}
	}
	&__todo-modal {
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
	}
}

.show-modal-enter-active {
   top: calc(100% + 3rem);
   animation: show-modal .3s ease-out;
}
@keyframes show-modal {
   100% { top: 0; }
}
.show-modal-leave-active {
   top: 0;
   animation: leave-modal .3s ease-in;
}
@keyframes leave-modal {
   100% {
      top: calc(100% + 3rem);
   }
}
</style>