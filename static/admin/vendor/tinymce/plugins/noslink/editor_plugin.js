(function(){tinymce.PluginManager.requireLangPack("noslink");tinymce.create("tinymce.plugins.NosLinkPlugin",{init:function(b,c){var a=this;a.editor=b;b.addCommand("mceNosLink",function(f,d,e){a._nosLink(f,d,e)});b.onNodeChange.add(function(f,d,k,i,e){var h,j;function g(m){var n,l=e.parents,o=m;if(typeof(m)=="string"){o=function(p){return p.nodeName==m}}for(n=0;n<l.length;n++){if(o(l[n])){return l[n]}}}h=g("A");if(j=d.get("noslink")){j.setDisabled(!h&&i);j.setActive(!!h)}})},createControl:function(e,a){var b=this,d;if(e==="noslink"){d=a.createSplitButton("noslink",{title:"noslink.link_title",label:"noslink.link_label",onclick:function(){b.editor.execCommand("mceNosLink",true,"")},"class":"mce_link"},tinymce.ui.NosSplitButton);d.onRenderMenu.add(function(g,f){f.add({title:"noslink.link_title","class":"mceMenuItemTitle"}).setDisabled(1);f.add({title:"noslink.link_title",icon:"link",onclick:function(){b.editor.execCommand("mceNosLink",true,"")},id:"link"});f.add({title:"noslink.unlink_desc",icon:"unlink",onclick:function(){b.editor.execCommand("unlink",false,"")},id:"unlink"});f.onShowMenu.add(function(c){var k=b.editor.selection.getNode(),j,i,h;j=tinymce.DOM.getParent(k,"A");i=!!j;h=i&&(j.name||(j.id&&!j.href));c.items.link.setDisabled(h);c.items.link.setActive(i&&!h);c.items.unlink.setDisabled(!i)})});return d}return null},_nosLink:function(d,g){var a=this.editor,f=a.dom.getParent(a.selection.getNode(),"A");var c=a.selection.getBookmark(1);var b=null;b=$nos(a.getElement()).nosDialog({contentUrl:"admin/nos/wysiwyg/link"+(f?"/edit":""),title:f?a.getLang("nos.link_edit"):a.getLang("nos.link_insert"),ajax:true,open:function(e){$(e.target).data("tinymce",a)}});b.bind("insert.link",function(h,e){b.nosDialog("close");if(tinymce.isIE){a.selection.moveToBookmark(c)}if(f==null){a.getDoc().execCommand("unlink",false,null);a.execCommand("mceInsertLink",false,"#mce_temp_url#",{skip_undo:1});tinymce.each(a.dom.select("a"),function(i){if(a.dom.getAttrib(i,"href")=="#mce_temp_url#"){f=i;a.dom.setAttribs(f,{href:e.href,title:e.title,target:e.target})}})}else{a.dom.setAttribs(f,{href:e.href,title:e.title,target:e.target})}if(f.childNodes.length!=1||f.firstChild.nodeName!="IMG"){a.focus();a.selection.select(f);a.selection.collapse(0);a.windowManager.bookmark=a.selection.getBookmark(1)}a.execCommand("mceEndUndoLevel")})}});tinymce.PluginManager.add("noslink",tinymce.plugins.NosLinkPlugin)})();(function(c){var b=c.DOM,a=c.dom.Event,d=c.each;c.create("tinymce.ui.NosSplitButton:tinymce.ui.SplitButton",{NosSplitButton:function(g,f,e){this.parent(g,f,e);this.classPrefix="mceSplitButton";f.label=e.translate(f.label)},renderHTML:function(){var k=this.classPrefix,j=this.settings,i,e,g=this,f;e=b.encode(j.label||"");i="<tbody><tr>";if(j.image){f=b.createHTML("img ",{src:j.image,role:"presentation","class":"mceAction "+j["class"]})+e}else{f=b.createHTML("span",{"class":"mceAction "+j["class"]},"")}f+=(e?'<span class="'+k+'Label">'+e+"</span>":"");f+=b.createHTML("span",{"class":"mceVoiceLabel mceIconOnly",id:g.id+"_voice",style:"display:none;"},j.title);i+="<td >"+b.createHTML("a",{role:"button",id:g.id+"_action",tabindex:"-1",href:"javascript:;","class":"nosActionLabel mceAction "+(e?" "+k+"Labeled":"")+" "+j["class"],onclick:"return false;",onmousedown:"return false;",title:j.title},f)+"</td>";f=b.createHTML("span",{"class":"mceOpen "+j["class"]},'<span style="display:none;" class="mceIconOnly" aria-hidden="true">\u25BC</span>');i+="<td >"+b.createHTML("a",{role:"button",id:g.id+"_open",tabindex:"-1",href:"javascript:;","class":"mceOpen "+j["class"],onclick:"return false;",onmousedown:"return false;",title:j.title},f)+"</td>";i+="</tr></tbody>";i=b.createHTML("table",{role:"presentation","class":"mceSplitButton mceSplitButtonEnabled "+j["class"],cellpadding:"0",cellspacing:"0",title:j.title},i);return b.createHTML("div",{id:g.id,role:"button",tabindex:"0","aria-labelledby":g.id+"_voice","aria-haspopup":"true"},i)}})})(tinymce);