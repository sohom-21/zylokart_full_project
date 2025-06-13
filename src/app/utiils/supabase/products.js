import supabase from "./client";

// Insert a new product
export async function insertProduct(productObj) {
  const { data, error } = await supabase
    .from('Products')
    .insert([productObj])
    .select();
  return { data, error };
}

// Get a product by its id
export async function getProductById(id) {
  const { data, error } = await supabase
    .from('Products')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
}

// Update a product by its id
export async function updateProductById(id, updateObj) {
  const { data, error } = await supabase
    .from('Products')
    .update(updateObj)
    .eq('id', id)
    .select();
  return { data, error };
}

// Delete a product by its id
export async function deleteProductById(id) {
  const { data, error } = await supabase
    .from('Products')
    .delete()
    .eq('id', id)
    .single();
  return { data, error };
}

// Get all products for a seller by seller_id
export async function getProductsBySellerId(seller_id) {
  const { data, error } = await supabase
    .from('Products')
    .select('*')
    .eq('seller_id', seller_id)
    .order('created_at', { ascending: false });
  return { data, error };
}

// Upload an image to Supabase Storage and return the public URL
export async function uploadProductImage(file) {
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = `product-images/${fileName}`;
  const { data, error } = await supabase.storage
    .from('store-product-images')
    .upload(filePath, file);
  if (error) return { url: null, error };

  const { data: publicUrlData } = supabase.storage
    .from('store-product-images')
    .getPublicUrl(filePath);
  return { url: publicUrlData?.publicUrl || null, error: null };
}

// Update the main image_url for a product
export async function updateProductImageUrl(id, imageUrl) {
  const { data, error } = await supabase
    .from('Products')
    .update({ image_url: imageUrl })
    .eq('id', id)
    .select();
  return { data, error };
}