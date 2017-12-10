# FirefoxLnk

为 firefox.exe 创建 shortcut file(Windows)，方便测试。

## 用法

下载 Firefox
<https://www.mozilla.org/en-US/firefox/all/#zh-CN>

下载 7-zip 并安装，注意将 7z.exe 放入 PATH 中，它用于解压 Firefox installer。
<http://www.7-zip.org/download.html>

```powershell
node .\cli.js '.\installers\Firefox Setup 57.0.2.exe'
```
