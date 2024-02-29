const Client = require('../models/clientModel');
const jwt=require('jsonwebtoken');
//EMAIL
const nodemailer = require('nodemailer');

class clientController {
    async create(req, res) {
        try {
            const client = new Client(req.body);
            await client.save();
            res.status(201).json(client);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }

    async update(req, res) {
        try {
            const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(client);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }

    async findById(req, res) {
        try {
            const client = await Client.findById(req.params.id);
            res.status(200).json(client);
        } catch (err) {
            res.status(404).send({ message: err.message });
        }
    }

    async findAll(req, res) {
        try {
            const clients = await Client.find({});
            res.status(200).json(clients);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
    
    async delete(req, res) {
        try {
            await Client.findByIdAndDelete(req.params.id);
            res.status(204).send();
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }

    async getClientRdvs(req, res) {
        try {
            const clientId = req.params.id;
            console.log(clientId);

            const client = await Client.findById(clientId).populate({
                path: 'rendezVous',
                populate: {
                    path: 'serviceEmpl',
                    populate: [
                        { path: 'service', model: 'Service' },
                        { path: 'employe', model: 'Employe' }
                    ]
                }
            });
    
            if (!client) {
                return res.status(404).json({ message: "Client non trouvé" });
            }
            console.log("client: ", client);
    
            const rendezVousClients = client.rendezVous.map(rdv => {
                const serviceEmpl = rdv.serviceEmpl[0];
    
                // Vérifier si les champs requis sont définis
                if (!serviceEmpl || !serviceEmpl.service || !serviceEmpl.employe) {
                    console.error("Données de rendez-vous incomplètes:", rdv);
                    //return null; // Ignorer ce rendez-vous s'il manque des données
                }
    
                const service = serviceEmpl.service;
                console.log("SERVICE: ", service);
                const employe = serviceEmpl.employe;
                console.log("EMPLOYE: ", employe);
    
                return {
                    _id: rdv._id,
                    dateheure: rdv.dateheure.toISOString(),
                    service: service.nom,
                    photoService: service.photo,
                    employe: employe.name,
                    photoEmploye: employe.photo
                };
            }).filter(Boolean);
    
            res.status(200).json(rendezVousClients);
    
        } catch (error) {
            console.error('Erreur lors de la récupération des rendez-vous du client :', error);
            res.status(500).json({ message: "Erreur lors de la récupération des rendez-vous du client" });
        }
    }

    async login(req, res){
        try {
            const clients = await Client.findOne(req.body);
            if (clients==null || req.body.password !== clients.password){
                res.status(204).json(clients);
            }else{
            const token=jwt.sign({ id: clients._id.toString() },process.env.SECRET_KEY,{expiresIn:'120s'});
            console.log(token);
            res.cookie("token",token,{httpOnly:true,secure: true,sameSite:'None'});
            res.status(200).json(clients);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async sendEmail(req,res) {
        // Configurer le transporteur (sender)
        let transporter = nodemailer.createTransport({
            service: 'gmail', // Remplacez-le par le service de votre fournisseur de messagerie (ex: 'hotmail')
            auth: {
                user: req.senderEmail, // Votre adresse email
                pass: req.senderPassword // Votre mot de passe
            }
        });
        
        // Définir les options de l'email
        let mailOptions = {
            from: req.senderEmail, // L'adresse email expéditeur
            to: req.recipient, // L'adresse email du destinataire
            subject: req.subject, // Sujet de l'email
            text: req.message // Corps de l'email au format texte brut
            // Vous pouvez également utiliser 'html' au lieu de 'text' pour envoyer un email au format HTML
        };
        
        try {
            // Envoyer l'email
            let info = await transporter.sendMail(mailOptions);
            console.log('Email envoyé: %s', info.messageId);
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            return false;
        }
    }

    async getServicePref(req, res) {
        try {
            const clientId = req.params.id;
            console.log(clientId);

            const client = await Client.findById(clientId).populate(
                {path: 'servicesPref', model: 'Service'}
            );
    
            if (!client) {
                return res.status(404).json({ message: "Client non trouvé" });
            }
            console.log("client: ", client);
    
            const servicePrefs = client.servicesPref.map(service => {
                return {
                    _id: service._id,
                    nom: service.nom,
                    photo: service.photo
                };
            });
    
            res.status(200).json(servicePrefs);
    
        } catch (error) {
            console.error('Erreur lors de la récupération des services favoris du client :', error);
            res.status(500).json({ message: "Erreur lors de la récupération des services favoris du client" });
        }
    }

    async getEmployePref(req, res) {
        try {
            const clientId = req.params.id;
            console.log(clientId);

            const client = await Client.findById(clientId).populate(
                {path: 'employesPref', model: 'Employe'}
            );
    
            if (!client) {
                return res.status(404).json({ message: "Client non trouvé" });
            }
            console.log("client: ", client);
    
            const employesPrefs = client.employesPref.map(employe => {
                return {
                    _id: employe._id,
                    nom: employe.nom,
                    photo: employe.photo
                };
            });
    
            res.status(200).json(employesPrefs);
    
        } catch (error) {
            console.error('Erreur lors de la récupération des employés favoris du client :', error);
            res.status(500).json({ message: "Erreur lors de la récupération des employés favoris du client" });
        }
    }


}
module.exports = new clientController();