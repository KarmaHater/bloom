//= require dispatchers/blooming-dispatcher
//= require constants/blooming-constants

var PaymentActions = {
  createPaymentForm: function (data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CREATE_PAYMENT_FORM,
      data: data
    });
  },
  createAddonPaymentForm: function (data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CREATE_ADDON_PAYMENT_FORM,
      data: data
    });
  }
}
