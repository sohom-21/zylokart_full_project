import supabase from "./client";
//  this comes from the client.js file where the Supabase client is initialized

export async function signUp(email, password, userMeta = {}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userMeta,
    },
  });
  if (data && data.user) {
  console.log(data);
  const userId = data.user.id;
  localStorage.setItem('userId', userId); // Store userId in localStorage for later use
  }
  return { data, error };
}  // this is the function to sign up a user returns data and error as object 



export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (data && data.user) {
    console.log(data);
    const userId = data.user.id;
    localStorage.setItem('userId', userId); // Store userId in localStorage for later use
    // Store access token in localStorage
  }
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
    redirectTo:'http://localhost:3000/auth/resetpassword',
  });
  return { data, error };
} 
// this is the function to reset the password. if password is forgotten, this function will send a reset link to the email provided

