jQuery(document).ready(function() {
	var QRBox	=	$('#QRBox');
	var MainBox	=	$('#MainBox');
	var AliPayQR	=	'/articles/assets/images/AliPayQR.png';
	var WeChanQR	=	'/articles/assets/images/WeChatQR.png';

	

	function showQR(QR) {
		if (QR) {
			MainBox.css('background-image','url('+QR+')');
		}
		$('#DonateText,#donateBox,#github,.reward-text').addClass('blur');
		QRBox.fadeIn(300,function(argument) {
			MainBox.addClass('showQR');
		});
	}

	$('#donateBox>li').click(function(event) {
		var thisID	=	$(this).attr('id');
		if (thisID === 'BTC') {
			showQR(BTCQR);
			// new Clipboard('#BTCBn');
		} else if (thisID === 'AliPay') {
			showQR(AliPayQR);
			$(".pay-url").attr("href",'/articles/assets/images/谢谢打赏-支付宝.jpg');
		} else if (thisID === 'WeChat') {
			showQR(WeChanQR);
			$(".pay-url").attr("href",'/articles/assets/images/谢谢打赏-微信.jpg');
		}
	});

	MainBox.click(function(event) {
		MainBox.removeClass('showQR').addClass('hideQR');
		setTimeout (function(a) {
			QRBox.fadeOut(300,function(argument) {
				MainBox.removeClass('hideQR');
			});
			$('#DonateText,#donateBox,#github,.reward-text').removeClass('blur');
		},600);

	});
});