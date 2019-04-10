function debounce(fn, delay) {
    var timer = null;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(function(){
            fn.call(this);
        },delay);
    }
}