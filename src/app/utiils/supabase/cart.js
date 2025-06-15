import supabase from './client'

// Get cart items for a user with product details
export async function getCartItems(userUuid) {
    const { data, error } = await supabase
        .from('Cart_items')
        .select(`
          *,
          Products (
            id,
            name,
            price,
            price_offered,
            image_url,
            stock
          )
        `)
        .eq('user_id', userUuid);
    
    if (error) {
        console.error('Error fetching cart items:', error);
        return [];
    }
    return data || [];
}

// Add item to cart
export async function addToCart(user_id, product_id, quantity = 1) {
  // First check if item already exists in cart
  const { data: existingItem, error: checkError } = await supabase
    .from('Cart')
    .select('id, quantity')
    .eq('user_id', user_id)
    .eq('product_id', product_id)
    .single()

  if (checkError && checkError.code !== 'PGRST116') {
    return { data: null, error: checkError }
  }

  if (existingItem) {
    // Update quantity if item exists
    const { data, error } = await supabase
      .from('Cart')
      .update({ quantity: existingItem.quantity + quantity })
      .eq('id', existingItem.id)
      .select()
    return { data, error }
  } else {
    // Insert new item
    const { data, error } = await supabase
      .from('Cart')
      .insert([{ user_id, product_id, quantity }])
      .select()
    return { data, error }
  }
}

// Update cart item quantity
export async function updateCartQuantity(cart_id, quantity) {
  const { data, error } = await supabase
    .from('Cart')
    .update({ quantity })
    .eq('id', cart_id)
    .select()
  return { data, error }
}

// Remove item from cart
export async function removeFromCart(cart_id) {
  const { data, error } = await supabase
    .from('Cart')
    .delete()
    .eq('id', cart_id)
  return { data, error }
}

// Clear entire cart for user
export async function clearCart(user_id) {
  const { data, error } = await supabase
    .from('Cart')
    .delete()
    .eq('user_id', user_id)
  return { data, error }
}

// Get cart item count for user
export async function getCartCount(user_id) {
  const { data, error } = await supabase
    .from('Cart')
    .select('quantity')
    .eq('user_id', user_id)
  
  if (error) return { count: 0, error }
  
  const count = data.reduce((total, item) => total + item.quantity, 0)
  return { count, error: null }
}

export async function insertCartItem(userUuid, productId, quantity) {
    const { data, error } = await supabase
        .from('Cart_items')
        .insert([{ user_id: userUuid, product_id: productId, quantity }]);
    
    if (error) {
        console.error('Error inserting cart item:', error);
        return null;
    }
    return data;
}
export async function updateCartItem(cartItemId, newQuantity) {
    const { data, error } = await supabase
        .from('Cart_items')
        .update({ quantity: newQuantity })
        .eq('id', cartItemId);
    
    if (error) {
        console.error('Error updating cart item:', error);
        return null;
    }
    return data;
}

export async function deleteCartItem(cartItemId) {
    const { data, error } = await supabase
        .from('Cart_items')
        .delete()
        .eq('id', cartItemId);
    
    if (error) {
        console.error('Error deleting cart item:', error);
        return null;
    }
    return data;
}