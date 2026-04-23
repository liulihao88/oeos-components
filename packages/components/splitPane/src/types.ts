export type SplitPaneDirection = 'vertical' | 'horizontal'

export interface SplitPaneSetting {
  minPercent?: number
  defaultPercent?: number
  split?: SplitPaneDirection
}
