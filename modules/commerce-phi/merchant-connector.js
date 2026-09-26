export class MerchantConnector {
  constructor(config={}){ this.config=config; }
  get id(){ return this.config.id; }
  get merchantId(){ return this.config.merchantId; }

  async search(_query,_options={}){ throw new Error('search() not implemented by merchant connector'); }
  async lookup(_productId){ throw new Error('lookup() not implemented by merchant connector'); }
  async affiliateLink(_product){ throw new Error('affiliateLink() not implemented by merchant connector'); }

  async conversionReport(_input){
    throw new Error('conversionReport() must be implemented only when the merchant/network provides authoritative reporting.');
  }
}

export function assertMerchantConnector(connector){
  if(!connector?.id||!connector?.merchantId) throw new Error('Merchant connector requires id and merchantId.');
  for(const method of ['search','lookup','affiliateLink']){
    if(typeof connector[method]!=='function') throw new Error(`Merchant connector missing ${method}().`);
  }
  return connector;
}
