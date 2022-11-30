import React from 'react';
import { FunctionComponent, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface IAuthRouteProps { };

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {

  // @ts-ignore
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AuthCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoading(false);
      navigate('/');
    } else {
      navigate('/login');
    }
  });

  if (loading) return <p>loading...</p>

  return <>{children}</>;
}

export default AuthRoute;