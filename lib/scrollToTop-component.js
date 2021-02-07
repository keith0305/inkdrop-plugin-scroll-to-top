'use babel';

import * as React from 'react';
import { CompositeDisposable } from 'event-kit';

export default class scrollToTopComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showFloatingBtns: true,
		};
	}

	componentWillMount () {
		this.subscriptions = new CompositeDisposable();

		this.subscriptions.add(inkdrop.commands.add(document.body, {
			'scrollToTop:scrollToTop': () => this.scrollToTop(),
			'scrollToTop:scrollToBottom': () => this.scrollToBottom(),
			'scrollToTop:toggleFloatingBtns': () => this.toggleFloatingBtns(),
		}));
	}

	componentWillUnmount () {
		this.subscriptions.dispose();
	}
	
	jumpEditorToLine = (editor, i) => {
		var t = editor.charCoords({ line: i, ch: 0 }, 'local').top;
		var middleHeight = editor.getScrollerElement().offsetHeight / 2;
		editor.scrollTo(null, t - middleHeight - 5);
	}

	toggleFloatingBtns = () => {
		this.setState({ showFloatingBtns: !this.state.showFloatingBtns });
	}

	scrollToTop = () => {
		const editor = inkdrop.getActiveEditor().cm;
		editor.scrollTo(0, 0);
		editor.setCursor({ line: 0, ch: 0 });
		editor.focus();
	}

	scrollToBottom = () => {
		const editor = inkdrop.getActiveEditor().cm;
		const lineCount = editor.lineCount();
		this.jumpEditorToLine(editor, lineCount);
		editor.setCursor({ line: lineCount, ch: 0 }, { bias: -1 }); // set cursor to end of line
		editor.focus();
	}

	render() {
		return (
			<div className="scrollToTopContainer">
				{ this.state.showFloatingBtns &&
					<React.Fragment>
						<div className="btnSTT toTop" title="Scroll to top" onClick={this.scrollToTop}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 32 32"
								width="20"
								height="20"
								fill="none"
								stroke="currentcolor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
							>
								<path d="M6 10 L16 2 26 10 M16 2 L16 30" />
							</svg>
						</div>
						<div className="btnSTT toBottom" title="Scroll to bottom" onClick={this.scrollToBottom}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 32 32"
								width="20"
								height="20"
								fill="none"
								stroke="currentcolor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
							>
								<path d="M6 22 L16 30 26 22 M16 30 L16 2" />
							</svg>
						</div>
					</React.Fragment>
				}
			</div>
		);
	}
}
