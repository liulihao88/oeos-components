import OTitle from './components/title/index.ts'

declare module 'vue' {
  export interface GlobalComponents {
    OTitle: typeof OTitle
  }
}
