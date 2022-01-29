# 怎么制作一个自己的vscode插件


## 准备阶段:
- 安装[nodejs](https://nodejs.org/zh-cn/download/),选择LTS(长期稳定支持的版本),下载完成后[配置环境](https://my.oschina.net/u/2328490/blog/3070590?hmsr=kaifa_aladdin)<br>
  [关于npm的WARN](https://www.jianshu.com/p/766825e2e062)
  
- ```shell
  npm install -g yo
  ```
- ```shell
  npm install -g yo generator-code
  ```
- ```shell
  npm install -g vsce
  ```
  这一步npm有可能ERROR,考虑换源`npm config set registry http://registry.cnpmjs.org`
- 安装[git](https://git-scm.com/)
  
## 需要的知识
- [Typescript](https://www.runoob.com/typescript/ts-tutorial.html)
  <br>在vscode中书写tsc之前先运行 `tsc --init`生成`tsconfig.json`文件去除js/ts的重复定义的报错
- [async/await异步处理](https://www.cnblogs.com/yuanyingke/p/10280681.html)
- [Vscode API官网](https://code.visualstudio.com/api)
- [Vscode Extension code](https://github.com/microsoft/vscode-extension-samples)
- [Vscode blog](http://blog.haoji.me/vscode-plugin-overview.html),非常全面细节,强烈推荐阅读

## 关于如何制作一个Vscode插件
- 我觉得最好的办法就是模仿和学习。首先确定你的插件的想要实现的功能是什么。在Vscode插件库里搜索类似的一个插件,找到这个插件的Github源码的位置,最好先找一个小一点的功能简单的类似插件,然后看他是怎么做的,有很大的借鉴意义
- 如果需要API调用就去Vscode的API官网去查


## 如何发布插件
- [vscode教程](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)说的较为清晰,但仍有问题并不适合顺序执行。`vsce package`操作可以打包但是`vsce publish`无法发布，这是因为没有创建贡献者账号。应该优先执行以下操作
- `Get a Personal Access Token`下[创建组织](https://docs.microsoft.com/zh-cn/azure/devops/organizations/accounts/create-organization?view=azure-devops),注册后下滑找到[Azure DevOps](https://go.microsoft.com/fwlink/?LinkId=307137),接着流程如官网所示，拿到密钥之后记得保存。
- 接着继续执行`Create a publisher`,[management page](https://marketplace.visualstudio.com/manage),这里提交表单有可能会没有反应，这是因为你有可能遇到`Cross-Origin Read Blocking (CORB) blocked cross-origin response`问题,这里需要你有一个国外的VPN才能继续，国内IP大概率都会被墙掉。注册成功之后就可以`vsce login {你的注册ID}`,然后输入保存的密钥,成功登录
- 然后在你的`package.json`中添加一行`"publisher":{你的ID}`,规范书写`README.md`,然后`vsce package`最后`vsce publish`就可以了,`License`不存在的警告没有影响。如果是个人发布的小项目审核比较迅速，一般五分钟内就能通过。
- 发布成功之后就可以在vscode扩展中找到你的插件了

## 下载之后的插件不好使？
- 本地检查错误,下方控制板调至`输出`,右侧下拉调至`日志|窗口`,可查看错误信息,更正后发布新版本,`package.json`中`version`升级版本号,然后重更新打包发布
- 注意一个可能会出现的问题,你的`package.json`中执行文件的位置可能是`"main": "./out/extension.js"`,所以一定要保证更新之后的extension.ts文件会被编译为/out/.js文件保存在out文件夹下,vsce打包生成最后的vsix文件最后只剩下你在根目录的新建的文件夹+out+package.json+README+CHANGELOG和一个vsix的配置文件,src中的都不会留下。
- 重新生成out目录的方法 `cd src`,`npm run test`

## Vscode 扩展的介绍
- 插件下载之后安装位置为`C:\Users\Administrator\.vscode\extensions\{作者名}.{插件名}`,插件需要额外文件的可以考虑采用绝对地址

## 一些有用的网站
- [制作图标](https://logomakr.com/)
