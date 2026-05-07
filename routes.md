Routes fonctionnelles :
**_ POST _**

- auth/register (avec bonne adresse et même adresse)
- auth/login (avec bon et mauvais mdp/mail)
- companies (création d'une entreprise avec nom et sans champs optionelles/ erreur avec le champ nom obligatoire)
- applications (création d'une candidature/ erreur 404 si l'id de l'entreprise est incorrect)
- followup (création d'un rappel en fonction de l'id de la candidature donné/ 404 si l'id est incorrect/erreur 400 si un champ obligatoire est manquant)

**_ GET _**

- candidates/me (retourne bien les infos de l'utilisateur connecté)
- findall companies(retourne bien toutes les entreprises en base)
- findOne companies(retourne la bonne entreprise et en cas d'id incorrect un message d'erreur)
- findAll applications( retourne bien les entreprises)
- findOne application( retourne bien la candidature avec l'id demandée et erreur en cas d'id incorrect)
- findAll followups (retourne bien les suivis de l'id connecté )
- findAllFollowupsById followup ( retourne bien les followups de l'id de la candidature, erreur 404 en cas d'id inexistant)
- findOneFollowupById followup (retourne bien le followup de l'id donné, erreur 404 en cas d'id incorrect)

**_ PATCH _**

- updateApplication (modifie bien la candidature avec l'id donné, retourne une erreur 404 en cas d'id incorrect)
- updateFollowup (modifie bien le rappel avec l'id donné/ retourne une erreur 400 si le body est vide/ erreur 404 si l'id est incorrect)

**_ DELETE _**

- removeApplication ( supprime bien la candidature avec l'id donné et renvoie un message de suppression/ retourne une erreur 404 en cas d'id incorrect)
- removeFollowup (supprime bien le rappel avec l'id donné et envoie un message de suppression / retourne une erreur 404 en cas d'id incorrect)
