<script lang="ts" setup name="FCloseBtn">
  import { Props } from './props'
  import { FSvgIcon } from '../../svg-icon'
  import { computed } from 'vue'
  import { FIconCrossVue } from '../../_svg'
  import { runCallback } from '../../_utils'
  import type { ComputedRef, CSSProperties } from 'vue'
  import type {
    HandleMouseEventInterface,
    ClassListInterface
  } from '../../_interface'
  import type { CloseBtnPropsType } from './props'

  const prop: CloseBtnPropsType = defineProps(Props)

  /**
   * 点击触发
   *
   * @param evt 事件对象
   */
  const handleClick: HandleMouseEventInterface = (evt: MouseEvent): void => {
    if (prop.disabled) return
    runCallback(prop.onClick, evt)
  }

  /**
   * 类名列表
   */
  const classList: ComputedRef<ClassListInterface> = computed(
    (): ClassListInterface => {
      const { disabled, round } = prop

      return [
        'f-close-btn',
        {
          'f-close-btn__round': round,
          'f-close-btn__disabled': disabled
        } as const
      ] as const
    }
  )

  /**
   * 样式列表
   */
  const styleList: ComputedRef<CSSProperties> = computed((): CSSProperties => {
    return {
      '--f-close-btn-color': prop.color
    } as CSSProperties
  })
</script>

<template>
  <div role="button" :class="classList" :style="styleList" @click="handleClick">
    <f-svg-icon :size="size" :icon="icon">
      <slot>
        <f-icon-cross-vue />
      </slot>
    </f-svg-icon>
  </div>
</template>
