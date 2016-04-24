/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        listar();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        
    }
};

function listar() {
    var estabelecimento_id = localStorage.estabelecimento_id;
    $.mobile.loading("show");
	$.get(localStorage.servidor + "/vencidos.json?estabelecimento_id=" + estabelecimento_id).done(function (msg) {
        var listview = $('#listview');
        var popup = $('#popup');
        var maxHeight = $( window ).height() - 60 + "px";
        popup.empty();
        listview.empty();
        if (msg.length == 0) {
            $("#nenhumvencido").show();
        } else {
            $("#nenhumvencido").hide();
            for (var i = 0; i < msg.length; i++) {
                var ano = msg[i].dataVencimento.substr(0, 4);
                var mes = msg[i].dataVencimento.substr(5, 2);
                var dia = msg[i].dataVencimento.substr(8, 2);
                var novoproduto = 
                    '<li produto="' + msg[i].id + '" >' +
                        '<a href="#popupProduto' + msg[i].id + '" data-rel="popup" data-position-to="window">' +
                            '<img src="data:image/jpeg;base64,' + msg[i].imagem + '" />' +
                            '<p>Data de Validade: </p>' +
                            '<h4>' + dia + '/' + mes + '/' + ano + '</h4>' +
                        '</a>' +
                        '<a href="#" onclick="remover(event)">Remover produto</a>' +
                    '</li>';
    		    listview.append(novoproduto);

                var popupproduto = 
                '<div data-role="popup" id="popupProduto' + msg[i].id + '" class="photopopup" data-overlay-theme="b" data-theme="b" data-corners="false">' +
                    '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Fechar</a>' + 
                    '<img src="data:image/jpeg;base64,' + msg[i].imagem + '" style="max-height:'+ maxHeight +'"/>' +
                '</div>';
                popup.after(popupproduto);

                $("#popupProduto" + msg[i].id ).enhanceWithin().popup();

            }
        }
		listview.listview('refresh');
        $.mobile.loading("hide");
    });
};

function remover(e) {
    e.preventDefault();
    if (confirm('O produto será removido da base de dados. Confirma remoção do produto?')) {
        var idProduto = e.target.parentElement.getAttribute('produto');
        var elem = e.target.parentElement;
        elem.parentNode.removeChild(elem);
        $.ajax({
            url: localStorage.servidor + '/vencimentos/' + idProduto + '.json',
            type: 'DELETE',
            success: function(result) {
                alert('Produto removido com sucesso.');
                window.location.href='index.html';
            },
            fail: function(result) {
                alert('Ocorreu um erro ao excluir o produto. Tente novamente');
            }
        });
    } else {

    }
}
    
    