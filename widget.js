class MyWidgetPanelLink {
	getRendered(link, fLeft, fHasLinkBefor)
	{
		let HTML = '';

		HTML += '<a class = "mywdgt_a ';
		if (fLeft === true) {
			HTML += 'mywdgt_left';
		} else {
			HTML += 'mywdgt_right';
		}
		if ((fHasLinkBefor === true) && (fLeft === true)) {
			HTML += ' border_left';
		}
		if ((fHasLinkBefor === true) && (fLeft === false)) {
			HTML += ' border_right';
		}
		HTML += '" href="' + link[0].split('|')[1] + '">&nbsp;' + link[0].split('|')[0] + '&nbsp;</a>';

		return HTML;
	}
}

class MyWidgetPanelDropdown {
	getRendered(dropDnLink, fLeft, index)
	{
		let HTML = '';

		if (index === 0) {
			HTML += '<div class="mywdgt_bar_dropdown ';
			if (fLeft === true) {
				HTML += 'mywdgt_left">';
			} else {
				HTML += 'mywdgt_right">';
			}
			HTML += 	'<button class="mywdgt_bar_dropbtn">&nbsp;' +
							dropDnLink + '&nbsp;<i class="fa fa-caret-down"></i>' +
						'</button>' +
					'<div class="mywdgt_bar_dropdown_content">';
		}
		if (index > 0) {
			HTML += '<a class = "mywdgt_dropdown_a" href="' + dropDnLink.split('|')[1] + '">&nbsp;' + dropDnLink.split('|')[0] + '&nbsp;</a>';
		}
		return HTML;
	}
}

class MyWidgetPanel {
	constructor(leftLinks, rightLinks, dark, center) {

		this.leftLinks = JSON.parse((leftLinks !== undefined) ? leftLinks : '{}');
		this.rightlinks = JSON.parse((rightLinks !== undefined) ? rightLinks : '{}');

		this.dark = dark;
		this.center = center;

		this.render();
	}

	renderLinks(fLeft) {
		const links = (fLeft === true) ? this.leftLinks : this.rightlinks;
		let HTML = '';

		const linkRenderer = new MyWidgetPanelLink();
		const dropDownRenderer = new MyWidgetPanelDropdown();

		let fHasLinkBefor = false;

		links.forEach(link => {
			//link
			if (link.length === 1) {
				HTML += linkRenderer.getRendered(link, fLeft, fHasLinkBefor);
				fHasLinkBefor = true;
			}
			//dropdown
			if (link.length > 1) {
				link.forEach((dropDnLink, index) => {
					HTML += dropDownRenderer.getRendered(dropDnLink, fLeft, index);
				});
				HTML += '</div></div>';
				fHasLinkBefor = false;
			}
		});

		return HTML;
	}
	render() {

		let mywdgtStartTags = '';
		let mywdgtEndTags = '';

		if (this.center){
			mywdgtStartTags = '<div class="mywdgt_navbar">' + '<div class="mywdgt_center_block mywdgt_flex">';
			mywdgtEndTags	= '</div>' + '</div>';
		} else {
			mywdgtStartTags	= '<div class="mywdgt_navbar mywdgt_flex ">';
			mywdgtEndTags	= '</div>';
		}

		$('body').prepend(	mywdgtStartTags +
							'<div class="mywdgt_bar_left">' +
								this.renderLinks(true) +
							'</div>' +
							'<div class="mywdgt_bar_right">' +
								this.renderLinks(false) +
							'</div>' +
							mywdgtEndTags);
	}
}

export class MyWidget {
	constructor(themeParam, centerParam, leftLinksParam, rightLinksParam) {

		this.dark = (themeParam === 'dark');

		const center = (centerParam === 'true');
		const panel = new MyWidgetPanel(leftLinksParam, rightLinksParam, this.dark, center);

		this.render();
	}
	render() {
		$('head').append('<link rel="stylesheet" type="text/css" href="/assets/styles/widget.min.css">');
		$('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">');

		if (this.dark) {
			$('head').append('<link rel="stylesheet" type="text/css" href="/assets/styles/widget_dark.min.css">');
		} else {
			$('head').append('<link rel="stylesheet" type="text/css" href="/assets/styles/widget_light.min.css">');
		}
	}
}
