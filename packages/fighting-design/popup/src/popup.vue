<script lang="ts" setup name="FPopup">
  import { Props } from './props'
  import { computed } from 'vue'
  import { sizeChange, isBoolean, runCallback } from '../../_utils'
  import type { ComputedRef, CSSProperties } from 'vue'
  import type {
    OrdinaryFunctionInterface,
    HandleMouseEventInterface
  } from '../../_interface'
  import type { PopupPropsType } from './interface'

  const prop: PopupPropsType = defineProps(Props)
  const emit = defineEmits({
    'update:visible': (visible: boolean): boolean => isBoolean(visible)
  })

  /**
   * 点击遮罩层关闭
   */
  const closePopup: OrdinaryFunctionInterface = (): void => {
    if (!prop.maskClose) return
    emit('update:visible', false)
  }

  /**
   * 打开动画开始执行的回调
   *
   * @param evt 事件对象
   */
  const handleOpen: HandleMouseEventInterface = (evt: MouseEvent): void => {
    runCallback(prop.onOpen, evt)
  }

  /**
   * 打开动画结束执行的回调
   *
   * @param evt 事件对象
   */
  const handleOpenEnd: HandleMouseEventInterface = (evt: MouseEvent): void => {
    runCallback(prop.onOpenEnd, evt)
  }

  /**
   * 关闭动画开始执行的回调
   *
   * @param evt 事件对象
   */
  const handleClose: HandleMouseEventInterface = (evt: MouseEvent): void => {
    runCallback(prop.onClose, evt)
  }

  /**
   * 关闭动画结束执行的回调
   *
   * @param evt 事件对象
   */
  const handleCloseEnd: HandleMouseEventInterface = (evt: MouseEvent): void => {
    runCallback(prop.onCloseEnd, evt)
  }

  /**
   * 样式列表
   */
  const styleList: ComputedRef<CSSProperties> = computed((): CSSProperties => {
    const { direction, popupSize, padding } = prop

    if (direction === 'top' || direction === 'bottom') {
      return {
        height: sizeChange(popupSize),
        padding: sizeChange(padding)
      } as const
    }

    return {
      width: sizeChange(popupSize),
      padding: sizeChange(padding)
    } as const
  })
</script>

<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition
      name="f-popup__transition"
      @before-enter="handleOpen"
      @after-enter="handleOpenEnd"
      @before-leave="handleClose"
      @after-leave="handleCloseEnd"
    >
      <div v-show="visible" class="f-popup" :style="{ zIndex }">
        <!-- 遮罩层 -->
        <div
          v-if="showMask"
          :class="['f-popup__mask', { 'f-popup__blur': maskBlur }]"
          :style="{ background: maskBackground, opacity: maskOpacity }"
        />

        <!-- 主容器 -->
        <div
          :class="[
            'f-popup__container',
            {
              [`f-popup__container-${direction}`]: direction
            }
          ]"
          @click.self="closePopup"
        >
          <!-- 主内容 -->
          <transition name="f-popup__wrapper-transition">
            <div
              v-show="visible"
              :class="[
                'f-popup__wrapper',
                {
                  [`f-popup__wrapper-${direction}`]: direction
                }
              ]"
              :style="styleList"
            >
              <slot />
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </teleport>
</template>
