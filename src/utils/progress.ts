/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-30 23:46:44
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-05-02 22:10:51
 */
// 这里用到一个很实用的 npm 模块，用在同一行打印文本
import { stdout } from 'single-line-log'
let taskList: IProgress[] = []

interface IProgress {
  title: string;
  total: number;
  width: number;
  curr: number;
}

// 拼接输出文本
function formatCmdText (data: IProgress) {
  const percent = parseFloat((data.curr / data.total).toFixed(4)) // 计算进度(子任务的 完成数 除以 总数)
  const cellNum = Math.floor(percent * data.width) // 计算需要多少个 █ 符号来拼凑图案
  // 拼接完成条
  let cell = ''
  for (let i = 0; i < cellNum; i++) {
    cell += '='
  }
  // 拼接未完成条
  let empty = ''
  for (let i = 0; i < data.width - cellNum; i++) {
    empty += '-'
  }
  // 拼接最终文本
  return `\x1B[33m${data.title}\x1B[0m: [${cell}${empty}] ${data.curr}/${data.total
    } ${(100 * percent).toFixed(2)}%\n`
}

export class Progress {
  private title: string;
  private total: number;
  constructor (title: string, total: number, cb?: () => void) {
    taskList.push({
      title,
      total,
      curr: 0,
      width: 50
    })
    this.title = title
    this.total = total
    this.push(0)
  }

  push (curr: number): void {
    const task = taskList.find((e) => e.title === this.title)
    if (!task) return
    task.curr = curr
    const cmdText = taskList.map((e) => formatCmdText(e)).join('')
    // 在单行输出文本
    stdout(cmdText)
  }

  clear (): void {
    taskList = taskList.filter((e) => e.title !== this.title)
    // stdout('')
  }
}
