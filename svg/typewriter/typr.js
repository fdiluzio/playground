function SvgTypewriter(selector) {

    this.letterList      = [].slice.call(document.querySelectorAll(selector), 0);
    this.count           = this.letterList.length;
    this.speed           = 150;
    this.nextLetterIndex = 0;

}

SvgTypewriter.prototype.nextLetter = function (index) {

    var me = this,
        nextLetter;

    if (this.nextLetterIndex < this.count) {
        nextLetter = this.letterList[this.nextLetterIndex++];
        window.setTimeout(function () {
            me.showLetter(nextLetter);
        }, (index * this.speed));
    }
};

SvgTypewriter.prototype.prevLetter = function (index) {

    var me = this,
        nextLetter;

    if (this.nextLetterIndex > 0) {
        nextLetter = this.letterList[--this.nextLetterIndex];

        window.setTimeout(function () {
            me.hideLetter(nextLetter);
        }, (index * this.speed));
    }

};


SvgTypewriter.prototype.showLetter = function (nextLetter) {
    //Velocity(nextLetter, { opacity: 1, scaleY:[1, 1.5]}, 1000);
    nextLetter.style.opacity = 1;
}

SvgTypewriter.prototype.hideLetter = function (nextLetter) {
    //Velocity(nextLetter, { opacity: 1, scaleY:[1, 1.5]}, 1000);
    nextLetter.style.opacity = 0;
}

SvgTypewriter.prototype.typeTo = function (lastIndex, callback) {

    var i, me = this;
    if (!lastIndex || lastIndex > this.count)
        lastIndex = this.count;


    for (i = 0; i < lastIndex; i++) {
        this.nextLetter(i);
    }

    if (typeof callback === 'function') {
        window.setTimeout(function () {
            callback(me.nextLetterIndex);
        }, (i * this.speed));
    }


};


SvgTypewriter.prototype.backSpace = function (length, callback) {

    var i, j = 0, me = this;

    if (!length || this.nextLetterIndex - length < 0) {
        length = this.nextLetterIndex;
    }

    for (i = length; i > 0; i--) {
        this.prevLetter(j++);
    }

    if (typeof callback === 'function') {
        window.setTimeout(function () {
            callback(me.nextLetterIndex);
        }, (length * this.speed));
    }

}


