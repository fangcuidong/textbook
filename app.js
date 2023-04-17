const https = require('https');
const fs = require('fs');

function getJpg(pageNumber) {
  let url = `https://book.pep.com.cn/1321001102121/files/mobile/${pageNumber}.jpg?230217154120`;
  const outputFilename = `./output/${pageNumber}.jpg`;
  https.get(url, (response) => {
    const { statusCode } = response;
    if (statusCode !== 200) {
      console.error(`请求失败，状态码： ${statusCode}`);
      response.resume();
      return;
    }

    const file = fs.createWriteStream(`./output/${pageNumber}.jpg`);
    response.pipe(file);

    file.on('finish', () => {
      console.log('图片下载完成');
      file.close();
    });
  }).on('error', (err) => {
    console.error(`请求失败，错误信息：${error.message}`);
  });
}


const dirPath = './output';

// 检查目录是否存在
if (fs.existsSync(dirPath)) {
  // 如果目录存在，先删除目录及其内容
  fs.rmdirSync(dirPath, { recursive: true });
}

// 创建目录
fs.mkdirSync(dirPath);

for(let i = 1; i <= 176; i++) {
  getJpg(i);
}