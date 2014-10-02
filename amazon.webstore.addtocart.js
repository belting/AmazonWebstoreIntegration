/*
* Amazon Webstore Add-To-Cart Script v1.0.0
*
* For use with Shoppost. Originally developed by 
* Tony Schuler, Webstore Architect
*/

(function() {
    'use strict';

    function getParameterByName(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
            results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    function onAddedToCart() {
        window.location.href = '/cart';
    }

    function readCookie(cookieName) {
        var theCookie = '' + document.cookie;
        var ind = theCookie.indexOf(cookieName);
        if (ind == -1 || cookieName === '') return '';
        var ind1 = theCookie.indexOf(';', ind);
        if (ind1 == -1) ind1 = theCookie.length;
        return unescape(theCookie.substring(ind + cookieName.length + 1, ind1));
    }

    var sku = getParameterByName('sku'),
        merchantId = getParameterByName('merchantId'),
        sessionId = readCookie('session-id'),
        xmlData = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><c:cartItems xmlns:c="http://webstore.amazon.com/API"><c:cartItem><c:product><c:identifiers><c:merchantSKU><c:merchantID>' + merchantId + '</c:merchantID><c:sku>' + sku + '</c:sku></c:merchantSKU></c:identifiers></c:product><c:quantity>1</c:quantity></c:cartItem></c:cartItems>';

    jQuery.ajax({
        type: 'POST',
        url: '/api/cart/' + sessionId + '/items',
        data: xmlData,
        dataType: 'xml',
        success: onAddedToCart
    });
})();
