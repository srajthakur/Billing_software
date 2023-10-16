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
import win32print as wprn
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
# from PIL import ImageTk,Image

#welcome window
root = Tk()

#main window and functions



           
           
def neeee():
        def add_txt(hdc, file_name, new_page=False):
            if new_page:
                hdc.StartPage()
            pixel_scale = 84
            with open(file_name, mode="r") as fin:
                for idx, line in enumerate(fin):
                    print("Text line {:d}: {:s}".format(idx, line))
                    hdc.TextOut(5, idx * pixel_scale, line)
            if new_page:
                hdc.EndPage()
 

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
            print(maxh,maxw,dib)
            draw_img(hdc.GetHandleOutput(), dib, maxh, maxw)
        def print1():
                    quantity = e1122.get()
                    code = e1002.get()
                    
                    from barcode import EAN13
                    
                    
                    from barcode.writer import ImageWriter
                    
                    
            #         print(core.getfont(
            #     font, size, index, encoding, layout_engine=layout_engine
            # ))   
                    
                    print(type(code))
                    n=str(code)
                    print(code[0:12])
                    my_code = EAN13(code[0:12], writer=ImageWriter())
                    
                    
                    my_code.save(os.path.basename("./new_code1"))
                    
                
                    im1 = Image.open("new_code1.png")
                    newsize = (400,200)
                    im1 = im1.resize(newsize)
            
                    im1.save('new_code1.png')
                    out_file = ".\\test.pdf"
                
                    i=0
                    print(quantity,int(quantity))
                    while(i<int(quantity)):
                        time.sleep(1)
                        hdc = wui.CreateDC()
                        hdc.CreatePrinterDC()
                    
                        hdc.StartDoc('')
                    
                        add_img(hdc, "new_code1.png")

                    
                        hdc.EndDoc()
                        i=i+1
                        hdc.DeleteDC()
                        
                    print('outtttttt')
                    e1122.delete(0,END)
                    e1122.insert(0,1)
                    e1002.delete(0,END)

        def changed():
            results = pd.read_csv('data/rate.csv')
            code=100000000000+len(results)+2
            code = EAN13(str(code))
            print(code)
            b = e112.get()  

            ab =e100.get()


            fields = ['Code','Product', 'Rate'] 
    

            rows = [ 
                    [code,ab ,b]
                    ] 
                

            filename = "data/rate.csv"

            with open (filename, 'a') as f_object:
  
                for  row in rows:
                    writer_object = writer(f_object)
                    writer_object.writerow(row)


                f_object.close()
       
            e112.delete(0,END)

            e100.delete(0,END)

            os.system('cls')

           
       
        global oge, cpe, cpe2, nme
        root.destroy()
        root5 =Tk()
        root5.geometry("590x420")
        root5.minsize(590, 420)
        root5.title("CHANGE ITEM'S RATE")
        root5.configure(bg="black")
      
     
        f11 = LabelFrame(root5, text="", height="420", width="575", bg="grey", fg="yellow",
                         font=("comicsansms", 12, "bold"), relief=SUNKEN, borderwidth=8)

        # l28 = Label(f11, text="Code", bg="grey", fg="black", font=("comicsansms", 12, "bold"),
        #             relief=FLAT).place(
        #     x=20, y=0)

        l29 = Label(f11, text="Product", bg="grey", fg="black", font=("comicsansms", 12, "bold"),
                    relief=FLAT).place(
            x=20, y=0)

        l30 = Label(f11, text="Price", bg="grey", fg="black", font=("comicsansms", 12, "bold"),
                    relief=FLAT).place(
            x=300, y=0)

        

        e100 = Entry(f11, relief=SUNKEN, borderwidth=8)
        e100.place(x=20, y=50)
        print(ImageFont.load_default())
        e112 = Entry(f11, relief=SUNKEN, borderwidth=8)
        e112.place(x=300, y=50)

        l292 = Label(f11, text="Code", bg="grey", fg="black", font=("comicsansms", 12, "bold"),
                    relief=FLAT).place(
            x=20, y=200)

        l302 = Label(f11, text="Quantity", bg="grey", fg="black", font=("comicsansms", 12, "bold"),
                    relief=FLAT).place(
            x=300, y=200)

        

        e1002 = Entry(f11, relief=SUNKEN, borderwidth=8)
        e1002.place(x=20, y=250)

        e1122 = Entry(f11, relief=SUNKEN, borderwidth=8)
        e1122.place(x=300, y=250)
        e1122.insert(0,1)

       
        os.system('cls')
        print(ImageFont.load_default())
        f11.place(x=0, y=10)
        btn10 = Button(root5, activebackground="black", activeforeground="white", text="Add",
                      font=("comicsansms", 12, "bold"), relief=SUNKEN, borderwidth=3, command=changed).place(x=210, y=150)
        btn10 = Button(root5, activebackground="black", activeforeground="white", text="Print",
                      font=("comicsansms", 12, "bold"), relief=SUNKEN, borderwidth=3, command=print1).place(x=210, y=350)
       
        root5.mainloop()
import win32print
win32print.SetDefaultPrinter('POS58L Printer')
neeee()















    











 