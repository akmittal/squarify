import { h, Component } from 'preact';

export default class ImageSelect extends Component {
	fileChanged = evt => {
		const data = evt.target.files[0];
		this.props.onChange(data);
	};
	render() {
		return (
			<input
				type="file"
				placeholder="Select Image"
				onChange={this.fileChanged}
				label="Select Image"
			/>
		);
	}
}
