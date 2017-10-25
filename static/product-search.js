'use strict';

$('.search-products-btn').on('click', function (e) {
  e.preventDefault();
  var searchInput = $('.product-search-input').val();
  let queryStringAction = `/products?title=${searchInput}`;
  window.location.href = queryStringAction;
});