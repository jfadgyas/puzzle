export const orders = [
  {
    _id: 'o1',
    created: 1719593017,
    checkout_id: 'cs_test_a1G7uyPINrNi5qSvMNwHDqoKzjJ2niRaPdCXCgaqlHBRDf0wyJ7u8phdWi',
    total: 1500,
    currency: 'eur',
    paymentIntent: 'pi_3PWhvkLbUtSArnvU1AhPFFv9',
    isRefunded: false,
    shipping: {
      address: {
        city: 'Amsterdam',
        country: 'NL',
        line1: 'Koenenkade',
        line2: null,
        postal_code: '1182 DB',
        state: null
      },
      name: 'j test'
    },
    status: 'paid',
    products: [ { product: '3', qty: 1 } ]
  },
  {
    _id: 'o2',
    created: 1719594548,
    checkout_id: 'cs_test_b1YoG0dhKT6EduwXGUSZkVEaSMEq3LMyOGjb7OI0HzOplcl2eQEBG0NpmU',
    total: 3000,
    currency: 'eur',
    paymentIntent: 'pi_3PWiIfLbUtSArnvU3i2d4rIq',
    isRefunded: false,
    shipping: {
      address: {
        city: 'Amsterdam',
        country: 'NL',
        line1: 'Koenenkade',
        line2: null,
        postal_code: '1182 DB',
        state: null
      },
      name: 'j test'
    },
    status: 'paid',
    products: [ { product: '3', qty: 1 }, { product: '1', qty: 1 } ]        
  },

  // Ez a final schema
  {
    _id: 'o3',
    created: 1720533642,
    checkout_id: 'cs_test_a1M6pHCDWjRsIIyut8uSxjJmzmAYtDeOgJMC8GgEp9NHnz9j64lRMaifjg',
    total: 1940,
    currency: 'eur',
    paymentIntent: 'pi_3PaebXLbUtSArnvU3zYpsE0d',
    isRefunded: false,
    status: 'paid',
    products: [ { product: '8', qty: 1 } ]
  }
]


const itemsSchema = new mongoose.Schema({
  product: {
    type: mongoose.ObjectId,
    required: true
  },
  qty: {
    type: Number,
    required: true
  }
})

const orderSchema = new mongoose.Schema({
  created: {
    type: Number,
    required: true
  },
  checkout_id: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  paymentIntent: {
    type: String,
    required: true
  },
  isRefunded: {
    type: Boolean,
    required: false
  },
  status: {
    type: String, // vagy number code?
    required: true
  },
  products: {
    items: [itemsSchema]
  }
})

export default mongoose.models.Orders || mongoose.model('Orders', orderSchema)