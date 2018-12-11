import { h, Component } from 'preact';

import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';

export default class ImageSelect extends Component {
	fileChanged = evt => {
		const data = evt.target.files[0];

		if (data.type !== 'image/png' && data.type !== 'image/jpeg') {
			// Show warning
			this.scrollingDlg.MDComponent.show();
			evt.target.value = '';
			return;
		}
		this.props.onChange(data);
	};
	render() {
		return (
			<div>
				<input
					type="file"
					accept="image/*"
					placeholder="Select Image"
					onChange={this.fileChanged}
					label="Select Image"
				/>
				<Dialog
					ref={scrollingDlg => {
						this.scrollingDlg = scrollingDlg;
					}}
				>
					<Dialog.Header>Alert</Dialog.Header>
					<Dialog.Body>File selected is not valid image.</Dialog.Body>
					<Dialog.Footer>
						<Dialog.FooterButton accept>OK</Dialog.FooterButton>
					</Dialog.Footer>
				</Dialog>
			</div>
		);
	}
}
