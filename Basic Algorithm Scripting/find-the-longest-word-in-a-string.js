function findLongestWord(str) {
    var maxLength = 0;
    var arr = str.split(' ');
    for (var i = 0; i < arr.length; i++) {
        maxLength = Math.max(maxLength, arr[i].length);
    }

    return maxLength;
}

var maxLength = findLongestWord("The quick brown fox jumped over the lazy dog");
console.log(maxLength);