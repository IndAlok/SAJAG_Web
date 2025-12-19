import api from './api';

export const getPartners = async (params = {}) => {
  const response = await api.get('/partners', { params });
  return response.data;
};

export const getPartnerById = async (id) => {
  const response = await api.get(`/partners/${id}`);
  return response.data.data || response.data;
};

export const createPartner = async (partnerData) => {
  const response = await api.post('/partners', partnerData);
  return response.data.data || response.data;
};

export const updatePartner = async (id, partnerData) => {
  const response = await api.put(`/partners/${id}`, partnerData);
  return response.data.data || response.data;
};

export const deletePartner = async (id) => {
  const response = await api.delete(`/partners/${id}`);
  return response.data;
};

export const getPartnerTypes = () => [
  { value: 'NIDM', label: 'National Institute of Disaster Management' },
  { value: 'ATI', label: 'Administrative Training Institute' },
  { value: 'NGO', label: 'Non-Governmental Organization' },
  { value: 'GoI Ministry', label: 'Government of India Ministry' },
];
