import supabase from './client'

// Insert a new seller
export async function insertSeller(sellerObj) {
  const { data, error } = await supabase
    .from('Sellers')
    .insert([sellerObj])
    .select()
  return { data, error }
}

// Get a seller by user_id (foreign key)
export async function getSellerByUserId(user_id) {
  const { data, error } = await supabase
    .from('Sellers')
    .select('*')
    .eq('user_id', user_id)
    .single()
  return { data, error }
}

// Update a seller by user_id
export async function updateSellerByUserId(user_id, updateObj) {
  const { data, error } = await supabase
    .from('Sellers')
    .update(updateObj)
    .eq('user_id', user_id)
    .select()
  return { data, error }
}

// Delete a seller by user_id
export async function deleteSellerByUserId(user_id) {
  const { error } = await supabase
    .from('Sellers')
    .delete()
    .eq('user_id', user_id)
  return { error }
}