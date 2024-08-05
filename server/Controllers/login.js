import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
import { getAll } from "./baseServer.js";
import { secretKey } from '../config.js';

export const checkLogin = async (req, res) => {
  const { mail, password, permission } = req.body;

  let usersData = [] 
  await getAll("users").then(data => usersData = data)

  // Vérifiez les informations d'identification de l'utilisateur
  let authenticatedUser = usersData.find(user => user.מייל === mail && user.סיסמה === password && user.הרשאה === permission)

  if (authenticatedUser) {
    // Comparez les mots de passe en utilisant bcrypt
    // const match = await bcrypt.compare(password, authenticatedUser.סיסמה);

    // if (match) {
        // Créez le token JWT
        const token = jwt.sign(
          { id: authenticatedUser.id, הרשאה: authenticatedUser.הרשאה }, // Payload
          secretKey,                        // Clé secrète
          { expiresIn: '1h' }               // Durée de validité du token
        );
  
        res.json({
          token, // Envoyez le token au client
          authenticatedUser   // Envoyez aussi les informations utilisateur si nécessaire
        });
      } else {
        res.status(401).json({ message: 'Identifiants invalides' });
      }
    // } else {
    //   res.status(401).json({ message: 'Identifiants invalides' });
    // }
  };