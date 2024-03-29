const express = require('express');

const router = express.Router();

const usersController = require('./controllers/usersController');
const documentsController = require('./controllers/documentoController'); // Importe o controlador dos documentos
const pgeController = require('./controllers/pgeController');
const atividadeHomologadaController = require('./controllers/atividadeHomologadaController');
const documentosCriadosController = require('./controllers/documentosCriadosController')
const licoesController = require('./controllers/licoesAtividadeHomologadaController');
const usersCivisController = require('./controllers/usersCivilController'); // Adicione o controlador dos usuários civis
const inscricoesController = require('./controllers/inscritionController'); // Importe o controlador das inscrições
const editaisController = require('./controllers/editaisController'); // Importe o controlador dos editais


const verifyToken = require('./middlewares/authMiddleware'); // Importe o middleware de autenticação

// ROTAS USERS
router.get('/users', verifyToken, usersController.getAllUsers);
router.get('/users/:mtcl', verifyToken, usersController.getUserByMtcl);
router.put('/users/:id', verifyToken, usersController.updateUser);
router.post('/users', verifyToken, usersController.createUser);
router.post('/users/batch', verifyToken, usersController.batchUpdateUsers);

// ROTA LOGIN
router.post('/login', usersController.loginUser);

// ROTAS DOCUMENTS
router.get('/documents', verifyToken, documentsController.getAllDocuments);
router.post('/documents', verifyToken, documentsController.createDocument);
router.delete('/documents/:id', verifyToken, documentsController.deleteDocumentById);
router.put('/documents/:id', verifyToken, documentsController.updateDocumentById);
router.get('/documents/:id', verifyToken, documentsController.getDocumentById);
router.get('/documents/name/:name', documentsController.getDocumentByName);

// ROTAS PGE
router.get('/pge',verifyToken,pgeController.getAllPge)
router.put('/pge/:id', verifyToken, pgeController.updatePgeById);

//ROTAS ATIVIDADE DE ENSINO HOMOLOGADA
router.get('/atividadeHomologada',verifyToken,atividadeHomologadaController.getAllAtividadeHomologada)
router.get('/atividadeHomologada/sigla/:sigla',verifyToken,atividadeHomologadaController.getAtividadeHomologadaBySigla)
router.get('/atividadeHomologada/versions/:id', verifyToken, atividadeHomologadaController.getAllAtividadeHomologadaVersionsById);
router.put('/atividadeHomologada/:id', verifyToken, atividadeHomologadaController.updateAtividadeHomologadaById);
router.delete('/atividadehomologada/:id',verifyToken, atividadeHomologadaController.deleteAtividadeHomologadaById);
router.post('/atividadehomologada/',verifyToken, atividadeHomologadaController.createAtividadeHomologada);

// ROTAS CURSOS
router.get('/documentosCriados', verifyToken, documentosCriadosController.getAllCourses);
router.post('/documentosCriados', verifyToken, documentosCriadosController.createCourse);
router.delete('/documentosCriados/:id', verifyToken, documentosCriadosController.deleteCourseById);
router.put('/documentosCriados/:id', verifyToken, documentosCriadosController.updateCourseById);
router.get('/documentosCriados/id/:id', documentosCriadosController.getCourseById);
router.get('/documentosCriados/auth/:auth', documentosCriadosController.getCourseByAuth);

// Rotas para Lições
router.get('/licoes', verifyToken, licoesController.getAllLicoes);
router.get('/licoes/sigla/:sigla', licoesController.getLicoesBySigla);

// ROTAS USERSCIVIS
router.get('/usersCivil', verifyToken, usersCivisController.getAllUsersCivil);
router.post('/usersCivil', verifyToken, usersCivisController.createUserCivil);
router.get('/usersCivil/:id', verifyToken, usersCivisController.getUserCivilbyId);

// ROTAS INSCRICOES
router.get('/inscricoes', verifyToken, inscricoesController.getAllInscricoes);
router.post('/inscricoes', verifyToken, inscricoesController.createInscricao);
router.delete('/inscricoes/:id', verifyToken, inscricoesController.deleteInscricaoById);
router.put('/inscricoes/:id', verifyToken, inscricoesController.updateInscricaoById);
router.get('/inscricoes/:id', verifyToken, inscricoesController.getInscricaoById);
router.get('/inscricoes/documento/:documentosCriadosId', verifyToken, inscricoesController.getInscricoesByDocument);

// ROTAS EDITAIS
router.get('/editais', verifyToken, editaisController.getAllEditais);
router.post('/editais', verifyToken, editaisController.createEdital);
router.get('/editais/:id', verifyToken, editaisController.getEditalById);
router.put('/editais/:id', verifyToken, editaisController.updateEditalById);
router.delete('/editais/:id', verifyToken, editaisController.deleteEditalById);
router.get('/editais/bbm/:bbm', verifyToken, editaisController.getEditaisByBBM);



module.exports = router;
