import type { ExtractPropTypes, VNode, Component, PropType } from 'vue'

export const Props = {
  /**
   * 自定义文字颜色
   */
  color: {
    type: String,
    default: (): null => null
  },
  /**
   * 自定义分隔符颜色
   */
  iconColor: {
    type: String,
    default: (): null => null
  },
  /**
   * 自定义分隔符
   */
  separator: {
    type: Object as PropType<VNode | Component>,
    default: (): null => null
  }
}

export type BreadcrumbItemPropsType = ExtractPropTypes<typeof Props>
