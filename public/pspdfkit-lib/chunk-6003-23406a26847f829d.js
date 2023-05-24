/*!
 * PSPDFKit for Web 2023.3.0 (https://pspdfkit.com/web)
 *
 * Copyright (c) 2016-2023 PSPDFKit GmbH. All rights reserved.
 *
 * THIS SOURCE CODE AND ANY ACCOMPANYING DOCUMENTATION ARE PROTECTED BY INTERNATIONAL COPYRIGHT LAW
 * AND MAY NOT BE RESOLD OR REDISTRIBUTED. USAGE IS BOUND TO THE PSPDFKIT LICENSE AGREEMENT.
 * UNAUTHORIZED REPRODUCTION OR DISTRIBUTION IS SUBJECT TO CIVIL AND CRIMINAL PENALTIES.
 * This notice may not be removed from this file.
 *
 * PSPDFKit uses several open source third-party components: https://pspdfkit.com/acknowledgements/web/
 */
"use strict";(globalThis.webpackChunkPSPDFKit=globalThis.webpackChunkPSPDFKit||[]).push([[6003],{26003:(e,a,t)=>{t.r(a),t.d(a,{default:()=>p});var r=t(35712);const i="pspdfkit-lib/gdpicture-3b161b3e159f4862f474394c552efa91e864bbe9",d=`${i}/initDotnet.js`;let s;!function(e){e[e.pdf_a_1a=0]="pdf_a_1a",e[e.pdf_a_1b=1]="pdf_a_1b",e[e.pdf_a_2a=2]="pdf_a_2a",e[e.pdf_a_2u=3]="pdf_a_2u",e[e.pdf_a_2b=4]="pdf_a_2b",e[e.pdf_a_3a=5]="pdf_a_3a",e[e.pdf_a_3u=6]="pdf_a_3u",e[e.pdf_a_3b=7]="pdf_a_3b",e[e.pdf_a_4=8]="pdf_a_4",e[e.pdf_a_4e=9]="pdf_a_4e",e[e.pdf_a_4f=10]="pdf_a_4f"}(s||(s={}));const n="/create.pdf",o="/save.pdf";let f=null,_=null;function c(e){let a;(0,r.kG)(_,"GdPicture WebAssembly is not loaded.");for(var t=arguments.length,i=new Array(t>1?t-1:0),d=1;d<t;d++)i[d-1]=arguments[d];for(const e of i)a=Object.assign(i[0],e);const s=JSON.stringify({type:e,...a}),n=JSON.parse(_.CommandHandler(s));if(!n.success)throw new Error(n.errorReason+": "+n.errorMessage+"\n"+n.error);return n}class l{async loadModule(e,a,t){const{Assemblies:r,Module:s}=await async function(e){const{initDotnet:a}=await import(`${e}${d}`);return a(`${e}${i}`)}(e);_=r.GdPictureWasm.API,f=s,c("gdpicture/setLicense",{origin:a},{licenseKey:t||"DEMO_PSPDFKIT_WEB"})}toPdf(e,a){f.FS.writeFile(n,new Uint8Array(e));const t={file:o};a&&a in s&&(t.conformance=a);try{return c("gdpicture/process",{input:{file:n},output:t}),f.FS.readFile(o).buffer}finally{try{f.FS.unlink(o)}catch(e){}}}}const p=class{constructor(e){let{baseUrl:a,mainThreadOrigin:t,licenseKey:r}=e;this.gdPicture=new l,this.moduleLoadPromise=this.gdPicture.loadModule(a,t,r)}async toPdf(e,a){let t;return this.moduleLoadPromise&&await this.moduleLoadPromise,a&&(t=a.replace("pdf","pdf_").replaceAll("-","_")),this.gdPicture.toPdf(e,t)}destroy(){}}}}]);