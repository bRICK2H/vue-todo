<template>
   <ul class="todo-info todo-header__todo-info">
      <li class="todo-info__total">
         Всего:
         <span class="todo-info__result">
            {{ _GET_COUNT_ALL_TASKS }}
         </span>
      </li>
      <li class="todo-info__completed">
         Завершенных:
         <span class="todo-info__result">
            {{ _GET_COUNT_COMPLETED_TASKS }}
         </span>
      </li>
      <li class="todo-info__uncompleted">
         Незавершенных:
         <span class="todo-info__result">
            {{ _GET_COUNT_PROCESS_TASKS }}
         </span>
      </li>
   </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
   name: 'cInfo',
   computed: mapGetters('todoTask', [
      '_GET_COUNT_ALL_TASKS',
      '_GET_COUNT_COMPLETED_TASKS',
      '_GET_COUNT_PROCESS_TASKS',
   ]),
}
</script>

<style lang="scss">
.todo-info {
   font-size: 1.6rem;

	@media (max-width: 899px) {
		width: 18rem;
		margin-bottom: 3rem;
	}

	&__total, &__completed {
      margin-bottom: .5rem;
	}
   &__total, &__completed, &__uncompleted {
      padding: .8rem 1rem;
      border-radius: .5rem;
      display: flex;
      justify-content: space-between;

		@media (max-width: 899px) {
			padding: .5rem;
		}
   }
   &__total {
      background: #377796;
   }
   &__completed {
      background: #2d7b2c;
   }
   &__uncompleted {
      background: #c33737;
   }
   &__result {
      margin-left: 1rem;
   }
}
</style>