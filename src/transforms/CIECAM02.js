import { CIECAM02Model } from "../models/CIECAM02";

// Our default CIECAM02 model: D65 Illuminant, average illumination
const model = CIECAM02Model(95.047, 100.0, 108.883, 100.0, 20.0, "average");

export const JCh_to_xyz = model.JCh_to_xyz;
export const xyz_to_JCh = model.xyz_to_JCh;
export const Jab_to_xyz = model.Jab_to_xyz;
export const xyz_to_Jab = model.xyz_to_Jab;
