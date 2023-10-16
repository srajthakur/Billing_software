import code
from ctypes import sizeof
import os
import random
from tkinter import *
from tkinter import Toplevel, Button, Tk, Menu
from tkinter import messagebox,PhotoImage
import csv
from csv import writer
from PIL import Image as pil_image, ImageWin as pil_image_win
import win32con as wcon
from pandas import read_csv
from tomlkit import item
from traitlets import default
import win32ui as wui
from datetime import date,timedelta,datetime
import re
import win32ui
from zmq import NULL
import update_file ,delete
from customer_copy import cb
businee_name = 'The Bombay Fashion'
d = str(date.today())
print(d[8:])
if d[8:] not in ['01','02','03','04']:
  delete.delete()   
filename = "bill/data/rate.csv" 
rowss = []
b=[]
statf=False

s=0
ddd=0
with open(filename, "r") as csvfile:
               
                csvreader = csv.DictReader(csvfile)
                
                for row in csvreader:
                    rowss.append(row)
#os.system('cls')
da=date.today()
        
filename ="bill/data/" + str(da)+".csv"

#print(filename)
decision=os.path.exists(filename)
#print(decision)
if(decision==False):
  #file=open(filename)
 row=["bill_no","amount","type","exchange",'code','payment']
 with open (filename, 'a') as f_object:
  
                 
                   writer_object = writer(f_object)
                   writer_object.writerow(row)
customer=[]    
print('yoooooooooooooo')
with open("bill/data/cutomer.csv", "r") as csvfile:
                csvreader = csv.DictReader(csvfile)
                #print(csvreader)
                for row in csvreader:
                  
                    if row["name"]!="" and len(row['number']) >= 10 and row not in customer: 
                     customer.append(row)
                     #print(row)


my_list=[]
each_customer=[]
for i in customer:
  my_list.append([i['number'],i['name']])
#print(my_list)    
# for i in customer:
#     if 



with open(filename, "r") as csvfile:
                csvreader = csv.DictReader(csvfile)
                #print(csvreader)
                for row in csvreader:
                    if row['bill_no']!="": 
                     b.append(row)
                     
              

for row in rowss:
    if row["Code"]=="":
        rowss.remove(row)
##print(rowss)

Codes=[]
items=[]
prices=[]
quanditys=[]
totals=[]

eCodes=[]
eitems=[]
eprices=[]
equanditys=[]
etotals=[]
inc=[]
act=[]
act.append('ddddd')
bn=[]
bn.append(len(b)+1)

exchange=0
sta = False
print('------------------------------------------------------------------')
def main():
    
    root1=Tk()
    root1.minsize(1500,800)
    root1.maxsize(1500, 800)
    root1.title(businee_name)
    var = StringVar()
    var.set('no')
    def space_bill(event):
        gen_bill()
    def remove():
              
        code=e11.get()
        quandity=1
        #print(code)
        for i in rowss:
            if i["Code"]==code:
                k=0
                found=0
                
                while(k<len(Codes)):
                    ##print("inwhile")
                    if Codes[k]==code:
                        #print("inside",quanditys[k])
                        if str(quanditys[k])=="1" or str(quanditys[k])==str(quandity):
                          #print ('if')
                          Codes.remove(Codes[k])
                          items.remove(items[k])
                          prices.remove(prices[k])
                          quanditys.remove(quanditys[k])
                          totals.remove(totals[k])
                        ##print("inif")
                        else:
                          #print('else')
                          quanditys[k]=int(quanditys[k])-int(quandity)
                          totals[k]=int(i["Rate"])*int(quanditys[k])
                        found=1
                    k=k+1
               
                break
        t1.delete(1.0,END)
        t1.insert(END,"code              item                   quantity                 rate                     total\n" )
        j=0
        ##print(j,len(items))
        while(j<len(items)):
             s=Codes[j] 
             i=0
             while i <= 17-len(Codes[j]):
               s=s+ " " 
               i=i+1
             i=0
             s=s+items[j]
             while(i<=22-len(items[j])):
               s=s+ " " 
               i=i+1
             
             i=0
             s=s+ str(quanditys[j]) 
             while(i<=24-len (str(quanditys[j])) ):
               s=s+ " "
               i=i+1 
             s=s+ str(prices[j])
             
             i=0

             while(i<=29-len(prices[j])-len(str(totals[j]))):
               s=s+ " " 
               i=i+1
             s=s+ str(totals[j]) + "\n"
             t1.insert(END, s)
             i=i+1
             
             j=j+1
             ##print("reached")
        to=0
        for i in totals:
                to=to+int(i)
        t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )
        t1.insert(END,"                                                    TOTAL = "+ str(to)+"\n" )
        t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )
        e11.delete(0,END)
        root1.bind('<Key>', get_key)
        inc.clear()
        middleframe2.pack_forget()
        middleframe.pack(side=RIGHT, fill=Y, padx=10, pady=10)
      

    def update():
      print('update--------------')
      topframe.pack_forget()
      cntrframe3.pack_forget()
      middleframe.pack_forget()
      middleframe2.pack_forget()
      update_file.main(root1)
      # topframe.pack(side=TOP, fill=X, padx=10, pady=10)
      # cntrframe3.pack(side=LEFT, fill=Y, padx=10, pady=10)
      # middleframe.pack(side=RIGHT, fill=Y, padx=10, pady=10)
    def stash():
      
      p=[]
      with open(filename, "r") as csvfile:
                csvreader = csv.DictReader(csvfile)
                #print(csvreader)
                for row in csvreader:
                    if row['bill_no']!="": 
                     p.append(row)
      k = len(p) +1  
      e5.delete(0,END)            
      e5.insert(0,k+1)
      import stash_file
      
      stash_file.called_fun()
    



    def exchange():
        
      
        middleframe.pack_forget() 
        
        middleframe.pack(side=LEFT, fill=Y, padx=10, pady=10)
        def l():
          root = Tk()
          root.geometry("300x300")
          root.title("Password")
            
          def submit():

            #print(password.get())
            if(password.get()=='Pay@1000'):
              root.destroy()
              #print('outtttttttttttt')
              exchange=1
              t1.delete(1.0,END)
              t1.insert(END,"code              item                   quantity                 rate                     total\n" )
              j=0
              ##print(j,len(items))
              while(j<len(items)):
                  s=Codes[j] 
                  i=0
                  while i <= 17-len(Codes[j]):
                    s=s+ " " 
                    i=i+1
                  i=0
                  s=s+items[j]
                  while(i<=22-len(items[j])):
                    s=s+ " " 
                    i=i+1
                  
                  i=0
                  s=s+ str(quanditys[j]) 
                  while(i<=24-len (str(quanditys[j])) ):
                    s=s+ " "
                    i=i+1 
                  s=s+ str(prices[j])
                  
                  i=0

                  while(i<=29-len(prices[j])-len(str(totals[j]))):
                    s=s+ " " 
                    i=i+1
                  s=s+ str(totals[j]) + "\n"
                  t1.insert(END, s)
                  i=i+1
                  
                  j=j+1
                  ##print("reached")
              to=0
            
              for i in totals:
                      to=to+int(i)
              
              
              t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )
              t1.insert(END,"                                                    TOTAL = "+ str(to)+"\n" )
              t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )
              t1.insert(END,"                                                                                                                          \n\n" )
              t1.insert(END,"                                                                                                                          \n\n" )
              t1.insert(END,"                                                                                                                          \n\n" )
              t1.insert(END,"                                                                                                                          \n\n" )
              t1.insert(END,"                                                                                                                          \n\n" )
              t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )
              t1.insert(END,"                                                    Exchange\n" )
              t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )
              code=e11.get()
              quandity=1
              for i in rowss:
                  if i["Code"]==code:
                      k=0
                      found=0
                      while(k<len(eCodes)):
                          ##print("inwhile")
                          if eCodes[k]==code:
                              ##print("inif")
                              found=1
                              equanditys[k]=int(equanditys[k])+int(quandity)
                              etotals[k]=int(i["Rate"])*int(equanditys[k])
                          k=k+1
                      if found==0:
                          eCodes.append(i["Code"])
                          eitems.append(i["Product"])
                          eprices.append(i["Rate"])
                          equanditys.append(quandity)
                          etotals.append(int(i["Rate"])*int(quandity))
                      break
              j=0
              ##print(j,len(items))
              while(j<len(eitems)):
                  s=eCodes[j] 
                  i=0
                  while i <= 17-len(eCodes[j]):
                    s=s+ " " 
                    i=i+1
                  i=0
                  s=s+eitems[j]
                  while(i<=22-len(eitems[j])):
                    s=s+ " " 
                    i=i+1
                  
                  i=0
                  s=s+ str(equanditys[j]) 
                  while(i<=24-len (str(equanditys[j])) ):
                    s=s+ " "
                    i=i+1 
                  s=s+ str(eprices[j])
                  
                  i=0

                  while(i<=29-len(eprices[j])-len(str(etotals[j]))):
                    s=s+ " " 
                    i=i+1
                  s=s+ str(etotals[j]) + "\n"
                  t1.insert(END, s)
                  i=i+1
                  
                  j=j+1
                  ##print("reached")
              to=0
              eto=0
              for i in totals:
                      to=to+int(i)
              for i in etotals:
                      eto=eto+int(i)
              to=to-eto
              t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )
              t1.insert(END,"                                                    TOTAL = "+ str(to)+"\n" )
              t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )
              e11.delete(0,END)
              root1.bind('<Key>', get_key)
              middleframe2.pack_forget()
              middleframe.pack(side=RIGHT, fill=Y, padx=10, pady=10)

          # Defining the first row
        #  lblfrstrow = Tk.Label(root, text ="Username -", )
          #lblfrstrow.place(x = 50, y = 20)
          
          
          #Username = Tk.Entry(root, width = 35)
          #Username.place(x = 150, y = 20, width = 100)
            
          lblsecrow = LabelFrame(root, text ="Password -")
          lblsecrow.place(x = 50, y = 50)
          
          password = Entry(root, width = 35)
          password.place(x = 150, y = 50, width = 100)
          
          submitbtn = Button(root, text ="Login",
                                bg ='blue', command = submit)
          submitbtn.place(x = 150, y = 135, width = 55)
          
          root.mainloop()
          

        l()
        

  
    def clear():
            e4.config(state='normal')
            e3.config(state='normal')
            e2.config(state='normal')
            e1.config(state='normal')
            e1.focus()
            root1.unbind('<Key>')
            e1.bind('<Return>',getting_info)
            Codes.clear()
            items.clear()
            prices.clear()
            quanditys.clear()
            totals.clear()
            eCodes.clear()
            eitems.clear()
            eprices.clear()
            equanditys.clear()
            etotals.clear()
            e11.delete(0,END)
            e1.delete(0,END)
            e2.delete(0,END)
            e3.delete(0,END)
            e4.delete(0,END)
            t1.delete(1.0,END)

            
           
    def total():
        #print("yo")
     def amount():
        root1.destroy()
        root2=Tk()
        root2.minsize(1540, 850)
        # root2.maxsize(500, 500)
        def login():
                bll=[]
                da=date.today()
        
                filename ="bill/data/" + str(da)+".csv"
                #print(filename)
                decision=os.path.exists(filename)
                #print(decision)
                if(decision==False):
                  file=open(filename)
                  #print(decision)
                with open(filename, "r") as csvfile:
                  csvreader = csv.DictReader(csvfile)
          
                  for row in csvreader:
                      bll.append(row)
                  for b in bll:
                    if b['bill_no']=="":
                      bll.remove(b)

                def settle():
                
                  
                  row=["bill_no","amount","type","exchange"]
                  with open (filename, 'a') as f_object:
  
                 
                   writer_object = writer(f_object)
                   writer_object.writerow(row)
                  
                  
                  t1.delete(1.0,END)
                  t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )
                  t1.insert(END,"                                                    Settled Down "+"\n" )
                  t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )    
                  t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )
                  t1.insert(END,"                                                    Good Night"+ str(te)+"\n" )
                  t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" ) 
               
                root2.destroy()
                root3=Tk()
                root3.minsize(700,700)
                cntrframe3 = LabelFrame(root3, text="", height="70", width="900", bg="white", fg="BLACK",
                                font=("comicsansms", 20, "bold"), relief=SUNKEN, borderwidth=5)
                sb1 = Scrollbar(cntrframe3)
                sb1.pack(side=LEFT, fill=Y)
                t1 = Text(cntrframe3, height=700, width=125, yscrollcommand=sb1.set)


                t1.pack(fill=Y, padx=6, pady=6)
                sb1.config(command=t1.yview)
                #cntrframe3.pack(side=LEFT, fill=Y, padx=10, pady=10)


                middleframe = LabelFrame(root3, text="", height="70", width="900", bg="white", fg="BLACK",
                                font=("comicsansms", 20, "bold"), relief=SUNKEN, borderwidth=5)

                
                l29 = Label(middleframe, text="", bg="gray63", fg="black", font=("comicsansms", 12, "bold"),
                    relief=FLAT).place(
                        x=220, y=50)

             
                btn6 =  Button(middleframe, activebackground="black", activeforeground="white", text="Settle Down",
                            font=("comicsansms", 12, "bold"), relief=SUNKEN, height=2, width=16, borderwidth=9,command=settle).place(x=100,
                                                                                                                    y=300)
                ##print(bll)
                t1.delete(1.0,END)
                t1.insert(END,"     Bill NO                    Amount                         Type                       Exchange Amount    \n" )
                bli=0
                bls="     "
                ta=0
                te=0
                for b in bll:
                  bls="     "
                  bls=bls+str(b["bill_no"])
                  j=0
                  while j<28-len(str(b["bill_no"])):
                    bls=bls+" "
                    j=j+1
                  bls=bls+str(b["amount"])
                  j=0
                  while j<32-len(str(b["amount"])):
                    bls=bls+" "
                    j=j+1
                  bls=bls+str(b["type"])
                  j=0
                  while j<28-len(str(b["type"])):
                    bls=bls+" "
                    j=j+1
                  bls=bls+str(b["exchange"])
                  bls=bls+"\n"
                  ##print(type(b["amount"]),type(b["exchange"]),b['amount'])
                 
                  ta=ta+int(b["amount"])
                  te=te+int(b["exchange"])
                  t1.insert(END,bls )
                t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )
                t1.insert(END,"                                                    TOTAL AMOUNT = "+ str(ta)+"\n" )
                t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )    
                t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )
                t1.insert(END,"                                                    TOTAL EXCHANGE AMOUNT = "+ str(te)+"\n" )
                t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" ) 
                                

            
            
                middleframe.pack(side=RIGHT, fill=Y, padx=10, pady=10)


        login()
        # ##print("yessssssssss")       
        # password="Pay@1000"
        # topframe100 = LabelFrame(root2, text="Customer Details", bg="gray63", font=("comicsansms", 12, "bold"), fg="yellow",
        #                   height="500",width="500", relief=SUNKEN, borderwidth=5)

        # pppp1 = Label(topframe100, text="Password" ,bg="gray63", fg="black", font=("comicsansms", 12, "bold"),
        #             relief=FLAT).place(x=200, y=50)
        # e1111 = Entry(topframe100, relief=SUNKEN, borderwidth=5)
        # e1111.place(x=200, y=80)
        # topframe100.pack(side=TOP, fill=X, padx=10, pady=10)
        # btn6 =  Button(topframe100, activebackground="black", activeforeground="white", text="Login",
        #           font=("comicsansms", 12, "bold"), relief=SUNKEN, height=2, width=16, borderwidth=9,command=login).place(x=200,
        #                                                                                                    y=150)
       
        
  
    def gen_bill():
      print(var.get())
      ro = [ e1.get(),e2.get(),e3.get(),e4.get()]
      
      if  (ro[0] and ro[1] and ro[2] and ro[3]) or (ro[0] and ro[1]):
      
        if ro[0] and ro[1] and ro[2] and ro[3]:
          print('newcustomer -------------------------------------------------------------------------------')
          rows = [ e2.get(),e1.get(),e3.get(),e4.get()] 
        da=date.today()
        print(da)
        r=[]
        filename ="bill/data/" + str(da)+".csv"
        with open(filename, "r") as csvfile:
                  csvreader = csv.DictReader(csvfile)
                  #print(csvreader)
                  for row in csvreader:
                      if row['bill_no']!="": 
                        r.append(row)
        
        bz=len(r)+1
        
        doc = ['.','        BOMBAY FASHION',"  ",'  9010751751     9550926301']
        doc.append('Bill No      '    +str(bz) + "       " + str(da))
        doc.append('-------------------------------------')
        doc.append('Price         quantity       Total')
        f = 50
        i=0
        t=0
        q=0

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
        
        while(i<len(prices)):
          k=str(prices[i])  
          #s=str(Codes[i])+"          "+str(totals[i])
          # al=len(k)
          # while(al<13):
          #   k='0'+k
          #   al=al+1

          if len(k)==4:
            s=  k+"           "+str(quanditys[i])+"                "+str(totals[i])
          elif len(k) ==3 :
              s= k+"              "+str(quanditys[i])+"                "+str(totals[i])
          elif len(k) ==2 :
              s=k+"                "+str(quanditys[i])+"                "+str(totals[i])
          
          doc.append(s)
          
          t=t+totals[i]
          q=q+quanditys[i]
          i=i+1
        print('------------------------------------------------------------------------------------------------------------')
        for i in doc:
            print(i)
        dc = win32ui.CreateDC()
        dc.CreatePrinterDC()
        dc.StartDoc('Test')
        dc.StartPage()


        for i, text in enumerate(doc):
          
            dc.TextOut(0,i*50, text)
            dc.MoveTo(0, i*f)
        dc.TextOut(0,(i+1)*f, '-------------------------------------')
        dc.TextOut(0,(i+2)*f, '   ' +'TOTAL Item'+ '            ' + str(q) )
        dc.TextOut(0,(i+3)*f, '-------------------------------------')
        dc.TextOut(0,(i+4)*f, '     ' +'TOTAL'+ '               ' + str(t)+ ' RS' )
        dc.TextOut(0,(i+5)*f, '-------------------------------------')
        #add_img(dc,'bill/data/INSTA.png')
        dc.TextOut(0,(i+6)*f, '-------------------------------------')
        
        dc.TextOut(0,(i+7)*f, '               Thankyou              ')
        dc.TextOut(0,(i+8)*f, '-------------------------------------')
        dc.TextOut(0,(i+9)*f, '-------------------------------------')
        dc.TextOut(0,(i+10)*f, '   No Exchange & No Return           ')
        dc.TextOut(0,(i+11)*f, '-------------------------------------')
        dc.TextOut(0,(i+12)*f, '-------------------------------------')
        for i in doc:
            print(i)
        dc.EndPage()
        dc.EndDoc()
        #time.sleep(1)
        # hdc = wui.CreateDC()
        # hdc.CreatePrinterDC()
    
        # hdc.StartDoc('')
    
        # add_img(hdc, "bill/data/INSTA.png")

    
        # hdc.EndDoc()
        
        # hdc.DeleteDC()
     



        customer_bz=bz

        filename = "bill/data/cutomer.csv"
        if ro[0] and ro[1] and ro[2] and ro[3]:
          with open (filename, "a") as f_object:

              
                      writer_object = writer(f_object)
                      writer_object.writerow(rows)
          
                      f_object.close()
        tota=0
        etota=0
        for i in totals:
                tota=tota+int(i)
        for i in etotals:
                etota=etota+int(i)
        
        r=[]
        
        if(etota==0):
          
          r=[bz,tota,"new","0"]
        else :
          
            r=[bz,tota,"exchange",etota]
        if int(tota)>=3000 and int(tota)<=8000:
          with open ("bill/data/vip.csv", "a") as f_object:
              writer_object = writer(f_object)
              writer_object.writerow([ e2.get(),e1.get().split(' ')[0]])
              f_object.close()
        elif int(tota)>8000 and int(tota)<=15000:
          with open ("bill/data/vvip.csv", "a") as f_object:
              writer_object = writer(f_object)
              writer_object.writerow([ e2.get(),e1.get(),e3.get(),e4.get()])
              f_object.close()
        elif int(tota)>15000:
          with open ("bill/data/vvvip.csv", "a") as f_object:
              writer_object = writer(f_object)
              writer_object.writerow([ e2.get(),e1.get(),e3.get(),e4.get()])
              f_object.close()
        ac=''
        ap=''
        for c in Codes:
          ac=ac + c + ','
        r.append(ac)
        for p in prices:
          ap=ap + p + ','
        #r.append(ap)
        r.append(var.get())

        da=date.today()
        #for generating bill
        filename ="bill/data/" + str(da)+".csv"
        
        decision=os.path.exists(filename)
        
        if(decision==False):
          file=open(filename)
      

        with open (filename, "a") as f_object:

                
                    writer_object = writer(f_object)
                    writer_object.writerow(r)
                    f_object.close()
        clear()
        rowss = []
      
      
        with open(filename, "r") as csvfile:
                        csvreader = csv.DictReader(csvfile)
                        
                        for row in csvreader:
                            rowss.append(row)
        da=date.today()
        
        filename ="bill/data/" + str(da)+".csv"
      
        decision=os.path.exists(filename)
        
        if(decision==False):
          file=open(filename)
        
        with open(filename, "r") as csvfile:
                        csvreader = csv.DictReader(csvfile)
                        
                        for row in csvreader:
                            b.append(row)
        
        

        bz=bz+1
        e5.delete(0,END)
        e5.insert(0,bz)
        Codes.clear()
        items.clear()
        prices.clear()
        quanditys.clear()
        totals.clear()
        eCodes.clear()
        eitems.clear()
        eprices.clear()
        equanditys.clear()
        etotals.clear()
        e4.config(state='normal')
        e3.config(state='normal')
        e2.config(state='normal')
        e1.config(state='normal')
        e1.focus()
        root1.unbind('<Key>')
        e1.bind('<Return>',getting_info)
        btns3.place_forget()
        btn5.place_forget()
        var.set('no')
        root1.unbind('<space>')
        print('inbbil;;;;;;;;;;;')
        
        cb(doc,q,t)

        
        
    def add():
        ##root1.unbind('<Key>')
         print('manual', e11.get())
         btns3.place(x=165,y=250)
        #try:
          
         if len(e11.get()) < 10 and len(e11.get()) > 1:   
          print('quanditys === ',quanditys)
          print('totals === ',totals)
          code=e11.get()
          quandity=1
          for i in rowss:
              if i["Code"]==code:
                  k=0
                  found=0
                  while(k<len(Codes)):
                      ##print("inwhile")
                      if Codes[k]==code:
                          ##print("inif")
                          found=1
                          quanditys[k]=int(quanditys[k])+int(quandity)
                          totals[k]=int(i["Rate"])*int(quanditys[k])
                      k=k+1
                  if found==0:
                      Codes.append(i["Code"])
                      items.append(i["Product"])
                      prices.append(i["Rate"])
                      quanditys.append(quandity)
                      totals.append(int(i["Rate"])*int(quandity))
                  break
          t1.delete(1.0,END)
          t1.insert(END,"code              item                   quantity                 rate                     total\n" )
          j=0
          ##print(j,len(items))
          while(j<len(items)):
              s=Codes[j] 
              i=0
              while i <= 17-len(Codes[j]):
                s=s+ " " 
                i=i+1
              i=0
              s=s+items[j]
              while(i<=22-len(items[j])):
                s=s+ " " 
                i=i+1
              
              i=0
              s=s+ str(quanditys[j]) 
              while(i<=24-len (str(quanditys[j])) ):
                s=s+ " "
                i=i+1 
              s=s+ str(prices[j])
              
              i=0

              while(i<=29-len(prices[j])-len(str(totals[j]))):
                s=s+ " " 
                i=i+1
              s=s+ str(totals[j]) + "\n"
              t1.insert(END, s)
              i=i+1
              
              j=j+1
              ##print("reached")
          to=0
          for i in totals:
                  to=to+int(i)
          t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )
          t1.insert(END,"                                                    TOTAL = "+ str(to)+"\n" )
          t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )
          e11.delete(0,END)
          middleframe2.pack_forget()
          middleframe.pack(side=RIGHT, fill=Y, padx=10, pady=10)
          root1.bind('<Key>',get_key)
          inc.clear()
        #except:
         # pass



    def take_input():
      root1.bind('<Key>', get_key)
    

    def get_key(event):
      #print(event.char,'2       take_input')
      inc.append(event.char)
      if event.char=="A":
          inc.clear()
          print('--------------------------------------called---------------------------------------------')
          print(inc,event.char)
          add_code()
          
      elif event.char=="R":
          remove_code()
          inc.clear()
      elif event.char=="!":
          Place_bill_buttonc()
          inc.clear()
      elif event.char=="@":
          Place_bill_buttonca()
          inc.clear()
      elif event.char=="#":
          Place_bill_buttono()
          inc.clear()
      elif event.char=='\r' and len(inc) >10 :
        print(inc)
        inc.pop()
        add_scan()
        inc.clear()
      


    def add_scan():
          print('scanner')
          btns3.place(x=200,y=250)
        #try:
          code=''
          
          for i in inc:
            code=code+i
          quandity=1
          print('quanditys === ',quanditys)
          print('totals === ',totals)
          for i in rowss:
              if i["Code"]==code:
                  k=0
                  found=0
                  while(k<len(Codes)):
                      ##print("inwhile")
                      if Codes[k]==code:
                          ##print("inif")
                          found=1
                          quanditys[k]=int(quanditys[k])+int(quandity)
                          totals[k]=int(i["Rate"])*int(quanditys[k])
                      k=k+1
                  if found==0:
                      Codes.append(i["Code"])
                      items.append(i["Product"])
                      prices.append(i["Rate"])
                      quanditys.append(quandity)
                      totals.append(int(i["Rate"])*int(quandity))
                  break
          
          t1.delete(1.0,END)
          t1.insert(END,"code              item                   quantity                 rate                     total\n" )
          j=0
          ##print(j,len(items))
          while(j<len(items)):
              s=Codes[j] 
              i=0
              while i <= 17-len(Codes[j]):
                s=s+ " " 
                i=i+1
              i=0
              s=s+items[j]
              while(i<=22-len(items[j])):
                s=s+ " " 
                i=i+1
              
              i=0
              s=s+ str(quanditys[j]) 
              while(i<=24-len (str(quanditys[j])) ):
                s=s+ " "
                i=i+1 
              s=s+ str(prices[j])
              
              i=0

              while(i<=29-len(prices[j])-len(str(totals[j]))):
                s=s+ " " 
                i=i+1
              s=s+ str(totals[j]) + "\n"
              t1.insert(END, s)
              i=i+1
              
              j=j+1
              ##print("reached")
          to=0
          for i in totals:
                  to=to+int(i)
          t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )
          t1.insert(END,"                                                    TOTAL = "+ str(to)+"\n" )
          t1.insert(END,"-------------------------------------------------------------------------------------------------\n\n" )
          e11.delete(0,END)
          root1.bind('<Key>', get_key)
          middleframe2.pack_forget()
          middleframe.pack(side=RIGHT, fill=Y, padx=10, pady=10)

        #except:

            #print('lskhadcbfndsaclk')
            #pass
        

    def callback(input):
      if input.isdigit():
        print(input)
        return True
                        
      elif input is "":
        print(input)
        return True

      else:
        print(input)
        return False   
    reg=root1.register(callback) 
    e1_str = StringVar()
    # top frame
    topframe = LabelFrame(root1, text="Customer Details", bg="gray63", font=("comicsansms", 12, "bold"), fg="yellow",
                          height="80", relief=SUNKEN, borderwidth=5)

    l1 = Label(topframe, text="Contact No.", bg="gray63", fg="black", font=("comicsansms", 12, "bold"),
               relief=FLAT).place(x=10, y=5)
    e1 = Entry(topframe, textvariable=e1_str,relief=SUNKEN, borderwidth=5)
    e1.place(x=100, y=3)
    e1.config(validate="key", validatecommand=(reg, '%P'))

    
    l2 = Label(topframe, text="Name", bg="gray63", fg="black", font=("comicsansms", 12, "bold"),
               relief=FLAT).place(x=400, y=5)
    e2 = Entry(topframe, relief=SUNKEN, borderwidth=5)
    e2.place(x=450, y=3)
    
    l3 = Label(topframe, text="City", bg="gray63", fg="black", font=("comicsansms", 12, "bold"),
               relief=FLAT).place(
        x=800, y=5)
    e3 = Entry(topframe, relief=SUNKEN, borderwidth=5)
    e3.place(x=840, y=3)
    
    # l4 = Label(topframe, text="State", bg="gray63", fg="black", font=("comicsansms", 12, "bold"),
    #            relief=FLAT).place(
    #     x=950, y=5)
    e4 = Entry(topframe, relief=SUNKEN, borderwidth=5)
    e4.insert(END,'NULL')
    #e4.place(x=1000, y=-1)

    l5 = Label(topframe, text="Bill No", bg="gray63", fg="black", font=("comicsansms", 12, "bold"),
               relief=FLAT).place(
        x=1200, y=5)
    e5 = Entry(topframe, relief=SUNKEN, borderwidth=5)
    e5.place(x=1260, y=3)
  
    e5.insert(0,bn[0])
  
   
    topframe.pack(side=TOP, fill=X, padx=10, pady=10)

  

    middleframe = LabelFrame(root1, text="", bg="gray63", fg="yellow", font=("comicsansms", 12, "bold"),
                            height="70", width="440", relief=SUNKEN, borderwidth=5)
    middleframe2 =LabelFrame(root1, text="", bg="gray63", fg="yellow", font=("comicsansms", 12, "bold"),
                            height="70", width="440", relief=SUNKEN, borderwidth=5)
    
    

  
    
    l28 = Label(middleframe2, text=" Code ", bg="gray63", fg="black", font=("comicsansms", 12, "bold"),
                    relief=FLAT).place(
            x=20, y=50)



        
##################################################################################################################################################################3
    s=0
    #e1_str=StringVar()
    font1=('Times',15,'bold') # font size and style 
    #l0=tk.Label(text='Autocomplete',font=font1) # adding label at top
    #l0.grid(row=0,column=1) 
    # data source list,
    data=read_csv('bill/data/rate.csv')
    data= data.dropna()
    def back():
        e11.delete(0,END)
        middleframe2.pack_forget()
        middleframe.pack(side=RIGHT, fill=Y, padx=10, pady=10)
        

    e11 = Entry(middleframe2,textvariable='0', relief=SUNKEN, borderwidth=5)
    e11.place(x=20, y=100)
    back =  Button(middleframe2, activebackground="black", activeforeground="white", text="Back",
                  font=("comicsansms", 12, "bold"), relief=SUNKEN, height=1, width=6, borderwidth=2,command=back)
    back.place(x=5,y=5)
    def my_upd(my_widget): # On selection of option 
      #   lcc1.place_forget()
      #  # btn3.place(x=100,y=300)
      #   my_w = my_widget.widget
      #   index = int(my_w.curselection()[0]) # position of selection
      #   value = my_w.get(index) # selected value 
      #   e11.insert(0,value)
      #   e1_str.set(value) # set value for string variable of Entry 
      #   lcc1.delete(0,END)     # Delete all elements of Listbox
        s=-1
        print(act,'fuck')
        if act[0] == 'add':
          add()
        elif act[0] == 'remove':
          remove()
        elif act[0] == 'exchange':
           exchange()
        elif act[0] == 'update':
           update()
        
    def my_down(my_widget): # down arrow is clicked 
        li1.focus()  # move focus to Listbox
        li1.selection_set(0) # select the first option 
        
    # e1_str=tk.StringVar()  # string variable   
    # e1=tk.Entry(my_w,textvariable=e1_str,font=font1) # entry    
    # e1.grid(row=1,column=1,padx=10,pady=0)
    # # listbox 
    li1 = Listbox(root1,height=15,width=20 ,font=font1,relief='flat',bg='white',highlightcolor= 'black')

    
   


    def key_pressed(event):
      if len(e11.get())==1:
        pass
        #l1.place(x=20,y=150)
       # btn3.place_forget()

     
      
    #l1.bind('<<ListboxSelect>>', my_udfdpd)

    # def get_detail(event):
    #  rows = [ e1.get(),e2.get(),e3.get(),e4.get()]
    #  if rows[0] and rows[1] and rows[2] and rows[3]:
     
    #   root1.unbind('<Return>')
    #   cntrframe3.pack(side=LEFT, fill=Y, padx=10, pady=10)
    #   middleframe.pack(side=RIGHT, fill=Y, padx=10, pady=10)
    #   take_input() 
      
    # root1.bind('<Return>',get_detail)
    #take_input() 
    middleframe.pack(side=RIGHT, fill=Y, padx=10, pady=10)
    
    
    def add_code():
      act.clear()
      act.append('add')
      common()
    def remove_code():
      act.clear()
      act.append('remove')
      common()
    def exchange_code():
      if len(totals)>0:
        act.clear()
        act.append('exchange')
        common()
    def update_code():
        act.clear()
        act.append('update')
        common()
        print('yess')
    def stash_code():
        act.clear()
        act.append('stash')
        common()
        print('yess')
        stash()
    def common():
      print('common')
      middleframe.pack_forget()
      middleframe2.pack(side=RIGHT, fill=Y, padx=10, pady=10)
      e11.delete(0,END)
      e11.focus()
      
      root1.unbind('<Key>')
      e11.bind('<Return>', my_upd)
      
       # down arrow key is pressed
      # l1.bind('<Right>', dfgmyhgv_upd) # right arrow key is pressed
      # l1.bind('<Return>', my_udfgpd)# return key is pressed 
      # e11.bind('<Key>',key_pressed)

        
  






############################################################################################################################################################################
    # e112 = Entry(middleframe, relief=SUNKEN, borderwidth=5)
    # e112.place(x=220, y=100)
    # e112.insert(1, 1)
    def Place_bill_buttonc():
         root1.bind('<space>',space_bill)
         inc.clear()
         var.set('Cash')
         btn5.place(x=100,y=525)
    
    def Place_bill_buttonca():
         root1.bind('<space>',space_bill)
         inc.clear()
         var.set('Card')
         btn5.place(x=100,y=525)
    def Place_bill_buttono():
         root1.bind('<space>',space_bill)
         inc.clear()
         var.set('Online')
         btn5.place(x=100,y=525)
    def call_update():
        update_file.update()

    btn2 = Button(middleframe, activebackground="black", activeforeground="white", text="Add",
                  font=("comicsansms", 12, "bold"), relief=SUNKEN, height=2, width=6, borderwidth=9,command=add_code)
   
    btn10 = Button(middleframe, activebackground="black", activeforeground="white", text="Remove",
                  font=("comicsansms", 12, "bold"), relief=SUNKEN, height=2, width=6, borderwidth=9,command=remove_code)
  
    btn3 = Button(middleframe, activebackground="black", activeforeground="white", text="exchange",
                  font=("comicsansms", 12, "bold"), relief=SUNKEN, height=2, width=12, borderwidth=9,command=exchange_code)
    btns3 = Button(middleframe, activebackground="black", activeforeground="white", text="Small bill",
                  font=("comicsansms", 12, "bold"), relief=SUNKEN, height=2, width=12, borderwidth=9,command=stash)
    btn33 = Button(middleframe, activebackground="black", activeforeground="white", text="update",
                  font=("comicsansms", 12, "bold"), relief=SUNKEN, height=2, width=12, borderwidth=9,command=call_update)
   
    btn4 = Button(middleframe, activebackground="black", activeforeground="white", text="Clear",
                  font=("comicsansms", 12, "bold"), relief=SUNKEN, height=2, width=6, borderwidth=9,command=clear)
                                                                                                           
    btn5 =  Button(middleframe, activebackground="black", activeforeground="white", text="Generate Bill",
                  font=("comicsansms", 12, "bold"), relief=SUNKEN, height=2, width=16, borderwidth=9,command=gen_bill)




    
    r1 = Radiobutton(middleframe, text='Cash', variable=var, value='Cash',command=Place_bill_buttonc)
    r1.place(x=50,y=450)
    r2 = Radiobutton(middleframe, text='Card', variable=var, value='Card',command=Place_bill_buttonca)
    r2.place(x=125,y=450)
    r3 = Radiobutton(middleframe, text='Online', variable=var, value='Online',command=Place_bill_buttono)
    r3.place(x=200,y=450)

    btn3.place(x=0,y=250)
    btn33.place(x=165,y=350)
    btn10.place(x=200,y=100)
    btn2.place(x=100,y=100)
    btn4.place(x=0,y=350)
    
    
   
   
   

   # middleframe.pack(side=RIGHT, fill=Y, padx=10, pady=10)

    cntrframe3 = LabelFrame(root1, text="Billing Area", height="70", width="900", bg="white", fg="BLACK",
                            font=("comicsansms", 20, "bold"), relief=SUNKEN, borderwidth=5)
    cntrframe3.pack(side=LEFT, fill=Y, padx=10, pady=10)
    sb1 = Scrollbar(cntrframe3)
    sb1.pack(side=LEFT, fill=Y)
    code_in=Entry(cntrframe3, relief=SUNKEN, borderwidth=5)
    code_in.focus_set()
    t1 = Text(cntrframe3, height=700, width=125, yscrollcommand=sb1.set)


    t1.pack(fill=Y, padx=6, pady=6)
    sb1.config(command=t1.yview)
   # cntrframe3.pack(side=LEFT, fill=Y, padx=10, pady=10)
    error = Label(topframe, text="number should be of 10 digit or 13", bg="white", fg="red", font=("comicsansms", 10, "bold",),
               relief=FLAT)
    def getting_info(an):
      
      print('yesssssssssss')
      # if e4.get():
      #   e4.unbind('<Return>')

        
      if e3.get():
        e3.unbind('<Return>')
        #e4.bind('<Return>',getting_info)
        e4.config(state='disabled')
        e3.config(state='disabled')
        e2.config(state='disabled')
        e1.config(state='disabled')
        e4.insert(END,'NULL')
        take_input()
      elif e2.get():
         e3.focus()
         e2.unbind('<Return>')
         e3.bind('<Return>',getting_info)
      elif e1.get():
        if len(e1.get()) == 10 or len(e1.get()) == 13:
            e2.focus()
            e1.unbind('<Return>')
            e2.bind('<Return>',getting_info)
            error.place_forget()
            print('correct')
            
        else :
            li1.place_forget()
            error.place(x=50, y=30)

    e1.focus()
    def get_data(*args): # populate the Listbox with matching options
      li1.place(x=0, y=0)
      search_str=e1.get() # user entered string
      li1.delete(0,END)     # Delete all elements of Listbox
      lenth=len(search_str)
      new_customer = True 
      for element in my_list:
        
          if(search_str == element[0][:lenth]):
              #print("in sea")
              li1.insert(END,element)#add matching options to Listbox
              new_customer = False
      if new_customer or (not search_str):
          e1.unbind('<Down>')
          li1.unbind('<Return>')
          e1.bind('<Return>', getting_info)
          li1.place_forget() # down arrow key is pressed
          print(new_customer)
      else:
          li1.place(x=200, y=1)
          e1.bind('<Down>', my_down)
          e1.unbind('<Return>')
          li1.bind('<Return>', my_updd)
          print(new_customer)

    def my_updd(my_widget): # On selection of option
      my_w = my_widget.widget
      print(my_w.curselection()[0])
      index = int(my_w.curselection()[0]) # position of selection
      value = my_w.get(index) # selected value
      e1_str.set(value) # set value for string variable of Entry
      print(value)
      li1.insert(END,value[0])
      e2.insert(END,value[1])
      e4.config(state='disabled')
      e3.config(state='disabled')
      e2.config(state='disabled')
      e1.config(state='disabled')
      take_input()
      li1.delete(0,END)
      li1.place_forget() 
      print('forgot')    # Delete all elements of Listbox
    def my_down(my_widget): # down arrow is clicked
      li1.focus()  # move focus to Listbox
      li1.selection_set(0) # select the first option
    # return key is pressed
    e1_str.trace('w',get_data)
    
        
    
    
    root1.mainloop()

import win32print
win32print.SetDefaultPrinter('POS80 Printer')
dddd='192.168.1.109'
## importing socket module
import socket
## getting the hostname by socket.gethostname() method
hostname = socket.gethostname()
## getting the IP address using socket.gethostbyname() method
dd = socket.gethostbyname(hostname)
#if str(dddd)==str(dd):

#main()
def login():

  root_login = Tk()
  root_login.minsize(1500,1500)
  root_login.maxsize(1500, 1500)
  root_login.configure(bg='black')
  root_login.title(businee_name)
  text_styles_title = {"font": ("Verdana", 30),
                       "background": "black",
                       "foreground": "white"}

  text_styles = {"font": ("Verdana", 14),
                       "background": "white",
                       "foreground": "black"}

  frame_login = Frame(root_login, bg="white", relief="groove", bd=2)  # this is the frame that holds all the login details and buttons
  frame_login.place(rely=0.13, relx=0.23, height=400, width=800)




  filename = 'bill/data/auth.txt'
  new_register = os.path.exists(filename) 

  def forgot_password():
    entry_user.place_forget()
    entry_pw.place_forget()
    label_pw.place_forget()
    label_user.place_forget()
    login_button.place_forget()
    forgot_password_button.place_forget()
    business_title.place_forget()
    business_title1 = Label(root_login, text_styles_title, text="Changeing Password")
    business_title1.place(rely=0.05, relx=0.40)





    label_userfg = Label(frame_login, text_styles, text="Security Key:")
    label_userfg.place(rely=0.30, relx=0.20)

    label_userfg = Label(frame_login, text_styles, text="Password:")
    label_userfg.place(rely=0.40, relx=0.20)

    label_userfg = Label(frame_login, text_styles, text="Confirm Password:")
    label_userfg.place(rely=0.50, relx=0.20)

    entry_key = Entry(frame_login, width=45, cursor="xterm", show="*",bg='black',fg='white')
    entry_key.place(rely=0.30, relx=0.50)
    entry_fg_pass = Entry(frame_login, width=45, cursor="xterm", show="*",bg='black',fg='white')
    entry_fg_pass.place(rely=0.40, relx=0.50)
    entry_fg_passc = Entry(frame_login, width=45, cursor="xterm", show="*",bg='black',fg='white')
    entry_fg_passc.place(rely=0.50, relx=0.50)

    def get_password_change():
        if str(entry_key.get()) in ['1234567890','qwertyuiop','dregcgjbhjkhgh','hj86gbiu8yhiuyjiu','87678yhyu87yu']:
            f =open(filename,'r')
            file_data = str(f.read()).split(':')
            if str(entry_fg_pass.get()) == (entry_fg_passc.get()):
              file_data = file_data[0] + ":" + str(entry_fg_pass.get())
              f = open(filename, "w")
              f.write(file_data)
              f.close()
              root_login.destroy()
              main()
            else :
              messagebox.showerror("Information", "Password not match")
        else:
             messagebox.showerror("Information", "Security Key not match")
            
    confirm_button = Button(frame_login, text="Forgot Password", command=lambda: get_password_change())
    confirm_button.place(rely=0.70, relx=0.40)

  def getlogin():
      f =open(filename,'r')
      file_data = str(f.read()).split(':')
      print(file_data)
      if  str(entry_user.get()) == file_data[0] and str(entry_pw.get()) == file_data[1] :
          root_login.destroy()
          main() 
      else:
           messagebox.showerror("Information", "The Username or Password you have entered are incorrect ")
  def get_signup():
        if str(entry_pw.get()) == (entry_pwc.get()):
          file_data = str(entry_user.get()) + ":" + str(entry_pw.get())
          f = open(filename, "a")
          f.write(file_data)
          f.close()
          main()
        else :
           messagebox.showerror("Information", "Password not match")
      



  label_user = Label(frame_login, text_styles, text="Username:")
  label_user.place(rely=0.30, relx=0.20)

  label_pw = Label(frame_login, text_styles, text="Password:")
  label_pw.place(rely=0.40, relx=0.20)

  entry_user = Entry(frame_login, width=45, cursor="xterm",bg='black' ,fg='white')
  entry_user.place(rely=0.30, relx=0.40)

  entry_pw = Entry(frame_login, width=45, cursor="xterm", show="*",bg='black',fg='white')
  entry_pw.place(rely=0.40, relx=0.40)

  if not new_register:
    label_pwc = Label(frame_login, text_styles, text="Confirm Password:")
    label_pwc.place(rely=0.50, relx=0.10)
    
    entry_pwc = Entry(frame_login, width=45, cursor="xterm", show="*",bg='black',fg='white')
    entry_pwc.place(rely=0.50, relx=0.40)

    signup_btn = Button(frame_login, text="Register", command=lambda: get_signup())
    signup_btn.place(rely=0.70, relx=0.75)

    business_title = Label(root_login, text_styles_title, text="Welcome, Please Sign Up")
    business_title.place(rely=0.05, relx=0.35)
  else:

    login_button = Button(frame_login, text="Login", command=lambda: getlogin())
    login_button.place(rely=0.70, relx=0.40)
    
    forgot_password_button = Button(frame_login, text="Forgot Password", command=lambda: forgot_password())
    forgot_password_button.place(rely=0.70, relx=0.60)

    business_title = Label(root_login, text_styles_title, text="Welcome, Please Login")
    business_title.place(rely=0.05, relx=0.35)



  root_login.mainloop()
login()





