/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Imprime un recibo a partir de un dueño
 * @returns {undefined}
 */
function printRecibo() {

    var doc = jsPDF('p', 'mm', [50, 70]);
    doc.addFont('Times', 'Arial', 'normal');

    doc.setFont('Times');
    doc.setFontSize(10);
    //doc.setFont("mp-b");
    doc.text(7, 10, 'Recibo de Relaciones');
    doc.setFontSize(5);
    doc.text(6, 18, 'En cada actividad del día usted ha ignorado');
    doc.text(6, 20, 'las diferentes interacciones que ha tenido con ');
    doc.text(6, 22, 'las personas a su alrededor, este reciboes una ');
    doc.text(6, 24, 'constancia de esas relaciones olvidadas.');

    //doc.addFont(urlcanonical + '/fonts//glyphicons-halflings-regular.ttf', 'gly', 'normal');
    //doc.setFont('gly');

//doc.text(50, 50, 'Now this is Calibri');

    doc.setProperties({
        title: 'El recibo de ' + dueno,
        subject: 'Constancia de relación',
        author: dueno,
        keywords: 'atlas',
        creator: 'polachoworks'
    });

    doc.text(16, 28, 'Relaciones');

    var actividad = $("#actividadNode").val();
    var dueno = $("#duenoNode").val();
    var lugar = $("#lugarNode").val();
    var date = moment().format('D MMM, YYYY, hmmss');

    var text = "";
    var i = 0;

    var x = 10;
    var y = 34;

    $('.person').each(function () {
        doc.setFillColor(255, 0, 0);
        doc.circle(x, y, 2, 'FD'); //filled red circle with black border 
        x += 10;
        doc.text(x, y, $('#nombre_' + i).val());
        i++;

        x = 10;
        y += 6;


    });


    doc.text(12, 63, 'GRACIAS VUELVA PRONTO');


    doc.save(dueno + "_" + date + '.pdf');
}

API.addFont = function (fontScript, font, style) {
    addFont(fontScript, font, style, 'StandardEncoding');
};