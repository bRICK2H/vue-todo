<template>
   <transition name="pagination-button">
      <ul class="pagination tasks__pagination"
         v-show="GET_IS_SHOW_PAGINATION_LIST"
      >
         <li class="pagination__item"
            v-for="page of GET_PAGINATION_LIST_PER_PAGE"
            :key="page"
            @click="showSelectedPage(page)"
         >
            <span class="pagination__page"
               :class="{ 'pagination__page--active': GET_PAGINATION_CURR_LIST_PAGE === page}"
            >
               {{ page }}
            </span>
         </li>
      </ul>
   </transition>
</template>

<script>
import Vue from 'vue'
const vm = new Vue()
import { mapGetters, mapActions } from 'vuex'

export default {
   name: 'cPagination',
   props: {
      list: {
         type: Array,
         required: true,
      },
      itemsInPage: {
         type: Number,
         required: true,
      }
   },
   computed: mapGetters('todoTask', [
         'GET_IS_SHOW_PAGINATION_LIST',
         'GET_PAGINATION_LIST_PER_PAGE',
         'GET_PAGINATION_CURR_LIST_PAGE'
      ]),
	methods: {
      ...mapActions('todoTask', [
         'SET_INIT_PAGINATION_OPTIONS',
         'SET_CURR_PAGINATION_LIST_PAGE'
      ]),
		showSelectedPage(page) {
			this.SET_CURR_PAGINATION_LIST_PAGE(page);
		}
   },
	watch: {
		itemsInPage: {
			immediate: true,
			handler(val) {
				this.SET_INIT_PAGINATION_OPTIONS({
					list: this.list,
					itemsInPage: val
				});
			}
		}
	}
}
</script>

<style lang="scss">
// Outer styles
.tasks {
   &__pagination {
      margin: auto auto 3rem;
   }
}

// Inner styles
.pagination {
	display: inline-flex;
	align-items: center;

	&__item {
		width: 2.7rem;
		height: 2.7rem;
		display: flex;
		align-items: center;

		@media (max-width: 375px) {
			width: 2.4rem;
			height: 2.4rem;
		}

		&:not(:last-child) {
			margin-right: .5rem;
		}
	}
	&__page {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: .3rem;
		background: #444;
		display: flex;
		justify-content: center;
		align-items: center;
      padding-bottom: .2rem;
		cursor: pointer;

		&--active {
			transform: scale(1.1);
			background: #3f51b5;
		}
	}
}

// Transition
.pagination-button-enter,
.pagination-button-leave-to {
   transform: translateX(-5rem);
   opacity: 0;
}
.pagination-button-enter-active,
.pagination-button-leave-active {
   transition: .4s;
}
.pagination-button-enter-to {
   transform: translateX(0);
   opacity: 1;
}
@keyframes pagination-button {
   100% { transform: translateX(0); }
}
</style>