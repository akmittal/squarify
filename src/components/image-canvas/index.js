import { h, Component } from 'preact';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';

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
		const aspectRatio = this.canvas.width / this.canvas.height;
		this.canvas.width = 600;
		this.canvas.height = 600;
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
	drawBackground() {
		const isPortrait = this.img.width < this.img.height;
		// this.ctx.beginPath();
		// this.ctx.rect(0, 0, this.canvas.height, this.canvas.width);
		// this.ctx.fillStyle = 'black';
		// this.ctx.fill();
		const scaleSize = isPortrait
			? this.canvas.width / this.img.width
			: this.canvas.height / this.img.height;

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
		this.ctx.filter = 'blur(50px);';
		this.ctx.drawImage(
			this.img,
			dx,
			dy,
			this.img.width,
			this.img.height,
			dx,
			dy,
			normalizedWidth,
			normalizedHeight
		);
		
	}
	componentDidMount() {
		this.ctx = this.canvas.getContext('2d');
		// this.drawImage()
	}
	componentDidUpdate() {
		if (this.props.fileData) this.drawImage();
	}

	render() {
		return (
			<canvas
				height="600"
				width="600"
				ref={elem => {
					this.canvas = elem;
				}}
			>
				a
			</canvas>
		);
	}
}
