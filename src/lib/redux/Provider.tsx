"use client";

import { Provider, useDispatch } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import { createClient } from "../supabase-client";
import { setUser } from "./slice";

function AuthLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();      
      if (data.user) {
        dispatch(setUser(data.user.id!));
      }
    };

    loadUser();
  }, [dispatch]);

  return <>{children}</>;
}

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <Provider store={store}>
      <PersistGate  persistor={persistor}>
        <AuthLoader>
           {children}
        </AuthLoader>
      </PersistGate>
    </Provider>
  );
}
