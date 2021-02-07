'use babel';

import scrollToTopComponent from './scrollToTop-component';

module.exports = {

	activate() {
		inkdrop.components.registerClass(scrollToTopComponent);
		inkdrop.layouts.addComponentToLayout(
			'mde',
			'scrollToTopComponent'
		)
	},

	deactivate() {
		inkdrop.layouts.removeComponentFromLayout(
			'mde',
			'scrollToTopComponent'
		)
		inkdrop.components.deleteClass(scrollToTopComponent);
	},

};
