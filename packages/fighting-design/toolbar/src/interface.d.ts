export type { ToolbarPropsType } from './props'

export type ToolbarType = 'large' | 'middle' | 'small' | 'mini'

export interface ToolbarClickParamsInterface {
  evt: MouseEvent
  index: string | undefined
}

export interface ToolbarClickInterface {
  (target: ToolbarClickParamsInterface): void
}
