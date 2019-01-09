class fileHelper {
    static readTextFile(file) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    alert(allText);
                }
            }
        }
        rawFile.send(null);
    }

    static jsonFromFile(file) {
        var text = fileHelper.readTextFile(file);
        var result = JSON.parse(text);
        return result;
    }
}

