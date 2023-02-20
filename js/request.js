const request = config => {

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
        if (this.status >= 200 && this.status < 300) {
            config.success(this.responseText);
        } else {
            config.error(this.status);
        }
    });

    xhr.addEventListener('error', () => {
        config.error('No intrtnet');
    });

    xhr.addEventListener('timeout', () => {
        config.error('Timeout');
    });

    xhr.open(config.method, config.url);
    xhr.send();
};