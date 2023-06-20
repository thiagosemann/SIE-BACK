const pgeModel = require('../models/pgeModel');
const axios = require('axios');

const getAllPge = async (_request, response) => {
  try {
    const pges = await pgeModel.getAllPge();
    return response.status(200).json(pges);
  } catch (error) {
    console.error('Erro ao obter PGE:', error);
    return response.status(500).json({ error: 'Erro ao obter PGEs' });
  }
};



async function fetchDataAndSaveToDatabase() {
    try {
      const response = await axios.get('https://script.google.com/macros/s/AKfycbzl89Tsxh1ZPU3UHM2K0kCffi_mpbcrqCPnwEl-18UkPUNPZniqNRj_2HzCt7o5KzR2DA/exec?action=getPGE');
      const pgeData = response.data;
  
      // Verifique se a resposta contém os dados esperados
      if (!Array.isArray(pgeData)) {
        throw new Error('Os dados recebidos não estão no formato esperado');
      }
  
      // Salve os dados no banco de dados
      for (const pge of pgeData) {
        const procNum = pge.id;
        pge.procNum = procNum
        delete pge.id; // Remova o campo 'id'
      
      
        // Converter todos os campos para strings
        Object.keys(pge).forEach((key) => {
          if (typeof pge[key] !== 'string' && pge[key] !== null && pge[key] !== undefined) {
            pge[key] = pge[key].toString();
          }
        });
      
        const existingPge = await pgeModel.getPgeByProcNum(procNum);
  
        if (existingPge) {
          await pgeModel.updatePgeByProcNum(procNum, pge);
        } else {
          await pgeModel.createPge(pge);
        }
      }
  
      console.log('Os dados foram salvos no banco de dados com sucesso!');
    } catch (error) {
      console.error('Ocorreu um erro ao obter os dados do servidor ou ao salvar no banco de dados:', error);
    }
  }
  //fetchDataAndSaveToDatabase() 
  const intervaloDeTempo = 8 * 60 * 60 * 1000; // 8 horas em milissegundos
  setInterval(fetchDataAndSaveToDatabase, intervaloDeTempo);


module.exports = {
  getAllPge,
  fetchDataAndSaveToDatabase
};