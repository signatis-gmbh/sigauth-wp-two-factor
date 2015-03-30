jQuery(document).ready(function() {

	//See if WooCommerce login form is present
	if(jQuery('form.login').size() > 0)
	{
	    var tfa_wc_user_field = jQuery('[name=username]');
		var tfa_wc_submit_btn = jQuery('[name=login]');
		
		var tfa_wc_otp_btn = document.createElement('button');
		tfa_wc_otp_btn.id = 'tfa_wc_otp-button';
		tfa_wc_otp_btn.className = 'button button-large button-primary';
		tfa_wc_otp_btn.onclick = function(){ return tfaChangeToInput(); };
		tfa_wc_otp_btn.style.styleFloat = 'none';
		tfa_wc_otp_btn.style.cssFloat = 'none';
		
		var tfa_wc_btn_text = document.createTextNode(simbatfa_wc_settings.click_to_enter_otp);
		tfa_wc_otp_btn.appendChild(tfa_wc_btn_text);
		tfa_wc_otp_btn.style.width = '100%';
		
		var tfa_wc_p = document.createElement('p');
		tfa_wc_p.id = 'tfa_wc_holder';
		tfa_wc_p.style.marginBottom = '15px';
		
		tfa_wc_p.appendChild(tfa_wc_otp_btn);
		tfaAddToForm(tfa_wc_p);
	}
	
	function tfaChangeToInput()
	{
		//Check so a username is entered.
		if(tfa_wc_user_field.val().length < 1)
		{
			alert(simbatfa_wc_settings.enter_username_first);
			return false;
		}
		
		
		jQuery.post(
			simbatfa_wc_settings.ajaxurl,
			{
				action: 'simbatfa-init-otp',
				user: tfa_wc_user_field.val(),
				  nonce: simbatfa_wc_settings.nonce
			},
			function( response ) {
			}
		);
		
		var p = document.getElementById('tfa_wc_holder');
		var lbl = document.createElement('label');
		lbl.for = 'two_factor_auth';
		var lbl_text = document.createTextNode(simbatfa_wc_settings.otp);
		lbl.appendChild(lbl_text);
		
		var tfa_field = document.createElement('input');
		tfa_field.type = 'text';
		tfa_field.id = 'two_factor_auth';
		tfa_field.name = 'two_factor_code';
		tfa_field.style = 'margin-left: 10px;';
		lbl.appendChild(tfa_field);
		
		//Remove button
		p.removeChild(document.getElementById('tfa_wc_otp-button'));
		
		//Add text and input field
		p.appendChild(lbl);
		tfa_field.focus();
	}
	
	function tfaAddToForm(p)
	{
		jQuery(p).insertBefore(tfa_wc_submit_btn);
	}

});