import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDeliverOrderMutation, useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation } from '../slices/ordersApiSlice';
import {  PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {toast} from 'react-toastify';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';



const OrderScreen = () => {

  const { orderId } = useParams();

  const { data: order, refetch, isError, isLoading } = useGetOrderDetailsQuery(orderId);
  const [deliverOrder, {isLoading:loadingDeliver}]=useDeliverOrderMutation();

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    isError: errorPayPal
  } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientID) {
      const loadPayPalScript = async () => {
        payPalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientID,
            currency: 'USD'
          }
        });
        payPalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      }


      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      };
    }

  }, [order, payPalDispatch, paypal, loadingPayPal, errorPayPal]);


  const onApproveTest=async()=>{
    try {
      await payOrder({orderId,details:{payer:{}}});
      refetch();
      toast.success('Order Paid Successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  }

  const onApprove=(data,actions)=>{
    return actions.order.capture().then(async function(details){
      try {
        await payOrder({orderId,details}).unwrap();
        refetch();
        toast.success('Order Paid Successfully');
      } catch (error) {
        
      }
    })
  }
  const onError=(err)=>{
    toast.error(err.message);
  }
  const createOrder=(data,actions)=>{
    return actions.order.create({
      purchase_units:[
        {
          amount:{
            value:order.totalPrice
          }
        }
      ]
    })
    .then((orderId)=>{
      return orderId;
    
    })
  }

  const { userInfo } = useSelector((state) => state.auth);

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order Delivered Successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  }

  return (
    isLoading ? <Loader /> : isError ? <Message variant='danger'>{
      isError?.data?.message || isError.message
    }</Message> :
      (
        <>
          <h1>Order {order._id}</h1>

          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant='success'>
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not Delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant='success'>Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant='danger'>Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = ${item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}

                      {isPending ? (
                        <Loader />
                      ) : (
                        <div>
                          {/* THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION! */}
                            <Button
                              style={{ marginBottom: '10px' }}
                              onClick={onApproveTest}
                            >
                              Test Pay Order
                            </Button> 

                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        </div>
                      )}
                    </ListGroup.Item>
                  )}

                 {loadingDeliver && <Loader />}

                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type='button'
                          className='btn btn-block'
                          onClick={deliverHandler}
                        >
                          Mark As Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                </ListGroup>
              </Card>
            </Col>

          </Row>
        </>
      )
  )
}

export default OrderScreen