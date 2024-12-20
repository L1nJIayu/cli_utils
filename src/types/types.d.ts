

/**
 * 进度条
 */
interface ProgressBarOptions {
  // 输出格式
  format?: string
  // 进度条：完成部分的字符
  barCompleteChar?: string
  // 进度条：未完成部分的字符
  barIncompleteChar?: string
}
interface ProgressBarConstructor {
  new (options?: ProgressBarOptions): ProgressBarType;
}
interface ProgressBarType {
  // 初始化一个进度条，需要传入初始的`进度值`和`总量`，可选传入其他自定义变量
  start(initTotal: number, initValue: number, otherVariable?: OtherVariable): void

  // 更新数值，需要传入最新值，可选传入其他自定义变量
  update(newValue: number, otherVariable?: OtherVariable): void

  // 清屏
  clearScreen(): void
}