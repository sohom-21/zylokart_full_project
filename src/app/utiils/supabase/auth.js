// app/utiils/supabase/auth.js

import supabase from "./client";

//  this comes from the client.js file where the Supabase client is initialized
export async function signUp(email, password, userMeta = {}) {
  // THIS IS THE CRITICAL ADDITION
  const redirectUrl = `${window.location.origin}/auth/callback`;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userMeta,
      // By providing this, you are telling Supabase to use the PKCE flow
      // and send a link that will hit your callback route.
      emailRedirectTo: redirectUrl,
    },
  });

  return { data, error };
}

export async function signIn(email, password) {
  // REMOVED localStorage.setItem. The auth helpers manage the session via cookies.
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
} 
// this is the function to sign in a user. returns data and error as object


export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
} 
// this is the signout function .... will implement it later


export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email,{
    // This redirect path is where the user will land to set a new password.
    // Ensure you have a page at this route to handle it.
    redirectTo:'http://localhost:3000/auth/resetpassword', // Updated as per your context for /auth/resetpassword page
  });
  return { data, error };
} 

// this is the function to reset the password. if password is forgotten, this function will send a reset link to the email provided
export async function updateUserProfile(updates) {
  const { data, error } = await supabase.auth.updateUser({
    data: updates,
  });
  return { data, error };
}