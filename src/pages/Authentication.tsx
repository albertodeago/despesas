import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export function Authentication() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement>,
    email: string
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;

      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <p>Sign in via magic link with your email below</p>

      <div>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <button onClick={(e) => handleLogin(e, email)}>
          {loading ? <span>loading</span> : <span>Send magic link</span>}
        </button>
      </div>
    </div>
  );
}
