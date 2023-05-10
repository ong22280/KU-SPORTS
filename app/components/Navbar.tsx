"use client";

import Link from "next/link";
import AuthModal from "./AuthModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";

export default function NavBar() {
  const { dataContext, loadingContext } = useContext(AuthenticationContext);
  const { signout } = useAuth();
  return (
    <nav className="flex justify-between p-2 bg-white">
      <Link href="/" className="text-2xl font-bold text-gray-700">
        KUsports{" "}
      </Link>
      <div>
        {loadingContext ? null : (
          <div className="flex">
            {dataContext ? (
              <button
                className="p-1 px-4 mr-3 text-white bg-green-400 border rounded"
                onClick={signout}
              >
                ออกจากระบบ
              </button>
            ) : (
              <>
                <AuthModal isSignin={true} />
                <AuthModal isSignin={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}