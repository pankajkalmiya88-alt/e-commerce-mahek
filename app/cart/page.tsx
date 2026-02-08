"use client";

import { useEffect, useState } from "react";
import { EmptyCart } from "@/components/empty-states/EmptyCart";
import { ProfileMenu } from "@/components/profile/ProfileMenu";
import { isAuthenticated } from "@/lib/auth-utils";

export default function CartPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(isAuthenticated());
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (!isAuth) {
    return <EmptyCart isAuthenticated={false} />;
  }

  return (
    <div className="min-h-screen bg-background-light py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="mt-6">
          <EmptyCart isAuthenticated={true} />
        </div>
      </div>
    </div>
  );
}
