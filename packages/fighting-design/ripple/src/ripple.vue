<script lang="ts" setup name="Ripple">
  import { Props } from './props'
  import { Ripples } from '../../_utils'
  import { computed, ref, toRefs } from 'vue'
  import type {
    ClassListInterface,
    HandleMouseEventInterface
  } from '../../_interface'
  import type { Ref, CSSProperties, ComputedRef } from 'vue'
  import type { RipplePropsType } from './props'

  const prop: RipplePropsType = defineProps(Props)

  // dom 节点
  const FRipple: Ref<HTMLElement> = ref<HTMLElement>(
    null as unknown as HTMLElement
  )

  /**
   * 样式列表
   */
  const styleList: ComputedRef<CSSProperties> = computed((): CSSProperties => {
    const { startOpacity, endOpacity } = prop

    return {
      '--f-ripple-start-opacity': startOpacity,
      '--f-ripple-end-opacity': endOpacity
    } as CSSProperties
  })

  /**
   * 类名列表
   */
  const classList: ComputedRef<ClassListInterface> = computed(
    (): ClassListInterface => {
      const { noSelect } = prop

      return ['f-ripple', { 'f-ripple__select': noSelect }] as const
    }
  )

  /**
   * 点击之后执行
   *
   * @param evt 事件对象
   */
  const handleClick: HandleMouseEventInterface = (evt: MouseEvent): void => {
    const { type, ripplesColor, duration, disabled } = toRefs(prop)

    if (disabled.value) return

    const ripples: Ripples = new Ripples(
      evt as MouseEvent,
      FRipple.value as HTMLElement,
      {
        duration: duration.value,
        component: 'f-ripple',
        className: 'f-ripple__animation',
        type: type.value,
        ripplesColor: ripplesColor.value
      } as const
    )

    ripples.clickRipples()
  }
</script>

<template>
  <div ref="FRipple" :class="classList" :style="styleList" @click="handleClick">
    <slot />
  </div>
</template>
