from PIL import Image
photo = Image.open('./resources/house.jpg')
photo = photo.convert('RGB')

width = photo.size[0] #define Width and Height
height = photo.size[1]

for y in range(0, height): #each pixel has coordinates
    row = ""
    for x in range(0, width):

        RGB = photo.getpixel((x,y))
        R,G,B = RGB  #now you can use the RGB value