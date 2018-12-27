## 使用nodejs 切图

- 环境搭建：  

    搭建nodejs 环境 http://www.runoob.com/nodejs/nodejs-tutorial.html；  
     使用npm 安装 psd2json(cmd窗口输入命令: npm i psd2json)；  
     将path\node_modules\.bin路径加入到环境变量

- 修改文件(相关文件位于共享文件夹中)：
 
    替换下载安装好的psd2json模块文件夹(path\node_modules\psd2json) ；  
    在path\node_modules\.bin文件夹中加入psd2json.cmd 命令文件


- 使用：

    在psd文件目录下打开cmd窗口 输入 psd2json @psd文件名字.psd(与对应资源文件夹名字一致)


###PS
path为cmd窗口当前路径；  
相关文件路径：\\Sky-20170807gpz\前端共享\工具\nodejs_about  
js 文件编写参考 psd2fgui模块；也可通过命令安装该模块：npm i psd2fgui
