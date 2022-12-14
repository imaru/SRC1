var repo_site = "https://imaru.github.io/SRC1/";
 
 /* create timeline */
 var timeline = [];

 var swid = document.documentElement.clientWidth*0.8;
 var shgt = document.documentElement.clientHeight*0.8;
 console.log(shgt);
 console.log(swid);

 /* preload images */
 var preload = {
   type: 'preload',
   images: [repo_site+'img/blue.png', repo_site+'img/orange.png']
 }
 timeline.push(preload);

 /* define welcome message trial */
 var welcome = {
   type: "html-keyboard-response",
   stimulus: "何かキーを押すと次に進みます"
 };
 timeline.push(welcome);

 /* define instructions trial */
var practice = {
  type: "html-keyboard-response",
  stimulus: "<p>続いて本実験が始まります</p>" +
    "<p>本実験は20試行実施されます</p>"+
    "<p>次のページでは、再度実験の説明が表示されます</p>"+
    "<p>何かキーを押して進んでください</p>",
  post_trial_gap: 100
};
timeline.push(practice);

 var instructions = {
   type: "html-keyboard-response",
   stimulus: "<p>実験では色のついた円が画面の左右どちらかに呈示されます。</p>" +
     " <p>円が<strong>青</strong>のときは Fキー で、円が<strong>オレンジ</strong>のときは Jキー で、"+
     " できるだけ早く反応してください。</p> " +
     " <div style='width: 700px;'>" +
     " <div style='float: left;'><img src='"+repo_site+"img/blue.png'></img>" +
     " <p class='small'><strong>Fキー</strong></p></div>" + 
     " <div style='float: right;'><img src='"+repo_site+"img/orange.png'></img> " +
     " <p class='small'><strong>Jキー</strong></p></div>" +
     "</div>" +
     " <div>何かキーを押すと実験が始まります。</div> ",
   post_trial_gap: 100
 };
 timeline.push(instructions);

 /* test trials */
function drawBlueL(c){
    var ctx = c.getContext('2d');
    const chara = new Image();
    chara.src= repo_site+'img/blue.png';
    var iwid = chara.width;
    var ihgt = chara.height;
    ctx.drawImage(chara, swid/2-iwid*1.5, shgt/2-ihgt/2);
}

function drawBlueR(c){
    var ctx = c.getContext('2d');
    const chara = new Image();
    chara.src= repo_site+'img/blue.png';
    var iwid = chara.width;
    var ihgt = chara.height;
    ctx.drawImage(chara, swid/2+iwid*.5, shgt/2-ihgt/2);
}

function drawOrangeL(c){
    var ctx = c.getContext('2d');
    const chara = new Image();
    chara.src= repo_site+'img/orange.png';
    var iwid = chara.width;
    var ihgt = chara.height;
    ctx.drawImage(chara, swid/2-iwid*1.5, shgt/2-ihgt/2);
}

function drawOrangeR(c){
    var ctx = c.getContext('2d');
    const chara = new Image();
    chara.src= repo_site+'img/orange.png';
    var iwid = chara.width;
    var ihgt = chara.height;
    ctx.drawImage(chara, swid/2+iwid/2, shgt/2-ihgt/2);
}

 var test_stimuli = [
   { stimulus: drawBlueL,  correct_response: 'f'},
   { stimulus: drawOrangeL,  correct_response: 'j'},
   { stimulus: drawBlueR,  correct_response: 'f'},
   { stimulus: drawOrangeR,  correct_response: 'j'}
 ];

 var fixation = {
   type: 'html-keyboard-response',
   stimulus: '<div style="font-size:60px;">+</div>',
   choices: jsPsych.NO_KEYS,
   trial_duration: function(){
     return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
   },
   data: {
     task: 'fixation'
   }
 }

 var test = {
   type: "canvas-keyboard-response",
   canvas_size: [shgt, swid],
   stimulus: jsPsych.timelineVariable('stimulus'),
   choices: ['f', 'j'],
   data: {
     task: 'response',
     correct_response: jsPsych.timelineVariable('correct_response')
   },
   on_finish: function(data){
     data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
   }
 }

 var test_procedure = {
   timeline: [fixation, test],
   timeline_variables: test_stimuli,
   repetitions: 5,
   randomize_order: true
 }
 timeline.push(test_procedure);

 /* define debrief */

 var debrief_block = {
   type: "html-keyboard-response",
   stimulus: function() {

     var trials = jsPsych.data.get().filter({task: 'response'});
     var correct_trials = trials.filter({correct: true});
     var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
     var rt = Math.round(correct_trials.select('rt').mean());

     return `<p>正答率 ${accuracy}% </p>
       <p>平均正反応時間 ${rt}ms</p>
       <p>ご協力ありがとうございました。何かキーを押すと実験が終了します。</p>`;

   }
 };
 timeline.push(debrief_block);