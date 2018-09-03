#!/usr/bin/python3
# -*- coding: utf-8 -*-
 
"""
Py40.com PyQt5 tutorial 
 
In this example, we create a simple
window in PyQt5.
 
author: Jan Bodnar
website: py40.com 
last edited: January 2015
"""
 
import sys
#使用utf8 编码
reload(sys)
sys.setdefaultencoding('utf8')

#这里我们提供必要的引用。基本控件位于pyqt5.qtwidgets模块中。
from PyQt5.QtWidgets import QApplication, QWidget
from PyQt5.QtWidgets import QLineEdit,QInputDialog, QLineEdit, QGridLayout, QLabel, QPushButton
 
from PyQt5 import QtWidgets

class CreateFlieWindow(QtWidgets.QWidget):
    def __init__(self):
        super(CreateFlieWindow, self).__init__()
        self.setGeometry(600, 600, 320, 130)
        self.move(300, 300)

        self.setPathButton = QtWidgets.QPushButton(self)  
        self.setPathButton.setObjectName("setPathButton")  
        self.setPathButton.setText("路径配置")  
        self.setPathButton.move(10, 10)   
        # self.setPathButton.clicked.connect(self.msg)  

        self.tipLabel = QLabel(self)
        self.tipLabel.setFixedWidth(400)
        self.tipLabel.setFixedHeight(50)
        self.tipLabel.setText("点击创建mvc文件：")
        self.tipLabel.move(10, 40)

        self.q1create = QtWidgets.QPushButton(self)  
        self.q1create.setObjectName("q1create")  
        self.q1create.setText("q1")  
        self.q1create.move(0, 80)  
        
        self.q2create = QtWidgets.QPushButton(self)  
        self.q2create.setObjectName("q2create")  
        self.q2create.setText("q2")  
        self.q2create.move(80, 80)  
        
        self.q3create = QtWidgets.QPushButton(self)  
        self.q3create.setObjectName("q3create")  
        self.q3create.setText("q3")  
        self.q3create.move(160, 80)  
        
        self.q4create = QtWidgets.QPushButton(self)  
        self.q4create.setObjectName("q4create")  
        self.q4create.setText("q4")  
        self.q4create.move(240, 80)  

class SetPathWindow(QtWidgets.QWidget):
    def __init__(self):
        super(SetPathWindow, self).__init__()

        self.initUi()
 
    def initUi(self):
        self.setWindowTitle("路径配置")
        layout = QGridLayout()
        self.setGeometry(600, 600, 300, 280)
        self.move(500, 350)

        self.tipLabel = QLabel(self)
        self.tipLabel.setFixedWidth(400)
        self.tipLabel.setFixedHeight(50)
        self.tipLabel.setText("输入项目文件夹client 所在路径 如 F:/cq04")
        self.tipLabel.move(0, -10)

        q1Label = QLabel("q1")
        self.q1Edit = QLineEdit(" ")
        q2Label = QLabel("q2")
        self.q2Edit = QLineEdit(" ")
        q3Label = QLabel("q3")
        self.q3Edit = QLineEdit("")
        q4Label = QLabel("q4")
        self.q4Edit = QLineEdit("")

         # layout.setSpacing(10)
        # layout.addWidget(tipLabel,1,0)
        layout.addWidget(q1Label,2,0)
        layout.addWidget(self.q1Edit,2,1)
        layout.addWidget(q2Label, 3, 0)
        layout.addWidget(self.q2Edit, 3, 1)
        layout.addWidget(q3Label,4,0)
        layout.addWidget(self.q3Edit,4,1)
        layout.addWidget(q4Label,5,0)
        layout.addWidget(self.q4Edit,5,1)
        layout.setColumnStretch(1, 10)

        save_Btn = QPushButton('保存')
        save_Btn.clicked.connect(self.setPath)
        layout.addWidget(save_Btn)
        self.setLayout(layout)
    def setPath(self):
        path1 = self.q1Edit.text()  # 获取文本框内容
        path2 = self.q2Edit.text()
        path3 = self.q3Edit.text()
        path4 = self.q4Edit.text()
        print('姓名: %s 性别: %s 手机号: %s 邮箱: %s ' % (path1, path2, path3, path4))     
        self.close()
    def showset(self):
        self.show()
if __name__ == '__main__':
    # #每一pyqt5应用程序必须创建一个应用程序对象。sys.argv参数是一个列表，从命令行输入参数。
    # app = QApplication(sys.argv)
    # #QWidget部件是pyqt5所有用户界面对象的基类。他为QWidget提供默认构造函数。默认构造函数没有父类。
    # w = QWidget()
    # #resize()方法调整窗口的大小。这离是250px宽150px高
    # w.resize(250, 150)
    # #move()方法移动窗口在屏幕上的位置到x = 300，y = 300坐标。
    # w.move(300, 300)
    # #设置窗口的标题
    # w.setWindowTitle('Simple')
    # #显示在屏幕上
    # w.show()
    
    # #系统exit()方法确保应用程序干净的退出
    # #的exec_()方法有下划线。因为执行是一个Python关键词。因此，exec_()代替
    # sys.exit(app.exec_())


    import sys  
  
    app=QtWidgets.QApplication(sys.argv)  
    set_path_window = SetPathWindow()
    create_mvcFlie_window = CreateFlieWindow()

    create_mvcFlie_window.setPathButton.clicked.connect(set_path_window.showset)

    create_mvcFlie_window.show()
    sys.exit(app.exec_())  