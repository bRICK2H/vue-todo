<template>
   <div class="todo-tasks todo-container__todo-tasks">

      <div class="todo-header todo-tasks__todo-header">
			<!-- Title -->
         <c-title />

			<!-- Information -->
         <c-info />
      </div>
      
		<!-- Task list -->
		<c-task-list />

      <!-- Pagination list -->
      <c-pagination 
         :list="GET_TASKS"
         :itemsInPage="itemsInPage"
      />
		
		<!-- Modal -->
		<cModal/>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';

import cTitle from '@/components/todo/inner-task/c-title'
import cInfo from '@/components/todo/inner-task/c-info'
import cTaskList from '@/components/todo/inner-task/c-task-list'
import cPagination from '@/components/todo/inner-task/c-pagination'

import cModal from '@/components/_dry/modal/c-modal'

export default {
   name: 'cTask',
   components: {
      cTitle,
      cInfo,
      cTaskList,
		cPagination,
		
		cModal,
	},
	data: () => ({
		itemsInPage: 0,
	}),
	computed: {
		...mapGetters('todoTask', ['GET_TASKS'])
	},
	created() {
		const getItemsInPage = () => {
			if (innerWidth < 450) {
				this.itemsInPage = 5;
				return;
			} else if (innerWidth < 1024) {
				this.itemsInPage = 6
				return;
			} else {
				this.itemsInPage = 8;
			}
		}

		getItemsInPage();
		window.addEventListener('resize', getItemsInPage);
	},
}
</script>

<style lang="scss">
.todo-tasks {
   height: 100%;
   display: flex;
   flex-direction: column;
   
	&__todo-header {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin: 3rem 0;

		@media (max-width: 899px) {
			flex-direction: column-reverse;
			align-items: center;
		}
		@media (max-width: 375px) {
			margin: 1rem 0 0 0;
		}
	}		
}
.todo-header {
	&__todo-input-box {
		align-self: flex-end;

		@media (max-width: 899px) {
			align-self: center;
		}
	}
}
</style>