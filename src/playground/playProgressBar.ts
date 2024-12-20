import https from 'node:https';
import fs from 'node:fs';
import chalk from 'chalk'

import ProgressBar from "../utils/ProgressBar.js"

function run() {

  const progressBar = new ProgressBar({
    format: '下载中: {progress} {percent}% | 文件总数：{total} | 已下载：{value} | 速度：{speed}Kb/s',
    barCompleteChar: chalk.bgCyan(' ')
  })

  let value = 0
  const total = 50

  progressBar.start(total, value, {
    speed: 0
  })
  const timer = setInterval(() => {

    progressBar.update(++value, {
      speed: parseFloat((Math.random() * 100).toFixed(2))
    })

    if(value >= total) {
      clearInterval(timer)
    }

  }, 100)
}
run()


// 下载Chrome浏览器
function downloadChromeBrowser() {
  const downloadURLs = {
    linux: 'https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/970501/chrome-linux.zip',
    darwin: 'https://storage.googleapis.com/chromium-browser-snapshots/Mac/970501/chrome-mac.zip',
    win32: 'https://storage.googleapis.com/chromium-browser-snapshots/Win/970501/chrome-win32.zip',
    win64: 'https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/970501/chrome-win32.zip',
  };

  const bar = new ProgressBar();

  let value = 0;

  https.get(downloadURLs.win64, response => {

      const file = fs.createWriteStream('./chromium.zip');
      response.pipe(file);

      const totalBytes = parseInt(response.headers['content-length']!, 10);

      bar.start(totalBytes, 0);
      
      response.on('data', function (chunk) {
          value += chunk.length

          bar.update(value);
      });
  });

}
                                                                    //