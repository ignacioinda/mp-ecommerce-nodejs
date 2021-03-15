const btnPayment = document.getElementById('checkout');

let preference = {
    items: [
      {
        id: 1234,
        title: document.getElementById('title').innerHTML,
        description: 'Dispositivo móvil de Tienda e-commerce',
        picture_url: document.getElementById('image').src,
        quantity: 1,
        currency_id : 'ARS',
        unit_price: parseFloat(document.getElementById('price').innerHTML),
      }
    ],
    payer: {
        name: 'Lalo',
        surname: 'Landa',
        email: 'test_user_63274575@testuser.com',
        phone: {
            area_code: '11',
            number: 22223333
        },
        address: {
            street_name: "False",
            street_number: 123,
            zip_code: '1111'
        }
    },
    back_urls: {
        success: 'https://mpmercadolibre.herokuapp.com/success',
        failure: 'https://mpmercadolibre.herokuapp.com/failure',
        pending: 'https://mpmercadolibre.herokuapp.com/pending'
    },
    auto_return: 'approved',
    payment_methods: {
        excluded_payment_methods: [
            {
                id: 'amex'
            }
        ],
        excluded_payment_types: [
            {
                id: 'atm'
            }
        ],
        installments: 6
    },
    notification_url: 'https://mpmercadolibre.herokuapp.com/notifications',
    external_reference: 'ignacioinda@gmail.com'
}

const payment = ()=>{
    fetch('https://mpmercadolibre.herokuapp.com/checkout', {
        method: 'post',
        body: JSON.stringify(preference),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(payment => {
        //console.log(payment);
        window.open(payment.init_point,'_self');
    });
}



btnPayment.onclick = payment;