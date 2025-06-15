import supabase from './client'

// Get all orders for a specific seller with full details
export async function getSellerOrdersWithDetails(seller_id, page = 1, limit = 10) {
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await supabase
    .from('Orders')
    .select(`
      id,
      user_id,
      product_id,
      quantity,
      total_price,
      status,
      created_at,
      Products!inner (
        id,
        name,
        image_url,
        price,
        price_offered,
        category,
        seller_id
      ),
      Users (
        id,
        user_id,
        name,
        email,
        phone
      )
    `, { count: 'exact' })
    .eq('Products.seller_id', seller_id)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Error fetching seller orders:', error)
    return { data: [], error, count: 0 }
  }

  return { data: data || [], error: null, count }
}

// Get seller orders with filtering by status
export async function getSellerOrdersByStatus(seller_id, status, page = 1, limit = 10) {
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await supabase
    .from('Orders')
    .select(`
      id,
      user_id,
      product_id,
      quantity,
      total_price,
      status,
      created_at,
      Products!inner (
        id,
        name,
        image_url,
        price,
        price_offered,
        category,
        seller_id
      ),
      Users (
        id,
        user_id,
        name,
        email,
        phone
      )
    `, { count: 'exact' })
    .eq('Products.seller_id', seller_id)
    .eq('status', status)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Error fetching seller orders by status:', error)
    return { data: [], error, count: 0 }
  }

  return { data: data || [], error: null, count }
}

// Update order status (affects both seller and customer view)
export async function updateSellerOrderStatus(order_id, new_status) {
  const { data, error } = await supabase
    .from('Orders')
    .update({ 
      status: new_status,
      updated_at: new Date().toISOString()
    })
    .eq('id', order_id)
    .select(`
      id,
      user_id,
      product_id,
      quantity,
      total_price,
      status,
      created_at,
      Products (
        id,
        name,
        image_url,
        price,
        price_offered,
        category
      ),
      Users (
        id,
        user_id,
        name,
        email
      )
    `)

  if (error) {
    console.error('Error updating order status:', error)
    return { data: null, error }
  }

  return { data: data?.[0] || null, error: null }
}

// Get seller order statistics
export async function getSellerOrderStats(seller_id) {
  try {
    const { data, error } = await supabase
      .from('Orders')
      .select(`
        id,
        status,
        total_price,
        created_at,
        Products!inner (
          seller_id
        )
      `)
      .eq('Products.seller_id', seller_id)

    if (error) throw error

    const stats = {
      total_orders: data.length,
      total_revenue: data.reduce((sum, order) => sum + order.total_price, 0),
      pending_orders: data.filter(order => order.status === 'pending').length,
      processing_orders: data.filter(order => order.status === 'processing').length,
      delivered_orders: data.filter(order => order.status === 'delivered').length,
      cancelled_orders: data.filter(order => order.status === 'cancelled').length,
      recent_orders: data.filter(order => {
        const orderDate = new Date(order.created_at)
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        return orderDate >= sevenDaysAgo
      }).length
    }

    return { data: stats, error: null }
  } catch (error) {
    console.error('Error fetching seller order stats:', error)
    return { data: null, error }
  }
}

// Bulk update order statuses
export async function bulkUpdateOrderStatus(order_ids, new_status) {
  const { data, error } = await supabase
    .from('Orders')
    .update({ 
      status: new_status,
      updated_at: new Date().toISOString()
    })
    .in('id', order_ids)
    .select()

  if (error) {
    console.error('Error bulk updating order status:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

// Search orders by customer name or order ID
export async function searchSellerOrders(seller_id, search_term) {
  const { data, error } = await supabase
    .from('Orders')
    .select(`
      id,
      user_id,
      product_id,
      quantity,
      total_price,
      status,
      created_at,
      Products!inner (
        id,
        name,
        image_url,
        price,
        price_offered,
        category,
        seller_id
      ),
      Users (
        id,
        user_id,
        name,
        email,
        phone
      )
    `)
    .eq('Products.seller_id', seller_id)
    .or(`id.ilike.%${search_term}%,Users.name.ilike.%${search_term}%,Products.name.ilike.%${search_term}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error searching seller orders:', error)
    return { data: [], error }
  }

  return { data: data || [], error: null }
}

// Get orders within date range
export async function getSellerOrdersByDateRange(seller_id, start_date, end_date) {
  const { data, error } = await supabase
    .from('Orders')
    .select(`
      id,
      user_id,
      product_id,
      quantity,
      total_price,
      status,
      created_at,
      Products!inner (
        id,
        name,
        image_url,
        price,
        price_offered,
        category,
        seller_id
      ),
      Users (
        id,
        user_id,
        name,
        email,
        phone
      )
    `)
    .eq('Products.seller_id', seller_id)
    .gte('created_at', start_date)
    .lte('created_at', end_date)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders by date range:', error)
    return { data: [], error }
  }

  return { data: data || [], error: null }
}
