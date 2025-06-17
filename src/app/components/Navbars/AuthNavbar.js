'use client';

import React, { useState, useEffect } from 'react';
import NavbarLanding from './Navbar-landing';
import NavbarCustomer from './navbar-customer';
import supabase from '../../utiils/supabase/client';

const AuthNavbar = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return null; // Or a loading spinner if preferred
  }

  return session ? <NavbarCustomer /> : <NavbarLanding />;
};

export default AuthNavbar;