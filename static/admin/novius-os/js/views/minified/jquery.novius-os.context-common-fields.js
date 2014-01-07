/**
 * NOVIUS OS - Web OS for digital communication
 *
 * @copyright  2011 Novius
 * @license    GNU Affero General Public License v3 or (at your option) any later version
 *             http://www.gnu.org/licenses/agpl-3.0.html
 * @link http://www.novius-os.org
 */
define("jquery-nos-context-common-fields",["jquery-nos"],function(a){a.fn.extend({nosContextCommonFields:function(b){b=b||{texts:{popin_title:"This field is common to all contexts/languages/sites",popin_content:"When you modify the value of this field, the change is also applied to the following contexts/languages/sites:",popin_ok:"OK, I understand",popin_cancel:"Cancel, I won't modify it"}};return this.each(function(){var d=a(this),c=function(g){var e=a("<div><p></p><ul></ul></div>").find("p").html(b.texts.popin_content).end(),f=e.find("ul"),h=this.data("other-contexts");a.each(h,function(k,j){a("<li></li>").html(j).appendTo(f)});d.nosDialog({title:b.texts.popin_title,content:e,width:500,height:130+h.length*20,buttons:[{text:b.texts.popin_ok,click:function(){g();a(this).wijdialog("close")}},{text:b.texts.popin_cancel,click:function(){a(this).wijdialog("close")}}]})};d.find("[context_common_field]").each(function(){var f,e=a(this).data("dialog_context_common_field",c).bind("context_common_field",function(j,h,g){var i=function(){f.css({position:"absolute",width:g.outerWidth()+"px",height:g.outerHeight()+"px"}).position({my:"top left",at:"top left",collision:"none",of:g})};if(e.is(":checkbox")&&e.is(":checked")){a('<input type="hidden" class="js_fake_checkbox_context_common_field" />').attr({name:e.attr("name"),value:e.attr("value")}).insertBefore(e)}e.data("click_context_common_field",function(){e.prop("disabled",false);e.removeAttr("disabled");if(e.is(":checkbox")){e.prev(".js_fake_checkbox_context_common_field").remove()}if(a.isFunction(h)){h()}f.detach()});g=g||e;f=a('<div class="js_context_common_field"></div>').insertAfter(g).click(function(){if(e.prop("disabled")||e.attr("disabled")){c.call(e,function(){var k=e.data("click_context_common_field");if(a.isFunction(k)){k()}})}});if(e===g){g.parent().on("mousemove",i).trigger("mousemove")}else{g.parent().off("mousemove");i()}});e.nosOnShow("one",function(){e.trigger("context_common_field")});e.one("inputfilethumbenter",function(){e.trigger("context_common_field",[function(){e.inputFileThumb("option","disabled",false)},e.parents(".ui-inputfilethumb")]);return false});e.one("inputfilethumbinit",function(){e.inputFileThumb("option","disabled",true);f&&f.remove()})})})}});return a});