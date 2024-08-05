import jwt from 'jsonwebtoken';
import { secretKey } from '../config.js';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrait le token du header

    if (token == null) return res.sendStatus(401); // Si aucun token, accès refusé

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); // Si le token n'est pas valide, accès interdit

        req.user = user; // Stocke les informations du user dans la requête
        next(); // Passe au middleware suivant ou au handler de la route
    });
};