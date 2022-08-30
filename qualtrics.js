Qualtrics.SurveyEngine.addOnload(function()
{
     /*Place your JavaScript here to run when the page is fully displayed*/
     var qthis = this;
     qthis.hideNextButton();
 
     var task_github = "https://imaru.github.io/SRC1/"; 
     // https://<GitHubのユーザー名>.github.io/<レポジトリ名>/
 
     var requiredResources = [
         task_github + "jspsych-6.3.1/jspsych.js",
         task_github + "jspsych-6.3.1/plugins/jspsych-html-keyboard-response.js",
         task_github + "jspsych-6.3.1/plugins/jspsych-image-keyboard-response.js",
         task_github + "jspsych-6.3.1/plugins/jspsych-preload.js",
         task_github + "main.js"
     ];
 
     function loadScript(idx) {
         console.log("Loading ", requiredResources[idx]);
         jQuery.getScript(requiredResources[idx], function () {
             if ((idx + 1) < requiredResources.length) {
                 loadScript(idx + 1);
             } else {
                 initExp();
             }
         });
     }
 
     if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
         loadScript(0);
     }
 
     jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
     jQuery("<div id = 'display_stage'></div>").appendTo('body');
     function initExp() {
        jsPsych.init({
            timeline: timeline,
            display_element: 'display_stage',
            on_finish: function (data) {
       
                  var datajs = jsPsych.data.get().json();
                 
                Qualtrics.SurveyEngine.setEmbeddedData("datajs", datajs);
         
                jQuery('display_stage').remove();
                jQuery('display_stage_background').remove();
         
                qthis.clickNextButton();
            }
        });
      };
});

Qualtrics.SurveyEngine.addOnReady(function()
{
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
    /*Place your JavaScript here to run when the page is unloaded*/

});