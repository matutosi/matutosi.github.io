// Launch mailer
//    https://rukiadia.hatenablog.jp/entry/2014/02/19/132445

function createMailerSpan(){
  var span = crEl({ el:'span', ats:{id: 'mailer'} });
  span.appendChild( createLaunchMailerButton()    );
  span.appendChild( createEmailInput()            );
  return span;
}

function launchMailer(){
  var email_adress = document.getElementById('email_adress').value;
  var check = /.+@.+\..+/;
  if( !check.test(email_adress) ){
    alert('Input e-mail adress!');
    return void 0;
  }
  var body = getAllPlotOccDataAsJSON();
  var ref = 'mailto: '+ email_adress + '?subject=biss_' + getNow() + '&body=' + body;
  location.href = ref;
}

function createEmailInput(){
  return span = crEl({ el:'input', ats:{id: 'email_adress', type: 'email', placeholder: 'biss@send.mail.com'} });
}

function createLaunchMailerButton(){
  return createInput({ type: 'button', value: 'Launch mailer', onclick: 'launchMailer()' });
}
