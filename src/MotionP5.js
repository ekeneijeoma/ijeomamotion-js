(function(MOTION, undefined) {
    REVISION = '1';

    p5.prototype.registerMethod('pre', function() {
        for (var i = 0; i < motions.length; i++)
            if (motions[i].isAutoUpdating())
                motions[i].update()
    });

    p5.prototype.createMotion = function(duration, delay, easing) {
        return new MOTION(duration, delay, easing);
    };

    p5.prototype.createTween = function(object, property, end, duration, delay, easing) {
        return new MOTION.Tween(object, property, end, duration, delay, easing);
    };

    p5.prototype.createParallel = function(children) {
        return new MOTION.Parallel(children);
    };

    p5.prototype.createSequence = function(children) {
        return new MOTION.Sequence(children);
    };

    p5.prototype.createTimeline = function(children) {
        return new MOTION.Timeline(children);
    };

    p5.prototype.tween = function(object, property, end, duration, delay, easing) {
        t = new MOTION.Tween(object, property, end, duration, delay, easing)

        if (currentParallel)
            currentParallel.add(t)
        else if (currentSequence)
            currentSequence.add(t)

        return t;
    };

    p5.prototype.play = function(m) {
        m.play();
    };

    p5.prototype.stop = function(m) {
        m.stop();
    };

    p5.prototype.pause = function(m) {
        m.pause();
    };

    p5.prototype.resume = function(m) {
        m.resume();
    };

    p5.prototype.seek = function(m, t) {
        m.seek(t);
    };

    currentSequence = null;

    p5.prototype.beginSequence = function(name) {
        currentSequence = new MOTION.Sequence().setName(name);
        return currentSequence;
    }

    p5.prototype.endSequence = function() {
        currentSequence.updateTweens();
        currentSequence = null
    }

    currentParallel = null;

    p5.prototype.beginParallel = function(name) {
        currentParallel = new MOTION.Parallel().setName(name);;
        return currentParallel;
    }

    p5.prototype.endParallel = function() {
        currentParallel.updateTweens();
        currentParallel = null
    }

    MOTION.timeMode = MOTION.FRAMES;

    MOTION.prototype.resume = function() {
        this._isPlaying = true;

        this._playTime = (MOTION.timeMode == MOTION.SECONDS) ? (millis() - this._playTime * 1000) : (frameCount - this._playTime);

        return this;
    };

    MOTION.prototype.updateTime = function() {
        this._time = ((MOTION.timeMode == MOTION.SECONDS) ? ((millis() - this._playTime) / 1000) : (frameCount - this._playTime)) * this._timeScale;

        if (this._isReversing && this._reverseTime != 0)
            this._time = this._reverseTime - this._time;
    };

    MOTION.ColorProperty = function(object, field, end) {
        MOTION.Property.call(this, object, field, end)
    };

    MOTION.ColorProperty.prototype = Object.create(MOTION.Property.prototype);
    MOTION.ColorProperty.prototype.constrctor = MOTION.ColorProperty

    MOTION.ColorProperty.prototype.update = function(position) {
        this._position = position;
        this._object[this._field] = lerpColor(this._begin, this._end, this._position);
    };

    MOTION.VectorProperty = function(object, field, end) {
        MOTION.Property.call(this, object, field, end) 
        this._value = this._begin.get();
    };

    MOTION.VectorProperty.prototype = Object.create(MOTION.Property.prototype);
    MOTION.VectorProperty.prototype.constrctor = MOTION.VectorProperty

    MOTION.VectorProperty.prototype.update = function(position) {
        this._position = position;
        // this._object[this._field].set(
        //     lerp(this._begin.x, this._end.x, this._position),
        //     lerp(this._begin.y, this._end.y, this._position),
        //     lerp(this._begin.z, this._end.z, this._position))
        this._object[this._field].set(this._value.lerp(this._end, this._position));

    };

     MOTION.VectorProperty.prototype.setBegin = function(begin) {
        if (begin)
            this._begin = begin;
        else
            this._begin = (typeof this._object[this._field] == "undefined") ? 0 : this._object[this._field];

        this._value = this._begin.get();
    };


    MOTION.Tween.prototype.addProperty = function(object, property, end) {
        var p;

        if (typeof arguments[0] == 'string') {
            var v = this._object[arguments[0]]

            if (typeof v == 'number')
                p = new MOTION.NumberProperty(this._object, arguments[0], arguments[1]);
            else if (v instanceof p5.Color)
                p = new MOTION.ColorProperty(this._object, arguments[0], arguments[1]);
            else if (v instanceof p5.Vector)
                p = new MOTION.VectorProperty(this._object, arguments[0], arguments[1]);
            else
                console.warn('Only numbers, p5.colors and p5.vectors are supported.');
        } else {
            var v = object[property]

            if (typeof v == 'number')
                p = new MOTION.NumberProperty(object, property, end);
            else if (v instanceof p5.Color)
                p = new MOTION.ColorProperty(object, property, end);
            else if (v instanceof p5.Vector)
                p = new MOTION.VectorProperty(object, property, end);
            else
                console.warn('Only numbers, p5.colors and p5.vectors are supported.');
        }

        this._properties.push(p);

        if (p.getName())
            this._propertyMap[p.getName()] = p;

        return this;
    };

    MOTION.Tween.prototype.add = MOTION.Tween.prototype.addProperty;
})(MOTION);