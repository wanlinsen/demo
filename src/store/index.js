import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const types = {
  MENU_COLLAPSE: 'MENU_COLLAPSE',
  BREADCRUMB_ITEMS: 'BREADCRUMB_ITEMS',
  MENU_STYLE: 'MENU_STYLE',
  CURRENT_MENU_STYLE: 'CURRENT_MENU_STYLE',
  SVG_ICON_NAME: 'SVG_ICON_NAME',
  UPDATE_USERINFO: 'UPDATE_USERINFO'
}
export default new Vuex.Store({
    state: {
      [types.MENU_COLLAPSE]: false,
      [types.BREADCRUMB_ITEMS]: [],
      [types.MENU_STYLE]: {
        light: {
          backgroundColor: '#fff',
          textColor: 'rgba(0, 0, 0, .65)',
          activeTextColor: '#1890ff',
          logoBackgroundColor: '#fff',
          logoColor: '#1890ff'
        },
        dark: {
          backgroundColor: '#001529',
          textColor: '#fff',
          activeTextColor: '#116BBE',
          logoBackgroundColor: '#022445',
          logoColor: '#fff'
        }
      },
      [types.CURRENT_MENU_STYLE]: 'dark',
      [types.SVG_ICON_NAME]: [],
  },
  mutations: {
    [types.SVG_ICON_NAME]: (state, res) => {
      state[types.SVG_ICON_NAME] = res
    },
  },
  actions: {
    [types.SVG_ICON_NAME]: async ({ commit }, state) => {
      return commit(types.SVG_ICON_NAME, state)
    },
  }
})