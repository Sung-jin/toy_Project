# -*- coding: utf-8 -*-
# /etc/sysconfig/iptables
__author__ = 'root'

import os
import sys
import commands

from PyQt4.QtCore import *
from PyQt4.QtGui import *


from window import *


class MyForm(QtGui.QMainWindow):
    def __init__(self, parent=None):
        QtGui.QMainWindow.__init__(self,parent)
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.ui.txt_portnum.setText("1~65535")
        self.status()

    def btnAdd(self):
        try:
            num = int(self.ui.txt_portnum.text())
            if (num <= 65535) and (num > 0):

                if (self.ui.cb_inout.currentIndex() == 0):
                    cmd = "iptables -I INPUT 1 -p" + self.ui.cb_protocol.currentText()+" --dport "+self.ui.txt_portnum.text() +" -j "+ self.ui.comboBox.currentText()
                    self.PolicyAdd(cmd)
                    #self.putLog(str(cmd))
                    cmd = "iptables -I OUTPUT 1 -p" + self.ui.cb_protocol.currentText()+" --dport "+self.ui.txt_portnum.text() +" -j "+ self.ui.comboBox.currentText()
                    self.PolicyAdd(cmd)
                else:
                    cmd = "iptables -I "+self.ui.cb_inout.currentText()+" 1 -p" + self.ui.cb_protocol.currentText()+" --dport "+self.ui.txt_portnum.text() +" -j "+ self.ui.comboBox.currentText()
                    self.PolicyAdd(cmd)

                self.PolicyAdd("service iptables save")
                self.PolicyAdd("/etc/init.d/iptables restart")
                self.putLog(str("정책이 등록 되었습니다."))
                self.status()
            else:
                self.putLog(str("1~65535범위에서 포트번호를 입력하세요."))
        except:
            self.putLog(str("1~65535범위에서 포트번호를 입력하세요."))

    def btnStart(self):
        self.start()
    def btnStatus(self):
        self.status()
    def btnShutdown(self):
        self.stop()

    def putLog(self,msg):
        self.ui.txt_log.append(str(msg).decode("utf-8"))

    def PolicyAdd(self, msg):
        commands.getoutput(str(msg));

    def start(self):
        msg = commands.getoutput("/etc/init.d/iptables start")
        self.putLog(msg)

    def stop(self):
        msg = commands.getoutput("/etc/init.d/iptables stop")
        self.putLog(msg)

    def status(self):
        stat = commands.getoutput("/etc/init.d/iptables status")
        length = len(stat)
        oriLen = len("iptables: 방화벽이 실행 중이 아닙니다. ")

        if length > oriLen:
            self.ui.txtAll.setText(str(stat).decode("utf-8"))
            #parsing(str(stat).split('\n'))
        else:
            #print("")
            self.ui.txtAll.setText(str(stat).decode("utf-8"))
class events():
    def __init__(self):
        if os.getuid() != 0:

            sys.exit()
        else:
            return



if __name__=="__main__":
    app = QtGui.QApplication(sys.argv)
    myapp = MyForm()
    myapp.show()
    sys.exit(app.exec_())


