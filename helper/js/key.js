function get_key() {
    var timestamp = new Date().getTime();
    var random = Math.random();
    return timestamp + '_' + random;
}