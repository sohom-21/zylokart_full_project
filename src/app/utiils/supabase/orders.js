import supabase from './client'

// Insert a new order (single item)
export async function insertOrder(orderObj) {
  const { data, error } = await supabase
    .from('Orders')
    .insert([orderObj])
    .select()
  return { data, error }
}

// Insert multiple orders (for multiple cart items)
export async function insertMultipleOrders(ordersArray) {
  const { data, error } = await supabase
    .from('Orders')
    .insert(ordersArray)
    .select()
  return { data, error }
}

// Get all orders for a user with product details
export async function getOrdersByUserId(user_id) {
  const { data, error } = await supabase
    .from('Orders')
    .select(`
      *,
      Products (
        id,
        name,
        price,
        price_offered,
        image_url,
        category
      )
    `)
    .eq('user_id', user_id)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching orders:', error)
    return { data: [], error }
  }
  return { data: data || [], error: null }
}

// Update order status
export async function updateOrderStatus(order_id, status) {
  const { data, error } = await supabase
    .from('Orders')
    .update({ status })
    .eq('id', order_id)
    .select()
  return { data, error }
}

// Get order by ID
export async function getOrderById(order_id) {
  const { data, error } = await supabase
    .from('Orders')
    .select(`
      *,
      Products (
        id,
        name,
        price,
        price_offered,
        image_url,
        category
      )
    `)
    .eq('id', order_id)
    .single()
  return { data, error }
}

// Delete an order (if needed for cancellation)
export async function deleteOrder(order_id) {
  const { data, error } = await supabase
    .from('Orders')
    .delete()
    .eq('id', order_id)
  return { data, error }
}

// Get order statistics for user
export async function getOrderStats(user_id) {
  const { data, error } = await supabase
    .from('Orders')
    .select('status, total_price')
    .eq('user_id', user_id)
  
  if (error) {
    return { data: null, error }
  }
  
  const stats = {
    total_orders: data.length,
    total_spent: data.reduce((sum, order) => sum + order.total_price, 0),
    pending_orders: data.filter(order => order.status === 'pending').length,
    completed_orders: data.filter(order => order.status === 'delivered').length
  }
  
  return { data: stats, error: null }
}

// Create orders from cart items
export async function createOrdersFromCart(user_id, cartItems) {
  const ordersToInsert = cartItems.map(item => ({
    user_id: user_id,
    product_id: item.product_id,
    quantity: item.quantity,
    total_price: (item.Products?.price_offered || item.Products?.price || 0) * item.quantity,
    status: 'pending' // Default status
  }))
  
  return await insertMultipleOrders(ordersToInsert)
}
