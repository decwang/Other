# -*- coding: UTF-8 -*- 

# Author:Blanc
# 博客地址:http://blog.csdn.net/u013320664/

import xlrd

fileOutput = open('AttrCfg.lua','w')

# 让py可以读取文件中的中文
import sys
reload(sys)
sys.setdefaultencoding("utf-8")

# 可以在这里写一些固定的注释代码之类的
writeData = "-- @author:Blanc\n\n\n"

workbook = xlrd.open_workbook('AttrCfg.xls')
print "There are {} sheets in the workbook".format(workbook.nsheets)

writeData = writeData + 'local AttrCfg = {\n'
for booksheet in workbook.sheets():
    writeData = writeData + '  ' + booksheet.name + ' = {\n    --' 
    for col in xrange(booksheet.ncols):
        writeData = writeData + ' ' + booksheet.cell(0, col).value
    else:
        writeData = writeData + '\n'

    for row in xrange(booksheet.nrows):
        if row > 1:
            writeData = writeData + '    [' + str(int(booksheet.cell(row, 0).value)) + ']' + ' = {' #写入id
            for col in xrange(booksheet.ncols):
                if col == 0:
                    continue
                if col == 8:
                    continue
                value = booksheet.cell(row, col).value
                writeData = writeData + ' [' + str(int(booksheet.cell(1, col).value)) + '] = ' + str(value) + ','
            else:
                writeData = writeData + '},\n'
    else:
        writeData = writeData + '  },\n\n'
else :
    writeData = writeData + '}\n\nreturn AttrCfg'
    fileOutput.write(writeData)

fileOutput.close()