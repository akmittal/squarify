import { h, Component } from 'preact';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import * as StackBlur from 'stackblur-canvas';

export default class ImageCanvas extends Component {
	drawImage() {
		let reader = new FileReader();
		reader.onload = event => {
			this.img = new Image();
			this.img.onload = this.performMagic;
			this.img.src = event.target.result;
		};
		reader.readAsDataURL(this.props.fileData);
	}
	performMagic = () => {
		const isPortrait = this.img.width < this.img.height;
		// const aspectRatio = this.canvas.width / this.canvas.height;
		// draw background
		this.drawBackground();

		// draw actual image
		const scaleSize = isPortrait
			? this.canvas.height / this.img.height
			: this.canvas.width / this.img.width;

		const normalizedHeight = parseInt(scaleSize * this.img.height, 10);
		const normalizedWidth = parseInt(scaleSize * this.img.width, 10);
		const dx = parseInt(
			isPortrait ? (this.canvas.width - normalizedWidth) / 2 : 0,
			10
		);
		const dy = parseInt(
			!isPortrait ? (this.canvas.height - normalizedHeight) / 2 : 0,
			10
		);

		this.ctx.drawImage(
			this.img,
			0,
			0,
			this.img.width,
			this.img.height,
			dx,
			dy,
			normalizedWidth,
			normalizedHeight
		);
	};
	fillSolid(color) {
		this.ctx.beginPath();
		this.ctx.rect(0, 0, this.canvas.height, this.canvas.width);
		this.ctx.fillStyle = color;
		this.ctx.fill();
	}
	blurBackground() {
		const isPortrait = this.img.width < this.img.height;

		const scaleSize = isPortrait
			? this.canvas.width / this.img.width
			: this.canvas.height / this.img.height;

		const normalizedHeight = parseInt(scaleSize * this.img.height, 10);
		const normalizedWidth = parseInt(scaleSize * this.img.width, 10);
		const dx = parseInt(
			!isPortrait ? (normalizedWidth - this.canvas.width) / (2 * scaleSize) : 0,
			10
		);
		const dy = parseInt(
			isPortrait
				? (normalizedHeight - this.canvas.height) / (2 * scaleSize)
				: 0,
			10
		);

		this.ctx.drawImage(
			this.img,
			dx,
			dy,
			this.img.width - 2 * dx,
			this.img.height - 2 * dy,
			0,
			0,
			this.canvas.width,
			this.canvas.height
		);
		StackBlur.canvasRGB(
			this.canvas,
			0,
			0,
			this.canvas.width,
			this.canvas.width,
			50
		);
	}
	drawBackground() {
		const { bgConfig } = this.props;
		if (bgConfig.type === 'SOLID') {
			this.fillSolid(bgConfig.color);
		}
		else {
			this.blurBackground(bgConfig.radius);
		}
	}

	canvasToImage(canvas) {
		let image = new Image();
		image.src = canvas.toDataURL();
		return image;
	}
	componentDidMount() {
		this.ctx = this.canvas.getContext('2d');
	}
	componentDidUpdate() {
		if (this.props.fileData) this.drawImage();
	}

	render() {
		return (
			<div>
				<canvas
					height="600"
					width="600"
					ref={elem => {
						this.canvas = elem;
					}}
				/>
			</div>
		);
	}
}

ImageCanvas.defaultProps = {
	bgConfig: {
		type: 'SOLID',
		color: '#fff',
		radius: 50
	}
};
