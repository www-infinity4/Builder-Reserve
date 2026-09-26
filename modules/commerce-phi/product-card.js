export function productCardModel(product, options = {}) {
  if (!product?.title || !product?.destinationUrl) throw new Error('Product card requires a product and merchant destination.');
  return {
    title: product.title,
    image: product.image || null,
    price: product.price ?? null,
    currency: product.currency || null,
    availability: product.availability || null,
    description: product.description || '',
    merchantId: product.merchantId,
    destinationUrl: product.destinationUrl,
    disclosure: options.disclosure || 'This site may earn a commission from qualifying purchases.',
    actions: {
      merchant: true,
      share: options.share !== false,
      collect: options.collect !== false
    }
  };
}
