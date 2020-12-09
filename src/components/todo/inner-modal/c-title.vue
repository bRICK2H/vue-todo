<template>
  <div class="modal-content__box-field">
      <label for="modal-title" class="modal-content__label">
         Название*
			<span class="modal-content__label--error-msg"
				v-show="GET_IS_ERROR_TITLE"
			>
				Введите название задачи!
			</span>
      </label>
      <input type="text" autocomplete="off"
         id="modal-title"
			ref="input-title"
         class="modal-content__title"
			:class="GET_CLASS_ERROR_TITLE"
         v-model.trim="currTitle"
      >
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'cTitle',
	computed: {
		...mapGetters('todoModal', [
			'GET_CURR_TITLE',
			'GET_IS_ERROR_TITLE',
			'GET_CLASS_ERROR_TITLE',
		]),
		currTitle: {
			get() {
				return this.GET_CURR_TITLE;
			},
			set(val) {
				this.SET_CURR_TITLE(val);
			}
		},
	},
	methods: mapActions('todoModal', [
		'SET_CURR_TITLE',
		'SET_LINK_CARET_TITLE',
	]),
	mounted() {
		this.SET_LINK_CARET_TITLE(this.$refs['input-title']);
	},
}
</script>

<style lang="scss">
.modal-content {
	&__label {
		position: relative;

		&--error-msg {
			position: absolute;
			left: 50%;
			bottom: -1.6rem;
			transform: translateX(-50%);
			font-size: 1.3rem;
			color: tomato;
			
			animation: move-error-mgs .1s forwards;
			@keyframes move-error-mgs {
				33% { transform: translateX(-60%); }
				66% { transform: translateX(-40%); }
				100% { transform: translateX(-50%); }
			}

			@media (max-width: 375px) {
				width: 100%;
			}
		}
	}
   &__title {
      text-align: center;

      &:focus {
         transition: .3s;
         background: rgba(255,255,255, .2);
      }
		&--error {
			background: #f16d55 !important;
			transform: translateX(0);
			
			animation: move-error-input .1s forwards;
			@keyframes move-error-input {
				33% { transform: translateX(-1rem); }
				66% { transform: translateX(1rem); }
				100% { transform: translateX(0); }
			}
		}
   }
}
</style>