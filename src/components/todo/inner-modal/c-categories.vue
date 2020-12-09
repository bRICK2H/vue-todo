<template>
   <div class="modal-categories modal-content__modal-categories">
      <div class="modal-categories__box-name">
         <span class="modal-categories__name">Категории</span>
         <span class="modal-categories__icon"
            @click="openNewCategory"
         ></span>
      </div>

		<transition-group class="categories-list"
			tag="ul"
			name="move-categories"
		>
			<li class="categories-list__item"
				v-for="category of GET_PAGINATION_LIST"
				:key="category.id"
				:class="{ 'categories-list__item--active': GET_IS_CHECKED_CATEGORIES(category.id) }"
			>
				<div class="categories-list__container-select">
					<label :for="`category-label-${category.id}`" class="categories-list__label"
						@click="selectCategory(category.id)"
						:class="{ 'categories-list__label--active': GET_IS_CHECKED_CATEGORIES(category.id) }"
					>
						<input type="checkbox" class="categories-list__input"
							:id="`category-label-${category.id}`"
							:value="category.id"
							v-model="currCheckedCategoriesId"
							:disabled="category.isOptions.isDisabled"
						>
					</label>
					<input type="text" class="categories-list__temp-input"
						v-if="category.isOptions.isntName || category.isOptions.isEdit"
						autocomplete="off"
						:class="[GET_CLASS_OF_WARNING_TEMP_INPUT, GET_CLASS_OF_WARNING_CARET]"
						ref="temp-input"
						@keydown.esc="deleteCategory(category.id, false)"
						@keypress.enter="addCategory(category.id)"
						v-model="currCategoryName"
					>
					<span class="categories-list__name"
						v-else
					>
						{{ category.name }}
					</span>
				</div>

				<div class="categories-list__container-icon"
					v-if="category.isOptions.isIcon && !category.isOptions.isEdit"
				>
					<div class="categories-list__box-icon categories-list__box-icon--edit"
						@click="editCategory(category.id)"
					>
						<img class="categories-list__icon"
							:src="category.icons.edit"
							alt="edit"
						>
					</div>
					<div class="categories-list__box-icon categories-list__box-icon--delete"
						@click="deleteCategory(category.id, true)"
					>
						<img class="categories-list__icon"
							:src="category.icons.delete"
							alt="delete"
						>
					</div>
				</div>
            <div class="categories-list__container-icon"
               v-if="category.isOptions.isEdit"
            >
               <div class="categories-list__box-icon categories-list__box-icon--save"
						@click="addCategory(category.id)"
					>
						<img class="categories-list__icon"
							:src="GET_ICON_SAVE"
							alt="add"
						>
					</div>
            </div>
			</li>
		</transition-group>

      <!-- Error is limit categories -->
      <transition-group class="categories-limit"
         tag="ul"
         name="category-limit"
         v-if="categoryLimit"
      >
         <li class="categories-limit__item"
            v-for="limit of countLimit" :key="limit"
         >
            Лимит категорий исчерпан!
         </li>
      </transition-group>

      <!-- Pagination -->
		<c-pagination
         :list="GET_CATEGORIES"
         :itemsInPage="4"
         @handle-category-limit="categoryLimit = false"
		/>
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import cPagination from '@/components/todo/inner-modal/c-pagination'

export default {
	name: 'cCategories',
	components: {
		cPagination
	},
   data: () => ({
      categoryLimit: false,
		countLimit: 0,
		isEditCategory: false,
   }),
   computed: {
      ...mapGetters('todoModal', [
         'GET_CATEGORIES',
			'GET_NEW_NAME_CATEGORY',
			
			'GET_PAGINATION_LIST',
         'GET_PAGINATION_LIST_PER_PAGE',
         
         'GET_IS_CHECKED_CATEGORIES',
         'GET_CHECKED_CATEGORIES_ID',

         'GET_IS_CURR_CATEGORY_EDIT',
         'GET_IS_NO_SET_NAME_NEW_CATEGORY',
         'GET_IS_SOME_EDIT_CATEGORY',

         'GET_CLASS_OF_WARNING_TEMP_INPUT',
         'GET_CLASS_OF_WARNING_CARET',
         
         'GET_ICON_SAVE',
      ]),
      currCheckedCategoriesId: {
         get() {
            return this.GET_CHECKED_CATEGORIES_ID;
         },
         set(categoriesId) {
            this.SET_CHECKED_CATEGORIES_ID(categoriesId);
         }
      },
      currCategoryName: {
         get() {
            return this.GET_NEW_NAME_CATEGORY;
         },
         set(categoryName) {
            this.SET_NAME_NEW_CATEGORY(categoryName);
         }
		},
   },
   methods: {
      ...mapActions('todoModal', [
         'OPEN_NEW_CATEGORY',
         'UPDATE_CATEGORY',
         'ADD_NEW_CATEGORY',
         'SET_CHECKED_CATEGORIES_ID',
			'SET_CATEGORY_ID_TO_DELETE',
         'SET_CLASS_WARNING_CARET',
         'SET_NAME_NEW_CATEGORY',
			'SET_CURR_PAGINATION_LIST_PAGE',
      ]),
      selectCategory(id) {
         if (this.GET_IS_CURR_CATEGORY_EDIT(id)) {
            this.$refs['temp-input'][0].focus();
            this.SET_CLASS_WARNING_CARET();
         }
      },
      openNewCategory() {
			if (this.GET_IS_NO_SET_NAME_NEW_CATEGORY || this.GET_IS_SOME_EDIT_CATEGORY) {
				this.$refs['temp-input'][0].focus();
            this.SET_CLASS_WARNING_CARET();
            return;
         };
         if (this.GET_PAGINATION_LIST_PER_PAGE > 4) {
            this.SET_CURR_PAGINATION_LIST_PAGE(this.GET_PAGINATION_LIST_PER_PAGE)
            this.categoryLimit = true;
            this.countLimit++;
            setTimeout(() => {
               this.countLimit -= 1;
            }, 600);
            return;
         };
			
         const NEW_CATEGORY_ID = Math.max.apply(
            null,
            this.GET_CATEGORIES.reduce((acc, curr) => {
               acc.push(curr.id);
               return acc;
            }, [])
         ) + 1;
         
         this.OPEN_NEW_CATEGORY({
            id: NEW_CATEGORY_ID,
            name: '',
            isOptions: {
               isIcon: false,
               isEdit: true,
               isntName: true,
               isDisabled: true,
            },
            icons: {
               edit: require('@/assets/img/icons/edit.svg'),
               delete: require('@/assets/img/icons/delete.svg'),
            }
         });

			this.$nextTick(() => {
				this.$refs['temp-input'][0].focus();
			});
      },
      addCategory(id) {
			if (!this.GET_NEW_NAME_CATEGORY) {
            this.$refs['temp-input'][0].focus();
				this.SET_CLASS_WARNING_CARET();
				return;
			}
			
			this.isEditCategory = false;
         this.ADD_NEW_CATEGORY({
            id,
            isOptions: {
               isIcon: true,
               isEdit: false,
               isntName: false,
               isDisabled: false,
            }
         });
      },
      editCategory(id) {
         if (this.GET_IS_NO_SET_NAME_NEW_CATEGORY) {
            this.$refs['temp-input'][0].focus();
            this.SET_CLASS_WARNING_CARET();
            return;
			}
			this.isEditCategory = true;
         this.UPDATE_CATEGORY({
            id,
            isOptions: {
               isEdit: true,
               isDisabled: true,
            }
         });
         this.$nextTick(() => {
            this.$refs['temp-input'][0].focus();
         })
      },
      deleteCategory(categoryId, isModal) {
			if (this.isEditCategory) {
				this.addCategory(categoryId);
				return;
			};

			this.SET_CATEGORY_ID_TO_DELETE({ categoryId, isModal });
		},
	},
}
</script>

<style lang="scss">
.modal-categories {
   &__box-name {
      width: 100%;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1.8rem;
		position: relative;

		@media (max-width: 375px) {
			height: 2.2rem;
			justify-content: flex-start;
		}
   }
   &__name {
      font-weight: 400;

		@media (max-width: 375px) {
			font-size: 1.6rem;
		}
   }
   &__icon {
      width: 2.5rem;
      height: 2.5rem;
      margin-left: 1rem;
      border-radius: .3rem;
      position: relative;
      cursor: pointer;
      background: #0b6f43;
      transition: .3s;

		@media (max-width: 375px) {
			width: 2.2rem;
			height: 2.2rem;
		}

      &:hover {
         background: #18b971;
      }
      &::after {
         content: '';
         width: 100%;
         height: 100%;
         position: absolute;
         top: 0;
         left: 0;
         background: url('/static/icons/add.svg') no-repeat center / cover;
         filter: invert(1);
      }
   }
	&__categories-page {
		position: absolute;
		left: 0;
		bottom: 0;
	}
}

.categories-list {
	height: 17rem;
	position: relative;

	&__item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: .3rem 0;
		padding: .6rem 0;

		@media (max-width: 375px) {
			padding: 0;
			margin: .5rem 0;
		}
		
		background: linear-gradient(90deg, rgba(255, 255, 255, .1), transparent 85%);

		&:first-child {
			border-top-left-radius: 1rem;
		}
		&:last-child {
			border-bottom-left-radius: 1rem;
		}

		&--active {
			background: linear-gradient(90deg, #2e4a7e, transparent 85%);
		}
	}
	&__container-select {
		display: flex;
		align-items: center;
		margin-left: 2rem;

		@media (max-width: 375px) {
			margin-left: 0;
		}
	}
   &__label {
      display: inline-block;
      width: 2.7rem;
      height: 2.7rem;
      background: #fff;
      margin-right: 1rem;
      border-radius: .3rem;
      user-select: none;

		@media (max-width: 375px) {
			width: 2.4rem;
			height: 2.4rem;
		}

      &--active {
         background: #0174fe;
         position: relative;

         &::after {
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: url('/static/icons/check.svg') no-repeat center / cover;
            filter: invert(1);
         }
      }
   }
	&__input {
      display: none;
   }
   &__temp-input {
      width: 10rem;
      height: 2.7rem;
      padding: 0 .5rem;
      font-family: 'Ubuntu';
		background: linear-gradient(90deg, rgba(255, 255, 255, .2), transparent 85%);
      border: none;
      border-radius: .3rem;
      caret-color: #fff;
      color: #fff;
      font-size: 1.6rem;

		@media (max-width: 375px) {
			font-size: 1.4rem;
			height: 2.4rem;
		}

      &--error {
         color: rgb(245, 75, 75);
      }
      &--caret-error {
			background: linear-gradient(90deg, rgba(245, 75, 75, .4), transparent 85%);
         caret-color: rgb(245, 75, 75);
      }
   }
   &__name {
      font-size: 1.6rem;
      display: inline-block;
      white-space: nowrap;
      width: 10rem;
      overflow: hidden;

		@media (max-width: 375px) {
			width: 9rem;
			font-size: 1.4rem;
		}
   }
	&__container-icon {
		display: flex;
		align-items: center;
	}
   &__box-icon {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: .3rem;
      position: relative;
      cursor: pointer;
      transition: .3s;

		@media (max-width: 375px) {
			width: 2.2rem;
			height: 2.2rem;
		}

      &--edit {
         background: #add8e6;
			margin: 0 1rem;

			@media (max-width: 375px) {
				margin-right: .5rem;
			}
			
         &:hover {
            background: #54c4e8;
         }
      }
      &--delete {
         background: #f08080;
         &:hover {
            background: #f14141;
         }
      }
      &--save {
         background: #90ee90;
         &:hover {
            background: #6cef6c;
         }
      }
   }
   &__icon {
      width: 2.4rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
   }
}

.categories-limit {
   position: absolute;
   top: 40%;
   left: 1rem;

   &__item {
      font-size: 1.6rem;
      color: tomato;
   }
}

.category-limit-enter, .category-limit-leave-to {
   opacity: 0;
}
.category-limit-enter-active, .category-limit-leave-active {
   transition: .8s ease-in-out;
}
.category-limit-enter-to {
   opacity: 1;
}
.category-limit-leave-to {
   transform: translateX(-100%);
}

.move-categories-enter {
   opacity: 0;
}
.move-categories-enter-active {
   transition: .5s;
}
.move-categories-enter-to {
   opacity: 1;
}
</style>