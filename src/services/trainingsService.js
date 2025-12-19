import api from './api';

export const getTrainings = async (params = {}) => {
  const response = await api.get('/programs', { params });
  return response.data;
};

export const getTrainingById = async (id) => {
  const response = await api.get(`/programs/${id}`);
  return response.data.data || response.data;
};

export const createTraining = async (trainingData) => {
  const response = await api.post('/programs', trainingData);
  return response.data.data || response.data;
};

export const updateTraining = async (id, trainingData) => {
  const response = await api.put(`/programs/${id}`, trainingData);
  return response.data.data || response.data;
};

export const deleteTraining = async (id) => {
  const response = await api.delete(`/programs/${id}`);
  return response.data;
};

export const bulkDeleteTrainings = async (ids) => {
  const results = await Promise.allSettled(
    ids.map(id => deleteTraining(id))
  );
  
  const succeeded = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;
  
  return { succeeded, failed, total: ids.length };
};

export const bulkUpdateStatus = async (ids, status) => {
  const results = await Promise.allSettled(
    ids.map(id => updateTraining(id, { status }))
  );
  
  const succeeded = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;
  
  return { succeeded, failed, total: ids.length };
};
