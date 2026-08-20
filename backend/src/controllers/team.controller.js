"use strict";
import { createteamser, updateteamSer, getteamsSer, deleteteamSer, getTeamSer } from "../services/team.service.js";
import { handleSuccess, handleErrorClient, handleErrorServer } from "../handlers/responseHandlers.js";
import { createValidation, integrityValidation, updateValidation } from "../validations/team.validations.js";

export async function createTeam(req, res) {
    try {
        let newTeam = null;
        if(!req.body || !req.params){
            return res.status(400).json({ message: "Datos no proporcionados"});
        }
        
        const { name_team, country, trophies} = req.body;

        const { error } = integrityValidation.validate(req.body);

        if (error) {
            return handleErrorClient(res, 400, "Parámetros inválidos", error.message);
        }

        let result = createValidation.validate(req.body);
        if(result.error){
            return handleErrorClient(res, 400, "faltan parametros", result.error.message);
        }


        if(newTeam = await createteamser( name_team, country, trophies)){
            return res.status(201).json({  message: "team registrado exitosamente",data:newTeam });
        }else{
            return res.status(500).json({ message: "Error al registrar team" })
        }
    } catch (error) {
        console.error("error en registro de usuario", error);
        return res.status(500).json({ message: "Error al registar la team" });
    }
}

export async function getTeams(req, res) {
  try {
    const [teams, errorTeams] = await getteamsSer();

    if (errorTeams) return handleErrorClient(res, 404, errorTeams);

    teams.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Teams encontrados", teams);
  } catch (error) {
    handleErrorServer( res, 500, error.message);
  }
}
export async function patchTeam(req, res) {

    try {
        if (!req || !req.params || !req.body) {
            return res.status(400).json({ message: "Datos no proporcionados" });
        }

        const { id_team } = req.params;
        console.log(id_team);
        if(!id_team){
            return res.status(400).json({ message: "El ID de la team es obligatorio" });
        }

        const { error } = integrityValidation.validate(req.body);
        if (error) {        
            return handleErrorClient(res, 400, "Parámetros inválidos", error.message);
        }

        let result = updateValidation.validate(req.body);

        if(result.error){            
            return handleErrorClient(res, 400, "falto actualizar parametros", result.error.message);
        }

        const teamUpdate = await getTeamSer(id_team);

        if(!teamUpdate){
            return handleErrorClient(res, 404, "team no encontrada");
        }

        Object.assign(teamUpdate, req.body);
        Object.assign(teamUpdate);
        const updatedteam = await updateteamSer(teamUpdate);
        if(!(updatedteam.data)){
            if(!updatedteam.error){
                return handleErrorClient(res, 500, updatedteam.message);
            }
            return handleErrorClient(res, 400, updatedteam.message);
        }
        return handleSuccess(res, 200, "team actualizada con éxito", updatedteam.data);

    } catch (error) {
        return handleErrorServer(res, 500, error.message);
    }
    
}

export async function deleteTeam(req, res) {
    try {
        const { id_team } = req.params;
        if(!id_team){
            return res.status(400).json({ message: "El ID de la team es obligatorio" });
        }

        const result = await deleteteamSer(id_team);
        if(result && result.result && result.result.affected >=1){
            return handleSuccess(res, 200, "team eliminado exitosamente")
        }


        return handleErrorClient(res, 400, result.message, result.result);
    } catch (error) {
        return handleErrorServer(res, 500,  error.message);
    }
}