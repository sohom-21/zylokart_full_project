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

// Get seller dashboard statistics
export async function getSellerDashboardStats(seller_id) {
  try {
    // Get total products
    const { data: products, error: productsError } = await supabase
      .from('Products')
      .select('id, stock, price')
      .eq('seller_id', seller_id)
    
    if (productsError) throw productsError

    // Get total orders (assuming there's an Orders table)
    const { data: orders, error: ordersError } = await supabase
      .from('Orders')
      .select('id, total_amount, status, created_at')
      .eq('seller_id', seller_id)
    
    // If orders table doesn't exist, set default values
    const ordersData = ordersError ? [] : orders

    // Calculate statistics
    const totalProducts = products.length
    const totalOrders = ordersData.length
    const totalRevenue = ordersData.reduce((sum, order) => sum + (order.total_amount || 0), 0)
    const totalStock = products.reduce((sum, product) => sum + (product.stock || 0), 0)
    
    // Get recent orders (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const recentOrders = ordersData.filter(order => 
      new Date(order.created_at) >= sevenDaysAgo
    )

    // Get pending orders
    const pendingOrders = ordersData.filter(order => 
      order.status === 'pending' || order.status === 'processing'
    )

    return {
      data: {
        totalProducts,
        totalOrders,
        totalRevenue,
        totalStock,
        recentOrdersCount: recentOrders.length,
        pendingOrdersCount: pendingOrders.length,
        recentOrders: recentOrders.slice(0, 5), // Last 5 recent orders
        products: products.slice(0, 5) // Top 5 products
      },
      error: null
    }
  } catch (error){
    return { data: null, error }
  }
}

// Get seller's products with pagination
export async function getSellerProducts(seller_id, page = 1, limit = 10) {
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await supabase
    .from('Products')
    .select('*', { count: 'exact' })
    .eq('seller_id', seller_id)
    .order('created_at', { ascending: false })
    .range(from, to)

  return { data, error, count }
}

// Get seller's orders
export async function getSellerOrders(seller_id, page = 1, limit = 10) {
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await supabase
    .from('Orders')
    .select(`
      *,
      OrderItems (
        id,
        quantity,
        price,
        Products (
          id,
          name,
          image_url
        )
      )
    `, { count: 'exact' })
    .eq('seller_id', seller_id)
    .order('created_at', { ascending: false })
    .range(from, to)

  // If orders table doesn't exist, return empty data
  if (error && error.code === '42P01') {
    return { data: [], error: null, count: 0 }
  }

  return { data, error, count }
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

// Get sales analytics for charts
export async function getSalesAnalytics(seller_id, days = 30) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data, error } = await supabase
    .from('Orders')
    .select('created_at, total_amount, status')
    .eq('seller_id', seller_id)
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: true })

  // If orders table doesn't exist, return empty data
  if (error && error.code === '42P01') {
    return { data: [], error: null }
  }

  return { data, error }
}