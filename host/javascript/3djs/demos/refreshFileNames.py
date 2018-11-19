import os

basePath = os.path.dirname(os.path.abspath(__file__))
f = open(basePath + "fileNames.dat", "w")

for fileName in os.listdir(basePath):
    if fileName.endswith(".html"):
        f.write(fileName + "\n")
        print(fileName)
