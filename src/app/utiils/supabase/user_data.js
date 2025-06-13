import supabase from './client'

// Insert a new user record (expects userObj with user_id and all required fields)
export async function insertUser(userObj) {
  const { data, error } = await supabase
    .from('Users')
    .insert([userObj])
    .select()
  return { data, error }
}

// Get a user by user_id (foreign key from auth.users.id)
export async function getUserById(user_id) {
  const { data, error } = await supabase
    .from('Users')
    .select('*')
    .eq('user_id', user_id)
    .single()
  return { data, error }
}

// Update a user by user_id
export async function updateUserById(user_id, updateObj) {
  const { data, error } = await supabase
    .from('Users')
    .update(updateObj)
    .eq('user_id', user_id)
    .select()
  return { data, error }
}

// Delete a user by user_id
export async function deleteUserById(user_id) {
  const { data, error } = await supabase
    .from('Users')
    .delete()
    .eq('user_id', user_id)
  return { data, error }
}
