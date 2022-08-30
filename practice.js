var repo_site = "https://imaru.github.io/SRC1/";
 
 /* create timeline */
 var tlprac = [];

 /* preload images */
 var preload = {
   type: 'preload',
   images: [repo_site+'img/blue.png', repo_site+'img/orange.png']
 }
 tlprac.push(preload);

 /* define welcome message trial */
 var welcome = {
   type: "html-keyboard-response",
   stimulus: "Welcome to the experiment. Press any key to begin."
 };
 tlprac.push(welcome);

 /* define instructions trial */
var practice = {
  type: "html-keyboard-response",
  stimulus: "<p>まずは練習を行ってもらいます</p>" +
    "<p>練習は4試行実施されます</p>"+
    "<p>次のページでは実験の説明が表示されます</p>"+
    "<p>何かキーを押して進んでください</p>",
  post_trial_gap: 2000
};
tlprac.push(practice);

 var instructions = {
   type: "html-keyboard-response",
   stimulus: "<p>実験では色のついた円が画面の左右どちらかに呈示されます。" +
     " 円が<strong>青</strong>のときは Fキー で、円が<strong>オレンジ</strong>のときは" +
     " Jキー で、できるだけ早く反応してください。</p> " +
     " <div style='width: 700px;'>" +
     " <div style='float: left;'><img src=" + repo_site + "'img/blue.png'></img>" +
     " <p class='small'><strong>Fキー</strong></p></div>" + 
     " <div style='float: right;'><img src=" + repo_site + "'img/orange.png'></img> " +
     " <p class='small'><strong>Jキー</strong></p></div>" +
     "</div>" +
     " <p>何かキーを押すと練習が始まります。</p> ",
   post_trial_gap: 2000
 };
 tlprac.push(instructions);

 /* test trials */
function drawBlueL(c){
    var ctx = c.getContext('2d');
    const chara = new Image();
    chara.src= repo_site+'img/blue.png';
    ctx.drawImage(chara, 0, 0);
}

function drawPrangeR(c){
    var ctx = c.getContext('2d');
    const chara = new Image();
    chara.src= repo_site+'img/orange.png';
    ctx.drawImage(chara, 250, 0);
}

 var test_stimuli = [
   { stimulus: drawBlueL,  correct_response: 'f'},
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
   canvas_size: [500, 500],
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
 tlprac.push(test_procedure);

 /* define debrief */

 var debrief_block = {
   type: "html-keyboard-response",
   stimulus: function() {

     var trials = jsPsych.data.get().filter({task: 'response'});
     var correct_trials = trials.filter({correct: true});
     var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
     var rt = Math.round(correct_trials.select('rt').mean());

     return `<p>You responded correctly on ${accuracy}% of the trials.</p>
       <p>Your average response time was ${rt}ms.</p>
       <p>Press any key to complete the experiment. Thank you!</p>`;

   }
 };
 tlprac.push(debrief_block);