/**
 * Title in Task
 */

export default {
   state: {
      isFocus: false,
      iconEnter: require('@/assets/img/icons/enter.svg'),
   },
   getters: {
      DELEGATE_GET_CURR_TITLE: (s, g, rS, rGetters) => rGetters['todoModal/GET_CURR_TITLE'],

      GET_PLACEHOLDER: (s, g, rS, rGetters) => rGetters['todoModal/GET_IS_ERROR_TITLE'] ? '' : 'Создать новую задачу',

      GET_ICON_ENTER: state => state.iconEnter,
      GET_CLASS_ERROR_TITLE: (s, g, rS, rGetters) => ({ 'todo-input-box__input--error': rGetters['todoModal/GET_IS_ERROR_TITLE'] }),
      GET_CLASS_FOCUS_TITLE: state => ({ 'todo-input-box__input--focus': state.isFocus }),
   },
   mutations: {
      SET_IS_FOCUS_TITLE: (state, isFocus) => state.isFocus = isFocus,
   },
   actions: {
      DELEGATE_SET_CURR_TITLE: ({ dispatch }, title, ) => {
         dispatch('todoModal/SET_CURR_TITLE', title, { root: true });
      },
      SET_IS_FOCUS_TITLE: ({ commit }, isFocus) => commit('SET_IS_FOCUS_TITLE', isFocus),
   }
}