const wordCloud2 = require("../lib/wordcloud2/src/wordcloud2.js");
const reader = require("./reader.js");

var cloud; 

function myCloud(xml){

    reader.xmlToCloud(xml);

    //Création du nuage de mot
    cloud = wordCloud2.WordCloud(document.getElementById('myCloud'), 
        {list: cloudTab,
        gridSize: 5,
        shape: "square",
        backgroundColor: '#ffe0e0',
        color: function (word, weight) {
        return (weight === 12) ? '#f02222' : '#c09292';
        },
    });

    return cloud;
}