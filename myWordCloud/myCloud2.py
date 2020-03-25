
from wordcloud import WordCloud

import matplotlib.pyplot as plt

def myCloud2(data):

    # lower max_font_size
    wordcloud = WordCloud(max_font_size=40).generate(data)
    image = wordcloud.to_image()
    return image

    
    
