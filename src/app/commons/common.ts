export const getTerms = () => {
  const terms = new Array<string>();
  terms.push('5 Net Days');
  terms.push('10 Net Days');
  terms.push('15 Net Days');
  terms.push('20 Net Days');
  terms.push('25 Net Days');
  terms.push('30 Net Days');
  terms.push('60 Net Days');
  return terms;
};

export const getPreference = () => {
  const preference = new Array<string>();
  preference.push('FedEx');
  preference.push('UPC');
  return preference;
};

export const getOrderOption = () => {
  const option = new Array<string>();
  option.push('Phone');
  option.push('Email');
  return option;
};

export const getOrderTypeOption = () => {
  const option = new Array<string>();
  option.push('Stoke');
  option.push('Delivery');
  return option;
};

export const getOrderTermsOption = () => {
  const terms = new Array<string>();
  terms.push('5 Days');
  terms.push('10 Days');
  terms.push('15 Days');
  terms.push('20 Days');
  terms.push('25 Days');
  terms.push('30 Days');
  terms.push('60 Days');
  return terms;
};
