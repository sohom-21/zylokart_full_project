import supabase from "./client";
//  this comes from the client.js file where the Supabase client is initialized

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}  // this is the function to sign up a user returns data and error as object 

export async function signIn(email, password) {
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
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  return { data, error };
} 
// this is the function to reset the password. if password is forgotten, this function will send a reset link to the email provided

