# -*- coding: UTF-8 -*- 

# Author:Blanc
# 博客地址:http://blog.csdn.net/u013320664/

import xlrd

fileOutput = open('MonsterCfg.lua','w')

# 让py可以读取文件中的中文
import sys
reload(sys)
sys.setdefaultencoding("utf-8")

# 可以在这里写一些固定的注释代码之类的
writeData = "-- @author:Blanc\n\n\n"

workbook = xlrd.open_workbook('MonsterCfg.xls')
print "There are {} sheets in the workbook".format(workbook.nsheets)

writeData = writeData + 'local MonsterCfg = {\n\n'
for booksheet in workbook.sheets():
    writeData = writeData+ '    ' + booksheet.name + ' = {\n' 
    
    for row in xrange(booksheet.nrows):
        if row > 1:
            writeData = writeData + '       [' + str(int(booksheet.cell(row, 0).value)) + ']' + ' = {' #写入id
            for col in xrange(booksheet.ncols):
                if col == 1 or col == 3:
                    value = booksheet.cell(row, col).value
                    writeData = writeData + ' ' + booksheet.cell(0, col).value + ' = "' + str(value) + '",'
                else:
                    value = booksheet.cell(row, col).value
                    writeData = writeData + ' ' + booksheet.cell(0, col).value + ' = ' + str(int(value)) + ','
            else:
                writeData = writeData + '},\n'
    else:
        writeData = writeData + '    },\n\n'
else :
    writeData = writeData + '}\n\nreturn MonsterCfg'
    fileOutput.write(writeData)

fileOutput.close()