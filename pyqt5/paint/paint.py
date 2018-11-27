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
        self.setPathButton.setText("button_open")  
        self.setPathButton.move(10, 10)   
        # self.setPathButton.clicked.connect(self.msg)  

        self.tipLabel = QLabel(self)
        self.tipLabel.setFixedWidth(400)
        self.tipLabel.setFixedHeight(50)
        self.tipLabel.setText("label")
        self.tipLabel.move(10, 40)

        self.q1create = QtWidgets.QPushButton(self)  
        self.q1create.setObjectName("q1create")  
        self.q1create.setText("button")  
        self.q1create.move(0, 80)  

class SetPathWindow(QtWidgets.QWidget):
    def __init__(self):
        super(SetPathWindow, self).__init__()

        self.initUi()
 
    def initUi(self):
        self.setWindowTitle("testwindow2")
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


    import sys  
  
    app=QtWidgets.QApplication(sys.argv)  
    set_path_window = SetPathWindow()
    create_mvcFlie_window = CreateFlieWindow()

    create_mvcFlie_window.setPathButton.clicked.connect(set_path_window.showset)

    create_mvcFlie_window.show()
    sys.exit(app.exec_())  