# 怎么制作一个自己的vscode插件

## 一些有用的网站
- [制作图标](https://logomakr.com/)
- [Vscode API官网](https://code.visualstudio.com/api)
- [Vscode Extension code](https://github.com/microsoft/vscode-extension-samples)
- [blog](http://blog.haoji.me/vscode-plugin-overview.html)

## 准备阶段:
- 安装[nodejs](https://nodejs.org/zh-cn/download/),选择LTS(长期稳定支持的版本),下载完成后[配置环境](https://my.oschina.net/u/2328490/blog/3070590?hmsr=kaifa_aladdin)<br>
  [关于npm的WARN](https://www.jianshu.com/p/766825e2e062)
  
- ```shell
  npm install -g yo
  ```
- ```shell
  npm install -g yo generator-code
  ```
- 安装[git](https://git-scm.com/)
  
## 需要的知识
- [Typescript](https://www.runoob.com/typescript/ts-tutorial.html)
  <br>在vscode中书写tsc之前先运行 `tsc --init`生成`tsconfig.json`文件去除js/ts的重复定义的报错
- [async/await异步处理](https://www.cnblogs.com/yuanyingke/p/10280681.html)