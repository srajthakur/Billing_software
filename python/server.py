from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import code
from ctypes import sizeof
import os
import random
from tkinter import *
from tkinter import Toplevel, Button, Tk, Menu
from tkinter import messagebox
import csv
from csv import writer
from pandas import read_csv

from datetime import date
import re

from pandas import *
import win32ui
import os
import random
from tkinter import *
from tkinter import Toplevel, Button, Tk, Menu
from tkinter import messagebox
from csv import writer
from pathlib import Path
import pandas as pd
import sys
from PIL import Image
import win32con as wcon
import win32print
import win32ui as wui
from PIL import Image as pil_image, ImageWin as pil_image_win
import time
from barcode import EAN13
from PIL import ImageFont
import base64
import os
import sys
import warnings
from io import BytesIO
from barcode import EAN13

from barcode.writer import ImageWriter

# from PIL import ImageTk,Image
PORT = 8001


class MyRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        # ... Code to handle GET requests ...
        pass

    def do_POST(self):

        if self.path == '/api/print_settlement':
            # Handle the POST request and set CORS headers
            print("inPost")
            self.send_response(200)
            self.send_header('Content-type', 'application/json')

            self.send_header('Access-Control-Allow-Origin',
                             'http://localhost:8000')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

            if self.command == 'OPTIONS':
                return

            # Process the received data as needed
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            # Your logic to process the data and generate a response
            print('api connected')
            print(data)
            print('=======================================================')
            doc = []
            doc.append("Bill_NO  Mode   Amount ")
            bli = 0
            bls = ""
            ta = 0
            te = 0
            if len(data[0]) == 0:
                del data[0]
            print(data)
            print('=======================================================')
            bill=1
            for b in data:
                print(b)
                bls = "     "
                
                
                try:
                    
                    bill = b["billNumber"]
                except:
                    bill = bill+1
                bls = bls + str(bill)
                j = 0
                if b["totalAmount"] != '':
                    bls = "     "
                    bls = bls + str(bill)
                    j = 0
                    while j < 10 - len(str(bill)):
                        bls = bls + " "
                        j = j + 1
                    bls = bls + str(b["paymentMethod"])
                    j = 0
                    while j < 10 - len(str(bill)):
                        bls = bls + " "
                        j = j + 1
                    bls = bls + str(b["totalAmount"])
                    j = 0
                    ta = ta + int(b["totalAmount"])

                    doc.append(bls)
            doc.append('-------------------------------------')
            doc.append("TOTAL AMOUNT = " + str(ta))
            doc.append('-------------------------------------')
            doc.append('-------------------------------------')
            doc.append('-------------------------------------')
            doc.append('-------------------------------------')
            doc.append('-------------------------------------')
            doc.append('-------------------------------------')
            doc.append('-------------------------------------')
            print(doc)
            for i in doc:
                print(i)
            print(data)
            dc = win32ui.CreateDC()
            dc.CreatePrinterDC()
            dc.StartDoc('Test')
            dc.StartPage()
            f = 50
            for i, text in enumerate(doc):
                print(i, text)
                dc.TextOut(0, i * 50, text)
                dc.MoveTo(0, i * f)
            dc.EndPage()
            dc.EndDoc()

            response_data = {'message': 'Received data:', 'data': data}
            self.wfile.write(json.dumps(response_data).encode())

        if self.path == '/api/print_bill':
            win32print.SetDefaultPrinter('POS80 Printer')
            # Handle the POST request and set CORS headers
            print("billl     lllllllllllllllllllllllllllllllllllllll")
            self.send_response(200)
            self.send_header('Content-type', 'application/json')

            self.send_header('Access-Control-Allow-Origin',
                             'http://localhost:8000')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

            if self.command == 'OPTIONS':
                return

            # Process the received data as needed
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            # Your logic to process the data and generate a response
            print('api connected')
            print(data)
            da = date.today()
            doc = ['.', '        BOMBAY FASHION', "  ", '  9010751751     9550926301']
            doc.append('Bill No      ' + str(data['billNumber']) + "       " + str(da))
            doc.append('-------------------------------------')
            doc.append(data['number'] + '          ' + data['name'])
            doc.append('-------------------------------------')
            doc.append('Price         quantity       Total')
            f = 50
            i = 0
            t = 0
            q = 0

            tabledata = data['tabledata']

            for datain in tabledata:
                k = datain['price']
                # s=str(Codes[i])+"          "+str(totals[i])
                # al=len(k)
                # while(al<13):
                #   k='0'+k
                #   al=al+1

                if len(k) == 4:
                    s = k + "           " + datain['quantity'] + "                " + str(datain['totalPrice'])
                elif len(k) == 3:
                    s = k + "              " + datain['quantity'] + "                " + str(datain['totalPrice'])
                elif len(k) == 2:
                    s = k + "                " + datain['quantity'] + "                " + str(datain['totalPrice'])

                doc.append(s)

            print(
                '------------------------------------------------------------------------------------------------------------')
            for i in doc:
                print(i)
            dc = win32ui.CreateDC()
            dc.CreatePrinterDC()
            dc.StartDoc('Test')
            dc.StartPage()

            for i, text in enumerate(doc):
                dc.TextOut(0, i * 50, text)
                dc.MoveTo(0, i * f)
            dc.TextOut(0, (i + 1) * f, '-------------------------------------')
            dc.TextOut(0, (i + 2) * f, '   ' + 'TOTAL Item' + '            ' + str(data['totalQuantity']))
            dc.TextOut(0, (i + 3) * f, '-------------------------------------')
            dc.TextOut(0, (i + 4) * f, '     ' + 'TOTAL' + '               ' + str(data['totalAmount']) + ' RS')
            dc.TextOut(0, (i + 5) * f, '-------------------------------------')
            # add_img(dc,'bill/data/INSTA.png')
            dc.TextOut(0, (i + 6) * f, '-------------------------------------')

            dc.TextOut(0, (i + 7) * f, '               Thankyou              ')
            dc.TextOut(0, (i + 8) * f, '-------------------------------------')
            dc.TextOut(0, (i + 9) * f, '-------------------------------------')
            dc.TextOut(0, (i + 10) * f, '   No Exchange & No Return           ')
            dc.TextOut(0, (i + 11) * f, '-------------------------------------')
            dc.TextOut(0, (i + 12) * f, '-------------------------------------')
            for i in doc:
                print(i)
            dc.EndPage()
            dc.EndDoc()

            response_data = {'message': 'Received data:', 'data': data}
            self.wfile.write(json.dumps(response_data).encode())

        if self.path == '/api/print_label':
            # Handle the POST request and set CORS headers
            print("billl     lllllllllllllllllllllllllllllllllllllll")
            win32print.SetDefaultPrinter('POS58L Printer')
            self.send_response(200)
            self.send_header('Content-type', 'application/json')

            self.send_header('Access-Control-Allow-Origin',
                             'http://localhost:8000')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

            if self.command == 'OPTIONS':
                return

            # Process the received data as needed
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            # Your logic to process the data and generate a response

            def draw_img(hdc, dib, maxh, maxw):
                w, h = dib.size
                print("Image HW: ({:d}, {:d}), Max HW: ({:d}, {:d})".format(h, w, maxh, maxw))
                h = min(h, maxh)
                w = min(w, maxw)
                l = 0
                t = 0
                dib.draw(hdc, (l, t, l + w, t + h))

            def add_img(hdc, file_name, new_page=False):
                print('yesssssss')
                if new_page:
                    hdc.StartPage()
                maxw = hdc.GetDeviceCaps(wcon.HORZRES)
                maxh = hdc.GetDeviceCaps(wcon.VERTRES)
                img = pil_image.open(file_name)
                dib = pil_image_win.Dib(img)
                print(maxh, maxw, dib)
                draw_img(hdc.GetHandleOutput(), dib, maxh, maxw)

            print('api connected')
            print(data)

            code = str(data['barcode'])
            print(code[0:12])
            my_code = EAN13(code[0:12], writer=ImageWriter())

            my_code.save(os.path.basename("./new_code1"))

            im1 = Image.open("new_code1.png")
            newsize = (400, 200)
            im1 = im1.resize(newsize)

            im1.save('new_code1.png')
            out_file = ".\\test.pdf"

            i = 0
            quantity = int(data['printQ'])
            while (i < quantity):
                time.sleep(1)
                hdc = wui.CreateDC()
                hdc.CreatePrinterDC()

                hdc.StartDoc('')

                add_img(hdc, "new_code1.png")

                hdc.EndDoc()
                i = i + 1
                hdc.DeleteDC()

            print('outtttttt')

            response_data = {'message': 'Received data:', 'data': data}
            self.wfile.write(json.dumps(response_data).encode())
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'404 - Not Found')

    def do_OPTIONS(self):
        # Handle OPTIONS request and set CORS headers
        print("inoption")
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin',
                         'http://localhost:8000')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()


if __name__ == "__main__":
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, MyRequestHandler)
    print(f"Serving at port {PORT}")
    httpd.serve_forever()


class print_printer():
    def print_sett(self, data):
        doc = []
        doc.append("Bill_NO  Mode   Amount ")
        bli = 0
        bls = ""
        ta = 0
        te = 0
        for b in data:
            bls = "     "
            bls = bls + str(b["billNumber"])
            j = 0
            if b["totalAmount"] != '':
                bls = "     "
                bls = bls + str(b["billNumber"])
                j = 0
                while j < 10 - len(str(b["billNumber"])):
                    bls = bls + " "
                    j = j + 1
                bls = bls + str(b["paymentMethod"])
                j = 0
                while j < 10 - len(str(b["billNumber"])):
                    bls = bls + " "
                    j = j + 1
                bls = bls + str(b["totalAmount"])
                j = 0
                ta = ta + int(b["totalAmount"])
                te = te + int(b["exchange"])
                doc.append(bls)
        doc.append('-------------------------------------')
        doc.append("TOTAL AMOUNT = " + str(ta))
        doc.append('-------------------------------------')
        doc.append('-------------------------------------')
        doc.append('-------------------------------------')
        doc.append('-------------------------------------')
        doc.append('-------------------------------------')
        doc.append('-------------------------------------')
        doc.append('-------------------------------------')
        print(doc)
        for i in doc:
            print(i)
        # dc = win32ui.CreateDC()
        # dc.CreatePrinterDC()
        # dc.StartDoc('Test')
        # dc.StartPage()
        # f = 50
        # for i, text in enumerate(doc):
        #     print(i, text)
        #     dc.TextOut(0, i * 50, text)
        #     dc.MoveTo(0, i * f)
        # dc.EndPage()
        # dc.EndDoc()
        #


