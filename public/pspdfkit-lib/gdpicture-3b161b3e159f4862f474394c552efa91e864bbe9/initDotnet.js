import{dotnet}from"./dotnet.js";export async function initDotnet(e){const{getAssemblyExports:t,getConfig:o,Module:i}=await dotnet.withModuleConfig({locateFile:t=>`${e}/${t}`}).create();globalThis.gdPicture={module:i,baseUrl:e};const s=await t(o().mainAssemblyName);return await s.GdPictureWasm.API.Initialize(),{Assemblies:s,Module:i,ResolvedBaseUrl:e}}