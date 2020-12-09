<template>
   <div class="todo-modal todo-container__todo-modal">
      <div class="todo-modal__close-modal"
         @click="CLOSE_MODAL"
      ></div>
      <div class="modal-content todo-modal__modal-content">
         <!-- Title -->
         <c-title />

         <!-- Description -->
         <c-description />

         <div class="modal-content__box-field modal-content__box-field--both">
            <!-- Categories -->
            <c-categories />
            
            <!-- Priority -->
            <c-priority />
         </div>
      </div>
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import cTitle from '@/components/todo/inner-modal/c-title'
import cDescription from '@/components/todo/inner-modal/c-description'
import cCategories from '@/components/todo/inner-modal/c-categories'
import cPriority from '@/components/todo/inner-modal/c-priority'

export default {
   name: 'cModal',
   components: {
      cTitle,
      cDescription,
      cCategories,
		cPriority,
	},
   methods: {
      ...mapActions('todoModal', [
         'SET_IS_SHOW_MODAL',
         'CLOSE_MODAL',
      ]),
  },
}
</script>

<style lang="scss">
.todo-modal {
   background: #000;

   &__close-modal {
      width: 2.5rem;
      height: 2.5rem;
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      cursor: pointer;
		z-index: 999;

		@media (max-width: 375px) {
			top: .5rem;
			right: .5rem;
		}

      &:hover {
         &::before, &::after {
            background: #e8a99d;
         }
      }

      &::before, &::after {
         content: '';
         position: absolute;
         top: 50%;
         left: 0;
         width: 100%;
         height: .3rem;
         background: #fff;
         transition: .3s;
      }
      &::before {
         transform: translateY(-50%) rotate(45deg);
      }
      &::after {
         transform: translateY(-50%) rotate(-45deg);
      }
   }
   &__modal-content {
      width: 56rem;
      height: auto;
      margin: auto;
   }
}
.modal-content {
	position: relative;
   z-index: 4;
	overflow: hidden;
   color: #fff;
	box-shadow: 0 0 4rem #222;
	border-radius: 1rem;
	padding: 3rem;
	background: #0a0a0a;

	@media (max-width: 375px) {
		padding: 1rem;
	}

   &__box-field {
      margin-bottom: 2rem;

      &--both {
			height: 27rem;
         display: flex;
         justify-content: space-between;
         position: relative;
			margin-bottom: 0;

         &::before {
            content: '';
            width: .01rem;
            height: 100%;
            background: rgba(255, 255, 255, 0.1);
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);

				@media (max-width: 375px) {
					display: none;
				}
         }
      }
   }
   &__modal-categories {
      flex: 0 1 46%;
   }
	&__modal-priority {
		flex: 0 1 46%;
	}
   &__label {
      width: 100%;
      margin: auto;
      display: block;
      text-align: center;
      position: relative;
      margin-bottom: 2rem;
      user-select: none;

		@media (max-width: 375px) {
			font-size: 1.6rem;
		}
   }
   &__title, &__descr {
      width: 100%;
      font-family: 'Ubuntu', sans-serif;
      font-size: 1.6rem;
      color: #fff;
      border: none;
      border-radius: 1rem;
      padding: 1rem 2rem;
      background: rgba(255,255,255, .1);

		@media (max-width: 375px) {
			font-size: 1.4rem;
			padding: .5rem;
		}
   }
}
</style>