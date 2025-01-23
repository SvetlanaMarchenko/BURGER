import {useEffect} from 'react';
import { Routes, Route, useLocation, useNavigate, useMatch } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page/login-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password-page';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password-page';
import { HomePage } from '../../pages/home-page/home-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import IngredientsIdPage from '../../pages/ingredients-id-page/ingredients-id-page';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../modal/modal';
import { setCurrentIngredient } from '../../services/actions/current-ingredient-actions';
import AppHeader from '../../components/app-header/app-header';
import style from '../../components/app/app.module.css';
import { RootState } from '../../services/store';
import { Feed } from '../../pages/feed/feed';
import FeedNumber from '../../pages/feed/feed-number/feed-number';
import {ProfileOrders} from '../../pages/profile-page/profile-orders/profile-orders';
import OrderNumber from '../../pages/profile-page/profile-orders-number/profile-orders-number';

 
function App() {
  const location = useLocation();
  let state = location.state
  const allIngredients = useSelector((state: RootState) => state.ingredients.allIngredients); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wantedIngredientId = useMatch("/ingredients/:ingredientId")?.params?.ingredientId;
  const wantedOrderNumber = useMatch("/feed/:number")?.params?.number;
  const profileOrderNumber = useMatch("/profile/orders/:number")?.params?.number;
  
  useEffect(() => {
    if(
        wantedIngredientId !== null &&
        allIngredients &&
        allIngredients.length > 0
      ) {
      const wantedIngredient = allIngredients.find(ingr => ingr._id === wantedIngredientId)
      if(!wantedIngredient) {
      } else {
        dispatch(setCurrentIngredient(wantedIngredient))
      }
    }
  }, [allIngredients, dispatch]);


  return (
    <div className={style.appLayout}>
       <AppHeader />

       {state?.backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:ingredientId'
            element={
              <Modal onClose={() => { navigate(-1); }}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal onClose={() => { navigate(-1); }}>
                <FeedNumber orderNumber={wantedOrderNumber} />
              </Modal>
            }
          />
          <Route
            path='//profile/orders/:number'
            element={
              <Modal onClose={() => { navigate(-1); }}>
                <OrderNumber orderNumber={profileOrderNumber} />
              </Modal>
            }
          />
        </Routes>
      )}
      <Routes location={state?.backgroundLocation || location}>    
        <Route path="/" element={<HomePage />} />
        <Route path='/feed' element={<Feed/>} />

        <Route path="/login" element={<OnlyUnAuth element={LoginPage} />} />
        <Route path="/register" element={<OnlyUnAuth element={RegisterPage} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth element={ForgotPasswordPage} />} />
        
        <Route path="/profile" element={<OnlyAuth element={ProfilePage} />} />
        <Route path="/profile/*" element={<OnlyAuth element={ProfilePage} />} />
        
        <Route path="/reset-password" element={<OnlyUnAuth element={ResetPasswordPage} />} />

        <Route path="/ingredients/:id" element={<IngredientsIdPage />} />

        <Route path="/feed/:number" element={<FeedNumber orderNumber={wantedOrderNumber } />} />
        <Route path="/profile/orders" element={<OnlyAuth element={ProfileOrders} />} />

        <Route path="/profile/orders/:number" element={<OnlyAuth element={<OrderNumber orderNumber={profileOrderNumber} />} />} />

        
      </Routes>
    </div>
  );
}

export default App;
