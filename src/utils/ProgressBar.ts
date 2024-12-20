import ansiEscapes from 'ansi-escapes'
import chalk from 'chalk'

type OtherVariable = {
  [key: string]: string | number | boolean
}

const Format_Default = '进度：{progress} {percent}% | {value}/{total}'

class ProgressBar implements ProgressBarType {

  progressLength: number = 50

  format: string = Format_Default
  barCompleteChar: string = chalk.bgGreen(' ')
  barIncompleteChar: string = '░'

  total: number = 0
  value: number = 0

  otherVariable: OtherVariable = {}
  
  constructor(options?: ProgressBarOptions) {
    if(options) {
      options.format ? (this.format = options.format) : ''
      options.barCompleteChar ? (this.barCompleteChar = options.barCompleteChar) : ''
      options.barIncompleteChar ? (this.barIncompleteChar = options.barIncompleteChar) : ''
    }
  }

  public clearScreen() {
    const repeatCount = process.stdout.rows
    const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : 0
    console.log(blank)
  }

  private draw() {
    const w = process.stdout.write.bind(process.stdout)

    const complete = Math.floor((this.value / this.total) * this.progressLength)
    const incomplete = this.progressLength - complete
    const percent = Math.floor((complete / this.progressLength) * 100)

    const progressStr = this.barCompleteChar.repeat(complete) + this.barIncompleteChar.repeat(incomplete)

    let inputContent = this.format
      .replace('{progress}', progressStr)
      .replace('{percent}', String(percent))
      .replace('{value}', String(this.value))
      .replace('{total}', String(this.total))
    
    Object.keys(this.otherVariable).forEach(prop => {
      inputContent = inputContent.replace(`{${prop}}`, String(this.otherVariable[prop]))
    })

    w(ansiEscapes.cursorRestorePosition)
    w(inputContent)

  }

  public start(initTotal: number, initValue: number, otherVariable?: OtherVariable) {
    this.total = initTotal
    this.value = initValue
    if(otherVariable) {
      this.otherVariable = {
        ...this.otherVariable,
        ...otherVariable
      }
    }

    process.stdout.write(ansiEscapes.cursorSavePosition)
    
    this.draw()
  }

  public update(newValue: number, otherVariable?: OtherVariable) {
    this.value = newValue
    
    if(otherVariable) {
      this.otherVariable = {
        ...this.otherVariable,
        ...otherVariable
      }
    }

    this.draw()
  }

}

export default ProgressBar
