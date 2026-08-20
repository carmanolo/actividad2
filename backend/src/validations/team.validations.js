"use strict";
import Joi from "joi";

import { TEAM_PATTERN, MIN_STRING, MAX_STRING, NAME_OBLIGATORY, COUNTRY_OBLIGATORY, TROPHIES_OBLIGATORY, CAMPOS_ADICIONALES } from "../constants/team.constants.js";

export const integrityValidation = Joi.object({
    name_team:Joi.string()
        .min(MIN_STRING)
        .max(MAX_STRING)
        .pattern(TEAM_PATTERN)
        .messages({
             "string.base": "La nombre del equipo debe estar adentro de una cadena de caracteres",}),
    country:Joi.string().pattern(TEAM_PATTERN).messages({
        "string.base": "La país debe estar adentro de una cadena de caracteres",
    }),


    
    trophies: Joi.string()
        .min(MIN_STRING)
        .max(MAX_STRING)
        .pattern(TEAM_PATTERN)
        .messages({
            "String.pattern.base":
            "los trofeos puede contener letras números y guiones bajos",
        }),

})

export const createValidation = Joi.object({

    name_team: Joi.any().required().messages({
        "any.required": NAME_OBLIGATORY,
    }),
    country: Joi.any().required().messages({
        "any.required": COUNTRY_OBLIGATORY
    }),

    trophies: Joi.any().required().messages({
        "any.required": TROPHIES_OBLIGATORY,
    }),

})
  .unknown(false)
  .messages({
    "object.unknown": CAMPOS_ADICIONALES,
  });

export const updateValidation = Joi.object({
    name_team:Joi.any(),
    country:Joi.any(),
    trophies:Joi.any(),
}).min(1).unknown(false).messages({
    "object.min": "Se requiere al menos un campo para actualizar",
    "object.unknown": CAMPOS_ADICIONALES,
});