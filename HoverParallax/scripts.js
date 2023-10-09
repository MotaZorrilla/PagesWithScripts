document.addEventListener('mousemove', function (e) {
    var wx = window.innerWidth;
    var wy = window.innerHeight;

    // Calcula el centro de la pantalla
    var centerX = wx / 2;
    var centerY = wy / 2;

    // Calcula las coordenadas ajustadas al centro
    var x = e.pageX - window.scrollX - centerX;
    var y = e.pageY - window.scrollY - centerY;

    // Calcula las coordenadas en grados
    var xdeg = 50 * (x) / (centerX);
    var ydeg = 50 * (y) / (centerY);

    document.querySelectorAll('#wrapper .p1, #wrapper .p2, #wrapper .p3, #wrapper .letra').forEach(function (element) {
        var speed = parseFloat(element.getAttribute('data-speed')) || 0;
        element.style.transform = 'translate(' + (1 - x * speed) + 'px, ' + (1 - y * speed) + 'px)';
    });

    // Obtener el ancho y alto del wrapper
    var wrapper = document.getElementById('wrapper');  // Asegúrate de tener un id en tu elemento wrapper
    var wrapperX = wrapper.offsetWidth;
    var wrapperY = wrapper.offsetHeight;

    // Verifica si el ratón está cerca de los bordes del contenedor (20 píxeles de margen)
    var margin = 20;
    var nearWrapperX = Math.abs(x) < (wrapperX / 2) + margin;
    var nearWrapperY = Math.abs(y) < (wrapperY / 2) + margin;

    // Si está lejos de los bordes del wrapper, no aplicar transformaciones
    if (nearWrapperX && nearWrapperY) {
        document.querySelectorAll('#container').forEach(function (element) {
            var speed = parseFloat(element.getAttribute('data-speed')) || 0;
            element.style.transform = 'perspective(1000px) scale(1.15) rotateX(' + -ydeg + 'deg) rotateY(' + xdeg + 'deg)';
            element.style.transition = `transform 0.1s ease-out`;
        });
    } else {
        document.querySelectorAll('#container').forEach(function (element) {
            var speed = parseFloat(element.getAttribute('data-speed')) || 0;
            element.style.transform = 'perspective(1000px) rotateX(' + 0 + 'deg) rotateY(' + 0 + 'deg)';
            element.style.transition = `transform 0.5s ease-out`;
        });
    }
});