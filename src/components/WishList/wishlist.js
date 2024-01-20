import { ToastContainer } from 'react-toastify';
import { React } from 'react';
import './wishList-styles.css';
import { deleteFromWishlist } from '../ServerCalls/ServerCalls';
import { EmptyWishlist } from './EmptyWishlist';
import { useAuth } from '../Context/authProvider';
import { useWishList } from './wishContext';
import { Header } from '../header';

export function WishList() {
  const { wishList, dispatch: wishDispatch } = useWishList();
  const {
    authState: { userToken },
  } = useAuth();

  return (
    <section className="wish-container">
      <div>
        <Header />
        {wishList?.length === 0 ? (
          <p className="para--lead">
            <EmptyWishlist />
          </p>
        ) : (
          <div className="container__main">
            <h1 className="heading center fs-h1">
              My WishList (
              {wishList?.length}
              )
            </h1>
            <div className="card-container wish-container">
              {wishList?.map(
                ({
                  _id,
                  name,
                  imageUrl,
                  price,
                  inStock,
                  fastDelivery,
                  ratings,
                  offer,
                }) => (
                  <div>
                    <div className="card card--display" key={_id}>
                      <div className="card__thumbnail">
                        <img
                          src={imageUrl}
                          className="card__img"
                          alt="cardImg"
                        />
                      </div>
                      <div className="card__desc">
                        <h1>
                          <strong>{name}</strong>
                        </h1>
                        <div className="star-count">
                          <p className="star-count__star">{ratings}</p>
                          <div className="rating">
                            <div className="rating__stars">
                              <i className="fa fa-star" aria-hidden="true" />
                            </div>
                          </div>
                        </div>
                        <h2>
                          <strong>
                            {' '}
                            ₹
                            {price}
                          </strong>
                        </h2>
                        <p className="card__details offer">{offer}</p>
                        <button
                          className="btn-outlined btn-outlined--primary btn--trash"
                          onClick={() =>
                            // wishDispatch({ type: "REMOVE", payLoad: _id })
                            deleteFromWishlist(
                              _id,
                              name,
                              wishDispatch,
                              userToken,
                            )}
                        >
                          <i className="fa fa-trash-o" aria-hidden="true" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer style={{ fontSize: 'medium' }} />
    </section>
  );
}
