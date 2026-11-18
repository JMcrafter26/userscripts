// ==UserScript==
// @name         FMHY ENHANCEMENTS
// @namespace    fmhy-enhancements
// @version      2.0.0
// @author       Cufiy
// @description  A userscript that enhances the functionality of FMHY, e.g. by allowing to save links for later reading.
// @icon         https://fmhy.net/fmhy.ico
// @match        https://fmhy.net/*
// @match        https://www.fmhy.net/*
// @match        https://fmhy.pages.dev/*
// @match        https://fmhyclone.pages.dev/*
// @match        https://fmhy.vercel.app/*
// @match        https://fmhy.xyz/*
// @match        https://fmhy.samidy.com/*
// @match        https://fmhy.jbugel.xyz/*
// @match        https://fmhy.jvbf.dev/*
// @match        https://fmhy.vencat.dev/*
// @match        https://fmhy.ou0.cc/*
// @match        https://fmhy.hoffnungfuerdiezukunft.net/*
// @match        https://a-fmhy.pages.dev/*
// @match        https://fmhy.artistgrid.cx/*
// @match        https://fmhy.artistgrid.pp.ua/*
// @match        https://fmhy.flax.rip/*
// @match        https://fmhy.monochrome.tf/*
// @match        https://fmhy.pp.ua/*
// @match        https://fmhy.prigoana.com/*
// @match        https://fmhy.prigoana.pp.ua/*
// @match        https://fmhy.axinstagram.com/*
// @match        https://fmhy.axintsagram.com/*
// @match        https://fmhy.axinstagram.world/*
// @match        https://fmhy.bid/*
// @match        https://d.fmhy.bid/*
// @match        https://ffmhy.pages.dev/*
// @match        https://retrofmhy.pages.dev/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-end
// ==/UserScript==

(function() {
	"use strict";
	var s$1 = new Set();
	var _css = async (t) => {
		if (s$1.has(t)) return;
		s$1.add(t);
		((c) => {
			if (typeof GM_addStyle === "function") GM_addStyle(c);
			else (document.head || document.documentElement).appendChild(document.createElement("style")).append(c);
		})(t);
	};
	_css("html{--fmhy-sp-radius-sm:6px;--fmhy-sp-radius:10px;--fmhy-sp-radius-lg:14px;--fmhy-sp-green:#239f71;--fmhy-sp-green-soft:hsl(158, 64%, 42% / .13);--fmhy-sp-red:#d32222;--fmhy-sp-red-soft:hsl(0, 72%, 50% / .11);--fmhy-sp-amber:#ce8509;--fmhy-sp-border:var(--vp-c-divider);--fmhy-sp-surface:var(--vp-c-bg);--fmhy-sp-raised:var(--vp-c-bg-elv);--fmhy-sp-muted-surface:var(--vp-c-bg-alt);--fmhy-sp-ring:color-mix(in srgb, var(--vp-c-brand-1) 26%, transparent);--fmhy-sp-brand-tint:color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent);--fmhy-sp-brand-line:color-mix(in srgb, var(--vp-c-brand-1) 38%, transparent);--fmhy-sp-ease:cubic-bezier(.22, 1, .36, 1)}.dark{--fmhy-sp-green:#45d39f;--fmhy-sp-green-soft:hsl(158, 62%, 55% / .14);--fmhy-sp-red:#eb6060;--fmhy-sp-red-soft:hsl(0, 78%, 65% / .14);--fmhy-sp-amber:#f9b643}[class^=fmhy-sp-],[class*=\\ fmhy-sp-]{box-sizing:border-box}.fmhy-sp-sr-only{clip:rect(0, 0, 0, 0);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;position:absolute!important}.fmhy-sp-mono{font-family:var(--vp-font-family-mono);text-overflow:ellipsis;white-space:nowrap;font-size:.92em;overflow:hidden}.fmhy-sp-muted{color:var(--vp-c-text-2)}.fmhy-sp-dot{color:var(--vp-c-text-2);opacity:.8}.fmhy-sp-link-save{width:17px;height:17px;color:var(--vp-c-text-2);vertical-align:-3px;cursor:pointer;touch-action:manipulation;background:0 0;border:0;border-radius:4px;justify-content:center;align-items:center;margin:0 1px 0 3px;padding:0;line-height:1;transition:opacity .16s,transform .16s,color .16s,background-color .16s;display:inline-flex;position:relative}.fmhy-sp-link-save:before{content:\"\";border-radius:7px;position:absolute;top:-6px;bottom:-6px;left:-6px;right:-6px}.fmhy-sp-link-save:hover{color:var(--vp-c-brand-1);background:var(--fmhy-sp-brand-tint)}.fmhy-sp-link-save:focus-visible{outline:2px solid var(--vp-c-brand-1);outline-offset:1px}.fmhy-sp-link-save.is-saved{color:var(--fmhy-sp-green)}.fmhy-sp-link-save.is-saved svg{fill:currentColor}.fmhy-sp-link-save svg{flex:none}@media (hover:hover) and (pointer:fine){html.fmhy-sp-hover-link-actions .fmhy-sp-link-save{z-index:1;width:0;height:18px;box-shadow:none;opacity:0;pointer-events:none;vertical-align:-4px;transition:width .16s var(--fmhy-sp-ease), margin-left .16s var(--fmhy-sp-ease), opacity .16s ease;background:0 0;border:0;margin:0;position:relative;overflow:hidden;transform:none}html.fmhy-sp-hover-link-actions .fmhy-sp-link-save.is-visible{opacity:1;pointer-events:auto;width:18px;margin-left:4px}html.fmhy-sp-hover-link-actions .fmhy-sp-link-save.is-visible.is-saved{color:var(--fmhy-sp-green)}}html.fmhy-sp-dim-visited .vp-doc a[href]:visited{color:color-mix(in srgb, var(--vp-c-brand-1) 55%, transparent);-webkit-text-decoration-color:color-mix(in srgb, var(--vp-c-brand-1) 42%, transparent);text-decoration-color:color-mix(in srgb, var(--vp-c-brand-1) 42%, transparent)}@media (max-width:767px),(hover:none),(pointer:coarse){.fmhy-sp-link-save{width:22px;height:22px;box-shadow:none;vertical-align:-5px;background:0 0;border:0;margin:0 0 0 4px;position:relative}.fmhy-sp-link-save:before{top:-8px;bottom:-8px;left:-8px;right:-8px}html.fmhy-sp-hover-link-actions .fmhy-sp-link-save{z-index:auto;width:22px;height:22px;box-shadow:none;opacity:1;pointer-events:auto;background:0 0;border:0;margin:0 0 0 4px;position:relative;top:auto;left:auto;transform:none}.fmhy-sp-link-save.is-alias,.fmhy-sp-link-save.is-row-secondary{display:none}}.fmhy-sp-nav-count{background:var(--vp-c-brand-1);color:#fff;vertical-align:1px;border-radius:9px;justify-content:center;align-items:center;min-width:18px;height:18px;margin-left:3px;padding:0 6px;font-size:10.5px;font-weight:700;line-height:1;display:inline-flex}.fmhy-sp-nav-count[hidden]{display:none!important}.VPMenu .items>.fmhy-sp-nav-desktop{border-bottom:1px solid var(--fmhy-sp-border);border-top:0!important;margin:0 -12px 8px!important;padding:8px 12px 10px!important}.fmhy-sp-nav-desktop>.link{font-weight:600}.fmhy-sp-nav-mobile .VPNavScreenMenuGroupLink{color:var(--vp-c-text-1);justify-content:space-between;align-items:center;gap:8px;margin-left:12px;font-size:14px;font-weight:400;line-height:32px;transition:color .25s;display:flex}.fmhy-sp-nav-mobile .VPNavScreenMenuGroupLink:hover{color:var(--vp-c-brand-1)}.fmhy-sp-nav-mobile .VPNavScreenMenuGroupLink>span{align-items:center;display:inline-flex}.fmhy-sp-nav-top{color:var(--vp-c-text-1);font-size:14px;font-weight:500;line-height:var(--vp-nav-height);align-items:center;gap:4px;padding:0 12px;transition:color .25s;display:flex}.fmhy-sp-nav-top:hover{color:var(--vp-c-brand-1)}.fmhy-sp-fab{right:max(18px, env(safe-area-inset-right));bottom:max(20px, env(safe-area-inset-bottom));z-index:28;border:1px solid var(--fmhy-sp-border);background:var(--vp-c-bg);width:56px;height:56px;color:var(--vp-c-brand-1);box-shadow:var(--vp-shadow-3);cursor:pointer;touch-action:manipulation;animation:fmhy-sp-fab-in .24s var(--fmhy-sp-ease);border-radius:50%;justify-content:center;align-items:center;margin:0;padding:0;transition:box-shadow .18s,color .18s;display:inline-flex;position:fixed}.fmhy-sp-fab:hover{color:var(--vp-c-brand-2)}.fmhy-sp-fab:active{transform:scale(.94)}.fmhy-sp-fab:focus-visible{outline:2px solid var(--vp-c-brand-1);outline-offset:3px}.fmhy-sp-fab.is-saved{color:var(--fmhy-sp-green)}.fmhy-sp-fab-count{border:2px solid var(--vp-c-bg);background:var(--vp-c-brand-1);color:#fff;border-radius:10px;justify-content:center;align-items:center;min-width:20px;height:20px;padding:0 6px;font-size:10px;font-weight:700;line-height:1;display:inline-flex;position:absolute;top:-4px;right:-3px}@media (min-width:768px) and (pointer:fine){.fmhy-sp-fab{display:none}}.fmhy-sp-toasts{left:50%;bottom:max(22px, env(safe-area-inset-bottom));z-index:105;pointer-events:none;width:min(460px,100vw - 24px);font-family:var(--vp-font-family-base);flex-direction:column;gap:9px;display:flex;position:fixed;transform:translate(-50%)}.fmhy-sp-toast{border:1px solid var(--fmhy-sp-border);border-radius:var(--fmhy-sp-radius);background:var(--vp-c-bg);box-shadow:var(--vp-shadow-3);pointer-events:auto;grid-template-columns:20px minmax(0,1fr) auto;align-items:start;gap:6px 10px;padding:11px 10px 11px 12px;display:grid}.fmhy-sp-toast-icon{color:var(--fmhy-sp-green);grid-area:1/1;margin-top:1px}.fmhy-sp-toast.is-info .fmhy-sp-toast-icon{color:var(--vp-c-brand-1)}.fmhy-sp-toast.is-danger .fmhy-sp-toast-icon{color:var(--fmhy-sp-red)}.fmhy-sp-toast-message{min-width:0;color:var(--vp-c-text-1);overflow-wrap:anywhere;grid-area:1/2;margin:0;font-size:13.5px;font-weight:500;line-height:1.4}.fmhy-sp-toast-close{grid-area:1/3}.fmhy-sp-toast-actions{flex-wrap:wrap;grid-area:2/2/auto/4;gap:6px;display:flex}.fmhy-sp-toast-action{border:1px solid var(--fmhy-sp-brand-line);background:var(--fmhy-sp-brand-tint);height:26px;color:var(--vp-c-brand-1);font-family:var(--vp-font-family-base);cursor:pointer;border-radius:6px;align-items:center;margin:0;padding:0 9px;font-size:11.5px;font-weight:600;line-height:1;transition:background-color .16s,border-color .16s;display:inline-flex}.fmhy-sp-toast-action:hover{border-color:var(--vp-c-brand-1);background:color-mix(in srgb, var(--vp-c-brand-1) 17%, transparent)}.fmhy-sp-toast-enter-active,.fmhy-sp-toast-leave-active,.fmhy-sp-toast-move{transition:opacity .2s ease, transform .2s var(--fmhy-sp-ease)}.fmhy-sp-toast-enter-from,.fmhy-sp-toast-leave-to{opacity:0;transform:translateY(8px)scale(.98)}body.fmhy-sp-page-open .fmhy-sp-toasts{bottom:max(18px, env(safe-area-inset-bottom))}@media (max-width:767px){.fmhy-sp-toasts{bottom:calc(86px + env(safe-area-inset-bottom))}body.fmhy-sp-page-open .fmhy-sp-toasts{bottom:max(18px, env(safe-area-inset-bottom))}body:has(.VPNavBarHamburger[aria-expanded=true]) .fmhy-sp-fab{display:none}body:has(.VPNavBarHamburger[aria-expanded=true]) .fmhy-sp-toasts{display:none}}@media (hover:none){.fmhy-sp-kbd{display:none}}.fmhy-sp-btn{height:38px;font-family:var(--vp-font-family-base);white-space:nowrap;cursor:pointer;border:1px solid #0000;border-radius:8px;justify-content:center;align-items:center;gap:7px;margin:0;padding:0 14px;font-size:13px;font-weight:600;line-height:1;transition:background-color .16s,border-color .16s,color .16s,box-shadow .16s;display:inline-flex}.fmhy-sp-btn:focus-visible{outline:2px solid var(--vp-c-brand-1);outline-offset:2px}.fmhy-sp-icon-button:focus-visible{outline:2px solid var(--vp-c-brand-1);outline-offset:2px}.fmhy-sp-text-button:focus-visible{outline:2px solid var(--vp-c-brand-1);outline-offset:2px}.fmhy-sp-tab:focus-visible{outline:2px solid var(--vp-c-brand-1);outline-offset:2px}.fmhy-sp-collection-option:focus-visible{outline:2px solid var(--vp-c-brand-1);outline-offset:2px}.fmhy-sp-swatch:focus-visible{outline:2px solid var(--vp-c-brand-1);outline-offset:2px}.fmhy-sp-toast-action:focus-visible{outline:2px solid var(--vp-c-brand-1);outline-offset:2px}.fmhy-sp-card-title:focus-visible{outline:2px solid var(--vp-c-brand-1);outline-offset:2px}.fmhy-sp-btn.is-primary{background:var(--vp-c-brand-1);color:#fff;box-shadow:var(--vp-shadow-1)}.fmhy-sp-btn.is-primary:hover{background:var(--vp-c-brand-2)}.fmhy-sp-btn.is-primary:disabled{background:var(--vp-c-default-2);color:var(--vp-c-text-3);box-shadow:none;cursor:not-allowed}.fmhy-sp-btn.is-secondary{border-color:var(--fmhy-sp-border);background:var(--vp-c-bg-soft);color:var(--vp-c-text-1)}.fmhy-sp-btn.is-secondary:hover{border-color:var(--vp-c-brand-1);color:var(--vp-c-brand-1)}.fmhy-sp-btn.is-danger{background:var(--fmhy-sp-red);color:#fff}.fmhy-sp-btn.is-danger:hover{filter:brightness(1.08)}.fmhy-sp-btn.is-danger-ghost{color:var(--fmhy-sp-red);background:0 0;margin-right:auto;padding-left:10px;padding-right:10px}.fmhy-sp-btn.is-danger-ghost:hover{background:var(--fmhy-sp-red-soft)}.fmhy-sp-btn.is-small{border-radius:6px;height:30px;padding:0 10px;font-size:12px}.fmhy-sp-icon-button{width:32px;height:32px;color:var(--vp-c-text-2);cursor:pointer;background:0 0;border:0;border-radius:7px;justify-content:center;align-items:center;margin:0;padding:0;transition:color .16s,background-color .16s;display:inline-flex}.fmhy-sp-icon-button:hover{background:var(--vp-c-default-soft);color:var(--vp-c-text-1)}.fmhy-sp-icon-button.is-small{border-radius:6px;width:27px;height:27px}.fmhy-sp-icon-button.is-active{background:var(--fmhy-sp-brand-tint);color:var(--vp-c-brand-1)}.fmhy-sp-icon-button.is-danger:hover{background:var(--fmhy-sp-red-soft);color:var(--fmhy-sp-red)}.fmhy-sp-text-button{color:var(--vp-c-brand-1);font-family:var(--vp-font-family-base);cursor:pointer;background:0 0;border:0;border-radius:6px;align-items:center;gap:6px;margin:0;padding:4px 6px;font-size:13px;font-weight:600;line-height:1.3;transition:color .16s,background-color .16s;display:inline-flex}.fmhy-sp-text-button:hover{background:var(--fmhy-sp-brand-tint)}.fmhy-sp-text-button.is-small{padding:2px 5px;font-size:12px;font-weight:500}.fmhy-sp-input,.fmhy-sp-textarea{border:1px solid var(--fmhy-sp-border);background:var(--vp-c-bg);width:100%;color:var(--vp-c-text-1);font-family:var(--vp-font-family-base);border-radius:8px;outline:none;margin:0;padding:9px 10px;font-size:13.5px;line-height:1.4;transition:border-color .16s,box-shadow .16s;display:block}.fmhy-sp-input.is-compact{height:30px;padding:4px 8px;font-size:12.5px}.fmhy-sp-textarea{resize:vertical;min-height:74px}.fmhy-sp-input:focus,.fmhy-sp-textarea:focus{border-color:var(--vp-c-brand-1);box-shadow:0 0 0 3px var(--fmhy-sp-ring)}.fmhy-sp-input:disabled{background:var(--vp-c-bg-alt);color:var(--vp-c-text-3);cursor:not-allowed}.fmhy-sp-error{color:var(--fmhy-sp-red);margin:8px 0 0;font-size:12px;line-height:1.4}.fmhy-sp-hint{color:var(--vp-c-text-2);margin:14px 0 0;font-size:12px;line-height:1.55}.fmhy-sp-hidden-input{display:none}.fmhy-sp-editor-layer{z-index:100;font-family:var(--vp-font-family-base);position:fixed;top:0;bottom:0;left:0;right:0}.fmhy-sp-editor-backdrop{background:#02061080;animation:.18s ease-out fmhy-sp-fade;position:absolute;top:0;bottom:0;left:0;right:0}.dark .fmhy-sp-editor-backdrop{background:#000000a3}.fmhy-sp-editor{z-index:1;border:1px solid var(--fmhy-sp-border);border-radius:var(--fmhy-sp-radius-lg);background:var(--vp-c-bg);max-height:min(82dvh,720px);color:var(--vp-c-text-1);box-shadow:var(--vp-shadow-3);flex-direction:column;animation:.16s ease-out fmhy-sp-fade;display:flex;position:fixed;overflow:hidden}.fmhy-sp-editor.is-sheet{width:100%;max-height:90dvh;animation:fmhy-sp-sheet-up .26s var(--fmhy-sp-ease);border-bottom:0;border-left:0;border-right:0;border-radius:18px 18px 0 0;bottom:0;left:0;right:0}.fmhy-sp-sheet-grip{background:var(--vp-c-divider);border-radius:2px;flex:none;width:38px;height:4px;margin:8px auto 0}.fmhy-sp-editor-head{border-bottom:1px solid var(--fmhy-sp-border);flex:none;justify-content:space-between;align-items:flex-start;gap:12px;padding:17px 18px 13px;display:flex}.fmhy-sp-editor.is-sheet .fmhy-sp-editor-head{padding-top:11px}.fmhy-sp-editor-heading{min-width:0}.fmhy-sp-editor-heading h2{color:var(--vp-c-text-1);letter-spacing:-.01em;overflow-wrap:anywhere;margin:3px 0 0;padding:0;font-size:17px;font-weight:650;line-height:1.35}.fmhy-sp-editor-sub{color:var(--vp-c-text-2);flex-wrap:wrap;align-items:center;gap:5px;margin:5px 0 0;font-size:11.5px;line-height:1.4;display:flex}.fmhy-sp-editor-sub .fmhy-sp-mono{max-width:100%}.fmhy-sp-editor-body{overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--vp-c-divider) transparent;flex:1;min-height:0;padding:16px 18px 18px;overflow-y:auto}.fmhy-sp-field{margin-bottom:18px}.fmhy-sp-field:last-child{margin-bottom:0}.fmhy-sp-field-label{color:var(--vp-c-text-1);letter-spacing:.01em;justify-content:space-between;align-items:baseline;gap:10px;margin:0 0 7px;font-size:12px;font-weight:600;display:flex}.fmhy-sp-field-label.fmhy-sp-field-spaced{margin-top:18px}.fmhy-sp-field-label .fmhy-sp-muted{font-size:11px;font-weight:400}.fmhy-sp-collection-list{border:1px solid var(--fmhy-sp-border);background:var(--vp-c-bg-alt);scrollbar-width:thin;border-radius:9px;flex-direction:column;gap:3px;max-height:174px;padding:3px;display:flex;overflow-y:auto}.fmhy-sp-collection-option{width:100%;min-height:34px;color:var(--vp-c-text-1);font-family:var(--vp-font-family-base);text-align:left;cursor:pointer;background:0 0;border:1px solid #0000;border-radius:6px;align-items:center;gap:9px;margin:0;padding:5px 8px;font-size:13px;line-height:1.3;transition:background-color .14s,border-color .14s;display:flex}.fmhy-sp-collection-option:hover{background:var(--vp-c-bg-soft)}.fmhy-sp-collection-option.is-selected{border-color:var(--fmhy-sp-brand-line);background:var(--fmhy-sp-brand-tint)}.fmhy-sp-check-box{border:1.5px solid var(--vp-c-default-3);color:#fff;border-radius:4px;flex:none;justify-content:center;align-items:center;width:16px;height:16px;transition:background-color .14s,border-color .14s;display:inline-flex}.fmhy-sp-check-box.is-checked{border-color:var(--vp-c-brand-1);background:var(--vp-c-brand-1)}.fmhy-sp-collection-dot{border-radius:50%;flex:none;width:9px;height:9px;display:inline-block}.fmhy-sp-collection-name{text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;overflow:hidden}.fmhy-sp-collection-count{background:var(--vp-c-default-soft);min-width:18px;color:var(--vp-c-text-2);text-align:center;border-radius:7px;flex:none;padding:1px 5px;font-size:10.5px;font-weight:600;line-height:1.5}.fmhy-sp-new-collection{margin-top:8px}.fmhy-sp-new-collection-form{border:1px dashed var(--fmhy-sp-border);background:var(--vp-c-bg-alt);border-radius:9px;padding:10px;animation:.16s ease-out fmhy-sp-fade}.fmhy-sp-new-collection-row{align-items:center;gap:6px;display:flex}.fmhy-sp-new-collection-row .fmhy-sp-input{flex:1;min-width:0;height:32px}.fmhy-sp-swatches{flex-wrap:wrap;gap:8px;display:flex}.fmhy-sp-new-collection-form .fmhy-sp-swatches{margin-top:9px}.fmhy-sp-swatch{color:#fff;width:24px;height:24px;box-shadow:var(--vp-shadow-1);cursor:pointer;border:2px solid #0000;border-radius:50%;justify-content:center;align-items:center;margin:0;padding:0;transition:transform .14s,box-shadow .14s;display:inline-flex}.fmhy-sp-swatch:hover{transform:scale(1.1)}.fmhy-sp-swatch.is-active{box-shadow:0 0 0 2px var(--vp-c-bg), 0 0 0 4px var(--vp-c-brand-1)}.fmhy-sp-context{background:var(--vp-c-bg-alt);color:var(--vp-c-text-2);border-radius:7px;margin:0;padding:8px 10px;font-size:11.5px;line-height:1.5}.fmhy-sp-context strong{color:var(--vp-c-text-2);font-weight:600}.fmhy-sp-editor-footer{padding:12px 18px;padding-bottom:max(12px, env(safe-area-inset-bottom));border-top:1px solid var(--fmhy-sp-border);background:var(--vp-c-bg-alt);flex:none;align-items:center;gap:8px;display:flex}.fmhy-sp-editor-spacer{flex:1}html.fmhy-sp-page-open{scrollbar-gutter:stable;overflow:hidden}body.fmhy-sp-page-open{overflow:hidden}.fmhy-sp-page{top:var(--vp-nav-height);z-index:29;overscroll-behavior:contain;background:var(--vp-c-bg);color:var(--vp-c-text-1);font-family:var(--vp-font-family-base);scrollbar-width:thin;scrollbar-color:var(--vp-c-divider) transparent;animation:.18s ease-out fmhy-sp-fade;position:fixed;bottom:0;left:0;right:0;overflow:hidden auto}.fmhy-sp-page:focus{outline:none}.fmhy-sp-page-shell{width:100%;max-width:1120px;padding:26px 24px max(58px, calc(34px + env(safe-area-inset-bottom)));margin:0 auto}.fmhy-sp-page-top{justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px;display:flex}.fmhy-sp-page-header{padding:4px 0 0}.fmhy-sp-page-header h1{color:var(--vp-c-brand-1);letter-spacing:-.025em;text-underline-offset:8px;margin:7px 0 0;padding:0;font-size:clamp(31px,4.6vw,43px);font-weight:700;line-height:1.08;text-decoration-line:underline;text-decoration-thickness:2px}.fmhy-sp-page-header>p{max-width:680px;color:var(--vp-c-text-2);margin:15px 0 0;font-size:14px;line-height:1.65}.fmhy-sp-stats{flex-wrap:wrap;gap:7px;margin-top:17px;display:flex}.fmhy-sp-stat{border:1px solid var(--fmhy-sp-border);background:var(--vp-c-bg-soft);color:var(--vp-c-text-2);border-radius:999px;align-items:center;gap:6px;padding:5px 10px;font-size:11.5px;line-height:1.4;display:inline-flex}.fmhy-sp-stat svg{color:var(--vp-c-brand-1)}.fmhy-sp-stat strong{color:var(--vp-c-text-1);font-weight:650}.fmhy-sp-toolbar{align-items:center;gap:9px;margin:24px 0 15px;display:flex}.fmhy-sp-search{flex:1;min-width:0;position:relative}.fmhy-sp-search-icon{z-index:1;color:var(--vp-c-text-2);pointer-events:none;position:absolute;top:50%;left:12px;transform:translateY(-50%)}.fmhy-sp-search-input{border:1px solid var(--fmhy-sp-border);background:var(--vp-c-bg-alt);width:100%;height:42px;color:var(--vp-c-text-1);font-family:var(--vp-font-family-base);border-radius:9px;outline:none;margin:0;padding:0 42px 0 38px;font-size:13.5px;line-height:1;transition:border-color .16s,box-shadow .16s,background-color .16s;display:block}.fmhy-sp-search-input::placeholder{color:var(--vp-c-text-2)}.fmhy-sp-search-input:focus{border-color:var(--vp-c-brand-1);background:var(--vp-c-bg);box-shadow:0 0 0 3px var(--fmhy-sp-ring)}.fmhy-sp-search-input::-webkit-search-cancel-button{-webkit-appearance:none}.fmhy-sp-search-input::-webkit-search-decoration{-webkit-appearance:none}.fmhy-sp-kbd{border:1px solid var(--fmhy-sp-border);background:var(--vp-c-bg);min-width:20px;color:var(--vp-c-text-2);font-family:var(--vp-font-family-mono);text-align:center;pointer-events:none;border-bottom-width:2px;border-radius:5px;padding:2px 5px;font-size:11px;line-height:1.2;position:absolute;top:50%;right:10px;transform:translateY(-50%)}.fmhy-sp-search-clear{position:absolute;top:50%;right:7px;transform:translateY(-50%)}.fmhy-sp-toolbar>.fmhy-sp-btn{flex:none;height:42px}.fmhy-sp-tabs{border-bottom:1px solid var(--fmhy-sp-border);scrollbar-width:none;align-items:center;gap:5px;padding:0 0 11px;display:flex;overflow-x:auto}.fmhy-sp-tabs::-webkit-scrollbar{display:none}.fmhy-sp-tab{height:32px;color:var(--vp-c-text-2);font-family:var(--vp-font-family-base);white-space:nowrap;cursor:pointer;background:0 0;border:1px solid #0000;border-radius:999px;flex:none;align-items:center;gap:6px;margin:0;padding:0 11px;font-size:12.5px;font-weight:500;line-height:1;transition:background-color .16s,border-color .16s,color .16s;display:inline-flex}.fmhy-sp-tab:hover{background:var(--vp-c-default-soft);color:var(--vp-c-text-1)}.fmhy-sp-tab.is-active{border-color:var(--fmhy-sp-brand-line);background:var(--fmhy-sp-brand-tint);color:var(--vp-c-brand-1);font-weight:600}.fmhy-sp-tab.is-add{color:var(--vp-c-text-2);margin-left:2px}.fmhy-sp-tab.is-add:hover{color:var(--vp-c-brand-1)}.fmhy-sp-tab-count{background:var(--vp-c-default-soft);min-width:17px;color:var(--vp-c-text-2);text-align:center;border-radius:7px;padding:1px 5px;font-size:10px;font-weight:600;line-height:1.5}.fmhy-sp-tab.is-active .fmhy-sp-tab-count{background:color-mix(in srgb, var(--vp-c-brand-1) 16%, transparent);color:var(--vp-c-brand-1)}.fmhy-sp-results-head{flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin:17px 0 13px;display:flex}.fmhy-sp-results-copy{color:var(--vp-c-text-2);flex-wrap:wrap;align-items:baseline;gap:4px 7px;font-size:12px;line-height:1.4;display:flex}.fmhy-sp-results-copy strong{color:var(--vp-c-text-1);font-size:13px;font-weight:650}.fmhy-sp-controls{flex-wrap:wrap;align-items:center;gap:6px;display:flex}.fmhy-sp-select-wrap{align-items:center;display:inline-flex;position:relative}.fmhy-sp-select{border:1px solid var(--fmhy-sp-border);background:var(--vp-c-bg-alt);max-width:184px;height:32px;color:var(--vp-c-text-1);font-family:var(--vp-font-family-base);cursor:pointer;-webkit-appearance:none;appearance:none;border-radius:7px;outline:none;margin:0;padding:0 28px 0 9px;font-size:12px;line-height:1;transition:border-color .16s,box-shadow .16s}.fmhy-sp-select:focus{border-color:var(--vp-c-brand-1);box-shadow:0 0 0 3px var(--fmhy-sp-ring)}.fmhy-sp-select-icon{color:var(--vp-c-text-2);pointer-events:none;position:absolute;right:8px}.fmhy-sp-view-toggle{border:1px solid var(--fmhy-sp-border);background:var(--vp-c-bg-alt);border-radius:8px;align-items:center;padding:2px;display:inline-flex}.fmhy-sp-view-toggle .fmhy-sp-icon-button{border-radius:5px;width:27px;height:26px}.fmhy-sp-cards{grid-template-columns:repeat(auto-fill,minmax(min(100%,292px),1fr));gap:13px;display:grid}.fmhy-sp-card{border:1px solid var(--fmhy-sp-border);background:var(--vp-c-bg-alt);min-width:0;box-shadow:var(--vp-shadow-1);border-radius:10px;flex-direction:column;padding:13px 14px 11px;transition:border-color .18s,box-shadow .18s;display:flex;position:relative}.fmhy-sp-card:hover{border-color:var(--fmhy-sp-brand-line);box-shadow:var(--vp-shadow-2)}.fmhy-sp-card-head{justify-content:space-between;align-items:flex-start;gap:8px;display:flex}.fmhy-sp-card-actions{opacity:.66;flex:none;gap:1px;margin:-3px -4px 0 0;transition:opacity .16s;display:flex}.fmhy-sp-card:hover .fmhy-sp-card-actions,.fmhy-sp-card:focus-within .fmhy-sp-card-actions{opacity:1}@media (hover:none){.fmhy-sp-card-actions{opacity:1}}.fmhy-sp-card-title{min-width:0;color:var(--vp-c-text-1);letter-spacing:-.012em;overflow-wrap:anywhere;flex:1;margin:0;font-size:15.5px;font-weight:650;line-height:1.32;text-decoration:none;transition:color .16s}.fmhy-sp-card-title:hover{color:var(--vp-c-brand-1);text-underline-offset:2px;text-decoration:underline}.fmhy-sp-card-desc{color:var(--vp-c-text-2);-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;margin:6px 0 0;font-size:12.5px;line-height:1.5;display:-webkit-box;overflow:hidden}.fmhy-sp-card-note{background:var(--vp-c-bg-soft);color:var(--vp-c-text-2);-webkit-line-clamp:2;line-clamp:2;border-radius:6px;-webkit-box-orient:vertical;margin:8px 0 0;padding:5px 8px;font-size:11.5px;font-style:italic;line-height:1.5;display:-webkit-box;overflow:hidden}.fmhy-sp-card-details{border-top:1px dashed var(--fmhy-sp-border);gap:5px;margin-top:9px;padding-top:9px;display:grid}.fmhy-sp-card-detail{min-width:0;color:var(--vp-c-text-2);align-items:baseline;gap:8px;font-size:11px;line-height:1.45;display:flex}.fmhy-sp-card-detail-label{min-width:46px;color:var(--vp-c-text-2);flex:none;font-size:10.5px}.fmhy-sp-card-detail>span:last-child{overflow-wrap:anywhere;min-width:0}.fmhy-sp-card-footer{border-top:1px dashed var(--fmhy-sp-border);justify-content:space-between;align-items:center;gap:8px;margin-top:auto;padding-top:10px;display:flex}.fmhy-sp-card-collections{flex-wrap:wrap;align-items:center;gap:4px;min-width:0;display:flex}.fmhy-sp-mini-chip{border:1px solid var(--fmhy-sp-border);background:var(--vp-c-bg-soft);max-width:132px;color:var(--vp-c-text-2);text-overflow:ellipsis;white-space:nowrap;border-radius:999px;align-items:center;gap:4px;padding:2px 7px;font-size:10px;line-height:1.5;display:inline-flex;overflow:hidden}.fmhy-sp-mini-chip .fmhy-sp-collection-dot{width:6px;height:6px}.fmhy-sp-card-date{color:var(--vp-c-text-2);white-space:nowrap;flex:none;margin-left:auto;font-size:10.5px}.fmhy-sp-cards.is-list{grid-template-columns:minmax(0,1fr)}.fmhy-sp-cards.is-list .fmhy-sp-card{padding:13px 16px 12px}.fmhy-sp-cards.is-list .fmhy-sp-card-title{font-size:15.5px}.fmhy-sp-cards.is-list .fmhy-sp-card-desc{-webkit-line-clamp:2;line-clamp:2;margin-top:4px}.fmhy-sp-cards.is-list .fmhy-sp-card-footer{padding-top:7px}.fmhy-sp-empty{text-align:center;flex-direction:column;align-items:center;padding:58px 20px 52px;display:flex}.fmhy-sp-empty-icon{border:1px solid var(--fmhy-sp-brand-line);background:var(--fmhy-sp-brand-tint);width:60px;height:60px;color:var(--vp-c-brand-1);border-radius:50%;justify-content:center;align-items:center;display:inline-flex}.fmhy-sp-empty h2{color:var(--vp-c-text-1);letter-spacing:-.01em;border:0;margin:15px 0 0;padding:0;font-size:19px;font-weight:650;line-height:1.3}.fmhy-sp-empty p{max-width:430px;color:var(--vp-c-text-2);margin:7px 0 17px;font-size:13px;line-height:1.6}.fmhy-sp-privacy{color:var(--vp-c-text-2);text-align:center;justify-content:center;align-items:center;gap:5px;margin:28px 0 0;font-size:11px;line-height:1.4;display:flex}.fmhy-sp-menu-wrap{position:relative}.fmhy-sp-menu{z-index:2;border:1px solid var(--fmhy-sp-border);background:var(--vp-c-bg);min-width:224px;box-shadow:var(--vp-shadow-3);animation:fmhy-sp-menu-in .14s var(--fmhy-sp-ease);border-radius:10px;padding:5px;position:absolute;top:calc(100% + 7px);right:0}.fmhy-sp-menu>button{width:100%;height:34px;color:var(--vp-c-text-1);font-family:var(--vp-font-family-base);text-align:left;cursor:pointer;background:0 0;border:0;border-radius:6px;align-items:center;gap:9px;margin:0;padding:0 9px;font-size:12.5px;line-height:1;transition:color .14s,background-color .14s;display:flex}.fmhy-sp-menu>button:hover{background:var(--vp-c-default-soft);color:var(--vp-c-brand-1)}.fmhy-sp-menu>button.is-danger{color:var(--fmhy-sp-red)}.fmhy-sp-menu>button.is-danger:hover{background:var(--fmhy-sp-red-soft)}.fmhy-sp-menu-separator{background:var(--fmhy-sp-border);height:1px;margin:4px 5px}.fmhy-sp-modal-layer{z-index:110;font-family:var(--vp-font-family-base);background:#02061085;justify-content:center;align-items:center;padding:20px;animation:.16s ease-out fmhy-sp-fade;display:flex;position:fixed;top:0;bottom:0;left:0;right:0}.dark .fmhy-sp-modal-layer{background:#000000a8}.fmhy-sp-modal{border:1px solid var(--fmhy-sp-border);border-radius:var(--fmhy-sp-radius-lg);background:var(--vp-c-bg);width:min(540px,100%);max-height:min(86dvh,720px);color:var(--vp-c-text-1);box-shadow:var(--vp-shadow-3);animation:fmhy-sp-pop .2s var(--fmhy-sp-ease);flex-direction:column;display:flex;overflow:hidden}.fmhy-sp-modal.is-small{width:min(430px,100%)}.fmhy-sp-modal-head{border-bottom:1px solid var(--fmhy-sp-border);flex:none;justify-content:space-between;align-items:flex-start;gap:12px;padding:18px 19px 13px;display:flex}.fmhy-sp-modal-head h2{color:var(--vp-c-text-1);letter-spacing:-.015em;border:0;margin:4px 0 0;padding:0;font-size:18px;font-weight:650;line-height:1.3}.fmhy-sp-modal-body{overscroll-behavior:contain;scrollbar-width:thin;flex:1;min-height:0;padding:17px 19px;overflow-y:auto}.fmhy-sp-modal-footer{padding:12px 19px;padding-bottom:max(12px, env(safe-area-inset-bottom));border-top:1px solid var(--fmhy-sp-border);background:var(--vp-c-bg-alt);flex-wrap:wrap;flex:none;justify-content:flex-end;align-items:center;gap:8px;display:flex}.fmhy-sp-modal-footer>.fmhy-sp-btn:first-child:not(:last-child){margin-right:auto}.fmhy-sp-modal-copy{color:var(--vp-c-text-2);margin:0;font-size:13.5px;line-height:1.6}.fmhy-sp-setting-row{justify-content:space-between;align-items:flex-start;gap:18px;padding:2px 0;display:flex}.fmhy-sp-setting-row+.fmhy-sp-setting-row{border-top:1px solid var(--fmhy-sp-border);margin-top:14px;padding-top:14px}.fmhy-sp-setting-copy{flex-direction:column;gap:4px;min-width:0;display:flex}.fmhy-sp-setting-copy strong{color:var(--vp-c-text-1);font-size:13.5px;font-weight:650;line-height:1.4}.fmhy-sp-setting-copy small{color:var(--vp-c-text-2);font-size:12px;line-height:1.55}.fmhy-sp-switch{flex:none;width:38px;height:22px;margin-top:1px;display:inline-flex;position:relative}.fmhy-sp-switch input{z-index:1;opacity:0;cursor:pointer;width:100%;height:100%;margin:0;position:absolute;top:0;bottom:0;left:0;right:0}.fmhy-sp-switch-track{background:var(--vp-c-default-soft);border-radius:999px;width:38px;height:22px;transition:background-color .18s;display:block}.fmhy-sp-switch-thumb{background:var(--vp-c-bg-elv);width:16px;height:16px;transition:transform .18s var(--fmhy-sp-ease);border-radius:50%;position:absolute;top:3px;left:3px;box-shadow:0 1px 3px #0000003d}.fmhy-sp-switch input:checked+.fmhy-sp-switch-track{background:var(--vp-c-brand-1)}.fmhy-sp-switch input:checked+.fmhy-sp-switch-track .fmhy-sp-switch-thumb{transform:translate(16px)}.fmhy-sp-switch input:focus-visible+.fmhy-sp-switch-track{outline:2px solid var(--vp-c-brand-1);outline-offset:2px}.fmhy-sp-manage-list{flex-direction:column;gap:5px;display:flex}.fmhy-sp-manage-row{flex-wrap:wrap;align-items:center;gap:7px;min-width:0;padding:4px 0;display:flex}.fmhy-sp-manage-row>.fmhy-sp-input{flex:160px;min-width:0}.fmhy-sp-manage-count{text-align:right;min-width:22px;font-size:11px}.fmhy-sp-tag{border:1px solid var(--fmhy-sp-border);background:var(--vp-c-bg-soft);color:var(--vp-c-text-2);letter-spacing:.04em;text-transform:uppercase;border-radius:999px;padding:1px 6px;font-size:9.5px;font-weight:650;line-height:1.6}.fmhy-sp-inline-confirm{align-items:center;gap:4px;display:inline-flex}.fmhy-sp-inline-confirm button{border:1px solid var(--fmhy-sp-border);background:var(--vp-c-bg-soft);height:26px;color:var(--vp-c-text-2);font-family:var(--vp-font-family-base);cursor:pointer;border-radius:5px;margin:0;padding:0 7px;font-size:10.5px;font-weight:600;line-height:1}.fmhy-sp-inline-confirm button:first-child{border-color:var(--fmhy-sp-red);background:var(--fmhy-sp-red-soft);color:var(--fmhy-sp-red)}@media (max-width:900px){.fmhy-sp-page-shell{padding-left:20px;padding-right:20px}.fmhy-sp-card-desc{-webkit-line-clamp:2;line-clamp:2}}@media (max-width:767px){.fmhy-sp-page-shell{padding:18px 15px max(48px, calc(28px + env(safe-area-inset-bottom)))}.fmhy-sp-page-top{margin-bottom:12px}.fmhy-sp-page-header h1{text-underline-offset:6px;font-size:clamp(28px,8vw,34px)}.fmhy-sp-page-header>p{margin-top:12px;font-size:13px;line-height:1.6}.fmhy-sp-stats{gap:5px;margin-top:14px}.fmhy-sp-stat{padding:4px 8px;font-size:10.5px}.fmhy-sp-toolbar{flex-wrap:wrap;margin-top:19px}.fmhy-sp-search{flex-basis:100%}.fmhy-sp-toolbar>.fmhy-sp-btn{width:100%}.fmhy-sp-tabs{margin-left:-15px;margin-right:-15px;padding-left:15px;padding-right:15px}.fmhy-sp-results-head{align-items:flex-start}.fmhy-sp-controls{width:100%}.fmhy-sp-select-wrap{flex:132px}.fmhy-sp-select{width:100%;max-width:none}.fmhy-sp-view-toggle{margin-left:auto}.fmhy-sp-cards{grid-template-columns:minmax(0,1fr)}.fmhy-sp-card{padding:14px 14px 12px}.fmhy-sp-empty{padding:44px 14px 40px}.fmhy-sp-modal-layer{align-items:flex-end;padding:12px}.fmhy-sp-modal{border-radius:17px 17px 0 0;width:100%;max-height:88dvh}.fmhy-sp-modal.is-small{width:100%}.fmhy-sp-editor-footer,.fmhy-sp-modal-footer{flex-wrap:wrap}.fmhy-sp-editor-footer .fmhy-sp-btn,.fmhy-sp-modal-footer .fmhy-sp-btn{flex:auto}.fmhy-sp-editor-footer .fmhy-sp-btn.is-danger-ghost,.fmhy-sp-modal-footer .fmhy-sp-btn.is-danger-ghost{flex:0 0 100%;justify-content:center}}@media (max-width:420px){.fmhy-sp-page-header h1{font-size:28px}.fmhy-sp-manage-count{display:none}}@keyframes fmhy-sp-fade{0%{opacity:0}to{opacity:1}}@keyframes fmhy-sp-pop{0%{opacity:0;transform:translateY(6px)scale(.985)}to{opacity:1;transform:none}}@keyframes fmhy-sp-menu-in{0%{opacity:0;transform:translateY(-4px)scale(.985)}to{opacity:1;transform:none}}@keyframes fmhy-sp-sheet-up{0%{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes fmhy-sp-fab-in{0%{opacity:0;transform:translateY(7px)scale(.92)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){.fmhy-sp-fab,.fmhy-sp-page,.fmhy-sp-editor,.fmhy-sp-editor-backdrop,.fmhy-sp-modal-layer,.fmhy-sp-modal,.fmhy-sp-menu,.fmhy-sp-new-collection-form,.fmhy-sp-toast-enter-active,.fmhy-sp-toast-leave-active,.fmhy-sp-toast-move{transition-duration:.001ms!important;animation-duration:.001ms!important}.fmhy-sp-card:hover,.fmhy-sp-fab:hover,.fmhy-sp-fab:active{transform:none}}");
	function getEnumValues(entries) {
		const numericValues = Object.values(entries).filter((v) => typeof v === "number");
		return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
	}
	function joinValues(array, separator = "|") {
		return array.map((val) => stringifyPrimitive(val)).join(separator);
	}
	function jsonStringifyReplacer(_, value) {
		if (typeof value === "bigint") return value.toString();
		return value;
	}
	var Cached = class {
		constructor(getter) {
			this._getter = getter;
			this._value = void 0;
		}
		get value() {
			const getter = this._getter;
			if (getter !== void 0) {
				this._value = getter();
				this._getter = void 0;
			}
			return this._value;
		}
	};
	function cached(getter) {
		return new Cached(getter);
	}
	function nullish(input) {
		return input === null || input === void 0;
	}
	function cleanRegex(source) {
		const start = source.startsWith("^") ? 1 : 0;
		const end = source.endsWith("$") ? source.length - 1 : source.length;
		return source.slice(start, end);
	}
	function floatSafeRemainder(val, step) {
		const ratio = val / step;
		const roundedRatio = Math.round(ratio);
		const tolerance = 4 * Number.EPSILON * Math.max(Math.abs(ratio), 1);
		if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
		return ratio - roundedRatio;
	}
	function assignProp(target, prop, value) {
		Object.defineProperty(target, prop, {
			value,
			writable: true,
			enumerable: true,
			configurable: true
		});
	}
	function rawShape(def) {
		const desc = Object.getOwnPropertyDescriptor(def, "shape");
		return desc?.get ? desc.get.raw : desc?.value;
	}
	function sourceShape(schema) {
		return rawShape(schema._zod.def) ?? schema._zod.def.shape;
	}
	function deferProp(target, key, getter) {
		Object.defineProperty(target, key, {
			get() {
				const value = getter();
				assignProp(this, key, value);
				return value;
			},
			enumerable: true,
			configurable: true
		});
	}
	function putProp(target, key, value) {
		if (key in target) assignProp(target, key, value);
		else target[key] = value;
	}
	function mirrorShape(target, source, keys, wrap) {
		const raw = sourceShape(source);
		for (const key of keys) {
			const desc = Object.getOwnPropertyDescriptor(raw, key);
			if (!desc.enumerable) continue;
			if (desc.get) deferProp(target, key, () => {
				const value = source._zod.def.shape[key];
				return wrap ? wrap(value, key) : value;
			});
			else putProp(target, key, wrap ? wrap(desc.value, key) : desc.value);
		}
	}
	function mirrorProps(target, source) {
		for (const key of Reflect.ownKeys(source)) {
			const desc = Object.getOwnPropertyDescriptor(source, key);
			if (!desc.enumerable) continue;
			if (desc.get) deferProp(target, key, () => source[key]);
			else putProp(target, key, desc.value);
		}
	}
	function mergeDefs(...defs) {
		const mergedDescriptors = {};
		for (const def of defs) {
			const descriptors = Object.getOwnPropertyDescriptors(def);
			Object.assign(mergedDescriptors, descriptors);
		}
		return Object.defineProperties({}, mergedDescriptors);
	}
	function esc(str) {
		return JSON.stringify(str);
	}
	function slugify(input) {
		return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
	}
	var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
	function isObject$1(data) {
		return typeof data === "object" && data !== null && !Array.isArray(data);
	}
	var allowsEval = cached(() => {
		if (globalConfig.jitless) return false;
		if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
		try {
			new Function("");
			return true;
		} catch (_) {
			return false;
		}
	});
	function isPlainObject$1(o) {
		if (isObject$1(o) === false) return false;
		const ctor = o.constructor;
		if (ctor === void 0) return true;
		if (typeof ctor !== "function") return true;
		const prot = ctor.prototype;
		if (isObject$1(prot) === false) return false;
		if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
		return true;
	}
	function shallowClone(o) {
		if (isPlainObject$1(o)) return { ...o };
		if (Array.isArray(o)) return [...o];
		if (o instanceof Map) return new Map(o);
		if (o instanceof Set) return new Set(o);
		return o;
	}
	var propertyKeyTypes = new Set([
		"string",
		"number",
		"symbol"
	]);
	function escapeRegex(str) {
		return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}
	function clone(inst, def, params) {
		const cl = new inst._zod.constr(def ?? inst._zod.def);
		if (!def || params?.parent) cl._zod.parent = inst;
		return cl;
	}
	function normalizeParams(_params) {
		const params = _params;
		if (!params) return {};
		if (typeof params === "string") return { error: () => params };
		if (params?.message !== void 0) {
			if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
			params.error = params.message;
		}
		delete params.message;
		if (typeof params.error === "string") return {
			...params,
			error: () => params.error
		};
		return params;
	}
	function stringifyPrimitive(value) {
		if (typeof value === "bigint") return value.toString() + "n";
		if (typeof value === "string") return `"${value}"`;
		return `${value}`;
	}
	function optionalKeys(shape) {
		return Object.keys(shape).filter((k) => {
			return shape[k]._zod.optin !== void 0 && shape[k]._zod.optout === "optional";
		});
	}
	var NUMBER_FORMAT_RANGES = (() => ({
		safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
		int32: [-2147483648, 2147483647],
		uint32: [0, 4294967295],
		float32: [-34028234663852886e22, 34028234663852886e22],
		float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
	}))();
	var BIGINT_FORMAT_RANGES = {
		int64: [BigInt("-9223372036854775808"), BigInt("9223372036854775807")],
		uint64: [BigInt(0), BigInt("18446744073709551615")]
	};
	function pick(schema, mask) {
		const currDef = schema._zod.def;
		const checks = currDef.checks;
		if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
		const newShape = {};
		mirrorShape(newShape, schema, maskedKeys(schema, mask));
		return clone(schema, mergeDefs(currDef, {
			shape: newShape,
			checks: []
		}));
	}
	function maskedKeys(schema, mask) {
		const raw = sourceShape(schema);
		const keys = [];
		for (const key of Reflect.ownKeys(mask)) {
			if (!Object.getOwnPropertyDescriptor(raw, key)?.enumerable) throw new Error(`Unrecognized key: "${String(key)}"`);
			if (mask[key]) keys.push(key);
		}
		return keys;
	}
	function omit(schema, mask) {
		const currDef = schema._zod.def;
		const checks = currDef.checks;
		if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
		const omitted = new Set(maskedKeys(schema, mask));
		const newShape = {};
		mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)).filter((key) => !omitted.has(key)));
		return clone(schema, mergeDefs(currDef, {
			shape: newShape,
			checks: []
		}));
	}
	function extend$1(schema, shape) {
		if (!isPlainObject$1(shape)) throw new Error("Invalid input to extend: expected a plain object");
		const checks = schema._zod.def.checks;
		if (checks && checks.length > 0) {
			const existingShape = sourceShape(schema);
			for (const key of Reflect.ownKeys(shape)) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
		}
		return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
	}
	function extended(schema, shape) {
		const newShape = {};
		mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)));
		mirrorProps(newShape, shape);
		return newShape;
	}
	function safeExtend(schema, shape) {
		if (!isPlainObject$1(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
		return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
	}
	function merge(a, b) {
		if (!b?._zod?.def) throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
		if (a._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
		const newShape = {};
		mirrorShape(newShape, a, Reflect.ownKeys(sourceShape(a)));
		mirrorShape(newShape, b, Reflect.ownKeys(sourceShape(b)));
		return clone(a, mergeDefs(a._zod.def, {
			shape: newShape,
			get catchall() {
				return b._zod.def.catchall;
			},
			checks: b._zod.def.checks ?? []
		}));
	}
	function partial(Class, schema, mask, name = "partial") {
		const checks = schema._zod.def.checks;
		if (checks && checks.length > 0) throw new Error(`.${name}() cannot be used on object schemas containing refinements`);
		const selected = mask ? new Set(maskedKeys(schema, mask)) : void 0;
		const newShape = {};
		mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), Class && ((value, key) => selected && !selected.has(key) ? value : new Class({
			type: "optional",
			innerType: value
		})));
		return clone(schema, mergeDefs(schema._zod.def, {
			shape: newShape,
			checks: []
		}));
	}
	function required(Class, schema, mask) {
		const selected = mask ? new Set(maskedKeys(schema, mask)) : void 0;
		const newShape = {};
		mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), (value, key) => selected && !selected.has(key) ? value : new Class({
			type: "nonoptional",
			innerType: value
		}));
		return clone(schema, mergeDefs(schema._zod.def, { shape: newShape }));
	}
	function aborted(x, startIndex = 0) {
		if (x.aborted === true) return true;
		for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
		return false;
	}
	function explicitlyAborted(x, startIndex = 0) {
		if (x.aborted === true) return true;
		for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
		return false;
	}
	function prefixIssues(path, issues) {
		return issues.map((iss) => {
			var _a;
			(_a = iss).path ?? (_a.path = []);
			iss.path.unshift(path);
			return iss;
		});
	}
	function unwrapMessage(message) {
		return typeof message === "string" ? message : message?.message;
	}
	function sizeCaps(defChecks) {
		const caps = [];
		for (const ch of defChecks ?? []) {
			const d = ch._zod.def;
			if (!/_(length|size)$|_equals$/.test(d.check)) break;
			const max = d.maximum ?? d.length ?? d.size;
			if (max >= 0) caps.push([max, ch]);
		}
		return caps;
	}
	function attachSchema(issues, start, inst) {
		var _a;
		for (let i = start; i < issues.length; i++) (_a = issues[i]).schema ?? (_a.schema = inst);
	}
	function finalizeIssue(iss, ctx, config) {
		var _a;
		const traits = iss.inst?._zod?.traits;
		if (traits?.has("$ZodType")) {
			if (traits.has("$ZodCheck")) (_a = iss).schema ?? (_a.schema = iss.inst);
			else iss.schema = iss.inst;
		}
		const schemaError = iss.schema !== iss.inst ? iss.schema?._zod.def?.error : void 0;
		const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(schemaError?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
		const full = {};
		for (const k of Object.keys(iss)) {
			if (k === "inst" || k === "schema" || k === "continue" || k === "input" || k === "__proto__") continue;
			full[k] = iss[k];
		}
		full.path ?? (full.path = []);
		full.message = message;
		if (ctx?.reportInput) full.input = iss.input;
		return full;
	}
	var highSurrogate = /[\uD800-\uDBFF]/;
	function codePointLength(str) {
		const units = str.length;
		if (!highSurrogate.test(str)) return units;
		let count = units;
		for (let i = 0; i < units - 1; i++) if ((str.charCodeAt(i) & 64512) === 55296 && (str.charCodeAt(i + 1) & 64512) === 56320) {
			count--;
			i++;
		}
		return count;
	}
	function getLengthableOrigin(input) {
		if (Array.isArray(input)) return "array";
		if (typeof input === "string") return "string";
		return "unknown";
	}
	function parsedType(data) {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "nan" : "number";
			case "object": {
				if (data === null) return "null";
				if (Array.isArray(data)) return "array";
				const obj = data;
				if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) return obj.constructor.name;
			}
		}
		return t;
	}
	function issue(...args) {
		const [iss, input, inst] = args;
		if (typeof iss === "string") return {
			message: iss,
			code: "custom",
			input,
			inst
		};
		return { ...iss };
	}
	function members(proto, table) {
		for (const key in table) {
			const desc = Object.getOwnPropertyDescriptor(table, key);
			if (desc.get) Object.defineProperty(proto, key, {
				...desc,
				enumerable: false
			});
			else defineBound(proto, key, desc.value);
		}
	}
	function own(inst, key, value, enumerable = true) {
		Object.defineProperty(inst, key, {
			configurable: true,
			writable: true,
			enumerable,
			value
		});
		return value;
	}
	function hide$1(inst, key, value) {
		return own(inst, key, value, false);
	}
	function derived(computes, table) {
		for (const key in computes) {
			const compute = computes[key];
			Object.defineProperty(table, key, {
				configurable: true,
				enumerable: true,
				get() {
					return own(this, key, compute(this));
				},
				set(value) {
					own(this, key, value);
				}
			});
		}
		return table;
	}
	function defineBound(proto, key, fn) {
		Object.defineProperty(proto, key, {
			configurable: true,
			get() {
				return this == null ? fn : own(this, key, fn.bind(this));
			},
			set(value) {
				own(this, key, value);
			}
		});
	}
	function claim(inst, sentinel) {
		const proto = Object.getPrototypeOf(inst);
		return sentinel in proto ? void 0 : proto;
	}
	var installing;
	var broke = false;
	var breaker = {
		configurable: true,
		get() {
			broke = true;
		}
	};
	function defineLazyInternal(inst, key, compute) {
		const proto = Object.getPrototypeOf(inst._zod);
		if (key in proto && installing !== inst._zod) {
			installing = void 0;
			return;
		}
		installing = inst._zod;
		Object.defineProperty(proto, key, {
			configurable: true,
			get() {
				Object.defineProperty(this, key, breaker);
				const outer = broke;
				broke = false;
				try {
					const value = compute(this);
					if (broke) delete this[key];
					else Object.defineProperty(this, key, {
						configurable: true,
						writable: true,
						value
					});
					broke = broke || outer;
					return value;
				} catch (err) {
					delete this[key];
					broke = broke || outer;
					throw err;
				}
			},
			set(value) {
				Object.defineProperty(this, key, {
					configurable: true,
					writable: true,
					value
				});
			}
		});
	}
	function installLazyProp(inst, key, make, enumerable) {
		const proto = claim(inst, key);
		if (!proto) return;
		Object.defineProperty(proto, key, {
			configurable: true,
			get() {
				const desc = {
					configurable: true,
					writable: true,
					enumerable,
					value: void 0
				};
				Object.defineProperty(this, key, desc);
				desc.value = make(this);
				Object.defineProperty(this, key, desc);
				return desc.value;
			},
			set(value) {
				Object.defineProperty(this, key, {
					configurable: true,
					writable: true,
					enumerable,
					value
				});
			}
		});
	}
	var CONSTANT_CATCH = "~constantCatch";
	function constantCatch(value) {
		const fn = () => value;
		fn[CONSTANT_CATCH] = true;
		return fn;
	}
	var _a$1;
	var _zodDesc = {
		value: void 0,
		enumerable: false
	};
	var _E = "captureStackTrace" in Error ? Error : null;
	function newError(Definition) {
		const E = _E;
		if (E) {
			const saved = E.stackTraceLimit;
			if (typeof saved === "number") {
				try {
					E.stackTraceLimit = 0;
				} catch {
					_E = null;
					return new Definition();
				}
				try {
					return new Definition();
				} finally {
					E.stackTraceLimit = saved;
				}
			}
		}
		return new Definition();
	}
	function $constructor(name, initializer, proto, params) {
		const zodProto = {};
		function Internals(def) {
			this.def = def;
			this.constr = _;
			this.traits = new Set();
		}
		Internals.prototype = zodProto;
		const protoMembers = proto;
		const initialized = protoMembers && new WeakSet();
		function init(inst, def) {
			if (!inst._zod) {
				_zodDesc.value = new Internals(def);
				try {
					Object.defineProperty(inst, "_zod", _zodDesc);
				} finally {
					_zodDesc.value = void 0;
				}
			} else if (inst._zod.traits.has(name)) return;
			inst._zod.traits.add(name);
			initializer(inst, def);
			if (initialized) {
				const own = Object.getPrototypeOf(inst);
				const ctorProto = inst._zod.constr.prototype;
				let up = own;
				while (up && up !== ctorProto) up = Object.getPrototypeOf(up);
				const target = up ?? own;
				if (!initialized.has(target)) {
					initialized.add(target);
					members(target, protoMembers);
				}
			}
			const proto = _.prototype;
			for (const k in proto) {
				if (!Object.prototype.hasOwnProperty.call(proto, k)) continue;
				if (!(k in inst)) inst[k] = proto[k].bind(inst);
			}
		}
		const Parent = params?.Parent ?? Object;
		class Definition extends Parent {}
		Object.defineProperty(Definition, "name", { value: name });
		function _(def) {
			const inst = params?.Parent ? newError(Definition) : this;
			init(inst, def);
			const deferred = inst._zod.deferred;
			if (deferred) {
				for (const fn of deferred) fn();
				inst._zod.deferred = void 0;
			}
			const pp = globalThis.__zod_globalConfig?.postProcessor;
			if (pp) pp(inst);
			return inst;
		}
		Object.defineProperty(_, "init", { value: init });
		Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
			if (params?.Parent && inst instanceof params.Parent) return true;
			return inst?._zod?.traits?.has(name);
		} });
		Object.defineProperty(_, "name", { value: name });
		return _;
	}
	var $ZodAsyncError = class extends Error {
		constructor() {
			super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
		}
	};
	var $ZodEncodeError = class extends Error {
		constructor(name) {
			super(`Encountered unidirectional transform during encode: ${name}`);
			this.name = "ZodEncodeError";
		}
	};
	(_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
	var globalConfig = globalThis.__zod_globalConfig;
	function config(newConfig) {
		if (newConfig) Object.assign(globalConfig, newConfig);
		return globalConfig;
	}
	function _getMessage() {
		const internals = this._zod;
		internals.message ?? (internals.message = JSON.stringify(internals.def, jsonStringifyReplacer, 2));
		return internals.message;
	}
	function _setMessage(value) {
		this._zod.message = value;
	}
	var _messageDesc = {
		get: _getMessage,
		set: _setMessage,
		enumerable: true,
		configurable: true
	};
	var _issuesDesc = {
		value: void 0,
		enumerable: false
	};
	var _installedToString = new WeakSet([Object.prototype, Error.prototype]);
	var initializer$1 = (inst, def) => {
		inst.name = "$ZodError";
		_issuesDesc.value = def;
		Object.defineProperty(inst, "issues", _issuesDesc);
		_issuesDesc.value = void 0;
		Object.defineProperty(inst, "message", _messageDesc);
		const proto = Object.getPrototypeOf(inst);
		if (!_installedToString.has(proto)) {
			_installedToString.add(proto);
			Object.defineProperty(proto, "toString", {
				configurable: true,
				enumerable: false,
				get() {
					const value = () => this.message;
					Object.defineProperty(this, "toString", {
						value,
						configurable: true,
						writable: true
					});
					return value;
				},
				set(value) {
					Object.defineProperty(this, "toString", {
						value,
						configurable: true,
						writable: true
					});
				}
			});
		}
	};
	var $ZodError = $constructor("$ZodError", initializer$1);
	function node(obj, key, make) {
		if (!Object.prototype.hasOwnProperty.call(obj, key)) {
			if (key === "__proto__") Object.defineProperty(obj, key, {
				value: make(),
				writable: true,
				enumerable: true,
				configurable: true
			});
			else obj[key] = make();
		}
		return obj[key];
	}
	function flattenError(error, mapper = (issue) => issue.message) {
		const fieldErrors = {};
		const formErrors = [];
		for (const sub of error.issues) if (sub.path.length > 0) node(fieldErrors, sub.path[0], () => []).push(mapper(sub));
		else formErrors.push(mapper(sub));
		return {
			formErrors,
			fieldErrors
		};
	}
	function formatError(error, mapper = (issue) => issue.message) {
		const fieldErrors = { _errors: [] };
		const processError = (error, path = []) => {
			for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
			else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
			else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
			else {
				const fullpath = [...path, ...issue.path];
				if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
				else {
					let curr = fieldErrors;
					let i = 0;
					while (i < fullpath.length) {
						const el = fullpath[i];
						const terminal = i === fullpath.length - 1;
						if (el === "_errors") {
							if (terminal) curr._errors.push(mapper(issue));
							i++;
							continue;
						}
						if (!Object.prototype.hasOwnProperty.call(curr, el)) Object.defineProperty(curr, el, {
							value: { _errors: [] },
							enumerable: true,
							writable: true,
							configurable: true
						});
						const node = curr[el];
						if (terminal) node._errors.push(mapper(issue));
						curr = node;
						i++;
					}
				}
			}
		};
		processError(error);
		return fieldErrors;
	}
	function finalizeParams(callee, params) {
		return {
			callee: params?.callee ?? callee,
			Err: params?.Err
		};
	}
	var _parse = (_Err) => {
		const fn = (schema, value, _ctx, _params) => {
			const ctx = _ctx ? {
				..._ctx,
				async: false
			} : { async: false };
			const result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) throw new $ZodAsyncError();
			if (result.issues.length) {
				const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
				captureStackTrace(e, _params?.callee ?? fn);
				throw e;
			}
			return result.value;
		};
		return fn;
	};
	var _parseAsync = (_Err) => {
		const fn = async (schema, value, _ctx, params) => {
			const ctx = _ctx ? {
				..._ctx,
				async: true
			} : { async: true };
			let result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) result = await result;
			if (result.issues.length) {
				const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
				captureStackTrace(e, params?.callee ?? fn);
				throw e;
			}
			return result.value;
		};
		return fn;
	};
	var _safeParse = (_Err) => (schema, value, _ctx) => {
		const ctx = _ctx ? {
			..._ctx,
			async: false
		} : { async: false };
		const result = schema._zod.run({
			value,
			issues: []
		}, ctx);
		if (result instanceof Promise) throw new $ZodAsyncError();
		return result.issues.length ? failure(_Err, result.issues, ctx) : {
			success: true,
			data: result.value
		};
	};
	function failure(Err, issues, ctx) {
		let error;
		return {
			success: false,
			get error() {
				if (!error) {
					error = new Err(issues.map((iss) => finalizeIssue(iss, ctx, config())));
					issues = void 0;
					ctx = void 0;
				}
				return error;
			},
			set error(e) {
				error = e;
				issues = void 0;
				ctx = void 0;
			}
		};
	}
	var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
		const ctx = _ctx ? {
			..._ctx,
			async: true
		} : { async: true };
		let result = schema._zod.run({
			value,
			issues: []
		}, ctx);
		if (result instanceof Promise) result = await result;
		return result.issues.length ? failure(_Err, result.issues, ctx) : {
			success: true,
			data: result.value
		};
	};
	var COMPILE_INVALID = Symbol.for("zod.compile.invalid");
	var COMPILE_FALLBACK = Symbol.for("zod.compile.fallback");
	var validate = ((schema, value, _ctx) => {
		const validator = schema._zod.bag.validator;
		if (validator !== void 0) {
			if (validator(value) !== COMPILE_INVALID) return true;
			if (validator.definite === true && _ctx === void 0) return false;
		}
		return validateFallback(schema, value, _ctx);
	});
	function validateFallback(schema, value, _ctx) {
		const ctx = _ctx ? {
			..._ctx,
			async: false,
			abortEarly: true
		} : {
			async: false,
			abortEarly: true
		};
		const fallbackRun = schema._zod.bag.fallbackRun;
		let result;
		if (fallbackRun) {
			ctx[COMPILE_FALLBACK] = true;
			result = fallbackRun({
				value,
				issues: []
			}, ctx);
		} else result = schema._zod.run({
			value,
			issues: []
		}, ctx);
		if (result instanceof Promise) throw new $ZodAsyncError();
		return result.issues.length === 0;
	}
	var validateAsync$1 = async (schema, value, _ctx) => {
		const ctx = _ctx ? {
			..._ctx,
			async: true,
			abortEarly: true
		} : {
			async: true,
			abortEarly: true
		};
		let result = schema._zod.run({
			value,
			issues: []
		}, ctx);
		if (result instanceof Promise) result = await result;
		return result.issues.length === 0;
	};
	var _encode = (_Err) => {
		const parse = _parse(_Err);
		const fn = (schema, value, _ctx, _params) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return parse(schema, value, ctx, finalizeParams(fn, _params));
		};
		return fn;
	};
	var _decode = (_Err) => {
		const parse = _parse(_Err);
		const fn = (schema, value, _ctx, _params) => {
			return parse(schema, value, _ctx, finalizeParams(fn, _params));
		};
		return fn;
	};
	var _encodeAsync = (_Err) => {
		const parseAsync = _parseAsync(_Err);
		const fn = async (schema, value, _ctx, _params) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return await parseAsync(schema, value, ctx, finalizeParams(fn, _params));
		};
		return fn;
	};
	var _decodeAsync = (_Err) => {
		const parseAsync = _parseAsync(_Err);
		const fn = async (schema, value, _ctx, _params) => {
			return await parseAsync(schema, value, _ctx, finalizeParams(fn, _params));
		};
		return fn;
	};
	var _safeEncode = (_Err) => (schema, value, _ctx) => {
		const ctx = _ctx ? {
			..._ctx,
			direction: "backward"
		} : { direction: "backward" };
		return _safeParse(_Err)(schema, value, ctx);
	};
	var _safeDecode = (_Err) => (schema, value, _ctx) => {
		return _safeParse(_Err)(schema, value, _ctx);
	};
	var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
		const ctx = _ctx ? {
			..._ctx,
			direction: "backward"
		} : { direction: "backward" };
		return _safeParseAsync(_Err)(schema, value, ctx);
	};
	var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
		return _safeParseAsync(_Err)(schema, value, _ctx);
	};
	var cuid = /^[cC][0-9a-z]{6,}$/;
	var cuid2 = /^[0-9a-z]+$/;
	var ulid = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/;
	var xid = /^[0-9a-vA-V]{20}$/;
	var ksuid = /^[A-Za-z0-9]{27}$/;
	var nanoid = /^[a-zA-Z0-9_-]{21}$/;
	function nanoidOfLength(length) {
		return new RegExp(`^[a-zA-Z0-9_-]{${length}}$`);
	}
	var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
	var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
	var uuid = (version) => {
		if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
		return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
	};
	var email = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
	var _emoji$1 = `^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$`;
	function emoji() {
		return new RegExp(_emoji$1, "u");
	}
	var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
	var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
	var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
	var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
	var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
	var base64url = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;
	var httpProtocol = /^https?$/;
	var e164 = /^\+[1-9]\d{6,14}$/;
	var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
	function anchor(source) {
		return new RegExp(`^${source}$`);
	}
	var date = anchor(dateSource);
	function timeSource(args) {
		const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
		return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : args.seconds ? `${hhmm}:[0-5]\\d(?:\\.\\d+)?` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
	}
	function time(args) {
		return new RegExp(`^${timeSource(args)}$`);
	}
	function datetime(args) {
		const opts = ["Z"];
		if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
		const qualified = `${timeSource({
			precision: args.precision,
			seconds: true
		})}(?:${opts.join("|")})`;
		const timeRegex = args.local ? `${qualified}|${timeSource({ precision: args.precision })}` : qualified;
		return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
	}
	var anyString = /^[\s\S]{0,}$/;
	var number$1 = /^-?\d+(?:\.\d+)?$/;
	var boolean$1 = /^(?:true|false)$/i;
	var lowercase = /^[^A-Z]*$/;
	var uppercase = /^[^a-z]*$/;
	var $ZodCheck = $constructor("$ZodCheck", (inst, def) => {
		var _a;
		inst._zod ?? (inst._zod = {});
		inst._zod.def = def;
		(_a = inst._zod).onattach ?? (_a.onattach = []);
	});
	var _whenHasLength = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	};
	var numericOriginMap = {
		number: "number",
		bigint: "bigint",
		object: "date"
	};
	var $ZodCheckLessThan = $constructor("$ZodCheckLessThan", (inst, def) => {
		$ZodCheck.init(inst, def);
		const origin = numericOriginMap[typeof def.value];
		inst._zod.check = (payload) => {
			if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
			payload.issues.push({
				origin: numericOriginMap[typeof payload.value] ?? origin,
				code: "too_big",
				maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
				input: payload.value,
				inclusive: def.inclusive,
				inst,
				continue: !def.abort
			});
		};
	});
	var $ZodCheckGreaterThan = $constructor("$ZodCheckGreaterThan", (inst, def) => {
		$ZodCheck.init(inst, def);
		const origin = numericOriginMap[typeof def.value];
		inst._zod.check = (payload) => {
			if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
			payload.issues.push({
				origin: numericOriginMap[typeof payload.value] ?? origin,
				code: "too_small",
				minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
				input: payload.value,
				inclusive: def.inclusive,
				inst,
				continue: !def.abort
			});
		};
	});
	var $ZodCheckMultipleOf = $constructor("$ZodCheckMultipleOf", (inst, def) => {
		$ZodCheck.init(inst, def);
		inst._zod.check = (payload) => {
			if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
			if (typeof payload.value === "bigint" ? def.value !== BigInt(0) && payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0) return;
			payload.issues.push({
				origin: typeof payload.value,
				code: "not_multiple_of",
				divisor: def.value,
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	var $ZodCheckNumberFormat = $constructor("$ZodCheckNumberFormat", (inst, def) => {
		$ZodCheck.init(inst, def);
		def.format = def.format || "float64";
		const isInt = def.format?.includes("int");
		const origin = isInt ? "int" : "number";
		const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
		inst._zod.check = (payload) => {
			const input = payload.value;
			if (isInt) {
				if (!Number.isInteger(input)) {
					payload.issues.push({
						expected: origin,
						format: def.format,
						code: "invalid_type",
						continue: false,
						input,
						inst
					});
					return;
				}
				if (!Number.isSafeInteger(input)) {
					if (input > 0) payload.issues.push({
						input,
						code: "too_big",
						maximum: Number.MAX_SAFE_INTEGER,
						note: "Integers must be within the safe integer range.",
						inst,
						origin,
						inclusive: true,
						continue: !def.abort
					});
					else payload.issues.push({
						input,
						code: "too_small",
						minimum: Number.MIN_SAFE_INTEGER,
						note: "Integers must be within the safe integer range.",
						inst,
						origin,
						inclusive: true,
						continue: !def.abort
					});
					return;
				}
			}
			if (input < minimum) payload.issues.push({
				origin: "number",
				input,
				code: "too_small",
				minimum,
				inclusive: true,
				inst,
				continue: !def.abort
			});
			if (input > maximum) payload.issues.push({
				origin: "number",
				input,
				code: "too_big",
				maximum,
				inclusive: true,
				inst,
				continue: !def.abort
			});
		};
	});
	var $ZodCheckMaxLength = $constructor("$ZodCheckMaxLength", (inst, def) => {
		var _a;
		$ZodCheck.init(inst, def);
		(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
		inst._zod.check = (payload) => {
			const input = payload.value;
			const units = input.length;
			if ((typeof input === "string" && units > def.maximum ? codePointLength(input) : units) <= def.maximum) return;
			const origin = getLengthableOrigin(input);
			payload.issues.push({
				origin,
				code: "too_big",
				maximum: def.maximum,
				inclusive: true,
				input,
				inst,
				continue: !def.abort
			});
		};
	});
	var $ZodCheckMinLength = $constructor("$ZodCheckMinLength", (inst, def) => {
		var _a;
		$ZodCheck.init(inst, def);
		(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
		inst._zod.check = (payload) => {
			const input = payload.value;
			const units = input.length;
			if ((typeof input === "string" && units >= def.minimum && units < def.minimum * 2 ? codePointLength(input) : units) >= def.minimum) return;
			const origin = getLengthableOrigin(input);
			payload.issues.push({
				origin,
				code: "too_small",
				minimum: def.minimum,
				inclusive: true,
				input,
				inst,
				continue: !def.abort
			});
		};
	});
	var $ZodCheckLengthEquals = $constructor("$ZodCheckLengthEquals", (inst, def) => {
		var _a;
		$ZodCheck.init(inst, def);
		(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
		inst._zod.check = (payload) => {
			const input = payload.value;
			const units = input.length;
			const length = typeof input === "string" && units >= def.length && units <= def.length * 2 ? codePointLength(input) : units;
			if (length === def.length) return;
			const origin = getLengthableOrigin(input);
			const tooBig = length > def.length;
			payload.issues.push({
				origin,
				...tooBig ? {
					code: "too_big",
					maximum: def.length
				} : {
					code: "too_small",
					minimum: def.length
				},
				inclusive: true,
				exact: true,
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	var $ZodCheckStringFormat = $constructor("$ZodCheckStringFormat", (inst, def) => {
		var _a, _b;
		$ZodCheck.init(inst, def);
		if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
			def.pattern.lastIndex = 0;
			if (def.pattern.test(payload.value)) return;
			payload.issues.push({
				origin: "string",
				code: "invalid_format",
				format: def.format,
				input: payload.value,
				...def.pattern ? { pattern: def.pattern.toString() } : {},
				inst,
				continue: !def.abort
			});
		});
		else (_b = inst._zod).check ?? (_b.check = () => {});
	});
	var $ZodCheckRegex = $constructor("$ZodCheckRegex", (inst, def) => {
		$ZodCheckStringFormat.init(inst, def);
		inst._zod.check = (payload) => {
			def.pattern.lastIndex = 0;
			if (def.pattern.test(payload.value)) return;
			payload.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "regex",
				input: payload.value,
				pattern: def.pattern.toString(),
				inst,
				continue: !def.abort
			});
		};
	});
	var $ZodCheckLowerCase = $constructor("$ZodCheckLowerCase", (inst, def) => {
		def.pattern ?? (def.pattern = lowercase);
		$ZodCheckStringFormat.init(inst, def);
	});
	var $ZodCheckUpperCase = $constructor("$ZodCheckUpperCase", (inst, def) => {
		def.pattern ?? (def.pattern = uppercase);
		$ZodCheckStringFormat.init(inst, def);
	});
	var $ZodCheckIncludes = $constructor("$ZodCheckIncludes", (inst, def) => {
		$ZodCheck.init(inst, def);
		const escapedRegex = escapeRegex(def.includes);
		def.pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position},}${escapedRegex}` : escapedRegex);
		inst._zod.check = (payload) => {
			if (payload.value.includes(def.includes, def.position)) return;
			payload.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "includes",
				includes: def.includes,
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	var $ZodCheckStartsWith = $constructor("$ZodCheckStartsWith", (inst, def) => {
		$ZodCheck.init(inst, def);
		const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
		def.pattern ?? (def.pattern = pattern);
		inst._zod.check = (payload) => {
			if (payload.value.startsWith(def.prefix)) return;
			payload.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "starts_with",
				prefix: def.prefix,
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	var $ZodCheckEndsWith = $constructor("$ZodCheckEndsWith", (inst, def) => {
		$ZodCheck.init(inst, def);
		const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
		def.pattern ?? (def.pattern = pattern);
		inst._zod.check = (payload) => {
			if (payload.value.endsWith(def.suffix)) return;
			payload.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "ends_with",
				suffix: def.suffix,
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	var $ZodCheckOverwrite = $constructor("$ZodCheckOverwrite", (inst, def) => {
		$ZodCheck.init(inst, def);
		inst._zod.check = (payload) => {
			payload.value = def.tx(payload.value);
		};
	});
	var Doc = class {
		constructor(args = [], closed = {}) {
			this.content = [];
			this.indent = 0;
			this.args = args;
			this.closed = closed;
		}
		indented(fn) {
			this.indent += 1;
			try {
				fn(this);
			} finally {
				this.indent -= 1;
			}
		}
		write(arg) {
			if (typeof arg === "function") {
				arg(this, { execution: "sync" });
				arg(this, { execution: "async" });
				return;
			}
			const lines = arg.split("\n").filter((x) => x);
			const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
			const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
			for (const line of dedented) this.content.push(line);
		}
		compile() {
			const F = Function;
			const content = this?.content ?? [``];
			return new F(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {\n${content.join("\n")}\n};`)(...Object.values(this.closed));
		}
	};
	var version$1 = {
		major: 4,
		minor: 6,
		patch: 7
	};
	var $ZodType = $constructor("$ZodType", (inst, def) => {
		var _a;
		inst ?? (inst = {});
		inst._zod.def = def;
		inst._zod.bag = inst._zod.bag || {};
		inst._zod.version = version$1;
		const defChecks = inst._zod.def.checks;
		const checks = inst._zod.traits.has("$ZodCheck") ? [inst, ...defChecks ?? []] : defChecks?.length ? [...defChecks] : [];
		for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
		if (checks.length === 0) {
			(_a = inst._zod).deferred ?? (_a.deferred = []);
			inst._zod.deferred?.push(() => {
				inst._zod.run = inst._zod.parse;
			});
		} else {
			const runChecks = (payload, checks, ctx) => {
				if (payload.memo) return payload;
				let isAborted = aborted(payload);
				let asyncResult;
				for (const ch of checks) {
					if (ch._zod.def.when) {
						if (explicitlyAborted(payload)) continue;
						if (!ch._zod.def.when(payload)) continue;
					} else if (isAborted) continue;
					const currLen = payload.issues.length;
					const _ = ch._zod.check(payload);
					if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
					if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
						await _;
						if (payload.issues.length === currLen) return;
						attachSchema(payload.issues, currLen, inst);
						if (!isAborted) isAborted = aborted(payload, currLen);
					});
					else {
						if (payload.issues.length === currLen) continue;
						attachSchema(payload.issues, currLen, inst);
						if (!isAborted) isAborted = aborted(payload, currLen);
					}
				}
				if (asyncResult) return asyncResult.then(() => {
					return payload;
				});
				return payload;
			};
			const handleCanaryResult = (canary, payload, ctx) => {
				if (aborted(canary)) {
					canary.aborted = true;
					return canary;
				}
				const checkResult = runChecks(payload, checks, ctx);
				if (checkResult instanceof Promise) {
					if (ctx.async === false) throw new $ZodAsyncError();
					return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
				}
				return inst._zod.parse(checkResult, ctx);
			};
			inst._zod.run = (payload, ctx) => {
				if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
				if (ctx.direction === "backward") {
					const canary = inst._zod.parse({
						value: payload.value,
						issues: []
					}, {
						...ctx,
						skipChecks: true
					});
					if (canary instanceof Promise) return canary.then((canary) => {
						return handleCanaryResult(canary, payload, ctx);
					});
					return handleCanaryResult(canary, payload, ctx);
				}
				const result = inst._zod.parse(payload, ctx);
				if (result instanceof Promise) {
					if (ctx.async === false) throw new $ZodAsyncError();
					return result.then((result) => runChecks(result, checks, ctx));
				}
				return runChecks(result, checks, ctx);
			};
		}
	}, {
		get "~standard"() {
			return hide$1(this, "~standard", standardProps(this));
		},
		set "~standard"(value) {
			own(this, "~standard", value);
		}
	});
	var toStandardResult = (r, ctx) => r.issues.length ? { issues: r.issues.map((iss) => finalizeIssue(iss, ctx, config())) } : { value: r.value };
	async function validateAsync(inst, value) {
		const ctx = { async: true };
		return toStandardResult(await inst._zod.run({
			value,
			issues: []
		}, ctx), ctx);
	}
	function standardProps(inst) {
		return {
			validate: (value) => {
				const ctx = { async: false };
				try {
					const r = inst._zod.run({
						value,
						issues: []
					}, ctx);
					if (!(r instanceof Promise)) return toStandardResult(r, ctx);
				} catch (_) {}
				return validateAsync(inst, value);
			},
			vendor: "zod",
			version: 1
		};
	}
	var $ZodString = $constructor("$ZodString", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.pattern = def.pattern ?? anyString;
		inst._zod.parse = (payload, _) => {
			if (def.coerce) try {
				payload.value = String(payload.value);
			} catch (_) {}
			if (typeof payload.value === "string") return payload;
			payload.issues.push({
				expected: "string",
				code: "invalid_type",
				input: payload.value,
				inst
			});
			return payload;
		};
	});
	var $ZodStringFormat = $constructor("$ZodStringFormat", (inst, def) => {
		$ZodCheckStringFormat.init(inst, def);
		$ZodString.init(inst, def);
	});
	var $ZodGUID = $constructor("$ZodGUID", (inst, def) => {
		def.pattern ?? (def.pattern = guid);
		$ZodStringFormat.init(inst, def);
	});
	var $ZodUUID = $constructor("$ZodUUID", (inst, def) => {
		if (def.version) {
			const v = {
				v1: 1,
				v2: 2,
				v3: 3,
				v4: 4,
				v5: 5,
				v6: 6,
				v7: 7,
				v8: 8
			}[def.version];
			if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
			def.pattern ?? (def.pattern = uuid(v));
		} else def.pattern ?? (def.pattern = uuid());
		$ZodStringFormat.init(inst, def);
	});
	var $ZodEmail = $constructor("$ZodEmail", (inst, def) => {
		def.pattern ?? (def.pattern = email);
		$ZodStringFormat.init(inst, def);
	});
	function canParseURL(input) {
		try {
			if (typeof URL !== "undefined" && typeof URL.canParse === "function") return URL.canParse(input);
			new URL(input);
			return true;
		} catch {
			return false;
		}
	}
	function validateURL(trimmed, def) {
		if (!("normalize" in def) && !("hostname" in def) && !("protocol" in def)) return canParseURL(trimmed) || 2;
		return parseURLObject(trimmed, def);
	}
	function parseURLObject(trimmed, def) {
		if (!def.normalize && def.protocol?.source === httpProtocol.source && !/^https?:\/\//i.test(trimmed)) return 1;
		try {
			if (typeof URL !== "undefined") {
				const URLStatic = URL;
				if (typeof URLStatic.parse === "function") return URLStatic.parse(trimmed) ?? 2;
			}
			return new URL(trimmed);
		} catch {
			return 2;
		}
	}
	var asciiTabOrNewline = /[\t\n\r]/g;
	function stripTabAndNewline(value) {
		return value.replace(asciiTabOrNewline, "");
	}
	function urlHostnameOk(url, hostname) {
		hostname.lastIndex = 0;
		return hostname.test(url.hostname);
	}
	function urlProtocolOk(url, protocol) {
		protocol.lastIndex = 0;
		return protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol);
	}
	var $ZodURL = $constructor("$ZodURL", (inst, def) => {
		$ZodStringFormat.init(inst, def);
		inst._zod.check = (payload) => {
			try {
				const trimmed = payload.value.trim();
				const url = validateURL(trimmed, def);
				if (url === 1) {
					payload.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid URL format",
						input: payload.value,
						inst,
						continue: !def.abort
					});
					return;
				}
				if (url === 2) {
					payload.issues.push({
						code: "invalid_format",
						format: "url",
						input: payload.value,
						inst,
						continue: !def.abort
					});
					return;
				}
				if (url === true) {
					payload.value = stripTabAndNewline(trimmed);
					return;
				}
				if (def.hostname && !urlHostnameOk(url, def.hostname)) payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid hostname",
					pattern: def.hostname.source,
					input: payload.value,
					inst,
					continue: !def.abort
				});
				if (def.protocol && !urlProtocolOk(url, def.protocol)) payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid protocol",
					pattern: def.protocol.source,
					input: payload.value,
					inst,
					continue: !def.abort
				});
				payload.value = def.normalize ? url.href : stripTabAndNewline(trimmed);
				return;
			} catch (_) {
				payload.issues.push({
					code: "invalid_format",
					format: "url",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
		};
	});
	var $ZodEmoji = $constructor("$ZodEmoji", (inst, def) => {
		def.pattern ?? (def.pattern = emoji());
		$ZodStringFormat.init(inst, def);
	});
	var $ZodNanoID = $constructor("$ZodNanoID", (inst, def) => {
		if (def.length !== void 0 && (!Number.isInteger(def.length) || def.length < 1)) throw new Error(`Invalid nanoid length: ${def.length}`);
		def.pattern ?? (def.pattern = def.length === void 0 ? nanoid : nanoidOfLength(def.length));
		$ZodStringFormat.init(inst, def);
	});
	var $ZodCUID = $constructor("$ZodCUID", (inst, def) => {
		def.pattern ?? (def.pattern = cuid);
		$ZodStringFormat.init(inst, def);
	});
	var $ZodCUID2 = $constructor("$ZodCUID2", (inst, def) => {
		def.pattern ?? (def.pattern = cuid2);
		$ZodStringFormat.init(inst, def);
	});
	var $ZodULID = $constructor("$ZodULID", (inst, def) => {
		def.pattern ?? (def.pattern = ulid);
		$ZodStringFormat.init(inst, def);
	});
	var $ZodXID = $constructor("$ZodXID", (inst, def) => {
		def.pattern ?? (def.pattern = xid);
		$ZodStringFormat.init(inst, def);
	});
	var $ZodKSUID = $constructor("$ZodKSUID", (inst, def) => {
		def.pattern ?? (def.pattern = ksuid);
		$ZodStringFormat.init(inst, def);
	});
	var $ZodISODateTime = $constructor("$ZodISODateTime", (inst, def) => {
		def.pattern ?? (def.pattern = datetime(def));
		$ZodStringFormat.init(inst, def);
	});
	var $ZodISODate = $constructor("$ZodISODate", (inst, def) => {
		def.pattern ?? (def.pattern = date);
		$ZodStringFormat.init(inst, def);
	});
	var $ZodISOTime = $constructor("$ZodISOTime", (inst, def) => {
		def.pattern ?? (def.pattern = time(def));
		$ZodStringFormat.init(inst, def);
	});
	var $ZodISODuration = $constructor("$ZodISODuration", (inst, def) => {
		def.pattern ?? (def.pattern = duration);
		$ZodStringFormat.init(inst, def);
	});
	var $ZodIPv4 = $constructor("$ZodIPv4", (inst, def) => {
		def.pattern ?? (def.pattern = ipv4);
		$ZodStringFormat.init(inst, def);
	});
	var ipv6Alphabet = /^[0-9a-fA-F:.]+$/;
	function isValidIPv6(value) {
		if (!ipv6Alphabet.test(value)) return false;
		return canParseURL(`http://[${value}]`);
	}
	var $ZodIPv6 = $constructor("$ZodIPv6", (inst, def) => {
		def.pattern ?? (def.pattern = ipv6);
		$ZodStringFormat.init(inst, def);
		inst._zod.check = (payload) => {
			if (!isValidIPv6(payload.value)) payload.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	var $ZodCIDRv4 = $constructor("$ZodCIDRv4", (inst, def) => {
		def.pattern ?? (def.pattern = cidrv4);
		$ZodStringFormat.init(inst, def);
	});
	function isValidCIDRv6(value) {
		const parts = value.split("/");
		if (parts.length !== 2) return false;
		const [address, prefix] = parts;
		if (!prefix) return false;
		const prefixNum = Number(prefix);
		if (`${prefixNum}` !== prefix) return false;
		if (prefixNum < 0 || prefixNum > 128) return false;
		return isValidIPv6(address);
	}
	var $ZodCIDRv6 = $constructor("$ZodCIDRv6", (inst, def) => {
		def.pattern ?? (def.pattern = cidrv6);
		$ZodStringFormat.init(inst, def);
		inst._zod.check = (payload) => {
			if (!isValidCIDRv6(payload.value)) payload.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	function isValidBase64(data) {
		if (data === "") return true;
		if (/\s/.test(data)) return false;
		if (data.length % 4 !== 0) return false;
		try {
			atob(data);
			return true;
		} catch {
			return false;
		}
	}
	var base64Charset = /^[0-9a-zA-Z+/]*={0,2}$/;
	var $ZodBase64 = $constructor("$ZodBase64", (inst, def) => {
		def.pattern ?? (def.pattern = base64Charset);
		$ZodStringFormat.init(inst, def);
		inst._zod.check = (payload) => {
			if (isValidBase64(payload.value)) return;
			payload.issues.push({
				code: "invalid_format",
				format: "base64",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	var base64urlCharset = /^[A-Za-z0-9_-]*$/;
	function isValidBase64URL(data) {
		if (!base64urlCharset.test(data)) return false;
		const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
		return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
	}
	var $ZodBase64URL = $constructor("$ZodBase64URL", (inst, def) => {
		def.pattern ?? (def.pattern = base64urlCharset);
		$ZodStringFormat.init(inst, def);
		inst._zod.check = (payload) => {
			if (isValidBase64URL(payload.value)) return;
			payload.issues.push({
				code: "invalid_format",
				format: "base64url",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	var $ZodE164 = $constructor("$ZodE164", (inst, def) => {
		def.pattern ?? (def.pattern = e164);
		$ZodStringFormat.init(inst, def);
	});
	function isValidJWT(token, algorithm = null) {
		try {
			const tokensParts = token.split(".");
			if (tokensParts.length !== 3) return false;
			const [header] = tokensParts;
			if (!header) return false;
			const parsedHeader = JSON.parse(atob(header));
			if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
			if (!parsedHeader.alg) return false;
			if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
			return true;
		} catch {
			return false;
		}
	}
	var $ZodJWT = $constructor("$ZodJWT", (inst, def) => {
		$ZodStringFormat.init(inst, def);
		inst._zod.check = (payload) => {
			if (isValidJWT(payload.value, def.alg)) return;
			payload.issues.push({
				code: "invalid_format",
				format: "jwt",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	var $ZodNumber = $constructor("$ZodNumber", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.pattern = number$1;
		inst._zod.parse = (payload, _ctx) => {
			if (def.coerce) try {
				payload.value = Number(payload.value);
			} catch (_) {}
			const input = payload.value;
			if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
			const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? String(input) : void 0 : void 0;
			payload.issues.push({
				expected: "number",
				code: "invalid_type",
				input,
				inst,
				...received ? { received } : {}
			});
			return payload;
		};
	});
	var $ZodNumberFormat = $constructor("$ZodNumberFormat", (inst, def) => {
		$ZodCheckNumberFormat.init(inst, def);
		$ZodNumber.init(inst, def);
	});
	var $ZodBoolean = $constructor("$ZodBoolean", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.pattern = boolean$1;
		inst._zod.parse = (payload, _ctx) => {
			if (def.coerce) try {
				payload.value = Boolean(payload.value);
			} catch (_) {}
			const input = payload.value;
			if (typeof input === "boolean") return payload;
			payload.issues.push({
				expected: "boolean",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		};
	});
	var $ZodUnknown = $constructor("$ZodUnknown", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.parse = (payload) => payload;
	});
	var $ZodNever = $constructor("$ZodNever", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.parse = (payload, _ctx) => {
			payload.issues.push({
				expected: "never",
				code: "invalid_type",
				input: payload.value,
				inst
			});
			return payload;
		};
	});
	function capSize(inst, size) {
		const caps = sizeCaps(inst._zod.def.checks);
		if (!caps.length) return;
		const cap = Math.min(...caps.map((c) => c[0]));
		const parse = inst._zod.parse;
		inst._zod.parse = (payload, ctx) => {
			const n = size(payload.value);
			if (n > cap && !ctx?.skipChecks && ctx?.direction !== "backward") {
				for (const [max, ch] of sizeCaps(inst._zod.def.checks)) if (n > max && ch._zod.def.when(payload)) {
					const start = payload.issues.length;
					ch._zod.check(payload);
					payload.issues[start].continue = false;
					attachSchema(payload.issues, start, inst);
					return payload;
				}
			}
			return parse(payload, ctx);
		};
	}
	var arraySize = (input) => Array.isArray(input) ? input.length : -1;
	function handleArrayResult(result, final, index) {
		if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
		final.value[index] = result.value;
	}
	var $ZodArray = $constructor("$ZodArray", (inst, def) => {
		$ZodType.init(inst, def);
		const memo = globalConfig.memoizer;
		memo?.attach(inst);
		inst._zod.parse = (payload, ctx) => {
			const input = payload.value;
			if (!Array.isArray(input)) {
				payload.issues.push({
					expected: "array",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			}
			payload.value = memo ? memo.alloc(inst, payload, Array(input.length), ctx) : Array(input.length);
			const proms = [];
			const abortEarly = ctx?.abortEarly;
			for (let i = 0; i < input.length; i++) {
				const item = input[i];
				const result = def.element._zod.run({
					value: item,
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
				else {
					handleArrayResult(result, payload, i);
					if (abortEarly && result.issues.length !== 0 && aborted(result)) break;
				}
			}
			if (proms.length) return Promise.all(proms).then(() => payload);
			return payload;
		};
		capSize(inst, arraySize);
	});
	function handlePropertyResult(result, final, key, input, optin, optout) {
		const isPresent = key in input;
		const isOptionalOut = optout === "optional";
		if (!isPresent && isOptionalOut && optin === "optional") return;
		if (result.issues.length) {
			if (optin !== void 0 && isOptionalOut && !isPresent) return;
			final.issues.push(...prefixIssues(key, result.issues));
		}
		if (!isPresent && optin === void 0) {
			if (!result.issues.length) final.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: void 0,
				path: [key]
			});
			return;
		}
		if (result.value === void 0) {
			if (isPresent || optin === "defaulted" && !isOptionalOut) final.value[key] = void 0;
		} else final.value[key] = result.value;
	}
	var NO_SYMBOL_KEYS = [];
	function normalizeDef(def) {
		const keys = Object.keys(def.shape);
		const ownSymbols = Object.getOwnPropertySymbols(def.shape);
		const symbolKeys = ownSymbols.length ? ownSymbols : NO_SYMBOL_KEYS;
		const allKeys = symbolKeys.length ? [...keys, ...symbolKeys] : keys;
		for (const k of allKeys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${String(k)}": expected a Zod schema`);
		const okeys = optionalKeys(def.shape);
		return {
			...def,
			allKeys,
			symbolKeys,
			keySet: new Set(keys),
			numKeys: keys.length,
			optionalKeys: new Set(okeys)
		};
	}
	function handleCatchall(proms, input, payload, ctx, def, inst, abortEarly) {
		const unrecognized = [];
		const keySet = def.keySet;
		const _catchall = def.catchall._zod;
		const t = _catchall.def.type;
		const optin = _catchall.optin;
		const optout = _catchall.optout;
		let seen = 0;
		for (const key in input) {
			if (abortEarly && payload.issues.length !== seen) {
				if (aborted(payload, seen)) break;
				seen = payload.issues.length;
			}
			if (keySet.has(key)) continue;
			if (key === "__proto__") {
				if (t === "never") unrecognized.push(key);
				continue;
			}
			if (t === "never") {
				unrecognized.push(key);
				continue;
			}
			const r = _catchall.run({
				value: input[key],
				issues: []
			}, ctx);
			if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
			else handlePropertyResult(r, payload, key, input, optin, optout);
		}
		if (unrecognized.length) payload.issues.push({
			code: "unrecognized_keys",
			keys: unrecognized,
			input,
			inst,
			continue: true
		});
		if (!proms.length) return payload;
		return Promise.all(proms).then(() => {
			return payload;
		});
	}
	var $ZodObject = $constructor("$ZodObject", (inst, def) => {
		$ZodType.init(inst, def);
		const desc = Object.getOwnPropertyDescriptor(def, "shape");
		const sh = desc?.get ? desc.get.raw : def.shape ?? {};
		if (sh) {
			const get = () => {
				const newSh = { ...sh };
				Object.defineProperty(def, "shape", { value: newSh });
				get.raw = newSh;
				return newSh;
			};
			get.raw = sh;
			Object.defineProperty(def, "shape", { get });
		}
		const _normalized = cached(() => normalizeDef(def));
		defineLazyInternal(inst, "propValues", (zod) => {
			const shape = zod.def.shape;
			const propValues = {};
			for (const key in shape) {
				const field = shape[key]._zod;
				if (field.values) {
					if (!Object.prototype.hasOwnProperty.call(propValues, key)) assignProp(propValues, key, new Set());
					for (const v of field.values) propValues[key].add(v);
					if (field.optin !== void 0) propValues[key].add(void 0);
				}
			}
			return propValues;
		});
		const isObject = isObject$1;
		const catchall = def.catchall;
		let value;
		const memo = globalConfig.memoizer;
		memo?.attach(inst);
		inst._zod.parse = (payload, ctx) => {
			value ?? (value = _normalized.value);
			const input = payload.value;
			if (!isObject(input)) {
				payload.issues.push({
					expected: "object",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			}
			payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
			const proms = [];
			const shape = value.shape;
			const abortEarly = ctx?.abortEarly;
			let seen = payload.issues.length;
			for (const key of value.allKeys) {
				if (abortEarly && payload.issues.length !== seen) {
					if (aborted(payload, seen)) break;
					seen = payload.issues.length;
				}
				if (key === "__proto__") continue;
				const el = shape[key];
				const optin = el._zod.optin;
				const optout = el._zod.optout;
				const r = el._zod.run({
					value: input[key],
					issues: []
				}, ctx);
				if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
				else handlePropertyResult(r, payload, key, input, optin, optout);
			}
			if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
			return handleCatchall(proms, input, payload, ctx, _normalized.value, inst, abortEarly === true);
		};
	});
	var $ZodObjectJIT = $constructor("$ZodObjectJIT", (inst, def) => {
		$ZodObject.init(inst, def);
		const superParse = inst._zod.parse;
		const _normalized = cached(() => normalizeDef(def));
		const memo = globalConfig.memoizer;
		const generateFastpass = (shape) => {
			const normalized = _normalized.value;
			const syms = normalized.symbolKeys;
			const doc = new Doc(["payload", "ctx"], {
				shape,
				inst,
				memo,
				syms
			});
			const parseStr = (k) => `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
			const prefixStr = (id, k) => `
          let ${id}_ab = false;
          for (let i = 0; i < ${id}.issues.length; i++) {
            const iss = ${id}.issues[i];
            iss.path = iss.path ? [${k}, ...iss.path] : [${k}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${id}_ab = true;
          }
          if (${id}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
			doc.write(`const input = payload.value;`);
			const ids = Object.create(null);
			let counter = 0;
			for (const key of normalized.allKeys) ids[key] = `key_${counter++}`;
			doc.write(memo ? `const newResult = memo.alloc(inst, payload, {}, ctx);` : `const newResult = {};`);
			for (const key of normalized.allKeys) {
				if (key === "__proto__") continue;
				const id = ids[key];
				const k = typeof key === "symbol" ? `syms[${syms.indexOf(key)}]` : esc(key);
				const isPresent = `${k} in input`;
				const schema = shape[key];
				const optin = schema?._zod?.optin;
				const isOptionalIn = optin !== void 0;
				const isOptionalOut = schema?._zod?.optout === "optional";
				doc.write(`const ${id} = ${parseStr(k)};`);
				if (isOptionalIn && isOptionalOut) {
					const assign = optin === "optional" ? `${id}_present` : `${id}.value !== undefined || ${id}_present`;
					doc.write(`
        const ${id}_present = ${isPresent};
        if (!${id}.issues.length || ${id}_present) {
          if (${id}.issues.length) {${prefixStr(id, k)}
          }

          if (${assign}) {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
				} else if (!isOptionalIn) doc.write(`
        const ${id}_present = ${isPresent};
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${id}_present) {
          newResult[${k}] = ${id}.value;
        }

      `);
				else {
					doc.write(`
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
      `);
					if (optin === "defaulted") doc.write(`newResult[${k}] = ${id}.value;`);
					else doc.write(`
        if (${id}.value !== undefined || ${isPresent}) {
          newResult[${k}] = ${id}.value;
        }
      `);
				}
			}
			doc.write(`payload.value = newResult;`);
			doc.write(`return payload;`);
			return doc.compile();
		};
		let fastpass;
		const isObject = isObject$1;
		const jit = !globalConfig.jitless;
		const fastEnabled = jit && allowsEval.value;
		const catchall = def.catchall;
		let value;
		inst._zod.parse = (payload, ctx) => {
			value ?? (value = _normalized.value);
			const input = payload.value;
			if (!isObject(input)) {
				payload.issues.push({
					expected: "object",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			}
			if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
				if (!fastpass) fastpass = generateFastpass(def.shape);
				payload = fastpass(payload, ctx);
				if (!catchall) return payload;
				return handleCatchall([], input, payload, ctx, value, inst, ctx?.abortEarly === true);
			}
			return superParse(payload, ctx);
		};
	});
	function handleUnionResults(results, final, inst, ctx) {
		for (const result of results) if (result.issues.length === 0) {
			final.value = result.value;
			return final;
		}
		const nonaborted = results.filter((r) => !aborted(r));
		if (nonaborted.length === 1) {
			final.value = nonaborted[0].value;
			return nonaborted[0];
		}
		final.issues.push({
			code: "invalid_union",
			input: final.value,
			inst,
			errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
		});
		return final;
	}
	var $ZodUnion = $constructor("$ZodUnion", (inst, def) => {
		$ZodType.init(inst, def);
		defineLazyInternal(inst, "optin", (zod) => zod.def.options.some((o) => o._zod.optin === "defaulted") ? "defaulted" : zod.def.options.some((o) => o._zod.optin !== void 0) ? "optional" : void 0);
		defineLazyInternal(inst, "optout", (zod) => zod.def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
		defineLazyInternal(inst, "values", (zod) => {
			if (zod.def.options.every((o) => o._zod.values)) return new Set(zod.def.options.flatMap((option) => Array.from(option._zod.values)));
		});
		defineLazyInternal(inst, "pattern", (zod) => {
			if (zod.def.options.every((o) => o._zod.pattern)) {
				const patterns = zod.def.options.map((o) => o._zod.pattern);
				return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
			}
		});
		const first = def.options.length === 1 ? def.options[0]._zod.run : null;
		inst._zod.parse = (payload, ctx) => {
			if (first) return first(payload, ctx);
			let async = false;
			const results = [];
			for (const option of def.options) {
				const result = option._zod.run({
					value: payload.value,
					issues: []
				}, ctx);
				if (result instanceof Promise) {
					results.push(result);
					async = true;
				} else {
					if (result.issues.length === 0) return result;
					results.push(result);
				}
			}
			if (!async) return handleUnionResults(results, payload, inst, ctx);
			return Promise.all(results).then((results) => {
				return handleUnionResults(results, payload, inst, ctx);
			});
		};
	});
	var $ZodIntersection = $constructor("$ZodIntersection", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.parse = (payload, ctx) => {
			const input = payload.value;
			const left = def.left._zod.run({
				value: input,
				issues: []
			}, ctx);
			const right = def.right._zod.run({
				value: input,
				issues: []
			}, ctx);
			if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
				return handleIntersectionResults(payload, left, right);
			});
			return handleIntersectionResults(payload, left, right);
		};
	});
	function mergeValues(a, b) {
		if (a === b) return {
			valid: true,
			data: a
		};
		if (a instanceof Date && b instanceof Date && +a === +b) return {
			valid: true,
			data: a
		};
		if (isPlainObject$1(a) && isPlainObject$1(b)) {
			const bKeys = Object.keys(b);
			const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
			const newObj = {
				...a,
				...b
			};
			if (Object.prototype.hasOwnProperty.call(newObj, "__proto__")) delete newObj.__proto__;
			for (const key of sharedKeys) {
				if (key === "__proto__") continue;
				const sharedValue = mergeValues(a[key], b[key]);
				if (!sharedValue.valid) return {
					valid: false,
					mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
				};
				newObj[key] = sharedValue.data;
			}
			return {
				valid: true,
				data: newObj
			};
		}
		if (Array.isArray(a) && Array.isArray(b)) {
			if (a.length !== b.length) return {
				valid: false,
				mergeErrorPath: []
			};
			const newArray = [];
			for (let index = 0; index < a.length; index++) {
				const itemA = a[index];
				const itemB = b[index];
				const sharedValue = mergeValues(itemA, itemB);
				if (!sharedValue.valid) return {
					valid: false,
					mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
				};
				newArray.push(sharedValue.data);
			}
			return {
				valid: true,
				data: newArray
			};
		}
		return {
			valid: false,
			mergeErrorPath: []
		};
	}
	function handleIntersectionResults(result, left, right) {
		const unrecKeys = new Map();
		let unrecIssue;
		const keyIssues = new Map();
		const collect = (iss, side) => {
			let keys;
			if (iss.code === "unrecognized_keys" && !iss.path?.length) {
				unrecIssue ?? (unrecIssue = iss);
				keys = iss.keys;
			} else if (iss.code === "invalid_key" && iss.origin === "record" && iss.path?.length === 1) {
				const k = String(iss.path[0]);
				if (!keyIssues.has(k)) keyIssues.set(k, iss);
				keys = [k];
			} else return false;
			for (const k of keys) {
				if (!unrecKeys.has(k)) unrecKeys.set(k, {});
				unrecKeys.get(k)[side] = true;
			}
			return true;
		};
		for (const iss of left.issues) if (!collect(iss, "l")) result.issues.push(iss);
		for (const iss of right.issues) if (!collect(iss, "r")) result.issues.push(iss);
		const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
		if (bothKeys.length) {
			const aggregated = unrecIssue ? bothKeys.filter((k) => unrecIssue.keys.includes(k)) : [];
			if (aggregated.length) result.issues.push({
				...unrecIssue,
				keys: aggregated
			});
			for (const k of bothKeys) if (!aggregated.includes(k) && keyIssues.has(k)) result.issues.push(keyIssues.get(k));
		}
		const merged = mergeValues(left.value, right.value);
		if (!merged.valid) {
			if (aborted(result)) return result;
			throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
		}
		result.value = merged.data;
		return result;
	}
	var $ZodEnum = $constructor("$ZodEnum", (inst, def) => {
		$ZodType.init(inst, def);
		const values = getEnumValues(def.entries);
		const valuesSet = new Set(values);
		inst._zod.values = valuesSet;
		defineLazyInternal(inst, "pattern", (zod) => {
			const patternValues = getEnumValues(zod.def.entries).filter((k) => propertyKeyTypes.has(typeof k));
			return new RegExp(patternValues.length ? `^(${patternValues.map((o) => escapeRegex(o.toString())).join("|")})$` : "^[^\\s\\S]$");
		});
		inst._zod.parse = (payload, _ctx) => {
			const input = payload.value;
			if (valuesSet.has(input)) return payload;
			payload.issues.push({
				code: "invalid_value",
				values,
				input,
				inst
			});
			return payload;
		};
	});
	var $ZodLiteral = $constructor("$ZodLiteral", (inst, def) => {
		$ZodType.init(inst, def);
		const values = new Set(def.values);
		inst._zod.values = values;
		defineLazyInternal(inst, "pattern", (zod) => {
			const vals = zod.def.values;
			return new RegExp(vals.length ? `^(${vals.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$` : "^[^\\s\\S]$");
		});
		inst._zod.parse = (payload, _ctx) => {
			const input = payload.value;
			if (values.has(input)) return payload;
			payload.issues.push({
				code: "invalid_value",
				values: def.values,
				input,
				inst
			});
			return payload;
		};
	});
	var $ZodTransform = $constructor("$ZodTransform", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.optin = "optional";
		globalConfig.memoizer?.guard(inst);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
			const _out = def.transform(payload.value, payload);
			if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
				payload.value = output;
				return payload;
			});
			if (_out instanceof Promise) throw new $ZodAsyncError();
			payload.value = _out;
			return payload;
		};
	});
	function handleOptionalResult(payload, result) {
		payload.value = result.issues.length ? void 0 : result.value;
		return payload;
	}
	var $ZodOptional = $constructor("$ZodOptional", (inst, def) => {
		$ZodType.init(inst, def);
		defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
		inst._zod.optout = "optional";
		defineLazyInternal(inst, "values", (zod) => {
			const values = zod.def.innerType._zod.values;
			return values ? new Set([...values, void 0]) : void 0;
		});
		defineLazyInternal(inst, "pattern", (zod) => {
			const pattern = zod.def.innerType._zod.pattern;
			return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
		});
		inst._zod.parse = (payload, ctx) => {
			if (payload.value === void 0) {
				if (def.innerType._zod.optin !== "defaulted") return payload;
				const result = def.innerType._zod.run({
					value: payload.value,
					issues: []
				}, ctx);
				if (result instanceof Promise) return result.then((result) => handleOptionalResult(payload, result));
				return handleOptionalResult(payload, result);
			}
			return def.innerType._zod.run(payload, ctx);
		};
	});
	var $ZodExactOptional = $constructor("$ZodExactOptional", (inst, def) => {
		$ZodOptional.init(inst, def);
		defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
		defineLazyInternal(inst, "pattern", (zod) => zod.def.innerType._zod.pattern);
		inst._zod.parse = (payload, ctx) => {
			return def.innerType._zod.run(payload, ctx);
		};
	});
	var $ZodNullable = $constructor("$ZodNullable", (inst, def) => {
		$ZodType.init(inst, def);
		defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin);
		defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
		defineLazyInternal(inst, "pattern", (zod) => {
			const pattern = zod.def.innerType._zod.pattern;
			return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
		});
		defineLazyInternal(inst, "values", (zod) => {
			return zod.def.innerType._zod.values ? new Set([...zod.def.innerType._zod.values, null]) : void 0;
		});
		inst._zod.parse = (payload, ctx) => {
			if (payload.value === null) return payload;
			return def.innerType._zod.run(payload, ctx);
		};
	});
	var $ZodDefault = $constructor("$ZodDefault", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.optin = "defaulted";
		defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
			if (payload.value === void 0) {
				payload.value = def.defaultValue;
				return payload;
			}
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
			return handleDefaultResult(result, def);
		};
	});
	function handleDefaultResult(payload, def) {
		if (payload.value === void 0) payload.value = def.defaultValue;
		return payload;
	}
	var $ZodPrefault = $constructor("$ZodPrefault", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.optin = "defaulted";
		defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
			if (payload.value === void 0) payload.value = def.defaultValue;
			return def.innerType._zod.run(payload, ctx);
		};
	});
	var $ZodNonOptional = $constructor("$ZodNonOptional", (inst, def) => {
		$ZodType.init(inst, def);
		defineLazyInternal(inst, "values", (zod) => {
			const v = zod.def.innerType._zod.values;
			return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
		});
		inst._zod.parse = (payload, ctx) => {
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
			return handleNonOptionalResult(result, inst);
		};
	});
	function handleNonOptionalResult(payload, inst) {
		if (!payload.issues.length && payload.value === void 0) payload.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: payload.value,
			inst
		});
		return payload;
	}
	function handleCatchResult(payload, result, def, ctx) {
		if (!result.issues.length) {
			payload.value = result.value;
			if (result.memo) payload.memo = true;
			return payload;
		}
		payload.value = def.catchValue({
			...result,
			value: payload.value,
			error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
			input: payload.value
		});
		return payload;
	}
	var $ZodCatch = $constructor("$ZodCatch", (inst, def) => {
		$ZodType.init(inst, def);
		defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
		defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
		defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
			const result = def.innerType._zod.run({
				value: payload.value,
				issues: []
			}, ctx);
			if (result instanceof Promise) return result.then((result) => handleCatchResult(payload, result, def, ctx));
			return handleCatchResult(payload, result, def, ctx);
		};
	});
	var $ZodPipe = $constructor("$ZodPipe", (inst, def) => {
		$ZodType.init(inst, def);
		defineLazyInternal(inst, "values", (zod) => zod.def.in._zod.values);
		defineLazyInternal(inst, "optin", (zod) => zod.def.in._zod.optin);
		defineLazyInternal(inst, "optout", (zod) => zod.def.out._zod.optout);
		defineLazyInternal(inst, "propValues", (zod) => zod.def.in._zod.propValues);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") {
				const right = def.out._zod.run(payload, ctx);
				if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
				return handlePipeResult(right, def.in, ctx);
			}
			const left = def.in._zod.run(payload, ctx);
			if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
			return handlePipeResult(left, def.out, ctx);
		};
	});
	function handlePipeResult(left, next, ctx) {
		if (left.issues.some((iss) => iss.code !== "unrecognized_keys")) {
			left.aborted = true;
			return left;
		}
		return next._zod.run({
			value: left.value,
			issues: left.issues
		}, ctx);
	}
	var $ZodReadonly = $constructor("$ZodReadonly", (inst, def) => {
		$ZodType.init(inst, def);
		defineLazyInternal(inst, "propValues", (zod) => zod.def.innerType._zod.propValues);
		defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
		defineLazyInternal(inst, "optin", (zod) => zod.def.innerType?._zod?.optin);
		defineLazyInternal(inst, "optout", (zod) => zod.def.innerType?._zod?.optout);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then(handleReadonlyResult);
			return handleReadonlyResult(result);
		};
	});
	function handleReadonlyResult(payload) {
		if (!payload.memo) payload.value = Object.freeze(payload.value);
		return payload;
	}
	var $ZodCustom = $constructor("$ZodCustom", (inst, def) => {
		$ZodCheck.init(inst, def);
		$ZodType.init(inst, def);
		inst._zod.parse = (payload, _) => {
			return payload;
		};
		inst._zod.check = (payload) => {
			const input = payload.value;
			const r = def.fn(input);
			if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
			handleRefineResult(r, payload, input, inst);
		};
	});
	function handleRefineResult(result, payload, input, inst) {
		if (!result) {
			const _iss = {
				code: "custom",
				input,
				inst,
				path: [...inst._zod.def.path ?? []],
				continue: !inst._zod.def.abort
			};
			if (inst._zod.def.params) _iss.params = inst._zod.def.params;
			payload.issues.push(issue(_iss));
		}
	}
	var $ZodCyclicError = class extends Error {
		constructor() {
			super(`Cannot parse a reference cycle that closes through a transform`);
			this.name = "ZodCyclicError";
		}
	};
	var STATE = "~memo";
	var NO_ISSUES = [];
	function isRef$2(value) {
		return value !== null && typeof value === "object";
	}
	function cloneIssues(issues) {
		return issues.map((iss) => iss.path ? {
			...iss,
			path: iss.path.slice()
		} : { ...iss });
	}
	var recursive = new WeakMap();
	var NONE = 0;
	var ASSUMED = 1;
	var PROVEN = 2;
	function isRecursive(inst, stack, resolve) {
		const cached = recursive.get(inst);
		if (cached !== void 0) return cached ? PROVEN : NONE;
		if (stack.has(inst)) return PROVEN;
		stack.add(inst);
		let result = NONE;
		const check = (child) => {
			if (result !== PROVEN && child?._zod) {
				const answer = isRecursive(child, stack, resolve);
				if (answer > result) result = answer;
			}
		};
		const shape = (sh, spread) => {
			let answer = NONE;
			for (const key of Reflect.ownKeys(sh)) {
				const desc = Object.getOwnPropertyDescriptor(sh, key);
				if (spread && !desc.enumerable) continue;
				const child = desc.get ? ASSUMED : desc.value?._zod ? isRecursive(desc.value, stack, resolve) : NONE;
				if (child > answer) answer = child;
			}
			return answer;
		};
		const merge = (answer) => {
			if (answer > result) result = answer;
		};
		const def = inst._zod.def;
		switch (def.type) {
			case "object": {
				const raw = rawShape(def);
				merge(raw ? shape(raw, true) : ASSUMED);
				check(def.catchall);
				break;
			}
			case "array":
				check(def.element);
				break;
			case "tuple":
				for (const el of def.items) check(el);
				check(def.rest);
				break;
			case "record":
			case "map":
				check(def.keyType);
				check(def.valueType);
				break;
			case "set":
				check(def.valueType);
				break;
			case "union":
				for (const el of def.options) check(el);
				break;
			case "intersection":
				check(def.left);
				check(def.right);
				break;
			case "optional":
			case "nullable":
			case "default":
			case "prefault":
			case "catch":
			case "readonly":
			case "nonoptional":
			case "promise":
			case "success":
				check(def.innerType);
				break;
			case "pipe":
				check(def.in);
				check(def.out);
				break;
			case "function":
				check(def.input);
				check(def.output);
				break;
			case "lazy": {
				const inner = def._cachedInner ?? (resolve ? inst._zod.innerType : void 0);
				merge(inner ? isRecursive(inner, stack, false) : ASSUMED);
				break;
			}
			case "template_literal":
			case "string":
			case "number":
			case "int":
			case "boolean":
			case "bigint":
			case "symbol":
			case "undefined":
			case "null":
			case "void":
			case "never":
			case "any":
			case "unknown":
			case "date":
			case "nan":
			case "enum":
			case "literal":
			case "file":
			case "transform":
			case "custom": break;
			default: for (const key in def) {
				const desc = Object.getOwnPropertyDescriptor(def, key);
				if (!desc || desc.get) continue;
				const value = desc.value;
				if (!value || typeof value !== "object") continue;
				if (value._zod) check(value);
				else if (Array.isArray(value)) for (const el of value) check(el);
			}
		}
		stack.delete(inst);
		return settle(inst, result);
	}
	function settle(inst, answer) {
		if (answer !== ASSUMED) recursive.set(inst, answer === PROVEN);
		return answer;
	}
	function bucketFor(state, inst) {
		let bucket = state.buckets.get(inst);
		if (!bucket) {
			bucket = new WeakMap();
			state.buckets.set(inst, bucket);
		}
		return bucket;
	}
	var handoff;
	var open = [];
	var memo = {
		alloc(_inst, payload, empty) {
			const bucket = handoff;
			if (!bucket) return empty;
			handoff = void 0;
			const entry = {
				value: empty,
				issues: null
			};
			bucket.set(payload.value, entry);
			open.push(entry);
			return empty;
		},
		guard(inst) {
			var _a;
			(_a = inst._zod).deferred ?? (_a.deferred = []);
			inst._zod.deferred.push(() => {
				const base = inst._zod.parse;
				const wrapped = (payload, ctx) => {
					if (ctx.direction !== "backward" && isBackEdge(ctx, payload.value)) throw new $ZodCyclicError();
					return base(payload, ctx);
				};
				inst._zod.parse = wrapped;
				if (inst._zod.run === base) inst._zod.run = wrapped;
			});
		},
		attach(inst) {
			var _a;
			let isRecursiveInst;
			let rechecked = false;
			let lastCtx;
			let lastBucket;
			(_a = inst._zod).deferred ?? (_a.deferred = []);
			inst._zod.deferred.push(() => {
				const base = inst._zod.parse;
				const wrapped = (payload, ctx) => {
					if (isRecursiveInst === void 0) {
						const walked = isRecursive(inst, new Set(), false);
						if (walked === NONE) {
							inst._zod.parse = base;
							if (inst._zod.run === wrapped) inst._zod.run = base;
							return base(payload, ctx);
						}
						if (walked === PROVEN || rechecked) isRecursiveInst = true;
						else rechecked = true;
					}
					const input = payload.value;
					if (!isRef$2(input)) return base(payload, ctx);
					let state = ctx[STATE];
					if (!state) {
						state = {
							buckets: new WeakMap(),
							backEdges: void 0
						};
						ctx[STATE] = state;
					}
					let bucket;
					if (lastCtx === ctx) bucket = lastBucket;
					else {
						bucket = bucketFor(state, inst);
						lastCtx = ctx;
						lastBucket = bucket;
					}
					const hit = bucket.get(input);
					if (hit) {
						payload.value = hit.value;
						if (hit.issues) {
							if (hit.issues.length) payload.issues.push(...cloneIssues(hit.issues));
						} else {
							payload.memo = true;
							state.backEdges ?? (state.backEdges = new WeakSet());
							state.backEdges.add(hit.value);
						}
						return payload;
					}
					handoff = bucket;
					const depth = open.length;
					const result = base(payload, ctx);
					handoff = void 0;
					const entry = open.length > depth ? open.pop() : void 0;
					if (result instanceof Promise) return result.then((r) => {
						if (entry) entry.issues = r.issues.length ? cloneIssues(r.issues) : NO_ISSUES;
						return r;
					});
					if (entry) entry.issues = result.issues.length ? cloneIssues(result.issues) : NO_ISSUES;
					return result;
				};
				inst._zod.parse = wrapped;
				if (inst._zod.run === base) inst._zod.run = wrapped;
			});
		}
	};
	function memoizer() {
		return memo;
	}
	function isBackEdge(ctx, value) {
		const backEdges = ctx[STATE]?.backEdges;
		return backEdges !== void 0 && isRef$2(value) && backEdges.has(value);
	}
	var error = () => {
		const Sizable = {
			string: {
				unit: "characters",
				verb: "to have"
			},
			file: {
				unit: "bytes",
				verb: "to have"
			},
			array: {
				unit: "items",
				verb: "to have"
			},
			set: {
				unit: "items",
				verb: "to have"
			},
			map: {
				unit: "entries",
				verb: "to have"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "input",
			email: "email address",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO datetime",
			date: "ISO date",
			time: "ISO time",
			duration: "ISO duration",
			ipv4: "IPv4 address",
			ipv6: "IPv6 address",
			mac: "MAC address",
			cidrv4: "IPv4 range",
			cidrv6: "IPv6 range",
			base64: "base64-encoded string",
			base64url: "base64url-encoded string",
			json_string: "JSON string",
			e164: "E.164 number",
			currency_code: "currency code",
			credit_card: "credit card number",
			iban: "IBAN",
			jwt: "JWT",
			template_literal: "input"
		};
		const TypeDictionary = { nan: "NaN" };
		function getTypeName(type, input) {
			if (type === "number" && typeof input === "number" && !Number.isFinite(input)) return String(input);
			return TypeDictionary[type] ?? type;
		}
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": return `Invalid input: expected ${getTypeName(issue.expected)}, received ${getTypeName(parsedType(issue.input), issue.input)}`;
				case "invalid_value":
					if (issue.values.length === 1) return `Invalid input: expected ${stringifyPrimitive(issue.values[0])}`;
					return `Invalid option: expected one of ${joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.exact ? "exactly " : issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
					return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.exact ? "exactly " : issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Invalid string: must start with "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Invalid string: must end with "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Invalid string: must include "${_issue.includes}"`;
					if (_issue.format === "regex") return `Invalid string: must match pattern ${_issue.pattern}`;
					return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Invalid number: must be a multiple of ${issue.divisor}`;
				case "unrecognized_keys": return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Invalid key in ${issue.origin}`;
				case "invalid_union":
					if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) return `Invalid discriminator value. Expected ${issue.options.map((o) => `'${o}'`).join(" | ")}`;
					if (issue.inclusive === false) return "Invalid input: more than one option matched";
					return "Invalid input";
				case "invalid_element": return `Invalid value in ${issue.origin}`;
				default: return `Invalid input`;
			}
		};
	};
	function en_default() {
		return { localeError: error() };
	}
	var _a;
	var $ZodRegistry = class {
		constructor() {
			this._map = new WeakMap();
			this._idmap = new Map();
		}
		add(schema, ..._meta) {
			const meta = _meta[0];
			this._map.set(schema, meta);
			if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
			return this;
		}
		clear() {
			this._map = new WeakMap();
			this._idmap = new Map();
			return this;
		}
		remove(schema) {
			const meta = this._map.get(schema);
			if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
			this._map.delete(schema);
			return this;
		}
		get(schema) {
			const p = schema._zod.parent;
			if (p) {
				const pm = { ...this.get(p) ?? {} };
				delete pm.id;
				const f = {
					...pm,
					...this._map.get(schema)
				};
				return Object.keys(f).length ? f : void 0;
			}
			return this._map.get(schema);
		}
		has(schema) {
			return this._map.has(schema);
		}
	};
	function registry() {
		return new $ZodRegistry();
	}
	(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
	var globalRegistry = globalThis.__zod_globalRegistry;
	function snapshotChecks(def) {
		if (def.checks) def.checks = [...def.checks];
		return def;
	}
	function _string(Class, params) {
		return new Class(snapshotChecks({
			type: "string",
			...normalizeParams(params)
		}));
	}
	function _email(Class, params) {
		return new Class({
			type: "string",
			format: "email",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _guid(Class, params) {
		return new Class({
			type: "string",
			format: "guid",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _uuid(Class, params) {
		return new Class({
			type: "string",
			format: "uuid",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _uuidv4(Class, params) {
		return new Class({
			type: "string",
			format: "uuid",
			check: "string_format",
			abort: false,
			version: "v4",
			...normalizeParams(params)
		});
	}
	function _uuidv6(Class, params) {
		return new Class({
			type: "string",
			format: "uuid",
			check: "string_format",
			abort: false,
			version: "v6",
			...normalizeParams(params)
		});
	}
	function _uuidv7(Class, params) {
		return new Class({
			type: "string",
			format: "uuid",
			check: "string_format",
			abort: false,
			version: "v7",
			...normalizeParams(params)
		});
	}
	function _url(Class, params) {
		return new Class({
			type: "string",
			format: "url",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _emoji(Class, params) {
		return new Class({
			type: "string",
			format: "emoji",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _nanoid(Class, params) {
		return new Class({
			type: "string",
			format: "nanoid",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _cuid(Class, params) {
		return new Class({
			type: "string",
			format: "cuid",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _cuid2(Class, params) {
		return new Class({
			type: "string",
			format: "cuid2",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _ulid(Class, params) {
		return new Class({
			type: "string",
			format: "ulid",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _xid(Class, params) {
		return new Class({
			type: "string",
			format: "xid",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _ksuid(Class, params) {
		return new Class({
			type: "string",
			format: "ksuid",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _ipv4(Class, params) {
		return new Class({
			type: "string",
			format: "ipv4",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _ipv6(Class, params) {
		return new Class({
			type: "string",
			format: "ipv6",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _cidrv4(Class, params) {
		return new Class({
			type: "string",
			format: "cidrv4",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _cidrv6(Class, params) {
		return new Class({
			type: "string",
			format: "cidrv6",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _base64(Class, params) {
		return new Class({
			type: "string",
			format: "base64",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _base64url(Class, params) {
		return new Class({
			type: "string",
			format: "base64url",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _e164(Class, params) {
		return new Class({
			type: "string",
			format: "e164",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _jwt(Class, params) {
		return new Class({
			type: "string",
			format: "jwt",
			check: "string_format",
			abort: false,
			...normalizeParams(params)
		});
	}
	function _isoDateTime(Class, params) {
		return new Class({
			type: "string",
			format: "datetime",
			check: "string_format",
			offset: false,
			local: false,
			precision: null,
			...normalizeParams(params)
		});
	}
	function _isoDate(Class, params) {
		return new Class({
			type: "string",
			format: "date",
			check: "string_format",
			...normalizeParams(params)
		});
	}
	function _isoTime(Class, params) {
		return new Class({
			type: "string",
			format: "time",
			check: "string_format",
			precision: null,
			...normalizeParams(params)
		});
	}
	function _isoDuration(Class, params) {
		return new Class({
			type: "string",
			format: "duration",
			check: "string_format",
			...normalizeParams(params)
		});
	}
	function _number(Class, params) {
		return new Class(snapshotChecks({
			type: "number",
			checks: [],
			...normalizeParams(params)
		}));
	}
	function _int(Class, params) {
		return new Class({
			type: "number",
			check: "number_format",
			abort: false,
			format: "safeint",
			...normalizeParams(params)
		});
	}
	function _boolean(Class, params) {
		return new Class({
			type: "boolean",
			...normalizeParams(params)
		});
	}
	function _unknown(Class) {
		return new Class({ type: "unknown" });
	}
	function _never(Class, params) {
		return new Class({
			type: "never",
			...normalizeParams(params)
		});
	}
	function _lt(value, params) {
		return new $ZodCheckLessThan({
			check: "less_than",
			...normalizeParams(params),
			value,
			inclusive: false
		});
	}
	function _lte(value, params) {
		return new $ZodCheckLessThan({
			check: "less_than",
			...normalizeParams(params),
			value,
			inclusive: true
		});
	}
	function _gt(value, params) {
		return new $ZodCheckGreaterThan({
			check: "greater_than",
			...normalizeParams(params),
			value,
			inclusive: false
		});
	}
	function _gte(value, params) {
		return new $ZodCheckGreaterThan({
			check: "greater_than",
			...normalizeParams(params),
			value,
			inclusive: true
		});
	}
	function _multipleOf(value, params) {
		return new $ZodCheckMultipleOf({
			check: "multiple_of",
			...normalizeParams(params),
			value
		});
	}
	function _maxLength(maximum, params) {
		return new $ZodCheckMaxLength({
			check: "max_length",
			...normalizeParams(params),
			maximum
		});
	}
	function _minLength(minimum, params) {
		return new $ZodCheckMinLength({
			check: "min_length",
			...normalizeParams(params),
			minimum
		});
	}
	function _length(length, params) {
		return new $ZodCheckLengthEquals({
			check: "length_equals",
			...normalizeParams(params),
			length
		});
	}
	function _regex(pattern, params) {
		return new $ZodCheckRegex({
			check: "string_format",
			format: "regex",
			...normalizeParams(params),
			pattern
		});
	}
	function _lowercase(params) {
		return new $ZodCheckLowerCase({
			check: "string_format",
			format: "lowercase",
			...normalizeParams(params)
		});
	}
	function _uppercase(params) {
		return new $ZodCheckUpperCase({
			check: "string_format",
			format: "uppercase",
			...normalizeParams(params)
		});
	}
	function _includes(includes, params) {
		return new $ZodCheckIncludes({
			check: "string_format",
			format: "includes",
			...normalizeParams(params),
			includes
		});
	}
	function _startsWith(prefix, params) {
		return new $ZodCheckStartsWith({
			check: "string_format",
			format: "starts_with",
			...normalizeParams(params),
			prefix
		});
	}
	function _endsWith(suffix, params) {
		return new $ZodCheckEndsWith({
			check: "string_format",
			format: "ends_with",
			...normalizeParams(params),
			suffix
		});
	}
	function _overwrite(tx) {
		return new $ZodCheckOverwrite({
			check: "overwrite",
			tx
		});
	}
	function _normalize(form) {
		return _overwrite((input) => input.normalize(form));
	}
	function _trim() {
		return _overwrite((input) => input.trim());
	}
	function _toLowerCase() {
		return _overwrite((input) => input.toLowerCase());
	}
	function _toUpperCase() {
		return _overwrite((input) => input.toUpperCase());
	}
	function _slugify() {
		return _overwrite((input) => slugify(input));
	}
	function _array(Class, element, params) {
		return new Class({
			type: "array",
			element,
			...normalizeParams(params)
		});
	}
	function _custom(Class, fn, _params) {
		const norm = normalizeParams(_params);
		norm.abort ?? (norm.abort = true);
		return new Class({
			type: "custom",
			check: "custom",
			fn,
			...norm
		});
	}
	function _refine(Class, fn, _params) {
		return new Class({
			type: "custom",
			check: "custom",
			fn,
			...normalizeParams(_params)
		});
	}
	function _superRefine(fn, params) {
		const ch = _check((payload) => {
			payload.addIssue = (issue$2) => {
				if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
				else {
					const _issue = issue$2;
					if (_issue.fatal) _issue.continue = false;
					_issue.code ?? (_issue.code = "custom");
					if (!("input" in _issue)) _issue.input = payload.value;
					_issue.inst ?? (_issue.inst = ch);
					_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
					payload.issues.push(issue(_issue));
				}
			};
			return fn(payload.value, payload);
		}, params);
		return ch;
	}
	function _check(fn, params) {
		const ch = new $ZodCheck({
			check: "custom",
			...normalizeParams(params)
		});
		ch._zod.check = fn;
		return ch;
	}
	function assignProps(target, ...sources) {
		for (const source of sources) for (const key of Reflect.ownKeys(source)) if (Object.prototype.propertyIsEnumerable.call(source, key)) assignProp(target, key, source[key]);
		return target;
	}
	function initializeContext(params) {
		let target = params?.target ?? "draft-2020-12";
		if (target === "draft-4") target = "draft-04";
		if (target === "draft-7") target = "draft-07";
		return {
			processors: params.processors ?? {},
			metadataRegistry: params?.metadata ?? globalRegistry,
			target,
			unrepresentable: params?.unrepresentable ?? "throw",
			override: params?.override ?? (() => {}),
			io: params?.io ?? "output",
			counter: 0,
			seen: new Map(),
			sharedDefsExtractedFor: void 0,
			sharedEmitDoneFor: void 0,
			cycles: params?.cycles ?? "ref",
			reused: params?.reused ?? "inline",
			intersections: [],
			deferred: [],
			external: params?.external ?? void 0
		};
	}
	function handleUnrepresentable(schema, ctx, json, params, message) {
		const result = typeof ctx.unrepresentable === "function" ? ctx.unrepresentable({
			zodSchema: schema,
			path: params.path,
			message
		}) : ctx.unrepresentable;
		if (result === "any") return false;
		if (result === void 0 || result === "throw") throw new Error(message);
		Object.assign(json, result);
		return true;
	}
	function processSchema(schema, ctx, _params = {
		path: [],
		schemaPath: []
	}) {
		var _a;
		const def = schema._zod.def;
		const seen = ctx.seen.get(schema);
		if (seen) {
			seen.count++;
			if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
			return seen.schema;
		}
		const result = {
			schema: {},
			count: 1,
			cycle: void 0,
			path: _params.path
		};
		ctx.seen.set(schema, result);
		ctx.sharedDefsExtractedFor = void 0;
		ctx.sharedEmitDoneFor = void 0;
		const overrideSchema = schema._zod.toJSONSchema?.();
		if (overrideSchema) result.schema = overrideSchema;
		else {
			const params = {
				..._params,
				schemaPath: [..._params.schemaPath, schema],
				path: _params.path
			};
			if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
			else {
				const _json = result.schema;
				const processor = ctx.processors[def.type];
				if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
				processor(schema, ctx, _json, params);
			}
			const parent = schema._zod.parent;
			if (parent) {
				if (!result.ref) result.ref = parent;
				processSchema(parent, ctx, params);
				ctx.seen.get(parent).isParent = true;
			}
		}
		const meta = ctx.metadataRegistry.get(schema);
		if (meta) assignProps(result.schema, meta);
		if (ctx.io === "input" && isTransforming(schema)) {
			delete result.schema.examples;
			delete result.schema.default;
		}
		if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
		delete result.schema._prefault;
		return ctx.seen.get(schema).schema;
	}
	function encodeJSONPointerSegment(segment) {
		return segment.replace(/~/g, "~0").replace(/\//g, "~1");
	}
	function extractDefs(ctx, schema) {
		const root = ctx.seen.get(schema);
		if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
		if (ctx.external && ctx.sharedDefsExtractedFor === ctx.external) return;
		const idToSchema = new Map();
		for (const entry of ctx.seen.entries()) {
			const id = ctx.metadataRegistry.get(entry[0])?.id;
			if (id) {
				const existing = idToSchema.get(id);
				if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
				idToSchema.set(id, entry[0]);
			}
		}
		const makeURI = (entry) => {
			const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
			if (ctx.external) {
				const externalId = ctx.external.registry.get(entry[0])?.id;
				const uriGenerator = ctx.external.uri ?? ((id) => id);
				if (externalId) return { ref: uriGenerator(externalId) };
				const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
				entry[1].defId = id;
				return {
					defId: id,
					ref: `${uriGenerator("__shared")}#/${defsSegment}/${encodeJSONPointerSegment(id)}`
				};
			}
			const uriPrefix = `#`;
			const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
			if (entry[1] === root && !entry[1].schema.id) return { ref: uriPrefix };
			const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
			return {
				defId,
				ref: defUriPrefix + encodeJSONPointerSegment(defId)
			};
		};
		const extractToDef = (entry) => {
			if (entry[1].schema.$ref) return;
			const seen = entry[1];
			const { ref, defId } = makeURI(entry);
			seen.def = { ...seen.schema };
			if (defId) seen.defId = defId;
			const schema = seen.schema;
			for (const key in schema) delete schema[key];
			schema.$ref = ref;
		};
		if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
			const seen = entry[1];
			if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
		}
		for (const entry of ctx.seen.entries()) {
			const seen = entry[1];
			if (schema === entry[0]) {
				extractToDef(entry);
				continue;
			}
			if (ctx.external) {
				const ext = ctx.external.registry.get(entry[0])?.id;
				if (schema !== entry[0] && ext) {
					extractToDef(entry);
					continue;
				}
			}
			if (ctx.metadataRegistry.get(entry[0])?.id) {
				extractToDef(entry);
				continue;
			}
			if (seen.cycle) {
				extractToDef(entry);
				continue;
			}
			if (seen.count > 1) {
				if (ctx.reused === "ref") extractToDef(entry);
			}
		}
		if (ctx.external) ctx.sharedDefsExtractedFor = ctx.external;
	}
	function compactTypeUnion(schema) {
		const options = schema.anyOf;
		if (!Array.isArray(options) || options.length === 0 || schema.type !== void 0) return;
		const types = [];
		for (const option of options) {
			if (!option || typeof option !== "object") return;
			compactTypeUnion(option);
			const keys = Object.keys(option);
			if (keys.length !== 1 || keys[0] !== "type") return;
			const type = option.type;
			for (const member of Array.isArray(type) ? type : [type]) {
				if (typeof member !== "string") return;
				if (!types.includes(member)) types.push(member);
			}
		}
		delete schema.anyOf;
		schema.type = types.length === 1 ? types[0] : types;
	}
	var FOLDABLE_KEYS = new Set([
		"type",
		"properties",
		"required",
		"additionalProperties"
	]);
	var UNION_KEYS = ["oneOf", "anyOf"];
	function undeclaredConstraint(member) {
		const extra = member.additionalProperties;
		if (extra === void 0 || extra === false || typeof extra !== "object" || extra === null) return null;
		return Object.keys(extra).length ? extra : null;
	}
	function foldObjects(members) {
		const objects = [];
		for (const member of members) {
			if (typeof member !== "object" || member.type !== "object") return null;
			for (const key in member) if (!FOLDABLE_KEYS.has(key)) return null;
			objects.push(member);
		}
		const properties = {};
		const required = new Set();
		for (const object of objects) {
			for (const key in object.properties) {
				if (Object.prototype.hasOwnProperty.call(properties, key)) continue;
				const parts = [];
				for (const other of objects) {
					const part = other.properties?.[key] ?? undeclaredConstraint(other);
					if (part === null || part === void 0) continue;
					if (!parts.some((seen) => JSON.stringify(seen) === JSON.stringify(part))) parts.push(part);
				}
				assignProp(properties, key, parts.length === 1 ? parts[0] : foldObjects(parts) ?? { allOf: parts });
			}
			for (const key of object.required ?? []) required.add(key);
		}
		const folded = {
			type: "object",
			properties
		};
		if (required.size) folded.required = [...required];
		if (objects.every((object) => object.additionalProperties === false)) folded.additionalProperties = false;
		else {
			const constraints = [];
			for (const object of objects) {
				const constraint = undeclaredConstraint(object);
				if (constraint && !constraints.some((seen) => JSON.stringify(seen) === JSON.stringify(constraint))) constraints.push(constraint);
			}
			if (constraints.length === 1) folded.additionalProperties = constraints[0];
			else if (constraints.length > 1) folded.additionalProperties = { allOf: constraints };
		}
		return folded;
	}
	function foldIntersection(json) {
		const allOf = json.allOf;
		if (!Array.isArray(allOf) || allOf.length < 2) return;
		for (const key of FOLDABLE_KEYS) if (key in json) return;
		const unions = allOf.filter((m) => UNION_KEYS.some((k) => Array.isArray(m[k])));
		let folded = null;
		if (!unions.length) folded = foldObjects(allOf);
		else {
			const union = unions[0];
			const keyword = UNION_KEYS.find((k) => Array.isArray(union[k]));
			if (Object.keys(union).length !== 1) return;
			const rest = allOf.filter((m) => m !== union);
			const branches = union[keyword].map((branch) => foldObjects([...rest, branch]));
			if (branches.some((b) => !b)) return;
			folded = { [keyword]: branches };
		}
		if (!folded) return;
		delete json.allOf;
		assignProps(json, folded);
	}
	function finalize(ctx, schema) {
		const root = ctx.seen.get(schema);
		if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
		const flattenRef = (zodSchema) => {
			const seen = ctx.seen.get(zodSchema);
			if (seen.ref === null) return;
			const schema = seen.def ?? seen.schema;
			const _cached = { ...schema };
			const ref = seen.ref;
			seen.ref = null;
			if (ref) {
				flattenRef(ref);
				const refSeen = ctx.seen.get(ref);
				const refSchema = refSeen.schema;
				if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
					schema.allOf = schema.allOf ?? [];
					schema.allOf.push(refSchema);
				} else assignProps(schema, refSchema);
				assignProps(schema, _cached);
				if (zodSchema._zod.parent === ref) for (const key in schema) {
					if (key === "$ref" || key === "allOf") continue;
					if (!(key in _cached)) delete schema[key];
				}
				if (refSchema.$ref && refSeen.def) for (const key in schema) {
					if (key === "$ref" || key === "allOf") continue;
					if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
				}
			}
			const parent = zodSchema._zod.parent;
			if (parent && parent !== ref) {
				flattenRef(parent);
				const parentSeen = ctx.seen.get(parent);
				if (parentSeen?.schema.$ref) {
					schema.$ref = parentSeen.schema.$ref;
					if (parentSeen.def) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
					}
				}
			}
			ctx.override({
				zodSchema,
				jsonSchema: schema,
				path: seen.path ?? []
			});
		};
		if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
			for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
			if (ctx.target !== "openapi-3.0") for (const entry of ctx.seen.entries()) compactTypeUnion(entry[1].def ?? entry[1].schema);
			for (const rewrite of ctx.deferred) rewrite();
			if (ctx.intersections.length) {
				const carriers = new Map();
				for (const seen of ctx.seen.values()) for (const json of [seen.schema, seen.def]) {
					const allOf = json?.allOf;
					if (!Array.isArray(allOf)) continue;
					const existing = carriers.get(allOf);
					if (existing) existing.push(json);
					else carriers.set(allOf, [json]);
				}
				for (const allOf of ctx.intersections) for (const json of carriers.get(allOf) ?? []) foldIntersection(json);
			}
		}
		const result = {};
		if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
		else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
		else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
		else if (ctx.target === "openapi-3.0") {}
		if (ctx.external?.uri) {
			const id = ctx.external.registry.get(schema)?.id;
			if (!id) throw new Error("Schema is missing an `id` property");
			result.$id = ctx.external.uri(id);
		}
		assignProps(result, root.defId ? root.schema : root.def ?? root.schema);
		const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
		if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
		const defs = ctx.external?.defs ?? {};
		if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) for (const entry of ctx.seen.entries()) {
			const seen = entry[1];
			if (seen.def && seen.defId) {
				if (seen.def.id === seen.defId) delete seen.def.id;
				assignProp(defs, seen.defId, seen.def);
			}
		}
		if (ctx.external) ctx.sharedEmitDoneFor = ctx.external;
		if (ctx.external) {} else if (Object.keys(defs).length > 0) {
			if (ctx.target === "draft-2020-12") result.$defs = defs;
			else result.definitions = defs;
		}
		try {
			const finalized = JSON.parse(JSON.stringify(result));
			Object.defineProperty(finalized, "~standard", {
				value: {
					...schema["~standard"],
					jsonSchema: {
						input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
						output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
					}
				},
				enumerable: false,
				writable: false
			});
			return finalized;
		} catch (_err) {
			throw new Error("Error converting schema to JSON.");
		}
	}
	function isTransforming(_schema, _ctx) {
		const ctx = _ctx ?? { seen: new Set() };
		if (ctx.seen.has(_schema)) return false;
		ctx.seen.add(_schema);
		const def = _schema._zod.def;
		if (def.type === "transform") return true;
		if (def.type === "array") return isTransforming(def.element, ctx);
		if (def.type === "set") return isTransforming(def.valueType, ctx);
		if (def.type === "lazy") return isTransforming(def.getter(), ctx);
		if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault" || def.type === "catch") return isTransforming(def.innerType, ctx);
		if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
		if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
		if (def.type === "pipe") {
			if (_schema._zod.traits.has("$ZodCodec")) return true;
			return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
		}
		if (def.type === "object") {
			for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
			return false;
		}
		if (def.type === "union") {
			for (const option of def.options) if (isTransforming(option, ctx)) return true;
			return false;
		}
		if (def.type === "tuple") {
			for (const item of def.items) if (isTransforming(item, ctx)) return true;
			if (def.rest && isTransforming(def.rest, ctx)) return true;
			return false;
		}
		return false;
	}
	var createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
		const ctx = initializeContext({
			...params,
			processors
		});
		processSchema(schema, ctx);
		extractDefs(ctx, schema);
		return finalize(ctx, schema);
	};
	var createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
		const { libraryOptions, target } = params ?? {};
		const ctx = initializeContext({
			...libraryOptions ?? {},
			target,
			io,
			processors
		});
		processSchema(schema, ctx);
		extractDefs(ctx, schema);
		return finalize(ctx, schema);
	};
	var narrowMin = (agg, key, value) => {
		if (agg[key] === void 0 || value > agg[key]) agg[key] = value;
	};
	var narrowMax = (agg, key, value) => {
		if (agg[key] === void 0 || value < agg[key]) agg[key] = value;
	};
	var narrowBoth = (agg, value) => {
		narrowMin(agg, "minimum", value);
		narrowMax(agg, "maximum", value);
	};
	var addDivisor = (agg, value) => {
		agg.multipleOf ?? (agg.multipleOf = []);
		if (!agg.multipleOf.includes(value)) agg.multipleOf.push(value);
	};
	var addPattern = (agg, pattern) => {
		agg.patterns ?? (agg.patterns = new Set());
		agg.patterns.add(pattern);
	};
	var intersectMime = (agg, mime) => {
		agg.mime = agg.mime ? agg.mime.filter((m) => mime.includes(m)) : [...mime];
	};
	var setFormat = (agg, format) => {
		agg.format = format;
		if (format.includes("int")) agg.isInt = true;
	};
	var minContributor = (agg, def) => narrowMin(agg, "minimum", def.minimum);
	var maxContributor = (agg, def) => narrowMax(agg, "maximum", def.maximum);
	var formatContributor = (ranges) => (agg, def) => {
		setFormat(agg, def.format);
		const [minimum, maximum] = ranges[def.format];
		narrowMin(agg, "minimum", minimum);
		narrowMax(agg, "maximum", maximum);
	};
	var contributors = {
		greater_than: (agg, def) => narrowMin(agg, def.inclusive ? "minimum" : "exclusiveMinimum", def.value),
		less_than: (agg, def) => narrowMax(agg, def.inclusive ? "maximum" : "exclusiveMaximum", def.value),
		multiple_of: (agg, def) => addDivisor(agg, def.value),
		number_format: formatContributor(NUMBER_FORMAT_RANGES),
		bigint_format: formatContributor(BIGINT_FORMAT_RANGES),
		min_length: minContributor,
		max_length: maxContributor,
		length_equals: (agg, def) => narrowBoth(agg, def.length),
		min_size: minContributor,
		max_size: maxContributor,
		size_equals: (agg, def) => narrowBoth(agg, def.size),
		string_format: (agg, def) => {
			setFormat(agg, def.format);
			if (def.pattern) addPattern(agg, def.pattern);
			if (def.format === "base64" || def.format === "base64url") agg.contentEncoding = def.format;
			if (def.local || def.precision === -1) agg.laxFormat = true;
		},
		mime_type: (agg, def) => intersectMime(agg, def.mime)
	};
	function aggregateChecks(schema) {
		const agg = {};
		const def = schema._zod.def;
		const list = schema._zod.traits.has("$ZodCheck") ? [schema, ...def.checks ?? []] : def.checks ?? [];
		for (const ch of list) contributors[ch._zod.def.check]?.(agg, ch._zod.def);
		const bag = schema._zod.bag;
		if (bag.minimum !== void 0) narrowMin(agg, "minimum", bag.minimum);
		if (bag.exclusiveMinimum !== void 0) narrowMin(agg, "exclusiveMinimum", bag.exclusiveMinimum);
		if (bag.maximum !== void 0) narrowMax(agg, "maximum", bag.maximum);
		if (bag.exclusiveMaximum !== void 0) narrowMax(agg, "exclusiveMaximum", bag.exclusiveMaximum);
		if (bag.multipleOf !== void 0) addDivisor(agg, bag.multipleOf);
		if (bag.format !== void 0) {
			agg.format ?? (agg.format = bag.format);
			if (bag.format.includes("int")) agg.isInt = true;
		}
		if (bag.mime) intersectMime(agg, bag.mime);
		for (const pattern of bag.patterns ?? []) addPattern(agg, pattern);
		return agg;
	}
	var formatMap = {
		guid: "uuid",
		url: "uri",
		datetime: "date-time",
		json_string: "json-string",
		regex: ""
	};
	var exactPatterns = new Map([[base64Charset, base64], [base64urlCharset, base64url]]);
	var exactPattern = (p) => exactPatterns.get(p) ?? p;
	var stringProcessor = (schema, ctx, _json, _params) => {
		const json = _json;
		json.type = "string";
		const { minimum, maximum, format, patterns, contentEncoding, laxFormat } = aggregateChecks(schema);
		if (typeof minimum === "number") json.minLength = minimum;
		if (typeof maximum === "number") json.maxLength = maximum;
		if (format) {
			json.format = formatMap[format] ?? format;
			if (json.format === "") delete json.format;
			if (format === "time" || laxFormat) delete json.format;
		}
		if (contentEncoding) json.contentEncoding = contentEncoding;
		if (patterns && patterns.size > 0) {
			const patternList = [...patterns].map(exactPattern);
			if (patternList.length === 1) json.pattern = patternList[0].source;
			else if (patternList.length > 1) json.allOf = [...patternList.map((regex) => ({
				...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
				pattern: regex.source
			}))];
		}
	};
	var numberProcessor = (schema, ctx, _json, params) => {
		const json = _json;
		const { minimum, maximum, multipleOf, exclusiveMaximum, exclusiveMinimum, isInt } = aggregateChecks(schema);
		json.type = isInt ? "integer" : "number";
		const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
		const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
		const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
		if (exMin) {
			if (legacy) {
				json.minimum = exclusiveMinimum;
				json.exclusiveMinimum = true;
			} else json.exclusiveMinimum = exclusiveMinimum;
		} else if (typeof minimum === "number") json.minimum = minimum;
		if (exMax) {
			if (legacy) {
				json.maximum = exclusiveMaximum;
				json.exclusiveMaximum = true;
			} else json.exclusiveMaximum = exclusiveMaximum;
		} else if (typeof maximum === "number") json.maximum = maximum;
		if (multipleOf) {
			const divisors = new Set();
			for (const divisor of multipleOf) if (Number.isFinite(divisor) && divisor !== 0) divisors.add(Math.abs(divisor));
			else handleUnrepresentable(schema, ctx, json, params, `A multipleOf divisor of ${divisor} cannot be represented in JSON Schema`);
			const [first, ...rest] = divisors;
			if (first !== void 0) json.multipleOf = first;
			if (rest.length) json.allOf = [...json.allOf ?? [], ...rest.map((m) => ({ multipleOf: m }))];
		}
	};
	var booleanProcessor = (_schema, _ctx, json, _params) => {
		json.type = "boolean";
	};
	var neverProcessor = (_schema, _ctx, json, _params) => {
		json.not = {};
	};
	var enumProcessor = (schema, _ctx, json, _params) => {
		const def = schema._zod.def;
		const values = getEnumValues(def.entries);
		if (values.length === 0) {
			json.not = {};
			return;
		}
		if (values.every((v) => typeof v === "number")) json.type = "number";
		if (values.every((v) => typeof v === "string")) json.type = "string";
		json.enum = values;
	};
	var literalProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		if (def.values.length === 0) {
			json.not = {};
			return;
		}
		const vals = [];
		for (const val of def.values) if (val === void 0) {
			if (handleUnrepresentable(schema, ctx, json, params, "Literal `undefined` cannot be represented in JSON Schema")) return;
		} else if (typeof val === "bigint") {
			if (handleUnrepresentable(schema, ctx, json, params, "BigInt literals cannot be represented in JSON Schema")) return;
			vals.push(Number(val));
		} else vals.push(val);
		if (vals.length === 0) {} else if (vals.length === 1) {
			const val = vals[0];
			json.type = val === null ? "null" : typeof val;
			if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") json.enum = [val];
			else json.const = val;
		} else {
			if (vals.every((v) => typeof v === "number")) json.type = "number";
			if (vals.every((v) => typeof v === "string")) json.type = "string";
			if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
			if (vals.every((v) => v === null)) json.type = "null";
			json.enum = vals;
		}
	};
	var customProcessor = (schema, ctx, json, params) => {
		handleUnrepresentable(schema, ctx, json, params, "Custom types cannot be represented in JSON Schema");
	};
	var transformProcessor = (schema, ctx, json, params) => {
		handleUnrepresentable(schema, ctx, json, params, "Transforms cannot be represented in JSON Schema");
	};
	var arrayProcessor = (schema, ctx, _json, params) => {
		const json = _json;
		const def = schema._zod.def;
		const { minimum, maximum } = aggregateChecks(schema);
		if (typeof minimum === "number") json.minItems = minimum;
		if (typeof maximum === "number") json.maxItems = maximum;
		json.type = "array";
		json.items = processSchema(def.element, ctx, {
			...params,
			path: [...params.path, "items"]
		});
	};
	function inputOptin(schema) {
		const def = schema._zod.def;
		if (def.type === "pipe" && def.in._zod.traits.has("$ZodTransform")) return inputOptin(def.out);
		if (def.type === "catch") return inputOptin(def.innerType);
		return schema._zod.optin;
	}
	var objectProcessor = (schema, ctx, _json, params) => {
		const json = _json;
		const def = schema._zod.def;
		const shape = def.shape;
		if (Object.getOwnPropertySymbols(shape).length && handleUnrepresentable(schema, ctx, json, params, "Symbol keys cannot be represented in JSON Schema")) return;
		json.type = "object";
		json.properties = {};
		for (const key in shape) assignProp(json.properties, key, processSchema(shape[key], ctx, {
			...params,
			path: [
				...params.path,
				"properties",
				key
			]
		}));
		const requiredKeys = [];
		for (const key of Object.keys(shape)) {
			const field = def.shape[key];
			if (ctx.io === "input" ? inputOptin(field) === void 0 : field._zod.optout === void 0) requiredKeys.push(key);
		}
		if (requiredKeys.length > 0) json.required = requiredKeys;
		if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
		else if (!def.catchall) {
			if (ctx.io === "output") json.additionalProperties = false;
		} else if (def.catchall) json.additionalProperties = processSchema(def.catchall, ctx, {
			...params,
			path: [...params.path, "additionalProperties"]
		});
	};
	var unionProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		const isExclusive = def.inclusive === false;
		const options = def.options.map((x, i) => processSchema(x, ctx, {
			...params,
			path: [
				...params.path,
				isExclusive ? "oneOf" : "anyOf",
				i
			]
		}));
		if (isExclusive) json.oneOf = options;
		else json.anyOf = options;
	};
	var intersectionProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		const a = processSchema(def.left, ctx, {
			...params,
			path: [
				...params.path,
				"allOf",
				0
			]
		});
		const b = processSchema(def.right, ctx, {
			...params,
			path: [
				...params.path,
				"allOf",
				1
			]
		});
		const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
		const allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
		json.allOf = allOf;
		ctx.intersections.push(allOf);
	};
	var nullableProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		const inner = processSchema(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		if (ctx.target === "openapi-3.0") {
			seen.ref = def.innerType;
			json.nullable = true;
		} else json.anyOf = [inner, { type: "null" }];
	};
	var nonoptionalProcessor = (schema, ctx, _json, params) => {
		const def = schema._zod.def;
		processSchema(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
	};
	var UNREPRESENTABLE_DEFAULT = Symbol();
	function serializeDefaultValue(value, schema, ctx, json, params) {
		let unrepresentable = false;
		const serialized = JSON.stringify(value, (_, val) => {
			if (typeof val !== "bigint") return val;
			unrepresentable = true;
			return null;
		});
		if (!unrepresentable) return JSON.parse(serialized);
		handleUnrepresentable(schema, ctx, json, params, "BigInt defaults cannot be represented in JSON Schema");
		return UNREPRESENTABLE_DEFAULT;
	}
	var defaultProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		processSchema(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
		const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
		if (value !== UNREPRESENTABLE_DEFAULT) json.default = value;
	};
	var prefaultProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		processSchema(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
		if (ctx.io !== "input") return;
		const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
		if (value !== UNREPRESENTABLE_DEFAULT) json._prefault = value;
	};
	var catchProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		processSchema(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
		let catchValue;
		try {
			catchValue = def.catchValue(void 0);
		} catch {
			handleUnrepresentable(schema, ctx, json, params, "Dynamic catch values are not supported in JSON Schema");
			return;
		}
		json.default = catchValue;
	};
	var pipeProcessor = (schema, ctx, _json, params) => {
		const def = schema._zod.def;
		const inIsTransform = def.in._zod.traits.has("$ZodTransform");
		const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
		processSchema(innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = innerType;
	};
	var readonlyProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		processSchema(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
		json.readOnly = true;
	};
	var optionalProcessor = (schema, ctx, _json, params) => {
		const def = schema._zod.def;
		processSchema(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
	};
	var _installedErrorProtos = new WeakSet([Object.prototype, Error.prototype]);
	function _lazyMethod(proto, key, make) {
		Object.defineProperty(proto, key, {
			configurable: true,
			enumerable: false,
			get() {
				const value = make(this);
				Object.defineProperty(this, key, {
					value,
					configurable: true,
					writable: true
				});
				return value;
			},
			set(value) {
				Object.defineProperty(this, key, {
					value,
					configurable: true,
					writable: true
				});
			}
		});
	}
	var initializer = (inst, issues) => {
		$ZodError.init(inst, issues);
		inst.name = "ZodError";
		const proto = Object.getPrototypeOf(inst);
		if (_installedErrorProtos.has(proto)) return;
		_installedErrorProtos.add(proto);
		_lazyMethod(proto, "format", (self) => (mapper) => formatError(self, mapper));
		_lazyMethod(proto, "flatten", (self) => (mapper) => flattenError(self, mapper));
		_lazyMethod(proto, "addIssue", (self) => (issue) => {
			self.issues.push(issue);
			self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
		});
		_lazyMethod(proto, "addIssues", (self) => (issues) => {
			self.issues.push(...issues);
			self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
		});
		Object.defineProperty(proto, "isEmpty", {
			configurable: true,
			enumerable: false,
			get() {
				return this.issues.length === 0;
			}
		});
	};
	var ZodRealError = $constructor("ZodError", initializer, void 0, { Parent: Error });
	var parse = _parse(ZodRealError);
	var parseAsync = _parseAsync(ZodRealError);
	var safeParse = _safeParse(ZodRealError);
	var safeParseAsync = _safeParseAsync(ZodRealError);
	var encode = _encode(ZodRealError);
	var decode = _decode(ZodRealError);
	var encodeAsync = _encodeAsync(ZodRealError);
	var decodeAsync = _decodeAsync(ZodRealError);
	var safeEncode = _safeEncode(ZodRealError);
	var safeDecode = _safeDecode(ZodRealError);
	var safeEncodeAsync = _safeEncodeAsync(ZodRealError);
	var safeDecodeAsync = _safeDecodeAsync(ZodRealError);
	function _ensureDefaultLocale() {
		if (!globalConfig.localeError) config(en_default());
	}
	function _ensureDefaultMemoizer() {
		if (!globalConfig.memoizer) config({ memoizer: memoizer() });
	}
	var ZodType = $constructor("ZodType", (inst, def) => {
		_ensureDefaultLocale();
		$ZodType.init(inst, def);
		inst.def = def;
		inst.type = def.type;
		return inst;
	}, {
		check(...chks) {
			const def = this.def;
			return this.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
				check: ch,
				def: { check: "custom" },
				onattach: []
			} } : ch)] }), { parent: true });
		},
		with(...chks) {
			return this.check(...chks);
		},
		clone(def, params) {
			return clone(this, def, params);
		},
		brand() {
			return this;
		},
		register(reg, meta) {
			reg.add(this, meta);
			return this;
		},
		refine(check, params) {
			return this.check(refine(check, params));
		},
		superRefine(refinement, params) {
			return this.check(superRefine(refinement, params));
		},
		overwrite(fn) {
			return this.check(_overwrite(fn));
		},
		optional() {
			return optional(this);
		},
		exactOptional() {
			return exactOptional(this);
		},
		nullable() {
			return nullable(this);
		},
		nullish() {
			return optional(nullable(this));
		},
		nonoptional(params) {
			return nonoptional(this, params);
		},
		array() {
			return array(this);
		},
		or(arg) {
			return union([this, arg]);
		},
		and(arg) {
			return intersection(this, arg);
		},
		transform(tx) {
			return pipe(this, transform(tx));
		},
		default(d) {
			return _default(this, d);
		},
		prefault(d) {
			return prefault(this, d);
		},
		catch(params) {
			return _catch(this, params);
		},
		pipe(target) {
			return pipe(this, target);
		},
		readonly() {
			return readonly$1(this);
		},
		describe(description) {
			const cl = this.clone();
			globalRegistry.add(cl, { description });
			return cl;
		},
		meta(...args) {
			if (args.length === 0) return globalRegistry.get(this);
			const cl = this.clone();
			globalRegistry.add(cl, args[0]);
			return cl;
		},
		isOptional() {
			return this.safeParse(void 0).success;
		},
		isNullable() {
			return this.safeParse(null).success;
		},
		apply(fn, ...args) {
			return args.length === 0 ? fn(this) : fn(this, ...args);
		},
		get "~standard"() {
			return hide$1(this, "~standard", {
				...standardProps(this),
				jsonSchema: {
					input: createStandardJSONSchemaMethod(this, "input"),
					output: createStandardJSONSchemaMethod(this, "output")
				}
			});
		},
		set "~standard"(value) {
			own(this, "~standard", value);
		},
		parse: function _parse(data, params) {
			return parse(this, data, params, { callee: _parse });
		},
		parseAsync: async function _parseAsync(data, params) {
			return await parseAsync(this, data, params, { callee: _parseAsync });
		},
		safeParse(data, params) {
			return safeParse(this, data, params);
		},
		async safeParseAsync(data, params) {
			return safeParseAsync(this, data, params);
		},
		get spa() {
			return this?.safeParseAsync;
		},
		set spa(value) {
			own(this, "spa", value);
		},
		validate(data, params) {
			return validate(this, data, params);
		},
		validateAsync(data, params) {
			return validateAsync$1(this, data, params);
		},
		encode: function _encode(data, params) {
			return encode(this, data, params, { callee: _encode });
		},
		decode: function _decode(data, params) {
			return decode(this, data, params, { callee: _decode });
		},
		encodeAsync: async function _encodeAsync(data, params) {
			return await encodeAsync(this, data, params, { callee: _encodeAsync });
		},
		decodeAsync: async function _decodeAsync(data, params) {
			return await decodeAsync(this, data, params, { callee: _decodeAsync });
		},
		safeEncode(data, params) {
			return safeEncode(this, data, params);
		},
		safeDecode(data, params) {
			return safeDecode(this, data, params);
		},
		async safeEncodeAsync(data, params) {
			return safeEncodeAsync(this, data, params);
		},
		async safeDecodeAsync(data, params) {
			return safeDecodeAsync(this, data, params);
		},
		toJSONSchema(params) {
			return createToJSONSchemaMethod(this, {})(params);
		},
		get description() {
			return globalRegistry.get(this)?.description;
		},
		get _def() {
			return this._zod.def;
		}
	});
	var _ZodString = $constructor("_ZodString", (inst, def) => {
		$ZodString.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
	}, derived({
		format: (inst) => aggregateChecks(inst).format ?? null,
		minLength: (inst) => aggregateChecks(inst).minimum ?? null,
		maxLength: (inst) => aggregateChecks(inst).maximum ?? null
	}, {
		regex(...args) {
			return this.check(_regex(...args));
		},
		includes(...args) {
			return this.check(_includes(...args));
		},
		startsWith(...args) {
			return this.check(_startsWith(...args));
		},
		endsWith(...args) {
			return this.check(_endsWith(...args));
		},
		min(...args) {
			return this.check(_minLength(...args));
		},
		max(...args) {
			return this.check(_maxLength(...args));
		},
		length(...args) {
			return this.check(_length(...args));
		},
		nonempty(...args) {
			return this.check(_minLength(1, ...args));
		},
		lowercase(params) {
			return this.check(_lowercase(params));
		},
		uppercase(params) {
			return this.check(_uppercase(params));
		},
		trim() {
			return this.check(_trim());
		},
		normalize(...args) {
			return this.check(_normalize(...args));
		},
		toLowerCase() {
			return this.check(_toLowerCase());
		},
		toUpperCase() {
			return this.check(_toUpperCase());
		},
		slugify() {
			return this.check(_slugify());
		}
	}));
	var ZodString = $constructor("ZodString", (inst, def) => {
		$ZodString.init(inst, def);
		_ZodString.init(inst, def);
	}, {
		email(params) {
			return this.check(_email(ZodEmail, params));
		},
		url(params) {
			return this.check(_url(ZodURL, params));
		},
		jwt(params) {
			return this.check(_jwt(ZodJWT, params));
		},
		emoji(params) {
			return this.check(_emoji(ZodEmoji, params));
		},
		guid(params) {
			return this.check(_guid(ZodGUID, params));
		},
		uuid(params) {
			return this.check(_uuid(ZodUUID, params));
		},
		uuidv4(params) {
			return this.check(_uuidv4(ZodUUID, params));
		},
		uuidv6(params) {
			return this.check(_uuidv6(ZodUUID, params));
		},
		uuidv7(params) {
			return this.check(_uuidv7(ZodUUID, params));
		},
		nanoid(params) {
			return this.check(_nanoid(ZodNanoID, params));
		},
		cuid(params) {
			return this.check(_cuid(ZodCUID, params));
		},
		cuid2(params) {
			return this.check(_cuid2(ZodCUID2, params));
		},
		ulid(params) {
			return this.check(_ulid(ZodULID, params));
		},
		base64(params) {
			return this.check(_base64(ZodBase64, params));
		},
		base64url(params) {
			return this.check(_base64url(ZodBase64URL, params));
		},
		xid(params) {
			return this.check(_xid(ZodXID, params));
		},
		ksuid(params) {
			return this.check(_ksuid(ZodKSUID, params));
		},
		ipv4(params) {
			return this.check(_ipv4(ZodIPv4, params));
		},
		ipv6(params) {
			return this.check(_ipv6(ZodIPv6, params));
		},
		cidrv4(params) {
			return this.check(_cidrv4(ZodCIDRv4, params));
		},
		cidrv6(params) {
			return this.check(_cidrv6(ZodCIDRv6, params));
		},
		e164(params) {
			return this.check(_e164(ZodE164, params));
		},
		datetime(params) {
			return this.check(_isoDateTime(ZodISODateTime, params));
		},
		date(params) {
			return this.check(_isoDate(ZodISODate, params));
		},
		time(params) {
			return this.check(_isoTime(ZodISOTime, params));
		},
		duration(params) {
			return this.check(_isoDuration(ZodISODuration, params));
		}
	});
	function string(params) {
		return _string(ZodString, params);
	}
	var ZodStringFormat = $constructor("ZodStringFormat", (inst, def) => {
		$ZodStringFormat.init(inst, def);
		_ZodString.init(inst, def);
	});
	var ZodISODateTime = $constructor("ZodISODateTime", (inst, def) => {
		$ZodISODateTime.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodISODate = $constructor("ZodISODate", (inst, def) => {
		$ZodISODate.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodISOTime = $constructor("ZodISOTime", (inst, def) => {
		$ZodISOTime.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodISODuration = $constructor("ZodISODuration", (inst, def) => {
		$ZodISODuration.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodEmail = $constructor("ZodEmail", (inst, def) => {
		$ZodEmail.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodGUID = $constructor("ZodGUID", (inst, def) => {
		$ZodGUID.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodUUID = $constructor("ZodUUID", (inst, def) => {
		$ZodUUID.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodURL = $constructor("ZodURL", (inst, def) => {
		$ZodURL.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodEmoji = $constructor("ZodEmoji", (inst, def) => {
		$ZodEmoji.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodNanoID = $constructor("ZodNanoID", (inst, def) => {
		$ZodNanoID.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodCUID = $constructor("ZodCUID", (inst, def) => {
		$ZodCUID.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodCUID2 = $constructor("ZodCUID2", (inst, def) => {
		$ZodCUID2.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodULID = $constructor("ZodULID", (inst, def) => {
		$ZodULID.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodXID = $constructor("ZodXID", (inst, def) => {
		$ZodXID.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodKSUID = $constructor("ZodKSUID", (inst, def) => {
		$ZodKSUID.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodIPv4 = $constructor("ZodIPv4", (inst, def) => {
		$ZodIPv4.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodIPv6 = $constructor("ZodIPv6", (inst, def) => {
		$ZodIPv6.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodCIDRv4 = $constructor("ZodCIDRv4", (inst, def) => {
		$ZodCIDRv4.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodCIDRv6 = $constructor("ZodCIDRv6", (inst, def) => {
		$ZodCIDRv6.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodBase64 = $constructor("ZodBase64", (inst, def) => {
		$ZodBase64.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodBase64URL = $constructor("ZodBase64URL", (inst, def) => {
		$ZodBase64URL.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodE164 = $constructor("ZodE164", (inst, def) => {
		$ZodE164.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodJWT = $constructor("ZodJWT", (inst, def) => {
		$ZodJWT.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	var ZodNumber = $constructor("ZodNumber", (inst, def) => {
		$ZodNumber.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
		inst.isFinite = true;
	}, derived({
		minValue: (inst) => {
			const { minimum, exclusiveMinimum } = aggregateChecks(inst);
			return Math.max(minimum ?? Number.NEGATIVE_INFINITY, exclusiveMinimum ?? Number.NEGATIVE_INFINITY);
		},
		maxValue: (inst) => {
			const { maximum, exclusiveMaximum } = aggregateChecks(inst);
			return Math.min(maximum ?? Number.POSITIVE_INFINITY, exclusiveMaximum ?? Number.POSITIVE_INFINITY);
		},
		isInt: (inst) => {
			const { isInt, multipleOf } = aggregateChecks(inst);
			return !!isInt || !!multipleOf?.some(Number.isSafeInteger);
		},
		format: (inst) => aggregateChecks(inst).format ?? null
	}, {
		gt(value, params) {
			return this.check(_gt(value, params));
		},
		gte(value, params) {
			return this.check(_gte(value, params));
		},
		min(value, params) {
			return this.check(_gte(value, params));
		},
		lt(value, params) {
			return this.check(_lt(value, params));
		},
		lte(value, params) {
			return this.check(_lte(value, params));
		},
		max(value, params) {
			return this.check(_lte(value, params));
		},
		int(params) {
			return this.check(int(params));
		},
		safe(params) {
			return this.check(int(params));
		},
		positive(params) {
			return this.check(_gt(0, params));
		},
		nonnegative(params) {
			return this.check(_gte(0, params));
		},
		negative(params) {
			return this.check(_lt(0, params));
		},
		nonpositive(params) {
			return this.check(_lte(0, params));
		},
		multipleOf(value, params) {
			return this.check(_multipleOf(value, params));
		},
		step(value, params) {
			return this.check(_multipleOf(value, params));
		},
		finite() {
			return this;
		}
	}));
	function number(params) {
		return _number(ZodNumber, params);
	}
	var ZodNumberFormat = $constructor("ZodNumberFormat", (inst, def) => {
		$ZodNumberFormat.init(inst, def);
		ZodNumber.init(inst, def);
	});
	function int(params) {
		return _int(ZodNumberFormat, params);
	}
	var ZodBoolean = $constructor("ZodBoolean", (inst, def) => {
		$ZodBoolean.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
	});
	function boolean(params) {
		return _boolean(ZodBoolean, params);
	}
	var ZodUnknown = $constructor("ZodUnknown", (inst, def) => {
		$ZodUnknown.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => void 0;
	});
	function unknown() {
		return _unknown(ZodUnknown);
	}
	var ZodNever = $constructor("ZodNever", (inst, def) => {
		$ZodNever.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
	});
	function never(params) {
		return _never(ZodNever, params);
	}
	var ZodArray = $constructor("ZodArray", (inst, def) => {
		_ensureDefaultMemoizer();
		$ZodArray.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
		inst.element = def.element;
	}, {
		min(n, params) {
			return this.check(_minLength(n, params));
		},
		nonempty(params) {
			return this.check(_minLength(1, params));
		},
		max(n, params) {
			return this.check(_maxLength(n, params));
		},
		length(n, params) {
			return this.check(_length(n, params));
		},
		unwrap() {
			return this.element;
		}
	});
	function array(element, params) {
		return _array(ZodArray, element, params);
	}
	var ZodObject = $constructor("ZodObject", (inst, def) => {
		_ensureDefaultMemoizer();
		$ZodObjectJIT.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
		installLazyProp(inst, "shape", (self) => self._zod.def.shape, false);
	}, {
		keyof() {
			return _enum(Object.keys(this._zod.def.shape));
		},
		catchall(catchall) {
			return this.clone(mergeDefs(this._zod.def, { catchall }));
		},
		passthrough() {
			return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
		},
		loose() {
			return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
		},
		strict() {
			return this.clone(mergeDefs(this._zod.def, { catchall: never() }));
		},
		strip() {
			return this.clone(mergeDefs(this._zod.def, { catchall: void 0 }));
		},
		extend(incoming) {
			return extend$1(this, incoming);
		},
		safeExtend(incoming) {
			return safeExtend(this, incoming);
		},
		merge(other) {
			return merge(this, other);
		},
		pick(mask) {
			return pick(this, mask);
		},
		omit(mask) {
			return omit(this, mask);
		},
		partial(...args) {
			return partial(ZodOptional, this, args[0]);
		},
		exactPartial(...args) {
			return partial(ZodExactOptional, this, args[0], "exactPartial");
		},
		required(...args) {
			return required(ZodNonOptional, this, args[0]);
		}
	});
	function object(shape, params) {
		return new ZodObject({
			type: "object",
			shape: shape ?? {},
			...normalizeParams(params)
		});
	}
	var ZodUnion = $constructor("ZodUnion", (inst, def) => {
		$ZodUnion.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
		inst.options = def.options;
	});
	function union(options, params) {
		return new ZodUnion({
			type: "union",
			options,
			...normalizeParams(params)
		});
	}
	var ZodIntersection = $constructor("ZodIntersection", (inst, def) => {
		$ZodIntersection.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
	});
	function intersection(left, right) {
		return new ZodIntersection({
			type: "intersection",
			left,
			right
		});
	}
	var ZodEnum = $constructor("ZodEnum", (inst, def) => {
		$ZodEnum.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
		inst.enum = def.entries;
		inst.options = [...inst._zod.values];
		const keys = new Set(Object.keys(def.entries));
		inst.extract = (values, params) => {
			const newEntries = {};
			for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
			else throw new Error(`Key ${value} not found in enum`);
			return new ZodEnum({
				...def,
				checks: [],
				...normalizeParams(params),
				entries: newEntries
			});
		};
		inst.exclude = (values, params) => {
			const newEntries = { ...def.entries };
			for (const value of values) if (keys.has(value)) delete newEntries[value];
			else throw new Error(`Key ${value} not found in enum`);
			return new ZodEnum({
				...def,
				checks: [],
				...normalizeParams(params),
				entries: newEntries
			});
		};
	});
	function _enum(values, params) {
		return new ZodEnum({
			type: "enum",
			entries: Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values,
			...normalizeParams(params)
		});
	}
	var ZodLiteral = $constructor("ZodLiteral", (inst, def) => {
		$ZodLiteral.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
		inst.values = new Set(def.values);
		Object.defineProperty(inst, "value", { get() {
			if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
			return def.values[0];
		} });
	});
	function literal(value, params) {
		return new ZodLiteral({
			type: "literal",
			values: Array.isArray(value) ? value : [value],
			...normalizeParams(params)
		});
	}
	var ZodTransform = $constructor("ZodTransform", (inst, def) => {
		_ensureDefaultMemoizer();
		$ZodTransform.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
		inst._zod.parse = (payload, _ctx) => {
			if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
			payload.addIssue = (issue$1) => {
				if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
				else {
					const _issue = issue$1;
					if (_issue.fatal) _issue.continue = false;
					_issue.code ?? (_issue.code = "custom");
					if (!("input" in _issue)) _issue.input = payload.value;
					_issue.inst ?? (_issue.inst = inst);
					payload.issues.push(issue(_issue));
				}
			};
			const output = def.transform(payload.value, payload);
			if (output instanceof Promise) return output.then((output) => {
				payload.value = output;
				return payload;
			});
			payload.value = output;
			return payload;
		};
	});
	function transform(fn) {
		return new ZodTransform({
			type: "transform",
			transform: fn
		});
	}
	var ZodOptional = $constructor("ZodOptional", (inst, def) => {
		$ZodOptional.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	function optional(innerType) {
		return new ZodOptional({
			type: "optional",
			innerType
		});
	}
	var ZodExactOptional = $constructor("ZodExactOptional", (inst, def) => {
		$ZodExactOptional.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	function exactOptional(innerType) {
		return new ZodExactOptional({
			type: "optional",
			innerType
		});
	}
	var ZodNullable = $constructor("ZodNullable", (inst, def) => {
		$ZodNullable.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	function nullable(innerType) {
		return new ZodNullable({
			type: "nullable",
			innerType
		});
	}
	var ZodDefault = $constructor("ZodDefault", (inst, def) => {
		$ZodDefault.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
		inst.removeDefault = inst.unwrap;
	});
	function _default(innerType, defaultValue) {
		return new ZodDefault({
			type: "default",
			innerType,
			get defaultValue() {
				return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
			}
		});
	}
	var ZodPrefault = $constructor("ZodPrefault", (inst, def) => {
		$ZodPrefault.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	function prefault(innerType, defaultValue) {
		return new ZodPrefault({
			type: "prefault",
			innerType,
			get defaultValue() {
				return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
			}
		});
	}
	var ZodNonOptional = $constructor("ZodNonOptional", (inst, def) => {
		$ZodNonOptional.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	function nonoptional(innerType, params) {
		return new ZodNonOptional({
			type: "nonoptional",
			innerType,
			...normalizeParams(params)
		});
	}
	var ZodCatch = $constructor("ZodCatch", (inst, def) => {
		$ZodCatch.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
		inst.removeCatch = inst.unwrap;
	});
	function _catch(innerType, catchValue) {
		return new ZodCatch({
			type: "catch",
			innerType,
			catchValue: typeof catchValue === "function" ? catchValue : constantCatch(catchValue)
		});
	}
	var ZodPipe = $constructor("ZodPipe", (inst, def) => {
		$ZodPipe.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
		inst.in = def.in;
		inst.out = def.out;
	});
	function pipe(in_, out) {
		return new ZodPipe({
			type: "pipe",
			in: in_,
			out
		});
	}
	var ZodReadonly = $constructor("ZodReadonly", (inst, def) => {
		$ZodReadonly.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	function readonly$1(innerType) {
		return new ZodReadonly({
			type: "readonly",
			innerType
		});
	}
	var ZodCustom = $constructor("ZodCustom", (inst, def) => {
		$ZodCustom.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
	});
	function custom(fn, _params) {
		return _custom(ZodCustom, fn ?? (() => true), _params);
	}
	function refine(fn, _params = {}) {
		return _refine(ZodCustom, fn, _params);
	}
	function superRefine(fn, params) {
		return _superRefine(fn, params);
	}
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	function toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	function toPropertyKey(t) {
		var i = toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _defineProperty(e, r, t) {
		return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	var t = {
		DECLARATION_INVALID: "MAKOO_DECLARATION_INVALID",
		INJECTION_NAME_CONFLICT: "MAKOO_INJECTION_NAME_CONFLICT",
		ADAPTER_INVALID: "MAKOO_ADAPTER_INVALID",
		ADAPTER_NAME_CONFLICT: "MAKOO_ADAPTER_NAME_CONFLICT",
		ADAPTER_NOT_FOUND: "MAKOO_ADAPTER_NOT_FOUND",
		INJECTION_NOT_FOUND: "MAKOO_INJECTION_NOT_FOUND",
		LISTENER_NOT_FOUND: "MAKOO_LISTENER_NOT_FOUND",
		INJECTION_REMOVED: "MAKOO_INJECTION_REMOVED",
		INJECTION_CLOSED: "MAKOO_INJECTION_CLOSED",
		INSTANCE_DISPOSED: "MAKOO_INSTANCE_DISPOSED",
		TARGET_WAIT_TIMEOUT: "MAKOO_TARGET_WAIT_TIMEOUT",
		MOUNT_TARGET_DETACHED: "MAKOO_MOUNT_TARGET_DETACHED",
		MOUNT_FAILED: "MAKOO_MOUNT_FAILED",
		LISTENER_TARGET_DETACHED: "MAKOO_LISTENER_TARGET_DETACHED",
		LISTENER_BIND_FAILED: "MAKOO_LISTENER_BIND_FAILED",
		ATTACHED_LISTENER_FAILED: "MAKOO_ATTACHED_LISTENER_FAILED",
		UNMOUNT_FAILED: "MAKOO_UNMOUNT_FAILED",
		CONTAINER_REMOVE_FAILED: "MAKOO_CONTAINER_REMOVE_FAILED",
		LISTENER_UNBIND_FAILED: "MAKOO_LISTENER_UNBIND_FAILED",
		MOUNT_CLEANUP_FAILED: "MAKOO_MOUNT_CLEANUP_FAILED",
		INJECTION_CLEANUP_FAILED: "MAKOO_INJECTION_CLEANUP_FAILED",
		INSTANCE_CLEANUP_FAILED: "MAKOO_INSTANCE_CLEANUP_FAILED",
		LISTENER_CALLBACK_FAILED: "MAKOO_LISTENER_CALLBACK_FAILED",
		STATE_SUBSCRIBER_FAILED: "MAKOO_STATE_SUBSCRIBER_FAILED",
		INSTANCE_OBSERVER_FAILED: "MAKOO_INSTANCE_OBSERVER_FAILED"
	};
	var n = class extends Error {
		constructor(e, t) {
			var _super = (..._args) => (super(..._args), _defineProperty(this, "code", void 0), this);
			_super(e), this.name = "MakooError", this.code = t.code, t.cause !== void 0 && (this.cause = t.cause);
		}
	};
	var r = class extends n {
		constructor(e, t, n) {
			var _super2 = (..._args2) => (super(..._args2), _defineProperty(this, "errors", void 0), this);
			_super2(l(t, e), n), this.name = "MakooAggregateError", this.errors = e;
		}
	};
	function i(e) {
		if (typeof e != "object" || !e || !("name" in e)) return;
		let { name: t } = e;
		return typeof t == "string" && t.trim().length > 0 ? t : void 0;
	}
	function a(e, t, r) {
		return new n([e, ...r.issues.map((e) => `${e.path.map(String).join(".") || "(root)"}: ${e.message}`)].join("\n"), {
			code: t,
			cause: r
		});
	}
	function o(e, r) {
		return new n(`State subscriber of ${e} failed`, {
			code: t.STATE_SUBSCRIBER_FAILED,
			cause: r
		});
	}
	function s(e) {
		return new n("Instance observe handler failed", {
			code: t.INSTANCE_OBSERVER_FAILED,
			cause: e
		});
	}
	function c(e, n) {
		return new r(n, `Cleanup failed for "${e}"`, { code: t.INJECTION_CLEANUP_FAILED });
	}
	function l(e, t) {
		return [e, ...t.map((e) => {
			let t = e instanceof Error ? e.message : String(e), n = t.indexOf("\n");
			return n === -1 ? t : t.slice(0, n);
		})].join("\n");
	}
	var u$1 = string({ error: "Expected a non-empty string" }).refine((e) => e.trim().length > 0, "Expected a non-empty string");
	var d$1 = "Expected a positive finite duration up to 2147483647 milliseconds";
	var ee = object({
		kind: literal("listener", { error: "Expected listener" }),
		name: u$1,
		listenAt: u$1.refine((e) => {
			try {
				return document.createDocumentFragment().querySelector(e), !0;
			} catch {
				return !1;
			}
		}, "Invalid CSS selector"),
		type: u$1,
		callback: custom((e) => typeof e == "function", "Expected an event handler"),
		capture: boolean({ error: "Expected a boolean" }).optional(),
		timeout: number({ error: d$1 }).gt(0, d$1).max(2147483647, d$1).optional(),
		reinject: boolean({ error: "Expected a boolean" }).optional()
	}, { error: (e) => e.code === "invalid_type" ? "Expected a listener declaration" : void 0 });
	function p$1(e) {
		let n = ee.safeParse(e);
		if (!n.success) {
			let r = i(e);
			throw a(r ? `Invalid listener declaration "${r}"` : "Invalid listener declaration", t.DECLARATION_INVALID, n.error);
		}
		return Object.freeze(n.data);
	}
	var m = string({ error: "Expected a non-empty string" }).refine((e) => e.trim().length > 0, "Expected a non-empty string");
	var h$2 = "Expected a positive finite duration up to 2147483647 milliseconds";
	var te = object({
		kind: literal("component", { error: "Expected component" }),
		name: m,
		injectAt: m.refine((e) => {
			try {
				return document.createDocumentFragment().querySelector(e), !0;
			} catch {
				return !1;
			}
		}, "Invalid CSS selector"),
		adapter: m,
		component: unknown(),
		props: unknown().optional(),
		timeout: number({ error: h$2 }).gt(0, h$2).max(2147483647, h$2).optional(),
		reinject: boolean({ error: "Expected a boolean" }).optional(),
		listeners: array(unknown()).optional()
	}, { error: (e) => e.code === "invalid_type" ? "Expected a component declaration" : void 0 });
	function ne(e) {
		return {
			...e,
			kind: "component"
		};
	}
	function g$1(e) {
		let r = te.safeParse(e);
		if (!r.success) {
			let n = i(e);
			throw a(n ? `Invalid component declaration "${n}"` : "Invalid component declaration", t.DECLARATION_INVALID, r.error);
		}
		let o = new Set(), s = r.data.listeners?.map((e, r) => {
			let i;
			try {
				i = p$1(e);
			} catch (e) {
				throw e instanceof n ? new n(`Invalid attached listener at listeners[${r}]`, {
					code: t.DECLARATION_INVALID,
					cause: e
				}) : e;
			}
			if (o.has(i.name)) throw new n(`Duplicate attached listener "${i.name}" at listeners[${r}]`, { code: t.INJECTION_NAME_CONFLICT });
			if (i.reinject !== void 0) throw new n(`Attached listeners inherit the component recovery setting (listeners[${r}].reinject)`, { code: t.DECLARATION_INVALID });
			return o.add(i.name), i;
		});
		return Object.freeze({
			...r.data,
			listeners: s && Object.freeze(s)
		});
	}
	var _$1 = object({
		name: string({ error: "Expected a non-empty string" }).refine((e) => e.trim().length > 0, "Expected a non-empty string"),
		mount: custom((e) => typeof e == "function", "Expected a mount function"),
		unmount: custom((e) => typeof e == "function", "Expected an unmount function")
	}, { error: (e) => e.code === "invalid_type" ? "Expected an adapter" : void 0 });
	function re() {
		let e = new Map();
		return {
			use(r) {
				let o = _$1.safeParse(r);
				if (!o.success) {
					let e = i(r);
					throw a(e ? `Invalid adapter "${e}"` : "Invalid adapter", t.ADAPTER_INVALID, o.error);
				}
				if (e.has(o.data.name)) throw new n(`Adapter "${o.data.name}" is already registered`, { code: t.ADAPTER_NAME_CONFLICT });
				e.set(o.data.name, r);
			},
			require(r) {
				let i = e.get(r);
				if (!i) throw new n(`Unknown adapter "${r}"`, { code: t.ADAPTER_NOT_FOUND });
				return i;
			}
		};
	}
	function v(e, t) {
		let n = e, r = new Set();
		return {
			view: Object.freeze({
				getSnapshot: () => n,
				subscribe(e) {
					return r.add(e), () => {
						r.delete(e);
					};
				}
			}),
			set(e) {
				if (!Object.is(n, e)) {
					n = e;
					for (let e of [...r]) try {
						e();
					} catch (e) {
						t(e);
					}
				}
			}
		};
	}
	function y(e, t, n, r, i, a, o) {
		if (n.aborted) return;
		let s = !0, c = () => {}, l, u = () => {
			s = !1, c(), clearTimeout(l), n.removeEventListener("abort", u);
		}, d = () => {
			if (!s || n.aborted) return;
			let e;
			try {
				e = document.querySelector(t);
			} catch (e) {
				u(), o(e);
				return;
			}
			!s || n.aborted || !e?.isConnected || (u(), i(e));
		};
		c = e.subscribe(d, n), n.addEventListener("abort", u, { once: !0 }), l = setTimeout(() => {
			!s || n.aborted || (u(), a());
		}, r), d();
	}
	function b(e, t, n, r, i = () => t.isConnected) {
		if (n.aborted) return;
		let a = () => {
			n.aborted || i() || (o(), r());
		}, o = e.subscribe(a, n);
		a();
	}
	function x(e, t) {
		let n = {
			config: e,
			phase: "active",
			abortController: new AbortController(),
			eventListener: (e) => C(n, t, e),
			listenerTarget: null,
			cleanupErrors: []
		};
		return n;
	}
	function S(e, r, i) {
		let { config: a } = e;
		try {
			y(r, a.listenAt, e.abortController.signal, a.timeout ?? 15e3, (t) => ie(e, r, i, t), () => {
				e.phase === "active" && i.ended("failed", new n(`Timed out waiting for listener "${a.name}"`, { code: t.TARGET_WAIT_TIMEOUT }));
			}, (t) => {
				e.phase === "active" && i.ended("failed", E(a.name, t));
			}), e.phase === "active" && !e.listenerTarget && i.setStatus("waiting");
		} catch (t) {
			e.phase === "active" && i.ended("failed", E(a.name, t));
		}
	}
	function ie(e, t, n, r) {
		if (e.phase !== "active") return;
		let { config: i } = e;
		e.listenerTarget = r;
		try {
			r.addEventListener(i.type, e.eventListener, {
				capture: i.capture,
				signal: e.abortController.signal
			}), b(t, r, e.abortController.signal, () => {
				e.phase === "active" && n.ended("detached", T(i.name));
			});
		} catch (t) {
			e.phase === "active" && n.ended("failed", E(i.name, t));
			return;
		}
		e.phase === "active" && n.setStatus("bound");
	}
	function ae(e) {
		let { config: t, cleanupErrors: n, listenerTarget: r } = e;
		e.phase = "cleaning", e.listenerTarget = null;
		try {
			e.abortController.abort();
		} catch (e) {
			n.push(D(t.name, e));
		}
		if (r) try {
			r.removeEventListener(t.type, e.eventListener, t.capture);
		} catch (e) {
			n.push(D(t.name, e));
		}
		e.phase = "settled";
	}
	function C(e, t, n) {
		let { config: r, listenerTarget: i } = e;
		if (!(e.phase !== "active" || !i)) try {
			let e = r.callback.call(i, n);
			e !== void 0 && Promise.resolve(e).catch((e) => t(w(r.name, e)));
		} catch (e) {
			t(w(r.name, e));
		}
	}
	function w(e, r) {
		return new n(`Callback of listener "${e}" failed`, {
			code: t.LISTENER_CALLBACK_FAILED,
			cause: r
		});
	}
	function T(e) {
		return new n(`Listener target "${e}" disconnected`, { code: t.LISTENER_TARGET_DETACHED });
	}
	function E(e, r) {
		return new n(`Failed to bind listener "${e}"`, {
			code: t.LISTENER_BIND_FAILED,
			cause: r
		});
	}
	function D(e, r) {
		return new n(`Failed to unbind listener "${e}"`, {
			code: t.LISTENER_UNBIND_FAILED,
			cause: r
		});
	}
	function oe(e, t, n, r, i) {
		let a = {
			kind: "listener",
			config: e,
			state: v("idle", (t) => {
				let n = o(`"${e.name}"`, t);
				console.error(n), i(e.name, n);
			}),
			intent: "stopped",
			executionSlot: {
				kind: "empty",
				cleanupPromise: Promise.resolve()
			},
			lastError: void 0,
			onRemoved: n,
			isDisposed: r
		};
		return {
			kind: "listener",
			command: Object.freeze({
				name: e.name,
				start: () => O(a, t),
				stop: () => A(a, t),
				remove: () => j(a, t)
			}),
			statusHandle: Object.freeze({
				getSnapshot: () => a.state.view.getSnapshot(),
				subscribe: (e) => a.state.view.subscribe(e),
				get lastError() {
					return a.lastError;
				}
			})
		};
	}
	function O(e, r) {
		let { config: i, executionSlot: a } = e;
		if (e.kind === "listener" && e.isDisposed()) throw new n("Core instance is disposed", { code: t.INSTANCE_DISPOSED });
		if (a.kind === "cleanup-failed") throw new n(`Injection "${i.name}" cannot restart after cleanup failed`, { code: t.INJECTION_CLOSED });
		if (e.intent === "removed") throw new n(`Injection "${i.name}" was removed`, { code: t.INJECTION_REMOVED });
		e.intent = "running", a.kind === "empty" && (e.lastError = void 0, k(e, r));
	}
	function k(e, t) {
		let n, r, i = new Promise((e, t) => {
			n = e, r = t;
		});
		i.catch(() => {});
		let a = x(e.config, (t) => {
			let n = e.executionSlot;
			(n.kind === "active" || n.kind === "closing") && n.execution === a && (e.lastError = t), console.error(t);
		});
		e.executionSlot = {
			kind: "active",
			execution: a,
			cleanupCompletion: {
				promise: i,
				resolve: n,
				reject: r
			}
		}, S(a, t, {
			setStatus(t) {
				let n = e.executionSlot;
				n.kind === "active" && n.execution === a && e.state.set(t);
			},
			ended(n, r) {
				let i = e.executionSlot;
				i.kind === "active" && i.execution === a && M(e, t, n, r);
			}
		});
	}
	function A(e, t) {
		let n = e.executionSlot;
		if (n.kind === "cleanup-failed" || n.kind === "removed") return n.cleanupPromise;
		switch (e.intent !== "removed" && (e.intent = "stopped"), n.kind) {
			case "empty": return e.state.set("idle"), n.cleanupPromise;
			case "closing": return n.cleanupCompletion.promise;
			case "active": return M(e, t, "stopped");
		}
	}
	function j(e, t) {
		let n = e.executionSlot;
		if (n.kind === "cleanup-failed" || n.kind === "removed") return n.cleanupPromise;
		e.intent = "removed";
		let r = A(e, t);
		return e.executionSlot.kind === "empty" && (e.executionSlot = {
			kind: "removed",
			cleanupPromise: r
		}, e.onRemoved()), r;
	}
	function M(e, t, n, r) {
		let i = e.executionSlot;
		switch (i.kind) {
			case "empty":
			case "removed":
			case "cleanup-failed": return i.cleanupPromise;
			case "closing": return i.cleanupCompletion.promise;
		}
		let { execution: a, cleanupCompletion: o } = i;
		e.executionSlot = {
			...i,
			kind: "closing"
		}, ae(a);
		let s = a.cleanupErrors;
		if (s.length > 0 && e.kind === "attach") {
			r && (e.lastError = r), e.executionSlot = {
				kind: "cleanup-failed",
				cleanupPromise: o.promise,
				cleanupErrors: s
			}, o.reject(r ?? s[0]);
			let t = e.executionSlot;
			return e.state.set("failed"), r && e.executionSlot === t && e.onFailed(r), o.promise;
		}
		if (s.length > 0) {
			let t = c(e.config.name, r ? [r, ...s] : s);
			e.lastError = t, e.executionSlot = {
				kind: "cleanup-failed",
				cleanupPromise: o.promise,
				cleanupErrors: s
			}, o.reject(t), console.error(t);
			let n = e.executionSlot;
			return e.state.set("failed"), e.kind === "attach" && e.executionSlot === n && e.onFailed(r ?? t), o.promise;
		}
		if (e.executionSlot = {
			kind: "empty",
			cleanupPromise: o.promise
		}, o.resolve(), e.kind === "listener" && e.intent === "removed") return e.executionSlot = {
			kind: "removed",
			cleanupPromise: o.promise
		}, e.state.set("idle"), e.onRemoved(), o.promise;
		if (e.intent === "running" && (n === "stopped" || n === "detached" && e.config.reinject)) return n === "detached" && e.state.set("waiting"), e.intent === "running" && e.executionSlot.kind === "empty" && (n === "stopped" ? O(e, t) : k(e, t)), o.promise;
		e.intent = "stopped", r && (e.lastError = r, console.error(r));
		let l = e.executionSlot;
		return e.state.set(n === "stopped" ? "idle" : "failed"), r && e.kind === "attach" && e.executionSlot === l && e.onFailed(r), o.promise;
	}
	function N(e, t, n) {
		return {
			kind: "attach",
			config: e,
			state: v("idle", n),
			intent: "stopped",
			executionSlot: {
				kind: "empty",
				cleanupPromise: Promise.resolve()
			},
			lastError: void 0,
			onFailed: t
		};
	}
	async function P(e, t) {
		for (let t of e.values()) {
			t.intent = "stopped";
			let e = t.executionSlot;
			e.kind === "active" && (e.execution.phase = "cancelled");
		}
		let n = [];
		for (let r of e.values()) {
			let e = r.executionSlot;
			switch (e.kind) {
				case "empty":
					r.state.view.getSnapshot() !== "failed" && r.state.set("idle");
					continue;
				case "cleanup-failed":
					n.push(...e.cleanupErrors);
					continue;
			}
			let { execution: i } = e;
			try {
				await M(r, t, "stopped");
			} catch {}
			n.push(...i.cleanupErrors);
		}
		return n;
	}
	function F(e, t, n, r, i) {
		let a = {
			config: e,
			attachListeners: r,
			domWaitAbortController: new AbortController(),
			phase: "pending",
			componentContainer: null,
			mountedComponent: null,
			cleanupErrors: []
		};
		return {
			get phase() {
				return a.phase;
			},
			start: () => I(a, t, n, i),
			cancel: () => a.domWaitAbortController.abort(),
			finish: () => R(a, t, n)
		};
	}
	function I(e, t, n, r) {
		let { config: i, domWaitAbortController: a } = e;
		try {
			y(t, i.injectAt, a.signal, i.timeout ?? 15e3, (i) => L(e, t, n, r, i), () => {
				r.ended("failed", B(i.name));
			}, (t) => r.ended("failed", H(e, t))), e.phase === "pending" && r.setStatus("waiting");
		} catch (t) {
			r.ended("failed", H(e, t));
		}
	}
	function L(e, t, n, r, i) {
		let { config: a, domWaitAbortController: o } = e, { signal: s } = o;
		b(t, i, s, () => r.ended("detached", V(a.name)), () => i.isConnected && (!e.componentContainer || e.componentContainer.isConnected && i.contains(e.componentContainer)));
		let c = document.createElement("div");
		if (e.componentContainer = c, i.append(c), e.phase = "mounting", r.setStatus("waiting"), s.aborted) {
			r.ended("stopped");
			return;
		}
		if (!i.isConnected || !c.isConnected || !i.contains(c)) {
			r.ended("detached", V(a.name));
			return;
		}
		try {
			e.mountedComponent = { mountHandle: n.mount(c) }, e.phase = "mounted";
		} catch (t) {
			r.ended("failed", H(e, t));
			return;
		}
		if (s.aborted) {
			r.ended("stopped");
			return;
		}
		if (!i.isConnected || !c.isConnected || !i.contains(c)) {
			r.ended("detached", V(a.name));
			return;
		}
		for (let n of e.attachListeners.values()) {
			if (O(n, t), s.aborted) return;
			if (!i.isConnected || !c.isConnected || !i.contains(c)) {
				r.ended("detached", V(a.name));
				return;
			}
		}
		r.setStatus("mounted");
	}
	async function R(e, t, n) {
		e.phase = "ended", e.domWaitAbortController.abort();
		let r = await P(e.attachListeners, t);
		return e.cleanupErrors.push(...r), z(e, n);
	}
	function z(e, r) {
		let { config: i, cleanupErrors: a } = e, o = e.mountedComponent;
		if (o) {
			e.mountedComponent = null;
			try {
				r.unmount(o.mountHandle);
			} catch (e) {
				a.push(new n(`Failed to unmount "${i.name}"`, {
					code: t.UNMOUNT_FAILED,
					cause: e
				}));
			}
		}
		let s = e.componentContainer;
		if (s) {
			e.componentContainer = null;
			try {
				s.remove();
			} catch (e) {
				a.push(new n(`Failed to remove container of "${i.name}"`, {
					code: t.CONTAINER_REMOVE_FAILED,
					cause: e
				}));
			}
		}
		return a;
	}
	function B(e) {
		return new n(`Timed out waiting for the mount target of "${e}"`, { code: t.TARGET_WAIT_TIMEOUT });
	}
	function V(e) {
		return new n(`Mount target "${e}" disconnected`, { code: t.MOUNT_TARGET_DETACHED });
	}
	function H(e, i) {
		let a = i instanceof r && i.code === t.MOUNT_CLEANUP_FAILED ? i : void 0;
		return a && e.cleanupErrors.push(...a.errors), new n(`Failed to mount "${e.config.name}"`, {
			code: t.MOUNT_FAILED,
			cause: a ? a.cause : i
		});
	}
	function U(e, t, n, r, i, a, s) {
		let c, l = Object.freeze((e.listeners ?? []).map((e) => e.name)), u = Object.freeze({
			name: e.name,
			start: () => G(c),
			stop: () => q(c),
			remove: () => ce(c)
		}), d = Object.freeze({
			getSnapshot: () => c.state.view.getSnapshot(),
			subscribe: (e) => c.state.view.subscribe(e),
			get lastError() {
				return c.lastError;
			},
			attachedListenerNames: l,
			attachedListener: (e) => W(c, e)
		});
		c = {
			config: e,
			dom: n,
			onRemoved: r,
			isDisposed: i,
			mounter: {
				mount(n) {
					return t.mount({
						component: e.component,
						props: e.props,
						container: n,
						command: u,
						statusHandle: d,
						globalListener: a
					});
				},
				unmount(e) {
					t.unmount(e);
				}
			},
			state: v("idle", (t) => {
				let n = o(`"${e.name}"`, t);
				console.error(n), s(e.name, n);
			}),
			attachListeners: new Map(),
			intent: "stopped",
			executionSlot: {
				kind: "empty",
				cleanupPromise: Promise.resolve()
			},
			lastError: void 0
		};
		for (let t of e.listeners ?? []) c.attachListeners.set(t.name, N({
			...t,
			reinject: e.reinject
		}, (e) => se(c, t.name, e), (n) => {
			let r = o(`"${e.name}" listener "${t.name}"`, n);
			console.error(r), s(e.name, r);
		}));
		return {
			kind: "component",
			command: u,
			statusHandle: d
		};
	}
	function W(e, r) {
		let i = e.attachListeners.get(r);
		if (!i) throw new n(`Unknown listener "${r}" in "${e.config.name}"`, { code: t.LISTENER_NOT_FOUND });
		return i.state.view;
	}
	function se(e, r, i) {
		e.executionSlot.kind === "active" && J(e, "failed", new n(`"${e.config.name}" stopped because listener "${r}" failed`, {
			code: t.ATTACHED_LISTENER_FAILED,
			cause: i
		})).catch(() => {});
	}
	function G(e) {
		let { config: r, executionSlot: i } = e;
		if (e.isDisposed()) throw new n("Core instance is disposed", { code: t.INSTANCE_DISPOSED });
		if (i.kind === "cleanup-failed") throw new n(`Injection "${r.name}" cannot restart after cleanup failed`, { code: t.INJECTION_CLOSED });
		if (e.intent === "removed") throw new n(`Injection "${r.name}" was removed`, { code: t.INJECTION_REMOVED });
		e.intent = "running", i.kind === "empty" && (e.lastError = void 0, K(e));
	}
	function K(e) {
		let t, n, r = new Promise((e, r) => {
			t = e, n = r;
		});
		r.catch(() => {});
		let i = F(e.config, e.dom, e.mounter, e.attachListeners, {
			setStatus(t) {
				let n = e.executionSlot;
				n.kind === "active" && n.execution === i && e.state.set(t);
			},
			ended(t, n) {
				let r = e.executionSlot;
				(r.kind === "active" || r.kind === "cancelling") && r.execution === i && J(e, t, n).catch(() => {});
			}
		});
		e.executionSlot = {
			kind: "active",
			execution: i,
			cleanupCompletion: {
				promise: r,
				resolve: t,
				reject: n
			}
		}, i.start();
	}
	function q(e) {
		let t = e.executionSlot;
		if (t.kind === "cleanup-failed" || t.kind === "removed") return t.cleanupPromise;
		switch (e.intent !== "removed" && (e.intent = "stopped"), t.kind) {
			case "empty": return e.state.set("idle"), t.cleanupPromise;
			case "cancelling":
			case "closing": return t.cleanupCompletion.promise;
			case "active": return t.execution.phase === "mounting" ? (e.executionSlot = {
				...t,
				kind: "cancelling"
			}, t.execution.cancel(), t.cleanupCompletion.promise) : J(e, "stopped");
		}
	}
	function ce(e) {
		let t = e.executionSlot;
		if (t.kind === "cleanup-failed" || t.kind === "removed") return t.cleanupPromise;
		e.intent = "removed";
		let n = q(e);
		return e.executionSlot.kind === "empty" && (e.executionSlot = {
			kind: "removed",
			cleanupPromise: n
		}, e.onRemoved()), n;
	}
	async function J(e, t, n) {
		let r = e.executionSlot;
		switch (r.kind) {
			case "empty":
			case "removed":
			case "cleanup-failed": return r.cleanupPromise;
			case "closing": return r.cleanupCompletion.promise;
		}
		let { execution: i, cleanupCompletion: a } = r;
		e.executionSlot = {
			...r,
			kind: "closing"
		};
		let o = await i.finish();
		if (o.length > 0) {
			let t = c(e.config.name, n ? [n, ...o] : o);
			throw e.lastError = t, e.executionSlot = {
				kind: "cleanup-failed",
				cleanupPromise: a.promise
			}, a.reject(t), console.error(t), e.state.set("failed"), t;
		}
		if (e.executionSlot = {
			kind: "empty",
			cleanupPromise: a.promise
		}, a.resolve(), e.intent === "removed") {
			e.executionSlot = {
				kind: "removed",
				cleanupPromise: a.promise
			}, e.state.set("idle"), e.onRemoved();
			return;
		}
		if (e.intent === "running" && (t === "stopped" || t === "detached" && e.config.reinject)) {
			t === "detached" && e.state.set("waiting"), e.intent === "running" && e.executionSlot.kind === "empty" && (t === "stopped" ? G(e) : K(e));
			return;
		}
		e.intent = "stopped", n && (e.lastError = n, console.error(n)), e.state.set(t === "stopped" ? "idle" : "failed");
	}
	function le() {
		let e = new Set(), t;
		return { subscribe(n, r) {
			if (r.aborted) return () => {};
			t || (t = new MutationObserver(() => {
				for (let t of [...e]) e.has(t) && t();
			})), e.size || t.observe(document, {
				subtree: !0,
				childList: !0,
				attributes: !0,
				characterData: !0
			}), e.add(n);
			let i = () => {
				e.delete(n) && (r.removeEventListener("abort", i), e.size || t?.disconnect());
			};
			return r.addEventListener("abort", i, { once: !0 }), i;
		} };
	}
	function Y() {
		let e = {
			injections: new Map(),
			adapters: re(),
			dom: le(),
			observers: new Set(),
			disposed: !1,
			disposal: void 0
		};
		return {
			useAdapter: (t) => {
				Q(e), e.adapters.use(t);
			},
			apply: (t) => {
				Q(e), ue(e, t);
			},
			command: (t) => $(e.injections, t).command,
			statusHandle: (t) => $(e.injections, t).statusHandle,
			observe: (t) => (Q(e), e.observers.add(t), () => {
				e.observers.delete(t);
			}),
			dispose: () => pe(e)
		};
	}
	function ue(e, t) {
		let { injections: n, adapters: r } = e, i = de(t, n, r).map((t) => fe(e, t, () => e.disposed));
		for (let e of i) n.get(e.command.name) === e && e.command.start();
	}
	function de(e, r, i) {
		if (!Array.isArray(e) || e.length === 0) throw new n("Expected a non-empty array of declarations", { code: t.DECLARATION_INVALID });
		let a = e.map(he), o = new Set(r.keys());
		for (let e of a) {
			let r = e.name;
			if (o.has(r)) throw new n(`Injection name "${r}" is already occupied`, { code: t.INJECTION_NAME_CONFLICT });
			o.add(r);
		}
		return a.map((e) => e.kind === "listener" ? {
			kind: "listener",
			config: e
		} : {
			kind: "component",
			config: e,
			adapter: i.require(e.adapter)
		});
	}
	function fe(e, t, n) {
		let { injections: r, dom: i } = e, a = (t, n) => {
			Z(e, {
				type: "diagnostic",
				name: t,
				error: n
			});
		}, o = t.kind === "listener" ? oe(t.config, i, () => X$1(e, o), n, a) : U(t.config, t.adapter, i, () => X$1(e, o), n, (e) => me(r, e), a);
		return r.set(t.config.name, o), o;
	}
	function X$1(e, t) {
		let n = t.command.name;
		e.injections.get(n) === t && (e.injections.delete(n), Z(e, {
			type: "injection-removed",
			name: n
		}));
	}
	function Z(e, t) {
		let n = t.type !== "diagnostic";
		for (let r of [...e.observers]) try {
			r(t);
		} catch (t) {
			let r = s(t);
			console.error(r), n && Z(e, {
				type: "diagnostic",
				error: r
			});
		}
	}
	function Q(e) {
		if (e.disposed) throw new n("Core instance is disposed", { code: t.INSTANCE_DISPOSED });
	}
	function pe(e) {
		if (e.disposal) return e.disposal;
		e.disposed = !0;
		let n, i, a = new Promise((e, t) => {
			n = e, i = t;
		});
		return e.disposal = a, (async () => {
			let a = [];
			for (let t of [...e.injections.values()]) try {
				await t.command.remove();
			} catch (e) {
				a.push(e);
			}
			if (Z(e, { type: "instance-disposed" }), e.observers.clear(), a.length === 0) {
				n();
				return;
			}
			i(new r(a, "Failed to dispose core", { code: t.INSTANCE_CLEANUP_FAILED }));
		})(), a;
	}
	function me(e, r) {
		let i = $(e, r);
		if (i.kind !== "listener") throw new n(`Unknown injection "${r}"`, { code: t.INJECTION_NOT_FOUND });
		return {
			command: i.command,
			statusHandle: i.statusHandle
		};
	}
	function $(e, r) {
		let i = e.get(r);
		if (!i) throw new n(`Unknown injection "${r}"`, { code: t.INJECTION_NOT_FOUND });
		return i;
	}
	function he(e) {
		if (typeof e == "object" && e && "kind" in e) switch (e.kind) {
			case "listener": return p$1(e);
			case "component": return g$1(e);
		}
		throw new n("Invalid declaration\nkind: Expected listener or component", { code: t.DECLARATION_INVALID });
	}
	function makeMap(str) {
		const map = Object.create(null);
		for (const key of str.split(",")) map[key] = 1;
		return (val) => val in map;
	}
	var EMPTY_OBJ = {};
	var EMPTY_ARR = [];
	var NOOP = () => {};
	var NO = () => false;
	var isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
	var isModelListener = (key) => key.startsWith("onUpdate:");
	var extend = Object.assign;
	var remove = (arr, el) => {
		const i = arr.indexOf(el);
		if (i > -1) arr.splice(i, 1);
	};
	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
	var hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
	var isArray = Array.isArray;
	var isMap = (val) => toTypeString(val) === "[object Map]";
	var isSet = (val) => toTypeString(val) === "[object Set]";
	var isDate = (val) => toTypeString(val) === "[object Date]";
	var isFunction = (val) => typeof val === "function";
	var isString = (val) => typeof val === "string";
	var isSymbol = (val) => typeof val === "symbol";
	var isObject = (val) => val !== null && typeof val === "object";
	var isPromise = (val) => {
		return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
	};
	var objectToString = Object.prototype.toString;
	var toTypeString = (value) => objectToString.call(value);
	var toRawType = (value) => {
		return toTypeString(value).slice(8, -1);
	};
	var isPlainObject = (val) => toTypeString(val) === "[object Object]";
	var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
	var isReservedProp = makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
	var cacheStringFunction = (fn) => {
		const cache = Object.create(null);
		return ((str) => {
			return cache[str] || (cache[str] = fn(str));
		});
	};
	var camelizeRE = /-\w/g;
	var camelize = cacheStringFunction((str) => {
		return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
	});
	var hyphenateRE = /\B([A-Z])/g;
	var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
	var capitalize = cacheStringFunction((str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	});
	var toHandlerKey = cacheStringFunction((str) => {
		return str ? `on${capitalize(str)}` : ``;
	});
	var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
	var invokeArrayFns = (fns, ...arg) => {
		for (let i = 0; i < fns.length; i++) fns[i](...arg);
	};
	var def = (obj, key, value, writable = false) => {
		Object.defineProperty(obj, key, {
			configurable: true,
			enumerable: false,
			writable,
			value
		});
	};
	var looseToNumber = (val) => {
		const n = parseFloat(val);
		return isNaN(n) ? val : n;
	};
	var toNumber = (val) => {
		const n = isString(val) ? Number(val) : NaN;
		return isNaN(n) ? val : n;
	};
	var _globalThis;
	var getGlobalThis = () => {
		return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
	};
	function normalizeStyle(value) {
		if (isArray(value)) {
			const res = {};
			for (let i = 0; i < value.length; i++) {
				const item = value[i];
				const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
				if (normalized) for (const key in normalized) res[key] = normalized[key];
			}
			return res;
		} else if (isString(value) || isObject(value)) return value;
	}
	var listDelimiterRE = /;(?![^(]*\))/g;
	var propertyDelimiterRE = /:([^]+)/;
	var styleCommentRE = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
	function parseStringStyle(cssText) {
		const ret = {};
		cssText.replace(styleCommentRE, (match) => match.startsWith("/*") ? "" : match).split(listDelimiterRE).forEach((item) => {
			if (item) {
				const tmp = item.split(propertyDelimiterRE);
				tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
			}
		});
		return ret;
	}
	function normalizeClass(value) {
		let res = "";
		if (isString(value)) res = value;
		else if (isArray(value)) for (let i = 0; i < value.length; i++) {
			const normalized = normalizeClass(value[i]);
			if (normalized) res += normalized + " ";
		}
		else if (isObject(value)) {
			for (const name in value) if (value[name]) res += name + " ";
		}
		return res.trim();
	}
	var isSpecialBooleanAttr = makeMap(`itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly`);
	function includeBooleanAttr(value) {
		return !!value || value === "";
	}
	function looseCompareArrays(a, b, seen) {
		if (a.length !== b.length) return false;
		let equal = true;
		for (let i = 0; equal && i < a.length; i++) equal = looseEqual(a[i], b[i], seen);
		return equal;
	}
	function looseCompareCollections(a, b, seen) {
		if (a.size !== b.size) return false;
		const candidates = Array.from(b);
		const matched = new Uint8Array(candidates.length);
		for (const item of a) {
			let index = -1;
			for (let i = 0; i < candidates.length; i++) if (!matched[i] && looseEqual(item, candidates[i], seen)) {
				index = i;
				break;
			}
			if (index < 0) return false;
			matched[index] = 1;
		}
		return true;
	}
	function looseCompareObjects(a, b, seen) {
		let aValidType = isMap(a);
		let bValidType = isMap(b);
		if (aValidType || bValidType) return aValidType && bValidType ? looseCompareCollections(a, b, seen) : false;
		aValidType = isSet(a);
		bValidType = isSet(b);
		if (aValidType || bValidType) return aValidType && bValidType ? looseCompareCollections(a, b, seen) : false;
		if (Object.keys(a).length !== Object.keys(b).length) return false;
		for (const key in a) {
			const aHasKey = a.hasOwnProperty(key);
			const bHasKey = b.hasOwnProperty(key);
			if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key], seen)) return false;
		}
		return String(a) === String(b);
	}
	function looseCompareNested(a, b, seen, compare) {
		if (!seen) seen = [new Map(), new Map()];
		const [seenA, seenB] = seen;
		if (seenA.has(a) || seenB.has(b)) return seenA.get(a) === b && seenB.get(b) === a;
		seenA.set(a, b);
		seenB.set(b, a);
		const equal = compare(a, b, seen);
		seenA.delete(a);
		seenB.delete(b);
		return equal;
	}
	function looseEqual(a, b, seen) {
		if (a === b) return true;
		let aValidType = isDate(a);
		let bValidType = isDate(b);
		if (aValidType || bValidType) return aValidType && bValidType ? a.getTime() === b.getTime() : false;
		aValidType = isSymbol(a);
		bValidType = isSymbol(b);
		if (aValidType || bValidType) return a === b;
		aValidType = isArray(a);
		bValidType = isArray(b);
		if (aValidType || bValidType) return aValidType && bValidType ? looseCompareNested(a, b, seen, looseCompareArrays) : false;
		aValidType = isObject(a);
		bValidType = isObject(b);
		if (aValidType || bValidType) {
			if (!aValidType || !bValidType) return false;
			return looseCompareNested(a, b, seen, looseCompareObjects);
		}
		return String(a) === String(b);
	}
	function looseIndexOf(arr, val) {
		return arr.findIndex((item) => looseEqual(item, val));
	}
	var isRef$1 = (val) => {
		return !!(val && val["__v_isRef"] === true);
	};
	var toDisplayString = (val) => {
		return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
	};
	var replacer = (_key, val) => {
		if (isRef$1(val)) return replacer(_key, val.value);
		else if (isMap(val)) return { [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2], i) => {
			entries[stringifySymbol(key, i) + " =>"] = val2;
			return entries;
		}, {}) };
		else if (isSet(val)) return { [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v)) };
		else if (isSymbol(val)) return stringifySymbol(val);
		else if (isObject(val) && !isArray(val) && !isPlainObject(val)) return String(val);
		return val;
	};
	var stringifySymbol = (v, i = "") => {
		var _a;
		return isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v;
	};
	var activeEffectScope;
	var EffectScope = class {
		constructor(detached = false) {
			this.detached = detached;
			this._active = true;
			this._on = 0;
			this.effects = [];
			this.cleanups = [];
			this._isPaused = false;
			this._warnOnRun = true;
			this.__v_skip = true;
			if (!detached && activeEffectScope) {
				if (activeEffectScope.active) {
					this.parent = activeEffectScope;
					this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
				} else {
					this._active = false;
					this._warnOnRun = false;
				}
			}
		}
		get active() {
			return this._active;
		}
		pause() {
			if (this._active) {
				this._isPaused = true;
				let i, l;
				if (this.scopes) {
					const scopes = this.scopes.slice();
					for (i = 0, l = scopes.length; i < l; i++) scopes[i].pause();
				}
				for (i = 0, l = this.effects.length; i < l; i++) this.effects[i].pause();
			}
		}
		resume() {
			if (this._active) {
				if (this._isPaused) {
					this._isPaused = false;
					let i, l;
					if (this.scopes) {
						const scopes = this.scopes.slice();
						for (i = 0, l = scopes.length; i < l; i++) scopes[i].resume();
					}
					const effects = this.effects.slice();
					for (i = 0, l = effects.length; i < l; i++) effects[i].resume();
				}
			}
		}
		run(fn) {
			if (this._active) {
				const currentEffectScope = activeEffectScope;
				try {
					activeEffectScope = this;
					return fn();
				} finally {
					activeEffectScope = currentEffectScope;
				}
			}
		}
		on() {
			if (++this._on === 1) {
				this.prevScope = activeEffectScope;
				activeEffectScope = this;
			}
		}
		off() {
			if (this._on > 0 && --this._on === 0) {
				if (activeEffectScope === this) activeEffectScope = this.prevScope;
				else {
					let current = activeEffectScope;
					while (current) {
						if (current.prevScope === this) {
							current.prevScope = this.prevScope;
							break;
						}
						current = current.prevScope;
					}
				}
				this.prevScope = void 0;
			}
		}
		stop(fromParent) {
			if (this._active) {
				this._active = false;
				let i, l;
				for (i = 0, l = this.effects.length; i < l; i++) this.effects[i].stop();
				this.effects.length = 0;
				for (i = 0, l = this.cleanups.length; i < l; i++) this.cleanups[i]();
				this.cleanups.length = 0;
				if (this.scopes) {
					const scopes = this.scopes.slice();
					for (i = 0, l = scopes.length; i < l; i++) scopes[i].stop(true);
					this.scopes.length = 0;
				}
				if (!this.detached && this.parent && !fromParent) {
					const last = this.parent.scopes.pop();
					if (last && last !== this) {
						this.parent.scopes[this.index] = last;
						last.index = this.index;
					}
				}
				this.parent = void 0;
			}
		}
	};
	function getCurrentScope() {
		return activeEffectScope;
	}
	var activeSub;
	var pausedQueueEffects = new WeakSet();
	var ReactiveEffect = class {
		constructor(fn) {
			this.fn = fn;
			this.deps = void 0;
			this.depsTail = void 0;
			this.flags = 5;
			this.next = void 0;
			this.cleanup = void 0;
			this.scheduler = void 0;
			if (activeEffectScope) {
				if (activeEffectScope.active) activeEffectScope.effects.push(this);
				else this.flags &= -2;
			}
		}
		pause() {
			this.flags |= 64;
		}
		resume() {
			if (this.flags & 64) {
				this.flags &= -65;
				if (pausedQueueEffects.has(this)) {
					pausedQueueEffects.delete(this);
					this.trigger();
				}
			}
		}
		notify() {
			if (this.flags & 2 && !(this.flags & 32)) return;
			if (!(this.flags & 8)) batch(this);
		}
		run() {
			if (!(this.flags & 1)) return this.fn();
			this.flags |= 2;
			cleanupEffect(this);
			prepareDeps(this);
			const prevEffect = activeSub;
			const prevShouldTrack = shouldTrack;
			activeSub = this;
			shouldTrack = true;
			try {
				return this.fn();
			} finally {
				cleanupDeps(this);
				activeSub = prevEffect;
				shouldTrack = prevShouldTrack;
				this.flags &= -3;
			}
		}
		stop() {
			if (this.flags & 1) {
				for (let link = this.deps; link; link = link.nextDep) removeSub(link);
				this.deps = this.depsTail = void 0;
				cleanupEffect(this);
				this.onStop && this.onStop();
				this.flags &= -2;
			}
		}
		trigger() {
			if (this.flags & 64) pausedQueueEffects.add(this);
			else if (this.scheduler) this.scheduler();
			else this.runIfDirty();
		}
		runIfDirty() {
			if (isDirty(this)) this.run();
		}
		get dirty() {
			return isDirty(this);
		}
	};
	var batchDepth = 0;
	var batchedSub;
	var batchedComputed;
	function batch(sub, isComputed = false) {
		sub.flags |= 8;
		if (isComputed) {
			sub.next = batchedComputed;
			batchedComputed = sub;
			return;
		}
		sub.next = batchedSub;
		batchedSub = sub;
	}
	function startBatch() {
		batchDepth++;
	}
	function endBatch() {
		if (--batchDepth > 0) return;
		if (batchedComputed) {
			let e = batchedComputed;
			batchedComputed = void 0;
			while (e) {
				const next = e.next;
				e.next = void 0;
				e.flags &= -9;
				e = next;
			}
		}
		let error;
		while (batchedSub) {
			let e = batchedSub;
			batchedSub = void 0;
			while (e) {
				const next = e.next;
				e.next = void 0;
				e.flags &= -9;
				if (e.flags & 1) try {
					e.trigger();
				} catch (err) {
					if (!error) error = err;
				}
				e = next;
			}
		}
		if (error) throw error;
	}
	function prepareDeps(sub) {
		for (let link = sub.deps; link; link = link.nextDep) {
			link.version = -1;
			link.prevActiveLink = link.dep.activeLink;
			link.dep.activeLink = link;
		}
	}
	function cleanupDeps(sub) {
		let head;
		let tail = sub.depsTail;
		let link = tail;
		while (link) {
			const prev = link.prevDep;
			if (link.version === -1) {
				if (link === tail) tail = prev;
				removeSub(link);
				removeDep(link);
			} else head = link;
			link.dep.activeLink = link.prevActiveLink;
			link.prevActiveLink = void 0;
			link = prev;
		}
		sub.deps = head;
		sub.depsTail = tail;
	}
	function isDirty(sub) {
		for (let link = sub.deps; link; link = link.nextDep) if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) return true;
		if (sub._dirty) return true;
		return false;
	}
	function refreshComputed(computed) {
		if (computed.flags & 4 && !(computed.flags & 16)) return;
		computed.flags &= -17;
		if (computed.globalVersion === globalVersion) return;
		computed.globalVersion = globalVersion;
		if (!computed.isSSR && computed.flags & 128 && (!computed.deps && !computed._dirty || !isDirty(computed))) return;
		computed.flags |= 2;
		const dep = computed.dep;
		const prevSub = activeSub;
		const prevShouldTrack = shouldTrack;
		activeSub = computed;
		shouldTrack = true;
		try {
			prepareDeps(computed);
			const value = computed.fn(computed._value);
			if (dep.version === 0 || hasChanged(value, computed._value)) {
				computed.flags |= 128;
				computed._value = value;
				dep.version++;
			}
		} catch (err) {
			dep.version++;
			throw err;
		} finally {
			activeSub = prevSub;
			shouldTrack = prevShouldTrack;
			cleanupDeps(computed);
			computed.flags &= -3;
		}
	}
	function removeSub(link, soft = false) {
		const { dep, prevSub, nextSub } = link;
		if (prevSub) {
			prevSub.nextSub = nextSub;
			link.prevSub = void 0;
		}
		if (nextSub) {
			nextSub.prevSub = prevSub;
			link.nextSub = void 0;
		}
		if (dep.subs === link) {
			dep.subs = prevSub;
			if (!prevSub && dep.computed) {
				dep.computed.flags &= -5;
				for (let l = dep.computed.deps; l; l = l.nextDep) removeSub(l, true);
			}
		}
		if (!soft && !--dep.sc && dep.map) dep.map.delete(dep.key);
	}
	function removeDep(link) {
		const { prevDep, nextDep } = link;
		if (prevDep) {
			prevDep.nextDep = nextDep;
			link.prevDep = void 0;
		}
		if (nextDep) {
			nextDep.prevDep = prevDep;
			link.nextDep = void 0;
		}
	}
	var shouldTrack = true;
	var trackStack = [];
	function pauseTracking() {
		trackStack.push(shouldTrack);
		shouldTrack = false;
	}
	function resetTracking() {
		const last = trackStack.pop();
		shouldTrack = last === void 0 ? true : last;
	}
	function cleanupEffect(e) {
		const { cleanup } = e;
		e.cleanup = void 0;
		if (cleanup) {
			const prevSub = activeSub;
			activeSub = void 0;
			try {
				cleanup();
			} finally {
				activeSub = prevSub;
			}
		}
	}
	var globalVersion = 0;
	var Link = class {
		constructor(sub, dep) {
			this.sub = sub;
			this.dep = dep;
			this.version = dep.version;
			this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
		}
	};
	var Dep = class {
		constructor(computed) {
			this.computed = computed;
			this.version = 0;
			this.activeLink = void 0;
			this.subs = void 0;
			this.map = void 0;
			this.key = void 0;
			this.sc = 0;
			this.__v_skip = true;
		}
		track(debugInfo) {
			if (!activeSub || !shouldTrack || activeSub === this.computed) return;
			let link = this.activeLink;
			if (link === void 0 || link.sub !== activeSub) {
				link = this.activeLink = new Link(activeSub, this);
				if (!activeSub.deps) activeSub.deps = activeSub.depsTail = link;
				else {
					link.prevDep = activeSub.depsTail;
					activeSub.depsTail.nextDep = link;
					activeSub.depsTail = link;
				}
				addSub(link);
			} else if (link.version === -1) {
				link.version = this.version;
				if (link.nextDep) {
					const next = link.nextDep;
					next.prevDep = link.prevDep;
					if (link.prevDep) link.prevDep.nextDep = next;
					link.prevDep = activeSub.depsTail;
					link.nextDep = void 0;
					activeSub.depsTail.nextDep = link;
					activeSub.depsTail = link;
					if (activeSub.deps === link) activeSub.deps = next;
				}
			}
			return link;
		}
		trigger(debugInfo) {
			this.version++;
			globalVersion++;
			this.notify(debugInfo);
		}
		notify(debugInfo) {
			startBatch();
			try {
				for (let link = this.subs; link; link = link.prevSub) if (link.sub.notify()) link.sub.dep.notify();
			} finally {
				endBatch();
			}
		}
	};
	function addSub(link) {
		link.dep.sc++;
		if (link.sub.flags & 4) {
			const computed = link.dep.computed;
			if (computed && !link.dep.subs) {
				computed.flags |= 20;
				for (let l = computed.deps; l; l = l.nextDep) addSub(l);
			}
			const currentTail = link.dep.subs;
			if (currentTail !== link) {
				link.prevSub = currentTail;
				if (currentTail) currentTail.nextSub = link;
			}
			link.dep.subs = link;
		}
	}
	var targetMap = new WeakMap();
	var ITERATE_KEY = Symbol("");
	var MAP_KEY_ITERATE_KEY = Symbol("");
	var ARRAY_ITERATE_KEY = Symbol("");
	function track(target, type, key) {
		if (shouldTrack && activeSub) {
			let depsMap = targetMap.get(target);
			if (!depsMap) targetMap.set(target, depsMap = new Map());
			let dep = depsMap.get(key);
			if (!dep) {
				depsMap.set(key, dep = new Dep());
				dep.map = depsMap;
				dep.key = key;
			}
			dep.track();
		}
	}
	function trigger(target, type, key, newValue, oldValue, oldTarget) {
		const depsMap = targetMap.get(target);
		if (!depsMap) {
			globalVersion++;
			return;
		}
		const run = (dep) => {
			if (dep) dep.trigger();
		};
		startBatch();
		if (type === "clear") depsMap.forEach(run);
		else {
			const targetIsArray = isArray(target);
			const isArrayIndex = targetIsArray && isIntegerKey(key);
			if (targetIsArray && key === "length") {
				const newLength = Number(newValue);
				depsMap.forEach((dep, key2) => {
					if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) run(dep);
				});
			} else {
				if (key !== void 0 || depsMap.has(void 0)) run(depsMap.get(key));
				if (isArrayIndex) run(depsMap.get(ARRAY_ITERATE_KEY));
				switch (type) {
					case "add":
						if (!targetIsArray) {
							run(depsMap.get(ITERATE_KEY));
							if (isMap(target)) run(depsMap.get(MAP_KEY_ITERATE_KEY));
						} else if (isArrayIndex) run(depsMap.get("length"));
						break;
					case "delete":
						if (!targetIsArray) {
							run(depsMap.get(ITERATE_KEY));
							if (isMap(target)) run(depsMap.get(MAP_KEY_ITERATE_KEY));
						}
						break;
					case "set": if (isMap(target)) run(depsMap.get(ITERATE_KEY));
				}
			}
		}
		endBatch();
	}
	function reactiveReadArray(array) {
		const raw = toRaw(array);
		if (raw === array) return raw;
		track(raw, "iterate", ARRAY_ITERATE_KEY);
		if (isShallow(array)) return raw;
		if (!isReadonly(array)) return raw.map(toReactive);
		return isReactive(array) ? raw.map((item) => toReadonly(toReactive(item))) : raw.map(toReadonly);
	}
	function shallowReadArray(arr) {
		track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
		return arr;
	}
	function toWrapped(target, item) {
		if (isReadonly(target)) return isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
		return toReactive(item);
	}
	var arrayInstrumentations = {
		__proto__: null,
		[Symbol.iterator]() {
			return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
		},
		concat(...args) {
			return reactiveReadArray(this).concat(...args.map((x) => isArray(x) ? reactiveReadArray(x) : x));
		},
		entries() {
			return iterator(this, "entries", (value) => {
				value[1] = toWrapped(this, value[1]);
				return value;
			});
		},
		every(fn, thisArg) {
			return apply(this, "every", fn, thisArg, void 0, arguments);
		},
		filter(fn, thisArg) {
			return apply(this, "filter", fn, thisArg, (v) => v.map((item) => toWrapped(this, item)), arguments);
		},
		find(fn, thisArg) {
			return apply(this, "find", fn, thisArg, (item) => toWrapped(this, item), arguments);
		},
		findIndex(fn, thisArg) {
			return apply(this, "findIndex", fn, thisArg, void 0, arguments);
		},
		findLast(fn, thisArg) {
			return apply(this, "findLast", fn, thisArg, (item) => toWrapped(this, item), arguments);
		},
		findLastIndex(fn, thisArg) {
			return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
		},
		forEach(fn, thisArg) {
			return apply(this, "forEach", fn, thisArg, void 0, arguments);
		},
		includes(...args) {
			return searchProxy(this, "includes", args);
		},
		indexOf(...args) {
			return searchProxy(this, "indexOf", args);
		},
		join(separator) {
			return reactiveReadArray(this).join(separator);
		},
		lastIndexOf(...args) {
			return searchProxy(this, "lastIndexOf", args);
		},
		map(fn, thisArg) {
			return apply(this, "map", fn, thisArg, void 0, arguments);
		},
		pop() {
			return noTracking(this, "pop");
		},
		push(...args) {
			return noTracking(this, "push", args);
		},
		reduce(fn, ...args) {
			return reduce(this, "reduce", fn, args);
		},
		reduceRight(fn, ...args) {
			return reduce(this, "reduceRight", fn, args);
		},
		shift() {
			return noTracking(this, "shift");
		},
		some(fn, thisArg) {
			return apply(this, "some", fn, thisArg, void 0, arguments);
		},
		splice(...args) {
			return noTracking(this, "splice", args);
		},
		toReversed() {
			return reactiveReadArray(this).toReversed();
		},
		toSorted(comparer) {
			return reactiveReadArray(this).toSorted(comparer);
		},
		toSpliced(...args) {
			return reactiveReadArray(this).toSpliced(...args);
		},
		unshift(...args) {
			return noTracking(this, "unshift", args);
		},
		values() {
			return iterator(this, "values", (item) => toWrapped(this, item));
		}
	};
	function iterator(self, method, wrapValue) {
		const arr = shallowReadArray(self);
		const methodFn = arr[method];
		const iter = methodFn.call(arr);
		if (arr !== self && !isShallow(self)) {
			if (iter[Symbol.toStringTag] === "Array Iterator") {
				const wrapped = Object.create(Object.getPrototypeOf(iter));
				wrapped.next = () => wrapResult(iter.next(), wrapValue);
				if (methodFn !== arrayProto[method]) Object.defineProperties(wrapped, {
					return: { get() {
						const fn = iter.return;
						return typeof fn === "function" ? fn.bind(iter) : fn;
					} },
					throw: { get() {
						const fn = iter.throw;
						return typeof fn === "function" ? fn.bind(iter) : fn;
					} }
				});
				return wrapped;
			}
			iter._next = iter.next;
			iter.next = () => wrapResult(iter._next(), wrapValue);
		}
		return iter;
	}
	function wrapResult(result, wrapValue) {
		if (!result.done) result.value = wrapValue(result.value);
		return result;
	}
	var arrayProto = Array.prototype;
	function apply(self, method, fn, thisArg, wrappedRetFn, args) {
		const arr = shallowReadArray(self);
		const needsWrap = arr !== self && !isShallow(self);
		const methodFn = arr[method];
		if (methodFn !== arrayProto[method]) {
			const result2 = methodFn.apply(self, args);
			return needsWrap ? toReactive(result2) : result2;
		}
		let wrappedFn = fn;
		if (arr !== self) {
			if (needsWrap) wrappedFn = function(item, index) {
				return fn.call(this, toWrapped(self, item), index, self);
			};
			else if (fn.length > 2) wrappedFn = function(item, index) {
				return fn.call(this, item, index, self);
			};
		}
		const result = methodFn.call(arr, wrappedFn, thisArg);
		return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
	}
	function reduce(self, method, fn, args) {
		const arr = shallowReadArray(self);
		const needsWrap = arr !== self && !isShallow(self);
		let wrappedFn = fn;
		let wrapInitialAccumulator = false;
		if (arr !== self) {
			if (needsWrap) {
				wrapInitialAccumulator = args.length === 0;
				wrappedFn = function(acc, item, index) {
					if (wrapInitialAccumulator) {
						wrapInitialAccumulator = false;
						acc = toWrapped(self, acc);
					}
					return fn.call(this, acc, toWrapped(self, item), index, self);
				};
			} else if (fn.length > 3) wrappedFn = function(acc, item, index) {
				return fn.call(this, acc, item, index, self);
			};
		}
		const result = arr[method](wrappedFn, ...args);
		return wrapInitialAccumulator ? toWrapped(self, result) : result;
	}
	function searchProxy(self, method, args) {
		const arr = toRaw(self);
		track(arr, "iterate", ARRAY_ITERATE_KEY);
		const res = arr[method](...args);
		if ((res === -1 || res === false) && isProxy(args[0])) {
			args[0] = toRaw(args[0]);
			return arr[method](...args);
		}
		return res;
	}
	function noTracking(self, method, args = []) {
		pauseTracking();
		startBatch();
		const res = toRaw(self)[method].apply(self, args);
		endBatch();
		resetTracking();
		return res;
	}
	var isNonTrackableKeys = makeMap(`__proto__,__v_isRef,__isVue`);
	var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol));
	function hasOwnProperty(key) {
		if (!isSymbol(key)) key = String(key);
		const obj = toRaw(this);
		track(obj, "has", key);
		return obj.hasOwnProperty(key);
	}
	var BaseReactiveHandler = class {
		constructor(_isReadonly = false, _isShallow = false) {
			this._isReadonly = _isReadonly;
			this._isShallow = _isShallow;
		}
		get(target, key, receiver) {
			if (key === "__v_skip") return target["__v_skip"];
			const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
			if (key === "__v_isReactive") return !isReadonly2;
			else if (key === "__v_isReadonly") return isReadonly2;
			else if (key === "__v_isShallow") return isShallow2;
			else if (key === "__v_raw") {
				if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) return target;
				return;
			}
			const targetIsArray = isArray(target);
			if (!isReadonly2) {
				let fn;
				if (targetIsArray && (fn = arrayInstrumentations[key])) return fn;
				if (key === "hasOwnProperty") return hasOwnProperty;
			}
			const res = Reflect.get(target, key, isRef(target) ? target : receiver);
			if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) return res;
			if (!isReadonly2) track(target, "get", key);
			if (isShallow2) return res;
			if (isRef(res)) {
				const value = targetIsArray && isIntegerKey(key) ? res : res.value;
				return isReadonly2 && isObject(value) ? readonly(value) : value;
			}
			if (isObject(res)) return isReadonly2 ? readonly(res) : reactive(res);
			return res;
		}
	};
	var MutableReactiveHandler = class extends BaseReactiveHandler {
		constructor(isShallow2 = false) {
			super(false, isShallow2);
		}
		set(target, key, value, receiver) {
			let oldValue = target[key];
			const isArrayWithIntegerKey = isArray(target) && isIntegerKey(key);
			if (!this._isShallow) {
				const isOldValueReadonly = isReadonly(oldValue);
				if (!isShallow(value) && !isReadonly(value)) {
					oldValue = toRaw(oldValue);
					value = toRaw(value);
				}
				if (!isArrayWithIntegerKey && isRef(oldValue) && !isRef(value)) {
					if (isOldValueReadonly) return true;
					else {
						oldValue.value = value;
						return true;
					}
				}
			}
			const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
			const result = Reflect.set(target, key, value, isRef(target) ? target : receiver);
			if (target === toRaw(receiver) && result) {
				if (!hadKey) trigger(target, "add", key, value);
				else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
			}
			return result;
		}
		deleteProperty(target, key) {
			const hadKey = hasOwn(target, key);
			const oldValue = target[key];
			const result = Reflect.deleteProperty(target, key);
			if (result && hadKey) trigger(target, "delete", key, void 0, oldValue);
			return result;
		}
		has(target, key) {
			const result = Reflect.has(target, key);
			if (!isSymbol(key) || !builtInSymbols.has(key)) track(target, "has", key);
			return result;
		}
		ownKeys(target) {
			track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
			return Reflect.ownKeys(target);
		}
	};
	var ReadonlyReactiveHandler = class extends BaseReactiveHandler {
		constructor(isShallow2 = false) {
			super(true, isShallow2);
		}
		set(target, key) {
			return true;
		}
		deleteProperty(target, key) {
			return true;
		}
	};
	var mutableHandlers = new MutableReactiveHandler();
	var readonlyHandlers = new ReadonlyReactiveHandler();
	var shallowReactiveHandlers = new MutableReactiveHandler(true);
	var toShallow = (value) => value;
	var getProto = (v) => Reflect.getPrototypeOf(v);
	function createIterableMethod(method, isReadonly2, isShallow2) {
		return function(...args) {
			const target = this["__v_raw"];
			const rawTarget = toRaw(target);
			const targetIsMap = isMap(rawTarget);
			const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
			const isKeyOnly = method === "keys" && targetIsMap;
			const innerIterator = target[method](...args);
			const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
			!isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
			return extend(Object.create(innerIterator), { next() {
				const { value, done } = innerIterator.next();
				return done ? {
					value,
					done
				} : {
					value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
					done
				};
			} });
		};
	}
	function createReadonlyMethod(type) {
		return function(...args) {
			return type === "delete" ? false : type === "clear" ? void 0 : this;
		};
	}
	function createInstrumentations(readonly, shallow) {
		const instrumentations = {
			get(key) {
				const target = this["__v_raw"];
				const rawTarget = toRaw(target);
				const rawKey = toRaw(key);
				if (!readonly) {
					if (hasChanged(key, rawKey)) track(rawTarget, "get", key);
					track(rawTarget, "get", rawKey);
				}
				const { has } = getProto(rawTarget);
				const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
				if (has.call(rawTarget, key)) return wrap(target.get(key));
				else if (has.call(rawTarget, rawKey)) return wrap(target.get(rawKey));
				else if (target !== rawTarget) target.get(key);
			},
			get size() {
				const target = this["__v_raw"];
				!readonly && track(toRaw(target), "iterate", ITERATE_KEY);
				return target.size;
			},
			has(key) {
				const target = this["__v_raw"];
				const rawTarget = toRaw(target);
				const rawKey = toRaw(key);
				if (!readonly) {
					if (hasChanged(key, rawKey)) track(rawTarget, "has", key);
					track(rawTarget, "has", rawKey);
				}
				return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
			},
			forEach(callback, thisArg) {
				const observed = this;
				const target = observed["__v_raw"];
				const rawTarget = toRaw(target);
				const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
				!readonly && track(rawTarget, "iterate", ITERATE_KEY);
				return target.forEach((value, key) => {
					return callback.call(thisArg, wrap(value), wrap(key), observed);
				});
			}
		};
		extend(instrumentations, readonly ? {
			add: createReadonlyMethod("add"),
			set: createReadonlyMethod("set"),
			delete: createReadonlyMethod("delete"),
			clear: createReadonlyMethod("clear")
		} : {
			add(value) {
				const target = toRaw(this);
				const proto = getProto(target);
				const rawValue = toRaw(value);
				const valueToAdd = !shallow && !isShallow(value) && !isReadonly(value) ? rawValue : value;
				if (!(proto.has.call(target, valueToAdd) || hasChanged(value, valueToAdd) && proto.has.call(target, value) || hasChanged(rawValue, valueToAdd) && proto.has.call(target, rawValue))) {
					target.add(valueToAdd);
					trigger(target, "add", valueToAdd, valueToAdd);
				}
				return this;
			},
			set(key, value) {
				if (!shallow && !isShallow(value) && !isReadonly(value)) value = toRaw(value);
				const target = toRaw(this);
				const { has, get } = getProto(target);
				let hadKey = has.call(target, key);
				if (!hadKey) {
					key = toRaw(key);
					hadKey = has.call(target, key);
				}
				const oldValue = get.call(target, key);
				target.set(key, value);
				if (!hadKey) trigger(target, "add", key, value);
				else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
				return this;
			},
			delete(key) {
				const target = toRaw(this);
				const { has, get } = getProto(target);
				let hadKey = has.call(target, key);
				if (!hadKey) {
					key = toRaw(key);
					hadKey = has.call(target, key);
				}
				const oldValue = get ? get.call(target, key) : void 0;
				const result = target.delete(key);
				if (hadKey) trigger(target, "delete", key, void 0, oldValue);
				return result;
			},
			clear() {
				const target = toRaw(this);
				const hadItems = target.size !== 0;
				const oldTarget = void 0;
				const result = target.clear();
				if (hadItems) trigger(target, "clear", void 0, void 0, oldTarget);
				return result;
			}
		});
		[
			"keys",
			"values",
			"entries",
			Symbol.iterator
		].forEach((method) => {
			instrumentations[method] = createIterableMethod(method, readonly, shallow);
		});
		return instrumentations;
	}
	function createInstrumentationGetter(isReadonly2, shallow) {
		const instrumentations = createInstrumentations(isReadonly2, shallow);
		return (target, key, receiver) => {
			if (key === "__v_isReactive") return !isReadonly2;
			else if (key === "__v_isReadonly") return isReadonly2;
			else if (key === "__v_isShallow") return shallow;
			else if (key === "__v_raw") return target;
			return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
		};
	}
	var mutableCollectionHandlers = { get: createInstrumentationGetter(false, false) };
	var shallowCollectionHandlers = { get: createInstrumentationGetter(false, true) };
	var readonlyCollectionHandlers = { get: createInstrumentationGetter(true, false) };
	var reactiveMap = new WeakMap();
	var shallowReactiveMap = new WeakMap();
	var readonlyMap = new WeakMap();
	var shallowReadonlyMap = new WeakMap();
	function targetTypeMap(rawType) {
		switch (rawType) {
			case "Object":
			case "Array": return 1;
			case "Map":
			case "Set":
			case "WeakMap":
			case "WeakSet": return 2;
			default: return 0;
		}
	}
	function reactive(target) {
		if (isReadonly(target)) return target;
		return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
	}
	function shallowReactive(target) {
		return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
	}
	function readonly(target) {
		return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
	}
	function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
		if (!isObject(target)) return target;
		if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) return target;
		if (target["__v_skip"] || !Object.isExtensible(target)) return target;
		const existingProxy = proxyMap.get(target);
		if (existingProxy) return existingProxy;
		const targetType = targetTypeMap(toRawType(target));
		if (targetType === 0) return target;
		const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
		proxyMap.set(target, proxy);
		return proxy;
	}
	function isReactive(value) {
		if (isReadonly(value)) return isReactive(value["__v_raw"]);
		return !!(value && value["__v_isReactive"]);
	}
	function isReadonly(value) {
		return !!(value && value["__v_isReadonly"]);
	}
	function isShallow(value) {
		return !!(value && value["__v_isShallow"]);
	}
	function isProxy(value) {
		return value ? !!value["__v_raw"] : false;
	}
	function toRaw(observed) {
		const raw = observed && observed["__v_raw"];
		return raw ? toRaw(raw) : observed;
	}
	function markRaw(value) {
		if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) def(value, "__v_skip", true);
		return value;
	}
	var toReactive = (value) => isObject(value) ? reactive(value) : value;
	var toReadonly = (value) => isObject(value) ? readonly(value) : value;
	function isRef(r) {
		return r ? r["__v_isRef"] === true : false;
	}
	function ref(value) {
		return createRef(value, false);
	}
	function createRef(rawValue, shallow) {
		if (isRef(rawValue)) return rawValue;
		return new RefImpl(rawValue, shallow);
	}
	var RefImpl = class {
		constructor(value, isShallow2) {
			this.dep = new Dep();
			this["__v_isRef"] = true;
			this["__v_isShallow"] = false;
			this._rawValue = isShallow2 ? value : toRaw(value);
			this._value = isShallow2 ? value : toReactive(value);
			this["__v_isShallow"] = isShallow2;
		}
		get value() {
			this.dep.track();
			return this._value;
		}
		set value(newValue) {
			const oldValue = this._rawValue;
			const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
			newValue = useDirectValue ? newValue : toRaw(newValue);
			if (hasChanged(newValue, oldValue)) {
				this._rawValue = newValue;
				this._value = useDirectValue ? newValue : toReactive(newValue);
				this.dep.trigger();
			}
		}
	};
	function unref(ref2) {
		return isRef(ref2) ? ref2.value : ref2;
	}
	var shallowUnwrapHandlers = {
		get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
		set: (target, key, value, receiver) => {
			const oldValue = target[key];
			if (isRef(oldValue) && !isRef(value)) {
				oldValue.value = value;
				return true;
			} else return Reflect.set(target, key, value, receiver);
		}
	};
	function proxyRefs(objectWithRefs) {
		return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
	}
	var ComputedRefImpl = class {
		constructor(fn, setter, isSSR) {
			this.fn = fn;
			this.setter = setter;
			this._value = void 0;
			this.dep = new Dep(this);
			this.__v_isRef = true;
			this.deps = void 0;
			this.depsTail = void 0;
			this.flags = 16;
			this.globalVersion = globalVersion - 1;
			this.next = void 0;
			this.effect = this;
			this["__v_isReadonly"] = !setter;
			this.isSSR = isSSR;
		}
		notify() {
			this.flags |= 16;
			if (!(this.flags & 8) && activeSub !== this) {
				batch(this, true);
				return true;
			}
		}
		get value() {
			const link = this.dep.track();
			refreshComputed(this);
			if (link) link.version = this.dep.version;
			return this._value;
		}
		set value(newValue) {
			if (this.setter) this.setter(newValue);
		}
	};
	function computed$1(getterOrOptions, debugOptions, isSSR = false) {
		let getter;
		let setter;
		if (isFunction(getterOrOptions)) getter = getterOrOptions;
		else {
			getter = getterOrOptions.get;
			setter = getterOrOptions.set;
		}
		return new ComputedRefImpl(getter, setter, isSSR);
	}
	var INITIAL_WATCHER_VALUE = {};
	var cleanupMap = new WeakMap();
	var activeWatcher = void 0;
	function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
		if (owner) {
			let cleanups = cleanupMap.get(owner);
			if (!cleanups) cleanupMap.set(owner, cleanups = []);
			cleanups.push(cleanupFn);
		}
	}
	function watch$1(source, cb, options = EMPTY_OBJ) {
		const { immediate, deep, once, scheduler, augmentJob, call } = options;
		const reactiveGetter = (source2) => {
			if (deep) return source2;
			if (isShallow(source2) || deep === false || deep === 0) return traverse(source2, 1);
			return traverse(source2);
		};
		let effect;
		let getter;
		let cleanup;
		let boundCleanup;
		let forceTrigger = false;
		let isMultiSource = false;
		if (isRef(source)) {
			getter = () => source.value;
			forceTrigger = isShallow(source);
		} else if (isReactive(source)) {
			getter = () => reactiveGetter(source);
			forceTrigger = true;
		} else if (isArray(source)) {
			isMultiSource = true;
			forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
			getter = () => source.map((s) => {
				if (isRef(s)) return s.value;
				else if (isReactive(s)) return reactiveGetter(s);
				else if (isFunction(s)) return call ? call(s, 2) : s();
			});
		} else if (isFunction(source)) {
			if (cb) getter = call ? () => call(source, 2) : source;
			else getter = () => {
				if (cleanup) {
					pauseTracking();
					try {
						cleanup();
					} finally {
						resetTracking();
					}
				}
				const currentEffect = activeWatcher;
				activeWatcher = effect;
				try {
					return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
				} finally {
					activeWatcher = currentEffect;
				}
			};
		} else getter = NOOP;
		if (cb && deep) {
			const baseGetter = getter;
			const depth = deep === true ? Infinity : deep;
			getter = () => traverse(baseGetter(), depth);
		}
		const scope = getCurrentScope();
		const watchHandle = () => {
			effect.stop();
			if (scope && scope.active) remove(scope.effects, effect);
		};
		if (once && cb) {
			const _cb = cb;
			cb = (...args) => {
				try {
					return _cb(...args);
				} finally {
					watchHandle();
				}
			};
		}
		let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
		const job = (immediateFirstRun) => {
			if (!(effect.flags & 1) || !effect.dirty && !immediateFirstRun) return;
			if (cb) {
				const newValue = effect.run();
				if (immediateFirstRun || deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
					const currentWatcher = activeWatcher;
					pauseTracking();
					try {
						if (cleanup) cleanup();
						activeWatcher = effect;
						const args = [
							newValue,
							oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
							boundCleanup
						];
						oldValue = newValue;
						call ? call(cb, 3, args) : cb(...args);
					} finally {
						activeWatcher = currentWatcher;
						resetTracking();
					}
				}
			} else effect.run();
		};
		if (augmentJob) augmentJob(job);
		effect = new ReactiveEffect(getter);
		effect.scheduler = scheduler ? () => scheduler(job, false) : job;
		boundCleanup = (fn) => onWatcherCleanup(fn, false, effect);
		cleanup = effect.onStop = () => {
			const cleanups = cleanupMap.get(effect);
			if (cleanups) {
				if (call) call(cleanups, 4);
				else for (const cleanup2 of cleanups) cleanup2();
				cleanupMap.delete(effect);
			}
		};
		if (cb) {
			if (immediate) job(true);
			else oldValue = effect.run();
		} else if (scheduler) scheduler(job.bind(null, true), true);
		else effect.run();
		watchHandle.pause = effect.pause.bind(effect);
		watchHandle.resume = effect.resume.bind(effect);
		watchHandle.stop = watchHandle;
		return watchHandle;
	}
	function traverse(value, depth = Infinity, seen) {
		if (depth <= 0 || !isObject(value) || value["__v_skip"]) return value;
		seen = seen || new Map();
		if ((seen.get(value) || 0) >= depth) return value;
		seen.set(value, depth);
		depth--;
		if (isRef(value)) traverse(value.value, depth, seen);
		else if (isArray(value)) for (let i = 0; i < value.length; i++) traverse(value[i], depth, seen);
		else if (isSet(value) || isMap(value)) value.forEach((v) => {
			traverse(v, depth, seen);
		});
		else if (isPlainObject(value)) {
			for (const key in value) traverse(value[key], depth, seen);
			for (const key of Object.getOwnPropertySymbols(value)) if (Object.prototype.propertyIsEnumerable.call(value, key)) traverse(value[key], depth, seen);
		}
		return value;
	}
	function callWithErrorHandling(fn, instance, type, args) {
		try {
			return args ? fn(...args) : fn();
		} catch (err) {
			handleError(err, instance, type);
		}
	}
	function callWithAsyncErrorHandling(fn, instance, type, args) {
		if (isFunction(fn)) {
			const res = callWithErrorHandling(fn, instance, type, args);
			if (res && isPromise(res)) res.catch((err) => {
				handleError(err, instance, type, void 0, true);
			});
			return res;
		}
		if (isArray(fn)) {
			const values = [];
			for (let i = 0; i < fn.length; i++) values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
			return values;
		}
	}
	function handleError(err, instance, type, throwInDev = true, isAsyncError = false) {
		const contextVNode = instance ? instance.vnode : null;
		const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
		if (instance) {
			let cur = instance.parent;
			const exposedInstance = instance.proxy;
			const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
			while (cur) {
				const errorCapturedHooks = cur.ec;
				if (errorCapturedHooks && !cur.isUnmounted && (!isAsyncError || cur.scope.active)) {
					for (let i = 0; i < errorCapturedHooks.length; i++) if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) return;
				}
				cur = cur.parent;
			}
			if (errorHandler) {
				pauseTracking();
				callWithErrorHandling(errorHandler, null, 10, [
					err,
					exposedInstance,
					errorInfo
				]);
				resetTracking();
				return;
			}
		}
		logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
	}
	function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
		if (throwInProd) throw err;
		else console.error(err);
	}
	var queue = [];
	var flushIndex = -1;
	var pendingPostFlushCbs = [];
	var activePostFlushCbs = null;
	var postFlushIndex = 0;
	var resolvedPromise = Promise.resolve();
	var currentFlushPromise = null;
	function nextTick(fn) {
		const p = currentFlushPromise || resolvedPromise;
		return fn ? p.then(this ? fn.bind(this) : fn) : p;
	}
	function findInsertionIndex(id) {
		let start = flushIndex + 1;
		let end = queue.length;
		while (start < end) {
			const middle = start + end >>> 1;
			const middleJob = queue[middle];
			const middleJobId = getId(middleJob);
			if (middleJobId < id || middleJobId === id && middleJob.flags & 2) start = middle + 1;
			else end = middle;
		}
		return start;
	}
	function queueJob(job) {
		if (!(job.flags & 1)) {
			const jobId = getId(job);
			const lastJob = queue[queue.length - 1];
			if (!lastJob || !(job.flags & 2) && jobId >= getId(lastJob)) queue.push(job);
			else queue.splice(findInsertionIndex(jobId), 0, job);
			job.flags |= 1;
			queueFlush();
		}
	}
	function queueFlush() {
		if (!currentFlushPromise) currentFlushPromise = resolvedPromise.then(flushJobs);
	}
	function queuePostFlushCb(cb) {
		if (!isArray(cb)) {
			if (activePostFlushCbs && cb.id === -1) activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
			else if (!(cb.flags & 1)) {
				pendingPostFlushCbs.push(cb);
				cb.flags |= 1;
			}
		} else for (let i = 0; i < cb.length; i++) pendingPostFlushCbs.push(cb[i]);
		queueFlush();
	}
	function flushPreFlushCbs(instance, minUid, seen, i = flushIndex + 1) {
		for (; i < queue.length; i++) {
			const cb = queue[i];
			if (cb && cb.flags & 2) {
				if (instance && cb.id !== instance.uid || minUid !== void 0 && !(cb.id >= minUid)) continue;
				queue.splice(i, 1);
				i = instance ? i - 1 : flushIndex;
				if (cb.flags & 4) cb.flags &= -2;
				cb();
				if (!(cb.flags & 4)) cb.flags &= -2;
			}
		}
	}
	function flushPostFlushCbs(seen, skip, minUid = 0) {
		if (pendingPostFlushCbs.length) {
			let cbs = pendingPostFlushCbs;
			let kept = 0;
			if (skip) {
				cbs = [];
				for (let i = 0; i < pendingPostFlushCbs.length; i++) {
					const cb = pendingPostFlushCbs[i];
					if (cb.i !== void 0 ? !cb.i || cb.i.uid < minUid : skip.has(cb)) pendingPostFlushCbs[kept++] = cb;
					else cbs.push(cb);
				}
			}
			const deduped = [...new Set(cbs)].sort((a, b) => getId(a) - getId(b));
			pendingPostFlushCbs.length = kept;
			if (activePostFlushCbs) {
				for (let i = 0; i < deduped.length; i++) activePostFlushCbs.push(deduped[i]);
				return;
			}
			activePostFlushCbs = deduped;
			for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
				const cb = activePostFlushCbs[postFlushIndex];
				if (cb.flags & 4) cb.flags &= -2;
				if (!(cb.flags & 8)) cb();
				cb.flags &= -2;
			}
			activePostFlushCbs = null;
			postFlushIndex = 0;
		}
	}
	var isFlushing = false;
	function flushOnAppMount(fn, minUid) {
		if (isFlushing) {
			fn();
			return;
		}
		const queued = minUid === void 0 ? void 0 : new Set(pendingPostFlushCbs);
		fn();
		isFlushing = true;
		try {
			flushPreFlushCbs(void 0, minUid);
			flushPostFlushCbs(void 0, queued, minUid);
		} finally {
			isFlushing = false;
		}
	}
	var getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
	function flushJobs(seen) {
		try {
			for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
				const job = queue[flushIndex];
				if (job && !(job.flags & 8)) {
					if (job.flags & 4) job.flags &= -2;
					callWithErrorHandling(job, job.i, job.i ? 15 : 14);
					if (!(job.flags & 4)) job.flags &= -2;
				}
			}
		} finally {
			for (; flushIndex < queue.length; flushIndex++) {
				const job = queue[flushIndex];
				if (job) job.flags &= -2;
			}
			flushIndex = -1;
			queue.length = 0;
			flushPostFlushCbs(seen);
			currentFlushPromise = null;
			if (queue.length || pendingPostFlushCbs.length) flushJobs(seen);
		}
	}
	var currentRenderingInstance = null;
	var currentScopeId = null;
	function setCurrentRenderingInstance(instance) {
		const prev = currentRenderingInstance;
		currentRenderingInstance = instance;
		currentScopeId = instance && instance.type.__scopeId || null;
		return prev;
	}
	function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
		if (!ctx) return fn;
		if (fn._n) return fn;
		const renderFnWithContext = (...args) => {
			if (renderFnWithContext._d) setBlockTracking(-1);
			const prevInstance = setCurrentRenderingInstance(ctx);
			const prevStackSize = blockStack.length;
			let res;
			try {
				res = fn(...args);
			} finally {
				for (let i = blockStack.length; i > prevStackSize; i--) closeBlock();
				setCurrentRenderingInstance(prevInstance);
				if (renderFnWithContext._d) setBlockTracking(1);
			}
			return res;
		};
		renderFnWithContext._n = true;
		renderFnWithContext._c = true;
		renderFnWithContext._d = true;
		return renderFnWithContext;
	}
	function withDirectives(vnode, directives) {
		if (currentRenderingInstance === null) return vnode;
		const instance = getComponentPublicInstance(currentRenderingInstance);
		const bindings = vnode.dirs || (vnode.dirs = []);
		for (let i = 0; i < directives.length; i++) {
			let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
			if (dir) {
				if (isFunction(dir)) dir = {
					mounted: dir,
					updated: dir
				};
				if (dir.deep) traverse(value);
				bindings.push({
					dir,
					instance,
					value,
					oldValue: void 0,
					arg,
					modifiers
				});
			}
		}
		return vnode;
	}
	function invokeDirectiveHook(vnode, prevVNode, instance, name) {
		let hookVNode = vnode;
		if (name === "beforeMount") vnode._mount = vnode;
		else if (name === "beforeUpdate") {
			const mount = prevVNode && prevVNode._mount;
			if (mount) {
				mount._latest = vnode;
				vnode._mount = mount;
			}
		} else if (name === "mounted") {
			const latest = vnode._latest;
			vnode._mount = vnode._latest = void 0;
			if (latest) {
				hookVNode = latest;
				latest._mount = void 0;
			}
		}
		const bindings = hookVNode.dirs;
		const oldBindings = prevVNode && prevVNode.dirs;
		for (let i = 0; i < bindings.length; i++) {
			let binding = bindings[i];
			if (oldBindings) binding.oldValue = oldBindings[i].value;
			else if (name === "mounted" && binding.oldValue !== void 0) binding = extend({}, binding, { oldValue: void 0 });
			let hook = binding.dir[name];
			if (hook) {
				pauseTracking();
				callWithAsyncErrorHandling(hook, instance, 8, [
					vnode.el,
					binding,
					hookVNode,
					prevVNode
				]);
				resetTracking();
			}
		}
	}
	function provide(key, value) {
		if (currentInstance) {
			let provides = currentInstance.provides;
			const parentProvides = currentInstance.parent && currentInstance.parent.provides;
			if (parentProvides === provides) provides = currentInstance.provides = Object.create(parentProvides);
			provides[key] = value;
		}
	}
	function inject(key, defaultValue, treatDefaultAsFactory = false) {
		const instance = getCurrentInstance();
		if (instance || currentApp) {
			let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
			if (provides && key in provides) return provides[key];
			else if (arguments.length > 1) return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
		}
	}
	var ssrContextKey = Symbol.for("v-scx");
	var useSSRContext = () => {
		{
			const ctx = inject(ssrContextKey);
			if (!ctx) {}
			return ctx;
		}
	};
	function watch(source, cb, options) {
		return doWatch(source, cb, options);
	}
	function doWatch(source, cb, options = EMPTY_OBJ) {
		const { immediate, deep, flush, once } = options;
		const baseWatchOptions = extend({}, options);
		const runsImmediately = cb && immediate || !cb && flush !== "post";
		let ssrCleanup;
		if (isInSSRComponentSetup) {
			if (flush === "sync") {
				const ctx = useSSRContext();
				ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
			} else if (!runsImmediately) {
				const watchStopHandle = () => {};
				watchStopHandle.stop = NOOP;
				watchStopHandle.resume = NOOP;
				watchStopHandle.pause = NOOP;
				return watchStopHandle;
			}
		}
		const instance = currentInstance;
		baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
		let isPre = false;
		if (flush === "post") baseWatchOptions.scheduler = (job) => {
			job.i = instance;
			queuePostRenderEffect(job, instance && instance.suspense);
		};
		else if (flush !== "sync") {
			isPre = true;
			baseWatchOptions.scheduler = (job, isFirstRun) => {
				if (isFirstRun) job();
				else queueJob(job);
			};
		}
		baseWatchOptions.augmentJob = (job) => {
			if (cb) job.flags |= 4;
			if (isPre) {
				job.flags |= 2;
				if (instance) {
					job.id = instance.uid;
					job.i = instance;
				}
			}
		};
		const watchHandle = watch$1(source, cb, baseWatchOptions);
		if (isInSSRComponentSetup) {
			if (ssrCleanup) ssrCleanup.push(watchHandle);
			else if (runsImmediately) watchHandle();
		}
		return watchHandle;
	}
	function instanceWatch(source, value, options) {
		const publicThis = this.proxy;
		const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
		let cb;
		if (isFunction(value)) cb = value;
		else {
			cb = value.handler;
			options = value;
		}
		const reset = setCurrentInstance(this);
		const res = doWatch(getter, cb.bind(publicThis), options);
		reset();
		return res;
	}
	function createPathGetter(ctx, path) {
		const segments = path.split(".");
		return () => {
			let cur = ctx;
			for (let i = 0; i < segments.length && cur; i++) cur = cur[segments[i]];
			return cur;
		};
	}
	var pendingMounts = new WeakMap();
	var TeleportEndKey = Symbol("_vte");
	var isTeleport = (type) => type.__isTeleport;
	var isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
	var isTeleportDeferred = (props) => props && (props.defer || props.defer === "");
	var isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
	var isTargetMathML = (target) => typeof MathMLElement === "function" && target instanceof MathMLElement;
	var resolveTarget = (props, select) => {
		const targetSelector = props && props.to;
		if (isString(targetSelector)) {
			if (!select) return null;
			else return select(targetSelector);
		} else return targetSelector;
	};
	var TeleportImpl = {
		name: "Teleport",
		__isTeleport: true,
		process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
			const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment, parentNode } } = internals;
			const disabled = isTeleportDisabled(n2.props);
			let { dynamicChildren } = n2;
			const mount = (vnode, container2, anchor2) => {
				if (vnode.shapeFlag & 16) mountChildren(vnode.children, container2, anchor2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			};
			const mountToTarget = (vnode = n2) => {
				const disabled2 = isTeleportDisabled(vnode.props);
				const target = vnode.target = resolveTarget(vnode.props, querySelector);
				const targetAnchor = prepareAnchor(target, vnode, createText, insert);
				if (target) {
					if (namespace !== "svg" && isTargetSVG(target)) namespace = "svg";
					else if (namespace !== "mathml" && isTargetMathML(target)) namespace = "mathml";
					if (parentComponent && parentComponent.isCE) (parentComponent.ce._teleportTargets || (parentComponent.ce._teleportTargets = new Set())).add(target);
					if (!disabled2) {
						mount(vnode, target, targetAnchor);
						updateCssVars(vnode, false);
					}
				}
			};
			const queuePendingMount = (vnode) => {
				const mountJob = () => {
					if (pendingMounts.get(vnode) !== mountJob) return;
					pendingMounts.delete(vnode);
					if (isTeleportDisabled(vnode.props)) {
						const mountContainer = parentNode(vnode.el) || container;
						mount(vnode, mountContainer, vnode.anchor);
						updateCssVars(vnode, true);
					}
					mountToTarget(vnode);
				};
				pendingMounts.set(vnode, mountJob);
				queuePostRenderEffect(mountJob, parentSuspense);
			};
			if (n1 == null) {
				const placeholder = n2.el = createText("");
				const mainAnchor = n2.anchor = createText("");
				insert(placeholder, container, anchor);
				insert(mainAnchor, container, anchor);
				if (isTeleportDeferred(n2.props) || parentSuspense && parentSuspense.pendingBranch) {
					queuePendingMount(n2);
					return;
				}
				if (disabled) {
					mount(n2, container, mainAnchor);
					updateCssVars(n2, true);
				}
				mountToTarget();
			} else {
				n2.el = n1.el;
				const mainAnchor = n2.anchor = n1.anchor;
				const pendingMount = pendingMounts.get(n1);
				if (pendingMount) {
					pendingMount.flags |= 8;
					pendingMounts.delete(n1);
					queuePendingMount(n2);
					return;
				}
				n2.targetStart = n1.targetStart;
				const target = n2.target = n1.target;
				const targetAnchor = n2.targetAnchor = n1.targetAnchor;
				const wasDisabled = isTeleportDisabled(n1.props);
				const currentContainer = wasDisabled ? container : target;
				const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
				if (namespace === "svg" || isTargetSVG(target)) namespace = "svg";
				else if (namespace === "mathml" || isTargetMathML(target)) namespace = "mathml";
				if (dynamicChildren) {
					patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, namespace, slotScopeIds);
					traverseStaticChildren(n1, n2, true);
				} else if (!optimized) patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, false);
				if (disabled) {
					if (!wasDisabled) moveTeleport(n2, container, mainAnchor, internals, 1);
					else if (n2.props && n1.props && n2.props.to !== n1.props.to) n2.props.to = n1.props.to;
				} else if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
					const nextTarget = resolveTarget(n2.props, querySelector);
					if (nextTarget) {
						n2.target = nextTarget;
						moveTeleport(n2, nextTarget, null, internals, 0);
					}
				} else if (wasDisabled) moveTeleport(n2, target, targetAnchor, internals, 1);
				updateCssVars(n2, disabled);
			}
		},
		remove(vnode, parentComponent, parentSuspense, { um: unmount, o: { remove: hostRemove } }, doRemove) {
			const { shapeFlag, children, anchor, targetStart, targetAnchor, target, props } = vnode;
			const disabled = isTeleportDisabled(props);
			const shouldRemove = doRemove || !disabled;
			const pendingMount = pendingMounts.get(vnode);
			if (pendingMount) {
				pendingMount.flags |= 8;
				pendingMounts.delete(vnode);
			}
			if (target) {
				hostRemove(targetStart);
				hostRemove(targetAnchor);
			}
			doRemove && hostRemove(anchor);
			if (!pendingMount && (disabled || target) && shapeFlag & 16) for (let i = 0; i < children.length; i++) {
				const child = children[i];
				unmount(child, parentComponent, parentSuspense, shouldRemove, !!child.dynamicChildren);
			}
		},
		move: moveTeleport,
		hydrate: hydrateTeleport
	};
	function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
		if (moveType === 0) {
			if (vnode.targetStart) insert(vnode.targetStart, container, parentAnchor);
			insert(vnode.targetAnchor, container, parentAnchor);
			parentAnchor = vnode.targetAnchor;
		}
		const { el, anchor, shapeFlag, children, props } = vnode;
		const isReorder = moveType === 2;
		if (isReorder) insert(el, container, parentAnchor);
		if (!pendingMounts.has(vnode) && (!isReorder || isTeleportDisabled(props))) {
			if (shapeFlag & 16) for (let i = 0; i < children.length; i++) move(children[i], container, parentAnchor, 2);
		}
		if (isReorder) insert(anchor, container, parentAnchor);
	}
	function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, { o: { nextSibling, parentNode, querySelector, insert, createText } }, hydrateChildren) {
		function hydrateAnchor(target2, targetNode) {
			let targetAnchor = targetNode;
			while (targetAnchor) {
				if (targetAnchor && targetAnchor.nodeType === 8) {
					if (targetAnchor.data === "teleport start anchor") vnode.targetStart = targetAnchor;
					else if (targetAnchor.data === "teleport anchor") {
						vnode.targetAnchor = targetAnchor;
						target2._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
						break;
					}
				}
				targetAnchor = nextSibling(targetAnchor);
			}
		}
		function hydrateDisabledTeleport(node2, vnode2) {
			vnode2.anchor = hydrateChildren(nextSibling(node2), vnode2, parentNode(node2), parentComponent, parentSuspense, slotScopeIds, optimized);
		}
		const target = vnode.target = resolveTarget(vnode.props, querySelector);
		const disabled = isTeleportDisabled(vnode.props);
		if (target) {
			const targetNode = target._lpa || target.firstChild;
			if (vnode.shapeFlag & 16) {
				if (disabled) {
					hydrateDisabledTeleport(node, vnode);
					hydrateAnchor(target, targetNode);
					if (!vnode.targetAnchor) prepareAnchor(target, vnode, createText, insert, parentNode(node) === target ? node : null);
				} else {
					vnode.anchor = nextSibling(node);
					hydrateAnchor(target, targetNode);
					if (!vnode.targetAnchor) prepareAnchor(target, vnode, createText, insert);
					hydrateChildren(targetNode && nextSibling(targetNode), vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
				}
			}
			updateCssVars(vnode, disabled);
		} else if (disabled) {
			if (vnode.shapeFlag & 16) {
				hydrateDisabledTeleport(node, vnode);
				vnode.targetStart = node;
				vnode.targetAnchor = nextSibling(node);
			}
		}
		return vnode.anchor && nextSibling(vnode.anchor);
	}
	var Teleport = TeleportImpl;
	function updateCssVars(vnode, isDisabled) {
		const ctx = vnode.ctx;
		if (ctx && ctx.ut) {
			let node, anchor;
			if (isDisabled) {
				node = vnode.el;
				anchor = vnode.anchor;
			} else {
				node = vnode.targetStart;
				anchor = vnode.targetAnchor;
			}
			while (node && node !== anchor) {
				if (node.nodeType === 1) node.setAttribute("data-v-owner", ctx.uid);
				node = node.nextSibling;
			}
			ctx.ut();
		}
	}
	function prepareAnchor(target, vnode, createText, insert, anchor = null) {
		const targetStart = vnode.targetStart = createText("");
		const targetAnchor = vnode.targetAnchor = createText("");
		targetStart[TeleportEndKey] = targetAnchor;
		if (target) {
			insert(targetStart, target, anchor);
			insert(targetAnchor, target, anchor);
		}
		return targetAnchor;
	}
	var leaveCbKey = Symbol("_leaveCb");
	var enterCbKey$1 = Symbol("_enterCb");
	function useTransitionState() {
		const state = {
			isMounted: false,
			isLeaving: false,
			isUnmounting: false,
			leavingVNodes: new Map()
		};
		onMounted(() => {
			state.isMounted = true;
		});
		onBeforeUnmount(() => {
			state.isUnmounting = true;
		});
		return state;
	}
	var TransitionHookValidator = [Function, Array];
	var BaseTransitionPropsValidators = {
		mode: String,
		appear: Boolean,
		persisted: Boolean,
		onBeforeEnter: TransitionHookValidator,
		onEnter: TransitionHookValidator,
		onAfterEnter: TransitionHookValidator,
		onEnterCancelled: TransitionHookValidator,
		onBeforeLeave: TransitionHookValidator,
		onLeave: TransitionHookValidator,
		onAfterLeave: TransitionHookValidator,
		onLeaveCancelled: TransitionHookValidator,
		onBeforeAppear: TransitionHookValidator,
		onAppear: TransitionHookValidator,
		onAfterAppear: TransitionHookValidator,
		onAppearCancelled: TransitionHookValidator
	};
	function findNonCommentChild(children) {
		let child = children[0];
		if (children.length > 1) {
			for (const c of children) if (c.type !== Comment) {
				child = c;
				break;
			}
		}
		return child;
	}
	function getLeavingNodesForType(state, vnode) {
		const { leavingVNodes } = state;
		let leavingVNodesCache = leavingVNodes.get(vnode.type);
		if (!leavingVNodesCache) {
			leavingVNodesCache = Object.create(null);
			leavingVNodes.set(vnode.type, leavingVNodesCache);
		}
		return leavingVNodesCache;
	}
	function resolveTransitionHooks(vnode, props, state, instance) {
		const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
		const key = String(vnode.key);
		const leavingVNodesCache = getLeavingNodesForType(state, vnode);
		const callHook = (hook, args) => {
			hook && callWithAsyncErrorHandling(hook, instance, 9, args);
		};
		const callAsyncHook = (hook, args) => {
			const done = args[1];
			callHook(hook, args);
			if (isArray(hook)) {
				if (hook.every((hook2) => hook2.length <= 1)) done();
			} else if (hook.length <= 1) done();
		};
		const hooks = {
			mode,
			persisted,
			beforeEnter(el) {
				let hook = onBeforeEnter;
				if (!state.isMounted) {
					if (appear) hook = onBeforeAppear || onBeforeEnter;
					else return;
				}
				if (el[leaveCbKey]) el[leaveCbKey](true);
				const leavingVNode = leavingVNodesCache[key];
				if (leavingVNode && isSameVNodeType(vnode, leavingVNode)) {
					let leavingCb = leavingVNode.el[leaveCbKey];
					if (!leavingCb) {
						const leavingRoot = getTransitionRoot(leavingVNode);
						leavingCb = leavingRoot && leavingRoot.el[leaveCbKey];
					}
					if (leavingCb) leavingCb();
				}
				callHook(hook, [el]);
			},
			enter(el) {
				if (leavingVNodesCache[key] === vnode) return;
				let hook = onEnter;
				let afterHook = onAfterEnter;
				let cancelHook = onEnterCancelled;
				if (!state.isMounted) {
					if (appear) {
						hook = onAppear || onEnter;
						afterHook = onAfterAppear || onAfterEnter;
						cancelHook = onAppearCancelled || onEnterCancelled;
					} else return;
				}
				let called = false;
				el[enterCbKey$1] = (cancelled) => {
					if (called) return;
					called = true;
					if (cancelled) callHook(cancelHook, [el]);
					else callHook(afterHook, [el]);
					if (hooks.delayedLeave) hooks.delayedLeave();
					el[enterCbKey$1] = void 0;
				};
				const done = el[enterCbKey$1].bind(null, false);
				if (hook) callAsyncHook(hook, [el, done]);
				else done();
			},
			leave(el, remove) {
				const key2 = String(vnode.key);
				if (el[enterCbKey$1]) el[enterCbKey$1](true);
				if (state.isUnmounting) return remove();
				callHook(onBeforeLeave, [el]);
				let called = false;
				el[leaveCbKey] = (cancelled) => {
					if (called) return;
					called = true;
					remove();
					if (cancelled) callHook(onLeaveCancelled, [el]);
					else callHook(onAfterLeave, [el]);
					el[leaveCbKey] = void 0;
					if (leavingVNodesCache[key2] === vnode) delete leavingVNodesCache[key2];
				};
				const done = el[leaveCbKey].bind(null, false);
				leavingVNodesCache[key2] = vnode;
				if (onLeave) callAsyncHook(onLeave, [el, done]);
				else done();
			},
			clone(vnode2) {
				const cloned = resolveTransitionHooks(vnode2, props, state, instance);
				cloned.afterLeave = () => {
					if (hooks.afterLeave) hooks.afterLeave();
				};
				cloned.delayLeave = (el, earlyRemove, delayedLeave) => {
					if (hooks.delayLeave) hooks.delayLeave(el, earlyRemove, delayedLeave);
					else delayedLeave();
				};
				cloned.delayedLeave = () => {
					if (hooks.delayedLeave) hooks.delayedLeave();
				};
				return cloned;
			}
		};
		return hooks;
	}
	function getInnerChild$1(vnode) {
		if (!isKeepAlive(vnode)) {
			if (isTeleport(vnode.type) && vnode.children) return findNonCommentChild(vnode.children);
			return vnode;
		}
		if (vnode.component) return vnode.component.subTree;
		const { shapeFlag, children } = vnode;
		if (children) {
			if (shapeFlag & 16) return children[0];
			if (shapeFlag & 32 && isFunction(children.default)) return children.default();
		}
	}
	function setTransitionHooks(vnode, hooks) {
		if (vnode.shapeFlag & 6 && vnode.component) {
			vnode.transition = hooks;
			const subTree = vnode.component.subTree;
			setTransitionHooks(isTeleport(subTree.type) ? getInnerChild$1(subTree) || subTree : subTree, hooks);
		} else if (vnode.shapeFlag & 128) {
			const suspense = vnode.suspense;
			if (suspense) {
				const branch = suspense.isHydrating ? suspense.pendingBranch : suspense.activeBranch;
				if (branch) setTransitionHooks(branch, hooks.clone(branch));
			} else {
				vnode.ssContent.transition = hooks.clone(vnode.ssContent);
				vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
			}
		} else {
			vnode.transition = hooks;
			if (vnode.type === Fragment && isArray(vnode.children)) {
				const child = filterSingleRoot(vnode.children, false);
				if (child) setTransitionHooks(child, hooks);
			}
		}
	}
	function getTransitionRawChildren(children, keepComment = false, parentKey) {
		let ret = [];
		let keyedFragmentCount = 0;
		for (let i = 0; i < children.length; i++) {
			let child = children[i];
			const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
			if (child.type === Fragment) {
				if (child.patchFlag & 128) keyedFragmentCount++;
				ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
			} else if (keepComment || child.type !== Comment) ret.push(key != null ? cloneVNode(child, { key }) : child);
		}
		if (keyedFragmentCount > 1) for (let i = 0; i < ret.length; i++) ret[i].patchFlag = -2;
		return ret;
	}
	function getTransitionRoot(vnode) {
		if (vnode.component) return getTransitionRoot(vnode.component.subTree);
		if (vnode.type === Fragment) {
			const child = isArray(vnode.children) && filterSingleRoot(vnode.children, false);
			return child ? getTransitionRoot(child) : void 0;
		}
		if (vnode.type !== Comment) return vnode;
	}
	function defineComponent(options, extraOptions) {
		return isFunction(options) ? (() => extend({ name: options.name }, extraOptions, { setup: options }))() : options;
	}
	function markAsyncBoundary(instance) {
		instance.ids = [
			instance.ids[0] + instance.ids[2]++ + "-",
			0,
			0
		];
	}
	function isTemplateRefKey(refs, key) {
		let desc;
		return !!((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable);
	}
	var pendingSetRefMap = new WeakMap();
	function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
		if (isArray(rawRef)) {
			rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
			return;
		}
		if (isAsyncWrapper(vnode) && !isUnmount) {
			if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
			return;
		}
		const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
		const value = isUnmount ? null : refValue;
		const { i: owner, r: ref } = rawRef;
		const oldRef = oldRawRef && oldRawRef.r;
		const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
		const setupState = owner.setupState;
		const rawSetupState = toRaw(setupState);
		const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key) => {
			if (isTemplateRefKey(refs, key)) return false;
			return hasOwn(rawSetupState, key);
		};
		const canSetRef = (ref2, key) => {
			if (key && isTemplateRefKey(refs, key)) return false;
			return true;
		};
		if (oldRef != null && oldRef !== ref) {
			invalidatePendingSetRef(oldRawRef);
			if (isString(oldRef)) {
				refs[oldRef] = null;
				if (canSetSetupRef(oldRef)) setupState[oldRef] = null;
			} else if (isRef(oldRef)) {
				const oldRawRefAtom = oldRawRef;
				if (canSetRef(oldRef, oldRawRefAtom.k)) oldRef.value = null;
				if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
			}
		}
		if (isFunction(ref)) callWithErrorHandling(ref, owner, 12, [value, refs]);
		else {
			const _isString = isString(ref);
			const _isRef = isRef(ref);
			if (_isString || _isRef) {
				const doSet = () => {
					if (rawRef.f) {
						const existing = _isString ? canSetSetupRef(ref) ? setupState[ref] : refs[ref] : canSetRef(ref) || !rawRef.k ? ref.value : refs[rawRef.k];
						if (isUnmount) isArray(existing) && remove(existing, refValue);
						else if (!isArray(existing)) {
							if (_isString) {
								refs[ref] = [refValue];
								if (canSetSetupRef(ref)) setupState[ref] = refs[ref];
							} else {
								const newVal = [refValue];
								if (canSetRef(ref, rawRef.k)) ref.value = newVal;
								if (rawRef.k) refs[rawRef.k] = newVal;
							}
						} else if (!existing.includes(refValue)) existing.push(refValue);
					} else if (_isString) {
						refs[ref] = value;
						if (canSetSetupRef(ref)) setupState[ref] = value;
					} else if (_isRef) {
						if (canSetRef(ref, rawRef.k)) ref.value = value;
						if (rawRef.k) refs[rawRef.k] = value;
					}
				};
				if (value) {
					const job = () => {
						doSet();
						pendingSetRefMap.delete(rawRef);
					};
					job.id = -1;
					pendingSetRefMap.set(rawRef, job);
					queuePostRenderEffect(job, parentSuspense);
				} else {
					invalidatePendingSetRef(rawRef);
					doSet();
				}
			}
		}
	}
	function invalidatePendingSetRef(rawRef) {
		const pendingSetRef = pendingSetRefMap.get(rawRef);
		if (pendingSetRef) {
			pendingSetRef.flags |= 8;
			pendingSetRefMap.delete(rawRef);
		}
	}
	getGlobalThis().requestIdleCallback;
	getGlobalThis().cancelIdleCallback;
	var isAsyncWrapper = (i) => !!i.type.__asyncLoader;
	var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
	function onActivated(hook, target) {
		registerKeepAliveHook(hook, "a", target);
	}
	function onDeactivated(hook, target) {
		registerKeepAliveHook(hook, "da", target);
	}
	function registerKeepAliveHook(hook, type, target = currentInstance) {
		const wrappedHook = hook.__wdc || (hook.__wdc = () => {
			let current = target;
			while (current) {
				if (current.isDeactivated) return;
				current = current.parent;
			}
			return hook();
		});
		injectHook(type, wrappedHook, target);
		if (target) {
			let current = target.parent;
			while (current && current.parent) {
				if (isKeepAlive(current.parent.vnode)) injectToKeepAliveRoot(wrappedHook, type, target, current);
				current = current.parent;
			}
		}
	}
	function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
		const injected = injectHook(type, hook, keepAliveRoot, true);
		const removal = injectHook("um", () => remove(keepAliveRoot[type], injected), target);
		removal.flags = 16;
	}
	function injectHook(type, hook, target = currentInstance, prepend = false) {
		if (target) {
			const hooks = target[type] || (target[type] = []);
			const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
				pauseTracking();
				const reset = setCurrentInstance(target);
				const res = callWithAsyncErrorHandling(hook, target, type, args);
				reset();
				resetTracking();
				return res;
			});
			if (prepend) hooks.unshift(wrappedHook);
			else hooks.push(wrappedHook);
			return wrappedHook;
		}
	}
	var createHook = (lifecycle) => (hook, target = currentInstance) => {
		if (!isInSSRComponentSetup || lifecycle === "sp") injectHook(lifecycle, (...args) => hook(...args), target);
	};
	var onBeforeMount = createHook("bm");
	var onMounted = createHook("m");
	var onBeforeUpdate = createHook("bu");
	var onUpdated = createHook("u");
	var onBeforeUnmount = createHook("bum");
	var onUnmounted = createHook("um");
	var onServerPrefetch = createHook("sp");
	var onRenderTriggered = createHook("rtg");
	var onRenderTracked = createHook("rtc");
	function onErrorCaptured(hook, target = currentInstance) {
		injectHook("ec", hook, target);
	}
	var COMPONENTS = "components";
	var NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
	function resolveDynamicComponent(component) {
		if (isString(component)) return resolveAsset(COMPONENTS, component, false) || component;
		else return component || NULL_DYNAMIC_COMPONENT;
	}
	function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
		const instance = currentRenderingInstance || currentInstance;
		if (instance) {
			const Component = instance.type;
			if (type === COMPONENTS) {
				const selfName = getComponentName(Component, false);
				if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) return Component;
			}
			const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
			if (!res && maybeSelfReference) return Component;
			return res;
		}
	}
	function resolve(registry, name) {
		return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
	}
	function renderList(source, renderItem, cache, index) {
		let ret;
		const cached = cache && cache[index];
		const sourceIsArray = isArray(source);
		if (sourceIsArray || isString(source)) {
			const sourceIsReactiveArray = sourceIsArray && isReactive(source);
			let needsWrap = false;
			let isReadonlySource = false;
			if (sourceIsReactiveArray) {
				needsWrap = !isShallow(source);
				isReadonlySource = isReadonly(source);
				source = shallowReadArray(source);
			}
			ret = new Array(source.length);
			for (let i = 0, l = source.length; i < l; i++) ret[i] = renderItem(needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i], i, void 0, cached && cached[i]);
		} else if (typeof source === "number") {
			if (!Number.isInteger(source) || source < 0) ret = [];
			else {
				ret = new Array(source);
				for (let i = 0; i < source; i++) ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
			}
		} else if (isObject(source)) {
			if (source[Symbol.iterator]) ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
			else {
				const keys = Object.keys(source);
				ret = new Array(keys.length);
				for (let i = 0, l = keys.length; i < l; i++) {
					const key = keys[i];
					ret[i] = renderItem(source[key], key, i, cached && cached[i]);
				}
			}
		} else ret = [];
		if (cache) cache[index] = ret;
		return ret;
	}
	var getPublicInstance = (i) => {
		if (!i) return null;
		if (isStatefulComponent(i)) return getComponentPublicInstance(i);
		return getPublicInstance(i.parent);
	};
	var publicPropertiesMap = extend(Object.create(null), {
		$: (i) => i,
		$el: (i) => i.vnode.el,
		$data: (i) => i.data,
		$props: (i) => i.props,
		$attrs: (i) => i.attrs,
		$slots: (i) => i.slots,
		$refs: (i) => i.refs,
		$parent: (i) => getPublicInstance(i.parent),
		$root: (i) => getPublicInstance(i.root),
		$host: (i) => i.ce,
		$emit: (i) => i.emit,
		$options: (i) => resolveMergedOptions(i),
		$forceUpdate: (i) => i.f || (i.f = () => {
			queueJob(i.update);
		}),
		$nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
		$watch: (i) => instanceWatch.bind(i)
	});
	var hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
	var PublicInstanceProxyHandlers = {
		get({ _: instance }, key) {
			if (key === "__v_skip") return true;
			const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
			if (key[0] !== "$") {
				const n = accessCache[key];
				if (n !== void 0) switch (n) {
					case 1: return setupState[key];
					case 2: return data[key];
					case 4: return ctx[key];
					case 3: return props[key];
				}
				else if (hasSetupBinding(setupState, key)) {
					accessCache[key] = 1;
					return setupState[key];
				} else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
					accessCache[key] = 2;
					return data[key];
				} else if (hasOwn(props, key)) {
					accessCache[key] = 3;
					return props[key];
				} else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
					accessCache[key] = 4;
					return ctx[key];
				} else if (shouldCacheAccess) accessCache[key] = 0;
			}
			const publicGetter = publicPropertiesMap[key];
			let cssModule, globalProperties;
			if (publicGetter) {
				if (key === "$attrs") track(instance.attrs, "get", "");
				return publicGetter(instance);
			} else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) return cssModule;
			else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
				accessCache[key] = 4;
				return ctx[key];
			} else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) return globalProperties[key];
		},
		set({ _: instance }, key, value) {
			const { data, setupState, ctx } = instance;
			if (hasSetupBinding(setupState, key)) {
				setupState[key] = value;
				return true;
			} else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
				data[key] = value;
				return true;
			} else if (hasOwn(instance.props, key)) return false;
			if (key[0] === "$" && key.slice(1) in instance) return false;
			else ctx[key] = value;
			return true;
		},
		has({ _: { data, setupState, accessCache, ctx, appContext, props, type } }, key) {
			let cssModules;
			return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
		},
		defineProperty(target, key, descriptor) {
			if (descriptor.get != null) target._.accessCache[key] = 0;
			else if (hasOwn(descriptor, "value")) this.set(target, key, descriptor.value, null);
			return Reflect.defineProperty(target, key, descriptor);
		}
	};
	function normalizePropsOrEmits(props) {
		return isArray(props) ? props.reduce((normalized, p) => (normalized[p] = null, normalized), {}) : props;
	}
	var shouldCacheAccess = true;
	function applyOptions(instance) {
		const options = resolveMergedOptions(instance);
		const publicThis = instance.proxy;
		const ctx = instance.ctx;
		shouldCacheAccess = false;
		if (options.beforeCreate) callHook$1(options.beforeCreate, instance, "bc");
		const { data: dataOptions, computed: computedOptions, methods, watch: watchOptions, provide: provideOptions, inject: injectOptions, created, beforeMount, mounted, beforeUpdate, updated, activated, deactivated, beforeDestroy, beforeUnmount, destroyed, unmounted, render, renderTracked, renderTriggered, errorCaptured, serverPrefetch, expose, inheritAttrs, components, directives, filters } = options;
		const checkDuplicateProperties = null;
		if (injectOptions) resolveInjections(injectOptions, ctx, checkDuplicateProperties);
		if (methods) for (const key in methods) {
			const methodHandler = methods[key];
			if (isFunction(methodHandler)) ctx[key] = methodHandler.bind(publicThis);
		}
		if (dataOptions) {
			const data = dataOptions.call(publicThis, publicThis);
			if (!isObject(data)) {} else instance.data = reactive(data);
		}
		shouldCacheAccess = true;
		if (computedOptions) for (const key in computedOptions) {
			const opt = computedOptions[key];
			const c = computed({
				get: isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP,
				set: !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP
			});
			Object.defineProperty(ctx, key, {
				enumerable: true,
				configurable: true,
				get: () => c.value,
				set: (v) => c.value = v
			});
		}
		if (watchOptions) for (const key in watchOptions) createWatcher(watchOptions[key], ctx, publicThis, key);
		if (provideOptions) {
			const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
			Reflect.ownKeys(provides).forEach((key) => {
				provide(key, provides[key]);
			});
		}
		if (created) callHook$1(created, instance, "c");
		function registerLifecycleHook(register, hook) {
			if (isArray(hook)) hook.forEach((_hook) => register(_hook.bind(publicThis)));
			else if (hook) register(hook.bind(publicThis));
		}
		registerLifecycleHook(onBeforeMount, beforeMount);
		registerLifecycleHook(onMounted, mounted);
		registerLifecycleHook(onBeforeUpdate, beforeUpdate);
		registerLifecycleHook(onUpdated, updated);
		registerLifecycleHook(onActivated, activated);
		registerLifecycleHook(onDeactivated, deactivated);
		registerLifecycleHook(onErrorCaptured, errorCaptured);
		registerLifecycleHook(onRenderTracked, renderTracked);
		registerLifecycleHook(onRenderTriggered, renderTriggered);
		registerLifecycleHook(onBeforeUnmount, beforeUnmount);
		registerLifecycleHook(onUnmounted, unmounted);
		registerLifecycleHook(onServerPrefetch, serverPrefetch);
		if (isArray(expose)) {
			if (expose.length) {
				const exposed = instance.exposed || (instance.exposed = {});
				expose.forEach((key) => {
					Object.defineProperty(exposed, key, {
						get: () => publicThis[key],
						set: (val) => publicThis[key] = val,
						enumerable: true
					});
				});
			} else if (!instance.exposed) instance.exposed = {};
		}
		if (render && instance.render === NOOP) instance.render = render;
		if (inheritAttrs != null) instance.inheritAttrs = inheritAttrs;
		if (components) instance.components = components;
		if (directives) instance.directives = directives;
		if (serverPrefetch) markAsyncBoundary(instance);
	}
	function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
		if (isArray(injectOptions)) injectOptions = normalizeInject(injectOptions);
		for (const key in injectOptions) {
			const opt = injectOptions[key];
			let injected;
			if (isObject(opt)) {
				if ("default" in opt) injected = inject(opt.from || key, opt.default, true);
				else injected = inject(opt.from || key);
			} else injected = inject(opt);
			if (isRef(injected)) Object.defineProperty(ctx, key, {
				enumerable: true,
				configurable: true,
				get: () => injected.value,
				set: (v) => injected.value = v
			});
			else ctx[key] = injected;
		}
	}
	function callHook$1(hook, instance, type) {
		callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
	}
	function createWatcher(raw, ctx, publicThis, key) {
		let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
		if (isString(raw)) {
			const handler = ctx[raw];
			if (isFunction(handler)) watch(getter, handler);
		} else if (isFunction(raw)) watch(getter, raw.bind(publicThis));
		else if (isObject(raw)) {
			if (isArray(raw)) raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
			else {
				const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
				if (isFunction(handler)) watch(getter, handler, raw);
			}
		}
	}
	function resolveMergedOptions(instance) {
		const base = instance.type;
		const { mixins, extends: extendsOptions } = base;
		const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
		const cached = cache.get(base);
		let resolved;
		if (cached) resolved = cached;
		else if (!globalMixins.length && !mixins && !extendsOptions) resolved = base;
		else {
			resolved = {};
			if (globalMixins.length) globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
			mergeOptions(resolved, base, optionMergeStrategies);
		}
		if (isObject(base)) cache.set(base, resolved);
		return resolved;
	}
	function mergeOptions(to, from, strats, asMixin = false) {
		const { mixins, extends: extendsOptions } = from;
		if (extendsOptions) mergeOptions(to, extendsOptions, strats, true);
		if (mixins) mixins.forEach((m) => mergeOptions(to, m, strats, true));
		for (const key in from) if (asMixin && key === "expose") {} else {
			const strat = internalOptionMergeStrats[key] || strats && strats[key];
			to[key] = strat ? strat(to[key], from[key]) : from[key];
		}
		return to;
	}
	var internalOptionMergeStrats = {
		data: mergeDataFn,
		props: mergeEmitsOrPropsOptions,
		emits: mergeEmitsOrPropsOptions,
		methods: mergeObjectOptions,
		computed: mergeObjectOptions,
		beforeCreate: mergeAsArray,
		created: mergeAsArray,
		beforeMount: mergeAsArray,
		mounted: mergeAsArray,
		beforeUpdate: mergeAsArray,
		updated: mergeAsArray,
		beforeDestroy: mergeAsArray,
		beforeUnmount: mergeAsArray,
		destroyed: mergeAsArray,
		unmounted: mergeAsArray,
		activated: mergeAsArray,
		deactivated: mergeAsArray,
		errorCaptured: mergeAsArray,
		serverPrefetch: mergeAsArray,
		components: mergeObjectOptions,
		directives: mergeObjectOptions,
		watch: mergeWatchOptions,
		provide: mergeDataFn,
		inject: mergeInject
	};
	function mergeDataFn(to, from) {
		if (!from) return to;
		if (!to) return from;
		return function mergedDataFn() {
			return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
		};
	}
	function mergeInject(to, from) {
		return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
	}
	function normalizeInject(raw) {
		if (isArray(raw)) {
			const res = {};
			for (let i = 0; i < raw.length; i++) res[raw[i]] = raw[i];
			return res;
		}
		return raw;
	}
	function mergeAsArray(to, from) {
		return to ? [...new Set([].concat(to, from))] : from;
	}
	function mergeObjectOptions(to, from) {
		return to ? extend(Object.create(null), to, from) : from;
	}
	function mergeEmitsOrPropsOptions(to, from) {
		if (to) {
			if (isArray(to) && isArray(from)) return [...new Set([...to, ...from])];
			return extend(Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from != null ? from : {}));
		} else return from;
	}
	function mergeWatchOptions(to, from) {
		if (!to) return from;
		if (!from) return to;
		const merged = extend(Object.create(null), to);
		for (const key in from) merged[key] = mergeAsArray(to[key], from[key]);
		return merged;
	}
	function createAppContext() {
		return {
			app: null,
			config: {
				isNativeTag: NO,
				performance: false,
				globalProperties: {},
				optionMergeStrategies: {},
				errorHandler: void 0,
				warnHandler: void 0,
				compilerOptions: {}
			},
			mixins: [],
			components: {},
			directives: {},
			provides: Object.create(null),
			optionsCache: new WeakMap(),
			propsCache: new WeakMap(),
			emitsCache: new WeakMap()
		};
	}
	var uid$1 = 0;
	function createAppAPI(render, hydrate) {
		return function createApp(rootComponent, rootProps = null) {
			if (!isFunction(rootComponent)) rootComponent = extend({}, rootComponent);
			if (rootProps != null && !isObject(rootProps)) rootProps = null;
			const context = createAppContext();
			const installedPlugins = new WeakSet();
			const pluginCleanupFns = [];
			let isMounted = false;
			const app = context.app = {
				_uid: uid$1++,
				_component: rootComponent,
				_props: rootProps,
				_container: null,
				_context: context,
				_instance: null,
				version,
				get config() {
					return context.config;
				},
				set config(v) {},
				use(plugin, ...options) {
					if (installedPlugins.has(plugin)) {} else if (plugin && isFunction(plugin.install)) {
						installedPlugins.add(plugin);
						plugin.install(app, ...options);
					} else if (isFunction(plugin)) {
						installedPlugins.add(plugin);
						plugin(app, ...options);
					}
					return app;
				},
				mixin(mixin) {
					if (!context.mixins.includes(mixin)) context.mixins.push(mixin);
					return app;
				},
				component(name, component) {
					if (!component) return context.components[name];
					context.components[name] = component;
					return app;
				},
				directive(name, directive) {
					if (!directive) return context.directives[name];
					context.directives[name] = directive;
					return app;
				},
				mount(rootContainer, isHydrate, namespace) {
					if (!isMounted) {
						const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
						vnode.appContext = context;
						if (namespace === true) namespace = "svg";
						else if (namespace === false) namespace = void 0;
						if (isHydrate && hydrate) hydrate(vnode, rootContainer);
						else render(vnode, rootContainer, namespace);
						isMounted = true;
						app._container = rootContainer;
						rootContainer.__vue_app__ = app;
						return getComponentPublicInstance(vnode.component);
					}
				},
				onUnmount(cleanupFn) {
					pluginCleanupFns.push(cleanupFn);
				},
				unmount() {
					if (isMounted) {
						callWithAsyncErrorHandling(pluginCleanupFns, app._instance, 16);
						render(null, app._container);
						delete app._container.__vue_app__;
					}
				},
				provide(key, value) {
					context.provides[key] = value;
					return app;
				},
				runWithContext(fn) {
					const lastApp = currentApp;
					currentApp = app;
					try {
						return fn();
					} finally {
						currentApp = lastApp;
					}
				}
			};
			return app;
		};
	}
	var currentApp = null;
	var getModelModifiers = (props, modelName) => {
		return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
	};
	function emit(instance, event, ...rawArgs) {
		if (instance.isUnmounted) return;
		const props = instance.vnode.props || EMPTY_OBJ;
		let args = rawArgs;
		const isModelListener = event.startsWith("update:");
		const modifiers = isModelListener && getModelModifiers(props, event.slice(7));
		if (modifiers) {
			if (modifiers.trim) args = rawArgs.map((a) => isString(a) ? a.trim() : a);
			if (modifiers.number) args = args.map(looseToNumber);
		}
		let handlerName;
		let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
		if (!handler && isModelListener) handler = props[handlerName = toHandlerKey(hyphenate(event))];
		if (handler) callWithAsyncErrorHandling(handler, instance, 6, args);
		const onceHandler = props[handlerName + `Once`];
		if (onceHandler) {
			if (!instance.emitted) instance.emitted = {};
			else if (instance.emitted[handlerName]) return;
			instance.emitted[handlerName] = true;
			callWithAsyncErrorHandling(onceHandler, instance, 6, args);
		}
	}
	var mixinEmitsCache = new WeakMap();
	function normalizeEmitsOptions(comp, appContext, asMixin = false) {
		const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
		const cached = cache.get(comp);
		if (cached !== void 0) return cached;
		const raw = comp.emits;
		let normalized = {};
		let hasExtends = false;
		if (!isFunction(comp)) {
			const extendEmits = (raw2) => {
				const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
				if (normalizedFromExtend) {
					hasExtends = true;
					extend(normalized, normalizedFromExtend);
				}
			};
			if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendEmits);
			if (comp.extends) extendEmits(comp.extends);
			if (comp.mixins) comp.mixins.forEach(extendEmits);
		}
		if (!raw && !hasExtends) {
			if (isObject(comp)) cache.set(comp, null);
			return null;
		}
		if (isArray(raw)) raw.forEach((key) => normalized[key] = null);
		else extend(normalized, raw);
		if (isObject(comp)) cache.set(comp, normalized);
		return normalized;
	}
	function isEmitListener(options, key) {
		if (!options || !isOn(key)) return false;
		key = key.slice(2);
		key = key === "Once" ? key : key.replace(/Once$/, "");
		return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
	}
	function renderComponentRoot(instance) {
		const { type: Component, vnode, proxy, withProxy, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, props, data, setupState, ctx, inheritAttrs } = instance;
		const prev = setCurrentRenderingInstance(instance);
		let result;
		let fallthroughAttrs;
		try {
			if (vnode.shapeFlag & 4) {
				const proxyToUse = withProxy || proxy;
				const thisProxy = proxyToUse;
				result = normalizeVNode(render.call(thisProxy, proxyToUse, renderCache, props, setupState, data, ctx));
				fallthroughAttrs = attrs;
			} else {
				const render2 = Component;
				result = normalizeVNode(render2.length > 1 ? render2(props, {
					attrs,
					slots,
					emit
				}) : render2(props, null));
				fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
			}
		} catch (err) {
			blockStack.length = 0;
			handleError(err, instance, 1);
			result = createVNode(Comment);
		}
		let root = result;
		if (fallthroughAttrs && inheritAttrs !== false) {
			const keys = Object.keys(fallthroughAttrs);
			const { shapeFlag } = root;
			if (keys.length) {
				if (shapeFlag & 7) {
					if (propsOptions && keys.some(isModelListener)) fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
					root = cloneVNode(root, fallthroughAttrs, false, true);
				}
			}
		}
		if (vnode.dirs) {
			root = cloneVNode(root, null, false, true);
			root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
		}
		if (vnode.transition) setTransitionHooks(isTeleport(root.type) ? getInnerChild$1(root) || root : root, vnode.transition);
		result = root;
		setCurrentRenderingInstance(prev);
		return result;
	}
	function filterSingleRoot(children, recurse = true) {
		let singleRoot;
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			if (isVNode(child)) {
				if (child.type !== Comment || child.children === "v-if") {
					if (singleRoot) return;
					else singleRoot = child;
				}
			} else return;
		}
		return singleRoot;
	}
	var getFunctionalFallthrough = (attrs) => {
		let res;
		for (const key in attrs) if (key === "class" || key === "style" || isOn(key)) (res || (res = {}))[key] = attrs[key];
		return res;
	};
	var filterModelListeners = (attrs, props) => {
		const res = {};
		for (const key in attrs) if (!isModelListener(key) || !(key.slice(9) in props)) res[key] = attrs[key];
		return res;
	};
	function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
		const { props: prevProps, children: prevChildren, component } = prevVNode;
		const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
		const emits = component.emitsOptions;
		if (nextVNode.dirs || nextVNode.transition) return true;
		if (optimized && patchFlag >= 0) {
			if (patchFlag & 1024) return true;
			if (patchFlag & 16) {
				if (!prevProps) return !!nextProps;
				return hasPropsChanged(prevProps, nextProps, emits);
			} else if (patchFlag & 8) {
				const dynamicProps = nextVNode.dynamicProps;
				for (let i = 0; i < dynamicProps.length; i++) {
					const key = dynamicProps[i];
					if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emits, key)) return true;
				}
			}
		} else {
			if (prevChildren || nextChildren) {
				if (!nextChildren || !nextChildren.$stable) return true;
			}
			if (prevProps === nextProps) return false;
			if (!prevProps) return !!nextProps;
			if (!nextProps) return true;
			return hasPropsChanged(prevProps, nextProps, emits);
		}
		return false;
	}
	function hasPropsChanged(prevProps, nextProps, emitsOptions) {
		const nextKeys = Object.keys(nextProps);
		if (nextKeys.length !== Object.keys(prevProps).length) return true;
		for (let i = 0; i < nextKeys.length; i++) {
			const key = nextKeys[i];
			if (!hasOwn(prevProps, key) || hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emitsOptions, key)) return true;
		}
		return false;
	}
	function hasPropValueChanged(nextProps, prevProps, key) {
		const nextProp = nextProps[key];
		const prevProp = prevProps[key];
		if (key === "style" && isObject(nextProp) && isObject(prevProp)) return !looseEqual(nextProp, prevProp);
		return nextProp !== prevProp;
	}
	function updateHOCHostEl({ vnode, parent, suspense }, el) {
		while (parent) {
			const root = parent.subTree;
			if (root.suspense && root.suspense.activeBranch === vnode) {
				root.suspense.vnode.el = root.el = el;
				vnode = root;
			}
			if (root === vnode) {
				(vnode = parent.vnode).el = el;
				parent = parent.parent;
			} else break;
		}
		if (suspense && suspense.activeBranch === vnode) suspense.vnode.el = el;
	}
	var internalObjectProto = {};
	var createInternalObject = () => Object.create(internalObjectProto);
	var isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
	function initProps(instance, rawProps, isStateful, isSSR = false) {
		const props = {};
		const attrs = createInternalObject();
		instance.propsDefaults = Object.create(null);
		setFullProps(instance, rawProps, props, attrs);
		for (const key in instance.propsOptions[0]) if (!(key in props)) props[key] = void 0;
		if (isStateful) instance.props = isSSR ? props : shallowReactive(props);
		else if (!instance.type.props) instance.props = attrs;
		else instance.props = props;
		instance.attrs = attrs;
	}
	function updateProps(instance, rawProps, rawPrevProps, optimized) {
		const { props, attrs, vnode: { patchFlag } } = instance;
		const rawCurrentProps = toRaw(props);
		const [options] = instance.propsOptions;
		let hasAttrsChanged = false;
		if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
			if (patchFlag & 8) {
				const propsToUpdate = instance.vnode.dynamicProps;
				for (let i = 0; i < propsToUpdate.length; i++) {
					let key = propsToUpdate[i];
					if (isEmitListener(instance.emitsOptions, key)) continue;
					const value = rawProps[key];
					if (options) {
						if (hasOwn(attrs, key)) {
							if (value !== attrs[key]) {
								attrs[key] = value;
								hasAttrsChanged = true;
							}
						} else {
							const camelizedKey = camelize(key);
							props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
						}
					} else if (value !== attrs[key]) {
						attrs[key] = value;
						hasAttrsChanged = true;
					}
				}
			}
		} else {
			if (setFullProps(instance, rawProps, props, attrs)) hasAttrsChanged = true;
			let kebabKey;
			for (const key in rawCurrentProps) if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
				if (options) {
					if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
				} else delete props[key];
			}
			if (attrs !== rawCurrentProps) {
				for (const key in attrs) if (!rawProps || !hasOwn(rawProps, key) && true) {
					delete attrs[key];
					hasAttrsChanged = true;
				}
			}
		}
		if (hasAttrsChanged) trigger(instance.attrs, "set", "");
	}
	function setFullProps(instance, rawProps, props, attrs) {
		const [options, needCastKeys] = instance.propsOptions;
		let hasAttrsChanged = false;
		let rawCastValues;
		if (rawProps) for (let key in rawProps) {
			if (isReservedProp(key)) continue;
			const value = rawProps[key];
			let camelKey;
			if (options && hasOwn(options, camelKey = camelize(key))) {
				if (!needCastKeys || !needCastKeys.includes(camelKey)) props[camelKey] = value;
				else (rawCastValues || (rawCastValues = {}))[camelKey] = value;
			} else if (!isEmitListener(instance.emitsOptions, key)) {
				if (!(key in attrs) || value !== attrs[key]) {
					attrs[key] = value;
					hasAttrsChanged = true;
				}
			}
		}
		if (needCastKeys) {
			const rawCurrentProps = toRaw(props);
			const castValues = rawCastValues || EMPTY_OBJ;
			for (let i = 0; i < needCastKeys.length; i++) {
				const key = needCastKeys[i];
				props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
			}
		}
		return hasAttrsChanged;
	}
	function resolvePropValue(options, props, key, value, instance, isAbsent) {
		const opt = options[key];
		if (opt != null) {
			const hasDefault = hasOwn(opt, "default");
			if (hasDefault && value === void 0) {
				const defaultValue = opt.default;
				if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
					const { propsDefaults } = instance;
					if (key in propsDefaults) value = propsDefaults[key];
					else {
						const reset = setCurrentInstance(instance);
						value = propsDefaults[key] = defaultValue.call(null, props);
						reset();
					}
				} else value = defaultValue;
				if (instance.ce) instance.ce._setProp(key, value);
			}
			if (opt[0]) {
				if (isAbsent && !hasDefault) value = false;
				else if (opt[1] && (value === "" || value === hyphenate(key))) value = true;
			}
		}
		return value;
	}
	var mixinPropsCache = new WeakMap();
	function normalizePropsOptions(comp, appContext, asMixin = false) {
		const cache = asMixin ? mixinPropsCache : appContext.propsCache;
		const cached = cache.get(comp);
		if (cached) return cached;
		const raw = comp.props;
		const normalized = {};
		const needCastKeys = [];
		let hasExtends = false;
		if (!isFunction(comp)) {
			const extendProps = (raw2) => {
				hasExtends = true;
				const [props, keys] = normalizePropsOptions(raw2, appContext, true);
				extend(normalized, props);
				if (keys) needCastKeys.push(...keys);
			};
			if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendProps);
			if (comp.extends) extendProps(comp.extends);
			if (comp.mixins) comp.mixins.forEach(extendProps);
		}
		if (!raw && !hasExtends) {
			if (isObject(comp)) cache.set(comp, EMPTY_ARR);
			return EMPTY_ARR;
		}
		if (isArray(raw)) for (let i = 0; i < raw.length; i++) {
			const normalizedKey = camelize(raw[i]);
			if (validatePropName(normalizedKey)) normalized[normalizedKey] = EMPTY_OBJ;
		}
		else if (raw) for (const key in raw) {
			const normalizedKey = camelize(key);
			if (validatePropName(normalizedKey)) {
				const opt = raw[key];
				const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
				const propType = prop.type;
				let shouldCast = false;
				let shouldCastTrue = true;
				if (isArray(propType)) for (let index = 0; index < propType.length; ++index) {
					const type = propType[index];
					const typeName = isFunction(type) && type.name;
					if (typeName === "Boolean") {
						shouldCast = true;
						break;
					} else if (typeName === "String") shouldCastTrue = false;
				}
				else shouldCast = isFunction(propType) && propType.name === "Boolean";
				prop[0] = shouldCast;
				prop[1] = shouldCastTrue;
				if (shouldCast || hasOwn(prop, "default")) needCastKeys.push(normalizedKey);
			}
		}
		const res = [normalized, needCastKeys];
		if (isObject(comp)) cache.set(comp, res);
		return res;
	}
	function validatePropName(key) {
		if (key[0] !== "$" && !isReservedProp(key)) return true;
		return false;
	}
	var isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
	var normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
	var normalizeSlot = (key, rawSlot, ctx) => {
		if (rawSlot._n) return rawSlot;
		const normalized = withCtx((...args) => {
			return normalizeSlotValue(rawSlot(...args));
		}, ctx);
		normalized._c = false;
		return normalized;
	};
	var normalizeObjectSlots = (rawSlots, slots, instance) => {
		const ctx = rawSlots._ctx;
		for (const key in rawSlots) {
			if (isInternalKey(key)) continue;
			const value = rawSlots[key];
			if (isFunction(value)) slots[key] = normalizeSlot(key, value, ctx);
			else if (value != null) {
				const normalized = normalizeSlotValue(value);
				slots[key] = () => normalized;
			}
		}
	};
	var normalizeVNodeSlots = (instance, children) => {
		const normalized = normalizeSlotValue(children);
		instance.slots.default = () => normalized;
	};
	var assignSlots = (slots, children, optimized) => {
		for (const key in children) if (optimized || !isInternalKey(key)) slots[key] = children[key];
	};
	var initSlots = (instance, children, optimized) => {
		const slots = instance.slots = createInternalObject();
		if (instance.vnode.shapeFlag & 32) {
			const type = children._;
			if (type) {
				assignSlots(slots, children, optimized);
				if (optimized) def(slots, "_", type, true);
			} else normalizeObjectSlots(children, slots);
		} else if (children) normalizeVNodeSlots(instance, children);
	};
	var updateSlots = (instance, children, optimized) => {
		const { vnode, slots } = instance;
		let needDeletionCheck = true;
		let deletionComparisonTarget = EMPTY_OBJ;
		if (vnode.shapeFlag & 32) {
			const type = children._;
			if (type) {
				if (optimized && type === 1) needDeletionCheck = false;
				else assignSlots(slots, children, optimized);
			} else {
				needDeletionCheck = !children.$stable;
				normalizeObjectSlots(children, slots);
			}
			deletionComparisonTarget = children;
		} else if (children) {
			normalizeVNodeSlots(instance, children);
			deletionComparisonTarget = { default: 1 };
		}
		if (needDeletionCheck) {
			for (const key in slots) if (!isInternalKey(key) && deletionComparisonTarget[key] == null) delete slots[key];
		}
	};
	var queuePostRenderEffect = queueEffectWithSuspense;
	function createRenderer(options) {
		return baseCreateRenderer(options);
	}
	function baseCreateRenderer(options, createHydrationFns) {
		const target = getGlobalThis();
		target.__VUE__ = true;
		const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
		const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
			if (n1 === n2) return;
			if (n1 && !isSameVNodeType(n1, n2)) {
				anchor = getNextHostNode(n1);
				unmount(n1, parentComponent, parentSuspense, true);
				n1 = null;
			}
			if (n2.patchFlag === -2) {
				optimized = false;
				n2.dynamicChildren = null;
			}
			if (n2.dynamicChildren && n1 && n1.dynamicChildren && n1.dynamicChildren.hasOnce) {
				if (n2.dynamicChildren === EMPTY_ARR) n2.dynamicChildren = [];
				n2.dynamicChildren.hasOnce = true;
			}
			const { type, ref, shapeFlag } = n2;
			switch (type) {
				case Text:
					processText(n1, n2, container, anchor);
					break;
				case Comment:
					processCommentNode(n1, n2, container, anchor);
					break;
				case Static:
					if (n1 == null) mountStaticNode(n2, container, anchor, namespace);
					break;
				case Fragment:
					processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					break;
				default: if (shapeFlag & 1) processElement(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else if (shapeFlag & 6) processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else if (shapeFlag & 64) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
				else if (shapeFlag & 128) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
			}
			if (ref != null && parentComponent) setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
			else if (ref == null && n1 && n1.ref != null) setRef(n1.ref, null, parentSuspense, n1, true);
		};
		const processText = (n1, n2, container, anchor) => {
			if (n1 == null) hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
			else {
				const el = n2.el = n1.el;
				if (n2.children !== n1.children) hostSetText(el, n2.children);
			}
		};
		const processCommentNode = (n1, n2, container, anchor) => {
			if (n1 == null) hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
			else n2.el = n1.el;
		};
		const mountStaticNode = (n2, container, anchor, namespace) => {
			[n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace, n2.el, n2.anchor);
		};
		const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
			let next;
			while (el && el !== anchor) {
				next = hostNextSibling(el);
				hostInsert(el, container, nextSibling);
				el = next;
			}
			hostInsert(anchor, container, nextSibling);
		};
		const removeStaticNode = ({ el, anchor }) => {
			let next;
			while (el && el !== anchor) {
				next = hostNextSibling(el);
				hostRemove(el);
				el = next;
			}
			hostRemove(anchor);
		};
		const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			if (n2.type === "svg") namespace = "svg";
			else if (n2.type === "math") namespace = "mathml";
			if (n1 == null) mountElement(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else {
				const customElement = n1.el && n1.el._isVueCE ? n1.el : null;
				try {
					if (customElement) customElement._beginPatch();
					patchElement(n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				} finally {
					if (customElement) customElement._endPatch();
				}
			}
		};
		const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			let el;
			let vnodeHook;
			const { props, shapeFlag, transition, dirs } = vnode;
			el = vnode.el = hostCreateElement(vnode.type, namespace, props && props.is, props);
			if (shapeFlag & 8) hostSetElementText(el, vnode.children);
			else if (shapeFlag & 16) mountChildren(vnode.children, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(vnode, namespace), slotScopeIds, optimized);
			if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "created");
			setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
			if (props) {
				for (const key in props) if (key !== "value" && !isReservedProp(key)) hostPatchProp(el, key, null, props[key], namespace, parentComponent);
				if ("value" in props) hostPatchProp(el, "value", null, props.value, namespace);
				if (vnodeHook = props.onVnodeBeforeMount) invokeVNodeHook(vnodeHook, parentComponent, vnode);
			}
			if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
			const needCallTransitionHooks = needTransition(parentSuspense, transition);
			if (needCallTransitionHooks) transition.beforeEnter(el);
			else if (transition && !transition.persisted) el[deferredEnterKey] = true;
			hostInsert(el, container, anchor);
			if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) queuePostRenderEffect(() => {
				try {
					vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
					needCallTransitionHooks && transition.enter(el);
					dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
				} finally {}
			}, parentSuspense);
		};
		const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
			if (scopeId) hostSetScopeId(el, scopeId);
			if (slotScopeIds) for (let i = 0; i < slotScopeIds.length; i++) hostSetScopeId(el, slotScopeIds[i]);
			if (parentComponent) {
				let subTree = parentComponent.subTree;
				if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
					const parentVNode = parentComponent.vnode;
					setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
				}
			}
		};
		const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
			for (let i = start; i < children.length; i++) {
				const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
				patch(null, child, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			}
		};
		const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			const el = n2.el = n1.el;
			let { patchFlag, dynamicChildren, dirs } = n2;
			patchFlag |= n1.patchFlag & 16;
			const oldProps = n1.props || EMPTY_OBJ;
			const newProps = n2.props || EMPTY_OBJ;
			let vnodeHook;
			parentComponent && toggleRecurse(parentComponent, false);
			if (vnodeHook = newProps.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
			if (dirs) invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
			parentComponent && toggleRecurse(parentComponent, true);
			if (dynamicChildren && (!n1.dynamicChildren || n1.dynamicChildren.length !== dynamicChildren.length)) {
				patchFlag = 0;
				optimized = false;
				dynamicChildren = null;
			}
			if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) hostSetElementText(el, "");
			if (dynamicChildren) patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds);
			else if (!optimized) patchChildren(n1, n2, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds, false);
			if (patchFlag > 0) {
				if (patchFlag & 16) patchProps(el, oldProps, newProps, parentComponent, namespace);
				else {
					if (patchFlag & 2) {
						if (oldProps.class !== newProps.class) hostPatchProp(el, "class", null, newProps.class, namespace);
					}
					if (patchFlag & 4) hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
					if (patchFlag & 8) {
						const propsToUpdate = n2.dynamicProps;
						for (let i = 0; i < propsToUpdate.length; i++) {
							const key = propsToUpdate[i];
							const prev = oldProps[key];
							const next = newProps[key];
							if (next !== prev || key === "value") hostPatchProp(el, key, prev, next, namespace, parentComponent);
						}
					}
				}
				if (patchFlag & 1) {
					if (n1.children !== n2.children) hostSetElementText(el, n2.children);
				}
			} else if (!optimized && dynamicChildren == null) patchProps(el, oldProps, newProps, parentComponent, namespace);
			if ((vnodeHook = newProps.onVnodeUpdated) || dirs) queuePostRenderEffect(() => {
				vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
				dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
			}, parentSuspense);
		};
		const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
			for (let i = 0; i < newChildren.length; i++) {
				const oldVNode = oldChildren[i];
				const newVNode = newChildren[i];
				const oldEl = oldVNode.el || resolveAsyncComponentPlaceholder(oldVNode);
				const container = oldEl && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & 198) ? hostParentNode(oldEl) : fallbackContainer;
				patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, true);
			}
		};
		const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
			if (oldProps !== newProps) {
				if (oldProps !== EMPTY_OBJ) {
					for (const key in oldProps) if (!isReservedProp(key) && !(key in newProps)) hostPatchProp(el, key, oldProps[key], null, namespace, parentComponent);
				}
				for (const key in newProps) {
					if (isReservedProp(key)) continue;
					const next = newProps[key];
					const prev = oldProps[key];
					if (next !== prev && key !== "value") hostPatchProp(el, key, prev, next, namespace, parentComponent);
				}
				if ("value" in newProps) hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
			}
		};
		const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
			const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
			let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
			if (fragmentSlotScopeIds) slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
			if (n1 == null) {
				hostInsert(fragmentStartAnchor, container, anchor);
				hostInsert(fragmentEndAnchor, container, anchor);
				mountChildren(n2.children || [], container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			} else if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
				patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, namespace, slotScopeIds);
				if (n2.key != null || parentComponent && n2 === parentComponent.subTree) traverseStaticChildren(n1, n2, true);
			} else patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		};
		const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			n2.slotScopeIds = slotScopeIds;
			if (n1 == null) {
				if (n2.shapeFlag & 512) parentComponent.ctx.activate(n2, container, anchor, namespace, optimized);
				else mountComponent(n2, container, anchor, parentComponent, parentSuspense, namespace, optimized);
			} else updateComponent(n1, n2, optimized);
		};
		const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
			const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
			if (isKeepAlive(initialVNode)) instance.ctx.renderer = internals;
			setupComponent(instance, false, optimized);
			if (instance.asyncDep) {
				parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized, namespace);
				if (!initialVNode.el) {
					const placeholder = instance.subTree = createVNode(Comment);
					processCommentNode(null, placeholder, container, anchor);
					initialVNode.placeholder = placeholder.el;
				}
			} else setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
		};
		const updateComponent = (n1, n2, optimized) => {
			const instance = n2.component = n1.component;
			if (shouldUpdateComponent(n1, n2, optimized)) {
				if (instance.asyncDep && !instance.asyncResolved) {
					n2.el = n1.el;
					n2.placeholder = n1.placeholder;
					updateComponentPreRender(instance, n2, optimized);
					return;
				} else {
					instance.next = n2;
					instance.update();
				}
			} else {
				n2.el = n1.el;
				n2.placeholder = n1.placeholder;
				instance.vnode = n2;
			}
		};
		const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
			const componentUpdateFn = () => {
				if (!instance.isMounted) {
					let vnodeHook;
					const { el, props } = initialVNode;
					const { bm, m, parent, root, type } = instance;
					const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
					toggleRecurse(instance, false);
					if (bm) invokeArrayFns(bm);
					if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) invokeVNodeHook(vnodeHook, parent, initialVNode);
					toggleRecurse(instance, true);
					if (el && hydrateNode) {
						const hydrateSubTree = () => {
							instance.subTree = renderComponentRoot(instance);
							hydrateNode(el, instance.subTree, instance, parentSuspense, null);
						};
						if (isAsyncWrapperVNode && type.__asyncHydrate) type.__asyncHydrate(el, instance, hydrateSubTree);
						else hydrateSubTree();
					} else {
						if (root.ce && root.ce._hasShadowRoot()) root.ce._injectChildStyle(type, instance.parent ? instance.parent.type : void 0);
						const subTree = instance.subTree = renderComponentRoot(instance);
						patch(null, subTree, container, anchor, instance, parentSuspense, namespace);
						initialVNode.el = subTree.el;
					}
					if (m) queuePostRenderEffect(m, parentSuspense);
					if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
						const scopedInitialVNode = initialVNode;
						queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
					}
					if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) instance.a && queuePostRenderEffect(instance.a, parentSuspense);
					instance.isMounted = true;
					initialVNode = container = anchor = null;
				} else {
					let { next, bu, u, parent, vnode } = instance;
					{
						const unresolvedAsyncRoot = locateUnresolvedAsyncRoot(instance);
						if (unresolvedAsyncRoot) {
							if (next) {
								next.el = vnode.el;
								updateComponentPreRender(instance, next, optimized);
							}
							unresolvedAsyncRoot.asyncDep.then(() => {
								const retry = () => {
									if (instance.job.flags & 8) return;
									if (parentSuspense && parentSuspense.pendingBranch) queuePostRenderEffect(retry, parentSuspense);
									else update();
								};
								retry.flags = 48;
								queuePostRenderEffect(retry, parentSuspense);
							});
							return;
						}
					}
					let originNext = next;
					let vnodeHook;
					toggleRecurse(instance, false);
					if (next) {
						next.el = vnode.el;
						updateComponentPreRender(instance, next, optimized);
					} else next = vnode;
					if (bu) invokeArrayFns(bu);
					if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parent, next, vnode);
					toggleRecurse(instance, true);
					const nextTree = renderComponentRoot(instance);
					const prevTree = instance.subTree;
					instance.subTree = nextTree;
					patch(prevTree, nextTree, hostParentNode(prevTree.el || resolveAsyncComponentPlaceholder(prevTree)), getNextHostNode(prevTree), instance, parentSuspense, namespace);
					next.el = nextTree.el;
					if (originNext === null) updateHOCHostEl(instance, nextTree.el);
					if (u) queuePostRenderEffect(u, parentSuspense);
					if (vnodeHook = next.props && next.props.onVnodeUpdated) queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
				}
			};
			instance.scope.on();
			const effect = instance.effect = new ReactiveEffect(componentUpdateFn);
			instance.scope.off();
			const update = instance.update = effect.run.bind(effect);
			const job = instance.job = effect.runIfDirty.bind(effect);
			job.i = instance;
			job.id = instance.uid;
			effect.scheduler = () => queueJob(job);
			toggleRecurse(instance, true);
			update();
		};
		const updateComponentPreRender = (instance, nextVNode, optimized) => {
			nextVNode.component = instance;
			const prevProps = instance.vnode.props;
			instance.vnode = nextVNode;
			instance.next = null;
			updateProps(instance, nextVNode.props, prevProps, optimized);
			updateSlots(instance, nextVNode.children, optimized);
			pauseTracking();
			flushPreFlushCbs(instance);
			resetTracking();
		};
		const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
			const c1 = n1 && n1.children;
			const prevShapeFlag = n1 ? n1.shapeFlag : 0;
			const c2 = n2.children;
			const { patchFlag, shapeFlag } = n2;
			if (patchFlag > 0) {
				if (patchFlag & 128) {
					patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					return;
				} else if (patchFlag & 256) {
					patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					return;
				}
			}
			if (shapeFlag & 8) {
				if (prevShapeFlag & 16) unmountChildren(c1, parentComponent, parentSuspense);
				if (c2 !== c1) hostSetElementText(container, c2);
			} else if (prevShapeFlag & 16) {
				if (shapeFlag & 16) patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else unmountChildren(c1, parentComponent, parentSuspense, true);
			} else {
				if (prevShapeFlag & 8) hostSetElementText(container, "");
				if (shapeFlag & 16) mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			}
		};
		const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			c1 = c1 || EMPTY_ARR;
			c2 = c2 || EMPTY_ARR;
			const oldLength = c1.length;
			const newLength = c2.length;
			const commonLength = Math.min(oldLength, newLength);
			let i = 0;
			for (; i < commonLength; i++) {
				const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
				patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			}
			if (oldLength > newLength) unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
			else mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, commonLength);
		};
		const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			let i = 0;
			const l2 = c2.length;
			let e1 = c1.length - 1;
			let e2 = l2 - 1;
			while (i <= e1 && i <= e2) {
				const n1 = c1[i];
				const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
				if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else break;
				i++;
			}
			while (i <= e1 && i <= e2) {
				const n1 = c1[e1];
				const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
				if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else break;
				e1--;
				e2--;
			}
			if (i > e1) {
				if (i <= e2) {
					const nextPos = e2 + 1;
					const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
					while (i <= e2) {
						patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
						i++;
					}
				}
			} else if (i > e2) while (i <= e1) {
				unmount(c1[i], parentComponent, parentSuspense, true);
				i++;
			}
			else {
				const s1 = i;
				const s2 = i;
				const keyToNewIndexMap = new Map();
				for (i = s2; i <= e2; i++) {
					const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
					if (nextChild.key != null) keyToNewIndexMap.set(nextChild.key, i);
				}
				let j;
				let patched = 0;
				const toBePatched = e2 - s2 + 1;
				let moved = false;
				let maxNewIndexSoFar = 0;
				const newIndexToOldIndexMap = new Array(toBePatched);
				for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
				for (i = s1; i <= e1; i++) {
					const prevChild = c1[i];
					if (patched >= toBePatched) {
						unmount(prevChild, parentComponent, parentSuspense, true);
						continue;
					}
					let newIndex;
					if (prevChild.key != null) newIndex = keyToNewIndexMap.get(prevChild.key);
					else for (j = s2; j <= e2; j++) if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
						newIndex = j;
						break;
					}
					if (newIndex === void 0) unmount(prevChild, parentComponent, parentSuspense, true);
					else {
						newIndexToOldIndexMap[newIndex - s2] = i + 1;
						if (newIndex >= maxNewIndexSoFar) maxNewIndexSoFar = newIndex;
						else moved = true;
						patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
						patched++;
					}
				}
				const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
				j = increasingNewIndexSequence.length - 1;
				for (i = toBePatched - 1; i >= 0; i--) {
					const nextIndex = s2 + i;
					const nextChild = c2[nextIndex];
					const anchorVNode = c2[nextIndex + 1];
					const anchor = nextIndex + 1 < l2 ? anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode) : parentAnchor;
					if (newIndexToOldIndexMap[i] === 0) patch(null, nextChild, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					else if (moved) {
						if (j < 0 || i !== increasingNewIndexSequence[j]) move(nextChild, container, anchor, 2);
						else j--;
					}
				}
			}
		};
		const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
			const { el, type, transition, children, shapeFlag } = vnode;
			if (shapeFlag & 6) {
				move(vnode.component.subTree, container, anchor, moveType);
				return;
			}
			if (shapeFlag & 128) {
				vnode.suspense.move(container, anchor, moveType);
				return;
			}
			if (shapeFlag & 64) {
				type.move(vnode, container, anchor, internals);
				return;
			}
			if (type === Fragment) {
				hostInsert(el, container, anchor);
				for (let i = 0; i < children.length; i++) move(children[i], container, anchor, moveType);
				hostInsert(vnode.anchor, container, anchor);
				return;
			}
			if (type === Static) {
				moveStaticNode(vnode, container, anchor);
				return;
			}
			if (moveType !== 2 && shapeFlag & 1 && transition) {
				if (moveType === 0) {
					if (transition.persisted && !el[leaveCbKey]) hostInsert(el, container, anchor);
					else {
						transition.beforeEnter(el);
						hostInsert(el, container, anchor);
						queuePostRenderEffect(() => transition.enter(el), parentSuspense);
					}
				} else {
					const { leave, delayLeave, afterLeave } = transition;
					const remove2 = () => {
						if (vnode.ctx.isUnmounted) hostRemove(el);
						else hostInsert(el, container, anchor);
					};
					const performLeave = () => {
						const wasLeaving = el._isLeaving || !!el[leaveCbKey];
						if (el._isLeaving) el[leaveCbKey](true);
						if (transition.persisted && !wasLeaving) remove2();
						else leave(el, () => {
							remove2();
							afterLeave && afterLeave();
						});
					};
					if (delayLeave) delayLeave(el, remove2, performLeave);
					else performLeave();
				}
			} else hostInsert(el, container, anchor);
		};
		const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
			const { type, props, ref, children, dynamicChildren, shapeFlag, patchFlag, dirs, cacheIndex, memo } = vnode;
			if (patchFlag === -2 || dynamicChildren && dynamicChildren.hasOnce) optimized = false;
			if (ref != null) {
				pauseTracking();
				setRef(ref, null, parentSuspense, vnode, true);
				resetTracking();
			}
			if (cacheIndex != null && (!vnode.ctx || vnode.ctx === parentComponent)) parentComponent.renderCache[cacheIndex] = void 0;
			if (shapeFlag & 256 && parentComponent.ctx.deactivate(vnode)) return;
			const shouldInvokeDirs = shapeFlag & 1 && dirs;
			const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
			let vnodeHook;
			if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) invokeVNodeHook(vnodeHook, parentComponent, vnode);
			if (shapeFlag & 6) unmountComponent(vnode.component, parentSuspense, doRemove);
			else {
				if (shapeFlag & 128) {
					vnode.suspense.unmount(parentSuspense, doRemove);
					return;
				}
				if (shouldInvokeDirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
				if (shapeFlag & 64) vnode.type.remove(vnode, parentComponent, parentSuspense, internals, doRemove);
				else if (dynamicChildren && !dynamicChildren.hasOnce && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
				else if (type === Fragment && patchFlag & 384 || !optimized && shapeFlag & 16) unmountChildren(children, parentComponent, parentSuspense);
				if (doRemove) remove(vnode);
			}
			const shouldInvalidateMemo = memo != null && cacheIndex == null;
			if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs || shouldInvalidateMemo) queuePostRenderEffect(() => {
				vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
				shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
				if (shouldInvalidateMemo) vnode.el = null;
			}, parentSuspense);
		};
		const remove = (vnode) => {
			const { type, el, anchor, transition } = vnode;
			const isFragment = type === Fragment;
			if (isFragment && !transition) {
				removeFragment(el, anchor);
				return;
			}
			if (type === Static) {
				removeStaticNode(vnode);
				if (transition && !transition.persisted && transition.afterLeave) transition.afterLeave();
				return;
			}
			const leavingNode = isFragment ? getTransitionRoot(vnode) : vnode;
			const performRemove = () => {
				if (isFragment) {
					if (hostParentNode(el)) removeFragment(el, anchor);
				} else hostRemove(el);
				if (transition && !transition.persisted && transition.afterLeave) transition.afterLeave();
			};
			if (leavingNode && leavingNode.shapeFlag & 1 && transition && !transition.persisted) {
				const { leave, delayLeave } = transition;
				const leavingEl = leavingNode.el;
				const performLeave = () => leave(leavingEl, performRemove);
				if (delayLeave) delayLeave(leavingEl, performRemove, performLeave);
				else performLeave();
			} else performRemove();
		};
		const removeFragment = (cur, end) => {
			let next;
			while (cur !== end) {
				next = hostNextSibling(cur);
				hostRemove(cur);
				cur = next;
			}
			hostRemove(end);
		};
		const unmountComponent = (instance, parentSuspense, doRemove) => {
			const { bum, scope, job, subTree, um, m, a } = instance;
			invalidateMount(m);
			invalidateMount(a);
			if (bum) invokeArrayFns(bum);
			scope.stop();
			if (job) {
				job.flags |= 8;
				unmount(subTree, instance, parentSuspense, doRemove);
			} else if (subTree) {
				subTree.transition = instance.vnode.transition;
				unmount(subTree, instance, parentSuspense, doRemove);
			}
			if (um) queuePostRenderEffect(um, parentSuspense);
			const markUnmounted = () => {
				instance.isUnmounted = true;
			};
			markUnmounted.flags = 16;
			queuePostRenderEffect(markUnmounted, parentSuspense);
		};
		const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
			for (let i = start; i < children.length; i++) unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
		};
		const getNextHostNode = (vnode) => {
			if (vnode.shapeFlag & 6) return getNextHostNode(vnode.component.subTree);
			if (vnode.shapeFlag & 128) return vnode.suspense.next();
			const el = hostNextSibling(vnode.anchor || vnode.el);
			const teleportEnd = el && el[TeleportEndKey];
			return teleportEnd ? hostNextSibling(teleportEnd) : el;
		};
		const render = (vnode, container, namespace) => {
			flushOnAppMount(() => {
				if (vnode == null) {
					if (container._vnode) unmount(container._vnode, null, null, true);
				} else patch(container._vnode || null, vnode, container, null, null, null, namespace);
				container._vnode = vnode;
			}, vnode && container._vnode ? void 0 : vnode && vnode.component ? vnode.component.uid : getNextUid());
		};
		const internals = {
			p: patch,
			um: unmount,
			m: move,
			r: remove,
			mt: mountComponent,
			mc: mountChildren,
			pc: patchChildren,
			pbc: patchBlockChildren,
			n: getNextHostNode,
			o: options
		};
		let hydrate;
		let hydrateNode;
		if (createHydrationFns) [hydrate, hydrateNode] = createHydrationFns(internals);
		return {
			render,
			hydrate,
			createApp: createAppAPI(render, hydrate)
		};
	}
	function resolveChildrenNamespace({ type, props }, currentNamespace) {
		return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
	}
	function toggleRecurse({ effect, job }, allowed) {
		if (allowed) {
			effect.flags |= 32;
			job.flags |= 4;
		} else {
			effect.flags &= -33;
			job.flags &= -5;
		}
	}
	function needTransition(parentSuspense, transition) {
		return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
	}
	function traverseStaticChildren(n1, n2, shallow = false) {
		const ch1 = n1.children;
		const ch2 = n2.children;
		if (isArray(ch1) && isArray(ch2)) for (let i = 0; i < ch1.length; i++) {
			const c1 = ch1[i];
			let c2 = ch2[i];
			if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
				if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
					c2 = ch2[i] = cloneIfMounted(ch2[i]);
					c2.el = c1.el;
				}
				if (!shallow && c2.patchFlag !== -2) traverseStaticChildren(c1, c2);
			}
			if (c2.type === Text) {
				if (c2.patchFlag === -1) c2 = ch2[i] = cloneIfMounted(c2);
				c2.el = c1.el;
			}
			if (c2.type === Comment && !c2.el) c2.el = c1.el;
		}
	}
	function getSequence(arr) {
		const p = arr.slice();
		const result = [0];
		let i, j, u, v, c;
		const len = arr.length;
		for (i = 0; i < len; i++) {
			const arrI = arr[i];
			if (arrI !== 0) {
				j = result[result.length - 1];
				if (arr[j] < arrI) {
					p[i] = j;
					result.push(i);
					continue;
				}
				u = 0;
				v = result.length - 1;
				while (u < v) {
					c = u + v >> 1;
					if (arr[result[c]] < arrI) u = c + 1;
					else v = c;
				}
				if (arrI < arr[result[u]]) {
					if (u > 0) p[i] = result[u - 1];
					result[u] = i;
				}
			}
		}
		u = result.length;
		v = result[u - 1];
		while (u-- > 0) {
			result[u] = v;
			v = p[v];
		}
		return result;
	}
	function locateUnresolvedAsyncRoot(instance) {
		const subComponent = instance.subTree.component;
		if (subComponent) {
			if (subComponent.asyncDep && !subComponent.asyncResolved) return subComponent;
			else return locateUnresolvedAsyncRoot(subComponent);
		}
	}
	function invalidateMount(hooks) {
		if (hooks) for (let i = 0; i < hooks.length; i++) hooks[i].flags |= 8;
	}
	function resolveAsyncComponentPlaceholder(anchorVnode) {
		if (anchorVnode.placeholder) return anchorVnode.placeholder;
		const instance = anchorVnode.component;
		if (instance) return resolveAsyncComponentPlaceholder(instance.subTree);
		const suspense = anchorVnode.suspense;
		if (suspense && suspense.activeBranch) return resolveAsyncComponentPlaceholder(suspense.activeBranch);
		return null;
	}
	var isSuspense = (type) => type.__isSuspense;
	var deferredEnterKey = Symbol("_deferredEnter");
	function queueEffectWithSuspense(fn, suspense) {
		if (suspense && suspense.pendingBranch) {
			if (isArray(fn)) suspense.effects.push(...fn);
			else suspense.effects.push(fn);
		} else queuePostFlushCb(fn);
	}
	var Fragment = Symbol.for("v-fgt");
	var Text = Symbol.for("v-txt");
	var Comment = Symbol.for("v-cmt");
	var Static = Symbol.for("v-stc");
	var blockStack = [];
	var currentBlock = null;
	function openBlock(disableTracking = false) {
		blockStack.push(currentBlock = disableTracking ? null : []);
	}
	function closeBlock() {
		blockStack.pop();
		currentBlock = blockStack[blockStack.length - 1] || null;
	}
	var isBlockTreeEnabled = 1;
	function setBlockTracking(value, inVOnce = false) {
		isBlockTreeEnabled += value;
		if (value < 0 && currentBlock && inVOnce) currentBlock.hasOnce = true;
	}
	function setupBlock(vnode) {
		vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
		closeBlock();
		if (isBlockTreeEnabled > 0 && currentBlock) currentBlock.push(vnode);
		return vnode;
	}
	function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
		return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
	}
	function createBlock(type, props, children, patchFlag, dynamicProps) {
		return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
	}
	function isVNode(value) {
		return value ? value.__v_isVNode === true : false;
	}
	function isSameVNodeType(n1, n2) {
		return n1.type === n2.type && n1.key === n2.key;
	}
	var normalizeKey = ({ key }) => key != null ? key : null;
	var normalizeRef = ({ ref, ref_key, ref_for }) => {
		if (typeof ref === "number") ref = "" + ref;
		return ref != null ? isString(ref) || isRef(ref) || isFunction(ref) ? {
			i: currentRenderingInstance,
			r: ref,
			k: ref_key,
			f: !!ref_for
		} : ref : null;
	};
	function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
		const vnode = {
			__v_isVNode: true,
			__v_skip: true,
			type,
			props,
			key: props && normalizeKey(props),
			ref: props && normalizeRef(props),
			scopeId: currentScopeId,
			slotScopeIds: null,
			children,
			component: null,
			suspense: null,
			ssContent: null,
			ssFallback: null,
			dirs: null,
			transition: null,
			el: null,
			anchor: null,
			target: null,
			targetStart: null,
			targetAnchor: null,
			staticCount: 0,
			shapeFlag,
			patchFlag,
			dynamicProps,
			dynamicChildren: null,
			appContext: null,
			ctx: currentRenderingInstance
		};
		if (needFullChildrenNormalization) {
			normalizeChildren(vnode, children);
			if (shapeFlag & 128) type.normalize(vnode);
		} else if (children) vnode.shapeFlag |= isString(children) ? 8 : 16;
		if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) currentBlock.push(vnode);
		return vnode;
	}
	var createVNode = _createVNode;
	function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
		if (!type || type === NULL_DYNAMIC_COMPONENT) type = Comment;
		if (isVNode(type)) {
			const cloned = cloneVNode(type, props, true);
			if (children) normalizeChildren(cloned, children);
			if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
				if (cloned.shapeFlag & 6) currentBlock[currentBlock.indexOf(type)] = cloned;
				else currentBlock.push(cloned);
			}
			cloned.patchFlag = -2;
			return cloned;
		}
		if (isClassComponent(type)) type = type.__vccOpts;
		if (props) {
			props = guardReactiveProps(props);
			let { class: klass, style } = props;
			if (klass && !isString(klass)) props.class = normalizeClass(klass);
			if (isObject(style)) {
				if (isProxy(style) && !isArray(style)) style = extend({}, style);
				props.style = normalizeStyle(style);
			}
		}
		const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
		return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
	}
	function guardReactiveProps(props) {
		if (!props) return null;
		if (isProxy(props)) return extend({}, props);
		return isInternalObject(props) ? extend({}, props[rawAttrsKey] || props) : props;
	}
	function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
		const { props, ref, patchFlag, children, transition } = vnode;
		const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
		const cloned = {
			__v_isVNode: true,
			__v_skip: true,
			type: vnode.type,
			props: mergedProps,
			key: mergedProps && normalizeKey(mergedProps),
			ref: extraProps && extraProps.ref ? mergeRef && ref ? isArray(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref,
			scopeId: vnode.scopeId,
			slotScopeIds: vnode.slotScopeIds,
			children,
			target: vnode.target,
			targetStart: vnode.targetStart,
			targetAnchor: vnode.targetAnchor,
			staticCount: vnode.staticCount,
			shapeFlag: vnode.shapeFlag,
			patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
			dynamicProps: vnode.dynamicProps,
			dynamicChildren: vnode.dynamicChildren,
			appContext: vnode.appContext,
			dirs: vnode.dirs,
			transition,
			component: vnode.component,
			suspense: vnode.suspense,
			ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
			ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
			placeholder: vnode.placeholder,
			el: vnode.el,
			anchor: vnode.anchor,
			ctx: vnode.ctx,
			ce: vnode.ce,
			cacheIndex: vnode.cacheIndex
		};
		if (transition && cloneTransition) setTransitionHooks(cloned, transition.clone(cloned));
		return cloned;
	}
	function createTextVNode(text = " ", flag = 0) {
		return createVNode(Text, null, text, flag);
	}
	function createCommentVNode(text = "", asBlock = false) {
		return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
	}
	function normalizeVNode(child) {
		if (child == null || typeof child === "boolean") return createVNode(Comment);
		else if (isArray(child)) return createVNode(Fragment, null, child.slice());
		else if (isVNode(child)) return cloneIfMounted(child);
		else return createVNode(Text, null, String(child));
	}
	function cloneIfMounted(child) {
		return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
	}
	function normalizeChildren(vnode, children) {
		let type = 0;
		const { shapeFlag } = vnode;
		if (children == null) children = null;
		else if (isArray(children)) type = 16;
		else if (typeof children === "object") {
			if (shapeFlag & 65) {
				const slot = children.default;
				if (slot) {
					slot._c && (slot._d = false);
					normalizeChildren(vnode, slot());
					slot._c && (slot._d = true);
				}
				return;
			} else {
				type = 32;
				const slotFlag = children._;
				if (!slotFlag && !isInternalObject(children)) children._ctx = currentRenderingInstance;
				else if (slotFlag === 3 && currentRenderingInstance) {
					if (currentRenderingInstance.slots._ === 1) children._ = 1;
					else {
						children._ = 2;
						vnode.patchFlag |= 1024;
					}
				}
			}
		} else if (isFunction(children)) {
			if (shapeFlag & 65) {
				normalizeChildren(vnode, { default: children });
				return;
			}
			children = {
				default: children,
				_ctx: currentRenderingInstance
			};
			type = 32;
		} else {
			children = String(children);
			if (shapeFlag & 64) {
				type = 16;
				children = [createTextVNode(children)];
			} else type = 8;
		}
		vnode.children = children;
		vnode.shapeFlag |= type;
	}
	function mergeProps(...args) {
		const ret = {};
		for (let i = 0; i < args.length; i++) {
			const toMerge = args[i];
			for (const key in toMerge) if (key === "class") {
				if (ret.class !== toMerge.class) ret.class = normalizeClass([ret.class, toMerge.class]);
			} else if (key === "style") ret.style = normalizeStyle([ret.style, toMerge.style]);
			else if (isOn(key)) {
				const existing = ret[key];
				const incoming = toMerge[key];
				if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) ret[key] = existing ? [].concat(existing, incoming) : incoming;
				else if (incoming == null && existing == null && !isModelListener(key)) ret[key] = incoming;
			} else if (key !== "") ret[key] = toMerge[key];
		}
		return ret;
	}
	function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
		callWithAsyncErrorHandling(hook, instance, 7, [vnode, prevVNode]);
	}
	var emptyAppContext = createAppContext();
	var uid = 0;
	function getNextUid() {
		return uid;
	}
	function createComponentInstance(vnode, parent, suspense) {
		const type = vnode.type;
		const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
		const instance = {
			uid: uid++,
			vnode,
			type,
			parent,
			appContext,
			root: null,
			next: null,
			subTree: null,
			effect: null,
			update: null,
			job: null,
			scope: new EffectScope(true),
			render: null,
			proxy: null,
			exposed: null,
			exposeProxy: null,
			withProxy: null,
			provides: parent ? parent.provides : Object.create(appContext.provides),
			ids: parent ? parent.ids : [
				"",
				0,
				0
			],
			accessCache: null,
			renderCache: [],
			components: null,
			directives: null,
			propsOptions: normalizePropsOptions(type, appContext),
			emitsOptions: normalizeEmitsOptions(type, appContext),
			emit: null,
			emitted: null,
			propsDefaults: EMPTY_OBJ,
			inheritAttrs: type.inheritAttrs,
			ctx: EMPTY_OBJ,
			data: EMPTY_OBJ,
			props: EMPTY_OBJ,
			attrs: EMPTY_OBJ,
			slots: EMPTY_OBJ,
			refs: EMPTY_OBJ,
			setupState: EMPTY_OBJ,
			setupContext: null,
			suspense,
			suspenseId: suspense ? suspense.pendingId : 0,
			asyncDep: null,
			asyncResolved: false,
			isMounted: false,
			isUnmounted: false,
			isDeactivated: false,
			bc: null,
			c: null,
			bm: null,
			m: null,
			bu: null,
			u: null,
			um: null,
			bum: null,
			da: null,
			a: null,
			rtg: null,
			rtc: null,
			ec: null,
			sp: null
		};
		instance.ctx = { _: instance };
		instance.root = parent ? parent.root : instance;
		instance.emit = emit.bind(null, instance);
		if (vnode.ce) vnode.ce(instance);
		return instance;
	}
	var currentInstance = null;
	var getCurrentInstance = () => currentInstance || currentRenderingInstance;
	var internalSetCurrentInstance;
	var setInSSRSetupState;
	{
		const g = getGlobalThis();
		const registerGlobalSetter = (key, setter) => {
			let setters;
			if (!(setters = g[key])) setters = g[key] = [];
			setters.push(setter);
			return (v) => {
				if (setters.length > 1) setters.forEach((set) => set(v));
				else setters[0](v);
			};
		};
		internalSetCurrentInstance = registerGlobalSetter(`__VUE_INSTANCE_SETTERS__`, (v) => currentInstance = v);
		setInSSRSetupState = registerGlobalSetter(`__VUE_SSR_SETTERS__`, (v) => isInSSRComponentSetup = v);
	}
	var setCurrentInstance = (instance) => {
		const prev = currentInstance;
		internalSetCurrentInstance(instance);
		instance.scope.on();
		return () => {
			instance.scope.off();
			internalSetCurrentInstance(prev);
		};
	};
	var unsetCurrentInstance = () => {
		currentInstance && currentInstance.scope.off();
		internalSetCurrentInstance(null);
	};
	function isStatefulComponent(instance) {
		return instance.vnode.shapeFlag & 4;
	}
	var isInSSRComponentSetup = false;
	function setupComponent(instance, isSSR = false, optimized = false) {
		isSSR && setInSSRSetupState(isSSR);
		const { props, children } = instance.vnode;
		const isStateful = isStatefulComponent(instance);
		initProps(instance, props, isStateful, isSSR);
		initSlots(instance, children, optimized || isSSR);
		const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
		isSSR && setInSSRSetupState(false);
		return setupResult;
	}
	function setupStatefulComponent(instance, isSSR) {
		const Component = instance.type;
		instance.accessCache = Object.create(null);
		instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
		const { setup } = Component;
		if (setup) {
			pauseTracking();
			const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
			const reset = setCurrentInstance(instance);
			const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
			const isAsyncSetup = isPromise(setupResult);
			resetTracking();
			reset();
			if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) markAsyncBoundary(instance);
			if (isAsyncSetup) {
				setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
				if (isSSR) return setupResult.then((resolvedResult) => {
					setInSSRSetupState(true);
					try {
						handleSetupResult(instance, resolvedResult, isSSR);
					} finally {
						setInSSRSetupState(false);
					}
				}).catch((e) => {
					handleError(e, instance, 0, void 0, true);
					instance.ssrRender = (_, push) => push("<!---->");
				});
				else instance.asyncDep = setupResult;
			} else handleSetupResult(instance, setupResult, isSSR);
		} else finishComponentSetup(instance, isSSR);
	}
	function handleSetupResult(instance, setupResult, isSSR) {
		if (isFunction(setupResult)) {
			if (instance.type.__ssrInlineRender) instance.ssrRender = setupResult;
			else instance.render = setupResult;
		} else if (isObject(setupResult)) instance.setupState = proxyRefs(setupResult);
		finishComponentSetup(instance, isSSR);
	}
	function finishComponentSetup(instance, isSSR, skipOptions) {
		const Component = instance.type;
		if (!instance.render) instance.render = Component.render || NOOP;
		{
			const reset = setCurrentInstance(instance);
			pauseTracking();
			try {
				applyOptions(instance);
			} finally {
				resetTracking();
				reset();
			}
		}
	}
	var rawAttrsKey = Symbol();
	var attrsProxyHandlers = { get(target, key) {
		track(target, "get", "");
		return key === rawAttrsKey ? target : target[key];
	} };
	function createSetupContext(instance) {
		const expose = (exposed) => {
			instance.exposed = exposed || {};
		};
		return {
			attrs: new Proxy(instance.attrs, attrsProxyHandlers),
			slots: instance.slots,
			emit: instance.emit,
			expose
		};
	}
	function getComponentPublicInstance(instance) {
		if (instance.exposed) return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
			get(target, key) {
				if (key in target) return target[key];
				else if (key in publicPropertiesMap) return publicPropertiesMap[key](instance);
			},
			has(target, key) {
				return key in target || key in publicPropertiesMap;
			}
		}));
		else return instance.proxy;
	}
	function getComponentName(Component, includeInferred = true) {
		return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
	}
	function isClassComponent(value) {
		return isFunction(value) && "__vccOpts" in value;
	}
	var computed = (getterOrOptions, debugOptions) => {
		return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
	};
	function h$1(type, propsOrChildren, children) {
		try {
			setBlockTracking(-1);
			const l = arguments.length;
			if (l === 2) {
				if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
					if (isVNode(propsOrChildren)) return createVNode(type, null, [propsOrChildren]);
					return createVNode(type, propsOrChildren);
				} else return createVNode(type, null, propsOrChildren);
			} else {
				if (l > 3) children = Array.prototype.slice.call(arguments, 2);
				else if (l === 3 && isVNode(children)) children = [children];
				return createVNode(type, propsOrChildren, children);
			}
		} finally {
			setBlockTracking(1);
		}
	}
	var version = "3.5.45";
	var policy = void 0;
	var tt = typeof window !== "undefined" && window.trustedTypes;
	if (tt) try {
		policy = tt.createPolicy("vue", { createHTML: (val) => val });
	} catch (e) {}
	var unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
	var svgNS = "http://www.w3.org/2000/svg";
	var mathmlNS = "http://www.w3.org/1998/Math/MathML";
	var doc = typeof document !== "undefined" ? document : null;
	var templateContainer = doc && doc.createElement("template");
	var nodeOps = {
		insert: (child, parent, anchor) => {
			parent.insertBefore(child, anchor || null);
		},
		remove: (child) => {
			const parent = child.parentNode;
			if (parent) parent.removeChild(child);
		},
		createElement: (tag, namespace, is, props) => {
			const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
			if (tag === "select" && props && props.multiple != null) el.setAttribute("multiple", props.multiple);
			return el;
		},
		createText: (text) => doc.createTextNode(text),
		createComment: (text) => doc.createComment(text),
		setText: (node, text) => {
			node.nodeValue = text;
		},
		setElementText: (el, text) => {
			el.textContent = text;
		},
		parentNode: (node) => node.parentNode,
		nextSibling: (node) => node.nextSibling,
		querySelector: (selector) => doc.querySelector(selector),
		setScopeId(el, id) {
			el.setAttribute(id, "");
		},
		insertStaticContent(content, parent, anchor, namespace, start, end) {
			const before = anchor ? anchor.previousSibling : parent.lastChild;
			if (start && (start === end || start.nextSibling)) while (true) {
				parent.insertBefore(start.cloneNode(true), anchor);
				if (start === end || !(start = start.nextSibling)) break;
			}
			else {
				templateContainer.innerHTML = unsafeToTrustedHTML(namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content);
				const template = templateContainer.content;
				if (namespace === "svg" || namespace === "mathml") {
					const wrapper = template.firstChild;
					while (wrapper.firstChild) template.appendChild(wrapper.firstChild);
					template.removeChild(wrapper);
				}
				parent.insertBefore(template, anchor);
			}
			return [before ? before.nextSibling : parent.firstChild, anchor ? anchor.previousSibling : parent.lastChild];
		}
	};
	var TRANSITION = "transition";
	var ANIMATION = "animation";
	var vtcKey = Symbol("_vtc");
	var DOMTransitionPropsValidators = {
		name: String,
		type: String,
		css: {
			type: Boolean,
			default: true
		},
		duration: [
			String,
			Number,
			Object
		],
		enterFromClass: String,
		enterActiveClass: String,
		enterToClass: String,
		appearFromClass: String,
		appearActiveClass: String,
		appearToClass: String,
		leaveFromClass: String,
		leaveActiveClass: String,
		leaveToClass: String
	};
	var TransitionPropsValidators = extend({}, BaseTransitionPropsValidators, DOMTransitionPropsValidators);
	var callHook = (hook, args = []) => {
		if (isArray(hook)) hook.forEach((h2) => h2(...args));
		else if (hook) hook(...args);
	};
	var hasExplicitCallback = (hook) => {
		return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
	};
	function resolveTransitionProps(rawProps) {
		const baseProps = {};
		for (const key in rawProps) if (!(key in DOMTransitionPropsValidators)) baseProps[key] = rawProps[key];
		if (rawProps.css === false) return baseProps;
		const { name = "v", type, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
		const durations = normalizeDuration(duration);
		const enterDuration = durations && durations[0];
		const leaveDuration = durations && durations[1];
		const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
		const finishEnter = (el, isAppear, done, isCancelled) => {
			el._enterCancelled = isCancelled;
			removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
			removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
			done && done();
		};
		const finishLeave = (el, done) => {
			el._isLeaving = false;
			removeTransitionClass(el, leaveFromClass);
			removeTransitionClass(el, leaveToClass);
			removeTransitionClass(el, leaveActiveClass);
			done && done();
		};
		const makeEnterHook = (isAppear) => {
			return (el, done) => {
				const hook = isAppear ? onAppear : onEnter;
				const resolve = () => finishEnter(el, isAppear, done);
				callHook(hook, [el, resolve]);
				nextFrame(() => {
					removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
					addTransitionClass(el, isAppear ? appearToClass : enterToClass);
					if (!hasExplicitCallback(hook)) whenTransitionEnds(el, type, enterDuration, resolve);
				});
			};
		};
		return extend(baseProps, {
			onBeforeEnter(el) {
				callHook(onBeforeEnter, [el]);
				addTransitionClass(el, enterFromClass);
				addTransitionClass(el, enterActiveClass);
			},
			onBeforeAppear(el) {
				callHook(onBeforeAppear, [el]);
				addTransitionClass(el, appearFromClass);
				addTransitionClass(el, appearActiveClass);
			},
			onEnter: makeEnterHook(false),
			onAppear: makeEnterHook(true),
			onLeave(el, done) {
				el._isLeaving = true;
				const resolve = () => finishLeave(el, done);
				addTransitionClass(el, leaveFromClass);
				if (!el._enterCancelled) {
					forceReflow(el);
					addTransitionClass(el, leaveActiveClass);
				} else {
					addTransitionClass(el, leaveActiveClass);
					forceReflow(el);
				}
				nextFrame(() => {
					if (!el._isLeaving) return;
					removeTransitionClass(el, leaveFromClass);
					addTransitionClass(el, leaveToClass);
					if (!hasExplicitCallback(onLeave)) whenTransitionEnds(el, type, leaveDuration, resolve);
				});
				callHook(onLeave, [el, resolve]);
			},
			onEnterCancelled(el) {
				finishEnter(el, false, void 0, true);
				callHook(onEnterCancelled, [el]);
			},
			onAppearCancelled(el) {
				finishEnter(el, true, void 0, true);
				callHook(onAppearCancelled, [el]);
			},
			onLeaveCancelled(el) {
				finishLeave(el);
				callHook(onLeaveCancelled, [el]);
			}
		});
	}
	function normalizeDuration(duration) {
		if (duration == null) return null;
		else if (isObject(duration)) return [NumberOf(duration.enter), NumberOf(duration.leave)];
		else {
			const n = NumberOf(duration);
			return [n, n];
		}
	}
	function NumberOf(val) {
		return toNumber(val);
	}
	function addTransitionClass(el, cls) {
		cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
		(el[vtcKey] || (el[vtcKey] = new Set())).add(cls);
	}
	function removeTransitionClass(el, cls) {
		cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
		const _vtc = el[vtcKey];
		if (_vtc) {
			_vtc.delete(cls);
			if (!_vtc.size) el[vtcKey] = void 0;
		}
	}
	function nextFrame(cb) {
		requestAnimationFrame(() => {
			requestAnimationFrame(cb);
		});
	}
	var endId = 0;
	function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
		const id = el._endId = ++endId;
		const resolveIfNotStale = () => {
			if (id === el._endId) resolve();
		};
		if (explicitTimeout != null) return setTimeout(resolveIfNotStale, explicitTimeout);
		const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
		if (!type) return resolve();
		const endEvent = type + "end";
		let ended = 0;
		const end = () => {
			el.removeEventListener(endEvent, onEnd);
			resolveIfNotStale();
		};
		const onEnd = (e) => {
			if (e.target === el && ++ended >= propCount) end();
		};
		setTimeout(() => {
			if (ended < propCount) end();
		}, timeout + 1);
		el.addEventListener(endEvent, onEnd);
	}
	function getTransitionInfo(el, expectedType) {
		const styles = window.getComputedStyle(el);
		const getStyleProperties = (key) => (styles[key] || "").split(", ");
		const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
		const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
		const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
		const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
		const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
		const animationTimeout = getTimeout(animationDelays, animationDurations);
		let type = null;
		let timeout = 0;
		let propCount = 0;
		if (expectedType === TRANSITION) {
			if (transitionTimeout > 0) {
				type = TRANSITION;
				timeout = transitionTimeout;
				propCount = transitionDurations.length;
			}
		} else if (expectedType === ANIMATION) {
			if (animationTimeout > 0) {
				type = ANIMATION;
				timeout = animationTimeout;
				propCount = animationDurations.length;
			}
		} else {
			timeout = Math.max(transitionTimeout, animationTimeout);
			type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
			propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
		}
		const hasTransform = type === TRANSITION && /\b(?:transform|all)(?:,|$)/.test(getStyleProperties(`${TRANSITION}Property`).toString());
		return {
			type,
			timeout,
			propCount,
			hasTransform
		};
	}
	function getTimeout(delays, durations) {
		while (delays.length < durations.length) delays = delays.concat(delays);
		return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
	}
	function toMs(s) {
		if (s === "auto") return 0;
		return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
	}
	function forceReflow(el) {
		return (el ? el.ownerDocument : document).body.offsetHeight;
	}
	function patchClass(el, value, isSVG) {
		const transitionClasses = el[vtcKey];
		if (transitionClasses) value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
		if (value == null) el.removeAttribute("class");
		else if (isSVG) el.setAttribute("class", value);
		else el.className = value;
	}
	var vShowOriginalDisplay = Symbol("_vod");
	var vShowHidden = Symbol("_vsh");
	var CSS_VAR_TEXT = Symbol("");
	var displayRE = /(?:^|;)\s*display\s*:/;
	function patchStyle(el, prev, next) {
		const style = el.style;
		const isCssString = isString(next);
		let hasControlledDisplay = false;
		if (next && !isCssString) {
			if (prev) {
				if (!isString(prev)) {
					for (const key in prev) if (next[key] == null) setStyle(style, key, "");
				} else for (const prevStyle of prev.split(";")) {
					const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
					if (next[key] == null) setStyle(style, key, "");
				}
			}
			for (const key in next) {
				if (key === "display") hasControlledDisplay = true;
				const value = next[key];
				if (value != null) {
					if (!shouldPreserveTextareaResizeStyle(el, key, !isString(prev) && prev ? prev[key] : void 0, value)) setStyle(style, key, value);
				} else setStyle(style, key, "");
			}
		} else if (isCssString) {
			if (prev !== next) {
				const cssVarText = style[CSS_VAR_TEXT];
				if (cssVarText) next += ";" + cssVarText;
				style.cssText = next;
				hasControlledDisplay = displayRE.test(next);
			}
		} else if (prev) el.removeAttribute("style");
		if (vShowOriginalDisplay in el) {
			if (!isCssString || prev !== next) el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
			if (el[vShowHidden]) style.display = "none";
		}
	}
	var importantRE = /\s*!important$/;
	function setStyle(style, name, val) {
		if (isArray(val)) val.forEach((v) => setStyle(style, name, v));
		else {
			if (val == null) val = "";
			if (name.startsWith("--")) {
				if (importantRE.test(val)) style.setProperty(name, val.replace(importantRE, ""), "important");
				else style.setProperty(name, val);
			} else {
				const prefixed = autoPrefix(style, name);
				if (importantRE.test(val)) style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
				else style[prefixed] = val;
			}
		}
	}
	var prefixes = [
		"Webkit",
		"Moz",
		"ms"
	];
	var prefixCache = {};
	function autoPrefix(style, rawName) {
		const cached = prefixCache[rawName];
		if (cached) return cached;
		let name = camelize(rawName);
		if (name !== "filter" && name in style) return prefixCache[rawName] = name;
		name = capitalize(name);
		for (let i = 0; i < prefixes.length; i++) {
			const prefixed = prefixes[i] + name;
			if (prefixed in style) return prefixCache[rawName] = prefixed;
		}
		return rawName;
	}
	function shouldPreserveTextareaResizeStyle(el, key, prev, next) {
		return el.tagName === "TEXTAREA" && (key === "width" || key === "height") && isString(next) && prev === next;
	}
	var xlinkNS = "http://www.w3.org/1999/xlink";
	function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
		if (isSVG && key.startsWith("xlink:")) {
			if (value == null) el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
			else el.setAttributeNS(xlinkNS, key, value);
		} else if (value == null || isBoolean && !includeBooleanAttr(value)) el.removeAttribute(key);
		else el.setAttribute(key, isBoolean ? "" : isSymbol(value) ? String(value) : value);
	}
	function patchDOMProp(el, key, value, parentComponent, attrName) {
		if (key === "innerHTML" || key === "textContent") {
			if (value != null) el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
			return;
		}
		const tag = el.tagName;
		if (key === "value" && tag !== "PROGRESS" && !tag.includes("-")) {
			const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
			const newValue = value == null ? el.type === "checkbox" ? "on" : "" : String(value);
			if (oldValue !== newValue || !("_value" in el)) el.value = newValue;
			if (value == null) el.removeAttribute(key);
			el._value = value;
			return;
		}
		let needRemove = false;
		if (value === "" || value == null) {
			const type = typeof el[key];
			if (type === "boolean") value = includeBooleanAttr(value);
			else if (value == null && type === "string") {
				value = "";
				needRemove = true;
			} else if (type === "number") {
				value = 0;
				needRemove = true;
			}
		}
		try {
			el[key] = value;
		} catch (e) {}
		needRemove && el.removeAttribute(attrName || key);
	}
	function addEventListener(el, event, handler, options) {
		el.addEventListener(event, handler, options);
	}
	function removeEventListener(el, event, handler, options) {
		el.removeEventListener(event, handler, options);
	}
	var veiKey = Symbol("_vei");
	function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
		const invokers = el[veiKey] || (el[veiKey] = {});
		const existingInvoker = invokers[rawName];
		if (nextValue && existingInvoker) existingInvoker.value = nextValue;
		else {
			const [name, options] = parseName(rawName);
			if (nextValue) addEventListener(el, name, invokers[rawName] = createInvoker(nextValue, instance), options);
			else if (existingInvoker) {
				removeEventListener(el, name, existingInvoker, options);
				invokers[rawName] = void 0;
			}
		}
	}
	var optionsModifierRE = /(Once|Passive|Capture)$/;
	var optionsModifierEventRE = /^on:?(?:Once|Passive|Capture)$/;
	function parseName(name) {
		let options;
		let m;
		while ((m = name.match(optionsModifierRE)) && !optionsModifierEventRE.test(name)) {
			if (!options) options = {};
			name = name.slice(0, name.length - m[1].length);
			options[m[1].toLowerCase()] = true;
		}
		return [name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2)), options];
	}
	var cachedNow = 0;
	var p = Promise.resolve();
	var getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
	function createInvoker(initialValue, instance) {
		const invoker = (e) => {
			if (!e._vts) e._vts = Date.now();
			else if (e._vts <= invoker.attached) return;
			const value = invoker.value;
			if (isArray(value)) {
				const originalStop = e.stopImmediatePropagation;
				e.stopImmediatePropagation = () => {
					originalStop.call(e);
					e._stopped = true;
				};
				const handlers = value.slice();
				const args = [e];
				for (let i = 0; i < handlers.length; i++) {
					if (e._stopped) break;
					const handler = handlers[i];
					if (handler) callWithAsyncErrorHandling(handler, instance, 5, args);
				}
			} else callWithAsyncErrorHandling(value, instance, 5, [e]);
		};
		invoker.value = initialValue;
		invoker.attached = getNow();
		return invoker;
	}
	var isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
	var patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
		const isSVG = namespace === "svg";
		if (key === "class") patchClass(el, nextValue, isSVG);
		else if (key === "style") patchStyle(el, prevValue, nextValue);
		else if (isOn(key)) {
			if (!isModelListener(key)) patchEvent(el, key, prevValue, nextValue, parentComponent);
		} else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
			patchDOMProp(el, key, nextValue);
			if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
		} else if (el._isVueCE && (shouldSetAsPropForVueCE(el, key) || el._def.__asyncLoader && (/[A-Z]/.test(key) || !isString(nextValue)))) patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
		else {
			if (key === "true-value") el._trueValue = nextValue;
			else if (key === "false-value") el._falseValue = nextValue;
			patchAttr(el, key, nextValue, isSVG);
		}
	};
	function shouldSetAsProp(el, key, value, isSVG) {
		if (isSVG) {
			if (key === "innerHTML" || key === "textContent") return true;
			if (key in el && isNativeOn(key) && isFunction(value)) return true;
			return false;
		}
		if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") return false;
		if (key === "sandbox" && el.tagName === "IFRAME") return false;
		if (key === "form") return false;
		if (key === "list" && el.tagName === "INPUT") return false;
		if (key === "type" && el.tagName === "TEXTAREA") return false;
		if (key === "width" || key === "height") {
			const tag = el.tagName;
			if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") return false;
		}
		if (isNativeOn(key) && isString(value)) return false;
		return key in el;
	}
	function shouldSetAsPropForVueCE(el, key) {
		const props = el._def.props;
		if (!props) return false;
		const camelKey = camelize(key);
		return Array.isArray(props) ? props.some((prop) => camelize(prop) === camelKey) : Object.keys(props).some((prop) => camelize(prop) === camelKey);
	}
	var positionMap = new WeakMap();
	var newPositionMap = new WeakMap();
	var moveCbKey = Symbol("_moveCb");
	var enterCbKey = Symbol("_enterCb");
	var pendingGroups = new WeakMap();
	var decorate$2 = (t) => {
		delete t.props.mode;
		return t;
	};
	var TransitionGroup = decorate$2({
		name: "TransitionGroup",
		props: extend({}, TransitionPropsValidators, {
			tag: String,
			moveClass: String
		}),
		setup(props, { slots }) {
			const instance = getCurrentInstance();
			const state = useTransitionState();
			let prevChildren;
			let children;
			let origins;
			let moves;
			const willMove = () => {
				if (moves === void 0) moves = prevChildren.length > 0 && hasCSSTransform(prevChildren[0].el, instance.vnode.el, resolveMoveClass(props));
				return moves;
			};
			onUpdated(() => {
				pendingGroups.delete(instance);
				if (!willMove()) {
					prevChildren = [];
					origins = void 0;
					return;
				}
				const moveClass = resolveMoveClass(props);
				prevChildren.forEach(callPendingCbs);
				const shift = origins && getOriginShift(origins, instance.vnode.el);
				origins = void 0;
				prevChildren.forEach((c) => recordPosition(c, shift));
				const movedChildren = prevChildren.filter(applyTranslation);
				forceReflow(instance.vnode.el);
				movedChildren.forEach((c) => {
					const el = c.el;
					const style = el.style;
					addTransitionClass(el, moveClass);
					style.transform = style.webkitTransform = style.transitionDuration = "";
					const cb = el[moveCbKey] = (e) => {
						if (e && e.target !== el) return;
						if (!e || e.propertyName.endsWith("transform")) {
							el.removeEventListener("transitionend", cb);
							el[moveCbKey] = null;
							removeTransitionClass(el, moveClass);
						}
					};
					el.addEventListener("transitionend", cb);
				});
				prevChildren = [];
			});
			return () => {
				const rawProps = toRaw(props);
				const cssTransitionProps = resolveTransitionProps(rawProps);
				let tag = rawProps.tag || Fragment;
				prevChildren = [];
				moves = void 0;
				if (children) for (let i = 0; i < children.length; i++) {
					const child = children[i];
					if (child.el && child.el instanceof Element && !child.el[vShowHidden]) {
						prevChildren.push(child);
						setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
						positionMap.set(child, getPosition(child.el));
					}
				}
				children = slots.default ? getTransitionRawChildren(slots.default()) : [];
				for (let i = 0; i < children.length; i++) {
					const child = children[i];
					if (child.key != null) setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
				}
				if (prevChildren.length) {
					origins = getOrigins(instance);
					pendingGroups.set(instance, willMove);
				}
				return createVNode(tag, null, children);
			};
		}
	});
	function callPendingCbs(c) {
		const el = c.el;
		if (el[moveCbKey]) el[moveCbKey]();
		if (el[enterCbKey]) el[enterCbKey]();
	}
	function resolveMoveClass(props) {
		return props.moveClass || `${props.name || "v"}-move`;
	}
	function recordPosition(c, shift) {
		newPositionMap.set(c, getPosition(c.el, shift));
	}
	function applyTranslation(c) {
		const oldPos = positionMap.get(c);
		const newPos = newPositionMap.get(c);
		const dx = oldPos.left - newPos.left;
		const dy = oldPos.top - newPos.top;
		if (dx || dy) {
			const el = c.el;
			const s = el.style;
			const rect = el.getBoundingClientRect();
			let scaleX = 1;
			let scaleY = 1;
			if (el.offsetWidth) scaleX = rect.width / el.offsetWidth;
			if (el.offsetHeight) scaleY = rect.height / el.offsetHeight;
			if (!Number.isFinite(scaleX) || scaleX === 0) scaleX = 1;
			if (!Number.isFinite(scaleY) || scaleY === 0) scaleY = 1;
			if (Math.abs(scaleX - 1) < .01) scaleX = 1;
			if (Math.abs(scaleY - 1) < .01) scaleY = 1;
			s.transform = s.webkitTransform = `translate(${dx / scaleX}px,${dy / scaleY}px)`;
			s.transitionDuration = "0s";
			return c;
		}
	}
	function getPosition(el, shift) {
		const rect = el.getBoundingClientRect();
		return {
			left: rect.left - (shift ? shift.left : 0),
			top: rect.top - (shift ? shift.top : 0)
		};
	}
	function getOrigins(instance) {
		let origins;
		for (let group = instance.parent; group; group = group.parent) {
			const willMove = pendingGroups.get(group);
			if (willMove) {
				const item = findItem(group.vnode.el, instance.vnode.el);
				if (item) (origins || (origins = [])).push(extend(getPosition(item), {
					item,
					willMove
				}));
			}
		}
		return origins;
	}
	function findItem(root, node) {
		const container = root.nodeType === 1 ? root : root.parentNode;
		while (node && node.parentNode !== container) node = node.parentNode;
		if (node && node.nodeType === 1) return node;
	}
	function getOriginShift(origins, root) {
		const origin = origins.find((o) => o.willMove() && o.item.contains(root));
		return origin && getPosition(origin.item, origin);
	}
	function hasCSSTransform(el, root, moveClass) {
		const clone = el.cloneNode();
		const _vtc = el[vtcKey];
		if (_vtc) _vtc.forEach((cls) => {
			cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
		});
		moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
		clone.style.display = "none";
		const container = root.nodeType === 1 ? root : root.parentNode;
		container.appendChild(clone);
		const { hasTransform } = getTransitionInfo(clone);
		container.removeChild(clone);
		return hasTransform;
	}
	var getModelAssigner = (vnode) => {
		const fn = vnode.props["onUpdate:modelValue"] || false;
		return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
	};
	function onCompositionStart(e) {
		e.target.composing = true;
	}
	function onCompositionEnd(e) {
		const target = e.target;
		if (target.composing) {
			target.composing = false;
			target.dispatchEvent(new Event("input"));
		}
	}
	var assignKey = Symbol("_assign");
	var initialValueKey = Symbol("_initialValue");
	function castValue(value, trim, number) {
		if (trim) value = value.trim();
		if (number) value = looseToNumber(value);
		return value;
	}
	var vModelText = {
		created(el, { modifiers: { lazy, trim, number } }, vnode) {
			if (el.parentNode) {
				if (el.type === "text") el[initialValueKey] = el.defaultValue.replace(/[\r\n]/g, "");
				else if (el.type === "textarea") el[initialValueKey] = el.defaultValue.replace(/\r\n?/g, "\n");
			}
			el[assignKey] = getModelAssigner(vnode);
			const castToNumber = number || vnode.props && vnode.props.type === "number";
			addEventListener(el, lazy ? "change" : "input", (e) => {
				if (e.target.composing) return;
				el[assignKey](castValue(el.value, trim, castToNumber));
			});
			if (trim || castToNumber) addEventListener(el, "change", () => {
				el.value = castValue(el.value, trim, castToNumber);
			});
			if (!lazy) {
				addEventListener(el, "compositionstart", onCompositionStart);
				addEventListener(el, "compositionend", onCompositionEnd);
				addEventListener(el, "change", onCompositionEnd);
			}
		},
		mounted(el, { value, modifiers: { trim, number } }) {
			const newValue = value == null ? "" : value;
			const initialValue = el[initialValueKey];
			delete el[initialValueKey];
			if (initialValue !== void 0 && (el.type === "text" || el.type === "textarea") && el.value !== initialValue) el[assignKey](castValue(el.value, trim, number));
			else el.value = newValue;
		},
		beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
			el[assignKey] = getModelAssigner(vnode);
			if (el.composing) return;
			const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
			const newValue = value == null ? "" : value;
			if (elValue === newValue) return;
			const rootNode = el.getRootNode();
			if ((rootNode instanceof Document || rootNode instanceof ShadowRoot) && rootNode.activeElement === el && el.type !== "range") {
				if (lazy && value === oldValue) return;
				if (trim && el.value.trim() === newValue) return;
			}
			el.value = newValue;
		}
	};
	var vModelCheckbox = {
		deep: true,
		created(el, _, vnode) {
			el[assignKey] = getModelAssigner(vnode);
			addEventListener(el, "change", () => {
				const modelValue = el._modelValue;
				const elementValue = getValue(el);
				const checked = el.checked;
				const assign = el[assignKey];
				if (isArray(modelValue)) {
					const index = looseIndexOf(modelValue, elementValue);
					const found = index !== -1;
					if (checked && !found) assign(modelValue.concat(elementValue));
					else if (!checked && found) {
						const filtered = [...modelValue];
						filtered.splice(index, 1);
						assign(filtered);
					}
				} else if (isSet(modelValue)) {
					const cloned = new Set(modelValue);
					if (checked) cloned.add(elementValue);
					else cloned.delete(elementValue);
					assign(cloned);
				} else assign(getCheckboxValue(el, checked));
			});
		},
		mounted: setChecked,
		beforeUpdate(el, binding, vnode) {
			el[assignKey] = getModelAssigner(vnode);
			setChecked(el, binding, vnode);
		}
	};
	function setChecked(el, { value, oldValue }, vnode) {
		el._modelValue = value;
		let checked;
		if (isArray(value)) checked = looseIndexOf(value, vnode.props.value) > -1;
		else if (isSet(value)) checked = value.has(vnode.props.value);
		else {
			if (value === oldValue) return;
			checked = looseEqual(value, getCheckboxValue(el, true));
		}
		if (el.checked !== checked) el.checked = checked;
	}
	var vModelSelect = {
		deep: true,
		created(el, { value, modifiers: { number } }, vnode) {
			el._modelValue = value;
			addEventListener(el, "change", () => {
				const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map((o) => number ? looseToNumber(getValue(o)) : getValue(o));
				const multiple = el.multiple;
				const assignedValue = multiple ? isSet(el._modelValue) ? new Set(selectedVal) : selectedVal : selectedVal[0];
				const pending = el._pendingValue = [multiple, multiple ? isArray(assignedValue) ? selectedVal.slice() : selectedVal : assignedValue];
				try {
					el[assignKey](assignedValue);
				} finally {
					nextTick(() => {
						if (el._pendingValue === pending) el._pendingValue = void 0;
					});
				}
			});
			el[assignKey] = getModelAssigner(vnode);
		},
		mounted(el, { value, modifiers: { number } }) {
			setSelected(el, value, number);
		},
		beforeUpdate(el, { value }, vnode) {
			el._modelValue = value;
			el[assignKey] = getModelAssigner(vnode);
		},
		updated(el, { value, modifiers: { number } }) {
			const pending = el._pendingValue;
			el._pendingValue = void 0;
			if (!pending || pending[0] !== el.multiple || !isSameSelectValue(value, pending[1], pending[0])) setSelected(el, value, number);
		}
	};
	function isSameSelectValue(value, assignedValue, multiple) {
		if (!multiple) return looseEqual(value, assignedValue);
		if (isArray(value)) return looseEqual(value, assignedValue);
		if (isSet(value)) {
			if (value.size !== assignedValue.length) return false;
			for (const item of assignedValue) if (!value.has(item)) return false;
			return true;
		}
		return false;
	}
	function setSelected(el, value, number = false) {
		const isMultiple = el.multiple;
		const isArrayValue = isArray(value);
		if (isMultiple && !isArrayValue && !isSet(value)) return;
		for (let i = 0, l = el.options.length; i < l; i++) {
			const option = el.options[i];
			const optionValue = getValue(option);
			if (isMultiple) {
				if (isArrayValue) {
					const optionType = typeof optionValue;
					if (optionType === "string" || optionType === "number") option.selected = value.some((v) => String(v) === String(optionValue));
					else option.selected = looseIndexOf(value, optionValue) > -1;
				} else option.selected = value.has(optionValue) || number && typeof optionValue === "string" && value.has(looseToNumber(optionValue));
			} else if (looseEqual(getValue(option), value)) {
				if (el.selectedIndex !== i) el.selectedIndex = i;
				return;
			}
		}
		if (!isMultiple && el.selectedIndex !== -1) el.selectedIndex = -1;
	}
	function getValue(el) {
		return "_value" in el ? el._value : el.value;
	}
	function getCheckboxValue(el, checked) {
		const key = checked ? "_trueValue" : "_falseValue";
		return key in el ? el[key] : checked;
	}
	var systemModifiers = [
		"ctrl",
		"shift",
		"alt",
		"meta"
	];
	var modifierGuards = {
		stop: (e) => e.stopPropagation(),
		prevent: (e) => e.preventDefault(),
		self: (e) => e.target !== e.currentTarget,
		ctrl: (e) => !e.ctrlKey,
		shift: (e) => !e.shiftKey,
		alt: (e) => !e.altKey,
		meta: (e) => !e.metaKey,
		left: (e) => "button" in e && e.button !== 0,
		middle: (e) => "button" in e && e.button !== 1,
		right: (e) => "button" in e && e.button !== 2,
		exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
	};
	var withModifiers = (fn, modifiers) => {
		if (!fn) return fn;
		const cache = fn._withMods || (fn._withMods = {});
		const cacheKey = modifiers.join(".");
		return cache[cacheKey] || (cache[cacheKey] = ((event, ...args) => {
			for (let i = 0; i < modifiers.length; i++) {
				const guard = modifierGuards[modifiers[i]];
				if (guard && guard(event, modifiers)) return;
			}
			return fn(event, ...args);
		}));
	};
	var keyNames = {
		esc: "escape",
		space: " ",
		up: "arrow-up",
		left: "arrow-left",
		right: "arrow-right",
		down: "arrow-down",
		delete: "backspace"
	};
	var withKeys = (fn, modifiers) => {
		const cache = fn._withKeys || (fn._withKeys = {});
		const cacheKey = modifiers.join(".");
		return cache[cacheKey] || (cache[cacheKey] = ((event) => {
			if (!("key" in event)) return;
			const eventKey = hyphenate(event.key);
			if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) return fn(event);
		}));
	};
	var rendererOptions = extend({ patchProp }, nodeOps);
	var renderer;
	function ensureRenderer() {
		return renderer || (renderer = createRenderer(rendererOptions));
	}
	var createApp = ((...args) => {
		const app = ensureRenderer().createApp(...args);
		const { mount } = app;
		app.mount = (containerOrSelector) => {
			const container = normalizeContainer(containerOrSelector);
			if (!container) return;
			const component = app._component;
			if (!isFunction(component) && !component.render && !component.template) component.template = container.innerHTML;
			if (container.nodeType === 1) container.textContent = "";
			const proxy = mount(container, false, resolveRootNamespace(container));
			if (container instanceof Element) {
				container.removeAttribute("v-cloak");
				container.setAttribute("data-v-app", "");
			}
			return proxy;
		};
		return app;
	});
	function resolveRootNamespace(container) {
		if (container instanceof SVGElement) return "svg";
		if (typeof MathMLElement === "function" && container instanceof MathMLElement) return "mathml";
	}
	function normalizeContainer(container) {
		if (isString(container)) return document.querySelector(container);
		return container;
	}
	var u = {
		VUE_HOOK_OUTSIDE_COMPONENT: "MAKOO_VUE_HOOK_OUTSIDE_COMPONENT",
		VUE_HOOK_OUTSIDE_SCOPE: "MAKOO_VUE_HOOK_OUTSIDE_SCOPE",
		VUE_PARTIAL_MOUNT_UNCONFIRMED: "MAKOO_VUE_PARTIAL_MOUNT_UNCONFIRMED"
	};
	var d = Symbol("makoo-component");
	var h = new class {
		constructor() {
			_defineProperty(this, "plugins", []);
		}
		getPlugins() {
			return [...this.plugins];
		}
		use(e) {
			this.plugins.includes(e) || this.plugins.push(e);
		}
		usePlugins(...e) {
			for (let t of e) this.use(t);
		}
		clear() {
			this.plugins = [];
		}
	}();
	function g() {
		return {
			name: "vue",
			mount({ component: r$2, props: a, command: o, statusHandle: s, container: c, globalListener: l }) {
				let f = new Set(), p = !1;
				try {
					let e = createApp(r$2, a ?? null);
					e.provide(d, {
						command: o,
						statusHandle: s,
						globalListener: l,
						subscriptions: f
					});
					for (let t of h.getPlugins()) e.use(t);
					return p = !0, e.mount(c), e;
				} catch (r$1) {
					let i = _(f);
					throw p && i.push(new n("Cannot confirm Vue component cleanup after mount failed; reload the page", { code: u.VUE_PARTIAL_MOUNT_UNCONFIRMED })), i.length === 0 ? r$1 : new r(i, "Failed to clean up after the Vue mount failed", {
						code: t.MOUNT_CLEANUP_FAILED,
						cause: r$1
					});
				}
			},
			unmount(e) {
				e.unmount();
			}
		};
	}
	function _(e) {
		let t = [];
		for (let n of [...e]) try {
			n();
		} catch (e) {
			t.push(e);
		}
		return t;
	}
	var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
	var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
	var toPascalCase = (string) => {
		const camelCase = toCamelCase(string);
		return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
	};
	var mergeClasses = (...classes) => classes.filter((className, index, array) => {
		return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
	}).join(" ").trim();
	var isEmptyString = (value) => value === "";
	var defaultAttributes = {
		xmlns: "http://www.w3.org/2000/svg",
		width: 24,
		height: 24,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		"stroke-width": 2,
		"stroke-linecap": "round",
		"stroke-linejoin": "round"
	};
	var Icon = ({ name, iconNode, absoluteStrokeWidth, "absolute-stroke-width": absoluteStrokeWidthKebabCase, strokeWidth, "stroke-width": strokeWidthKebabCase, size = defaultAttributes.width, color = defaultAttributes.stroke, ...props }, { slots }) => {
		return h$1("svg", {
			...defaultAttributes,
			...props,
			width: size,
			height: size,
			stroke: color,
			"stroke-width": isEmptyString(absoluteStrokeWidth) || isEmptyString(absoluteStrokeWidthKebabCase) || absoluteStrokeWidth === true || absoluteStrokeWidthKebabCase === true ? Number(strokeWidth || strokeWidthKebabCase || defaultAttributes["stroke-width"]) * 24 / Number(size) : strokeWidth || strokeWidthKebabCase || defaultAttributes["stroke-width"],
			class: mergeClasses("lucide", props.class, ...name ? [`lucide-${toKebabCase(toPascalCase(name))}-icon`, `lucide-${toKebabCase(name)}`] : ["lucide-icon"])
		}, [...iconNode.map((child) => h$1(...child)), ...slots.default ? [slots.default()] : []]);
	};
	var createLucideIcon = (iconName, iconNode) => (props, { slots, attrs }) => h$1(Icon, {
		...attrs,
		...props,
		iconNode,
		name: iconName
	}, slots);
	var ArrowLeft = createLucideIcon("arrow-left", [["path", {
		d: "m12 19-7-7 7-7",
		key: "1l729n"
	}], ["path", {
		d: "M19 12H5",
		key: "x3x0zl"
	}]]);
	var Bookmark = createLucideIcon("bookmark", [["path", {
		d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",
		key: "1fy3hk"
	}]]);
	var Check = createLucideIcon("check", [["path", {
		d: "M20 6 9 17l-5-5",
		key: "1gmf2c"
	}]]);
	var ChevronDown = createLucideIcon("chevron-down", [["path", {
		d: "m6 9 6 6 6-6",
		key: "qrunsl"
	}]]);
	var CircleCheck = createLucideIcon("circle-check", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "m9 12 2 2 4-4",
		key: "dzmm74"
	}]]);
	var Download = createLucideIcon("download", [
		["path", {
			d: "M12 15V3",
			key: "m9g1x1"
		}],
		["path", {
			d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
			key: "ih7n3h"
		}],
		["path", {
			d: "m7 10 5 5 5-5",
			key: "brsn70"
		}]
	]);
	var Ellipsis = createLucideIcon("ellipsis", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "1",
			key: "41hilf"
		}],
		["circle", {
			cx: "19",
			cy: "12",
			r: "1",
			key: "1wjl8i"
		}],
		["circle", {
			cx: "5",
			cy: "12",
			r: "1",
			key: "1pcz8c"
		}]
	]);
	var FolderOpen = createLucideIcon("folder-open", [["path", {
		d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
		key: "usdka0"
	}]]);
	var Grid2x2 = createLucideIcon("grid-2x2", [
		["path", {
			d: "M12 3v18",
			key: "108xh3"
		}],
		["path", {
			d: "M3 12h18",
			key: "1i2n21"
		}],
		["rect", {
			x: "3",
			y: "3",
			width: "18",
			height: "18",
			rx: "2",
			key: "h1oib"
		}]
	]);
	var Info = createLucideIcon("info", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M12 16v-4",
			key: "1dtifu"
		}],
		["path", {
			d: "M12 8h.01",
			key: "e9boi3"
		}]
	]);
	var Layers = createLucideIcon("layers", [
		["path", {
			d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
			key: "zw3jo"
		}],
		["path", {
			d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
			key: "1wduqc"
		}],
		["path", {
			d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
			key: "kqbvx6"
		}]
	]);
	var List = createLucideIcon("list", [
		["path", {
			d: "M3 5h.01",
			key: "18ugdj"
		}],
		["path", {
			d: "M3 12h.01",
			key: "nlz23k"
		}],
		["path", {
			d: "M3 19h.01",
			key: "noohij"
		}],
		["path", {
			d: "M8 5h13",
			key: "1pao27"
		}],
		["path", {
			d: "M8 12h13",
			key: "1za7za"
		}],
		["path", {
			d: "M8 19h13",
			key: "m83p4d"
		}]
	]);
	var MapPin = createLucideIcon("map-pin", [["path", {
		d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
		key: "1r0f0z"
	}], ["circle", {
		cx: "12",
		cy: "10",
		r: "3",
		key: "ilqhr7"
	}]]);
	var Pencil = createLucideIcon("pencil", [["path", {
		d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
		key: "1a8usu"
	}], ["path", {
		d: "m15 5 4 4",
		key: "1mk7zo"
	}]]);
	var Plus = createLucideIcon("plus", [["path", {
		d: "M5 12h14",
		key: "1ays0h"
	}], ["path", {
		d: "M12 5v14",
		key: "s699le"
	}]]);
	var Search = createLucideIcon("search", [["path", {
		d: "m21 21-4.34-4.34",
		key: "14j7rj"
	}], ["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}]]);
	var Settings2 = createLucideIcon("settings-2", [
		["path", {
			d: "M14 17H5",
			key: "gfn3mx"
		}],
		["path", {
			d: "M19 7h-9",
			key: "6i9tg"
		}],
		["circle", {
			cx: "17",
			cy: "17",
			r: "3",
			key: "18b49y"
		}],
		["circle", {
			cx: "7",
			cy: "7",
			r: "3",
			key: "dfmy0x"
		}]
	]);
	var SlidersHorizontal = createLucideIcon("sliders-horizontal", [
		["path", {
			d: "M10 5H3",
			key: "1qgfaw"
		}],
		["path", {
			d: "M12 19H3",
			key: "yhmn1j"
		}],
		["path", {
			d: "M14 3v4",
			key: "1sua03"
		}],
		["path", {
			d: "M16 17v4",
			key: "1q0r14"
		}],
		["path", {
			d: "M21 12h-9",
			key: "1o4lsq"
		}],
		["path", {
			d: "M21 19h-5",
			key: "1rlt1p"
		}],
		["path", {
			d: "M21 5h-7",
			key: "1oszz2"
		}],
		["path", {
			d: "M8 10v4",
			key: "tgpxqk"
		}],
		["path", {
			d: "M8 12H3",
			key: "a7s4jb"
		}]
	]);
	var Trash2 = createLucideIcon("trash-2", [
		["path", {
			d: "M10 11v6",
			key: "nco0om"
		}],
		["path", {
			d: "M14 11v6",
			key: "outv1u"
		}],
		["path", {
			d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
			key: "miytrc"
		}],
		["path", {
			d: "M3 6h18",
			key: "d0wm0j"
		}],
		["path", {
			d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
			key: "e791ji"
		}]
	]);
	var TriangleAlert = createLucideIcon("triangle-alert", [
		["path", {
			d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
			key: "wmoenq"
		}],
		["path", {
			d: "M12 9v4",
			key: "juzpu7"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	]);
	var Upload = createLucideIcon("upload", [
		["path", {
			d: "M12 3v12",
			key: "1x0j5s"
		}],
		["path", {
			d: "m17 8-5-5-5 5",
			key: "7q97r8"
		}],
		["path", {
			d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
			key: "ih7n3h"
		}]
	]);
	var X = createLucideIcon("x", [["path", {
		d: "M18 6 6 18",
		key: "1bl5f8"
	}], ["path", {
		d: "m6 6 12 12",
		key: "d8bk6v"
	}]]);
	var CATEGORY_META = {
		home: {
			label: "Home",
			emoji: "🏠"
		},
		"beginners-guide": {
			label: "Beginner's Guide",
			emoji: "📖"
		},
		posts: {
			label: "Posts",
			emoji: "📰"
		},
		privacy: {
			label: "Adblocking / Privacy",
			emoji: "🛡️"
		},
		ai: {
			label: "Artificial Intelligence",
			emoji: "🤖"
		},
		video: {
			label: "Movies / TV / Anime",
			emoji: "🎬"
		},
		audio: {
			label: "Music / Podcasts / Radio",
			emoji: "🎵"
		},
		gaming: {
			label: "Gaming / Emulation",
			emoji: "🎮"
		},
		reading: {
			label: "Books / Comics / Manga",
			emoji: "📚"
		},
		downloading: {
			label: "Downloading",
			emoji: "⬇️"
		},
		torrenting: {
			label: "Torrenting",
			emoji: "🧲"
		},
		educational: {
			label: "Educational",
			emoji: "🎓"
		},
		mobile: {
			label: "Android / iOS",
			emoji: "📱"
		},
		"linux-macos": {
			label: "Linux / macOS",
			emoji: "🐧"
		},
		"non-english": {
			label: "Non-English",
			emoji: "🌐"
		},
		misc: {
			label: "Miscellaneous",
			emoji: "📦"
		},
		other: {
			label: "More",
			emoji: "📄"
		},
		storage: {
			label: "Storage",
			emoji: "💾"
		},
		unsafe: {
			label: "Unsafe Sites",
			emoji: "⚠️"
		},
		"recently-removed": {
			label: "Recently Removed",
			emoji: "🗑️"
		},
		feedback: {
			label: "Feedback",
			emoji: "💬"
		},
		startpage: {
			label: "Startpage",
			emoji: "🚀"
		},
		"developer-tools": {
			label: "Tools",
			emoji: "🛠️"
		},
		"file-tools": {
			label: "Tools",
			emoji: "🛠️"
		},
		"gaming-tools": {
			label: "Tools",
			emoji: "🛠️"
		},
		"image-tools": {
			label: "Tools",
			emoji: "🛠️"
		},
		"internet-tools": {
			label: "Tools",
			emoji: "🛠️"
		},
		"social-media-tools": {
			label: "Tools",
			emoji: "🛠️"
		},
		"system-tools": {
			label: "Tools",
			emoji: "🛠️"
		},
		"text-tools": {
			label: "Tools",
			emoji: "🛠️"
		},
		"video-tools": {
			label: "Tools",
			emoji: "🛠️"
		}
	};
	function humanize(value) {
		return value.split(/[-_/]+/).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
	}
	function categoryForPath(path) {
		const first = path.split("/").filter(Boolean)[0] ?? "home";
		const meta = CATEGORY_META[first];
		return {
			slug: first,
			label: meta?.label ?? humanize(first),
			emoji: meta?.emoji ?? "📄"
		};
	}
	var COLLECTION_COLORS = [
		"hsl(211, 63%, 61%)",
		"hsl(188, 86%, 43%)",
		"hsl(0, 84%, 60%)",
		"hsl(346, 77%, 57%)",
		"hsl(158, 77%, 42%)",
		"hsl(45, 93%, 47%)",
		"hsl(242, 91%, 64%)"
	];
	function normalisePath(path) {
		if (!path) return "/";
		return path.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
	}
	var PAGE_TITLE_SELECTORS = [
		".fmhy-page-header h1",
		".VPHero h1",
		".vp-doc h1",
		".vp-doc h2"
	];
	var SKIP_LINK_SELECTORS = [
		".header-anchor",
		".VPDocAside",
		".VPSidebar",
		".VPNav",
		".VPFooter",
		".fmhy-sp-page",
		".fmhy-sp-editor",
		".fmhy-sp-modal",
		"pre",
		"code"
	];
	function clean(value) {
		return (value ?? "").replace(/\u200b/g, "").replace(/\s+/g, " ").trim();
	}
	function cleanHeading(value) {
		return clean(value).replace(/\s*#\s*$/, "").trim();
	}
	function titleFromDocument() {
		return clean(document.title).replace(/\s*[•|]\s*freemediaheckyeah.*$/i, "").replace(/\s*[•|]\s*FMHY.*$/i, "").trim();
	}
	function pageTitle() {
		for (const selector of PAGE_TITLE_SELECTORS) {
			const heading = document.querySelector(selector);
			if (!heading) continue;
			const clone = heading.cloneNode(true);
			clone.querySelectorAll(".fmhy-sp-link-save, .header-anchor, [data-fmhy-link-control]").forEach((node) => node.remove());
			const text = cleanHeading(clone.textContent);
			if (text) return text;
		}
		return titleFromDocument() || "FMHY";
	}
	function sourceMeta() {
		const path = normalisePath(window.location.pathname);
		const category = categoryForPath(path);
		const source = new URL(window.location.href);
		source.hash = "";
		return {
			category: category.slug,
			categoryLabel: category.label,
			categoryEmoji: category.emoji,
			sourcePath: path,
			sourceTitle: pageTitle(),
			sourceHost: source.host,
			sourceUrl: source.href
		};
	}
	function normaliseExternalUrl(value, base = window.location.href) {
		if (!value) return null;
		let url;
		try {
			url = new URL(value, base);
		} catch {
			return null;
		}
		if (url.protocol !== "http:" && url.protocol !== "https:") return null;
		if (url.origin === window.location.origin) return null;
		if (url.hostname === "fmhy.net" || url.hostname === "www.fmhy.net") return null;
		url.hash = "";
		return url.href;
	}
	function domainForUrl(url) {
		try {
			return new URL(url).hostname.replace(/^www\./, "");
		} catch {
			return url;
		}
	}
	function iconLabel(anchor) {
		const icon = anchor.querySelector("[alt], img[alt], [aria-label]");
		return clean(icon?.getAttribute("alt")) || clean(icon?.getAttribute("aria-label"));
	}
	function isSavableLink(anchor) {
		if (!normaliseExternalUrl(anchor.getAttribute("href"))) return false;
		for (const selector of SKIP_LINK_SELECTORS) if (anchor.closest(selector)) return false;
		const raw = clean(anchor.textContent) || clean(anchor.getAttribute("aria-label")) || clean(anchor.getAttribute("title")) || iconLabel(anchor);
		return Boolean(raw);
	}
	function primaryTitle(anchor) {
		const item = anchor.closest("li");
		if (!item) return "";
		const first = Array.from(item.querySelectorAll("a[href]")).find((candidate) => candidate !== anchor && normaliseExternalUrl(candidate.getAttribute("href")) && !candidate.closest(".header-anchor"));
		return first ? clean(first.textContent) || iconLabel(first) : "";
	}
	function rawLabel(anchor) {
		return clean(anchor.textContent) || clean(anchor.getAttribute("aria-label")) || clean(anchor.getAttribute("title")) || iconLabel(anchor);
	}
	function isAliasLink(anchor) {
		const raw = rawLabel(anchor);
		return /^\d{1,2}$/.test(raw) || /^(mirrors?|alt(ernate)?(\s*\d+)?)$/i.test(raw);
	}
	function linkTitle(anchor) {
		const raw = rawLabel(anchor);
		if (!raw) return domainForUrl(anchor.href);
		if (!Boolean(clean(anchor.textContent))) {
			const base = primaryTitle(anchor);
			return base ? `${base} (${raw})` : raw;
		}
		if (/^\d{1,2}$/.test(raw)) {
			const base = primaryTitle(anchor);
			return base ? `${base} (mirror ${raw})` : raw;
		}
		if (/^(mirrors?|alt(ernate)?(\s*\d+)?)$/i.test(raw)) {
			const base = primaryTitle(anchor);
			return base ? `${base} (${raw.toLowerCase()})` : raw;
		}
		return raw;
	}
	function nearestHeading(anchor) {
		const headings = Array.from(document.querySelectorAll(".vp-doc h2[id], .vp-doc h3[id], .vp-doc h4[id]"));
		let active;
		for (const heading of headings) if (heading.compareDocumentPosition(anchor) & Node.DOCUMENT_POSITION_FOLLOWING) active = heading;
		else break;
		return active;
	}
	function nearbyDescription(anchor, title) {
		const container = anchor.closest("li, p, td, dd, blockquote") ?? anchor.parentElement;
		if (!container) return "";
		const clone = container.cloneNode(true);
		clone.querySelectorAll(".fmhy-sp-link-save, .header-anchor, [data-fmhy-link-control]").forEach((node) => node.remove());
		clone.querySelectorAll("a[href]").forEach((link) => {
			const label = clean(link.textContent);
			if (/^\d{1,2}$/.test(label) || /^(mirrors?|alt(ernate)?(\s*\d+)?)$/i.test(label)) link.remove();
		});
		let text = clean(clone.textContent);
		if (!text) return "";
		if (text.toLowerCase().startsWith(title.toLowerCase())) text = text.slice(title.length).trim();
		text = text.replace(/^[\s,;:•|–—-]+/, "").replace(/(?:\s*\/\s*){2,}/g, " · ").replace(/\s*\/\s*$/, "").replace(/[·,;:\s]+$/, "").trim();
		if (!text || text.toLowerCase() === title.toLowerCase()) return "";
		return text.length > 220 ? `${text.slice(0, 217).trimEnd()}…` : text;
	}
	function readLinkMeta(anchor) {
		const url = normaliseExternalUrl(anchor.getAttribute("href"));
		if (!url) return null;
		const title = linkTitle(anchor) || domainForUrl(url);
		const heading = nearestHeading(anchor);
		return {
			url,
			title,
			description: nearbyDescription(anchor, title),
			domain: domainForUrl(url),
			...sourceMeta(),
			contextHeading: heading ? cleanHeading(heading.textContent) || void 0 : void 0,
			contextAnchor: heading?.id || void 0
		};
	}
	var STORAGE_KEY = "fmhy-saved-links.v1";
	var CHANGE_EVENT = "fmhy-saved-links:changed";
	var READ_LATER_COLOR = "hsl(211, 63%, 61%)";
	function createDefaultState() {
		return {
			version: 1,
			items: [],
			collections: [{
				id: "read-later",
				name: "Read later",
				color: READ_LATER_COLOR,
				system: true,
				createdAt: 0
			}]
		};
	}
	function parseJson(value) {
		if (typeof value !== "string" || !value) return void 0;
		try {
			return JSON.parse(value);
		} catch {
			return;
		}
	}
	function gmValue(key, fallback) {
		try {
			if (typeof GM_getValue === "function") {
				const value = GM_getValue(key, void 0);
				if (value !== void 0 && value !== null) return value;
			}
		} catch {}
		try {
			const value = window.localStorage.getItem(key);
			if (value !== null) return value;
		} catch {}
		return fallback;
	}
	function gmSet(key, value) {
		try {
			if (typeof GM_setValue === "function") {
				GM_setValue(key, value);
				return;
			}
		} catch {}
		try {
			window.localStorage.setItem(key, value);
		} catch {}
	}
	function isCollection(value) {
		if (!value || typeof value !== "object") return false;
		const collection = value;
		return typeof collection.id === "string" && typeof collection.name === "string";
	}
	function isSavedLink(value) {
		if (!value || typeof value !== "object") return false;
		const item = value;
		return typeof item.url === "string" && normaliseExternalUrl(item.url) !== null && typeof item.title === "string" && typeof item.category === "string" && typeof item.savedAt === "number";
	}
	function sanitiseItem(item, collectionIds) {
		const url = normaliseExternalUrl(item.url) ?? item.url;
		return {
			url,
			title: item.title || domainForUrl(url),
			description: typeof item.description === "string" ? item.description : "",
			domain: item.domain || domainForUrl(url),
			category: item.category || "other",
			categoryLabel: item.categoryLabel || "More",
			categoryEmoji: item.categoryEmoji || "📄",
			contextHeading: item.contextHeading,
			contextAnchor: item.contextAnchor,
			sourcePath: normalisePath(item.sourcePath || "/"),
			sourceTitle: item.sourceTitle || "FMHY",
			sourceHost: item.sourceHost || "",
			sourceUrl: item.sourceUrl || "",
			collections: Array.isArray(item.collections) ? item.collections.filter((id) => typeof id === "string" && collectionIds.has(id)) : [],
			note: typeof item.note === "string" ? item.note : "",
			savedAt: Number.isFinite(item.savedAt) ? item.savedAt : Date.now(),
			updatedAt: Number.isFinite(item.updatedAt) ? item.updatedAt : item.savedAt
		};
	}
	function sanitiseState(raw) {
		if (!raw || typeof raw !== "object") return createDefaultState();
		const candidate = raw;
		const base = createDefaultState();
		const collections = Array.isArray(candidate.collections) ? candidate.collections.filter(isCollection).map((collection) => ({
			id: collection.id,
			name: collection.name,
			color: collection.color || READ_LATER_COLOR,
			system: collection.id === "read-later" || collection.system === true,
			createdAt: Number.isFinite(collection.createdAt) ? collection.createdAt : Date.now()
		})) : [];
		if (!collections.some((collection) => collection.id === "read-later")) collections.unshift(base.collections[0]);
		const uniqueCollections = collections.filter((collection, index, all) => all.findIndex((entry) => entry.id === collection.id) === index);
		const collectionIds = new Set(uniqueCollections.map((collection) => collection.id));
		return {
			version: 1,
			items: Array.isArray(candidate.items) ? candidate.items.filter(isSavedLink).map((item) => sanitiseItem(item, collectionIds)).filter((item, index, all) => all.findIndex((entry) => entry.url === item.url) === index) : [],
			collections: uniqueCollections
		};
	}
	function loadState() {
		return sanitiseState(parseJson(gmValue(STORAGE_KEY, "")));
	}
	function persistState(state) {
		try {
			gmSet(STORAGE_KEY, JSON.stringify(state));
		} catch {}
	}
	function announceChange(state) {
		try {
			window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { count: state.items.length } }));
		} catch {}
	}
	var state = reactive(loadState());
	var libraryRevision = ref(0);
	var items = computed(() => [...state.items].sort((left, right) => right.savedAt - left.savedAt));
	var collections = computed(() => [...state.collections].sort((left, right) => {
		if (left.id === "read-later") return -1;
		if (right.id === "read-later") return 1;
		return left.createdAt - right.createdAt;
	}));
	var savedCount = computed(() => state.items.length);
	function getLink(url) {
		return state.items.find((item) => item.url === url);
	}
	function getCollection(id) {
		return state.collections.find((collection) => collection.id === id);
	}
	function countForCollection(id) {
		return state.items.filter((item) => item.collections.includes(id)).length;
	}
	function commit() {
		libraryRevision.value += 1;
		persistState(state);
		announceChange(state);
	}
	function readLaterId() {
		if (state.collections.some((collection) => collection.id === "read-later")) return "read-later";
		state.collections.unshift(createDefaultState().collections[0]);
		return "read-later";
	}
	function uniqueIds(ids) {
		return ids.filter((id, index) => ids.indexOf(id) === index && Boolean(getCollection(id)));
	}
	function quickSave(meta) {
		const existing = getLink(meta.url);
		if (existing) return existing;
		const now = Date.now();
		const item = {
			...meta,
			collections: [readLaterId()],
			note: "",
			savedAt: now,
			updatedAt: now
		};
		state.items.push(item);
		commit();
		return item;
	}
	function saveLink(meta, collectionIds, note) {
		const now = Date.now();
		const existing = getLink(meta.url);
		const nextCollections = uniqueIds(collectionIds);
		if (nextCollections.length === 0) nextCollections.push(readLaterId());
		if (existing) {
			Object.assign(existing, {
				title: meta.title,
				description: meta.description,
				domain: meta.domain,
				category: meta.category,
				categoryLabel: meta.categoryLabel,
				categoryEmoji: meta.categoryEmoji,
				contextHeading: meta.contextHeading,
				contextAnchor: meta.contextAnchor,
				sourcePath: meta.sourcePath,
				sourceTitle: meta.sourceTitle,
				sourceHost: meta.sourceHost,
				sourceUrl: meta.sourceUrl,
				collections: nextCollections,
				note: note.trim(),
				updatedAt: now
			});
			commit();
			return existing;
		}
		const item = {
			...meta,
			collections: nextCollections,
			note: note.trim(),
			savedAt: now,
			updatedAt: now
		};
		state.items.push(item);
		commit();
		return item;
	}
	function removeLink(url) {
		const index = state.items.findIndex((item) => item.url === url);
		if (index < 0) return void 0;
		const [removed] = state.items.splice(index, 1);
		commit();
		return removed;
	}
	function restoreLink(item) {
		if (getLink(item.url)) return;
		state.items.push(item);
		commit();
	}
	function restoreLinks(list) {
		let changed = false;
		for (const item of list) {
			if (getLink(item.url)) continue;
			state.items.push(item);
			changed = true;
		}
		if (changed) commit();
	}
	function createCollection(name, color) {
		const trimmed = name.trim();
		if (!trimmed) return null;
		const collection = {
			id: `col-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
			name: trimmed,
			color,
			createdAt: Date.now()
		};
		state.collections.push(collection);
		commit();
		return collection;
	}
	function renameCollection(id, name) {
		const collection = getCollection(id);
		const trimmed = name.trim();
		if (!collection || collection.system || !trimmed) return;
		collection.name = trimmed;
		commit();
	}
	function deleteCollection(id) {
		const collection = getCollection(id);
		if (!collection || collection.system) return;
		state.collections = state.collections.filter((entry) => entry.id !== id);
		for (const item of state.items) {
			item.collections = item.collections.filter((entry) => entry !== id);
			if (item.collections.length === 0) item.collections = [readLaterId()];
		}
		commit();
	}
	function clearItems() {
		const count = state.items.length;
		state.items.splice(0, state.items.length);
		commit();
		return count;
	}
	function syncFromStorage() {
		const next = loadState();
		state.items.splice(0, state.items.length, ...next.items);
		state.collections.splice(0, state.collections.length, ...next.collections);
		libraryRevision.value += 1;
		announceChange(state);
	}
	function exportLibrary() {
		return JSON.stringify({
			format: "fmhy-saved-links",
			version: 1,
			exportedAt: new Date().toISOString(),
			collections: state.collections,
			items: state.items
		}, null, 2);
	}
	function importLibrary(raw) {
		const next = sanitiseState(raw);
		let added = 0;
		let updated = 0;
		for (const importedCollection of next.collections) if (!getCollection(importedCollection.id)) state.collections.push(importedCollection);
		for (const imported of next.items) {
			const existing = getLink(imported.url);
			if (!existing) {
				state.items.push(imported);
				added += 1;
				continue;
			}
			const mergedCollections = uniqueIds([...existing.collections, ...imported.collections]);
			existing.collections = mergedCollections.length > 0 ? mergedCollections : [readLaterId()];
			if (!existing.note && imported.note) existing.note = imported.note;
			if (imported.updatedAt > existing.updatedAt) Object.assign(existing, {
				title: imported.title,
				description: imported.description,
				domain: imported.domain,
				category: imported.category,
				categoryLabel: imported.categoryLabel,
				categoryEmoji: imported.categoryEmoji,
				contextHeading: imported.contextHeading,
				contextAnchor: imported.contextAnchor,
				sourcePath: imported.sourcePath,
				sourceTitle: imported.sourceTitle,
				sourceHost: imported.sourceHost,
				sourceUrl: imported.sourceUrl,
				updatedAt: imported.updatedAt
			});
			updated += 1;
		}
		commit();
		return {
			added,
			updated,
			total: state.items.length
		};
	}
	var savedPageOpen = ref(window.location.hash === "#/saved");
	var editorOpen = ref(false);
	var editorState = ref(null);
	var toasts = ref([]);
	var toastTimers = new Map();
	var toastSequence = 0;
	function rectOf(element) {
		if (!element) return void 0;
		const rect = element.getBoundingClientRect();
		return {
			top: rect.top,
			right: rect.right,
			bottom: rect.bottom,
			left: rect.left
		};
	}
	function clearToasts() {
		for (const toast of [...toasts.value]) dismissToast(toast.id);
	}
	function openEditor(meta, anchorElement) {
		clearToasts();
		const existing = getLink(meta.url);
		editorState.value = {
			url: meta.url,
			meta: existing ? { ...existing } : meta,
			existing: Boolean(existing),
			anchor: rectOf(anchorElement)
		};
		editorOpen.value = true;
	}
	function openEditorForSaved(item, anchorElement) {
		clearToasts();
		editorState.value = {
			url: item.url,
			meta: { ...item },
			existing: true,
			anchor: rectOf(anchorElement)
		};
		editorOpen.value = true;
	}
	function closeEditor() {
		editorOpen.value = false;
		editorState.value = null;
	}
	function openSavedPage() {
		clearToasts();
		if (savedPageOpen.value) return;
		const returnHash = window.location.hash && window.location.hash !== "#/saved" ? window.location.hash : "";
		window.history.pushState({
			...window.history.state,
			fmhySavedOpen: true,
			returnHash
		}, "", `${window.location.pathname}${window.location.search}#/saved`);
		savedPageOpen.value = true;
		window.dispatchEvent(new CustomEvent("fmhy-saved:opened"));
	}
	function closeSavedPage() {
		if (!savedPageOpen.value) return;
		savedPageOpen.value = false;
		if (window.location.hash === "#/saved") {
			const returnHash = window.history.state && typeof window.history.state.returnHash === "string" ? window.history.state.returnHash : "";
			window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}${returnHash}`);
		}
	}
	function showToast(message, options = {}) {
		for (const previous of [...toasts.value]) dismissToast(previous.id);
		const id = ++toastSequence;
		toasts.value = [{
			id,
			message,
			tone: options.tone ?? "success",
			actions: options.actions ?? []
		}];
		const timer = window.setTimeout(() => dismissToast(id), options.duration ?? 5e3);
		toastTimers.set(id, timer);
		return id;
	}
	function dismissToast(id) {
		const timer = toastTimers.get(id);
		if (timer !== void 0) {
			window.clearTimeout(timer);
			toastTimers.delete(id);
		}
		toasts.value = toasts.value.filter((toast) => toast.id !== id);
	}
	function runToastAction(toast, action) {
		action.run();
		dismissToast(toast.id);
	}
	var isNarrow = ref(window.matchMedia("(max-width: 767px)").matches);
	var isCoarsePointer = ref(window.matchMedia("(pointer: coarse)").matches);
	var useSheetLayout = computed(() => isNarrow.value || isCoarsePointer.value);
	function initSavedRoute() {
		const sync = () => {
			const next = window.location.hash === "#/saved";
			if (next) clearToasts();
			savedPageOpen.value = next;
		};
		const onClick = (event) => {
			if (!savedPageOpen.value) return;
			const target = event.target;
			if (!(target instanceof Element)) return;
			const anchor = target.closest("a[href]");
			if (!anchor) return;
			if (anchor.target === "_blank" || event.metaKey || event.ctrlKey || event.shiftKey) return;
			if (anchor.hasAttribute("download")) return;
			const href = anchor.getAttribute("href");
			if (!href || href === "#/saved" || href.startsWith("#/saved?") || href.startsWith("blob:") || href.startsWith("data:")) return;
			closeSavedPage();
		};
		const mediaNarrow = window.matchMedia("(max-width: 767px)");
		const mediaCoarse = window.matchMedia("(pointer: coarse)");
		const syncNarrow = (event) => {
			isNarrow.value = event.matches;
		};
		const syncCoarse = (event) => {
			isCoarsePointer.value = event.matches;
		};
		window.addEventListener("popstate", sync);
		window.addEventListener("hashchange", sync);
		document.addEventListener("click", onClick, true);
		mediaNarrow.addEventListener("change", syncNarrow);
		mediaCoarse.addEventListener("change", syncCoarse);
		return () => {
			window.removeEventListener("popstate", sync);
			window.removeEventListener("hashchange", sync);
			document.removeEventListener("click", onClick, true);
			mediaNarrow.removeEventListener("change", syncNarrow);
			mediaCoarse.removeEventListener("change", syncCoarse);
		};
	}
	function openLinkEditor(meta, anchor) {
		const existing = getLink(meta.url);
		openEditor(existing ? { ...existing } : meta, anchor);
	}
	function quickSaveLink(meta, anchor) {
		const existing = getLink(meta.url);
		if (existing) {
			openLinkEditor(meta, anchor);
			return existing;
		}
		const item = quickSave(meta);
		showToast(`Saved “${item.title}” to Read later`, { actions: [{
			label: "Add to collection",
			run: () => openEditor({ ...item }, anchor)
		}, {
			label: "Undo",
			run: () => {
				removeLink(item.url);
			}
		}] });
		return item;
	}
	function removeLinkWithUndo(item) {
		const removed = removeLink(item.url);
		if (!removed) return;
		showToast(`Removed “${removed.title}”`, {
			tone: "info",
			actions: [{
				label: "Undo",
				run: () => restoreLink(removed)
			}]
		});
	}
	var RELATIVE = new Intl.RelativeTimeFormat(void 0, { numeric: "auto" });
	var UNITS = [
		["year", 31536e6],
		["month", 2592e6],
		["week", 6048e5],
		["day", 864e5],
		["hour", 36e5],
		["minute", 6e4]
	];
	function formatRelative(timestamp, now = Date.now()) {
		const diff = timestamp - now;
		const absolute = Math.abs(diff);
		if (absolute < 45e3) return "just now";
		for (const [unit, duration] of UNITS) if (absolute >= duration) return RELATIVE.format(Math.round(diff / duration), unit);
		return "just now";
	}
	function formatAbsolute(timestamp) {
		return new Intl.DateTimeFormat(void 0, {
			dateStyle: "medium",
			timeStyle: "short"
		}).format(new Date(timestamp));
	}
	function plural(count, singular, pluralForm = `${singular}s`) {
		return `${count.toLocaleString()} ${count === 1 ? singular : pluralForm}`;
	}
	var SETTINGS_KEY = "fmhy-saved-links.settings.v1";
	var DEFAULTS = {
		revealLinkActionsOnHover: true,
		dimVisitedLinks: true
	};
	function readRaw() {
		try {
			if (typeof GM_getValue === "function") {
				const value = GM_getValue(SETTINGS_KEY, void 0);
				if (value !== void 0 && value !== null) return value;
			}
		} catch {}
		try {
			const value = window.localStorage.getItem(SETTINGS_KEY);
			if (value) return JSON.parse(value);
		} catch {}
	}
	function writeRaw(value) {
		const serialized = JSON.stringify(value);
		try {
			if (typeof GM_setValue === "function") {
				GM_setValue(SETTINGS_KEY, serialized);
				return;
			}
		} catch {}
		try {
			window.localStorage.setItem(SETTINGS_KEY, serialized);
		} catch {}
	}
	function sanitise(value) {
		if (!value || typeof value !== "object") return { ...DEFAULTS };
		const candidate = value;
		return {
			revealLinkActionsOnHover: typeof candidate.revealLinkActionsOnHover === "boolean" ? candidate.revealLinkActionsOnHover : DEFAULTS.revealLinkActionsOnHover,
			dimVisitedLinks: typeof candidate.dimVisitedLinks === "boolean" ? candidate.dimVisitedLinks : DEFAULTS.dimVisitedLinks
		};
	}
	var settings = reactive(sanitise(readRaw()));
	function applySettingsToDocument() {
		document.documentElement.classList.toggle("fmhy-sp-hover-link-actions", settings.revealLinkActionsOnHover);
		document.documentElement.classList.toggle("fmhy-sp-dim-visited", settings.dimVisitedLinks);
	}
	function setRevealLinkActionsOnHover(value) {
		settings.revealLinkActionsOnHover = value;
		writeRaw({ ...settings });
		applySettingsToDocument();
	}
	function setDimVisitedLinks(value) {
		settings.dimVisitedLinks = value;
		writeRaw({ ...settings });
		applySettingsToDocument();
	}
	function syncSettingsFromStorage() {
		Object.assign(settings, sanitise(readRaw()));
		applySettingsToDocument();
	}
	var _hoisted_1$3 = { class: "fmhy-sp-page-shell" };
	var _hoisted_2$3 = { class: "fmhy-sp-page-top" };
	var _hoisted_3$2 = { class: "fmhy-sp-menu-wrap" };
	var _hoisted_4$2 = ["aria-expanded"];
	var _hoisted_5$2 = { class: "fmhy-sp-page-header" };
	var _hoisted_6$1 = {
		class: "fmhy-sp-stats",
		"aria-label": "Library summary"
	};
	var _hoisted_7$1 = { class: "fmhy-sp-stat" };
	var _hoisted_8$1 = { class: "fmhy-sp-stat" };
	var _hoisted_9$1 = { class: "fmhy-sp-stat" };
	var _hoisted_10$1 = { class: "fmhy-sp-toolbar" };
	var _hoisted_11$1 = { class: "fmhy-sp-search" };
	var _hoisted_12$1 = {
		key: 0,
		class: "fmhy-sp-kbd",
		"aria-hidden": "true"
	};
	var _hoisted_13$1 = {
		class: "fmhy-sp-tabs",
		role: "tablist",
		"aria-label": "Collections"
	};
	var _hoisted_14$1 = ["aria-selected", "onClick"];
	var _hoisted_15$1 = { class: "fmhy-sp-tab-count" };
	var _hoisted_16$1 = { class: "fmhy-sp-results-head" };
	var _hoisted_17$1 = { class: "fmhy-sp-results-copy" };
	var _hoisted_18$1 = { key: 0 };
	var _hoisted_19$1 = { class: "fmhy-sp-controls" };
	var _hoisted_20$1 = { class: "fmhy-sp-select-wrap" };
	var _hoisted_21$1 = ["value"];
	var _hoisted_22$1 = { class: "fmhy-sp-select-wrap" };
	var _hoisted_23$1 = ["value"];
	var _hoisted_24$1 = { class: "fmhy-sp-select-wrap" };
	var _hoisted_25$1 = { class: "fmhy-sp-select-wrap" };
	var _hoisted_26$1 = {
		class: "fmhy-sp-view-toggle",
		role: "group",
		"aria-label": "Layout"
	};
	var _hoisted_27 = ["aria-pressed"];
	var _hoisted_28 = ["aria-pressed"];
	var _hoisted_29 = {
		key: 0,
		class: "fmhy-sp-empty"
	};
	var _hoisted_30 = {
		class: "fmhy-sp-empty-icon",
		"aria-hidden": "true"
	};
	var _hoisted_31 = {
		key: 1,
		class: "fmhy-sp-empty"
	};
	var _hoisted_32 = {
		class: "fmhy-sp-empty-icon",
		"aria-hidden": "true"
	};
	var _hoisted_33 = { class: "fmhy-sp-card-head" };
	var _hoisted_34 = ["href"];
	var _hoisted_35 = { class: "fmhy-sp-card-actions" };
	var _hoisted_36 = [
		"href",
		"aria-label",
		"title"
	];
	var _hoisted_37 = [
		"aria-label",
		"aria-expanded",
		"onClick"
	];
	var _hoisted_38 = ["aria-label", "onClick"];
	var _hoisted_39 = ["aria-label", "onClick"];
	var _hoisted_40 = {
		key: 0,
		class: "fmhy-sp-card-desc"
	};
	var _hoisted_41 = {
		key: 1,
		class: "fmhy-sp-card-note"
	};
	var _hoisted_42 = {
		key: 2,
		class: "fmhy-sp-card-details"
	};
	var _hoisted_43 = { class: "fmhy-sp-card-detail" };
	var _hoisted_44 = { class: "fmhy-sp-card-detail" };
	var _hoisted_45 = { class: "fmhy-sp-card-detail" };
	var _hoisted_46 = { class: "fmhy-sp-mono" };
	var _hoisted_47 = { class: "fmhy-sp-card-detail" };
	var _hoisted_48 = { class: "fmhy-sp-card-footer" };
	var _hoisted_49 = { class: "fmhy-sp-card-collections" };
	var _hoisted_50 = {
		key: 0,
		class: "fmhy-sp-muted"
	};
	var _hoisted_51 = ["title"];
	var _hoisted_52 = { class: "fmhy-sp-privacy" };
	var _hoisted_53 = {
		class: "fmhy-sp-modal is-small",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "fmhy-sp-create-title"
	};
	var _hoisted_54 = { class: "fmhy-sp-modal-head" };
	var _hoisted_55 = { class: "fmhy-sp-modal-body" };
	var _hoisted_56 = ["onKeydown"];
	var _hoisted_57 = {
		class: "fmhy-sp-swatches",
		role: "group",
		"aria-label": "Collection colour"
	};
	var _hoisted_58 = [
		"aria-label",
		"aria-pressed",
		"onClick"
	];
	var _hoisted_59 = {
		key: 0,
		class: "fmhy-sp-error"
	};
	var _hoisted_60 = { class: "fmhy-sp-modal-footer" };
	var _hoisted_61 = {
		class: "fmhy-sp-modal",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "fmhy-sp-manage-title"
	};
	var _hoisted_62 = { class: "fmhy-sp-modal-head" };
	var _hoisted_63 = { class: "fmhy-sp-modal-body" };
	var _hoisted_64 = { class: "fmhy-sp-manage-list" };
	var _hoisted_65 = [
		"onUpdate:modelValue",
		"disabled",
		"aria-label",
		"onBlur",
		"onKeydown"
	];
	var _hoisted_66 = { class: "fmhy-sp-muted fmhy-sp-manage-count" };
	var _hoisted_67 = {
		key: 0,
		class: "fmhy-sp-tag"
	};
	var _hoisted_68 = {
		key: 0,
		class: "fmhy-sp-inline-confirm"
	};
	var _hoisted_69 = ["onClick"];
	var _hoisted_70 = ["aria-label", "onClick"];
	var _hoisted_71 = { class: "fmhy-sp-modal-footer" };
	var _hoisted_72 = {
		class: "fmhy-sp-modal is-small",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "fmhy-sp-settings-title"
	};
	var _hoisted_73 = { class: "fmhy-sp-modal-head" };
	var _hoisted_74 = { class: "fmhy-sp-modal-body" };
	var _hoisted_75 = { class: "fmhy-sp-setting-row" };
	var _hoisted_76 = { class: "fmhy-sp-switch" };
	var _hoisted_77 = { class: "fmhy-sp-setting-row" };
	var _hoisted_78 = { class: "fmhy-sp-switch" };
	var _hoisted_79 = { class: "fmhy-sp-modal-footer" };
	var _hoisted_80 = {
		class: "fmhy-sp-modal is-small",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "fmhy-sp-clear-title"
	};
	var _hoisted_81 = { class: "fmhy-sp-modal-head" };
	var _hoisted_82 = { class: "fmhy-sp-modal-body" };
	var _hoisted_83 = { class: "fmhy-sp-modal-copy" };
	var _hoisted_84 = { class: "fmhy-sp-modal-footer" };
	var SavedPage_default = defineComponent({
		__name: "SavedPage",
		setup(__props) {
			const pageRoot = ref(null);
			const searchInput = ref(null);
			const importInput = ref(null);
			const newNameInput = ref(null);
			const query = ref("");
			const activeCollection = ref("all");
			const activeSection = ref("all");
			const activeSource = ref("all");
			const dateFilter = ref("all");
			const sort = ref("newest");
			const view = ref("grid");
			const menuOpen = ref(false);
			const createOpen = ref(false);
			const manageOpen = ref(false);
			const clearOpen = ref(false);
			const settingsOpen = ref(false);
			const newName = ref("");
			const newColor = ref(COLLECTION_COLORS[0]);
			const nameError = ref("");
			const renameDrafts = ref({});
			const deleteConfirmId = ref(null);
			const expandedUrl = ref(null);
			const revealOnHover = computed({
				get: () => settings.revealLinkActionsOnHover,
				set: (value) => setRevealLinkActionsOnHover(value)
			});
			const dimVisited = computed({
				get: () => settings.dimVisitedLinks,
				set: (value) => setDimVisitedLinks(value)
			});
			const sections = computed(() => {
				const map = new Map();
				for (const item of items.value) {
					const entry = map.get(item.category);
					if (entry) entry.count += 1;
					else map.set(item.category, {
						slug: item.category,
						label: item.categoryLabel,
						emoji: item.categoryEmoji,
						count: 1
					});
				}
				return [...map.values()].sort((left, right) => left.label.localeCompare(right.label));
			});
			const sources = computed(() => {
				const map = new Map();
				for (const item of items.value) {
					const entry = map.get(item.sourcePath);
					if (entry) entry.count += 1;
					else map.set(item.sourcePath, {
						path: item.sourcePath,
						title: item.sourceTitle,
						count: 1
					});
				}
				return [...map.values()].sort((left, right) => left.title.localeCompare(right.title));
			});
			const collectionTabs = computed(() => [{
				id: "all",
				name: "All saved",
				color: "var(--vp-c-brand-1)",
				count: items.value.length
			}, ...collections.value.map((collection) => ({
				id: collection.id,
				name: collection.name,
				color: collection.color,
				count: countForCollection(collection.id)
			}))]);
			const activeCollectionName = computed(() => {
				if (activeCollection.value === "all") return "";
				return collections.value.find((entry) => entry.id === activeCollection.value)?.name ?? "";
			});
			const filtered = computed(() => {
				let list = [...items.value];
				if (activeCollection.value !== "all") list = list.filter((item) => item.collections.includes(activeCollection.value));
				if (activeSection.value !== "all") list = list.filter((item) => item.category === activeSection.value);
				if (activeSource.value !== "all") list = list.filter((item) => item.sourcePath === activeSource.value);
				if (dateFilter.value !== "all") {
					const now = Date.now();
					const startOfToday = new Date();
					startOfToday.setHours(0, 0, 0, 0);
					const cutoff = dateFilter.value === "today" ? startOfToday.getTime() : dateFilter.value === "week" ? now - 6048e5 : now - 2592e6;
					list = list.filter((item) => item.savedAt >= cutoff);
				}
				const needle = query.value.trim().toLowerCase();
				if (needle) list = list.filter((item) => {
					const collectionNames = item.collections.map((id) => getCollection(id)?.name ?? "").join(" ");
					return [
						item.title,
						item.description,
						item.note,
						item.domain,
						item.url,
						item.categoryLabel,
						item.categoryEmoji,
						item.sourceTitle,
						item.sourcePath,
						item.contextHeading ?? "",
						collectionNames
					].join(" ").toLowerCase().includes(needle);
				});
				list.sort((left, right) => {
					if (sort.value === "oldest") return left.savedAt - right.savedAt;
					if (sort.value === "title") return left.title.localeCompare(right.title);
					if (sort.value === "source") return left.sourceTitle.localeCompare(right.sourceTitle) || (left.contextHeading ?? "").localeCompare(right.contextHeading ?? "") || left.title.localeCompare(right.title);
					return right.savedAt - left.savedAt;
				});
				return list;
			});
			const filtersActive = computed(() => Boolean(query.value.trim()) || activeCollection.value !== "all" || activeSection.value !== "all" || activeSource.value !== "all" || dateFilter.value !== "all");
			const totalSources = computed(() => sources.value.length);
			function collectionColor(id) {
				return getCollection(id)?.color ?? "var(--vp-c-brand-1)";
			}
			function collectionName(id) {
				return getCollection(id)?.name ?? "Collection";
			}
			function visibleCollections(item) {
				return item.collections.slice(0, 3);
			}
			function toggleDetails(item) {
				expandedUrl.value = expandedUrl.value === item.url ? null : item.url;
			}
			function sourceHref(item) {
				const url = new URL(item.sourcePath || "/", window.location.origin);
				if (item.contextAnchor) url.hash = item.contextAnchor;
				return url.href;
			}
			function clearFilters() {
				query.value = "";
				activeCollection.value = "all";
				activeSection.value = "all";
				activeSource.value = "all";
				dateFilter.value = "all";
			}
			function onEdit(item, event) {
				event.preventDefault();
				event.stopPropagation();
				openEditorForSaved(item, event.currentTarget);
			}
			function onCardRemove(item) {
				removeLinkWithUndo(item);
			}
			function exportData() {
				menuOpen.value = false;
				const blob = new Blob([exportLibrary()], { type: "application/json" });
				const url = URL.createObjectURL(blob);
				const anchor = document.createElement("a");
				anchor.href = url;
				anchor.download = `fmhy-saved-links-${new Date().toISOString().slice(0, 10)}.json`;
				anchor.hidden = true;
				document.body.append(anchor);
				anchor.click();
				anchor.remove();
				window.setTimeout(() => URL.revokeObjectURL(url), 1e3);
				showToast("Saved links exported as JSON");
			}
			function triggerImport() {
				menuOpen.value = false;
				importInput.value?.click();
			}
			async function onImportFile(event) {
				const input = event.target;
				const file = input.files?.[0];
				input.value = "";
				if (!file) return;
				try {
					const result = importLibrary(JSON.parse(await file.text()));
					showToast(`Imported ${result.added} new and updated ${result.updated} · ${plural(result.total, "link")} total`);
				} catch {
					showToast("That file could not be imported. Choose an exported FMHY links file.", { tone: "danger" });
				}
			}
			function openCreate() {
				newName.value = "";
				newColor.value = COLLECTION_COLORS[0];
				nameError.value = "";
				createOpen.value = true;
				menuOpen.value = false;
				nextTick(() => newNameInput.value?.focus());
			}
			function submitCreate() {
				const name = newName.value.trim();
				if (!name) {
					nameError.value = "Give the collection a name.";
					return;
				}
				if (collections.value.some((entry) => entry.name.toLowerCase() === name.toLowerCase())) {
					nameError.value = "A collection with that name already exists.";
					return;
				}
				const collection = createCollection(name, newColor.value);
				if (!collection) {
					nameError.value = "Could not create that collection.";
					return;
				}
				createOpen.value = false;
				showToast(`Created “${collection.name}”`);
			}
			function openManage() {
				menuOpen.value = false;
				renameDrafts.value = Object.fromEntries(collections.value.map((collection) => [collection.id, collection.name]));
				deleteConfirmId.value = null;
				manageOpen.value = true;
			}
			function openSettings() {
				menuOpen.value = false;
				settingsOpen.value = true;
			}
			function commitRename(collection) {
				if (collection.system) return;
				const next = (renameDrafts.value[collection.id] ?? "").trim();
				if (!next) {
					renameDrafts.value[collection.id] = collection.name;
					return;
				}
				if (next === collection.name) return;
				if (collections.value.some((entry) => entry.id !== collection.id && entry.name.toLowerCase() === next.toLowerCase())) {
					showToast("Another collection already uses that name.", { tone: "danger" });
					renameDrafts.value[collection.id] = collection.name;
					return;
				}
				renameDrafts.value[collection.id] = next;
				renameCollection(collection.id, next);
			}
			function confirmDelete(id) {
				deleteCollection(id);
				deleteConfirmId.value = null;
				if (activeCollection.value === id) activeCollection.value = "all";
				showToast("Collection removed");
			}
			function confirmClear() {
				const snapshot = items.value.map((item) => ({
					...item,
					collections: [...item.collections]
				}));
				const count = clearItems();
				clearOpen.value = false;
				clearFilters();
				showToast(`Removed ${plural(count, "saved link")}`, {
					tone: "danger",
					actions: [{
						label: "Undo",
						run: () => restoreLinks(snapshot)
					}]
				});
			}
			function onKeydown(event) {
				if (editorOpen.value) return;
				if (event.key === "Escape") {
					if (createOpen.value || manageOpen.value || clearOpen.value || settingsOpen.value) {
						createOpen.value = false;
						manageOpen.value = false;
						clearOpen.value = false;
						settingsOpen.value = false;
						return;
					}
					if (menuOpen.value) {
						menuOpen.value = false;
						return;
					}
					closeSavedPage();
					return;
				}
				if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
				const target = event.target;
				if (target instanceof HTMLElement && (target.matches("input, textarea, select") || target.isContentEditable || target.closest("[contenteditable=\"true\"]"))) return;
				event.preventDefault();
				searchInput.value?.focus();
			}
			function onDocumentClick(event) {
				if (!menuOpen.value) return;
				const target = event.target;
				if (target instanceof Element && target.closest(".fmhy-sp-menu-wrap")) return;
				menuOpen.value = false;
			}
			watch(collections, (list) => {
				if (activeCollection.value !== "all" && !list.some((collection) => collection.id === activeCollection.value)) activeCollection.value = "all";
			});
			watch(sources, (list) => {
				if (activeSource.value !== "all" && !list.some((source) => source.path === activeSource.value)) activeSource.value = "all";
			});
			onMounted(() => {
				const root = pageRoot.value;
				root?.scrollTo({ top: 0 });
				root?.focus({ preventScroll: true });
				window.addEventListener("keydown", onKeydown);
				document.addEventListener("click", onDocumentClick);
			});
			onBeforeUnmount(() => {
				window.removeEventListener("keydown", onKeydown);
				document.removeEventListener("click", onDocumentClick);
			});
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock(Fragment, null, [createBaseVNode("section", {
					ref_key: "pageRoot",
					ref: pageRoot,
					class: "fmhy-sp-page",
					"aria-labelledby": "fmhy-sp-saved-title",
					tabindex: "-1"
				}, [createBaseVNode("div", _hoisted_1$3, [
					createBaseVNode("div", _hoisted_2$3, [createBaseVNode("button", {
						type: "button",
						class: "fmhy-sp-text-button",
						onClick: _cache[0] || (_cache[0] = (...args) => unref(closeSavedPage) && unref(closeSavedPage)(...args))
					}, [createVNode(unref(ArrowLeft), {
						size: 16,
						"aria-hidden": "true"
					}), _cache[29] || (_cache[29] = createTextVNode(" Back to FMHY ", -1))]), createBaseVNode("div", _hoisted_3$2, [
						createBaseVNode("button", {
							type: "button",
							class: "fmhy-sp-icon-button",
							"aria-label": "Library options",
							"aria-haspopup": "menu",
							"aria-expanded": menuOpen.value,
							onClick: _cache[1] || (_cache[1] = withModifiers(($event) => menuOpen.value = !menuOpen.value, ["stop"]))
						}, [createVNode(unref(Ellipsis), {
							size: 19,
							"aria-hidden": "true"
						})], 8, _hoisted_4$2),
						menuOpen.value ? (openBlock(), createElementBlock("div", {
							key: 0,
							class: "fmhy-sp-menu",
							role: "menu",
							onClick: _cache[3] || (_cache[3] = withModifiers(() => {}, ["stop"]))
						}, [
							createBaseVNode("button", {
								type: "button",
								role: "menuitem",
								onClick: exportData
							}, [createVNode(unref(Download), {
								size: 16,
								"aria-hidden": "true"
							}), _cache[30] || (_cache[30] = createTextVNode(" Export library ", -1))]),
							createBaseVNode("button", {
								type: "button",
								role: "menuitem",
								onClick: triggerImport
							}, [createVNode(unref(Upload), {
								size: 16,
								"aria-hidden": "true"
							}), _cache[31] || (_cache[31] = createTextVNode(" Import library ", -1))]),
							createBaseVNode("button", {
								type: "button",
								role: "menuitem",
								onClick: openManage
							}, [createVNode(unref(Settings2), {
								size: 16,
								"aria-hidden": "true"
							}), _cache[32] || (_cache[32] = createTextVNode(" Manage collections ", -1))]),
							createBaseVNode("button", {
								type: "button",
								role: "menuitem",
								onClick: openSettings
							}, [createVNode(unref(SlidersHorizontal), {
								size: 16,
								"aria-hidden": "true"
							}), _cache[33] || (_cache[33] = createTextVNode(" Settings ", -1))]),
							_cache[35] || (_cache[35] = createBaseVNode("div", {
								class: "fmhy-sp-menu-separator",
								role: "separator"
							}, null, -1)),
							createBaseVNode("button", {
								type: "button",
								role: "menuitem",
								class: "is-danger",
								onClick: _cache[2] || (_cache[2] = ($event) => {
									clearOpen.value = true;
									menuOpen.value = false;
								})
							}, [createVNode(unref(Trash2), {
								size: 16,
								"aria-hidden": "true"
							}), _cache[34] || (_cache[34] = createTextVNode(" Remove all saved links ", -1))])
						])) : createCommentVNode("", true),
						createBaseVNode("input", {
							ref_key: "importInput",
							ref: importInput,
							class: "fmhy-sp-hidden-input",
							type: "file",
							accept: "application/json,.json",
							onChange: onImportFile
						}, null, 544)
					])]),
					createBaseVNode("header", _hoisted_5$2, [
						_cache[36] || (_cache[36] = createBaseVNode("h1", { id: "fmhy-sp-saved-title" }, "Saved links", -1)),
						_cache[37] || (_cache[37] = createBaseVNode("p", null, " Resource links you saved from FMHY pages, kept in this browser. Search them, filter by where they came from, and collect the useful ones. ", -1)),
						createBaseVNode("div", _hoisted_6$1, [
							createBaseVNode("span", _hoisted_7$1, [
								createVNode(unref(Bookmark), {
									size: 15,
									"aria-hidden": "true"
								}),
								createBaseVNode("strong", null, toDisplayString(unref(savedCount)), 1),
								createTextVNode(" " + toDisplayString(unref(savedCount) === 1 ? "saved link" : "saved links"), 1)
							]),
							createBaseVNode("span", _hoisted_8$1, [
								createVNode(unref(Layers), {
									size: 15,
									"aria-hidden": "true"
								}),
								createBaseVNode("strong", null, toDisplayString(totalSources.value), 1),
								createTextVNode(" " + toDisplayString(totalSources.value === 1 ? "source page" : "source pages"), 1)
							]),
							createBaseVNode("span", _hoisted_9$1, [
								createVNode(unref(FolderOpen), {
									size: 15,
									"aria-hidden": "true"
								}),
								createBaseVNode("strong", null, toDisplayString(unref(collections).length), 1),
								createTextVNode(" " + toDisplayString(unref(collections).length === 1 ? "collection" : "collections"), 1)
							])
						])
					]),
					createBaseVNode("div", _hoisted_10$1, [createBaseVNode("div", _hoisted_11$1, [
						createVNode(unref(Search), {
							size: 18,
							class: "fmhy-sp-search-icon",
							"aria-hidden": "true"
						}),
						withDirectives(createBaseVNode("input", {
							ref_key: "searchInput",
							ref: searchInput,
							"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => query.value = $event),
							type: "search",
							class: "fmhy-sp-search-input",
							placeholder: "Search links, notes, sites, sections…",
							"aria-label": "Search saved links"
						}, null, 512), [[vModelText, query.value]]),
						!query.value ? (openBlock(), createElementBlock("kbd", _hoisted_12$1, "/")) : (openBlock(), createElementBlock("button", {
							key: 1,
							type: "button",
							class: "fmhy-sp-icon-button is-small fmhy-sp-search-clear",
							"aria-label": "Clear search",
							onClick: _cache[5] || (_cache[5] = ($event) => query.value = "")
						}, [createVNode(unref(X), {
							size: 14,
							"aria-hidden": "true"
						})]))
					]), createBaseVNode("button", {
						type: "button",
						class: "fmhy-sp-btn is-secondary",
						onClick: openCreate
					}, [createVNode(unref(Plus), {
						size: 16,
						"aria-hidden": "true"
					}), _cache[38] || (_cache[38] = createTextVNode(" New collection ", -1))])]),
					createBaseVNode("div", _hoisted_13$1, [(openBlock(true), createElementBlock(Fragment, null, renderList(collectionTabs.value, (tab) => {
						return openBlock(), createElementBlock("button", {
							key: tab.id,
							type: "button",
							class: normalizeClass(["fmhy-sp-tab", { "is-active": activeCollection.value === tab.id }]),
							role: "tab",
							"aria-selected": activeCollection.value === tab.id,
							onClick: ($event) => activeCollection.value = tab.id
						}, [
							tab.id !== "all" ? (openBlock(), createElementBlock("span", {
								key: 0,
								class: "fmhy-sp-collection-dot",
								style: normalizeStyle({ background: tab.color }),
								"aria-hidden": "true"
							}, null, 4)) : createCommentVNode("", true),
							createTextVNode(" " + toDisplayString(tab.name) + " ", 1),
							createBaseVNode("span", _hoisted_15$1, toDisplayString(tab.count), 1)
						], 10, _hoisted_14$1);
					}), 128)), createBaseVNode("button", {
						type: "button",
						class: "fmhy-sp-tab is-add",
						onClick: openCreate
					}, [createVNode(unref(Plus), {
						size: 14,
						"aria-hidden": "true"
					}), _cache[39] || (_cache[39] = createTextVNode(" New ", -1))])]),
					createBaseVNode("div", _hoisted_16$1, [createBaseVNode("div", _hoisted_17$1, [
						createBaseVNode("strong", null, toDisplayString(unref(plural)(filtered.value.length, "link")), 1),
						activeCollectionName.value ? (openBlock(), createElementBlock("span", _hoisted_18$1, "in " + toDisplayString(activeCollectionName.value), 1)) : createCommentVNode("", true),
						filtersActive.value ? (openBlock(), createElementBlock("button", {
							key: 1,
							type: "button",
							class: "fmhy-sp-text-button is-small",
							onClick: clearFilters
						}, " Clear filters ")) : createCommentVNode("", true)
					]), createBaseVNode("div", _hoisted_19$1, [
						createBaseVNode("label", _hoisted_20$1, [
							_cache[41] || (_cache[41] = createBaseVNode("span", { class: "fmhy-sp-sr-only" }, "Filter by FMHY section", -1)),
							withDirectives(createBaseVNode("select", {
								"onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => activeSection.value = $event),
								class: "fmhy-sp-select"
							}, [_cache[40] || (_cache[40] = createBaseVNode("option", { value: "all" }, "All sections", -1)), (openBlock(true), createElementBlock(Fragment, null, renderList(sections.value, (section) => {
								return openBlock(), createElementBlock("option", {
									key: section.slug,
									value: section.slug
								}, toDisplayString(section.emoji) + " " + toDisplayString(section.label) + " (" + toDisplayString(section.count) + ") ", 9, _hoisted_21$1);
							}), 128))], 512), [[vModelSelect, activeSection.value]]),
							createVNode(unref(ChevronDown), {
								size: 14,
								class: "fmhy-sp-select-icon",
								"aria-hidden": "true"
							})
						]),
						createBaseVNode("label", _hoisted_22$1, [
							_cache[43] || (_cache[43] = createBaseVNode("span", { class: "fmhy-sp-sr-only" }, "Filter by source FMHY page", -1)),
							withDirectives(createBaseVNode("select", {
								"onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => activeSource.value = $event),
								class: "fmhy-sp-select"
							}, [_cache[42] || (_cache[42] = createBaseVNode("option", { value: "all" }, "All FMHY pages", -1)), (openBlock(true), createElementBlock(Fragment, null, renderList(sources.value, (source) => {
								return openBlock(), createElementBlock("option", {
									key: source.path,
									value: source.path
								}, toDisplayString(source.title) + " (" + toDisplayString(source.count) + ") ", 9, _hoisted_23$1);
							}), 128))], 512), [[vModelSelect, activeSource.value]]),
							createVNode(unref(ChevronDown), {
								size: 14,
								class: "fmhy-sp-select-icon",
								"aria-hidden": "true"
							})
						]),
						createBaseVNode("label", _hoisted_24$1, [
							_cache[45] || (_cache[45] = createBaseVNode("span", { class: "fmhy-sp-sr-only" }, "Filter by date saved", -1)),
							withDirectives(createBaseVNode("select", {
								"onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => dateFilter.value = $event),
								class: "fmhy-sp-select"
							}, [..._cache[44] || (_cache[44] = [
								createBaseVNode("option", { value: "all" }, "Any time", -1),
								createBaseVNode("option", { value: "today" }, "Saved today", -1),
								createBaseVNode("option", { value: "week" }, "Past 7 days", -1),
								createBaseVNode("option", { value: "month" }, "Past 30 days", -1)
							])], 512), [[vModelSelect, dateFilter.value]]),
							createVNode(unref(ChevronDown), {
								size: 14,
								class: "fmhy-sp-select-icon",
								"aria-hidden": "true"
							})
						]),
						createBaseVNode("label", _hoisted_25$1, [
							_cache[47] || (_cache[47] = createBaseVNode("span", { class: "fmhy-sp-sr-only" }, "Sort saved links", -1)),
							withDirectives(createBaseVNode("select", {
								"onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => sort.value = $event),
								class: "fmhy-sp-select"
							}, [..._cache[46] || (_cache[46] = [
								createBaseVNode("option", { value: "newest" }, "Newest first", -1),
								createBaseVNode("option", { value: "oldest" }, "Oldest first", -1),
								createBaseVNode("option", { value: "title" }, "Title A–Z", -1),
								createBaseVNode("option", { value: "source" }, "Source page", -1)
							])], 512), [[vModelSelect, sort.value]]),
							createVNode(unref(ChevronDown), {
								size: 14,
								class: "fmhy-sp-select-icon",
								"aria-hidden": "true"
							})
						]),
						createBaseVNode("div", _hoisted_26$1, [createBaseVNode("button", {
							type: "button",
							class: normalizeClass(["fmhy-sp-icon-button is-small", { "is-active": view.value === "grid" }]),
							"aria-label": "Grid view",
							"aria-pressed": view.value === "grid",
							onClick: _cache[10] || (_cache[10] = ($event) => view.value = "grid")
						}, [createVNode(unref(Grid2x2), {
							size: 15,
							"aria-hidden": "true"
						})], 10, _hoisted_27), createBaseVNode("button", {
							type: "button",
							class: normalizeClass(["fmhy-sp-icon-button is-small", { "is-active": view.value === "list" }]),
							"aria-label": "List view",
							"aria-pressed": view.value === "list",
							onClick: _cache[11] || (_cache[11] = ($event) => view.value = "list")
						}, [createVNode(unref(List), {
							size: 16,
							"aria-hidden": "true"
						})], 10, _hoisted_28)])
					])]),
					unref(savedCount) === 0 ? (openBlock(), createElementBlock("div", _hoisted_29, [
						createBaseVNode("span", _hoisted_30, [createVNode(unref(Bookmark), {
							size: 30,
							"stroke-width": 1.7
						})]),
						_cache[48] || (_cache[48] = createBaseVNode("h2", null, "No saved links yet", -1)),
						_cache[49] || (_cache[49] = createBaseVNode("p", null, " Hover a resource link on any FMHY page, then tap its bookmark. On a phone the bookmark sits beside each link. ", -1)),
						createBaseVNode("button", {
							type: "button",
							class: "fmhy-sp-btn is-primary",
							onClick: _cache[12] || (_cache[12] = (...args) => unref(closeSavedPage) && unref(closeSavedPage)(...args))
						}, " Browse FMHY ")
					])) : filtered.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_31, [
						createBaseVNode("span", _hoisted_32, [createVNode(unref(Search), {
							size: 28,
							"stroke-width": 1.7
						})]),
						_cache[50] || (_cache[50] = createBaseVNode("h2", null, "No links match", -1)),
						_cache[51] || (_cache[51] = createBaseVNode("p", null, "Try a different search, source page, section, collection or date range.", -1)),
						createBaseVNode("button", {
							type: "button",
							class: "fmhy-sp-btn is-secondary",
							onClick: clearFilters
						}, " Clear filters ")
					])) : (openBlock(), createElementBlock("div", {
						key: 2,
						class: normalizeClass(["fmhy-sp-cards", `is-${view.value}`]),
						id: "fmhy-sp-saved-results"
					}, [(openBlock(true), createElementBlock(Fragment, null, renderList(filtered.value, (item) => {
						return openBlock(), createElementBlock("article", {
							key: item.url,
							class: "fmhy-sp-card"
						}, [
							createBaseVNode("div", _hoisted_33, [createBaseVNode("a", {
								class: "fmhy-sp-card-title",
								href: item.url,
								target: "_blank",
								rel: "noopener noreferrer"
							}, toDisplayString(item.title), 9, _hoisted_34), createBaseVNode("div", _hoisted_35, [
								createBaseVNode("a", {
									class: "fmhy-sp-icon-button is-small",
									href: sourceHref(item),
									"aria-label": `Open FMHY source page for ${item.title}`,
									title: `Open ${item.sourceTitle}${item.contextHeading ? ` at ${item.contextHeading}` : ""} on FMHY`
								}, [createVNode(unref(MapPin), {
									size: 14,
									"aria-hidden": "true"
								})], 8, _hoisted_36),
								createBaseVNode("button", {
									type: "button",
									class: normalizeClass(["fmhy-sp-icon-button is-small", { "is-active": expandedUrl.value === item.url }]),
									"aria-label": expandedUrl.value === item.url ? `Hide details for ${item.title}` : `Show details for ${item.title}`,
									"aria-expanded": expandedUrl.value === item.url,
									title: "Details",
									onClick: ($event) => toggleDetails(item)
								}, [createVNode(unref(Info), {
									size: 14,
									"aria-hidden": "true"
								})], 10, _hoisted_37),
								createBaseVNode("button", {
									type: "button",
									class: "fmhy-sp-icon-button is-small",
									"aria-label": `Edit ${item.title}`,
									title: "Edit collections and note",
									onClick: ($event) => onEdit(item, $event)
								}, [createVNode(unref(Pencil), {
									size: 14,
									"aria-hidden": "true"
								})], 8, _hoisted_38),
								createBaseVNode("button", {
									type: "button",
									class: "fmhy-sp-icon-button is-small is-danger",
									"aria-label": `Remove ${item.title}`,
									title: "Remove from saved links",
									onClick: ($event) => onCardRemove(item)
								}, [createVNode(unref(Trash2), {
									size: 14,
									"aria-hidden": "true"
								})], 8, _hoisted_39)
							])]),
							item.description ? (openBlock(), createElementBlock("p", _hoisted_40, toDisplayString(item.description), 1)) : createCommentVNode("", true),
							item.note ? (openBlock(), createElementBlock("p", _hoisted_41, toDisplayString(item.note), 1)) : createCommentVNode("", true),
							expandedUrl.value === item.url ? (openBlock(), createElementBlock("div", _hoisted_42, [
								createBaseVNode("div", _hoisted_43, [_cache[52] || (_cache[52] = createBaseVNode("span", { class: "fmhy-sp-card-detail-label" }, "Section", -1)), createBaseVNode("span", null, toDisplayString(item.categoryEmoji) + " " + toDisplayString(item.categoryLabel), 1)]),
								createBaseVNode("div", _hoisted_44, [_cache[53] || (_cache[53] = createBaseVNode("span", { class: "fmhy-sp-card-detail-label" }, "Source", -1)), createBaseVNode("span", null, [createTextVNode(toDisplayString(item.sourceTitle) + " ", 1), item.contextHeading ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(" · " + toDisplayString(item.contextHeading), 1)], 64)) : createCommentVNode("", true)])]),
								createBaseVNode("div", _hoisted_45, [_cache[54] || (_cache[54] = createBaseVNode("span", { class: "fmhy-sp-card-detail-label" }, "Domain", -1)), createBaseVNode("span", _hoisted_46, toDisplayString(item.domain), 1)]),
								createBaseVNode("div", _hoisted_47, [_cache[55] || (_cache[55] = createBaseVNode("span", { class: "fmhy-sp-card-detail-label" }, "Saved", -1)), createBaseVNode("span", null, toDisplayString(unref(formatAbsolute)(item.savedAt)), 1)])
							])) : createCommentVNode("", true),
							createBaseVNode("div", _hoisted_48, [createBaseVNode("div", _hoisted_49, [(openBlock(true), createElementBlock(Fragment, null, renderList(visibleCollections(item), (collection) => {
								return openBlock(), createElementBlock("span", {
									key: collection,
									class: "fmhy-sp-mini-chip"
								}, [createBaseVNode("span", {
									class: "fmhy-sp-collection-dot",
									style: normalizeStyle({ background: collectionColor(collection) }),
									"aria-hidden": "true"
								}, null, 4), createTextVNode(" " + toDisplayString(collectionName(collection)), 1)]);
							}), 128)), item.collections.length > 3 ? (openBlock(), createElementBlock("span", _hoisted_50, " +" + toDisplayString(item.collections.length - 3), 1)) : createCommentVNode("", true)]), createBaseVNode("span", {
								class: "fmhy-sp-card-date",
								title: `Saved ${unref(formatAbsolute)(item.savedAt)}`
							}, toDisplayString(unref(formatRelative)(item.savedAt)), 9, _hoisted_51)])
						]);
					}), 128))], 2)),
					createBaseVNode("p", _hoisted_52, [createVNode(unref(Bookmark), {
						size: 13,
						"aria-hidden": "true"
					}), _cache[56] || (_cache[56] = createTextVNode(" Saved locally in this browser. Nothing is uploaded. ", -1))])
				])], 512), (openBlock(), createBlock(Teleport, { to: "body" }, [
					createOpen.value ? (openBlock(), createElementBlock("div", {
						key: 0,
						class: "fmhy-sp-modal-layer",
						onClick: _cache[16] || (_cache[16] = withModifiers(($event) => createOpen.value = false, ["self"]))
					}, [createBaseVNode("section", _hoisted_53, [
						createBaseVNode("header", _hoisted_54, [_cache[57] || (_cache[57] = createBaseVNode("div", null, [createBaseVNode("h2", { id: "fmhy-sp-create-title" }, "New collection")], -1)), createBaseVNode("button", {
							type: "button",
							class: "fmhy-sp-icon-button",
							"aria-label": "Close",
							onClick: _cache[13] || (_cache[13] = ($event) => createOpen.value = false)
						}, [createVNode(unref(X), {
							size: 18,
							"aria-hidden": "true"
						})])]),
						createBaseVNode("div", _hoisted_55, [
							_cache[58] || (_cache[58] = createBaseVNode("label", {
								class: "fmhy-sp-field-label",
								for: "fmhy-sp-new-name"
							}, "Name", -1)),
							withDirectives(createBaseVNode("input", {
								id: "fmhy-sp-new-name",
								ref_key: "newNameInput",
								ref: newNameInput,
								"onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => newName.value = $event),
								class: "fmhy-sp-input",
								type: "text",
								maxlength: "40",
								placeholder: "e.g. Weekend watching",
								onKeydown: withKeys(withModifiers(submitCreate, ["prevent"]), ["enter"])
							}, null, 40, _hoisted_56), [[vModelText, newName.value]]),
							_cache[59] || (_cache[59] = createBaseVNode("span", { class: "fmhy-sp-field-label fmhy-sp-field-spaced" }, "Colour", -1)),
							createBaseVNode("div", _hoisted_57, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(COLLECTION_COLORS), (color) => {
								return openBlock(), createElementBlock("button", {
									key: color,
									type: "button",
									class: normalizeClass(["fmhy-sp-swatch", { "is-active": newColor.value === color }]),
									style: normalizeStyle({ background: color }),
									"aria-label": `Use colour ${color}`,
									"aria-pressed": newColor.value === color,
									onClick: ($event) => newColor.value = color
								}, [newColor.value === color ? (openBlock(), createBlock(unref(Check), {
									key: 0,
									size: 12,
									"stroke-width": 3
								})) : createCommentVNode("", true)], 14, _hoisted_58);
							}), 128))]),
							nameError.value ? (openBlock(), createElementBlock("p", _hoisted_59, toDisplayString(nameError.value), 1)) : createCommentVNode("", true)
						]),
						createBaseVNode("footer", _hoisted_60, [createBaseVNode("button", {
							type: "button",
							class: "fmhy-sp-btn is-secondary",
							onClick: _cache[15] || (_cache[15] = ($event) => createOpen.value = false)
						}, " Cancel "), createBaseVNode("button", {
							type: "button",
							class: "fmhy-sp-btn is-primary",
							onClick: submitCreate
						}, " Create collection ")])
					])])) : createCommentVNode("", true),
					manageOpen.value ? (openBlock(), createElementBlock("div", {
						key: 1,
						class: "fmhy-sp-modal-layer",
						onClick: _cache[20] || (_cache[20] = withModifiers(($event) => manageOpen.value = false, ["self"]))
					}, [createBaseVNode("section", _hoisted_61, [
						createBaseVNode("header", _hoisted_62, [_cache[60] || (_cache[60] = createBaseVNode("div", null, [createBaseVNode("h2", { id: "fmhy-sp-manage-title" }, "Manage collections")], -1)), createBaseVNode("button", {
							type: "button",
							class: "fmhy-sp-icon-button",
							"aria-label": "Close",
							onClick: _cache[17] || (_cache[17] = ($event) => manageOpen.value = false)
						}, [createVNode(unref(X), {
							size: 18,
							"aria-hidden": "true"
						})])]),
						createBaseVNode("div", _hoisted_63, [createBaseVNode("div", _hoisted_64, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(collections), (collection) => {
							return openBlock(), createElementBlock("div", {
								key: collection.id,
								class: "fmhy-sp-manage-row"
							}, [
								createBaseVNode("span", {
									class: "fmhy-sp-collection-dot",
									style: normalizeStyle({ background: collection.color }),
									"aria-hidden": "true"
								}, null, 4),
								withDirectives(createBaseVNode("input", {
									"onUpdate:modelValue": ($event) => renameDrafts.value[collection.id] = $event,
									class: "fmhy-sp-input is-compact",
									type: "text",
									maxlength: "40",
									disabled: collection.system,
									"aria-label": `Rename ${collection.name}`,
									onBlur: ($event) => commitRename(collection),
									onKeydown: withKeys(withModifiers(($event) => commitRename(collection), ["prevent"]), ["enter"])
								}, null, 40, _hoisted_65), [[vModelText, renameDrafts.value[collection.id]]]),
								createBaseVNode("span", _hoisted_66, toDisplayString(unref(countForCollection)(collection.id)), 1),
								collection.system ? (openBlock(), createElementBlock("span", _hoisted_67, "Default")) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [deleteConfirmId.value === collection.id ? (openBlock(), createElementBlock("div", _hoisted_68, [createBaseVNode("button", {
									type: "button",
									onClick: ($event) => confirmDelete(collection.id)
								}, "Remove", 8, _hoisted_69), createBaseVNode("button", {
									type: "button",
									onClick: _cache[18] || (_cache[18] = ($event) => deleteConfirmId.value = null)
								}, "Cancel")])) : (openBlock(), createElementBlock("button", {
									key: 1,
									type: "button",
									class: "fmhy-sp-icon-button is-small is-danger",
									"aria-label": `Delete ${collection.name}`,
									title: "Delete collection",
									onClick: ($event) => deleteConfirmId.value = collection.id
								}, [createVNode(unref(Trash2), {
									size: 14,
									"aria-hidden": "true"
								})], 8, _hoisted_70))], 64))
							]);
						}), 128))]), _cache[61] || (_cache[61] = createBaseVNode("p", { class: "fmhy-sp-hint" }, " Deleting a collection keeps its links; anything left without a collection returns to Read later. ", -1))]),
						createBaseVNode("footer", _hoisted_71, [createBaseVNode("button", {
							type: "button",
							class: "fmhy-sp-btn is-secondary",
							onClick: openCreate
						}, " New collection "), createBaseVNode("button", {
							type: "button",
							class: "fmhy-sp-btn is-primary",
							onClick: _cache[19] || (_cache[19] = ($event) => manageOpen.value = false)
						}, " Done ")])
					])])) : createCommentVNode("", true),
					settingsOpen.value ? (openBlock(), createElementBlock("div", {
						key: 2,
						class: "fmhy-sp-modal-layer",
						onClick: _cache[25] || (_cache[25] = withModifiers(($event) => settingsOpen.value = false, ["self"]))
					}, [createBaseVNode("section", _hoisted_72, [
						createBaseVNode("header", _hoisted_73, [_cache[62] || (_cache[62] = createBaseVNode("div", null, [createBaseVNode("h2", { id: "fmhy-sp-settings-title" }, "Saved links settings")], -1)), createBaseVNode("button", {
							type: "button",
							class: "fmhy-sp-icon-button",
							"aria-label": "Close",
							onClick: _cache[21] || (_cache[21] = ($event) => settingsOpen.value = false)
						}, [createVNode(unref(X), {
							size: 18,
							"aria-hidden": "true"
						})])]),
						createBaseVNode("div", _hoisted_74, [createBaseVNode("label", _hoisted_75, [_cache[64] || (_cache[64] = createBaseVNode("span", { class: "fmhy-sp-setting-copy" }, [createBaseVNode("strong", null, "Reveal bookmarks on hover"), createBaseVNode("small", null, " Keep resource links clean. The bookmark appears when you move over a link; touch devices keep it visible. ")], -1)), createBaseVNode("span", _hoisted_76, [withDirectives(createBaseVNode("input", {
							"onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => revealOnHover.value = $event),
							type: "checkbox",
							"aria-label": "Reveal bookmarks on hover"
						}, null, 512), [[vModelCheckbox, revealOnHover.value]]), _cache[63] || (_cache[63] = createBaseVNode("span", {
							class: "fmhy-sp-switch-track",
							"aria-hidden": "true"
						}, [createBaseVNode("span", { class: "fmhy-sp-switch-thumb" })], -1))])]), createBaseVNode("label", _hoisted_77, [_cache[66] || (_cache[66] = createBaseVNode("span", { class: "fmhy-sp-setting-copy" }, [createBaseVNode("strong", null, "Dim visited links"), createBaseVNode("small", null, " Reduce the weight of links your browser has already visited. This uses the browser's own history; nothing is tracked by the script. ")], -1)), createBaseVNode("span", _hoisted_78, [withDirectives(createBaseVNode("input", {
							"onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => dimVisited.value = $event),
							type: "checkbox",
							"aria-label": "Dim visited links"
						}, null, 512), [[vModelCheckbox, dimVisited.value]]), _cache[65] || (_cache[65] = createBaseVNode("span", {
							class: "fmhy-sp-switch-track",
							"aria-hidden": "true"
						}, [createBaseVNode("span", { class: "fmhy-sp-switch-thumb" })], -1))])])]),
						createBaseVNode("footer", _hoisted_79, [createBaseVNode("button", {
							type: "button",
							class: "fmhy-sp-btn is-primary",
							onClick: _cache[24] || (_cache[24] = ($event) => settingsOpen.value = false)
						}, " Done ")])
					])])) : createCommentVNode("", true),
					clearOpen.value ? (openBlock(), createElementBlock("div", {
						key: 3,
						class: "fmhy-sp-modal-layer",
						onClick: _cache[28] || (_cache[28] = withModifiers(($event) => clearOpen.value = false, ["self"]))
					}, [createBaseVNode("section", _hoisted_80, [
						createBaseVNode("header", _hoisted_81, [_cache[67] || (_cache[67] = createBaseVNode("div", null, [createBaseVNode("h2", { id: "fmhy-sp-clear-title" }, "Remove all saved links?")], -1)), createBaseVNode("button", {
							type: "button",
							class: "fmhy-sp-icon-button",
							"aria-label": "Close",
							onClick: _cache[26] || (_cache[26] = ($event) => clearOpen.value = false)
						}, [createVNode(unref(X), {
							size: 18,
							"aria-hidden": "true"
						})])]),
						createBaseVNode("div", _hoisted_82, [createBaseVNode("p", _hoisted_83, " This removes all " + toDisplayString(unref(plural)(unref(savedCount), "saved link")) + " from this browser. Your collections stay, and you can undo right after. ", 1)]),
						createBaseVNode("footer", _hoisted_84, [createBaseVNode("button", {
							type: "button",
							class: "fmhy-sp-btn is-secondary",
							onClick: _cache[27] || (_cache[27] = ($event) => clearOpen.value = false)
						}, " Cancel "), createBaseVNode("button", {
							type: "button",
							class: "fmhy-sp-btn is-danger",
							onClick: confirmClear
						}, " Remove everything ")])
					])])) : createCommentVNode("", true)
				]))], 64);
			};
		}
	});
	var _hoisted_1$2 = {
		key: 0,
		class: "fmhy-sp-editor-layer"
	};
	var _hoisted_2$2 = {
		key: 0,
		class: "fmhy-sp-sheet-grip",
		"aria-hidden": "true"
	};
	var _hoisted_3$1 = { class: "fmhy-sp-editor-head" };
	var _hoisted_4$1 = { class: "fmhy-sp-editor-heading" };
	var _hoisted_5$1 = { id: "fmhy-sp-editor-title" };
	var _hoisted_6 = { class: "fmhy-sp-editor-sub" };
	var _hoisted_7 = { class: "fmhy-sp-mono" };
	var _hoisted_8 = { class: "fmhy-sp-editor-body" };
	var _hoisted_9 = { class: "fmhy-sp-field" };
	var _hoisted_10 = { class: "fmhy-sp-field-label" };
	var _hoisted_11 = { class: "fmhy-sp-muted" };
	var _hoisted_12 = { class: "fmhy-sp-collection-list" };
	var _hoisted_13 = ["aria-pressed", "onClick"];
	var _hoisted_14 = { class: "fmhy-sp-collection-name" };
	var _hoisted_15 = {
		class: "fmhy-sp-collection-count",
		"aria-hidden": "true"
	};
	var _hoisted_16 = { class: "fmhy-sp-new-collection" };
	var _hoisted_17 = {
		key: 1,
		class: "fmhy-sp-new-collection-form"
	};
	var _hoisted_18 = { class: "fmhy-sp-new-collection-row" };
	var _hoisted_19 = ["onKeydown"];
	var _hoisted_20 = {
		class: "fmhy-sp-swatches",
		role: "group",
		"aria-label": "Collection color"
	};
	var _hoisted_21 = [
		"aria-label",
		"aria-pressed",
		"onClick"
	];
	var _hoisted_22 = {
		key: 0,
		class: "fmhy-sp-error"
	};
	var _hoisted_23 = { class: "fmhy-sp-field" };
	var _hoisted_24 = { class: "fmhy-sp-context" };
	var _hoisted_25 = { class: "fmhy-sp-editor-footer" };
	var _hoisted_26 = ["disabled"];
	var SaveDialog_default = defineComponent({
		__name: "SaveDialog",
		setup(__props) {
			const isSheet = useSheetLayout;
			const panel = ref(null);
			const selected = ref([]);
			const note = ref("");
			const newCollectionOpen = ref(false);
			const newCollectionName = ref("");
			const newCollectionColor = ref(COLLECTION_COLORS[0]);
			const newCollectionError = ref("");
			const meta = computed(() => editorState.value?.meta);
			const existing = computed(() => {
				if (!editorState.value) return false;
				return Boolean(getLink(editorState.value.url));
			});
			const panelStyle = computed(() => {
				if (isSheet.value) return {};
				const width = Math.min(390, window.innerWidth - 24);
				const anchor = editorState.value?.anchor;
				if (!anchor) return {
					width: `${width}px`,
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)"
				};
				const margin = 12;
				const left = Math.min(Math.max(anchor.left, margin), window.innerWidth - width - margin);
				const estimatedHeight = 460;
				const below = anchor.bottom + 10;
				const top = below + estimatedHeight > window.innerHeight - margin ? Math.max(margin, anchor.top - estimatedHeight - 10) : below;
				return {
					width: `${width}px`,
					left: `${left}px`,
					top: `${top}px`
				};
			});
			function resetDraft() {
				if (!editorState.value) return;
				const item = getLink(editorState.value.url);
				selected.value = item ? [...item.collections] : ["read-later"];
				note.value = item?.note ?? "";
				newCollectionOpen.value = false;
				newCollectionName.value = "";
				newCollectionError.value = "";
				newCollectionColor.value = COLLECTION_COLORS[0];
			}
			watch(() => editorOpen.value, async (open) => {
				if (!open) return;
				resetDraft();
				await nextTick();
				panel.value?.focus();
			}, { immediate: true });
			watch(() => editorState.value?.url, () => {
				if (editorOpen.value) resetDraft();
			});
			function toggleCollection(collection) {
				if (selected.value.includes(collection.id)) selected.value = selected.value.filter((id) => id !== collection.id);
				else selected.value = [...selected.value, collection.id];
			}
			function submitNewCollection() {
				if (!newCollectionOpen.value) {
					newCollectionOpen.value = true;
					newCollectionName.value = "";
					newCollectionError.value = "";
					return;
				}
				const name = newCollectionName.value.trim();
				if (!name) {
					newCollectionError.value = "Give the collection a name.";
					return;
				}
				const collection = createCollection(name, newCollectionColor.value);
				if (!collection) {
					newCollectionError.value = "Could not create that collection.";
					return;
				}
				selected.value = [...selected.value, collection.id];
				newCollectionOpen.value = false;
				newCollectionName.value = "";
				newCollectionError.value = "";
			}
			function save() {
				if (!meta.value || selected.value.length === 0) return;
				const wasExisting = existing.value;
				const item = saveLink(meta.value, selected.value, note.value);
				const wasNew = !wasExisting;
				closeEditor();
				showToast(wasNew ? `Saved “${item.title}”` : `Updated “${item.title}”`, { actions: [{
					label: "View saved links",
					run: openSavedPage
				}] });
			}
			function remove() {
				const item = getLink(editorState.value?.url ?? "");
				if (!item) return;
				closeEditor();
				removeLinkWithUndo(item);
			}
			function onKeydown(event) {
				if (!editorOpen.value) return;
				if (event.key === "Escape") {
					event.preventDefault();
					closeEditor();
				}
			}
			onMounted(() => {
				window.addEventListener("keydown", onKeydown);
			});
			onBeforeUnmount(() => {
				window.removeEventListener("keydown", onKeydown);
			});
			return (_ctx, _cache) => {
				return openBlock(), createBlock(Teleport, { to: "body" }, [unref(editorOpen) && meta.value ? (openBlock(), createElementBlock("div", _hoisted_1$2, [createBaseVNode("div", {
					class: normalizeClass(["fmhy-sp-editor-backdrop", { "is-sheet": unref(isSheet) }]),
					onClick: _cache[0] || (_cache[0] = (...args) => unref(closeEditor) && unref(closeEditor)(...args))
				}, null, 2), createBaseVNode("section", {
					ref_key: "panel",
					ref: panel,
					class: normalizeClass(["fmhy-sp-editor", { "is-sheet": unref(isSheet) }]),
					style: normalizeStyle(panelStyle.value),
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "fmhy-sp-editor-title",
					tabindex: "-1"
				}, [
					unref(isSheet) ? (openBlock(), createElementBlock("div", _hoisted_2$2)) : createCommentVNode("", true),
					createBaseVNode("header", _hoisted_3$1, [createBaseVNode("div", _hoisted_4$1, [createBaseVNode("h2", _hoisted_5$1, toDisplayString(meta.value.title), 1), createBaseVNode("p", _hoisted_6, [
						createBaseVNode("span", null, toDisplayString(meta.value.categoryEmoji) + " " + toDisplayString(meta.value.categoryLabel), 1),
						_cache[6] || (_cache[6] = createBaseVNode("span", {
							class: "fmhy-sp-dot",
							"aria-hidden": "true"
						}, "·", -1)),
						createBaseVNode("span", _hoisted_7, toDisplayString(meta.value.domain), 1)
					])]), createBaseVNode("button", {
						type: "button",
						class: "fmhy-sp-icon-button",
						"aria-label": "Close",
						onClick: _cache[1] || (_cache[1] = (...args) => unref(closeEditor) && unref(closeEditor)(...args))
					}, [createVNode(unref(X), {
						size: 18,
						"aria-hidden": "true"
					})])]),
					createBaseVNode("div", _hoisted_8, [
						createBaseVNode("div", _hoisted_9, [
							createBaseVNode("div", _hoisted_10, [_cache[7] || (_cache[7] = createBaseVNode("span", null, "Collections", -1)), createBaseVNode("span", _hoisted_11, toDisplayString(selected.value.length) + " selected", 1)]),
							createBaseVNode("div", _hoisted_12, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(collections), (collection) => {
								return openBlock(), createElementBlock("button", {
									key: collection.id,
									type: "button",
									class: normalizeClass(["fmhy-sp-collection-option", { "is-selected": selected.value.includes(collection.id) }]),
									"aria-pressed": selected.value.includes(collection.id),
									onClick: ($event) => toggleCollection(collection)
								}, [
									createBaseVNode("span", {
										class: normalizeClass(["fmhy-sp-check-box", { "is-checked": selected.value.includes(collection.id) }]),
										"aria-hidden": "true"
									}, [selected.value.includes(collection.id) ? (openBlock(), createBlock(unref(Check), {
										key: 0,
										size: 12,
										"stroke-width": 3
									})) : createCommentVNode("", true)], 2),
									createBaseVNode("span", {
										class: "fmhy-sp-collection-dot",
										style: normalizeStyle({ background: collection.color }),
										"aria-hidden": "true"
									}, null, 4),
									createBaseVNode("span", _hoisted_14, toDisplayString(collection.name), 1),
									createBaseVNode("span", _hoisted_15, toDisplayString(unref(countForCollection)(collection.id)), 1)
								], 10, _hoisted_13);
							}), 128))]),
							createBaseVNode("div", _hoisted_16, [!newCollectionOpen.value ? (openBlock(), createElementBlock("button", {
								key: 0,
								type: "button",
								class: "fmhy-sp-text-button",
								onClick: submitNewCollection
							}, [createVNode(unref(Plus), {
								size: 14,
								"aria-hidden": "true"
							}), _cache[8] || (_cache[8] = createTextVNode(" New collection ", -1))])) : (openBlock(), createElementBlock("div", _hoisted_17, [
								createBaseVNode("div", _hoisted_18, [
									withDirectives(createBaseVNode("input", {
										"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => newCollectionName.value = $event),
										class: "fmhy-sp-input",
										type: "text",
										maxlength: "40",
										placeholder: "Collection name",
										"aria-label": "New collection name",
										onKeydown: withKeys(withModifiers(submitNewCollection, ["prevent"]), ["enter"])
									}, null, 40, _hoisted_19), [[vModelText, newCollectionName.value]]),
									createBaseVNode("button", {
										type: "button",
										class: "fmhy-sp-btn is-primary is-small",
										onClick: submitNewCollection
									}, " Add "),
									createBaseVNode("button", {
										type: "button",
										class: "fmhy-sp-icon-button is-small",
										"aria-label": "Cancel new collection",
										onClick: _cache[3] || (_cache[3] = ($event) => newCollectionOpen.value = false)
									}, [createVNode(unref(X), {
										size: 14,
										"aria-hidden": "true"
									})])
								]),
								createBaseVNode("div", _hoisted_20, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(COLLECTION_COLORS), (color) => {
									return openBlock(), createElementBlock("button", {
										key: color,
										type: "button",
										class: normalizeClass(["fmhy-sp-swatch", { "is-active": newCollectionColor.value === color }]),
										style: normalizeStyle({ background: color }),
										"aria-label": `Use colour ${color}`,
										"aria-pressed": newCollectionColor.value === color,
										onClick: ($event) => newCollectionColor.value = color
									}, [newCollectionColor.value === color ? (openBlock(), createBlock(unref(Check), {
										key: 0,
										size: 11,
										"stroke-width": 3
									})) : createCommentVNode("", true)], 14, _hoisted_21);
								}), 128))]),
								newCollectionError.value ? (openBlock(), createElementBlock("p", _hoisted_22, toDisplayString(newCollectionError.value), 1)) : createCommentVNode("", true)
							]))])
						]),
						createBaseVNode("div", _hoisted_23, [_cache[9] || (_cache[9] = createBaseVNode("label", {
							class: "fmhy-sp-field-label",
							for: "fmhy-sp-note"
						}, [createBaseVNode("span", null, "Note"), createBaseVNode("span", { class: "fmhy-sp-muted" }, "optional")], -1)), withDirectives(createBaseVNode("textarea", {
							id: "fmhy-sp-note",
							"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => note.value = $event),
							class: "fmhy-sp-textarea",
							rows: "3",
							maxlength: "500",
							placeholder: "Why did you save this link?"
						}, null, 512), [[vModelText, note.value]])]),
						createBaseVNode("p", _hoisted_24, [
							_cache[10] || (_cache[10] = createTextVNode(" From ", -1)),
							createBaseVNode("strong", null, toDisplayString(meta.value.sourceTitle), 1),
							meta.value.contextHeading ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(" · " + toDisplayString(meta.value.contextHeading), 1)], 64)) : createCommentVNode("", true)
						])
					]),
					createBaseVNode("footer", _hoisted_25, [
						existing.value ? (openBlock(), createElementBlock("button", {
							key: 0,
							type: "button",
							class: "fmhy-sp-btn is-danger-ghost",
							onClick: remove
						}, " Remove ")) : createCommentVNode("", true),
						_cache[11] || (_cache[11] = createBaseVNode("span", { class: "fmhy-sp-editor-spacer" }, null, -1)),
						createBaseVNode("button", {
							type: "button",
							class: "fmhy-sp-btn is-secondary",
							onClick: _cache[5] || (_cache[5] = (...args) => unref(closeEditor) && unref(closeEditor)(...args))
						}, " Cancel "),
						createBaseVNode("button", {
							type: "button",
							class: "fmhy-sp-btn is-primary",
							disabled: selected.value.length === 0,
							onClick: save
						}, toDisplayString(existing.value ? "Save changes" : "Save link"), 9, _hoisted_26)
					])
				], 6)])) : createCommentVNode("", true)]);
			};
		}
	});
	var _hoisted_1$1 = {
		class: "fmhy-sp-toasts",
		"aria-live": "polite",
		"aria-atomic": "false"
	};
	var _hoisted_2$1 = { class: "fmhy-sp-toast-message" };
	var _hoisted_3 = {
		key: 0,
		class: "fmhy-sp-toast-actions"
	};
	var _hoisted_4 = ["onClick"];
	var _hoisted_5 = ["onClick"];
	var ToastStack_default = defineComponent({
		__name: "ToastStack",
		setup(__props) {
			function iconFor(toast) {
				if (toast.tone === "danger") return TriangleAlert;
				if (toast.tone === "info") return Info;
				return CircleCheck;
			}
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("div", _hoisted_1$1, [createVNode(TransitionGroup, { name: "fmhy-sp-toast" }, {
					default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(toasts), (toast) => {
						return openBlock(), createElementBlock("div", {
							key: toast.id,
							class: normalizeClass(["fmhy-sp-toast", `is-${toast.tone}`]),
							role: "status"
						}, [
							(openBlock(), createBlock(resolveDynamicComponent(iconFor(toast)), {
								size: 18,
								"stroke-width": 2.2,
								class: "fmhy-sp-toast-icon",
								"aria-hidden": "true"
							})),
							createBaseVNode("p", _hoisted_2$1, toDisplayString(toast.message), 1),
							toast.actions.length ? (openBlock(), createElementBlock("div", _hoisted_3, [(openBlock(true), createElementBlock(Fragment, null, renderList(toast.actions, (action) => {
								return openBlock(), createElementBlock("button", {
									key: action.label,
									type: "button",
									class: "fmhy-sp-toast-action",
									onClick: ($event) => unref(runToastAction)(toast, action)
								}, toDisplayString(action.label), 9, _hoisted_4);
							}), 128))])) : createCommentVNode("", true),
							createBaseVNode("button", {
								type: "button",
								class: "fmhy-sp-icon-button fmhy-sp-toast-close",
								"aria-label": "Dismiss notification",
								onClick: ($event) => unref(dismissToast)(toast.id)
							}, [createVNode(unref(X), {
								size: 14,
								"aria-hidden": "true"
							})], 8, _hoisted_5)
						], 2);
					}), 128))]),
					_: 1
				})]);
			};
		}
	});
	var currentPath = ref(normalisePath(window.location.pathname));
	var routeVersion = ref(0);
	var installed$1 = false;
	function installRouteWatcher() {
		if (installed$1) return () => void 0;
		installed$1 = true;
		let frame = 0;
		const refresh = () => {
			if (frame) return;
			frame = window.requestAnimationFrame(() => {
				frame = 0;
				const next = normalisePath(window.location.pathname);
				if (next !== currentPath.value) {
					currentPath.value = next;
					routeVersion.value += 1;
				}
			});
		};
		const observer = new MutationObserver(refresh);
		observer.observe(document.body, {
			childList: true,
			subtree: true,
			characterData: true
		});
		window.addEventListener("popstate", refresh);
		window.addEventListener("hashchange", refresh);
		return () => {
			installed$1 = false;
			window.cancelAnimationFrame(frame);
			observer.disconnect();
			window.removeEventListener("popstate", refresh);
			window.removeEventListener("hashchange", refresh);
		};
	}
	var BUTTON_CLASS = "fmhy-sp-link-save";
	var VISIBLE_CLASS = "is-visible";
	var SAVED_CLASS = "is-saved";
	var HIDE_DELAY = 520;
	var buttons = new Map();
	var anchors = new WeakMap();
	var knownButtons = new Set();
	var hideTimer = 0;
	var scanTimer = 0;
	var installed = false;
	var coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)");
	var narrowViewport = window.matchMedia("(max-width: 767px)");
	function bookmarkSvg() {
		return "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.1\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\"/></svg>";
	}
	function savedFor(anchor) {
		const url = normaliseExternalUrl(anchor.getAttribute("href"));
		return Boolean(url && getLink(url));
	}
	function isRowSecondary(anchor) {
		const item = anchor.closest("li");
		if (!item) return false;
		const links = Array.from(item.querySelectorAll("a[href]")).filter((candidate) => normaliseExternalUrl(candidate.getAttribute("href")));
		return links.length > 1 && links[0] !== anchor;
	}
	function syncButton(anchor, button) {
		const label = linkTitle(anchor) || "this link";
		const saved = savedFor(anchor);
		button.classList.toggle(SAVED_CLASS, saved);
		button.classList.toggle("is-alias", isAliasLink(anchor));
		button.classList.toggle("is-row-secondary", isRowSecondary(anchor));
		button.setAttribute("aria-label", saved ? `Edit saved link ${label}` : `Save ${label} for later`);
		button.title = saved ? "Saved. Edit collections and note" : "Save for later";
		button.dataset.fmhyLinkControl = "";
		button.dataset.fmhyLinkUrl = normaliseExternalUrl(anchor.getAttribute("href")) ?? "";
	}
	function hoverOnly() {
		return settings.revealLinkActionsOnHover && !coarsePointer.matches && !narrowViewport.matches;
	}
	function syncTabStop(button) {
		const hidden = hoverOnly() && !button.classList.contains(VISIBLE_CLASS);
		button.tabIndex = hidden ? -1 : 0;
		button.setAttribute("aria-hidden", hidden ? "true" : "false");
	}
	function reveal(button) {
		window.clearTimeout(hideTimer);
		for (const other of knownButtons) if (other !== button) {
			other.classList.remove(VISIBLE_CLASS);
			if (!other.contains(document.activeElement)) syncTabStop(other);
		}
		button.classList.add(VISIBLE_CLASS);
		button.tabIndex = 0;
		button.setAttribute("aria-hidden", "false");
	}
	function hide(button) {
		button.classList.remove(VISIBLE_CLASS);
		if (!button.contains(document.activeElement)) syncTabStop(button);
	}
	function scheduleHide(button) {
		window.clearTimeout(hideTimer);
		if (!settings.revealLinkActionsOnHover || coarsePointer.matches) return;
		hideTimer = window.setTimeout(() => {
			if (!button.contains(document.activeElement)) hide(button);
		}, HIDE_DELAY);
	}
	function pairFromTarget(target) {
		if (!(target instanceof Element)) return null;
		const button = target.closest(`.${BUTTON_CLASS}`);
		if (button) {
			const anchor = anchors.get(button);
			return anchor ? {
				anchor,
				button
			} : null;
		}
		const anchor = target.closest("a[href]");
		if (!anchor) return null;
		const candidate = buttons.get(anchor);
		return candidate ? {
			anchor,
			button: candidate
		} : null;
	}
	function decorate(anchor) {
		if (buttons.has(anchor)) return;
		const next = anchor.nextElementSibling;
		if (next instanceof HTMLButtonElement && next.classList.contains(BUTTON_CLASS)) return;
		const button = document.createElement("button");
		button.type = "button";
		button.className = BUTTON_CLASS;
		button.innerHTML = bookmarkSvg();
		anchor.insertAdjacentElement("afterend", button);
		buttons.set(anchor, button);
		anchors.set(button, anchor);
		knownButtons.add(button);
		syncButton(anchor, button);
		syncTabStop(button);
	}
	function clearStale() {
		for (const button of [...knownButtons]) {
			const anchor = anchors.get(button);
			if (!anchor?.isConnected || anchor.nextElementSibling !== button) {
				button.remove();
				knownButtons.delete(button);
				if (anchor) buttons.delete(anchor);
				anchors.delete(button);
			}
		}
	}
	function scan$1() {
		for (const anchor of document.querySelectorAll(".vp-doc a[href]")) {
			if (!isSavableLink(anchor)) continue;
			if (buttons.has(anchor)) {
				const button = buttons.get(anchor);
				if (button) syncButton(anchor, button);
				continue;
			}
			decorate(anchor);
		}
		clearStale();
	}
	function scheduleScan() {
		if (scanTimer) return;
		scanTimer = window.setTimeout(() => {
			scanTimer = 0;
			scan$1();
		}, 80);
	}
	function refreshAll() {
		for (const [anchor, button] of buttons) {
			if (!anchor.isConnected) continue;
			syncButton(anchor, button);
			syncTabStop(button);
		}
	}
	function onPointerOver(event) {
		if (!hoverOnly()) return;
		const pair = pairFromTarget(event.target);
		if (pair) reveal(pair.button);
	}
	function onPointerOut(event) {
		if (!hoverOnly()) return;
		const pair = pairFromTarget(event.target);
		if (!pair) return;
		const related = event.relatedTarget;
		if (related instanceof Node && (pair.anchor.contains(related) || pair.button.contains(related))) return;
		scheduleHide(pair.button);
	}
	function onFocusIn(event) {
		if (!hoverOnly()) return;
		const pair = pairFromTarget(event.target);
		if (!pair) return;
		reveal(pair.button);
	}
	function onFocusOut(event) {
		if (!hoverOnly()) return;
		const pair = pairFromTarget(event.target);
		if (!pair) return;
		const related = event.relatedTarget;
		if (related instanceof Node && (pair.anchor.contains(related) || pair.button.contains(related))) return;
		scheduleHide(pair.button);
	}
	function onClick(event) {
		const target = event.target;
		if (!(target instanceof Element)) return;
		const button = target.closest(`.${BUTTON_CLASS}`);
		if (!button) return;
		const anchor = anchors.get(button);
		if (!anchor) return;
		event.preventDefault();
		event.stopPropagation();
		const meta = readLinkMeta(anchor);
		if (!meta) return;
		if (hoverOnly()) reveal(button);
		quickSaveLink(meta, button);
	}
	function onSettingsChange() {
		applySettingsToDocument();
		for (const button of knownButtons) if (!settings.revealLinkActionsOnHover || coarsePointer.matches) {
			button.tabIndex = 0;
			button.setAttribute("aria-hidden", "false");
		} else if (!button.classList.contains(VISIBLE_CLASS)) {
			button.classList.remove(VISIBLE_CLASS);
			button.tabIndex = -1;
		}
	}
	function onPointerCapabilityChange() {
		for (const button of knownButtons) syncTabStop(button);
	}
	function hideVisible() {
		window.clearTimeout(hideTimer);
		for (const button of knownButtons) if (button.classList.contains(VISIBLE_CLASS)) hide(button);
	}
	function installLinkControls() {
		if (installed) return () => void 0;
		installed = true;
		applySettingsToDocument();
		scan$1();
		const observer = new MutationObserver(scheduleScan);
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
		document.addEventListener("pointerover", onPointerOver, true);
		document.addEventListener("pointerout", onPointerOut, true);
		document.addEventListener("focusin", onFocusIn, true);
		document.addEventListener("focusout", onFocusOut, true);
		document.addEventListener("click", onClick, true);
		window.addEventListener("scroll", hideVisible, {
			capture: true,
			passive: true
		});
		window.addEventListener("resize", hideVisible);
		window.addEventListener(CHANGE_EVENT, refreshAll);
		coarsePointer.addEventListener("change", onPointerCapabilityChange);
		narrowViewport.addEventListener("change", onPointerCapabilityChange);
		const stopWatching = watch(() => settings.revealLinkActionsOnHover, onSettingsChange);
		const stopRouteWatch = watch([currentPath, routeVersion], scheduleScan);
		return () => {
			installed = false;
			observer.disconnect();
			window.clearTimeout(scanTimer);
			window.clearTimeout(hideTimer);
			document.removeEventListener("pointerover", onPointerOver, true);
			document.removeEventListener("pointerout", onPointerOut, true);
			document.removeEventListener("focusin", onFocusIn, true);
			document.removeEventListener("focusout", onFocusOut, true);
			document.removeEventListener("click", onClick, true);
			window.removeEventListener("scroll", hideVisible, true);
			window.removeEventListener("resize", hideVisible);
			window.removeEventListener(CHANGE_EVENT, refreshAll);
			coarsePointer.removeEventListener("change", onPointerCapabilityChange);
			narrowViewport.removeEventListener("change", onPointerCapabilityChange);
			stopWatching();
			stopRouteWatch();
			for (const button of knownButtons) button.remove();
			knownButtons.clear();
			buttons.clear();
			document.documentElement.classList.remove("fmhy-sp-hover-link-actions");
		};
	}
	var DESKTOP_CLASS = "fmhy-sp-nav-desktop";
	var MOBILE_CLASS = "fmhy-sp-nav-mobile";
	var TOP_CLASS = "fmhy-sp-nav-top";
	function normalise(value) {
		return (value ?? "").replace(/\s+/g, " ").trim().toLowerCase();
	}
	function countMarkup() {
		return "<span class=\"fmhy-sp-nav-count\" data-fmhy-saved-count hidden>0</span>";
	}
	function attachClick(link) {
		link.addEventListener("click", (event) => {
			event.preventDefault();
			event.stopPropagation();
			openSavedPage();
			closeHostMenus(link);
		});
	}
	function closeHostMenus(link) {
		const trigger = link.closest(".VPNavBarMenuGroup, .VPNavScreenMenuGroup")?.querySelector(":scope > button");
		if (trigger?.getAttribute("aria-expanded") === "true") trigger.click();
		document.querySelector(".VPNavBarHamburger[aria-expanded=\"true\"]")?.click();
		document.activeElement?.blur();
	}
	function makeDesktopItem() {
		const wrapper = document.createElement("div");
		wrapper.className = `VPMenuLink ${DESKTOP_CLASS}`;
		const link = document.createElement("a");
		link.className = "VPLink link";
		link.href = "#/saved";
		link.innerHTML = `<span>🔖 Saved links ${countMarkup()}</span>`;
		attachClick(link);
		wrapper.append(link);
		return wrapper;
	}
	function makeMobileItem() {
		const wrapper = document.createElement("div");
		wrapper.className = `item ${MOBILE_CLASS}`;
		const link = document.createElement("a");
		link.className = "VPLink link VPNavScreenMenuGroupLink";
		link.href = "#/saved";
		link.innerHTML = `<span>🔖 Saved links ${countMarkup()}</span>`;
		attachClick(link);
		wrapper.append(link);
		return wrapper;
	}
	function insertInMoreGroup(groups, itemClass, makeItem, textSelector) {
		for (const group of groups) {
			if (!normalise(group.querySelector(textSelector)?.textContent).includes("more")) continue;
			const items = group.querySelector(".items");
			if (!items) continue;
			if (!items.querySelector(`.${itemClass}`)) items.prepend(makeItem());
			return true;
		}
		return false;
	}
	function refreshBadges() {
		const count = savedCount.value;
		document.querySelectorAll("[data-fmhy-saved-count]").forEach((badge) => {
			badge.textContent = String(count);
			badge.hidden = count === 0;
		});
	}
	function scan() {
		const desktopFound = insertInMoreGroup(document.querySelectorAll(".VPNavBarMenuGroup"), DESKTOP_CLASS, makeDesktopItem, ":scope > button .text");
		insertInMoreGroup(document.querySelectorAll(".VPNavScreenMenuGroup"), MOBILE_CLASS, makeMobileItem, ":scope > button .button-text");
		const topNav = document.querySelector(".VPNavBarMenu");
		if (topNav) {
			const existingTop = topNav.querySelector(`.${TOP_CLASS}`);
			if (!desktopFound) {
				if (!existingTop) {
					const link = document.createElement("a");
					link.className = `VPLink link VPNavBarMenuLink ${TOP_CLASS}`;
					link.href = "#/saved";
					link.innerHTML = `<span>🔖 Saved links ${countMarkup()}</span>`;
					attachClick(link);
					topNav.append(link);
				}
			} else existingTop?.remove();
		}
		refreshBadges();
	}
	function installNavIntegration() {
		let frame = 0;
		const schedule = () => {
			if (frame) return;
			frame = window.requestAnimationFrame(() => {
				frame = 0;
				scan();
			});
		};
		const observer = new MutationObserver(schedule);
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
		const onChange = () => refreshBadges();
		window.addEventListener(CHANGE_EVENT, onChange);
		schedule();
		return () => {
			observer.disconnect();
			window.cancelAnimationFrame(frame);
			window.removeEventListener(CHANGE_EVENT, onChange);
			document.querySelectorAll(`.${DESKTOP_CLASS}, .${MOBILE_CLASS}, .${TOP_CLASS}`).forEach((node) => node.remove());
		};
	}
	var _hoisted_1 = ["aria-label", "title"];
	var _hoisted_2 = {
		key: 0,
		class: "fmhy-sp-fab-count",
		"aria-hidden": "true"
	};
	var AppShell_default = defineComponent({
		__name: "AppShell",
		setup(__props) {
			const fabElement = ref(null);
			const cleanups = [];
			const countLabel = computed(() => savedCount.value > 99 ? "99+" : String(savedCount.value));
			const fabLabel = computed(() => savedCount.value > 0 ? `Open saved links (${savedCount.value})` : "Open saved links");
			function onFabClick() {
				fabElement.value?.blur();
				openSavedPage();
			}
			function onStorage(event) {
				if (event.key === "fmhy-saved-links.v1") syncFromStorage();
				if (event.key === "fmhy-saved-links.settings.v1") syncSettingsFromStorage();
			}
			function setInert(selector, value) {
				document.querySelectorAll(selector).forEach((element) => {
					if (value) element.setAttribute("inert", "");
					else element.removeAttribute("inert");
				});
			}
			function lockBody(savedOpen, editing) {
				document.body.classList.toggle("fmhy-sp-page-open", savedOpen);
				document.documentElement.classList.toggle("fmhy-sp-page-open", savedOpen);
				document.body.classList.toggle("fmhy-sp-editor-open", editing);
				setInert("#VPContent, .VPSidebar, .VPFooter", savedOpen || editing);
				setInert(".fmhy-sp-page", editing);
			}
			onMounted(() => {
				cleanups.push(installRouteWatcher());
				cleanups.push(installNavIntegration());
				cleanups.push(installLinkControls());
				cleanups.push(initSavedRoute());
				window.addEventListener("storage", onStorage);
			});
			onBeforeUnmount(() => {
				for (const cleanup of cleanups.splice(0)) cleanup();
				window.removeEventListener("storage", onStorage);
				document.body.classList.remove("fmhy-sp-page-open", "fmhy-sp-editor-open");
				document.documentElement.classList.remove("fmhy-sp-page-open", "fmhy-sp-hover-link-actions");
				setInert("#VPContent, .VPSidebar, .VPFooter", false);
				setInert(".fmhy-sp-page", false);
			});
			watch([currentPath, routeVersion], () => {
				if (savedPageOpen.value && window.location.hash !== "#/saved") closeSavedPage();
			});
			watch([savedPageOpen, editorOpen], () => {
				lockBody(savedPageOpen.value, editorOpen.value);
			}, { immediate: true });
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock(Fragment, null, [
					!unref(savedPageOpen) && !unref(editorOpen) ? (openBlock(), createElementBlock("button", {
						key: 0,
						ref_key: "fabElement",
						ref: fabElement,
						type: "button",
						class: "fmhy-sp-fab",
						"aria-label": fabLabel.value,
						title: fabLabel.value,
						onClick: onFabClick
					}, [createVNode(unref(Bookmark), {
						size: 23,
						"stroke-width": 2.2,
						"aria-hidden": "true"
					}), unref(savedCount) > 0 ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(countLabel.value), 1)) : createCommentVNode("", true)], 8, _hoisted_1)) : createCommentVNode("", true),
					unref(savedPageOpen) ? (openBlock(), createBlock(SavedPage_default, { key: 1 })) : createCommentVNode("", true),
					createVNode(SaveDialog_default),
					createVNode(ToastStack_default)
				], 64);
			};
		}
	});
	var core = Y();
	core.useAdapter(g());
	core.apply([ne({
		name: "fmhy-saved-shell",
		injectAt: "body",
		adapter: "vue",
		component: AppShell_default,
		reinject: true
	})]);
})();
