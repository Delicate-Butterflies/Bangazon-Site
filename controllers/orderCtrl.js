'use strict';

const passport = require('passport');

module.exports.getOpenOrder = (req, res, next) => {
  const { Order, Product } = req.app.get('models');
  let activeUserId = req.session.passport.user.id;
  Order.findAll({
    include: [{ model: Product }],
    where: { customerUserId: activeUserId, paymentTypeId: null }
  }).then(data => {
    // res.json(data);
    let products = data[0].Products;
    res.render('cart', { products });
  });
};
