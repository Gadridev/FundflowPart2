import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "../store/authSlice";
import { fetchWallet } from "../store/walletSlice";

export function RequireAuth() {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchMe());
      dispatch(fetchWallet());
    }
  }, [dispatch, token, user]);

  if (loading && !user) {
    return <div className="page-section">Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
