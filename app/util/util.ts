// 生成一个随机的16进制数
function randomHex(): string {
  return Math.floor(Math.random() * 16).toString(16);
}

// 生成一个符合RFC 4122规范的uuid
export function uuid(): string {
  // uuid的格式为xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  // 其中x是任意的16进制数，y是8、9、a或b
  let result: any = "";
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      // 添加分隔符
      result += "-";
    } else if (i === 14) {
      // 添加版本号4
      result += "4";
    } else if (i === 19) {
      // 添加y
      result += (randomHex() as any & 0x3) | 0x8;
    } else {
      // 添加x
      result += randomHex();
    }
  }
  return result;
}

export function copyToClipboard(text: any) {
  navigator.clipboard
    .writeText(text)
    .then((res) => {})
    .catch((err) => {});
}
