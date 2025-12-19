import api from './api';

const LOG_PREFIX = '[TrainingsService]';

export const getTrainings = async (params = {}) => {
  console.log(`${LOG_PREFIX} getTrainings called with params:`, params);
  try {
    const response = await api.get('/programs', { params });
    console.log(`${LOG_PREFIX} getTrainings response:`, response.status, response.data);
    return response.data;
  } catch (error) {
    console.error(`${LOG_PREFIX} getTrainings FAILED:`, error.message, error.response?.data);
    throw error;
  }
};

export const getTrainingById = async (id) => {
  console.log(`${LOG_PREFIX} getTrainingById called with id:`, id);
  try {
    const response = await api.get(`/programs/${id}`);
    console.log(`${LOG_PREFIX} getTrainingById response:`, response.status);
    return response.data.data || response.data;
  } catch (error) {
    console.error(`${LOG_PREFIX} getTrainingById FAILED:`, error.message, error.response?.data);
    throw error;
  }
};

export const createTraining = async (trainingData) => {
  console.log(`${LOG_PREFIX} createTraining called with:`, trainingData);
  try {
    const response = await api.post('/programs', trainingData);
    console.log(`${LOG_PREFIX} createTraining response:`, response.status, response.data);
    return response.data.data || response.data;
  } catch (error) {
    console.error(`${LOG_PREFIX} createTraining FAILED:`, error.message, error.response?.data);
    throw error;
  }
};

export const updateTraining = async (id, trainingData) => {
  console.log(`${LOG_PREFIX} updateTraining called with id:`, id, 'data:', trainingData);
  try {
    const response = await api.put(`/programs/${id}`, trainingData);
    console.log(`${LOG_PREFIX} updateTraining response:`, response.status);
    return response.data.data || response.data;
  } catch (error) {
    console.error(`${LOG_PREFIX} updateTraining FAILED:`, error.message, error.response?.data);
    throw error;
  }
};

export const deleteTraining = async (id) => {
  console.log(`${LOG_PREFIX} deleteTraining called with id:`, id);
  try {
    const response = await api.delete(`/programs/${id}`);
    console.log(`${LOG_PREFIX} deleteTraining response:`, response.status);
    return response.data;
  } catch (error) {
    console.error(`${LOG_PREFIX} deleteTraining FAILED:`, error.message, error.response?.data);
    throw error;
  }
};

export const bulkDeleteTrainings = async (ids) => {
  console.log(`${LOG_PREFIX} bulkDeleteTrainings called with ids:`, ids);
  const results = await Promise.allSettled(
    ids.map(id => deleteTraining(id))
  );
  
  const succeeded = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;
  
  console.log(`${LOG_PREFIX} bulkDeleteTrainings result: succeeded=${succeeded}, failed=${failed}`);
  return { succeeded, failed, total: ids.length };
};

export const bulkUpdateStatus = async (ids, status) => {
  console.log(`${LOG_PREFIX} bulkUpdateStatus called with ids:`, ids, 'status:', status);
  const results = await Promise.allSettled(
    ids.map(id => updateTraining(id, { status }))
  );
  
  const succeeded = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;
  
  console.log(`${LOG_PREFIX} bulkUpdateStatus result: succeeded=${succeeded}, failed=${failed}`);
  return { succeeded, failed, total: ids.length };
};

