import supabase from "./client";

export async function insertProduct(productObj) {
  const { data, error } = await supabase
    .from('Products')
    .insert([productObj])
    .select()
  return { data, error }
}

export async function getProductById(product_id) {
  const { data, error } = await supabase
    .from('Products')
    .select('*')
    .eq('product_id', product_id)
    .single()
  return { data, error }
}

export async function updateProductById(product_id, updateObj) {
  const { data, error } = await supabase
    .from('Products')
    .update(updateObj)
    .eq('product_id', product_id)
    .select()
  return { data, error }
}

export async function deleteProductById(seller_id){
         const { data, error } = await supabase
         .from('Products')
         .delete()
         .eq('seller_id', seller_id)
         .single()
         return {data, error}
}

export async function addImageToProduct(product_id, imageUrl) {
  const { data, error } = await supabase
    .from('Products')
    .update({ image_url: imageUrl })
    .eq('product_id', product_id)
    .select()
  return { data, error }
}