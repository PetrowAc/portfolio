function openModal() {
    var modalHtml =''+
    '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
        '<div class="modal-dialog">'+
            '<div class="modal-content">'+
                '<div class="modal-header">'+
                    '<h4 class="modal-title"></h4>'+
                '</div>'+
                '<div class="modal-body">'+
                    '<p></p>'+
                '</div>'+
                '<div class="modal-footer">'+
                    '<button type="button" class="btn btn-primary js-close-modal" data-dismiss="modal">OK</button>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>';
    $('body').append(modalHtml);
}

$('.js-tax-check').on("click", function() {
    if ($('.js-tax-check').is(':checked')) {
        $('.js-tax-input').prop('disabled', true);
    }else {
        $('.js-tax-input').prop('disabled', false);
    }
});

$(".js-datepicker").datepicker({
    dateFormat: 'yy-mm-dd',
    //maxDate: '0', //-- Egyszerűbb lenne simán nem engedélyezni jövőbeli dátumot.
    onSelect: function(dateText) {
        var today = new Date();
        var dd = String(today. getDate()). padStart(2, '0');
        var mm = String(today. getMonth() + 1). padStart(2, '0');
        var yyyy = today. getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        if (dateText>today) {
            openModal();
            $(this).addClass('input--error');
            $('.js-save').prop('disabled', true);

            var myModal = $("#myModal");
            myModal.find('.modal-title').html('Dátum hiba');
            myModal.find('.modal-body').html('A megadott dátum nem helyes!');
            myModal.modal('show');

            $('.js-close-modal').on("click", function() {
                myModal.modal("hide");
                myModal.remove();
            });

        }else {
            $(this).removeClass('input--error');
            $('.js-save').prop('disabled', false);
        }
    }
});

$(".js-form").submit(function(e){
    e.preventDefault();
    if ($("#taxpercentage").prop('disabled')) {
        var taxPercentage = 27;
    }else {
        var taxPercentage = $('#taxpercentage').val();
        var lastChar = taxPercentage.substr(taxPercentage.length - 1);

        if(lastChar == "%"){
            taxPercentage = taxPercentage.substring(0, taxPercentage.length-1);
        }
    }

    var email = $('#email').val();
    var payDate = $('#datepicker').val();
    var taxprice = $('#price').val();
    var price = taxprice / ("1."+taxPercentage);
    var tax = (price * parseFloat(taxPercentage+"%")) / 100;

    openModal();
    var myModal = $("#myModal");
    myModal.find('.modal-title').html('Adatok');
    myModal.find('.modal-body').html('Email cím: '+email+'<br/>Fizetés dátuma: '+payDate+'<br/>Fizetés bruttó összege: '+taxprice+'<br/>Fizetés nettó összege: '+price.toFixed(2)+'<br/>Adószázalék: '+taxPercentage+'% <br/>Adó értéke: '+tax.toFixed(2));
    myModal.find('.modal-footer .js-close-modal').html('Mégsem');
    myModal.find('.modal-footer .js-close-modal').before('<button type="button" class="btn btn-primary js-clear-form">OK</button>');
    myModal.modal('show');
    
    $('.js-close-modal').on("click", function() {
        myModal.modal("hide");
        myModal.remove();
    });
    $('.js-clear-form').on("click", function() {
        myModal.modal("hide");
        myModal.remove();
        $('.js-form').find('input').not('.js-datepicker').val("");
    });
});

$(".js-form-table").submit(function(e){
    e.preventDefault();
    $('.content__table').empty();

    var tablenumber = $('#tablenumber').val();
    var maxTableNumber = tablenumber * tablenumber;
    var counter = 1;
    var column = 0;
    var row = 0;
    var forIndex = tablenumber-1;
    var rowHtml;

    $('.content__table').append('<table class="table"></table>');
    for(var cH=0; cH<tablenumber; cH++) {
        rowHtml = "";
        for(var rH=0; rH<tablenumber; rH++) {
            rowHtml += '<td id="'+rH+'"></td>';
        }
        $('.table').append('<tr id="'+cH+'">'+rowHtml+'</tr>');
    }

    while (counter<maxTableNumber) {
        for (var r=0; r < forIndex; r++) {
            $('.table').find('tr#'+column+' td#'+row).append(counter);
            row++;
            counter++;
        }
        for (var c=0; c < forIndex; c++) {
            $('.table').find('tr#'+column+' td#'+row).append(counter);
            column++;
            counter++;
        }
        for (var r=0; r < forIndex; r++) {
            $('.table').find('tr#'+column+' td#'+row).append(counter);
            row--;
            counter++;
        }
        for (var c=0; c < forIndex; c++) {
            $('.table').find('tr#'+column+' td#'+row).append(counter);
            column--;
            counter++;
        }
        column++;
        row++;
        forIndex = forIndex-2;

        if(forIndex==0) {
            $('.table').find('tr#'+column+' td#'+row).append(counter);
        } 
    }
});
