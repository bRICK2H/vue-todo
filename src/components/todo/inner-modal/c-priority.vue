<template>
   <div class="modal-priority modal-content__modal-priority">
      <span class="modal-priority__name">Приоритет</span>
      <ul class="modal-priority__list">
         <li class="modal-priority__item"
            v-for="priority of GET_PRIORITY"
            :key="priority.type"
            :class="{ 'modal-priority__item--active': GET_IS_CHECKED_PRIORITY_TYPE(priority.type) }"
         >
            {{ priority.name }}
				<label :for="priority.type" class="modal-priority__label"
               :class="{ 'modal-priority__label--active': GET_IS_CHECKED_PRIORITY_TYPE(priority.type) }"
            >
               <input type="radio" class="modal-priority__input"
                  :id="priority.type"
                  :value="priority.type"
                  v-model="currPriority"
               >
            </label>
         </li>
      </ul>
		<div class="modal-create">
			<button class="modal-create__button"
				@click="dynamicMethod(GET_SCENARIO_EXECUTION_MODAL)"
			>
				{{ GET_SCENARIO_EXECUTION_MODAL['buttonName'] }}
			</button>
		</div>
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
   name: 'cPriority',
   computed: {
      ...mapGetters('todoModal', [
         'GET_PRIORITY',
			'GET_IS_CHECKED_PRIORITY_TYPE',
			'GET_LINK_CARET_TITLE',
         'GET_CHECKED_PRIORITY_TYPE',
			'GET_IS_ERROR_TITLE',
		]),
		...mapGetters('todoTask', [
			'GET_SCENARIO_EXECUTION_MODAL',
		]),
      currPriority: {
         get() {
            return this.GET_CHECKED_PRIORITY_TYPE;
         },
         set(type) {
            this.SET_CHECKED_PRIORITY_TYPE(type);
         }
      },
   },
   methods: {
      ...mapActions('todoModal', [
			'SET_CHECKED_PRIORITY_TYPE',
			'SET_LOCALE',
			'DELEGATE_TO_UPDATE_COMPLETED_TASK',
			'DELEGATE_TO_CREATE_NEW_TASK',
		]),
		dynamicMethod({ methodName }) {
			if (this.GET_IS_ERROR_TITLE) {
				this.GET_LINK_CARET_TITLE.focus();
				return;
			};

			this.SET_LOCALE();
			this[methodName]();
		},
		createTask() {
			this.DELEGATE_TO_CREATE_NEW_TASK();
		},
		updateTask() {
			this.DELEGATE_TO_UPDATE_COMPLETED_TASK();
		}
   }
}
</script>

<style lang="scss">
.modal-priority {
	position: relative;

	&__name {
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.8rem;

		@media (max-width: 375px) {
			height: 2.2rem;
			font-size: 1.6rem;
		}
	}
	&__list {
		margin-bottom: 5rem;
	}
	&__item {
		font-size: 1.6rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin: .3rem 0;
		padding: .6rem 0;
		background: linear-gradient(90deg, transparent 15%, rgba(255, 255, 255, .1));

		@media (max-width: 375px) {
			border-top-right-radius: 1rem;
			border-bottom-right-radius: 1rem;
			font-size: 1.4rem;
			padding: 0;
			margin: .5rem 0;
		}

		&:nth-child(1) {
			border-top-right-radius: 1rem;
		}
		&:nth-child(3) {
			border-bottom-right-radius: 1rem;
		}

		&--active {
			&:nth-child(1) {
				background: linear-gradient(90deg, transparent 15%, #2e4a7e);
			}
			&:nth-child(2) {
				background: linear-gradient(90deg, transparent 15%, #634e2f);
			}
			&:nth-child(3) {
				background: linear-gradient(90deg, transparent 15%, #69282d);
			}
		}
	}
	&__label {
		width: 2.7rem;
		height: 2.7rem;
		margin: 0 2rem 0 1rem;
		border-radius: 50%;
		background: #fff;

		@media (max-width: 375px) {
			width: 2.4rem;
			height: 2.4rem;
			margin: 0 0 0 1rem;
		}

		&--active {
			position: relative;
			background: #0174fe;

			&::after {
				content: '';
				display: block;
				width: 1rem;
				height: 1rem;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				border: .4rem solid #fff;
				border-radius: 50%;
			}
		}
	}
	&__input {
		display: none;
	}
	&__icon {
		width: 3rem;
		margin-right: .7rem;
	}
}
.modal-create {
	width: 100%;
	display: flex;
	justify-content: flex-end;
	position: absolute;
	bottom: 0;
	right: 0;

	@media (max-width: 375px) {
		bottom: 1rem;
	}

	&__button {
		font-family: 'Ubuntu';
		display: inline-block;
		width: 80%;
		border: none;
		padding: 1rem 0;
		color: #fff;
		border-radius: .3rem;
		background: rgb(63, 81, 181);

		@media (max-width: 375px) {
			width: 100%;
			font-size: 1.6rem;
		}

		&:hover {
			background: rgba(63, 81, 181, .8);
		}
	}
}
</style>