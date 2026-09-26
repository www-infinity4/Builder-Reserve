export function normalizeProduct(merchantId, raw, map) {
  const read = (key) => typeof map[key] === 'function' ? map[key](raw) : raw?.[map[key]];
  const product = {
    productId: String(read('productId') || ''),
    merchantId,
    title: String(read('title') || ''),
    destinationUrl: String(read('destinationUrl') || ''),
    image: read('image') || null,
    price: read('price') ?? null,
    currency: read('currency') || null,
    availability: read('availability') || null,
    description: read('description') || null,
    updatedAt: read('updatedAt') || null
  };
  if (!product.productId || !product.title || !product.destinationUrl) {
    throw new Error('Merchant product is missing a required normalized field.');
  }
  return product;
}

export function buildAffiliateClick(product, eventId = crypto.randomUUID()) {
  return {
    eventId,
    productId: product.productId,
    merchantId: product.merchantId,
    destinationUrl: product.destinationUrl,
    occurredAt: new Date().toISOString(),
    status: 'outbound-click'
  };
}

export function recordReportedConversion(report) {
  if (!report?.networkEventId || !report?.merchantId || !report?.reportedAt) {
    throw new Error('Conversion requires authoritative merchant/network evidence.');
  }
  return {...report, authority:'merchant-or-affiliate-network'};
}
