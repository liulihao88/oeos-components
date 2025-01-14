import OTitle from './components/title/src/index.vue'

declare module 'vue' {
  export interface GlobalComponents {
    OTitle: typeof OTitle
  }
}
