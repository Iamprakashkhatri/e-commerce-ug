import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import * as ROUTES from './Routes';
import Loading from './Utilities/Loading.jsx';
import ChatWidget from './Utilities/ChatWidget.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from './actions/userActions';
import AdminRoute from './auth/AdminRoute';
import PrivateRoute from './auth/PrivateRoute';
import { USER_SIGN_IN_SUCCESS } from './constants/userConstants';
import ScrollToTop from './Utilities/ScrollToTop';
import AboutUs from './Utilities/AboutUs';
import 'firebase/auth';
import firebase from 'firebase';

const PrivacyPolicy = lazy(() => import('./Pages/Home/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./Pages/Home/TermsOfUse'));
const LoginPage = lazy(() => import('./Pages/Login'));
const RegisterPage = lazy(() => import('./Pages/Signup'));
const ForgotPassword = lazy(() => import('./Pages/ForgotPassword'));
const VerifyFirst = lazy(() => import('./Pages/VerifyFirst'));
const HomePage = lazy(() => import('./Pages/Home'));
const Deals = lazy(() => import('./Pages/Deals'));
const ProductPage = lazy(() => import('./Pages/SingleProduct'));
const ShowMorePage = lazy(() => import('./Pages/ViewAllProducts'));
const CartPage = lazy(() => import('./Pages/Cart'));
const ContactPage = lazy(() => import('./Pages/Contact'));
const Admin = lazy(() => import('./Pages/Admin/components/Dashboard'));
const UserMessages = lazy(() =>
  import('./Pages/Admin/UserMessages/ChatDashboard')
);
const ProfilePage = lazy(() => import('./Pages/Admin/Profilepage'));
const AdminProductPage = lazy(() => import('./Pages/Admin/AdminProductPage'));
const AdminProductCreatePage = lazy(() =>
  import('./Pages/Admin/AdminProductPage/CreateProduct')
);
const AdminProductUpdatePage = lazy(() =>
  import('./Pages/Admin/AdminProductPage/UpdateProduct')
);
const AdminCategoryPage = lazy(() => import('./Pages/Admin/AdminCategoryPage'));
const AdminRolePage = lazy(() => import('./Pages/Admin/AdminRolePage'));
const CreateRole = lazy(() => import('./Pages/Admin/AdminRolePage/CreateRole'));
const AdminCategoryCreatePage = lazy(() =>
  import('./Pages/Admin/AdminCategoryPage/CreateCategory')
);
const AdminCategoryUpdatePage = lazy(() =>
  import('./Pages/Admin/AdminCategoryPage/UpdateCategory')
);
const UpdateRole = lazy(() => import('./Pages/Admin/AdminRolePage/UpdateRole'));
const AdminSubCategoryPage = lazy(() =>
  import('./Pages/Admin/AdminSubCategoryPage')
);
const AdminSubCategoryCreatePage = lazy(() =>
  import('./Pages/Admin/AdminSubCategoryPage/CreateSubCategory')
);
const AdminSubCategoryUpdatePage = lazy(() =>
  import('./Pages/Admin/AdminSubCategoryPage/UpdateSubCategory')
);
const AdminOrderPage = lazy(() => import('./Pages/Admin/AdminOrderPage'));
const AdminOrderDetails = lazy(() =>
  import('./Pages/Admin/AdminOrderPage/SingleOrderDetails')
);
const Search = lazy(() => import('./Pages/Search'));
const AdminLabelPage = lazy(() => import('./Pages/Admin/AdminLabelPage'));
const AdminLabelCreatePage = lazy(() =>
  import('./Pages/Admin/AdminLabelPage/CreateLabel')
);
const AdminLabelUpdatePage = lazy(() =>
  import('./Pages/Admin/AdminLabelPage/UpdateLabel')
);
const AdminFAQPage = lazy(() => import('./Pages/Admin/AdminFAQPage'));
const AdminFAQCreatePage = lazy(() =>
  import('./Pages/Admin/AdminFAQPage/CreateFAQ')
);
const AdminFAQUpdatePage = lazy(() =>
  import('./Pages/Admin/AdminFAQPage/UpdateFAQ')
);
const AdminSliderPage = lazy(() => import('./Pages/Admin/AdminSliderPage'));
const AdminSliderCreatePage = lazy(() =>
  import('./Pages/Admin/AdminSliderPage/CreateSliderImage')
);
const AdminSliderUpdatePage = lazy(() =>
  import('./Pages/Admin/AdminSliderPage/UpdateSliderImage')
);
const AdminNewsletterPage = lazy(() =>
  import('./Pages/Admin/AdminNewsletterPage')
);
const AdminNewsletterCreatePage = lazy(() =>
  import('./Pages/Admin/AdminNewsletterPage/CreateNewsletter')
);
const AdminNewsletterUpdatePage = lazy(() =>
  import('./Pages/Admin/AdminNewsletterPage/UpdateNewsletter')
);
const AdminFeaturedProductPage = lazy(() =>
  import('./Pages/Admin/AdminFeaturedProductPage')
);
const AdminUsersPage = lazy(() => import('./Pages/Admin/AdminUsersPage'));
const AdminUserDetailsPage = lazy(() =>
  import('./Pages/Admin/AdminUsersPage/UserDetails')
);

const WishListPage = lazy(() => import('./Pages/Wishlist'));
const BlockedPage = lazy(() => import('./Pages/Blocked'));
const ShopPage = lazy(() => import('./Pages/Shop'));

// client dashboard
const ClientDashboard = lazy(() => import('./Pages/Client/ClientDashboard'));
const ClientSettings = lazy(() => import('./Pages/Client/ClientSettings'));
const ClientOrder = lazy(() => import('./Pages/Client/ClientOrder'));
const ClientOrderDetails = lazy(() =>
  import('./Pages/Client/ClientOrder/ClientOrderDetails.jsx')
);

// checkout
const CheckoutPage = lazy(() => import('./Pages/Cart/CheckOut'));

//thankyou
const ThankyouPage = lazy(() => import('./Pages/ThankYou/Thankyou'));

function App() {
  const { userInfo } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('storage', (event) => {
      const credentials = JSON.parse(window.sessionStorage.getItem('userInfo'));
      if (event.key === 'REQUESTING_SHARED_CREDENTIALS' && credentials) {
        window.localStorage.setItem(
          'CREDENTIALS_SHARING',
          JSON.stringify(credentials)
        );
        window.localStorage.removeItem('CREDENTIALS_SHARING');
      }
      if (event.key === 'CREDENTIALS_SHARING' && !credentials) {
        window.sessionStorage.setItem('userInfo', event.newValue);
        dispatch({
          type: USER_SIGN_IN_SUCCESS,
          payload: JSON.parse(event.newValue),
        });
      }
      if (event.key === 'CREDENTIALS_FLUSH' && credentials) {
        window.sessionStorage.removeItem('userInfo');
        window.sessionStorage.removeItem('verified');
        dispatch(signOut());
        firebase.auth().signOut();
      }
    });

    localStorage.setItem(
      'REQUESTING_SHARED_CREDENTIALS',
      Date.now().toString()
    );

    localStorage.removeItem('REQUESTING_SHARED_CREDENTIALS');
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <ChatWidget />
        <Route path={ROUTES.LOGINPAGE} component={LoginPage} />
        <Route path={ROUTES.REGISTERPAGE} component={RegisterPage} />
        <Route path={ROUTES.HOMEPAGE} exact component={HomePage} />
        <Route path={ROUTES.PRODUCTPAGE} component={ProductPage} />
        <Route path={ROUTES.SHOWMOREPAGE} component={ShowMorePage} />
        <Route path={ROUTES.CARTPAGE} component={CartPage} />
        <Route path={ROUTES.CONTACTPAGE} component={ContactPage} />
        <Route path={ROUTES.DEALS} component={Deals} />
        <Route path={ROUTES.SEARCH} component={Search} />
        <Route path={ROUTES.FORGOTPASSWORD} component={ForgotPassword} />
        <Route path={ROUTES.VERIFYFIRST} component={VerifyFirst} />
        <Route path={ROUTES.BLOCKED} component={BlockedPage} />
        <Route path={ROUTES.SHOP} component={ShopPage} />
        <Route path={ROUTES.PRIVACY_POLICY} component={PrivacyPolicy} />
        <Route path={ROUTES.TERMS_OF_USE} component={TermsOfUse} />
        <Route path={'/about-us'} component={AboutUs} />

        {/* admin route */}
        <AdminRoute
          path={ROUTES.ADMIN}
          isAdmin={userInfo && userInfo.user.is_admin}
          isSuperuser={userInfo && userInfo.user.is_superuser}
          exact
          component={Admin}
          pageAccessKey="dashboard"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINPRODUCT}
          component={AdminProductPage}
          pageAccessKey="product"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINCREATEPRODUCT}
          component={AdminProductCreatePage}
          pageAccessKey="product"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINUPDATEPRODUCT}
          component={AdminProductUpdatePage}
          pageAccessKey="product"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINROLE}
          component={AdminRolePage}
          pageAccessKey="roles"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINCREATEROLE}
          component={CreateRole}
          pageAccessKey="roles"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINUPDATEROLE}
          component={UpdateRole}
          pageAccessKey="roles"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINCATEGORY}
          component={AdminCategoryPage}
          pageAccessKey="category"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINCREATECATEGORY}
          component={AdminCategoryCreatePage}
          pageAccessKey="category"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINUPDATECATEGORY}
          component={AdminCategoryUpdatePage}
          pageAccessKey="category"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINSUBCATEGORY}
          component={AdminSubCategoryPage}
          pageAccessKey="subcategory"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINCREATESUBCATEGORY}
          component={AdminSubCategoryCreatePage}
          pageAccessKey="subcategory"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINUPDATESUBCATEGORY}
          component={AdminSubCategoryUpdatePage}
          pageAccessKey="subcategory"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINLABEL}
          component={AdminLabelPage}
          pageAccessKey="product"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINCREATELABEL}
          component={AdminLabelCreatePage}
          pageAccessKey="product"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINUPDATELABEL}
          component={AdminLabelUpdatePage}
          pageAccessKey="product"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINFAQ}
          component={AdminFAQPage}
          pageAccessKey="faq"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINCREATEFAQ}
          component={AdminFAQCreatePage}
          pageAccessKey="faq"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINUPDATEFAQ}
          component={AdminFAQUpdatePage}
          pageAccessKey="faq"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINSLIDER}
          component={AdminSliderPage}
          pageAccessKey="sliderImages"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINCREATESLIDER}
          component={AdminSliderCreatePage}
          pageAccessKey="sliderImages"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINUPDATESLIDER}
          component={AdminSliderUpdatePage}
          pageAccessKey="sliderImages"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINORDERPAGE}
          component={AdminOrderPage}
          pageAccessKey="order"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINORDERDETAILS}
          component={AdminOrderDetails}
          pageAccessKey="order"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.USERMESSAGES}
          component={UserMessages}
          pageAccessKey="userMessages"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.PROFILEPAGE}
          component={ProfilePage}
          pageAccessKey="profile"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINNEWSLETTER}
          component={AdminNewsletterPage}
          pageAccessKey="newsletter"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINCREATENEWSLETTER}
          component={AdminNewsletterCreatePage}
          pageAccessKey="newsletter"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINUPDATENEWSLETTER}
          component={AdminNewsletterUpdatePage}
          pageAccessKey="newsletter"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINFEATUREDPRODUCT}
          component={AdminFeaturedProductPage}
          pageAccessKey="product"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINUSERS}
          component={AdminUsersPage}
          pageAccessKey="user"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        <AdminRoute
          isSuperuser={userInfo && userInfo.user.is_superuser}
          isAdmin={userInfo && userInfo.user.is_admin}
          path={ROUTES.ADMINUSERDETAILS}
          component={AdminUserDetailsPage}
          pageAccessKey="user"
          role={userInfo && userInfo.user && userInfo.user.role}
        />
        {/* for clientside dashboard */}
        <PrivateRoute
          path={ROUTES.CLIENTDASHBOARD}
          token={userInfo && userInfo.token}
          exact
          component={ClientDashboard}
        />
        <PrivateRoute
          token={userInfo && userInfo.token}
          component={ClientSettings}
          exact
          path={ROUTES.CLIENTSETTINGS}
        />
        <PrivateRoute
          token={userInfo && userInfo.token}
          component={ClientOrder}
          exact
          path={ROUTES.CLIENTORDER}
        />
        <PrivateRoute
          token={userInfo && userInfo.token}
          path={ROUTES.CLIENTORDERDETAILS}
          exact
          component={ClientOrderDetails}
        />
        <PrivateRoute
          token={userInfo && userInfo.token}
          path={ROUTES.WISHLISTPAGE}
          exact
          component={WishListPage}
        />

        {/* for checkout*/}
        <PrivateRoute
          token={userInfo && userInfo.token}
          path={ROUTES.CHECKOUTPAGE}
          exact
          component={CheckoutPage}
        />
        {/* for thankyou page*/}
        <PrivateRoute
          token={userInfo && userInfo.token}
          path={ROUTES.THANKYOUPAGE}
          exact
          component={ThankyouPage}
        />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
