import supabase from './client'

// Get wishlist items for a user with product details
export async function getWishlistItems(userUuid) {
    const { data, error } = await supabase
        .from('Wishlists')
        .select(`
          *,
          Products (
            id,
            name,
            price,
            price_offered,
            image_url,
            stock,
            category
          )
        `)
        .eq('user_id', userUuid);
    
    if (error) {
        console.error('Error fetching wishlist items:', error);
        return [];
    }
    return data || [];
}

// Add item to wishlist
export async function addToWishlist(user_id, product_id) {
  // First check if item already exists in wishlist
  const { data: existingItem, error: checkError } = await supabase
    .from('Wishlists')
    .select('id')
    .eq('user_id', user_id)
    .eq('product_id', product_id)
    .single()

  if (checkError && checkError.code !== 'PGRST116') {
    return { data: null, error: checkError }
  }

  if (existingItem) {
    return { data: null, error: { message: 'Item already in wishlist' } }
  }

  // Insert new item
  const { data, error } = await supabase
    .from('Wishlists')
    .insert([{ user_id, product_id }])
    .select()
  return { data, error }
}

// Remove item from wishlist
export async function removeFromWishlist(wishlist_id) {
  const { data, error } = await supabase
    .from('Wishlists')
    .delete()
    .eq('id', wishlist_id)
    .single()
  return { data, error }
}

// Remove item from wishlist by user_id and product_id
export async function removeFromWishlistByProduct(user_id, product_id) {
  const { data, error } = await supabase
    .from('Wishlists')
    .delete()
    .eq('user_id', user_id)
    .eq('product_id', product_id)
  return { data, error }
}

// Check if item is in wishlist
export async function isInWishlist(user_id, product_id) {
  const { data, error } = await supabase
    .from('Wishlists')
    .select('id')
    .eq('user_id', user_id)
    .eq('product_id', product_id)
    .single()
  
  if (error && error.code === 'PGRST116') {
    return { isInWishlist: false, error: null }
  }
  
  return { isInWishlist: !!data, error }
}

// Get wishlist count for user
export async function getWishlistCount(user_id) {
  const { data, error } = await supabase
    .from('Wishlists')
    .select('id', { count: 'exact' })
    .eq('user_id', user_id)
  
  if (error) return { count: 0, error }
  
  return { count: data.length, error: null }
}

export async function insertWishlistItem(userUuid, productId) {
    const { data, error } = await supabase
        .from('Wishlists')
        .insert([{ user_id: userUuid, product_id: productId }]);
    
    if (error) {
        console.error('Error inserting wishlist item:', error);
        return null;
    }
    return data;
}

export async function deleteWishlistItem(wishlistItemId) {
    const { data, error } = await supabase
        .from('Wishlists')
        .delete()
        .eq('id', wishlistItemId);
    
    if (error) {
        console.error('Error deleting wishlist item:', error);
        return null;
    }
    return data;
}