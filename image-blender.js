$(function(){
    function newFilledArray(len, val) {
        var rv = new Array(len);
        while (--len >= 0) {
            rv[len] = val;
        }
        return rv;
    }
    var extend = function(obj, extObj) {
        if (arguments.length > 2) {
            for (var a = 1; a < arguments.length; a++) {
                extend(obj, arguments[a]);
            }
        } else {
            for (var i in extObj) {
                obj[i] = extObj[i];
            }
        }
        return obj;
    };

    ImageBlender = function() {
        var canvas, context, matrix, width, height, pixels, img, imgData, count = 0,
            isRunning = false,
            queue = [];
        var options = {
          doRender: true,
          sleepTime: 100,
          canvas: null
        };

        return {
            init: function(_options) {
                options = extend(options, _options);
            },
            process: function(img) {
                if (!options.canvas) {
                    alert('canvas not initialized');
                    return;
                }
                if (count === 0) {
                    context = options.canvas.getContext("2d");
                    width = img.width;
                    height = img.height;
                    options.canvas.width = width;
                    options.canvas.height = height;
                    pixels = 4 * width * height;
                    matrix = newFilledArray(pixels, 0);
                }
                count++;
                context.drawImage(img, 0, 0, width, height);
                imgData = context.getImageData(0, 0, width, height);
                var i = pixels;
                while (i--) {
                    matrix[i] += imgData.data[i];
                }
                if (options.doRender) {
                  ImageBlender.render();
                }
                if (options.sleepTime > 0) {
                  setTimeout(function() { ImageBlender.done(img); }, options.sleepTime);
                } else {
                  ImageBlender.done(img);
                }
            },
            render: function() {
                var i = pixels;
                while (i--) {
                  imgData.data[i] = matrix[i] / count;
                }
                context.putImageData(imgData, 0, 0);
            },
            call: function(object) {
                if (isRunning) {
                    queue.push(object);
                } else {
                    isRunning = true;
                    ImageBlender.process(object);
                }
            },
            done: function(img) {
                isRunning = false;
                if (img.fn) {
                    img.fn();
                }
                if (queue.length > 0) {
                    ImageBlender.call(queue.shift());
                } else {
                  ImageBlender.render();
                }
            }
        };
    }();
});