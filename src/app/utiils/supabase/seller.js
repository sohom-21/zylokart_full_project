import supabase from './client'

// Insert a new seller (returns seller_id)
export async function insertSeller(sellerObj) {
  const { data, error } = await supabase
    .from('Sellers')
    .insert([sellerObj])
    .select()
  return { data, error }
}

// Get a seller by seller_id (recommended for most operations)
export async function getSellerBySellerId(seller_id) {
  const { data, error } = await supabase
    .from('Sellers')
    .select('*')
    .eq('seller_id', seller_id)
    .single()
  return { data, error }
}

// Get a seller by user_id (useful for onboarding)
export async function getSellerByUserId(user_id) {
  const { data, error } = await supabase
    .from('Sellers')
    .select('*')
    .eq('user_id', user_id)
    .single()
  return { data, error }
}

// Update a seller by seller_id
export async function updateSellerBySellerId(seller_id, updateObj) {
  const { data, error } = await supabase
    .from('Sellers')
    .update(updateObj)
    .eq('seller_id', seller_id)
    .select()
  return { data, error }
}

// Delete a seller by seller_id
export async function deleteSellerBySellerId(seller_id) {
  const { error } = await supabase
    .from('Sellers')
    .delete()
    .eq('seller_id', seller_id)
  return { error }
}

// seller.js
export async function deleteSellerByUserId(user_id) {
  const { data, error } = await supabase
    .from('Sellers')
    .delete()
    .eq('user_id', user_id)
    .single()
  return { data, error }
}