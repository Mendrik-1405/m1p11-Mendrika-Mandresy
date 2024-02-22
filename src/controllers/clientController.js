const Client = require('../models/clientModel');
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

    async login(req, res){
        try {
            const clients = await Client.findOne(req.body);
            if (clients==null || req.body.password !== clients.password){
                throw Error("login error")
            }
            const token=jwt.sign({clients},process.env.SECRET_KEY,{expiresIn: '120s'});
            res.cookie("token",token,{httpOnly:true});
            res.status(200).json({token});
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


}
module.exports = new clientController();