/* eslint-disable no-unused-vars */
/* eslint-disable func-style */
async function liveStreamAddtoCart(productId, callback, liveId) {
  const clientSessionId = localStorage.getItem('client-session')
  const response = await window.addToBasket({
    'client-name': 'page-service',
    'client-version': '1.0.0',
    clientSessionId,
    addToBasketModel: {
      basketItemUtmDtos: [
        {
          campaign: liveId,
          medium: 'VendorName',
          source: 'Borolive',
        },
      ],
      productId,
    },
  })

  if (response?.data?.success) {
    callback({
      success: true,
      reason: '',
    })
  } else {
    callback({
      success: false,
      reason: response?.error?.data?.messages?.[0]?.message,
    })
  }
}

async function liveStreamRemoveFromCart(productId, callback) {
  const clientSessionId = localStorage.getItem('client-session')
  const response = await window.removeFromBasket({
    'client-name': 'page-service',
    'client-version': '1.0.0',
    clientSessionId,
    decreaseFromBasketModel: { productId },
  })
  if (response?.data?.success) {
    callback({
      success: true,
      reason: '',
    })
  } else {
    callback({
      success: false,
      reason: response?.error?.data?.messages?.[0]?.message,
    })
  }
}

function liveStreamGoToCheckout() {
  // Window.livesCloseVideo()

  // Go to your checkout page
  window.open('/basket/', '_blank')
}
