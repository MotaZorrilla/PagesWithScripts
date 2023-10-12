document.addEventListener('mousemove', function (e) {
    var wx = window.innerWidth;
    var wy = window.innerHeight;

    // Calcula el centro de la pantalla
    var centerX = wx / 2;
    var centerY = wy / 2;

    // Calcula las coordenadas ajustadas al centro
    var x = e.pageX - window.scrollX - centerX;
    var y = e.pageY - window.scrollY - centerY;

    var newx = x - wx;
    var newy = y - wy;

    // Calcula las coordenadas en grados
    var xdeg = 20 * (x) / (centerX);
    var ydeg = 50 * (y) / (centerY);

    // Obtener el ancho y alto del wrapper
    var wrapper = document.getElementById('wrapper');
    var wrapperX = wrapper.offsetWidth;
    var wrapperY = wrapper.offsetHeight;

    // Verifica si el ratón está cerca de los bordes del contenedor (20 píxeles de margen)
    var margin = 20;
    var nearWrapperX = Math.abs(x) < (wrapperX / 2) + margin;
    var nearWrapperY = Math.abs(y) < (wrapperY / 2) + margin;

    document.querySelectorAll('#wrapper .p1, #wrapper .p2, #wrapper .p3, #wrapper .letra').forEach(function (element) {
        var speed = parseFloat(element.getAttribute('data-speed')) || 0;
        element.style.transform = 'translate(' + (1 - newx * speed) + 'px, ' + (1 - newy * speed) + 'px)';
    });

    document.querySelectorAll('#container').forEach(function (element) {
        var speed = parseFloat(element.getAttribute('data-speed')) || 0;
        var transitionTime = '0.3s'; // Ajusta la duración de la transición según sea necesario
        element.style.transition = `transform ${transitionTime} ease-out`;

        // Aplica transformaciones solo si está cerca del borde del wrapper
        if (nearWrapperX && nearWrapperY) {
            element.style.transform = 'perspective(1000px) rotateX(' + -ydeg + 'deg) rotateY(' + xdeg + 'deg)';
            document.querySelectorAll('#wrapper').forEach(function (element) {
                element.style.transform = 'translate('+'-50%, -50%) scale(1.1)';
                element.style['box-shadow'] = ' 0px 0px 10px 10px rgba(0, 0, 0, 0.5)';
                element.style.transition = `0.3s ease-out`;
            });
        } else {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            document.querySelectorAll('#wrapper').forEach(function (element) {
                element.style.transform = 'translate('+'-50%, -50%) scale(1)';
                element.style['box-shadow'] = ' 0px 0px 0px 0px rgba(0, 0, 0, 0)';
                element.style.transition = `0.3s ease-out`;
            });
        }
    });
});

