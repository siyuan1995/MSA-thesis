import sys, json, numpy as np,pandas as pd
from geopy import distance
from scipy.misc import derivative
from numpy import diff

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def __repr__(self):
    return str(self.__dict__)

class CrimeEvent:
    def __init__(self,coordinates,index,time,weekday,crime_type):
        self.coordinates=coordinates
        self.index=index
        self.time=time
        self.crime_type=crime_type
        self.weekday=weekday
        self.clusterID = 0
        self.isVisited=False;

    def setVisited(self):
        self.isVisited = True

    def isVisited(self):
        return self.isVisited

    def getClusterID(self):
        return self.clusterID

    def getLongt(self):
        return self.longt

    def getLat(self):
        return self.lat

    def setClusterID(self, id):
        self.clusterID = id

def getData():
    data=read_in()
    crimelist=[]

    for line in data:
        coordinates=line.get('geometry').get('coordinates')
        index=line.get('properties').get('Index')
        time=line.get('properties').get('Time')
        weekday = line.get('properties').get('Weekday')
        crime_type = line.get('properties').get('Crime_type')
        crime_event=CrimeEvent(coordinates,index,time,weekday,crime_type)
        #crimelist.append(__repr__(crime_event))# this place use _repr_ instead of str makes the object become string. If you want to use repr() called by user difined \
        #class, you need to override the _repr_ method like the def _repr_ function listed above.
        crimelist.append(crime_event)

    return crimelist

def getDistance(p1,p2):
    point1=(p1.coordinates[1],p1.coordinates[0]);
    point2 = (p2.coordinates[1], p2.coordinates[0]);

    dis=distance.distance(point1,point2).km
    return dis

def CaculateKdis(data):
    pointslen=len(data)
    k_value_list=[]
    pointList=[[0 for ii in range(pointslen)] for jj in range(pointslen)]
    i = 0
    for p in data:
        for pp in data:
            if(pp.index!=p.index):
                dis=getDistance(p,pp);
                pointList[i].append(dis)
        i+=1

    for sublist in pointList:
        while 0 in sublist:
            sublist.remove(0)

        sublist.sort()
        k_value=sublist[3]
        k_value_list.append(k_value)

    k_value_list.sort()

    dx=range(len(k_value_list))
    dydx = diff(k_value_list) / diff(dx)

    maxdiff=max(dydx)
    maxIndex=0
    indexValue=0
    for imax in range(len(dydx)):
        if dydx[maxIndex]==maxdiff:
            indexValue=maxIndex
        maxIndex=maxIndex+1

    # print('dydx')
    # print(dydx[0])
    #
    # print ('maxdiff:')
    # print (maxdiff)
    #
    # print ('maxIndex:')
    # print (indexValue)

    eps=k_value_list[indexValue]

    return eps

def CaculateKtimes(data):
    pointslen = len(data)
    k_value_list = []
    pointList = [[0 for ii in range(pointslen)] for jj in range(pointslen)]
    i = 0
    for p in data:
        for pp in data:
            if (pp.index != p.index):
                dis = abs(p.time-pp.time)
                pointList[i].append(dis)
        i += 1

    for sublist in pointList:
        while 0 in sublist:
            sublist.remove(0)

        sublist.sort()
        k_value = sublist[3]
        k_value_list.append(k_value)

    k_value_list.sort()
    # print('time k_value_list:')
    # print(k_value_list)

    dx = range(len(k_value_list))
    dydx = diff(k_value_list) / diff(dx)

    maxdiff = max(dydx)
    maxIndex = 0
    indexValue = 0
    for imax in range(len(dydx)):
        if dydx[maxIndex] == maxdiff:
            indexValue = maxIndex
        maxIndex = maxIndex + 1
    eps_time = k_value_list[indexValue]
    # print('time maxIndexValue:')
    # print(eps_time)
    # print('index:')
    # print(indexValue)
    return eps_time

def getNeighbors(p, data,epsvalue):  # the first parameter of function in a class is self
    eps = epsvalue
    dataSet = []

    for i in range(0, len(data)):
        if getDistance(p, data[i]) <= eps:  # the function within same class can not be called by each other. you have to call by creating a class object
            dataSet.append(data[i])

    return dataSet

def Timedense(points):
    timelen=len(points);
    timeSum=0
    n=0
    for i in range(0,timelen-1):
        for ii in range(i+1,timelen-1):

            timeSum=timeSum+abs((points[i].time-points[ii].time))
            n=n+1

    score=timeSum/n

    return score

def mydbscan(): #初步猜测循环有问题,循环应该没问题，应该是neighbors出问题   直接把时间参数设成全部符合，就是只有空间维度，同理，若把位置参数设的全部符合，就是只有时间维度
    MinPoints = 4
    data = getData()
    eps = CaculateKdis(data)
    eps_time=CaculateKtimes(data)
    i = 0
    #C =[[] for jj in range(len(data))]
    C = [[] for jj in range(100)]
    Outliers=[]

    for p in data:

        try:

            if p.isVisited == False:

                p.setVisited()
                neighbors = getNeighbors(p, data,eps)

                if len(neighbors) >= MinPoints and Timedense(neighbors) <=6:  # this means this point is a core point

                    # p.setClusterID(i)
                    C[i].append(p)
                    for pp in neighbors:
                        if pp.isVisited == False:
                            pp.setVisited()
                            d = getNeighbors(pp, data,eps)
                            if (len(d) >= MinPoints and Timedense(d) <=6):  # if pp is corepoint
                                for dd in d:
                                    neighbors.append(dd)
                                # pp.setClusterID(i)
                                C[i].append(pp)
                            else:
                                pp.setClusterID(0)

                else:
                    p.setClusterID(0)
                    Outliers.append(p)

            i = i + 1
        except:
            print("Oops!", sys.exc_info()[0], "occured 2.")

    return C



def main():
    #get our data as an array from read_in()

    C=mydbscan()

    clustergroup=[]
    n=0

    for i in C:
        if(len(i)!=0):
            while 0 in i:
                i.remove(0)
            clustergroup.append(i)



    clusterIndexgroup =[[] for jj in range(100)]# change here

    for ii in clustergroup:
        for ele1 in ii:
            clusterIndexgroup[n].append(ele1.index)
        n=n+1

    for ele2 in clusterIndexgroup:
        # if len(ele2)!=0:# changes here
        #     while 0 in ele2:
        #         ele2.remove(0)
        if len(ele2)==0:
            clusterIndexgroup.remove(ele2);




    print (clusterIndexgroup)



    #return the sum to the output stream
    #print (lines[0].coordinates)
    # print (type(lines[0].get('properties')));# lines is a dict
    # print (len(lines));
    # print (lines[0].get('properties').get('Crime_type'));
#start process
if __name__ == '__main__':
    main()