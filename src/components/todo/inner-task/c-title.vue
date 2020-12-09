<template>
	<div class="todo-input-box todo-header__todo-input-box">
		<p class="todo-input-box__error todo-input-box__error--active"
			v-show="GET_IS_ERROR_TITLE"
		>
			Введите название задачи!
		</p>
		<input class="todo-input-box__input"
			type="text"
			v-model="currTitle"
			:class="[GET_CLASS_ERROR_TITLE, GET_CLASS_FOCUS_TITLE]"
			:placeholder="GET_PLACEHOLDER"
			@keypress.enter="enterTaskName"
			@focus="SET_IS_FOCUS_TITLE(true)"
			@blur="SET_IS_FOCUS_TITLE(false)"
		>
		<transition name="submit">
			<div class="todo-input-box__icon-box"
				v-if="!GET_IS_ERROR_TITLE && DELEGATE_GET_CURR_TITLE"
				@click="enterTaskName"
			>
				<img class="todo-input-box__icon"
					:src="GET_ICON_ENTER"
					alt="enter"
				>
			</div>
		</transition>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
   name: 'cInput',
   computed: {
		...mapGetters('todoTask', [
			'DELEGATE_GET_CURR_TITLE',

			'GET_PLACEHOLDER',

			'GET_ICON_ENTER',
			'GET_CLASS_ERROR_TITLE',
			'GET_CLASS_FOCUS_TITLE'
		]),
		...mapGetters('todoModal', ['GET_IS_ERROR_TITLE']),
      currTitle: {
         get() {
            return this.DELEGATE_GET_CURR_TITLE;
         },
         set(title) {
            this.DELEGATE_SET_CURR_TITLE(title);
         }
      },
   },
   methods: {
      ...mapActions('todoTask', [
			'DELEGATE_SET_CURR_TITLE',
			'SET_IS_FOCUS_TITLE',
			'DELEGATE_TO_SCENARIO_EXECUTION_MODAL',
		]),
		...mapActions('todoModal', [
			'SET_IS_SHOW_MODAL',
		]),
		enterTaskName() {
			this.DELEGATE_SET_CURR_TITLE(this.DELEGATE_GET_CURR_TITLE);

			if (!this.GET_IS_ERROR_TITLE) {
				this.DELEGATE_TO_SCENARIO_EXECUTION_MODAL({ isCreated: true });
			}
		},
   }
}
</script>

<style lang="scss">
.todo-input-box {
	position: relative;

		@media (max-width: 599px) {
			width: 100%;
		}
	
	&__error {
		font-size: 1.4rem;
		color: tomato;
		position: absolute;
		margin-left: 1rem;
		top: -2rem;

		animation: input-error .3s;
	}
	&__input {
		width: 40rem;
		border: none;
		padding: 1rem;
		background: #eee;
		transition: .3s;

		@media (max-width: 899px) {
			padding: .5rem;
		}
		@media (max-width: 599px) {
			width: calc(100% - 3.5rem);
		}
		@media (max-width: 320px) {
			font-size: 1.6rem;
		}

		&::placeholder {
			transition: .2s;
			font-size: 1.6rem;
			color: rgba(0,0,0, 1);
		}
		&--focus {
			position: relative;
			background: #fff;
			box-shadow: none;
		}
		&--focus::placeholder {
			font-size: 1.4rem;
			color: rgba(0,0,0, .4);
		}
		&--error {
			position: relative;
			background: tomato;
			animation: input-error .3s;

			@keyframes input-error {
				25% { left: 1rem; }
				50% { left: -1rem }
				66% { left: .5rem }
				82% { left: -.5rem }
				100% { left: 0 }
			}
		}
	}
	&__icon-box {
		width: 4.1rem;
		height: 4.1rem;
		padding: .8rem;
		background: #8fb2de;
		position: absolute;
		top: 0;
		right: -5rem;
		cursor: pointer;
		user-select: none;
		transition: .2s;

		@media (max-width: 899px) {
			width: 3.1rem;
			height: 3.1rem;
			right: -4rem;
			padding: .6rem;
		}
		@media (max-width: 599px) {
			right: 0rem;
		}
		@media (max-width: 320px) {
			height: 2.82rem;
			padding: .4rem;
		}

		&:hover {
			background: rgba(143, 178, 222, .8);
		}
	}
	&__icon {
		width: 100%;
	}
}

.submit-enter, .submit-leave-to {
	opacity: 0;
	right: -15rem;
}
.submit-enter-active, .submit-leave-active {
	transition: .1s;
}
</style>