<template>
  <div class="modal-content__box-field">
      <label for="modal-descr" class="modal-content__label">
         Описание
      </label>
      <textarea id="modal-descr" class="modal-content__descr"
         ref="modal-descr"
         autocomplete="off"
         v-model.trim="currDescription"
      ></textarea>
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
   name: 'cDescription',
   computed: {
      ...mapGetters('todoModal', [
         'GET_CURR_DESCRIPTION',
      ]),
      currDescription: {
         get() {
            return this.GET_CURR_DESCRIPTION;
         },
         set(val) {
            this.SET_CURR_DESCRIPTION(val);
         }
      }
   },
   methods: mapActions('todoModal', [
      'SET_CURR_DESCRIPTION',
   ]),
   mounted() {
      setTimeout(() => {
         if (!this.GET_CURR_DESCRIPTION) {
            this.$refs['modal-descr'].focus();
         }
      }, 300);
   },
}
</script>

<style lang="scss">
   .modal-content {
      &__descr {
         height: 10rem;
         resize: none;

			@media (max-width: 375px) {
				height: auto;
			}

         &:focus {
            transition: .3s;
            background: rgba(255,255,255, .2);
         }
      }
   }
</style>