import TeamSchema from "../entity/team.js";
import { AppDataSource } from "../config/configDb.js";


export async function getTeamSer(id_team) {
    try{
        const teamRepository = AppDataSource.getRepository(TeamSchema);
        const team = await teamRepository.findOne({
            where: {id_team: id_team}, 
        });
        return team;
    }catch(error){
        console.error("Error al obtener el equipo", error);
        return [null, "Error interno del servidor"]
    }
}

export async function createteamser(name_team, country, trophies) {

  const teamRepository = AppDataSource.getRepository(TeamSchema);

  try {
    if (!name_team||!country||!trophies) {
      throw Error("Función mal llamada", { tipo, descripcion, fecha_team, hora_inicio, hora_fin, dia, estado_team, id_profesor, id_auto });
    }

    const newTeam = teamRepository.create({
        name_team,
        country,
        trophies
    });
    await teamRepository.save(newTeam);
    return newTeam;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getteamsSer() {
    try {
        const teamRepository = AppDataSource.getRepository(TeamSchema);

        const teams = await teamRepository.find();

        if (!teams || teams.length === 0) return [null, "No hay teams"];

        return [teams, null];

    } catch (error) {
        console.error("Error al obtener las teams:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateteamSer(team) {
  const teamRepository = AppDataSource.getRepository(TeamSchema);
  try{
    if(!team){
      throw new Error("Funcion mal llamada");
    } 
    // console.log(team);
    const savedteam = await teamRepository.save(team);
    // console.log(savedteam);
    return {data: await savedteam, message: "team actualizada con éxito", error: null}
    
  }catch(error){
    console.error("Error al actualizar el horario:", error);
    return [null, "Error interno del servidor"];
  }
  
}

export async function deleteteamSer(id_team) {
  try{
    const teamRepository = AppDataSource.getRepository(TeamSchema);
    let team = await teamRepository.findOne({ where: { id_team:id_team } });

    if(!team){
      return { result: null, message: "team no encontrado" };
    }

    return{
      result: (await teamRepository.delete({ id_team: team.id_team })),
      message: "team eliminado exitosamente"
    };
  } catch (error){
    console.error(error);
    return { result: null, message: "Error al eliminar la team" };
  }
}

