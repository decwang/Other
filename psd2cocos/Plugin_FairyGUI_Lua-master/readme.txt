1、复制bin/FairyGUILuaGen.swc到FairyGUI目录的plugins下
2、复制template目录到目标工程目录下（或者复制template/Lua到FairyGUI目录下的template/）
3、重启FairyGUI（或者菜单栏-插件管理-重新载入）
4、项目设置、自定义属性加入(gen_lua表示是否生成lua代码，lua_class_prefix表示生成的lua代码前缀):
	gen_lua = true
	lua_class_prefix = UI_
5、发布设置-编辑全局设置-设置代码保存路径（由于是插件，所以代码类型下没有Lua选项，生成代码的勾选项也不用勾）
6、如果想了解生成代码的逻辑，请查看src/GenerateLuaCodePlugin.as中的createFile函数