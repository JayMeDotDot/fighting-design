import type { runCallbackInterface } from './interface'

/**
 * 执行组件 prop 的回调函数
 *
 * @param callback 回调函数
 * @param params 回调参数
 */
export const runCallback: runCallbackInterface = <T extends Function, F>(
  callback: T | null,
  params?: F | null
): void => {
  callback && callback(params)
}
